package org.egret.java.linkgame;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ProgressBar;

/* add useLibrary 'org.apache.http.legacy' in gradle if get error
 */
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class HotUpdate {

    // URL for json
    public String jsonUrl = "http://www.example.com/gameInfo.json";

    // zip path
    private String zipPath;
    // save path
    private String gamePath;

    private Context context = null;
    private String gameId = "";
    private ProgressBar progressBar = null;

    public HotUpdate(Context ctx, String gid) {
        context = ctx;
        gameId = gid;
    }

    public void setProgressBar(ProgressBar bar) {
        progressBar = bar;
    }

    public void doLoadGame() {
        zipPath = context.getApplicationContext().getFilesDir().getAbsolutePath();
        gamePath = zipPath + "/egret/" + gameId + "/game";
        HotUpdateTask task = new HotUpdateTask(jsonUrl, zipPath, gamePath);
        task.execute();
    }

    public void runGame(String updateUrl) {
        ((linkgame)context).runGameAfterHotUpdate(updateUrl);
    }

    // 热更新的逻辑封装在HotUpdateHelper中，继承AsyncTask类
    public class HotUpdateTask extends AsyncTask<Integer, Integer, String> {

        private String jsonUrl = "";
        private String zipPath;
        private String gamePath;
        private String updateUrl;

        public HotUpdateTask(String jsonUrl, String zipPath, String gamePath) {
            this.jsonUrl = jsonUrl;
            this.zipPath = zipPath;
            this.gamePath = gamePath;
        }

        //后台运行的逻辑写在doInBackground方法中
        @Override
        protected String doInBackground(Integer... params) {
            String jsonInfo = getGameJson();

            String _codeUrl;
            String _updateUrl;

            // 使用SharedPreferences读取和存储版本信息
            SharedPreferences sharedPreferences = context.getSharedPreferences("GameVersion", 0);
            SharedPreferences.Editor editor = sharedPreferences.edit();
            boolean needUpdateCode = false;
            try {
                //获得 codeUrl 和 updateUrl这两个字段的信息
                JSONObject jsonObject = new JSONObject(jsonInfo);
                _codeUrl = jsonObject.getString("code_url");
                _updateUrl = jsonObject.getString("update_url");
                updateUrl = _updateUrl;
                //如果之前保存的codeUrl不等于这次从服务器获取的，且这次获取的不为空字符串，那么就需要更新
                String oldCodeUrl = sharedPreferences.getString("code_url","");
                if(!oldCodeUrl.equals(_codeUrl) && !_codeUrl.equals("")){
                    needUpdateCode = true;
                }
            } catch (Exception e) {
                Log.i("", "Exception " + e.toString());
                return "json_error";
            }

            if(needUpdateCode){
                //下载更新内容并解压缩
                try {
                    String saveFilePath = getGameZip(_codeUrl);
                    unzip(saveFilePath, gamePath);
                    //如果更新成功就更新本地存储的这两个字段的信息
                    if(!saveFilePath.equals("")){
                        //
                        editor.putString("code_url",_codeUrl);
                        editor.putString("update_url",_updateUrl);
                        editor.commit();
                    }
                    return "update_run";
                }
                catch (Exception e){
                    Log.i("", "Exception " + e.toString());
                    return "download_or_unzip_error";
                }
            }
            else{
                return "direct_run";
            }
        }

        //当AsyncTask后台执行完毕，会调用主线程的onPostExecute方法，在这里执行切换Activity的逻辑，切换至游戏界面
        @Override
        protected void onPostExecute(String result) {
            //获得更新配置json失败，在此处处理
            if (result.equals("json_error")){

            }
            //下载或者解压缩失败，在此处处理
            else if (result.equals("download_or_unzip_error")){

            }
            //正常运行
            else {
                runGame(updateUrl);
            }
        }

        //AsyncTask提供的更新进度的API，更新进度需要在这里同步至UI线程
        @Override
        protected void onProgressUpdate(Integer... values) {
            super.onProgressUpdate(values);
            int temp = progressBar.getMax();
            progressBar.setProgress(values[0]);
        }

        public String getGameJson() {
            String jsonInfo = "";

            try {
                HttpClient getClient = new DefaultHttpClient();
                HttpGet request = new HttpGet(jsonUrl);
                HttpResponse response = getClient.execute(request);
                if(response.getStatusLine().getStatusCode()== HttpStatus.SC_OK){
                    Log.i("", "请求服务器端成功");
                    InputStream inputStream = response.getEntity().getContent();
                    int result = inputStream.read();
                    while (result != -1){
                        jsonInfo += (char)result;
                        result = inputStream.read();
                    }
                    inputStream.close();
                } else {
                    Log.i("", "请求服务器端失败");
                }
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                Log.i("", "Exception");
            }

            Log.d("", "[" + jsonInfo + "]");
            return jsonInfo;
        }

        //下载codeUrl下的zip文件
        public String getGameZip(String loaderUrl) {
            HttpURLConnection conn = null;
            FileOutputStream out;
            String saveFilePath = "";
            try {
                URL url = new URL(loaderUrl);
                conn = (HttpURLConnection)url.openConnection();
                conn.setConnectTimeout(30 * 1000);
                conn.setReadTimeout(30 * 1000);

                conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");

                int length = conn.getContentLength();
                int progress = 0;

                InputStream inputStream = conn.getInputStream();
                byte[] buffer = new byte[8 * 1024];
                int read;

                saveFilePath = zipPath + "/temp.zip";
                File saveFile = new File(saveFilePath);
                out = new FileOutputStream(saveFile);

                while ((read = inputStream.read(buffer)) > 0) {
                    progress += read;
                    out.write(buffer, 0, read);
                    float percentF = (float)(progress)/(float)(length);
                    int percent = (int)(percentF*50);
                    publishProgress(percent);
                }

                out.close();

            } catch (Exception e) {
                Log.e("", e.toString());
            } finally {
                if (conn != null) {
                    conn.disconnect();
                }
            }

            return saveFilePath;
        }

        //解压缩下载的文件
        public void unzip(String filePath, String gamePath) {
            ZipFile zipFile;
            int length = 0;
            int progress = 0;
            try {
                zipFile = new ZipFile(filePath);
                Enumeration<? extends ZipEntry> enumeration = zipFile.entries();
                while (enumeration.hasMoreElements()) {
                    length += (enumeration.nextElement()).getSize();
                }
                enumeration = zipFile.entries();
                while (enumeration.hasMoreElements()) {
                    ZipEntry zipEntry = enumeration.nextElement();
                    progress += unzipEntry(zipFile, zipEntry, gamePath);
                    float percentF = (float)(progress)/(float)(length);
                    int percent = 50 + (int)(percentF*50);
                    publishProgress(percent);
                    //本地测试时下载和解压过快，sleep方便观察与测试
                    //Thread.sleep(200);
                }
            } catch (Exception e) {
                Log.e("", e.toString());
            }
        }

        //解压缩文件，如果返回0则代表是目录而不是文件
        private int unzipEntry(ZipFile zipFile, ZipEntry zipEntry, String gamePath) {
            InputStream inputStream;
            FileOutputStream out;
            int result = 0;
            try {
                File target = new File(gamePath, androidPath(zipEntry.getName()));
                if (zipEntry.isDirectory()) {
                    makeRoot(target);
                    return 0;
                }
                makeRoot(target.getParentFile());

                inputStream = zipFile.getInputStream(zipEntry);
                out = new FileOutputStream(target);
                byte data[] = new byte[4 * 1024];
                int read;
                while ((read = inputStream.read(data, 0, 4 * 1024)) != -1) {
                    out.write(data, 0, read);
                    result += read;
                }

                inputStream.close();
                out.close();
            } catch (Exception e) {
                Log.e("", e.toString());
            }

            return result;
        }

        private String androidPath(String name) {
            return name.replace('\\', '/');
        }

        private void makeRoot(File root) throws Exception {
            if (!root.exists() && !root.mkdirs()) {
                throw new Exception("");
            }
        }

    }

}

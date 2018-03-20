package org.egret.java.linkgame;

import java.io.File;
import java.util.HashMap;

import org.egret.egretframeworknative.EgretRuntime;
import org.egret.egretframeworknative.engine.EgretGameEngine;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ProgressBar;

public class linkgame extends Activity {
    private interface IRuntimeInterface {
        public void callback(String message);
        // 因为遗留问题 callBack 也是接受的
    }
    
    private static final String EGRET_ROOT = "egret";
    //TODO: egret publish之后，修改以下常量为生成的game_code名
    private static final String EGRET_PUBLISH_ZIP = "game_code_0123456789.zip";
    protected static final String TAG = "linkgame";
    
   	//若bUsingPlugin为true，开启插件
    private boolean bUsingPlugin = false; 

    private boolean engineInited = false;
    private EgretGameEngine gameEngine;
    private String egretRoot;
    private String gameId;
    private String loaderUrl;
    private String updateUrl;

    private static boolean UseCustomHotUpdate = false;
    private HotUpdate hotUpdate = null;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        
        egretRoot = new File(getFilesDir(), EGRET_ROOT).getAbsolutePath();
        gameId = "local";

        gameEngine = new EgretGameEngine();

        if (!UseCustomHotUpdate) {
            //TODO: DEBUG 使用 2
            setLoaderUrl(2);
            // 设置游戏的选项  (set game options)
            HashMap<String, Object> options = getGameOptions();
            gameEngine.game_engine_set_options(options);
            // 设置加载进度条  (set loading progress bar)
            gameEngine.game_engine_set_loading_view(new GameLoadingView(this));
            // 创建Egret<->Runtime的通讯 (create pipe between Egret and Runtime)
            setInterfaces();
            // 初始化并获得渲染视图 (initialize game engine and obtain rendering view)
            gameEngine.game_engine_init(this);
            engineInited = true;
            View gameEngineView = gameEngine.game_engine_get_view();

            setContentView(gameEngineView);
        }
        else {
            setContentView(R.layout.loading_view);

            hotUpdate = new HotUpdate(this, gameId);
            hotUpdate.doLoadGame();

            ProgressBar progressBar = (ProgressBar)findViewById(R.id.bar);
            hotUpdate.setProgressBar(progressBar);
        }
    }

    public void runGameAfterHotUpdate(String _updateUrl) {
        loaderUrl = "";
        updateUrl = _updateUrl;
        HashMap<String, Object> options = getGameOptions();
        gameEngine.game_engine_set_options(options);
        setInterfaces();

        gameEngine.game_engine_init(this);
        engineInited = true;
        View gameEngineView = gameEngine.game_engine_get_view();

        setContentView(gameEngineView);
    }
    
    private void setInterfaces() {
        // Egret（TypeScript）－Runtime（Java）通讯
        // setRuntimeInterface(String name, IRuntimeInterface interface) 用于设置一个runtime的目标接口
        // callEgretInterface(String name, String message) 用于调用Egret的接口，并传递消息
        gameEngine.setRuntimeInterface("RuntimeInterface", new IRuntimeInterface() {
           @Override
            public void callback(String message) {
                Log.d(TAG, message);
                gameEngine.callEgretInterface("EgretInterface", "A message from runtime");
            }
        });
    }

    private HashMap<String, Object> getGameOptions() {
        HashMap<String, Object> options = new HashMap<String, Object>();
        options.put(EgretRuntime.OPTION_EGRET_GAME_ROOT, egretRoot);
        options.put(EgretRuntime.OPTION_GAME_ID, gameId);
        options.put(EgretRuntime.OPTION_GAME_LOADER_URL, loaderUrl);
        options.put(EgretRuntime.OPTION_GAME_UPDATE_URL, updateUrl);
        options.put(EgretRuntime.OPTION_PUBLISH_ZIP, EGRET_PUBLISH_ZIP);
        return options;
    }

    private void setLoaderUrl(int mode) {
        switch (mode) {
        case 2:
            // local DEBUG mode
            // 本地DEBUG模式，发布请使用0本地zip，或者1网络获取zip
            loaderUrl = "";
            updateUrl = "";
            break;
        case 1:
            // http request zip RELEASE mode, use permission INTERNET
            // 请求网络zip包发布模式，需要权限 INTERNET
            loaderUrl = "http://www.example.com/" + EGRET_PUBLISH_ZIP;
            updateUrl = "http://www.example.com/";
            break;
        default:
            // local zip RELEASE mode, default mode, `egret publish -compile --runtime native`
            // 私有空间zip包发布模式, 默认模式, `egret publish -compile --runtime native`
            loaderUrl = EGRET_PUBLISH_ZIP;
            updateUrl = "";
            break;
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        if (engineInited) {
            gameEngine.game_engine_onPause();
        }
    }
    
    @Override
    public void onResume() {
        super.onResume();
        if (engineInited) {
            gameEngine.game_engine_onResume();
        }
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_BACK:
                if (engineInited) {
                    gameEngine.game_engine_onStop();
                }
                finish();
                return true;
            default:
                return super.onKeyDown(keyCode, event);
        }
    }

}

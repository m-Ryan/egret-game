package org.egret.java;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

/**
 * Splash Activity。
 *
 *开启Splash功能。请先按照AndroidManifest.xml中的注释修改好AndroidManifest。
 * 
 * 当前Activity使用了一个特定的Theme。这个Theme有背景色和一张背景图。
 * 
 * 背景色修改： 1.在res/values/colors.xml中添加对应颜色。
 * 2.在res/drawable/splash_layer_list.xml中修改： <item
 * android:drawable="@color/{颜色名}"></item>
 * 
 * 图片修改： 1. 替换 res/drawable , res/drawable_xxx 文件夹下所有splash_img.png图片。
 * 2.如果使用其它名称的图片，请在res/drawable/splash_layer_list.xml中修改：
 * android:src="@drawable/{图片名}"
 * 
 * @author jkd2972
 * 
 */

public class SplashActivity extends Activity {

	private Handler mMainHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			try {
				SplashActivity.this.startGame();
			} catch (NameNotFoundException e) {
				Log.e("SplashActivity", "find game activity error. ");
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	};

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// 1秒后切换到游戏Activity。
		mMainHandler.sendEmptyMessageDelayed(0, 1000);
	}

	/**
	 * 启动游戏Activity。为了兼容，需要通过搜索方式来找到游戏Activity并启动。
	 * 作为游戏Activiy,必须有键值为：type:game_activity的meteData。
	 * 
	 * @throws NameNotFoundException
	 */
	private void startGame() throws NameNotFoundException {

		ActivityInfo[] activityInfos;

		activityInfos = getPackageManager().getPackageInfo(getPackageName(),
				PackageManager.GET_ACTIVITIES | PackageManager.GET_META_DATA).activities;

		ActivityInfo activityInfo = null;

		String gameActivityName = "";

		for (int i = 0; activityInfos != null && i < activityInfos.length; i++) {
			activityInfo = activityInfos[i];
			if (activityInfo.metaData != null
					&& activityInfo.metaData.containsKey("type")) {
				gameActivityName = activityInfo.name;

				break;
			}
		}

		if (!gameActivityName.isEmpty()) {
			Intent intent = new Intent(Intent.ACTION_MAIN);
			intent.setClassName(this.getPackageName(), gameActivityName);
			intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK
					| Intent.FLAG_ACTIVITY_NEW_TASK);
			startActivity(intent);
		} else {
			throw new NameNotFoundException();
		}

	}

	// 屏蔽返回键。在Splash时不响应返回键。
	@Override
	public void onBackPressed() {
	}

}

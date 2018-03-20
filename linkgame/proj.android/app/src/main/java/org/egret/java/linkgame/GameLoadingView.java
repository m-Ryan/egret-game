package org.egret.java.linkgame;

import android.content.Context;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

public class GameLoadingView extends FrameLayout {

    private ProgressBar bar;
    private TextView tv;

    /**
     * 游戏下载进度条 上线前请替换渠道自定制进度条
     * 
     * @param context
     */
    public GameLoadingView(Context context) {
        super(context);

        tv = new TextView(context);
        tv.setLayoutParams(new LayoutParams(LayoutParams.WRAP_CONTENT,
                LayoutParams.WRAP_CONTENT));
        tv.setText("Game Loading...");
        this.addView(tv);

        bar = new ProgressBar(context, null,
                android.R.attr.progressBarStyleHorizontal);
        this.addView(bar);
    }

    public void onProgress(float progress) {
        bar.setProgress((int) progress);
    }

    public void onGameZipUpdateProgress(float percent) {
        bar.setProgress((int) percent);
    }

    public void onGameZipUpdateError() {

    }

    public void onGameZipUpdateSuccess() {

    }

}

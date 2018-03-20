class GameBackground extends egret.Sprite{
	private chapter:number;
	private thisparent: GameSceen;
	public constructor(chapter: number, parent: GameSceen) {
		super();
		this.chapter = chapter;
		this.thisparent = parent;
		this.changeBackground();
	}

	private changeBackground(){
		this.cacheAsBitmap=false;
        this.removeChildren();
		this.createBackgroundImage();
		this.createLevelImage();
		this.createTimerImage();
		this.createIconView();
        this.cacheAsBitmap=true;    
	}

	private createBackgroundImage(){
		let url = ChapterConfig.getData(this.chapter+ 1).background;
		let bgImg:egret.Bitmap = new egret.Bitmap();
		bgImg.width = GameData.stageW;
		bgImg.height = GameData.stageH;
        bgImg.texture = RES.getRes(url);
        this.addChild(bgImg);
	}



	private createLevelImage(){
		var label:egret.TextField = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 40;
		label.width = GameData.stageW;
		label.height = 80;
		label.textAlign = 'center';
		label.verticalAlign = 'middle';
        //设置显示文本
		label.text = (this.chapter+1).toString();
        this.addChild(label);
	}


	private createTimerImage(){
		let tv = new TimerView(1000,TimerData.time ,this.thisparent);
		GameData.timerManager = tv;
		this.addChild(tv);
		tv.x = 20;
		tv.y = 160;
	}

	private createIconView(){
		var label:egret.TextField = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffff00;
        //设置字号
        label.size = 40;
		label.width = 260;
		label.height = 110;
		label.textAlign = 'center';
		label.verticalAlign = 'middle';
        //设置显示文本
		label.text = LocalStorageControl.getIcon().toString();
        this.addChild(label);
	}


}
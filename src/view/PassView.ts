class PassView extends egret.Sprite{
	public constructor() {
		super();
		this.touchEnabled = true;
		this.init();
	}

	init(){
		this.createView();
	}

	private createView(){
		let bgImg:egret.Bitmap = new egret.Bitmap();
        bgImg.texture = RES.getRes("win_png");
		bgImg.height = GameData.stageH;
		bgImg.width = GameData.stageW;
        this.addChild(bgImg);
		this.createBtnView();
	}
	private createBtnView(){
		const backBtn = new BackBtn('exit_png', 200, 100, 100, GameData.stageH-400, 'Chapter');
		this.addChild(backBtn);
		const againBtn = new BackBtn('next_png', 200, 100, 300, GameData.stageH-400, 'Game');
		this.addChild(againBtn);
	}

}
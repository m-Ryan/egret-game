class LoseView extends egret.Sprite{
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
		bgImg.width = GameData.stageW;
		bgImg.height = GameData.stageH;
        bgImg.texture = RES.getRes("lose_png");
        this.addChild(bgImg);
		this.createBtnView();
	}

	private createBtnView(){
		const backBtn = new BackBtn('exit_png', 200, 100, 100, GameData.stageH-400, 'Chapter');
		this.addChild(backBtn);
		const againBtn = new BackBtn('again_png', 200, 100, 300, GameData.stageH-400, 'Game');
		this.addChild(againBtn);
	}
	
}
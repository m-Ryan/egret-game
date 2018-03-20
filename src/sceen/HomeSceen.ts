class HomeSceen extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private init(){
		let bgImg:egret.Bitmap = new egret.Bitmap();
        bgImg.texture = RES.getRes("homebg_png");
		bgImg.width = GameData.stageW;
		bgImg.height = GameData.stageH;
        this.addChild(bgImg);

		//按钮
		let htv = new HomeBtnsView();
		this.addChild(htv);
	}
}
class StoreSceen extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private init(){
		const bgImg = GameData.stage.createBitmapByName("store_png");
		bgImg.width = GameData.stageW;
		bgImg.height = GameData.stageH;
        this.addChild(bgImg);

		//加载金币视图
		const iv = new IconView();
		this.addChild(iv);

		//创建返回按钮
		const backbtn = new BackBtn("back_btn_png", 120, 60, GameData.stageW - 140, 20, "Home");
		this.addChild(backbtn);

		//道具视图

		let promtpItem = new PropsShopItem("prompt_png", "prompt", 300, "快速提示");
		this.addChild(promtpItem);
		let pauseItem = new PropsShopItem("pause_png", "pause", 450, "时间暂停");
		this.addChild(pauseItem);
		let resetItem = new PropsShopItem("reset_png", "reset", 600, "重新整理");
		this.addChild(resetItem);
	}
}
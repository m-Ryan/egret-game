class BuyFailView extends egret.Sprite{
	thisparent:egret.Sprite;
	public constructor(parent: egret.Sprite) {
		super();
		this.thisparent = parent;
		this.init();
	}

	private init(){
		let failPic = GameData.stage.createBitmapByName("buy_fail_png");
		this.addChild(failPic);
		failPic.width = 530;
		failPic.height = 335;
		failPic.x = (GameData.stageW - 530) / 2;
		failPic.y = (GameData.stageH - 335) / 2;

		let timer = setTimeout(() =>{
			if(this.parent){
				this.thisparent.removeChild(this);
			}
		}, 1000);
	}
}
class BuyBtn extends egret.Sprite{
	private type: string;
	constructor(type){
		super();
		this.touchEnabled = true;
		this.type = type;
		this.init();
	}
	init(){
		let btn = GameData.stage.createBitmapByName("buy_png");
		this.addChild(btn);
		btn.width = 100;
		btn.height = 50;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.do,this);
	}

	private do(){
		if(this.checkIcon()){
			LocalStorageControl.addPropsItemNum(this.type);
			LocalStorageControl.useIcon(PropsPrice[this.type]);
			SceenControl.loadStore();
		}else{
			let bfv = new BuyFailView(GameData.sceen);
			GameData.sceen.addChild(bfv);
		}
	}

	private checkIcon(){
		return (LocalStorageControl.getIcon() >= PropsPrice[this.type])
	}
}
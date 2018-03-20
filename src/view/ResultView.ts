class ResultView extends egret.Sprite{
	private bitmap: string;
	public constructor(result: boolean) {
		super();
		this.init(result)
	}

	init(result: boolean){
		this.createView(result);
	}

	createView(result: boolean){
		let rv: egret.Sprite;
		if(result){
			rv = new PassView();
		}else{
			rv = new LoseView();
		}
		this.addChild(rv);
	}

	update(){

	}
}
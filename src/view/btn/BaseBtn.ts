class BaseBtn extends egret.Sprite{
	private bitmap: string;
	private args;
	public constructor(bitmap: string, w:number, h: number, x: number, y: number,args: any) {
		super();
		this.args = args;
		this.bitmap = bitmap;
		this.touchEnabled = true;
		this.init(w, h, x, y);
	}

	private init(w:number, h: number, x: number, y: number){
		let btn = GameData.stage.createBitmapByName(this.bitmap);
		this.addChild(btn);
		btn.width = w;
		btn.height = h;
		btn.x = x;
		btn.y = y;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.removeEvent,this);
	}

	//这段需要覆盖,没覆盖就报错
	protected do(args:any){
		throw new egret.error();
	}


	private removeEvent(){
		this.do(this.args);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.removeEvent,this);
	}
}
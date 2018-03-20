class LockChapter extends egret.Sprite{
	public id: number;
	public type: string = "lock";
	public constructor(id: number,w:number, h: number) {
		super();
		this.touchEnabled=true;
		this.id = id;
		this.init(w, h)
	}

	init(w:number, h: number){
		let lock = GameData.stage.createBitmapByName("cadeado_png");
		lock.width = w;
		lock.height = h;
		this.addChild(lock)
	}
}
class UnLockChapter extends egret.Sprite{
	public id: number;
	public type: string = "unlock";
	public constructor(id:number, w:number, h: number) {
		super();
		this.touchEnabled=true;
		this.id = id;
		this.init(w, h)
	}

	init(w:number, h: number){
		let unlock = GameData.stage.createBitmapByName("unlock_png");
		unlock.width = w;
		unlock.height = h;
		this.addChild(unlock);
        //创建 TextField 对象
        var label:egret.TextField = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 40;
		label.bold = true;
		label.stroke = 2;
		label.width = w;
		label.height = h;
		label.strokeColor = 0x000000;
		label.textAlign = 'center';
		label.verticalAlign = 'middle';
        //设置显示文本
		label.text = this.id.toString();
        //添加到显示列表
        this.addChild(label);	
	}
}
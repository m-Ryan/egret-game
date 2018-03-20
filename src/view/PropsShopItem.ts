class PropsShopItem extends egret.Sprite{
	public type:string;
	public constructor(bitmapName: string,type: string, y:number, text:string) {
		super();
		this.type=type;
		this.createView(bitmapName, y, text);
	}

	private createView(bitmapName: string, y:number,  text:string){

		const promptBtn = GameData.stage.createBitmapByName(bitmapName);
		this.addChild(promptBtn);
		promptBtn.width=100;
		promptBtn.height=100;
		promptBtn.x=100;
		promptBtn.y=y;

		
        //创建 TextField 对象
        var label:egret.TextField = new egret.TextField();
        //设置字体
        label.fontFamily = "Arial";
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 30;
        label.bold = true;
        //设置显示文本
		label.text = PropsPrice.prompt.toString();
        //添加到显示列表
        this.addChild(label);	
		label.x=250;
		label.y=y+10;

        //创建 TextField 对象
        var showText:egret.TextField = new egret.TextField();
        //设置字体
        showText.fontFamily = "Arial";
        //设置文本颜色
        showText.textColor = 0xffffff;
        showText.bold = true;
        //设置字号
        showText.size = 30;
        //设置显示文本
		showText.text = text;
        //添加到显示列表
        this.addChild(showText);	
		showText.x=250;
		showText.y=y+60;

        //创建 TextField 对象
        var num:egret.TextField = new egret.TextField();
        //设置字体
        num.fontFamily = "Arial";
        //设置文本颜色
        num.textColor = 0xffffff;
        num.bold = true;
        //设置字号
        num.size = 30;
        //设置显示文本
		num.text = LocalStorageControl.getPropsItemNum(this.type).toString();
        //添加到显示列表
        this.addChild(num);	
		num.x=400;
		num.y=y+20;

		const buybtn = new BuyBtn(this.type);
		this.addChild(buybtn);
        buybtn.width = 200;
        buybtn.height = 70;
		buybtn.x = 470;
		buybtn.y = y+20;
	}


}
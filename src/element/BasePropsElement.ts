class BasePropsElements extends egret.Sprite{
	private propsId: number;
	private texture: string;
	private girdSize: number;
	private numText: egret.TextField;
	public constructor(propsId: number, texture: string, girdSize: number) {
		super();
		this.touchEnabled = true;
		this.propsId = propsId;
		this.texture = texture;
		this.girdSize = girdSize;
		this.init();
	}

	private init(){
		this.createProps();
	}

	private createProps(){
		let bitmap = new egret.Bitmap();
		bitmap.texture = RES.getRes(this.texture);
		bitmap.width = this.girdSize;
		bitmap.height = this.girdSize;
        this.addChild(bitmap);

		//创建 TextField 对象
        var label:egret.TextField = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 40;
		label.width = this.girdSize - 20;
		label.height = 60;
		label.textAlign = 'right';
		label.verticalAlign = 'middle';
        //设置显示文本
		label.text = LocalStorageControl.getPropsItemNum(this.texture.slice(0, this.texture.length - 4)).toString();
		this.addChild(label);
		this.numText = label;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.propsTap, this);
	}

	public updatePropsNum(){
		console.log('update');
		this.removeChild(this.numText)
		//创建 TextField 对象
        var label:egret.TextField = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 40;
		label.width = this.girdSize - 20;
		label.height = 60;
		label.textAlign = 'right';
		label.verticalAlign = 'middle';
        //设置显示文本
		label.text = LocalStorageControl.getPropsItemNum(this.texture.slice(0, this.texture.length - 4)).toString();
		this.addChild(label);
		this.numText = label;
	}

	private propsTap(evt:egret.TouchEvent){
		const props = this.texture.slice(0, this.texture.length - 4);
		if(!LocalStorageControl.getPropsItemNum(props)) return;
		LocalStorageControl.usePropsItemNum(props)
		this.updatePropsNum();
		PropsManager.userProps(this.propsId);
	}

}
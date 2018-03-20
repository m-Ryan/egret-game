class IconView extends egret.Sprite{
	public constructor() {
		super();
		this.createIconView();
	}

	private createIconView(){
		var label:egret.TextField = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffff00;
        //设置字号
        label.size = 40;
		label.width = 260;
		label.height = 110;
		label.textAlign = 'center';
		label.verticalAlign = 'middle';
        //设置显示文本
		label.text = LocalStorageControl.getIcon().toString();
        this.addChild(label);
	}

}
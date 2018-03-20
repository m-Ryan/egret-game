class ElementView extends egret.Sprite{
    private thisParent: egret.Sprite;
	public constructor(parent: egret.Sprite,id:number, bitmapName: string) {
		super();
        this.thisParent = parent;
        this.id = id;
        this.init(bitmapName, id);

	}
    public id: number;
    private duration: number = 3000;
    private speed: number = 1000;
	private bitmap: egret.Bitmap;
    private elePadding: number = 5;

	private init(bitmapName: string, id: number){
		this.touchEnabled = true;
        this.touchChildren = false;
        this.bitmap = new egret.Bitmap();
        this.bitmap.width = GameData.elementWidth-10;
        this.bitmap.height = GameData.elementWidth-10;
        this.bitmap.texture = RES.getRes(bitmapName);
        this.bitmap.x = -1 * GameData.elementWidth; // 左偏移两个元素的距离
        this.bitmap.y = -1 * GameData.elementWidth;       
	}

     public show(){
        let wait: number = (50*GameData.maxColumn*GameData.maxRow)-(GameData.elements[this.id].locationX + GameData.maxRow * GameData.elements[this.id].locationY)*50
        var tw:egret.Tween = egret.Tween.get(this);
        tw.wait(wait,false);
        tw.call(this.addThisToParent,this);
        tw.to({x:this.targetX(),y:this.targetY()},this.speed, egret.Ease.bounceOut);
        this.filters=[ColorGlowFilter.transparentGF];
    }
    private addThisToParent(){
		this.addChild(this.bitmap);
	}

    //目标X轴位置
     public targetX():number {
        var girdwidth:number = GameData.elementWidth;
        var xx:number = 20 + girdwidth * (this.id % GameData.maxRow) + 1 * girdwidth + this.elePadding;
        return xx;
    }

    //目标Y轴位置
    public targetY():number {
        var girdwidth:number =  GameData.elementWidth;
        var startY:number = 0;
        var downHeight: number =  girdwidth * (Math.floor(this.id / GameData.maxColumn)) + girdwidth * 1 + this.elePadding
        var yy:number = startY + downHeight;
        return yy;
    }

    public onFocusing(){
        this.filters=[ColorGlowFilter.yellowGF];
    }

    public onBluring(){
        this.filters=[ColorGlowFilter.transparentGF];
    }
    public removAnimate(){
         this.onBluring();
		 var tw:egret.Tween = egret.Tween.get(this);
		 tw.to({scaleX:1.4,scaleY:1.4},300, egret.Ease.cubicInOut).to({scaleX:0.1,scaleY:0.1},300, egret.Ease.cubicInOut).call(this.removeAniCall,this);
	}
    public prompting(){
         this.filters=[ColorGlowFilter.blueGF];
    }
	public removeAniCall(){
        if(this.thisParent) this.thisParent.removeChild(this);
	}
}
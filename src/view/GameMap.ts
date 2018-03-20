class GameMap extends egret.Sprite{
	private thisParent: GameSceen;
	public isReady:boolean = false;//是否可以开始
	public constructor(parent) {
		super();
		this.thisParent = parent;
		this.init();
	}

	init(){
	   this.createBottomSprite();
	   this.createAllElement();
	}
	private tap1: ElementView;
	private tap2: ElementView;

	//创建一个sprite置于底层，用于游戏中连线的时候用，一个sprite用于放置element元素
	private createBottomSprite(){
	   let sp = new egret.Sprite();
	   this.addChild(sp)
	   GameData.drawLineSprite = sp;
	   let eleParent = new egret.Sprite();
	   this.addChild(eleParent);
	   GameData.eleParentSprite = eleParent;
	}


	//创建地图元素
	public createAllElement(){
		this.touchChildren = false;
		this.isReady = false;
		GameData.timerManager.reset();
		GameData.eleParentSprite.removeChildren();
		GameData.drawLineSprite.removeChildren();
		GameData.elementViews = new Array();
		GameData.mapData = new Array();
		GameData.elements = new Array();
		let temp: GameElement[] = new Array();
		let eleTypes=GameData.elementTypes;
		let bitmapWidth = GameData.elementWidth;
		let len = (GameData.maxRow-2) * (GameData.maxColumn-2);
		
		for(let i=0;i<len;i++){
			if(i>0 && i%2 == 1){
				let bitmapName = eleTypes[Math.floor(Math.random() * eleTypes.length)];
				let gele1: GameElement=new GameElement(i-1,bitmapName);
				let gele2: GameElement=new GameElement(i,bitmapName);
				temp.push(gele1);
				temp.push(gele2);
			}
		}
		temp = temp.sort(()=>0.5-Math.random());
		for(let i = 0; i < GameData.maxRow; i++){
			for(let j = 0; j < GameData.maxColumn; j++){
				let id=i + GameData.maxRow * j
				if(i==0 || j==0 || i==(GameData.maxRow-1) || j==(GameData.maxColumn-1)){
					GameData.elements[id]=new GameElement(id, eleTypes[0]);		
				}else{
					GameData.elements[id]=temp.shift();
					
				}
			}
		}
		
		let girdwidth:number =GameData.elementWidth;
		for(let i = 0; i < GameData.maxRow; i++){
			for(let j = 0; j < GameData.maxColumn; j++){
				let id = i + GameData.maxRow * j;
				let gele=GameData.elements[id];
				gele.update(id);
				let ele = new ElementView( GameData.eleParentSprite, id, gele.type );
				ele.addEventListener(egret.TouchEvent.TOUCH_TAP,this.eventManger,this);
				ele.x = ele.targetX();
				ele.show();
				GameData.elementViews[id]=ele;
				
				if(i==0 || j==0 || i==(GameData.maxRow-1) || j==(GameData.maxColumn-1) || this.isEmptyElement(id)){
					 	GameData.mapData[id] = 0;//0表示这个位置为空
				}else{
					GameData.mapData[id] = 1;//1表示这个位置不为空
					GameData.eleParentSprite.addChild(ele);
				}
			}
		}
		this.y = 250;
		//动画结束后开始计时
		let timer = setTimeout(() =>{
			if(GameData.gameMap != this && GameData.sceen != this) return clearTimeout(timer);

			this.touchChildren = true;
			this.isReady = true;
			GameData.timerManager.start();
		}, GameData.maxRow * GameData.maxColumn * 50);
	}

	private isEmptyElement(id: number){
		let emptyElement: number[] = ChapterConfig.getData(LocalStorageControl.getChapter()).emptyElement;//没有出现的元素
		if(emptyElement.indexOf(id) !=-1){
			return true;
		}
		return false;
	}

	//
	eventManger(evt:egret.TouchEvent){
		GameData.drawLineSprite.removeChildren();
		if(!this.tap1){
			this.tap1 = evt.target;
			this.tap1.onFocusing();
		}else{
			this.tap2 = evt.target;
			let ele1 = GameData.elements[this.tap1.id];
			let ele2 = GameData.elements[this.tap2.id];
			this.tap2.onFocusing();
			if(ConnectLogic.getPath(ele1, ele2)){
				let timer =	setTimeout(()=>{
					if(GameData.gameMap != this && GameData.sceen != this) return clearTimeout(timer);
					this.clearElement(this.tap1, this.tap2);
				}, TimerData.eleDisappearTime);		
			}else{
				this.tap1.onBluring();	
				this.tap1 = this.tap2;
				this.tap2 = null;
				this.tap1.onFocusing();
			}
		}

	}
	public clearElement(e1, e2){
		ConnectLogic.clear(e1, e2);
		GameData.drawLineSprite.removeChildren();
		e2.removAnimate();
		e1.removAnimate();
		this.tap1 = null;
		this.tap2 = null;

		this.checkCanLine()
	}

	//查看是否还可以连线
	public checkCanLine(){
		if(!ConnectLogic.prompt(false, false)){
			GameData.timerManager.stop();
			this.pass();
		}
	}
	public timeout(){
		if(!GameData.eleParentSprite.numChildren){
			this.pass();
		}else{
			this.lose();
		}
	}

	private pass(){
		this.thisParent.showResult(true);
	}

	private lose(){	
		this.thisParent.showResult(false);
	}
}
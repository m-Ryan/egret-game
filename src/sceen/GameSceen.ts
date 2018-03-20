class GameSceen extends egret.Sprite{
	private pv: PropViews;
	private gm: GameMap;
	private chapter: number;
	public constructor() {
		super();
		this.chapter = LocalStorageControl.getChapter();
		this.init();
	}

	public init(){
	   //加载背景
	   const gb  = new GameBackground(this.chapter, this);
	   this.addChild(gb)

	   //加载地图数据
       this.gm = new GameMap(this);
	   GameData.gameMap = this.gm;
       this.addChild(this.gm);

	   //加载道具
	   this.pv = new PropViews();
	   this.addChild(this.pv);
	   
	   	//创建返回按钮
		const backbtn = new BackBtn("back_btn_png", 120, 60, GameData.stageW - 140, 20, "Chapter");
		this.addChild(backbtn);
	}
	
	public showResult(result: boolean){
		if(result){
			LocalStorageControl.addIcon(100 + this.chapter * 10);
			LocalStorageControl.openChapter();
		}else{
			LocalStorageControl.addIcon(50);			
		}
		this.gm.touchChildren = false;
		this.pv.touchChildren = false;
		const rv = new ResultView(result);
		this.addChild(rv);

	}
}
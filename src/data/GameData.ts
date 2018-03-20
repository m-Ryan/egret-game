class GameData{
	//当前舞台
	public static stage: Main;

	//当前场景
	public static sceen: egret.Sprite;
	//最大行列
	public static maxRow = 10;
	public static maxColumn = 10;

	//设置的舞台宽高
	public static stageW: number = 640;
	public static stageH: number = 1136;

	public static elementWidth:number = (640 - 40)/GameData.maxColumn;
	public static elements: GameElement[]; //元素数组
	public static elementViews: ElementView[]; //显示元素数组
	public static elementTypes: string[] = ["e0_png","e1_png","e2_png","e3_png","e4_png","e5_png"]; //元素类型数组

	public static drawLineSprite: egret.Sprite;
	public static eleParentSprite: egret.Sprite;
	//地图数据
	public static gameMap: GameMap;
	public static mapData: number[]; //存放对应元素的状态,0代表为空 ， 1代表存在

	public static promptNum: number =0;

	public static level: number = 1;
	

	public static backgroundImage: string = "defaultBg_png";

	//时间控制
	public static timerManager: TimerView;

	
	public static resetData(){
		this.elements = new Array(); //元素数组
		this.elementViews = new Array(); //显示元素数组
		this.mapData = new Array();
	}
}
class HomeBtnsView extends egret.Sprite{
	public constructor() {
		super();
		this.touchChildren = true;
		this.init();
	}
	private init(){
		this.createChapter();
		this.createStore();
	}

	//章节关卡
	private createChapter(){
		let btn: EnterChapterBtn = new EnterChapterBtn("startbtn_png", 225, 85, 230, 255, null);
        this.addChild(btn);
	}


	private createStore(){
		let btn: EnterStoreBtn = new EnterStoreBtn("storebtn_png", 225, 85, 230, 400, null);
        this.addChild(btn);
	}

}
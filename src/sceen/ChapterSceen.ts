class ChapterSceen extends  egret.Sprite{
	private group:eui.Group;
	public constructor() {
		super();
		this.touchEnabled=true;
		this.touchChildren=true;
		this.init();
	}

	private init(){
		//创建背景图
		let cs = GameData.stage.createBitmapByName("chapter_sceen_jpg");
		cs.width = GameData.stageW;
        cs.height = GameData.stageH;
		this.addChild(cs);
        var myscrollView:egret.ScrollView = new egret.ScrollView();
        myscrollView.width = GameData.stageW;
        myscrollView.height = GameData.stageH - 200;
		myscrollView.y = 100;
        this.addChild(myscrollView);
		let content = this.createElements();
		myscrollView.setContent(content);
		myscrollView.touchEnabled=true;
		myscrollView.touchChildren=true;
		myscrollView.addEventListener(egret.TouchEvent.TOUCH_TAP,this.do,this);
		//创建返回按钮
		const backbtn = new BackBtn("back_btn_png", 225, 80, GameData.stageW - 250, 20, "Home");
		this.addChild(backbtn);
	}
	do(evt:TouchEvent){
		let target: any = evt.target;
		if(target.type == "unlock"){
			SceenControl.loadGame(target.id);
		}
	}

	private createElements(): egret.Sprite{
		let len = ChapterConfig.getChapterNum();
		let row = Math.ceil(len / 3);
		let column =  3;
		let parent: egret.Sprite = new egret.Sprite();
		let girdW = (GameData.stageW - 160) / 3;
		let child: egret.Sprite;
		for(let i=0;i<row;i++){
			for(let j=0;j<column;j++){
				let id = i * row + j;
				if(i * column +j ==len) return parent;
				if(id <= LocalStorageControl.getChapter()){
					child=new UnLockChapter(id+1, girdW, girdW);
				}else{
					child = new LockChapter(id+1, girdW, girdW);
				}
				child.x = 40 + j * (child.width + 40);
				child.y = 150 + i * (child.width + 40 );
				parent.addChild(child)
			}
		}
		parent.touchEnabled=true;
		parent.touchChildren=true;

	}


}
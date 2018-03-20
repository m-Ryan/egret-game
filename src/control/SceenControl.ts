class SceenControl{

	//加载主页
	public static loadHome(){
		this.load(new HomeSceen())
	}

	//加载章节页面
	public static loadChapter(){
		this.load(new ChapterSceen())
	}

	//加载游戏页面
	public static loadGame(chapter: number){
		this.load(new GameSceen())
	}

	//加载商店页面
	public static loadStore(){
		this.load(new StoreSceen())
	}

	private static load(fn){
		GameData.stage.removeChildren();
		const child = fn;
		GameData.sceen = child;
		GameData.stage.addChild(child);
	}
	
}
class PropsManager {
	public static userProps(propsId: number){
		switch(propsId){
			case 0:
				this.promptProps();
				break;
			case 1:
				this.stopTimeProps();
				break;
			case 2:
				this.resetMap();
		}
	}

	//提示
	private static promptProps(){
		if(!GameData.gameMap.isReady) return ;
		if(ConnectLogic.prompt(true, true)){
			GameData.promptNum--;
			GameData.gameMap.checkCanLine()
		};
	}

	//暂停时间
	private static stopTimeProps(){
		GameData.timerManager.pause();
	}

	//重置地图数据
	private static resetMap(){
		GameData.gameMap.createAllElement();
	}
}
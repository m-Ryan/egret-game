class LocalStorageControl {
	public static initData(){
	//	if(!this.isInited()){
			egret.localStorage.clear();
			egret.localStorage.setItem("icon", InitConfigData.icon.toString());//设置初始金币
			egret.localStorage.setItem("chapter", InitConfigData.chapter.toString());// 设置初始关卡
			egret.localStorage.setItem("prompt", InitConfigData.prompt.toString());// 设置初始关卡
			egret.localStorage.setItem("pause", InitConfigData.pause.toString());// 设置初始关卡
			egret.localStorage.setItem("reset", InitConfigData.reset.toString());// 设置初始关卡
			egret.localStorage.setItem("isInited", "1");//初始化完成标志
		//}
	}

	public static openChapter(){
		let currentChapter = Number(egret.localStorage.getItem("chapter"));
		if(currentChapter<100){
			egret.localStorage.setItem("chapter",(currentChapter+1).toString());// 设置初始关卡
		}
	}

	public static getChapter(){
		return Number(egret.localStorage.getItem("chapter"));
	}

	public static addIcon(add: number){
		let icon = Number(egret.localStorage.getItem("icon"));
		egret.localStorage.setItem("icon",(icon + add).toString());// 设置初始关卡
	}


	public static useIcon(use: number){
		let icon = Number(egret.localStorage.getItem("icon"));
		egret.localStorage.setItem("icon",(icon - use).toString());// 设置初始关卡
	}

	public static getIcon(){
		return Number(egret.localStorage.getItem("icon"));
	}

	private static isInited(){
		return !!egret.localStorage.getItem("isInited");
	}


	//道具数目

	public static getPropsItemNum(key: string){
		return Number(egret.localStorage.getItem(key));
	}

	public static addPropsItemNum(key: string){
		let keyNum = Number(egret.localStorage.getItem(key))+1;
		egret.localStorage.setItem(key,keyNum.toString());// 购买道具
	}

	public static usePropsItemNum(key: string){
		let keyNum = Number(egret.localStorage.getItem(key)) - 1;
		egret.localStorage.setItem(key,keyNum.toString());// 使用道具
	}
}
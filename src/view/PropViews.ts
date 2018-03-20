class PropViews extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private init(){
		this.createProps();
	}

	private createProps(){
		const girdSize = (GameData.stageW - 160) /3
		//提示道具
		const promptView = new BasePropsElements(0, "prompt_png", girdSize);
		promptView.y= GameData.stageH - girdSize - 30;
		promptView.x= 40;
		this.addChild(promptView);

		//暂停时间道具
		const stopTimeView = new BasePropsElements(1, "pause_png", girdSize);
		stopTimeView.y= GameData.stageH - girdSize - 30;
		stopTimeView.x= 80 + girdSize
		this.addChild(stopTimeView);
		
		//重新开具道具
		const resetView = new BasePropsElements(2, "reset_png", girdSize);
		resetView.y= GameData.stageH - girdSize - 30;
		resetView.x= 120 + girdSize * 2;
		this.addChild(resetView);

		//重新开具道具

	}

}
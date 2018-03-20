class TimerView extends egret.Sprite{
	private timer: egret.Timer;
	private listener: egret.Sprite;
	private timerNumberSp : egret.Sprite;
	private pauseTimer = null;
	public constructor(dedelay: number, replayCount: number ,listener: egret.Sprite) {
		super();
        this.timer = new egret.Timer(dedelay,replayCount);   
		this.listener = listener;  
		this.init();
	}

	private init(){
		this.createTimerImage();
	}

	private createTimerImage(){
		let timerBg:egret.Bitmap = new egret.Bitmap();
        timerBg.texture = RES.getRes("timer_png");
		timerBg.width=114;
		timerBg.height=45;
        this.addChild(timerBg);
		this.timerNumberSp = new egret.Sprite();
		this.timerNumberSp.width=114;
		this.timerNumberSp.height=45;
		this.addChild(this.timerNumberSp);
		this.update();
	}

	public update(){
		this.timerNumberSp.removeChildren();
		let num: number = this.timer.repeatCount - this.timer.currentCount;
		  //创建 TextField 对象
        var label:egret.TextField = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 30;
		label.width = 115;
		label.height = 45;
		label.textAlign = 'center';
		label.verticalAlign = 'middle';
        //设置显示文本
		label.text = num.toString();
        //添加到显示列表
        this.timerNumberSp.addChild(label);	
	}

	private do(){
		this.update()
    }
    private complete(){
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.do,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.complete,this);
		if(GameData.sceen == this.listener){
		   GameData.gameMap.timeout();
		}
    }

	public start(){
		//开始计时
        this.timer.start();
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.do,this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.complete,this);
	}

	public stop(){
		this.timer.stop();
	}

	public pause(){
		//如果正在暂停
		if(this.pauseTimer) {
			LocalStorageControl.addPropsItemNum('pause');
			return false;
		}
		this.timer.stop();
		this.pauseTimer=setTimeout(()=> {
			this.pauseTimer = null;
			if(GameData.sceen != this.listener) return clearTimeout(this.pauseTimer);
			if(this.timer) return this.timer.start();	
		}, TimerData.pauseTime * 1000);
	}
	public reset(){
		this.timer.reset();
	}

	public running(): boolean{
		return this.timer.running;
	}
}
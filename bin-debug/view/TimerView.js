var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TimerView = (function (_super) {
    __extends(TimerView, _super);
    function TimerView(dedelay, replayCount, listener) {
        var _this = _super.call(this) || this;
        _this.pauseTimer = null;
        _this.timer = new egret.Timer(dedelay, replayCount);
        _this.listener = listener;
        _this.init();
        return _this;
    }
    TimerView.prototype.init = function () {
        this.createTimerImage();
    };
    TimerView.prototype.createTimerImage = function () {
        var timerBg = new egret.Bitmap();
        timerBg.texture = RES.getRes("timer_png");
        timerBg.width = 114;
        timerBg.height = 45;
        this.addChild(timerBg);
        this.timerNumberSp = new egret.Sprite();
        this.timerNumberSp.width = 114;
        this.timerNumberSp.height = 45;
        this.addChild(this.timerNumberSp);
        this.update();
    };
    TimerView.prototype.update = function () {
        this.timerNumberSp.removeChildren();
        var num = this.timer.repeatCount - this.timer.currentCount;
        //创建 TextField 对象
        var label = new egret.TextField();
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
    };
    TimerView.prototype.do = function () {
        this.update();
    };
    TimerView.prototype.complete = function () {
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.do, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.complete, this);
        if (GameData.sceen == this.listener) {
            GameData.gameMap.timeout();
        }
    };
    TimerView.prototype.start = function () {
        //开始计时
        this.timer.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.do, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.complete, this);
    };
    TimerView.prototype.stop = function () {
        this.timer.stop();
    };
    TimerView.prototype.pause = function () {
        var _this = this;
        //如果正在暂停
        if (this.pauseTimer) {
            LocalStorageControl.addPropsItemNum('pause');
            return false;
        }
        this.timer.stop();
        this.pauseTimer = setTimeout(function () {
            _this.pauseTimer = null;
            if (GameData.sceen != _this.listener)
                return clearTimeout(_this.pauseTimer);
            if (_this.timer)
                return _this.timer.start();
        }, TimerData.pauseTime * 1000);
    };
    TimerView.prototype.reset = function () {
        this.timer.reset();
    };
    TimerView.prototype.running = function () {
        return this.timer.running;
    };
    return TimerView;
}(egret.Sprite));
__reflect(TimerView.prototype, "TimerView");
//# sourceMappingURL=TimerView.js.map
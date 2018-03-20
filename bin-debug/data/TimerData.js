var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimerData = (function () {
    function TimerData() {
    }
    TimerData.time = 90; //游戏时间单位秒
    TimerData.pauseTime = 5; //单位秒
    TimerData.eleDisappearTime = 200; //元素找到到消失的时间/毫秒
    return TimerData;
}());
__reflect(TimerData.prototype, "TimerData");
//# sourceMappingURL=TimerData.js.map
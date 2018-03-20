var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEventManager = (function () {
    function GameEventManager() {
    }
    GameEventManager.timeout = function () {
        egret.log('时间到');
    };
    return GameEventManager;
}());
__reflect(GameEventManager.prototype, "GameEventManager");
//# sourceMappingURL=GameEventManager.js.map
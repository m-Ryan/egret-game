var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InitConfigData = (function () {
    function InitConfigData() {
    }
    InitConfigData.icon = 1000;
    InitConfigData.chapter = 0;
    InitConfigData.prompt = 3;
    InitConfigData.pause = 3;
    InitConfigData.reset = 3;
    return InitConfigData;
}());
__reflect(InitConfigData.prototype, "InitConfigData");
//# sourceMappingURL=InitConfigData.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceenControl = (function () {
    function SceenControl() {
    }
    //加载主页
    SceenControl.loadHome = function () {
        this.load(new HomeSceen());
    };
    //加载章节页面
    SceenControl.loadChapter = function () {
        this.load(new ChapterSceen());
    };
    //加载游戏页面
    SceenControl.loadGame = function (chapter) {
        this.load(new GameSceen());
    };
    //加载商店页面
    SceenControl.loadStore = function () {
        this.load(new StoreSceen());
    };
    SceenControl.load = function (fn) {
        GameData.stage.removeChildren();
        var child = fn;
        GameData.sceen = child;
        GameData.stage.addChild(child);
    };
    return SceenControl;
}());
__reflect(SceenControl.prototype, "SceenControl");
//# sourceMappingURL=SceenControl.js.map
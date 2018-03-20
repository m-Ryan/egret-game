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
var GameSceen = (function (_super) {
    __extends(GameSceen, _super);
    function GameSceen() {
        var _this = _super.call(this) || this;
        _this.chapter = LocalStorageControl.getChapter();
        _this.init();
        return _this;
    }
    GameSceen.prototype.init = function () {
        //加载背景
        var gb = new GameBackground(this.chapter, this);
        this.addChild(gb);
        //加载地图数据
        this.gm = new GameMap(this);
        GameData.gameMap = this.gm;
        this.addChild(this.gm);
        //加载道具
        this.pv = new PropViews();
        this.addChild(this.pv);
        //创建返回按钮
        var backbtn = new BackBtn("back_btn_png", 120, 60, GameData.stageW - 140, 20, "Chapter");
        this.addChild(backbtn);
    };
    GameSceen.prototype.showResult = function (result) {
        if (result) {
            LocalStorageControl.addIcon(100 + this.chapter * 10);
            LocalStorageControl.openChapter();
        }
        else {
            LocalStorageControl.addIcon(50);
        }
        this.gm.touchChildren = false;
        this.pv.touchChildren = false;
        var rv = new ResultView(result);
        this.addChild(rv);
    };
    return GameSceen;
}(egret.Sprite));
__reflect(GameSceen.prototype, "GameSceen");
//# sourceMappingURL=GameSceen.js.map
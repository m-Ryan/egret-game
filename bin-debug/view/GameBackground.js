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
var GameBackground = (function (_super) {
    __extends(GameBackground, _super);
    function GameBackground(chapter, parent) {
        var _this = _super.call(this) || this;
        _this.chapter = chapter;
        _this.thisparent = parent;
        _this.changeBackground();
        return _this;
    }
    GameBackground.prototype.changeBackground = function () {
        this.cacheAsBitmap = false;
        this.removeChildren();
        this.createBackgroundImage();
        this.createLevelImage();
        this.createTimerImage();
        this.createIconView();
        this.cacheAsBitmap = true;
    };
    GameBackground.prototype.createBackgroundImage = function () {
        var url = ChapterConfig.getData(this.chapter + 1).background;
        var bgImg = new egret.Bitmap();
        bgImg.width = GameData.stageW;
        bgImg.height = GameData.stageH;
        bgImg.texture = RES.getRes(url);
        this.addChild(bgImg);
    };
    GameBackground.prototype.createLevelImage = function () {
        var label = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 40;
        label.width = GameData.stageW;
        label.height = 80;
        label.textAlign = 'center';
        label.verticalAlign = 'middle';
        //设置显示文本
        label.text = (this.chapter + 1).toString();
        this.addChild(label);
    };
    GameBackground.prototype.createTimerImage = function () {
        var tv = new TimerView(1000, TimerData.time, this.thisparent);
        GameData.timerManager = tv;
        this.addChild(tv);
        tv.x = 20;
        tv.y = 160;
    };
    GameBackground.prototype.createIconView = function () {
        var label = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffff00;
        //设置字号
        label.size = 40;
        label.width = 260;
        label.height = 110;
        label.textAlign = 'center';
        label.verticalAlign = 'middle';
        //设置显示文本
        label.text = LocalStorageControl.getIcon().toString();
        this.addChild(label);
    };
    return GameBackground;
}(egret.Sprite));
__reflect(GameBackground.prototype, "GameBackground");
//# sourceMappingURL=GameBackground.js.map
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
var HomeBtnsView = (function (_super) {
    __extends(HomeBtnsView, _super);
    function HomeBtnsView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.init();
        return _this;
    }
    HomeBtnsView.prototype.init = function () {
        this.createChapter();
        this.createStore();
    };
    //章节关卡
    HomeBtnsView.prototype.createChapter = function () {
        var btn = new EnterChapterBtn("startbtn_png", 225, 85, 230, 255, null);
        this.addChild(btn);
    };
    HomeBtnsView.prototype.createStore = function () {
        var btn = new EnterStoreBtn("storebtn_png", 225, 85, 230, 400, null);
        this.addChild(btn);
    };
    return HomeBtnsView;
}(egret.Sprite));
__reflect(HomeBtnsView.prototype, "HomeBtnsView");
//# sourceMappingURL=HomeBtnsView.js.map
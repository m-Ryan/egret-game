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
var PassView = (function (_super) {
    __extends(PassView, _super);
    function PassView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.init();
        return _this;
    }
    PassView.prototype.init = function () {
        this.createView();
    };
    PassView.prototype.createView = function () {
        var bgImg = new egret.Bitmap();
        bgImg.texture = RES.getRes("win_png");
        bgImg.height = GameData.stageH;
        bgImg.width = GameData.stageW;
        this.addChild(bgImg);
        this.createBtnView();
    };
    PassView.prototype.createBtnView = function () {
        var backBtn = new BackBtn('exit_png', 200, 100, 100, GameData.stageH - 400, 'Chapter');
        this.addChild(backBtn);
        var againBtn = new BackBtn('next_png', 200, 100, 300, GameData.stageH - 400, 'Game');
        this.addChild(againBtn);
    };
    return PassView;
}(egret.Sprite));
__reflect(PassView.prototype, "PassView");
//# sourceMappingURL=PassView.js.map
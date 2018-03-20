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
var BuyFailView = (function (_super) {
    __extends(BuyFailView, _super);
    function BuyFailView(parent) {
        var _this = _super.call(this) || this;
        _this.thisparent = parent;
        _this.init();
        return _this;
    }
    BuyFailView.prototype.init = function () {
        var _this = this;
        var failPic = GameData.stage.createBitmapByName("buy_fail_png");
        this.addChild(failPic);
        failPic.width = 530;
        failPic.height = 335;
        failPic.x = (GameData.stageW - 530) / 2;
        failPic.y = (GameData.stageH - 335) / 2;
        var timer = setTimeout(function () {
            if (_this.parent) {
                _this.thisparent.removeChild(_this);
            }
        }, 1000);
    };
    return BuyFailView;
}(egret.Sprite));
__reflect(BuyFailView.prototype, "BuyFailView");
//# sourceMappingURL=BuyFailView.js.map
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
var ElementView = (function (_super) {
    __extends(ElementView, _super);
    function ElementView(parent, id, bitmapName) {
        var _this = _super.call(this) || this;
        _this.duration = 3000;
        _this.speed = 1000;
        _this.elePadding = 5;
        _this.thisParent = parent;
        _this.id = id;
        _this.init(bitmapName, id);
        return _this;
    }
    ElementView.prototype.init = function (bitmapName, id) {
        this.touchEnabled = true;
        this.touchChildren = false;
        this.bitmap = new egret.Bitmap();
        this.bitmap.width = GameData.elementWidth - 10;
        this.bitmap.height = GameData.elementWidth - 10;
        this.bitmap.texture = RES.getRes(bitmapName);
        this.bitmap.x = -1 * GameData.elementWidth; // 左偏移两个元素的距离
        this.bitmap.y = -1 * GameData.elementWidth;
    };
    ElementView.prototype.show = function () {
        var wait = (50 * GameData.maxColumn * GameData.maxRow) - (GameData.elements[this.id].locationX + GameData.maxRow * GameData.elements[this.id].locationY) * 50;
        var tw = egret.Tween.get(this);
        tw.wait(wait, false);
        tw.call(this.addThisToParent, this);
        tw.to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceOut);
        this.filters = [ColorGlowFilter.transparentGF];
    };
    ElementView.prototype.addThisToParent = function () {
        this.addChild(this.bitmap);
    };
    //目标X轴位置
    ElementView.prototype.targetX = function () {
        var girdwidth = GameData.elementWidth;
        var xx = 20 + girdwidth * (this.id % GameData.maxRow) + 1 * girdwidth + this.elePadding;
        return xx;
    };
    //目标Y轴位置
    ElementView.prototype.targetY = function () {
        var girdwidth = GameData.elementWidth;
        var startY = 0;
        var downHeight = girdwidth * (Math.floor(this.id / GameData.maxColumn)) + girdwidth * 1 + this.elePadding;
        var yy = startY + downHeight;
        return yy;
    };
    ElementView.prototype.onFocusing = function () {
        this.filters = [ColorGlowFilter.yellowGF];
    };
    ElementView.prototype.onBluring = function () {
        this.filters = [ColorGlowFilter.transparentGF];
    };
    ElementView.prototype.removAnimate = function () {
        this.onBluring();
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.cubicInOut).to({ scaleX: 0.1, scaleY: 0.1 }, 300, egret.Ease.cubicInOut).call(this.removeAniCall, this);
    };
    ElementView.prototype.prompting = function () {
        this.filters = [ColorGlowFilter.blueGF];
    };
    ElementView.prototype.removeAniCall = function () {
        if (this.thisParent)
            this.thisParent.removeChild(this);
    };
    return ElementView;
}(egret.Sprite));
__reflect(ElementView.prototype, "ElementView");
//# sourceMappingURL=ElementView.js.map
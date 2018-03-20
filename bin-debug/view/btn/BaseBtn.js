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
var BaseBtn = (function (_super) {
    __extends(BaseBtn, _super);
    function BaseBtn(bitmap, w, h, x, y, args) {
        var _this = _super.call(this) || this;
        _this.args = args;
        _this.bitmap = bitmap;
        _this.touchEnabled = true;
        _this.init(w, h, x, y);
        return _this;
    }
    BaseBtn.prototype.init = function (w, h, x, y) {
        var btn = GameData.stage.createBitmapByName(this.bitmap);
        this.addChild(btn);
        btn.width = w;
        btn.height = h;
        btn.x = x;
        btn.y = y;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeEvent, this);
    };
    //这段需要覆盖,没覆盖就报错
    BaseBtn.prototype.do = function (args) {
        throw new egret.error();
    };
    BaseBtn.prototype.removeEvent = function () {
        this.do(this.args);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeEvent, this);
    };
    return BaseBtn;
}(egret.Sprite));
__reflect(BaseBtn.prototype, "BaseBtn");
//# sourceMappingURL=BaseBtn.js.map
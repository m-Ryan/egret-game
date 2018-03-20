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
var BuyBtn = (function (_super) {
    __extends(BuyBtn, _super);
    function BuyBtn(type) {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.type = type;
        _this.init();
        return _this;
    }
    BuyBtn.prototype.init = function () {
        var btn = GameData.stage.createBitmapByName("buy_png");
        this.addChild(btn);
        btn.width = 100;
        btn.height = 50;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.do, this);
    };
    BuyBtn.prototype.do = function () {
        if (this.checkIcon()) {
            LocalStorageControl.addPropsItemNum(this.type);
            LocalStorageControl.useIcon(PropsPrice[this.type]);
            SceenControl.loadStore();
        }
        else {
            var bfv = new BuyFailView(GameData.sceen);
            GameData.sceen.addChild(bfv);
        }
    };
    BuyBtn.prototype.checkIcon = function () {
        return (LocalStorageControl.getIcon() >= PropsPrice[this.type]);
    };
    return BuyBtn;
}(egret.Sprite));
__reflect(BuyBtn.prototype, "BuyBtn");
//# sourceMappingURL=BuyBtn.js.map
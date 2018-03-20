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
var StoreSceen = (function (_super) {
    __extends(StoreSceen, _super);
    function StoreSceen() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    StoreSceen.prototype.init = function () {
        var bgImg = GameData.stage.createBitmapByName("store_png");
        bgImg.width = GameData.stageW;
        bgImg.height = GameData.stageH;
        this.addChild(bgImg);
        //加载金币视图
        var iv = new IconView();
        this.addChild(iv);
        //创建返回按钮
        var backbtn = new BackBtn("back_btn_png", 120, 60, GameData.stageW - 140, 20, "Home");
        this.addChild(backbtn);
        //道具视图
        var promtpItem = new PropsShopItem("prompt_png", "prompt", 300, "快速提示");
        this.addChild(promtpItem);
        var pauseItem = new PropsShopItem("pause_png", "pause", 450, "时间暂停");
        this.addChild(pauseItem);
        var resetItem = new PropsShopItem("reset_png", "reset", 600, "重新整理");
        this.addChild(resetItem);
    };
    return StoreSceen;
}(egret.Sprite));
__reflect(StoreSceen.prototype, "StoreSceen");
//# sourceMappingURL=StoreSceen.js.map
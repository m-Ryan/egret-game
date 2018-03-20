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
var HomeSceen = (function (_super) {
    __extends(HomeSceen, _super);
    function HomeSceen() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    HomeSceen.prototype.init = function () {
        var bgImg = new egret.Bitmap();
        bgImg.texture = RES.getRes("homebg_png");
        bgImg.width = GameData.stageW;
        bgImg.height = GameData.stageH;
        this.addChild(bgImg);
        //按钮
        var htv = new HomeBtnsView();
        this.addChild(htv);
    };
    return HomeSceen;
}(egret.Sprite));
__reflect(HomeSceen.prototype, "HomeSceen");
//# sourceMappingURL=HomeSceen.js.map
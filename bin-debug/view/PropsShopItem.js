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
var PropsShopItem = (function (_super) {
    __extends(PropsShopItem, _super);
    function PropsShopItem(bitmapName, type, y, text) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.createView(bitmapName, y, text);
        return _this;
    }
    PropsShopItem.prototype.createView = function (bitmapName, y, text) {
        var promptBtn = GameData.stage.createBitmapByName(bitmapName);
        this.addChild(promptBtn);
        promptBtn.width = 100;
        promptBtn.height = 100;
        promptBtn.x = 100;
        promptBtn.y = y;
        //创建 TextField 对象
        var label = new egret.TextField();
        //设置字体
        label.fontFamily = "Arial";
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 30;
        label.bold = true;
        //设置显示文本
        label.text = PropsPrice.prompt.toString();
        //添加到显示列表
        this.addChild(label);
        label.x = 250;
        label.y = y + 10;
        //创建 TextField 对象
        var showText = new egret.TextField();
        //设置字体
        showText.fontFamily = "Arial";
        //设置文本颜色
        showText.textColor = 0xffffff;
        showText.bold = true;
        //设置字号
        showText.size = 30;
        //设置显示文本
        showText.text = text;
        //添加到显示列表
        this.addChild(showText);
        showText.x = 250;
        showText.y = y + 60;
        //创建 TextField 对象
        var num = new egret.TextField();
        //设置字体
        num.fontFamily = "Arial";
        //设置文本颜色
        num.textColor = 0xffffff;
        num.bold = true;
        //设置字号
        num.size = 30;
        //设置显示文本
        num.text = LocalStorageControl.getPropsItemNum(this.type).toString();
        //添加到显示列表
        this.addChild(num);
        num.x = 400;
        num.y = y + 20;
        var buybtn = new BuyBtn(this.type);
        this.addChild(buybtn);
        buybtn.width = 200;
        buybtn.height = 70;
        buybtn.x = 470;
        buybtn.y = y + 20;
    };
    return PropsShopItem;
}(egret.Sprite));
__reflect(PropsShopItem.prototype, "PropsShopItem");
//# sourceMappingURL=PropsShopItem.js.map
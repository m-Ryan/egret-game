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
var IconView = (function (_super) {
    __extends(IconView, _super);
    function IconView() {
        var _this = _super.call(this) || this;
        _this.createIconView();
        return _this;
    }
    IconView.prototype.createIconView = function () {
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
    return IconView;
}(egret.Sprite));
__reflect(IconView.prototype, "IconView");
//# sourceMappingURL=IconView.js.map
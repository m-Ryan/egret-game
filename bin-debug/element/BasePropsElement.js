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
var BasePropsElements = (function (_super) {
    __extends(BasePropsElements, _super);
    function BasePropsElements(propsId, texture, girdSize) {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.propsId = propsId;
        _this.texture = texture;
        _this.girdSize = girdSize;
        _this.init();
        return _this;
    }
    BasePropsElements.prototype.init = function () {
        this.createProps();
    };
    BasePropsElements.prototype.createProps = function () {
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(this.texture);
        bitmap.width = this.girdSize;
        bitmap.height = this.girdSize;
        this.addChild(bitmap);
        //创建 TextField 对象
        var label = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 40;
        label.width = this.girdSize - 20;
        label.height = 60;
        label.textAlign = 'right';
        label.verticalAlign = 'middle';
        //设置显示文本
        label.text = LocalStorageControl.getPropsItemNum(this.texture.slice(0, this.texture.length - 4)).toString();
        this.addChild(label);
        this.numText = label;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.propsTap, this);
    };
    BasePropsElements.prototype.updatePropsNum = function () {
        console.log('update');
        this.removeChild(this.numText);
        //创建 TextField 对象
        var label = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 40;
        label.width = this.girdSize - 20;
        label.height = 60;
        label.textAlign = 'right';
        label.verticalAlign = 'middle';
        //设置显示文本
        label.text = LocalStorageControl.getPropsItemNum(this.texture.slice(0, this.texture.length - 4)).toString();
        this.addChild(label);
        this.numText = label;
    };
    BasePropsElements.prototype.propsTap = function (evt) {
        var props = this.texture.slice(0, this.texture.length - 4);
        if (!LocalStorageControl.getPropsItemNum(props))
            return;
        LocalStorageControl.usePropsItemNum(props);
        this.updatePropsNum();
        PropsManager.userProps(this.propsId);
    };
    return BasePropsElements;
}(egret.Sprite));
__reflect(BasePropsElements.prototype, "BasePropsElements");
//# sourceMappingURL=BasePropsElement.js.map
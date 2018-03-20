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
var UnLockChapter = (function (_super) {
    __extends(UnLockChapter, _super);
    function UnLockChapter(id, w, h) {
        var _this = _super.call(this) || this;
        _this.type = "unlock";
        _this.touchEnabled = true;
        _this.id = id;
        _this.init(w, h);
        return _this;
    }
    UnLockChapter.prototype.init = function (w, h) {
        var unlock = GameData.stage.createBitmapByName("unlock_png");
        unlock.width = w;
        unlock.height = h;
        this.addChild(unlock);
        //创建 TextField 对象
        var label = new egret.TextField();
        //设置文本颜色
        label.textColor = 0xffffff;
        //设置字号
        label.size = 40;
        label.bold = true;
        label.stroke = 2;
        label.width = w;
        label.height = h;
        label.strokeColor = 0x000000;
        label.textAlign = 'center';
        label.verticalAlign = 'middle';
        //设置显示文本
        label.text = this.id.toString();
        //添加到显示列表
        this.addChild(label);
    };
    return UnLockChapter;
}(egret.Sprite));
__reflect(UnLockChapter.prototype, "UnLockChapter");
//# sourceMappingURL=UnLockChapter.js.map
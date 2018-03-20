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
var LockChapter = (function (_super) {
    __extends(LockChapter, _super);
    function LockChapter(id, w, h) {
        var _this = _super.call(this) || this;
        _this.type = "lock";
        _this.touchEnabled = true;
        _this.id = id;
        _this.init(w, h);
        return _this;
    }
    LockChapter.prototype.init = function (w, h) {
        var lock = GameData.stage.createBitmapByName("cadeado_png");
        lock.width = w;
        lock.height = h;
        this.addChild(lock);
    };
    return LockChapter;
}(egret.Sprite));
__reflect(LockChapter.prototype, "LockChapter");
//# sourceMappingURL=LockChapter.js.map
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
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView(result) {
        var _this = _super.call(this) || this;
        _this.init(result);
        return _this;
    }
    ResultView.prototype.init = function (result) {
        this.createView(result);
    };
    ResultView.prototype.createView = function (result) {
        var rv;
        if (result) {
            rv = new PassView();
        }
        else {
            rv = new LoseView();
        }
        this.addChild(rv);
    };
    ResultView.prototype.update = function () {
    };
    return ResultView;
}(egret.Sprite));
__reflect(ResultView.prototype, "ResultView");
//# sourceMappingURL=ResultView.js.map
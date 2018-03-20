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
var PropViews = (function (_super) {
    __extends(PropViews, _super);
    function PropViews() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    PropViews.prototype.init = function () {
        this.createProps();
    };
    PropViews.prototype.createProps = function () {
        var girdSize = (GameData.stageW - 160) / 3;
        //提示道具
        var promptView = new BasePropsElements(0, "prompt_png", girdSize);
        promptView.y = GameData.stageH - girdSize - 30;
        promptView.x = 40;
        this.addChild(promptView);
        //暂停时间道具
        var stopTimeView = new BasePropsElements(1, "pause_png", girdSize);
        stopTimeView.y = GameData.stageH - girdSize - 30;
        stopTimeView.x = 80 + girdSize;
        this.addChild(stopTimeView);
        //重新开具道具
        var resetView = new BasePropsElements(2, "reset_png", girdSize);
        resetView.y = GameData.stageH - girdSize - 30;
        resetView.x = 120 + girdSize * 2;
        this.addChild(resetView);
        //重新开具道具
    };
    return PropViews;
}(egret.Sprite));
__reflect(PropViews.prototype, "PropViews");
//# sourceMappingURL=PropViews.js.map
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
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.propToElementLocation = 0; //携带道具点击的元素位置
        _this.ele1 = 0; //第一个点击的元素
        _this.ele2 = 0; //第二个点击的元素
        return _this;
    }
    GameEvent.TAP_TWO_ELEMENT = "tap_two_element";
    GameEvent.REMOVE_ANIMATION_OVER = "remove_animation_over";
    GameEvent.UPDATE_MAP = "update_map";
    GameEvent.UPDATE_VIEW_OVER = "update_view_over";
    GameEvent.USE_PROP_CLICK = "use_prop_click";
    GameEvent.TIME_OUT = "time_out";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map
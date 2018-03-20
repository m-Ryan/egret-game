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
var BackBtn = (function (_super) {
    __extends(BackBtn, _super);
    function BackBtn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackBtn.prototype.do = function (sceen) {
        switch (sceen) {
            case "Home":
                SceenControl.loadHome();
                break;
            case "Chapter":
                SceenControl.loadChapter();
                break;
            case "Game":
                SceenControl.loadGame(LocalStorageControl.getChapter());
                break;
        }
    };
    return BackBtn;
}(BaseBtn));
__reflect(BackBtn.prototype, "BackBtn");
//# sourceMappingURL=BackBtn.js.map
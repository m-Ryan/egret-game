var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.resetData = function () {
        this.elements = new Array(); //元素数组
        this.elementViews = new Array(); //显示元素数组
        this.mapData = new Array();
    };
    //最大行列
    GameData.maxRow = 10;
    GameData.maxColumn = 10;
    //设置的舞台宽高
    GameData.stageW = 640;
    GameData.stageH = 1136;
    GameData.elementWidth = (640 - 40) / GameData.maxColumn;
    GameData.elementTypes = ["e0_png", "e1_png", "e2_png", "e3_png", "e4_png", "e5_png"]; //元素类型数组
    GameData.promptNum = 0;
    GameData.level = 1;
    GameData.backgroundImage = "defaultBg_png";
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map
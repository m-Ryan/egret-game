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
var GameElement = (function (_super) {
    __extends(GameElement, _super);
    function GameElement(id, type) {
        var _this = _super.call(this) || this;
        _this.type = "";
        _this.id = id;
        _this.type = type;
        _this.locationX = id % GameData.maxRow;
        _this.locationY = Math.floor(id / GameData.maxRow);
        return _this;
    }
    GameElement.prototype.update = function (id) {
        this.id = id;
        this.locationX = id % GameData.maxRow;
        this.locationY = Math.floor(id / GameData.maxRow);
    };
    return GameElement;
}(egret.Sprite));
__reflect(GameElement.prototype, "GameElement");
//# sourceMappingURL=GameElement.js.map
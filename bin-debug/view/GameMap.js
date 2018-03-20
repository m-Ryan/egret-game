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
var GameMap = (function (_super) {
    __extends(GameMap, _super);
    function GameMap(parent) {
        var _this = _super.call(this) || this;
        _this.isReady = false; //是否可以开始
        _this.thisParent = parent;
        _this.init();
        return _this;
    }
    GameMap.prototype.init = function () {
        this.createBottomSprite();
        this.createAllElement();
    };
    //创建一个sprite置于底层，用于游戏中连线的时候用，一个sprite用于放置element元素
    GameMap.prototype.createBottomSprite = function () {
        var sp = new egret.Sprite();
        this.addChild(sp);
        GameData.drawLineSprite = sp;
        var eleParent = new egret.Sprite();
        this.addChild(eleParent);
        GameData.eleParentSprite = eleParent;
    };
    //创建地图元素
    GameMap.prototype.createAllElement = function () {
        var _this = this;
        this.touchChildren = false;
        this.isReady = false;
        GameData.timerManager.reset();
        GameData.eleParentSprite.removeChildren();
        GameData.drawLineSprite.removeChildren();
        GameData.elementViews = new Array();
        GameData.mapData = new Array();
        GameData.elements = new Array();
        var temp = new Array();
        var eleTypes = GameData.elementTypes;
        var bitmapWidth = GameData.elementWidth;
        var len = (GameData.maxRow - 2) * (GameData.maxColumn - 2);
        for (var i = 0; i < len; i++) {
            if (i > 0 && i % 2 == 1) {
                var bitmapName = eleTypes[Math.floor(Math.random() * eleTypes.length)];
                var gele1 = new GameElement(i - 1, bitmapName);
                var gele2 = new GameElement(i, bitmapName);
                temp.push(gele1);
                temp.push(gele2);
            }
        }
        temp = temp.sort(function () { return 0.5 - Math.random(); });
        for (var i = 0; i < GameData.maxRow; i++) {
            for (var j = 0; j < GameData.maxColumn; j++) {
                var id = i + GameData.maxRow * j;
                if (i == 0 || j == 0 || i == (GameData.maxRow - 1) || j == (GameData.maxColumn - 1)) {
                    GameData.elements[id] = new GameElement(id, eleTypes[0]);
                }
                else {
                    GameData.elements[id] = temp.shift();
                }
            }
        }
        var girdwidth = GameData.elementWidth;
        for (var i = 0; i < GameData.maxRow; i++) {
            for (var j = 0; j < GameData.maxColumn; j++) {
                var id = i + GameData.maxRow * j;
                var gele = GameData.elements[id];
                gele.update(id);
                var ele = new ElementView(GameData.eleParentSprite, id, gele.type);
                ele.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventManger, this);
                ele.x = ele.targetX();
                ele.show();
                GameData.elementViews[id] = ele;
                if (i == 0 || j == 0 || i == (GameData.maxRow - 1) || j == (GameData.maxColumn - 1) || this.isEmptyElement(id)) {
                    GameData.mapData[id] = 0; //0表示这个位置为空
                }
                else {
                    GameData.mapData[id] = 1; //1表示这个位置不为空
                    GameData.eleParentSprite.addChild(ele);
                }
            }
        }
        this.y = 250;
        //动画结束后开始计时
        var timer = setTimeout(function () {
            if (GameData.gameMap != _this && GameData.sceen != _this)
                return clearTimeout(timer);
            _this.touchChildren = true;
            _this.isReady = true;
            GameData.timerManager.start();
        }, GameData.maxRow * GameData.maxColumn * 50);
    };
    GameMap.prototype.isEmptyElement = function (id) {
        var emptyElement = ChapterConfig.getData(LocalStorageControl.getChapter()).emptyElement; //没有出现的元素
        if (emptyElement.indexOf(id) != -1) {
            return true;
        }
        return false;
    };
    //
    GameMap.prototype.eventManger = function (evt) {
        var _this = this;
        GameData.drawLineSprite.removeChildren();
        if (!this.tap1) {
            this.tap1 = evt.target;
            this.tap1.onFocusing();
        }
        else {
            this.tap2 = evt.target;
            var ele1 = GameData.elements[this.tap1.id];
            var ele2 = GameData.elements[this.tap2.id];
            this.tap2.onFocusing();
            if (ConnectLogic.getPath(ele1, ele2)) {
                var timer_1 = setTimeout(function () {
                    if (GameData.gameMap != _this && GameData.sceen != _this)
                        return clearTimeout(timer_1);
                    _this.clearElement(_this.tap1, _this.tap2);
                }, TimerData.eleDisappearTime);
            }
            else {
                this.tap1.onBluring();
                this.tap1 = this.tap2;
                this.tap2 = null;
                this.tap1.onFocusing();
            }
        }
    };
    GameMap.prototype.clearElement = function (e1, e2) {
        ConnectLogic.clear(e1, e2);
        GameData.drawLineSprite.removeChildren();
        e2.removAnimate();
        e1.removAnimate();
        this.tap1 = null;
        this.tap2 = null;
        this.checkCanLine();
    };
    //查看是否还可以连线
    GameMap.prototype.checkCanLine = function () {
        if (!ConnectLogic.prompt(false, false)) {
            GameData.timerManager.stop();
            this.pass();
        }
    };
    GameMap.prototype.timeout = function () {
        if (!GameData.eleParentSprite.numChildren) {
            this.pass();
        }
        else {
            this.lose();
        }
    };
    GameMap.prototype.pass = function () {
        this.thisParent.showResult(true);
    };
    GameMap.prototype.lose = function () {
        this.thisParent.showResult(false);
    };
    return GameMap;
}(egret.Sprite));
__reflect(GameMap.prototype, "GameMap");
//# sourceMappingURL=GameMap.js.map
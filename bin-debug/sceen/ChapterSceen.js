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
var ChapterSceen = (function (_super) {
    __extends(ChapterSceen, _super);
    function ChapterSceen() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchChildren = true;
        _this.init();
        return _this;
    }
    ChapterSceen.prototype.init = function () {
        //创建背景图
        var cs = GameData.stage.createBitmapByName("chapter_sceen_jpg");
        cs.width = GameData.stageW;
        cs.height = GameData.stageH;
        this.addChild(cs);
        var myscrollView = new egret.ScrollView();
        myscrollView.width = GameData.stageW;
        myscrollView.height = GameData.stageH - 200;
        myscrollView.y = 100;
        this.addChild(myscrollView);
        var content = this.createElements();
        myscrollView.setContent(content);
        myscrollView.touchEnabled = true;
        myscrollView.touchChildren = true;
        myscrollView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.do, this);
        //创建返回按钮
        var backbtn = new BackBtn("back_btn_png", 225, 80, GameData.stageW - 250, 20, "Home");
        this.addChild(backbtn);
    };
    ChapterSceen.prototype.do = function (evt) {
        var target = evt.target;
        if (target.type == "unlock") {
            SceenControl.loadGame(target.id);
        }
    };
    ChapterSceen.prototype.createElements = function () {
        var len = ChapterConfig.getChapterNum();
        var row = Math.ceil(len / 3);
        var column = 3;
        var parent = new egret.Sprite();
        var girdW = (GameData.stageW - 160) / 3;
        var child;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < column; j++) {
                var id = i * row + j;
                if (i * column + j == len)
                    return parent;
                if (id <= LocalStorageControl.getChapter()) {
                    child = new UnLockChapter(id + 1, girdW, girdW);
                }
                else {
                    child = new LockChapter(id + 1, girdW, girdW);
                }
                child.x = 40 + j * (child.width + 40);
                child.y = 150 + i * (child.width + 40);
                parent.addChild(child);
            }
        }
        parent.touchEnabled = true;
        parent.touchChildren = true;
    };
    return ChapterSceen;
}(egret.Sprite));
__reflect(ChapterSceen.prototype, "ChapterSceen");
//# sourceMappingURL=ChapterSceen.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChapterConfig = (function () {
    function ChapterConfig() {
    }
    ChapterConfig.getData = function (chapter) {
        var json = RES.getRes("chapterMap_json");
        return json[chapter];
    };
    ChapterConfig.getChapterNum = function () {
        var json = RES.getRes("chapterMap_json");
        return Object.keys(json).length;
    };
    return ChapterConfig;
}());
__reflect(ChapterConfig.prototype, "ChapterConfig");
//# sourceMappingURL=ChapterConfig.js.map
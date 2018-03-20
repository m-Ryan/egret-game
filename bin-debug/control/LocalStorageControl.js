var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageControl = (function () {
    function LocalStorageControl() {
    }
    LocalStorageControl.initData = function () {
        //	if(!this.isInited()){
        egret.localStorage.clear();
        egret.localStorage.setItem("icon", InitConfigData.icon.toString()); //设置初始金币
        egret.localStorage.setItem("chapter", InitConfigData.chapter.toString()); // 设置初始关卡
        egret.localStorage.setItem("prompt", InitConfigData.prompt.toString()); // 设置初始关卡
        egret.localStorage.setItem("pause", InitConfigData.pause.toString()); // 设置初始关卡
        egret.localStorage.setItem("reset", InitConfigData.reset.toString()); // 设置初始关卡
        egret.localStorage.setItem("isInited", "1"); //初始化完成标志
        //}
    };
    LocalStorageControl.openChapter = function () {
        var currentChapter = Number(egret.localStorage.getItem("chapter"));
        if (currentChapter < 100) {
            egret.localStorage.setItem("chapter", (currentChapter + 1).toString()); // 设置初始关卡
        }
    };
    LocalStorageControl.getChapter = function () {
        return Number(egret.localStorage.getItem("chapter"));
    };
    LocalStorageControl.addIcon = function (add) {
        var icon = Number(egret.localStorage.getItem("icon"));
        egret.localStorage.setItem("icon", (icon + add).toString()); // 设置初始关卡
    };
    LocalStorageControl.useIcon = function (use) {
        var icon = Number(egret.localStorage.getItem("icon"));
        egret.localStorage.setItem("icon", (icon - use).toString()); // 设置初始关卡
    };
    LocalStorageControl.getIcon = function () {
        return Number(egret.localStorage.getItem("icon"));
    };
    LocalStorageControl.isInited = function () {
        return !!egret.localStorage.getItem("isInited");
    };
    //道具数目
    LocalStorageControl.getPropsItemNum = function (key) {
        return Number(egret.localStorage.getItem(key));
    };
    LocalStorageControl.addPropsItemNum = function (key) {
        var keyNum = Number(egret.localStorage.getItem(key)) + 1;
        egret.localStorage.setItem(key, keyNum.toString()); // 购买道具
    };
    LocalStorageControl.usePropsItemNum = function (key) {
        var keyNum = Number(egret.localStorage.getItem(key)) - 1;
        egret.localStorage.setItem(key, keyNum.toString()); // 使用道具
    };
    return LocalStorageControl;
}());
__reflect(LocalStorageControl.prototype, "LocalStorageControl");
//# sourceMappingURL=LocalStorageControl.js.map
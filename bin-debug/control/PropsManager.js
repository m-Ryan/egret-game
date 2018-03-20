var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PropsManager = (function () {
    function PropsManager() {
    }
    PropsManager.userProps = function (propsId) {
        switch (propsId) {
            case 0:
                this.promptProps();
                break;
            case 1:
                this.stopTimeProps();
                break;
            case 2:
                this.resetMap();
        }
    };
    //提示
    PropsManager.promptProps = function () {
        if (!GameData.gameMap.isReady)
            return;
        if (ConnectLogic.prompt(true, true)) {
            GameData.promptNum--;
            GameData.gameMap.checkCanLine();
        }
        ;
    };
    //暂停时间
    PropsManager.stopTimeProps = function () {
        GameData.timerManager.pause();
    };
    //重置地图数据
    PropsManager.resetMap = function () {
        GameData.gameMap.createAllElement();
    };
    return PropsManager;
}());
__reflect(PropsManager.prototype, "PropsManager");
//# sourceMappingURL=PropsManager.js.map
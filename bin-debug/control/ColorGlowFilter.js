var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ColorGlowFilter = (function () {
    function ColorGlowFilter() {
    }
    ColorGlowFilter.transparentGF = new egret.GlowFilter(0xFFFFFF, 0, 6, 6, 20, 1); //白色
    ColorGlowFilter.whiteGF = new egret.GlowFilter(0xFFFFFF, 1, 6, 6, 20, 1); //白色
    ColorGlowFilter.redGF = new egret.GlowFilter(0xDC143C, 1, 6, 6, 20, 1); //红色
    ColorGlowFilter.blueGF = new egret.GlowFilter(0x00BFFF, 1, 6, 6, 20, 1); //蓝色
    ColorGlowFilter.yellowGF = new egret.GlowFilter(0xdbe204, 1, 6, 6, 20, 1); //黄色
    return ColorGlowFilter;
}());
__reflect(ColorGlowFilter.prototype, "ColorGlowFilter");
//# sourceMappingURL=ColorGlowFilter.js.map
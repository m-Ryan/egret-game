var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConnectLogic = (function () {
    function ConnectLogic() {
    }
    ConnectLogic.isSameType = function (ele1, ele2) {
        return ele1.type == ele2.type;
    };
    //同在x轴
    ConnectLogic.onLineX = function (ele1, ele2) {
        if (ele1.locationY == ele2.locationY) {
            return true;
        }
        return false;
    };
    //同在y轴
    ConnectLogic.onLineY = function (ele1, ele2) {
        if (ele1.locationX == ele2.locationX) {
            return true;
        }
        return false;
    };
    //是否为同个元素
    ConnectLogic.equalsElement = function (ele1, ele2) {
        //如果坐标相同则为同一个元素，返回true，否则false
        if (ele1 == ele2) {
            return true;
        }
        return false;
    };
    //是否为空
    ConnectLogic.isEmpty = function (eleId) {
        return !GameData.mapData[eleId];
    };
    //清除元素
    ConnectLogic.clear = function (ele1, ele2) {
        GameData.mapData[ele1.id] = 0;
        GameData.mapData[ele2.id] = 0;
    };
    //判断中间是否有线连
    ConnectLogic.hasLine = function (ele1, ele2) {
        if (this.equalsElement(ele1, ele2)) {
            return false;
        }
        if (this.onLineX(ele1, ele2)) {
            var min = (ele1.locationX > ele2.locationX ? ele2.id : ele1.id) + 1; //两个元素之间小的元素+1 开始算
            var max = ele1.locationX > ele2.locationX ? ele1.id : ele2.id; //两个元素之间大的元素
            var i = void 0;
            for (i = 0; i < (max - min); i++) {
                //如果中间的元素不为空，说明不能直接连接
                if (!this.isEmpty(min + i)) {
                    break;
                }
            }
            if (i == (max - min)) {
                return true;
            }
            return false;
        }
        else if (this.onLineY(ele1, ele2)) {
            var min = (ele1.locationY > ele2.locationY ? ele2.id : ele1.id) + GameData.maxRow; //两个元素之间小的元素
            var max = ele1.locationY > ele2.locationY ? ele1.id : ele2.id; //两个元素之间大的元素
            var i = void 0;
            for (i = 0; i < (max - min) / GameData.maxRow; i++) {
                //如果中间的元素不为空，说明不能直接连接
                if (!this.isEmpty(min + i * GameData.maxRow)) {
                    break;
                }
            }
            if (i == (max - min) / GameData.maxRow) {
                return true;
            }
            return false;
        }
        return false;
    };
    //连接的时候划线
    ConnectLogic.drawLine = function (eles) {
        var line = new egret.Sprite();
        var startPointX = GameData.elementViews[eles[0].id].x - 0.5 * GameData.elementWidth;
        ;
        var startPointY = GameData.elementViews[eles[0].id].y - 0.5 * GameData.elementWidth;
        ;
        line.graphics.lineStyle(5, 0x00BFFF);
        line.graphics.moveTo(startPointX, startPointY);
        for (var i = 1; i < eles.length; i++) {
            var nextPointX = GameData.elementViews[eles[i].id].x - 0.5 * GameData.elementWidth;
            var nextPointY = GameData.elementViews[eles[i].id].y - 0.5 * GameData.elementWidth;
            line.graphics.lineTo(nextPointX, nextPointY);
        }
        GameData.drawLineSprite.addChild(line);
    };
    //可以通过线段连接
    ConnectLogic.isPassToLined = function (ele1, ele2) {
        if ((this.onLineY(ele1, ele2) || this.onLineX(ele1, ele2)) && this.hasLine(ele1, ele2)) {
            return [ele1, ele2];
        }
        return [];
    };
    //封闭元素，不可连接
    ConnectLogic.isCloseElement = function (ele1, ele2) {
        var id1 = ele1.id;
        var id2 = ele2.id;
        if (!this.isEmpty(id1 + 1) && !this.isEmpty(id1 - 1) && !this.isEmpty(id1 + GameData.maxRow) && !this.isEmpty(id1 - GameData.maxRow)) {
            return true;
        }
        if (!this.isEmpty(id2 + 1) && !this.isEmpty(id2 - 1) && !this.isEmpty(id2 + GameData.maxRow) && !this.isEmpty(id2 - GameData.maxRow)) {
            return true;
        }
        return false;
    };
    //同x轴或y轴是否可以从侧面连接
    ConnectLogic.isPassFromUpOrDown = function (ele1, ele2) {
        var id1 = ele1.id;
        var id2 = ele2.id;
        var pt0, pt1, pt2, pt3;
        //每次构造4个顶点pt0, pt1, pt2, pt3，然后看他们两两之间是否连通  
        //如果都在x轴，则自左至右扫描可能的路径， 
        //因为要连线，所以要从当前出发，不能从0开始遍历
        if (this.onLineX(ele1, ele2)) {
            //往上搜索
            var toTop = ele1.locationY + 1; //到顶部的距离
            for (var i = 0; i < toTop; i++) {
                pt0 = ele1;
                pt1 = GameData.elements[ele1.id - i * GameData.maxRow];
                pt2 = GameData.elements[ele2.id - i * GameData.maxRow];
                pt3 = ele2;
                //如果顶点不为空，则该路不通。  
                if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt0, pt1, pt2, pt3];
                }
            }
            var toBottom = GameData.maxRow - ele1.locationY; //到底部的距离
            //往下搜索
            for (var i = 0; i < toBottom; i++) {
                pt0 = ele1;
                pt1 = GameData.elements[ele1.id + i * GameData.maxRow];
                pt2 = GameData.elements[ele2.id + i * GameData.maxRow];
                pt3 = ele2;
                //如果顶点不为空，则该路不通。  
                if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt0, pt1, pt2, pt3];
                }
            }
        }
        //如果都在y轴，则自上至下扫描可能的路径，  
        //每次构造4个顶点pt0, pt1, pt2, pt3，然后看他们两两之间是否连通  
        //往左搜索
        var toLeft = ele1.locationX + 1;
        if (this.onLineY(ele1, ele2)) {
            for (var i = 0; i < toLeft; i++) {
                pt0 = ele1;
                pt1 = GameData.elements[ele1.id - i];
                pt2 = GameData.elements[ele2.id - i];
                pt3 = ele2;
                //如果顶点不为空，则该路不通。  
                if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt0, pt1, pt2, pt3];
                }
            }
        }
        var toRight = GameData.maxRow - ele1.locationX;
        for (var i = 0; i < toRight; i++) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.id + i];
            pt2 = GameData.elements[ele2.id + i];
            pt3 = ele2;
            //如果顶点不为空，则该路不通。  
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        return [];
    };
    //不规则的连线，之字型连线
    ConnectLogic.isPassIrregular = function (ele1, ele2) {
        var id1 = ele1.id;
        var id2 = ele2.id;
        var pt0, pt1, pt2, pt3;
        var maxX = ele1.locationX > ele2.locationX ? ele1.locationX : ele2.locationX;
        var maxY = ele1.locationY > ele2.locationY ? ele1.locationY : ele2.locationY;
        //同样，每次构造4个顶点，看是否可通  
        //往上搜索
        for (var i = maxY; i > 0; i--) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.locationX + i * GameData.maxRow];
            pt2 = GameData.elements[ele2.locationX + i * GameData.maxRow];
            pt3 = ele2;
            //特殊情况，如果pt0和pt1重合  
            if (this.equalsElement(pt0, pt1)) {
                //如果pt2不为空，则此路不通  
                if (!this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt1, pt2, pt3];
                }
                else {
                    continue;
                }
            }
            else if (this.equalsElement(pt2, pt3)) {
                //特殊情况，如果pt2和pt3重合  
                //如果pt1不为空，则此路不通  
                if (!this.isEmpty(pt1.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2)) {
                    return [pt0, pt1, pt2];
                }
                else {
                    continue;
                }
            }
            //如果pt1, pt2都不为空,则不通  
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        //往下搜索
        for (var i = maxY; i < (GameData.maxRow - 1); i++) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.locationX + i * GameData.maxRow];
            pt2 = GameData.elements[ele2.locationX + i * GameData.maxRow];
            pt3 = ele2;
            //特殊情况，如果pt0和pt1重合  
            if (this.equalsElement(pt0, pt1)) {
                //如果pt2不为空，则此路不通  
                if (!this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt1, pt2, pt3];
                }
                else {
                    continue;
                }
            }
            else if (this.equalsElement(pt2, pt3)) {
                if (!this.isEmpty(pt1.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2)) {
                    return [pt0, pt1, pt2];
                }
                else {
                    continue;
                }
            }
            //如果pt1, pt2都不为空,则不通  
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        //横向扫描可能的路径  
        //往左搜索
        for (var i = 0; i < maxX; i++) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.locationY * GameData.maxRow + i];
            pt2 = GameData.elements[ele2.locationY * GameData.maxRow + i];
            pt3 = ele2;
            if (this.equalsElement(pt0, pt1)) {
                if (!this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt1, pt2, pt3];
                }
            }
            if (this.equalsElement(pt2, pt3)) {
                if (!this.isEmpty(pt1.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2)) {
                    return [pt0, pt1, pt2];
                }
            }
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        //往右搜索
        for (var i = maxX; i < (GameData.maxRow - 1); i++) {
            pt0 = ele1;
            pt1 = GameData.elements[ele1.locationY * GameData.maxRow + i];
            pt2 = GameData.elements[ele2.locationY * GameData.maxRow + i];
            pt3 = ele2;
            if (this.equalsElement(pt0, pt1)) {
                if (!this.isEmpty(pt2.id)) {
                    continue;
                }
                if (this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                    return [pt1, pt2, pt3];
                }
            }
            if (this.equalsElement(pt2, pt3)) {
                if (!this.isEmpty(pt1.id)) {
                    continue;
                }
                if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2)) {
                    return [pt0, pt1, pt2];
                }
            }
            if (!this.isEmpty(pt1.id) || !this.isEmpty(pt2.id)) {
                continue;
            }
            if (this.hasLine(pt0, pt1) && this.hasLine(pt1, pt2) && this.hasLine(pt2, pt3)) {
                return [pt0, pt1, pt2, pt3];
            }
        }
        return [];
    };
    ConnectLogic.isAlive = function (ele1) {
        return GameData.mapData[ele1.id];
    };
    ConnectLogic.getPath = function (ele1, ele2, drawLine) {
        if (drawLine === void 0) { drawLine = true; }
        //首先判断是不是同一种类型
        if (!this.isSameType(ele1, ele2)) {
            return false;
        }
        //判断这个元素是否存在
        if (!this.isAlive(ele1) || !this.isAlive(ele2)) {
            return false;
        }
        //开始搜索前对ele1,ele2排序,使ele2尽可能的在ele1的右下方,优先把ele1排在左
        var t = ele1;
        if (ele1.locationX > ele2.locationX) {
            ele1 = ele2;
            ele2 = t;
        }
        else if (ele1.locationX == ele2.locationX) {
            if (ele1.locationY > ele2.locationY) {
                ele1 = ele2;
                ele2 = t;
            }
        }
        //通过分析连连看中两点之间的位置关系，逐步由简到难分析每一种类型 ，顺序不能乱
        //第一种类型， 两点是否在一条直线上，而且两点之间可直线连通 
        var r1 = this.isPassToLined(ele1, ele2);
        if (r1.length) {
            if (drawLine)
                this.drawLine(r1);
            return true;
        }
        //第二种类型， 如果两点中任何一个点被全包围，且两个点不相邻，则不通。  
        var r2 = this.isCloseElement(ele1, ele2);
        if (r2) {
            return false;
        }
        //第三种类型， 两点在一条直线上，但是不能直线连接 ,从上面或者下面连接 
        var r3 = this.isPassFromUpOrDown(ele1, ele2);
        if (r3.length) {
            if (drawLine)
                this.drawLine(r3);
            return true;
        }
        //第四种类型， 两点不在一条直线上。  
        var r4 = this.isPassIrregular(ele1, ele2);
        if (r4.length) {
            if (drawLine)
                this.drawLine(r4);
            return true;
        }
        return false;
    };
    //提示
    ConnectLogic.prompt = function (isClear, drawLine) {
        var parent = GameData.eleParentSprite;
        var len = GameData.elements.length;
        var gel = GameData.elements;
        var _loop_1 = function (i) {
            if (!GameData.mapData[i])
                return "continue";
            var ele1 = gel[i];
            var _loop_2 = function (j) {
                if (!GameData.mapData[j])
                    return "continue";
                var ele2 = gel[j];
                if (ele1 == ele2)
                    return "continue";
                if (ele1.type == ele2.type) {
                    if (this_1.getPath(ele1, ele2, drawLine)) {
                        if (isClear) {
                            this_1.clear(ele1, ele2); //放上面提前清除，避免点击太快，下次提示的时候还是这两个元素，但清除不了
                            setTimeout(function () {
                                GameData.drawLineSprite.removeChildren();
                                GameData.elementViews[ele1.id].removAnimate();
                                GameData.elementViews[ele2.id].removAnimate();
                            }, TimerData.eleDisappearTime);
                        }
                        return { value: true };
                    }
                }
            };
            for (var j = i + 1; j < len; j++) {
                var state_1 = _loop_2(j);
                if (typeof state_1 === "object")
                    return state_1;
            }
            ;
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            var state_2 = _loop_1(i);
            if (typeof state_2 === "object")
                return state_2.value;
        }
        ;
        return false;
    };
    return ConnectLogic;
}());
__reflect(ConnectLogic.prototype, "ConnectLogic");
//# sourceMappingURL=ConnectLogic.js.map
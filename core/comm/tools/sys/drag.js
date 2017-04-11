/**
 * Created by xiyuan on 17-2-15.
 */
;(function (drag) {
    if (typeof define === "function" && define.amd) {

        define('drag', function () {
            return drag;
        });

    } else if (typeof define === "function" && define.cmd) {

        define('drag', [], function (require) {
            return drag;
        });

    } else {
        window.drag = drag;
    }
})(function () {

    //拖动处理
    function dragHandle(container) {
        //绑定的元素
        this.bindElement = container;

        //事件容器
        this.eventStroage = {};

        this.START_X = 0;
        this.START_Y = 0;

        //移动方向 [ up right buttom left ]
        this.direction = null;

        //requestAnimationFrame状态标识
        var isRaf = false;

        //拖动元素路径(兼容火狐)
        this.dragPath = [];

        //元素转换
        this.transform = {
            translate: {x: this.START_X, y: this.START_Y},
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };

        this.cssProps = {
            userSelect: 'none',
            dragSelect: 'none',
            dragCallout: 'none',
            contentZooming: 'none',
            userDrag: 'none',
            tapHighlightColor: 'rgba(0,0,0,0)'
        };
        //事件处理初始化
        this.init();
    }

    //requestAnimationFrame
    dragHandle.prototype.reqAnimationFrame = function (handleFn) {
        return (window[this.prefixed('requestAnimationFrame')] || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        })(handleFn);
    };

    //更新元素转换
    dragHandle.prototype.updateElementTransform = function (element) {
        var isRaf = false;

        if (!isRaf) {
            this.reqAnimationFrame(function () {
                var transform = this.transform,
                    container = element || this.bindElement,
                    value = [
                        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
                        // 'scale(' + transform.scale + ', ' + transform.scale + ')',
                        'rotate3d(' + transform.rx + ',' + transform.ry + ',' + transform.rz + ',' + transform.angle + 'deg)'
                    ];

                value = value.join(" ");
                container.style.webkitTransform = value;
                container.style.mozTransform = value;
                container.style.transform = value;
                isRaf = false;

            }.bind(this));

            isRaf = true;
        }

    };

    //动作处理
    dragHandle.prototype.handle = function (translate, element) {
        //合并
        Object.keys(translate).forEach(function (key) {
            this.transform.translate[key] = translate[key];
        }.bind(this));
        this.updateElementTransform(element);
    };

    //获取属性的前缀完整属性
    dragHandle.prototype.prefixed = function (scopeElement, property) {
        scopeElement = property ? scopeElement : (property = scopeElement, window)
        var prefix, prop,
            VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'],
            camelProp = property[0].toUpperCase() + property.slice(1);

        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
            prefix = VENDOR_PREFIXES[i];
            prop = (prefix) ? prefix + camelProp : property;

            if (prop in scopeElement) {
                return prop;
            }
            i++;
        }
        return undefined;
    };

    //事件数据提取
    dragHandle.prototype.eventData = function () {

        return {
            bindElement: this.bindElement,
            nowTime: this.nowTime,
            nowPageX: this.nowPageX,
            nowPageY: this.nowPageY,
            rangeX: this.rangeX,
            rangeY: this.rangeY,
            timeGap: this.timeGap,
            nowRangeX: this.nowRangeX,
            nowRangeY: this.nowRangeY,
            eventType: this.eventType,
            direction: this.direction,
            directionV: this.directionV,
            directionH: this.directionH
        }
    };

    //拖动初始化
    dragHandle.prototype.init = function () {
        var This = this;
        Object.keys(this.cssProps).forEach(function (name) {
            var prop = this.prefixed(this.bindElement.style, name);
            prop && (this.bindElement.style[prop] = this.cssProps[name]);
        }.bind(this));

        //拖动开始
        this.dragStartFn = function (eve) {

            //移动事件任务
            This.moveEventTasks = [];

            //当前X轴移动距离
            This.nowRangeX = 0;
            //当前Y轴移动距离
            This.nowRangeY = 0;

            //当前的页面偏移量
            This.nowPageX = eve.clientX;
            This.nowPageY = eve.clientY;

            //X轴移动距离
            This.rangeX = 0;
            //Y轴移动距离
            This.rangeY = 0;

            //写入path
            This.dragPath = eve.path || function getdragPath(target, path) {
                    (path = path || []).push(target);
                    target.parentNode && getdragPath(target.parentNode, path);
                    return path;
                }(eve.target);

            eve.path = This.dragPath;

            //起始时间
            This.startTime = This.nowTime = This.$nowTime = Date.now();
            //X轴起点位置
            This.startPageX = This.nowPageX = eve.clientX;
            //Y轴起点位置
            This.startPageY = This.nowPageY = eve.clientY;
            //当前事件类型
            This.eventType = 'mousedown';

            //绑定拖动移动
            window.document.addEventListener('mousemove', This.dragMoveFn, false);
            //绑定拖动结束
            window.document.addEventListener('mouseup', This.dragEndFn, false);
            //触发绑定事件
            This.trigger('start', eve, this);
        };

        //拖动移动
        this.dragMoveFn = function (eve) {

            var nowTime = Date.now();

            //当前X轴移动距离
            This.nowRangeX = eve.clientX - This.nowPageX;
            //当前Y轴移动距离
            This.nowRangeY = eve.clientY - This.nowPageY;

            This.nowPageX = eve.clientX;
            This.nowPageY = eve.clientY;

            //拖动移动的距离
            This.rangeX = eve.clientX - This.startPageX;
            This.rangeY = eve.clientY - This.startPageY;

            //时间间隙
            This.timeGap = nowTime - This.nowTime;

            //当前时间
            This.nowTime = nowTime;

            //当前事件类型
            This.eventType = 'mousemove';

            //方向计算
            if (!This.direction) {
                //垂直方向
                This.directionV = This.rangeY > 0 ? 'up' : 'down';
                //水平方向
                This.directionH = This.rangeX > 0 ? 'right' : 'left';
                //主体方向
                This.direction = Math.abs(This.rangeY) > Math.abs(This.rangeX) ? This.directionV : This.directionH;

            }
            eve.path = This.dragPath;

            //触发绑定事件(判断上次和本次位置是否一致)
            This.trigger('move', eve, this);
        };

        //拖动结束
        this.dragEndFn = function (eve) {
            This.flagTime = Date.now();
            //解绑拖动移动
            window.document.removeEventListener('mousemove', This.dragMoveFn, false);
            //解绑拖动结束
            window.document.removeEventListener('mouseup', This.dragEndFn, false);
            //当前事件类型
            This.eventType = 'dragend';

            eve.path = This.dragPath;

            //触发绑定事件
            This.trigger('end', eve, this);
            //方向复位
            This.direction = null;
        };

        //启动拖动事件
        this.open();
    };

    //事件触发
    dragHandle.prototype.trigger = function (eventName, eveObj, scope) {
        (this.eventStroage[eventName] || []).forEach(function (eventFn) {
            eventFn.call(scope || this, eveObj, this.eventData())
        }.bind(this))
    };

    //事件绑定
    dragHandle.prototype.on = function (eventNames, fn) {
        eventNames.trim().split(/\s+/g).forEach(function (eventName) {
            (this.eventStroage[eventName] = this.eventStroage[eventName] || []).push(fn)
        }.bind(this))

    };

    //取消事件绑定
    dragHandle.prototype.off = function (eventName, fn) {
        switch (arguments.length) {
            case 1:
                delete this.eventStroage[eventName];
                break;
            case 2:
                (this.eventStroage[eventName] = this.eventStroage[eventName] || []).forEach(function (evenFn, index) {
                    //检查是否同一个函数,如果是则从事件容器中移除
                    fn == evenFn && this.eventStroage[eventName].splice(index, 1);
                });
                break;
        }
    };

    //启动拖动事件
    dragHandle.prototype.open = function () {
        //绑定拖动移动开始
        this.bindElement.addEventListener('mousedown', this.dragStartFn, false);
    };

    //关闭拖动事件
    dragHandle.prototype.close = function () {
        //解绑移动开始
        this.bindElement.removeEventListener('mousedown', this.dragStartFn, false);

    };

    //设置拖动动作
    dragHandle.prototype.dragAction = function (value) {
        this.bindElement.style[this.prefixed(this.bindElement.style, 'dragAction')] = value || 'auto';
    };

    return dragHandle;


}());
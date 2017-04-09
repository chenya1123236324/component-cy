/**
 * Created by xiyuan on 16-8-29.
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        define('touch', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('touch', [], function (require) {
            return factory();
        });

    } else {
        window.touch = factory();
    }
})(function () {

    // gridBodyTouch.touchAction('pan-x');
    //触摸处理
    function touchHandle(container) {
        //绑定的元素
        this.bindElement = container;

        //事件容器
        this.eventStroage = {};

        this.START_X = 0;
        this.START_Y = 0;

        //移动方向 [ up right buttom left ]
        this.direction=null;

        //requestAnimationFrame状态标识
        isRaf = false;

        //触摸元素路径(兼容火狐)
        this.touchPath=[];

        //元素转换
        this.transform = {
            translate: {x: this.START_X, y: this.START_Y},
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };

        this.cssProps={
            /**
             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userSelect: 'none',

            /**
             * Disable the Windows Phone grippers when pressing an element.
             * @type {String}
             * @default 'none'
             */
            touchSelect: 'none',

            /**
             * Disables the default callout shown when you touch and hold a touch target.
             * On iOS, when you touch and hold a touch target such as a link, Safari displays
             * a callout containing information about the link. This property allows you to disable that callout.
             * @type {String}
             * @default 'none'
             */
            touchCallout: 'none',

            /**
             * Specifies whether zooming is enabled. Used by IE10>
             * @type {String}
             * @default 'none'
             */
            contentZooming: 'none',

            /**
             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userDrag: 'none',

            /**
             * Overrides the highlight color shown when the user taps a link or a JavaScript
             * clickable element in iOS. This property obeys the alpha value, if specified.
             * @type {String}
             * @default 'rgba(0,0,0,0)'
             */
            tapHighlightColor: 'rgba(0,0,0,0)'
        };
        //事件处理初始化
        this.init();
    }

    //requestAnimationFrame
    touchHandle.prototype.reqAnimationFrame = function (handleFn) {
        return (window[this.prefixed('requestAnimationFrame')] || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        })(handleFn);
    };

    //更新元素转换
    touchHandle.prototype.updateElementTransform = function (element) {
        var isRaf=false;

        if(!isRaf) {
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
    touchHandle.prototype.handle = function (translate,element) {
        //合并
        Object.keys(translate).forEach(function (key) {
            this.transform.translate[key] = translate[key];
        }.bind(this));
        this.updateElementTransform(element);
    };

    //获取属性的前缀完整属性
    touchHandle.prototype.prefixed = function (scopeElement,property) {
        scopeElement=property?scopeElement:(property=scopeElement,window)
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
    touchHandle.prototype.eventData = function () {

        return {
            bindElement:this.bindElement,
            nowTime: this.nowTime,
            nowPageX: this.nowPageX,
            nowPageY: this.nowPageY,
            rangeX: this.rangeX,
            rangeY: this.rangeY,
            timeGap:this.timeGap,
            nowRangeX:this.nowRangeX,
            nowRangeY:this.nowRangeY,
            eventType: this.eventType,
            direction:this.direction,
            directionV:this.directionV,
            directionH:this.directionH
        }
    };

    //触摸初始化
    touchHandle.prototype.init = function () {
        var This = this;
        Object.keys(this.cssProps).forEach(function (name) {
            var prop=this.prefixed(this.bindElement.style, name);
            prop && (this.bindElement.style[prop] = this.cssProps[name]);
        }.bind(this));

        //触摸开始
        this.touchStartFn = function (eve) {

            //当前触摸点对象
            var touchObj = eve.changedTouches[0];

            //移动事件任务
            This.moveEventTasks = [];

            //当前X轴移动距离
            This.nowRangeX = 0;
            //当前Y轴移动距离
            This.nowRangeY = 0;

            //X轴移动距离
            This.rangeX = 0;
            //Y轴移动距离
            This.rangeY = 0;

            //写入path
            This.touchPath=eve.path || function getTouchPath (target,path) {
                    (path=path||[]).push(target);
                    target.parentNode && getTouchPath(target.parentNode,path);
                    return  path;
                }(eve.target);

            eve.path=This.touchPath;

            //起始时间
            This.startTime = This.nowTime = This.$nowTime = Date.now();
            //X轴起点位置
            This.startPageX = This.nowPageX = touchObj.pageX;
            //Y轴起点位置
            This.startPageY = This.nowPageY = touchObj.pageY;
            //当前事件类型
            This.eventType = 'touchstart';

            //绑定触摸移动
            window.document.addEventListener('touchmove', This.touchMoveFn, false);
            //绑定触摸结束
            window.document.addEventListener('touchend', This.touchEndFn, false);
            //触发绑定事件
            This.trigger('start', eve, this);
        };

        //触摸移动
        this.touchMoveFn = function (eve) {

            var nowTime =  Date.now(),
                //当前触摸点对象
                touchObj = eve.changedTouches[0];

            //当前X轴移动距离
            This.nowRangeX = (touchObj.pageX - This.startPageX) - This.rangeX;
            //当前Y轴移动距离
            This.nowRangeY = (touchObj.pageY - This.startPageY) - This.rangeY;

            //触摸移动的距离
            This.rangeX = touchObj.pageX - This.startPageX;
            This.rangeY = touchObj.pageY - This.startPageY;

            //时间间隙
            This.timeGap= nowTime - This.nowTime;

            //当前时间
            This.nowTime = nowTime;

            //当前事件类型
            This.eventType = 'touchmove';

            //方向计算
            if(!This.direction){
                //垂直方向
                This.directionV=This.rangeY>0?'up':'down';
                //水平方向
                This.directionH=This.rangeX>0?'right':'left';
                //主体方向
                This.direction=Math.abs(This.rangeY)>Math.abs(This.rangeX)?This.directionV:This.directionH;

            }
            eve.path=This.touchPath;

            //触发绑定事件(判断上次和本次位置是否一致)
            This.trigger('move', eve, this);
        };

        //触摸结束
        this.touchEndFn = function (eve) {
            This.flagTime = Date.now();
            //解绑触摸移动
            window.document.removeEventListener('touchmove', This.touchMoveFn, false);
            //解绑触摸结束
            window.document.removeEventListener('touchend', This.touchEndFn, false);
            //当前事件类型
            This.eventType = 'touchend';

            eve.path=This.touchPath;

            //触发绑定事件
            This.trigger('end', eve, this);
            //方向复位
            This.direction=null;
        };

        //启动触摸事件
        this.open();
    };

    //事件触发
    touchHandle.prototype.trigger = function (eventName, eveObj, scope) {
        (this.eventStroage[eventName] || []).forEach(function (eventFn) {
            eventFn.call(scope || this, eveObj, this.eventData())
        }.bind(this))
    };

    //事件绑定
    touchHandle.prototype.on = function (eventNames, fn) {
        eventNames.trim().split(/\s+/g).forEach(function (eventName) {
            (this.eventStroage[eventName] = this.eventStroage[eventName] || []).push(fn)
        }.bind(this))

    };

    //取消事件绑定
    touchHandle.prototype.off = function (eventName, fn) {
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

    //启动触摸事件
    touchHandle.prototype.open = function () {
        //绑定触摸移动开始
        this.bindElement.addEventListener('touchstart', this.touchStartFn, false);
    };

    //关闭触摸事件
    touchHandle.prototype.close = function () {
        //解绑移动开始
        this.bindElement.removeEventListener('touchstart', this.touchStartFn, false);

    };

    //设置触摸动作
    touchHandle.prototype.touchAction=function (value) {
        this.bindElement.style[this.prefixed(this.bindElement.style,'touchAction')]=value||'auto';
    };

    return touchHandle;

});
/**
 * Created by xiyuan on 16-11-19.
 */
btnMaterial(function ($app, $appConfig) {
    /**
     * 获取元素样式
     * @param el
     * @param styleName
     * @returns {*}
     */
    function getStyle(el, styleName) {
        return el.style[styleName] ? el.style[styleName] : el.currentStyle ? el.currentStyle[styleName] : window.getComputedStyle(el, null)[styleName];
    }

    /**
     * Material主题样式按钮渲染
     * @param ele
     */
    function renderMaterial(ele) {

        //循环事件绑定 click touchstart
        'click'.split(' ').forEach(function (eventName) {

            //绑定事件
            ele.addEventListener(eventName,function (event) {
                var x,
                    y,
                    //事件类型
                    eventType = event.type,
                    //获取涟漪元素
                    ripple = this.querySelector('.ripple'),
                    //获取按钮的相关数据
                    BoundingClientRect=ele.getBoundingClientRect();

                //检查涟漪元素是否存在,否则创建
                if(ripple == null) {

                    //检查按钮的定位类型
                    var displayStyle=getStyle(this,'position');
                    'relative absolute'.indexOf(displayStyle) === -1 && (this.style.position='relative');

                    // 创建涟漪元素
                    ripple = document.createElement('span');
                    ripple.classList.add('ripple');

                    // 添加涟漪元素到按钮中
                    this.insertBefore(ripple, this.firstChild);

                    // 设置涟漪元素的宽度与高度
                    if(!ripple.offsetHeight && !ripple.offsetWidth) {
                        var size = Math.max(this.offsetWidth, this.offsetHeight);
                        ripple.style.width = size + 'px';
                        ripple.style.height = size + 'px';
                    }

                }

                // 移除涟漪元素的动画
                ripple.classList.remove('animate');

                // 检查事件类型并获取相关的数据
                if(eventType == 'click') {
                    x = event.pageX;
                    y = event.pageY;
                } else if(eventType == 'touchstart') {
                    x = event.changedTouches[0].pageX;
                    y = event.changedTouches[0].pageY;
                }

                //计算涟漪偏移位置
                x = x - BoundingClientRect.left - ripple.offsetWidth / 2;
                y = y - BoundingClientRect.top - ripple.offsetHeight / 2;

                // 根据点击或触摸位置来设置涟漪元素的位置
                ripple.style.top = y + 'px';
                ripple.style.left = x + 'px';

                // 添加涟漪元素的动画
                ripple.classList.add('animate');

            },false)
        })
    }

    $app.directiveRegister('$BtnMaterial', {
        //指令优先级 降序执行
        priority: 1000,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            this.$element.setAttribute('btn-material','');
            //Material Design 按钮
            //处理渲染
            renderMaterial( this.$element);

        }
    });

    $app.directiveRegister('btnMaterial', {
        //指令优先级 降序执行
        priority: 1000,
        //是否显示指令代码
        directiveShow: true,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //Material Design 按钮
            //处理渲染
            renderMaterial( this.$element);

        }
    });
});
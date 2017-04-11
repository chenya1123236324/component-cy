/**
 * Created by xiyuan on 16-8-31.
 */
src(function ($app, $appConfig) {
    $app.directiveRegister('$Src', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //关闭表达式的运算
        computations: false,
        //引入的工具类
        tools:['object'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($obj) {
            var element=this.$element,
                display=element.style.display;
            element.style.display='none';

            this.watch(function (src) {
                element.style.display=src?display||'initial':'none';
                src && (element.src=src);
            })

        }
    })

});
/**
 * Created by xiyuan on 16-9-23.
 */
watch(function ($app, $appConfig) {

    //用于展示或隐藏元素
    $app.directiveRegister('$Watch', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //关闭表达式的运算
        computations: false,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var element=this.$element;

            this.watch(function (initFn) {
                // typeof initFn === "function" && initFn(element)
            });
        }
    })

});
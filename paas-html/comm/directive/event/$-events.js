/**
 * Created by xiyuan on 16-8-12.
 */
events(function ($app, $appConfig) {

    $app.directiveRegister('$Events', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //关闭表达式的运算
        computations: false,
        //引入的工具类
        tools:['object'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var element=this.$element,
                eventFns={};

            //数据监听
            this.watch(function (data) {
                eventFns.forEach(function (eventFn,eventName) {
                    //事件解绑
                    if(typeof eventFn === "function"){
                        element.removeEventListener(eventName,eventFn, false);
                    }
                });

                if( data && typeof data === 'object'){
                    data.forEach(function (eventFn,eventName) {
                        //事件绑定
                        if(typeof eventFn === "function"){
                            element.addEventListener(eventName,eventFn, false);
                        }
                    });
                    eventFns=data;
                }
            });

        }
    })

});
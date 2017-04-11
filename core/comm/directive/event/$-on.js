/**
 * Created by xiyuan on 16-8-12.
 */
on(function ($app, $appConfig) {

    /**
     * <!--$-on:click="openMenu"-->
     * <<事件绑定>>
     * 更新处理:
     * --监听表达式中的数据变化,如有变化则卸掉之前的事件绑定,然后重新绑定新的数据事件
     * 数据监听:
     * --需要提前在配置中关闭数据运算
     * --需要提取指令表达式中的依赖数据
     * 事件绑定:
     * --提取修饰指令中的修饰码作为事件类型
     */
    $app.directiveRegister('$On', {
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
                eventName=this.type,
                eventFn;

            //数据监听
            this.watch(function (data) {

                //事件绑定
                if(typeof data === "function"){
                    element.addEventListener(eventName,data, false);
                }

                //事件解绑
                if(typeof eventFn === "function"){
                    element.removeEventListener(eventName,eventFn, false);
                }

                eventFn=data;
            });

        }
    })

});
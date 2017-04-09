/**
 * Created by xiyuan on 16-9-23.
 */
checked(function ($app,$appConfig) {

    /**
     * 用于输入框内容双向绑定
     */
    $app.directiveRegister('$Checked', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //引入的工具类
        // tools:['object'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var element=this.$element,
                isDispatchEvent=this.type === 'false'?false:true,
                //创建事件
                changelEvent = document.createEvent('HTMLEvents'/*Event*/);
            changelEvent.initEvent("change", true, true);
            changelEvent.eventType = 'change';

            //监听语法结果
            this.watch(function (value) {
                value=!!value;

                if(value != element.checked){
                    element.checked=value;
                    isDispatchEvent && element.dispatchEvent(changelEvent);
                }
            });
        }
    });


});
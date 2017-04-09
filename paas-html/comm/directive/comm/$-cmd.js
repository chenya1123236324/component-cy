/**
 * Created by xiyuan on 16-12-2.
 */

cmd(function ($app, $appConfig) {

    $app.directiveRegister('$Cmd', {
        //指令优先级 降序执行
        priority: 9998,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //数据监听
            this.watch(function (data) {

                if(data && typeof data === 'object' && data.cmd && typeof data.cmd === 'object'){

                }

            });

        }
    })

});
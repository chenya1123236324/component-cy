/**
 * Created by lei on 2017/2/16.
 */

//首页列表组件
listHomePage(function ($app, $appConfig) {

    var template='<div class="homelist"><ul><li $-for="Info in master.configList"><div $-events="Info.events" class="box"><p>{{Info.title}}</p><span>{{Info.time}}</span></div></li></ul></div>',
        filter={

        };


    $app.componentRegister('listHomePage', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var scope={
                master:{}
            };

            this.$element.parentNode.replaceChild(this.viewVM(template,scope).firstChild,this.$element);

            this.watchAttrData('config',function (listConfig) {
                scope.master=listConfig;
            })
        }
    })
});
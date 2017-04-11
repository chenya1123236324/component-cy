/**
 * Created by lei on 2017/1/20.
 */

//详情组件
listDetail(function ($app, $appConfig) {

    var template='<div class="detail"><ul><li $-for="filedInfo in master.configList"><p $-for="Info in filedInfo"><strong>{{Info.title}}</strong><ins><template config="Info"></template></ins></p></li></ul></div>',
        filter={

        };


    $app.componentRegister('listDetail', {
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
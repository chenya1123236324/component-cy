/**
 * Created by pyh on 2016/10/8.
 */
pageFrontMenu(function($app, $appConfig){

    //组件的html渲染
    function MenuRender(data) {
        var html='';


        return html;
    }


    //前台设置菜单组件注册
    $app.componentRegister('pageFrontMenu',{
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle:function(){
            var oleElement = this.$element;

            //第二种改变语法表达式 (只能对当前的语法进行监听)
            this.$expression=this.attrs.data;
            this.watch(function (data) {
                //viewVM：组件实现成视图
                oleElement.parentNode.replaceChild(this.viewVM(MenuRender(data)),oleElement)
            }.bind(this));


        }
    });
})
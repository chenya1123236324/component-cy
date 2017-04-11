/**
 * Created by xiyuan on 16-8-15.
 */
submit(function ($app, $appConfig) {
    /**
     * 用于表单提交处理
     */
    $app.directiveRegister('$Submit', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            var formElement = this.$element,
                expressionInstance=this.syntax(this.$expression);

            //初次执行挂载监控
            expressionInstance.state ==="success" && expressionInstance.exec(false);

            //表单提交事件
            formElement.onsubmit=function(){
                expressionInstance.expressionTree.isValue && expressionInstance.exec();
                return false
            };
        }
    });
})
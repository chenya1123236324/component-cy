/**
 * Created by xiyuan on 16-10-17.
 */
If(function ($app, $appConfig) {

    //用于展示或隐藏元素
    $app.directiveRegister('$If', {
        //指令优先级 降序执行
        priority: 10000,
        //是否显示指令代码
        directiveShow: false,
        //是否阻止后续指令的执行
        // terminal:true,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var element=this.$element,
                //记录状态
                toggleState=false,
                //父节点
                parent=element.parentNode,
                //替补元素(空文本节点)
                substitute=document.createTextNode('');

            //检查是否拥有父元素
            if(parent){
                parent.replaceChild(substitute,element);
            }

            //数据监控(初始化)
            this.watch(function (showData) {

                //避免重新计算
                if(!!showData === toggleState)return;

                //避免父节点丢失
                parent=parent||element.parentNode;

                if(showData && (parent.contains(substitute) || (parent=substitute.parentNode))){
                    toggleState=true;
                    parent.replaceChild(element,substitute);
                }else if(!showData && (parent.contains(element)|| (parent=element.parentNode)) ){
                    toggleState=false;
                    parent.replaceChild(substitute,element);
                }

            }.bind(this));

        }
    })

});
/**
 * Created by xiyuan on 17-2-26.
 */
url(function ($app) {
    $app.directiveRegister('$Url', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //引入的工具类
        // tools:['object'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var element=this.$element;

            switch (this.type){
                //返回
                case 'back':
                    //检查表达值
                    if(!this.attrInfo.expression){
                        element.addEventListener('click',function () {
                            $FRAME.goBack();
                        })
                    }
                    break;
            }

        }
    });
});

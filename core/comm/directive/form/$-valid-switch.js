/**
 * Created by xiyuan on 16-10-14.
 */
validSwitch(function ($app, $appConfig) {
    var validOpenEvent=new Event('validopen'),
        validCloseEvent=new Event('validclose');

    function validSwitch(formElement,toggle) {

        var isPass=true,
            //合并容器内所有表单元素
            formChilds=[].slice.call(formElement.querySelectorAll('input')).concat(
                [].slice.call(formElement.querySelectorAll('select')),
                [].slice.call(formElement.querySelectorAll('textarea')),
                [formElement]
            );

        //容器内循环表单元素
        formChilds.forEach(function (element) {
            //触发校验事件
            element.dispatchEvent(toggle?validOpenEvent:validCloseEvent);
            //检查校验结果
            !toggle && element.dataset['validresult'] && (element.dataset['validresult'] = 'true');
        });

        return isPass;
    }

    /**
     * 用于表单校验开关处理
     */
    $app.directiveRegister('$ValidSwitch', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [
        ],
        //是否显示指令代码
        directiveShow: false,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var This=this,
                switchElement=this.$element;
            this.watch(function (switchVal) {
                if(switchElement.childNodes.length){
                    validSwitch(switchElement,switchVal);
                }else{
                    //为第一次数据渲染延迟(因为内部组件未渲染,所以等待渲染后再进行处理)
                    setTimeout(function () {
                        validSwitch(switchElement,switchVal);
                    },100)
                }

            })

        }
    });
});
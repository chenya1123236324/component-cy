/**
 * Created by xiyuan on 16-8-12.
 */
bind(function ($app, $appConfig) {

    $app.directiveRegister('$Bind', {
        //指令优先级 降序执行
        priority: 0,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var element=this.$element,
                attrName=this.type.toLowerCase(),
                recordData='';

            //数据监听
            this.watch(function (data) {
                switch (attrName){
                    case 'class':
                        var classList=element.classList;
                        recordData && classList.remove.apply(classList,recordData.split(" "));
                        recordData=data;
                        recordData && classList.add.apply(classList,recordData.split(" "));
                        break;
                    case 'checked':
                    case 'readonly':
                    case 'disabled':
                    case 'selected':
                        element[attrName]=!!data;
                        data ?element.setAttribute(attrName,attrName):element.removeAttribute(attrName);
                        break;
                    default:
                        element.setAttribute(attrName,data);
                }

            });

        }
    })

});
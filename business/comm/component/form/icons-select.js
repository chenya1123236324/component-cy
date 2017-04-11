/**
 * Created by 贝贝 on 2016/11/25.
 */
iconsSelect(function($app,$appConfig){

    //图标选择组件html渲染
    function iconsSelectRender(data,scope) {
        var iconsSelectHtml = '<ul class="icons-container">';
        if(data.iconConfig.cols){
            iconsSelectHtml += iconsRowRender(data.icons,data.iconConfig.cols,data.events,scope);
        }else{
            iconsSelectHtml += iconsRowRender(data.icons,4,data.events,scope);
        }
        return iconsSelectHtml+'</ul>';
    }

    /**图标所有行渲染
     * @param iconData : 图标数据
     * @param count : 每行图标的个数
     * @param iconEvent : 图标事件
     * @param scope
     * @returns {string} : 返回所有图标的html
     */
    function iconsRowRender(iconData,count,iconEvent,scope) {
        var iconsRowHtml = '';
        if(iconData instanceof Array){
            //计算icons个数(length) 行数(rows) 下标(index)
            var length = iconData.length,
                rows = Math.ceil(length/count),
                index = 0;

            //i记录行,j记录列
            for(var i = 0; i < rows; i++){
                if(index < length){
                    iconsRowHtml +='<div class="icons-row">';
                    for(var j = 0; j < count; j++){
                        index = i*count + j;
                        if(index < length){
                            iconsRowHtml += '<li class="icon-li"><span  '+iconFunc(iconEvent,scope)+'title="iconfont '+iconData[index]+'"><i class="iconfont '+iconData[index]+'"></i></span></li>'
                        }
                    }
                    iconsRowHtml += '</div>';
                }

            }
        }

        return iconsRowHtml;
    }

    //事件绑定
    function iconFunc(dataEvent,scope){

        var action = scope.action,
            directiveKey = '',
            eventDirective = '';
        //事件检查
        if(typeof dataEvent === 'object'){
            Object.keys(dataEvent).forEach(function(eventName){
                directiveKey = eventName;
                action[directiveKey] = dataEvent[eventName];//把事件存入action
                eventDirective += ' $-on:'+eventName+'="action.'+directiveKey+'"';//事件指令
            })
        }
        return eventDirective;

    }

    //图标选择组件注册
    $app.componentRegister('iconsSelect',{
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools:[

        ],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            var oldElement = this.$element;

            var scope = {
                action:{
                    //选择icon
                    iconSelect:function(){

                    }
                }
            }
            this.watchAttrData('data',function(data){

                oldElement.parentNode.replaceChild(this.viewVM(iconsSelectRender(data,scope),scope),oldElement);

            }.bind(this));



        }
    })


})
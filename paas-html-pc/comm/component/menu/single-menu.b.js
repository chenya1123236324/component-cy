/**
 * Created by 贝贝 on 2016/12/12.
 */
//单层菜单组件
singleMenu(function ($app,$appConfig) {

    var filter={
        clickConcat:function(){
            var ars=arguments;
            return function () {
                var onArgs=arguments;
                ars.forEach(function (fn) {
                    typeof fn === "function" && fn.apply(this,onArgs);
                }.bind(this))
            }
        }
    },
        template='<div class="single-menu"><ul><li $-bind:class="" $-for=""></li></ul></div>'

    //HTML拼接
    function singleMenuRender(data,scope) {
        var singleMenuHtml = '<div class="single-menu"';
        //最外层class
        if(data.className){
            singleMenuHtml += className+'" ';
        }
        //最外层style
        if(data.style){
            var style ='style="';
            Object.keys(data.style).forEach(function(styleName){
                style += styleName+':'+ data.style[styleName]+';';
            })
            style +='" ';
            singleMenuHtml +=style+'><ul>';
        }
        if(data.isGroup){
            data.list.forEach(function (liData,index) {
                var clickEventKey='click_'+index
                scope.eventManages[clickEventKey]=liData.events.click;
                singleMenuHtml +=  '<li ';
                liData.className!=''||undefined?singleMenuHtml+='class="'+ liData.className+'"':singleMenuHtml;
                liData.id!=undefined?singleMenuHtml+=' id="'+liData.id+'"':singleMenuHtml;
                liData.pid!=undefined?singleMenuHtml+=' pid="'+liData.pid+'"':singleMenuHtml;
                singleMenuHtml+=' $-on:click="action.selected|clickConcat:[$,eventManages.'+clickEventKey+']"  '+ singleMenuFunc(liData, scope) + '><span class="tli-content">' + liData.label + '</span>';
                //每个li上的按钮
                if(data.button && data.button.length >0){
                    var btn = '';
                    data.button.forEach(function(btns){
                        btn += '<i class="iconfont '+btns.icon+'"'+singleMenuFunc(btns,scope)+'></i>';
                    });
                    singleMenuHtml += '<span class="dic-btn">'+btn+'</span>';
                }
               singleMenuHtml +='</li>';
            });

        }

        singleMenuHtml +='</ul></div>';
        return singleMenuHtml;

    }

    //添加事件的方法
    function singleMenuFunc(data,scope){
        var action=scope.action,
            eventsDirective='',
            directiveKey='';

        //事件检查
        if(typeof data.events === 'object'){
            Object.keys(data.events).forEach(function(eventName){
                directiveKey=eventName+''+(++scope.uid);//事件名
                action[directiveKey]=data.events[eventName];//把事件赋值给action对应的事件名
                eventsDirective+=' $-on:'+eventName+'="action.'+directiveKey+'"';//事件指令,指令的事件位置要和scope的事件位置一致
            })
        }
        return eventsDirective;
    }
    
    
    
    $app.componentRegister('singleMenu',{
        priority:0,
        tools:[],
        handle:function () {
            var oldElement = this.$element;
            var scope = {
                uid:0,
                action:{
                    selected:function () {
                        console.log(scope)
                        this.parentNode.querySelector('.active') && this.parentNode.querySelector('.active').classList.remove('active');
                        this.classList.add('active');
                    }
                },
                eventManages:{

                }
            }
            
            this.watchAttrData('config',function (data) {
                console.log(data);
                oldElement.parentNode.replaceChild(this.viewVM(singleMenuRender(data,scope),scope,filter),oldElement);
            }.bind(this))
        }
    })
});
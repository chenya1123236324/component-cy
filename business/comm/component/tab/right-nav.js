/**
 * Created by 贝贝 on 2016/11/10.
 */
//右侧tab导航组件注册
tabRightNav(function($app,$appConfig){

    var liIndex = 0;
    //html拼接
    function tabRightRender(data,storageData){
        var tabRightHtml = '';
        var style ='style="';
        Object.keys(data.style).forEach(function(styleName){
            style += styleName+':'+ data.style[styleName]+';';
        })
        style +='"';
        tabRightHtml += '<div class="tab-right-nav"'+style+'><ul>';

        if (data.isGroup) {
            data.list.forEach(function (liData) {
                tabRightHtml += '<li class="' + liData.className + '" li-index="'+liIndex++ +'" $-on:click="action.tabLocation"  '+ tabFunc(liData, storageData) + '><span>' + liData.label + '</span></li>';
            })
        }



        tabRightHtml += '</ul></div>';
        return tabRightHtml;
    }

    //添加事件的方法
    function tabFunc(data,storageData){
        var action=storageData.action,
            eventsDirective='',
            directiveKey='';

        //事件检查
        if(typeof data.events === 'object'){
            Object.keys(data.events).forEach(function(eventName){

                directiveKey=eventName+''+(++storageData.uid);//事件名
                action[directiveKey]=data.events[eventName];//把事件赋值给action对应的事件名
                eventsDirective+=' $-on:'+eventName+'="action.'+directiveKey+'"';//事件指令,组件中$-on:click="event1"
            })
        }
        return eventsDirective;
    }

    $app.componentRegister('tabRightNav',{
        priority:0,
        tools:[],
        handle:function(){
            var oldElement = this.$element;

            var storageData = {
                uid:0,
                action:{
                    tabLocation:function(){
                        this.parentNode.querySelector('.active').classList.remove('active');
                        this.classList.add('active');
                        //所有页面
                        var pages = document.querySelectorAll('div[page-index]');
                        //当前点击li的lindex
                        var lindex = this.getAttribute('li-index'),
                            //包含页面的容器
                            pageContainer = pages[0].parentNode,
                            //最外层div
                            pageAll = pageContainer.parentNode,
                            topHeight = 0;
                        Object.keys(pages).forEach(function(page){
                            if(page<lindex){
                                topHeight-=pages[page].offsetHeight;
                            }
                        });

                        pageAll.scrollTop = -topHeight;
                    }
                }
            }

            this.watchAttrData('data',function(data){
                var tabRight = tabRightRender(data,storageData);
                oldElement.parentNode.replaceChild(this.viewVM(tabRight,storageData),oldElement);
            }.bind(this));

        }

    })






















})
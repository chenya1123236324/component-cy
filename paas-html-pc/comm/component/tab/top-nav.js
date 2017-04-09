/**
 * Created by 贝贝 on 2016/11/29.
 */
//顶部tab导航组件注册(字段-视图-操作)
tabTopNav(function ($app,$appConfig) {

    //tab-top-nav组件html渲染
    function tabTopRender(data,storageData){
        var tabTopHtml='',
            //tab按钮的序号
            page=0;
        if(data.style){
            var style ='style="';
            Object.keys(data.style).forEach(function(styleName){
                style += styleName+':'+ data.style[styleName]+';';
            })
            style +='"';
            tabTopHtml += '<div class="tab-top-nav" '+style+'><ul>';
        }else{
            tabTopHtml += '<div class="tab-top-nav"><ul>';
        }
        //拼组件内部
        if (data.isGroup) {
            data.list.forEach(function (liData) {
                //tab类型--页面切换
                switch(data.tabType){
                    //页面切换
                    case 'flip':
                        //tab组件没有按钮
                        tabTopHtml += '<li class="' + liData.className + '"li-index="'+ page++ +'"  $-on:click="action.tabFlip"  '+ tabFunc(liData, storageData) + '><span class="tli-content">' + liData.label + '</span></li>';
                        break;
                }

            })
        }

        tabTopHtml += '</ul></div>';
        return tabTopHtml;

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
                eventsDirective+=' $-on:'+eventName+'="action.'+directiveKey+'"';//事件指令,指令的事件位置要和storageData的事件位置一致
            })
        }
        return eventsDirective;
    }

    $app.componentRegister('tabTopNav',{
        priority:0,
        tools:[],
        handle:function () {
            var oldElement = this.$element;

            var storageData = {
                uid:0,
                action:{
                    //点击切换页面
                    tabFlip:function(){
                        this.parentNode.querySelector('.active').classList.remove('active');
                        this.classList.add('active');

                        //事件的具体实现(切换页面)
                        var pages = document.querySelectorAll('div[page-index]'),
                            //当前点击li的lindex
                            lindex = this.getAttribute('li-index');

                        Object.keys(pages).forEach(function (page) {
                            pages[page].style.display = 'none';
                            if(pages[page].getAttribute('page-index')==lindex){
                                pages[page].style.display='inline-block';
                            }
                        });

                    }
                }
            }
            this.watchAttrData('config',function (data) {
                oldElement.parentNode.replaceChild(this.viewVM(tabTopRender(data,storageData),storageData),oldElement);
            }.bind(this));

        }
    })


})
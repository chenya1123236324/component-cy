/**
 * Created by 贝贝 on 2016/11/11.
 */
//左侧tab导航组件注册
tabLeftNav(function($app,$appConfig){


    var liIndex = 0;
    //html拼接
    function tabLeftRender(data,storageData){
        var tabLeftHtml = '';
        if(data.style){
            var style ='style="';
            Object.keys(data.style).forEach(function(styleName){
                style += styleName+':'+ data.style[styleName]+';';
            })
            style +='"';
            tabLeftHtml += '<div class="tab-left-nav" '+style+'><ul>';
        }else{
            tabLeftHtml += '<div class="tab-left-nav"><ul>';
        }

        if (data.isGroup) {
            data.list.forEach(function (liData) {
                //判断tab类型
                switch(data.tabType){
                    //页面切换
                    case 'flip':
                        if(data.button && data.button.length>0){
                            //如果tab组件有按钮
                            var btn = '';
                            data.button.forEach(function(btns){
                                btn += '<i class="iconfont '+btns.icon+'"'+tabFunc(btns,storageData)+'></i>';
                            });
                            tabLeftHtml += '<li class="' + liData.className + '" id="'+liData.id+'" pid="'+liData.pid+'"  li-index="'+liIndex++ +'"  $-on:click="action.tabFlip"  '+ tabFunc(liData, storageData) + '><span class="tli-content">' + liData.label + '</span><span class="dic-btn">'+btn+'</span></li>';

                            // tabLeftHtml += '<li class="' + liData.className + '" $-on:click="action.tabLocation"  '+ tabFunc(liData, storageData) + '><span class="tli-content">' + liData.label + '</span><span class="dic-btn"><i class="iconfont icon-xieyoujian" $-on:click="action.contentEdit"></i><i class="iconfont icon-shanchu"></i></span></li>';
                        }else{
                            //tab组件没有按钮
                            tabLeftHtml += '<li class="' + liData.className + '" id="'+liData.id+'" pid="'+liData.pid+'" li-index="'+liIndex++ +'" $-on:click="action.tabFlip"  '+ tabFunc(liData, storageData) + '><span class="tli-content">' + liData.label + '</span></li>';
                        }
                        break;

                    //页面定位
                    case 'location':
                        if(data.button && data.button.length>0){
                            //如果tab组件有按钮
                            var btn = '';
                            data.button.forEach(function(btns){
                                btn += '<i class="iconfont '+btns.icon+'"'+tabFunc(btns,storageData)+'></i>';
                            });
                            tabLeftHtml += '<li class="' + liData.className + '" li-index="'+liIndex++ +'"  $-on:click="action.tabLocation"  '+ tabFunc(liData, storageData) + '><span class="tli-content">' + liData.label + '</span><span class="dic-btn">'+btn+'</span></li>';

                            // tabLeftHtml += '<li class="' + liData.className + '" $-on:click="action.tabLocation"  '+ tabFunc(liData, storageData) + '><span class="tli-content">' + liData.label + '</span><span class="dic-btn"><i class="iconfont icon-xieyoujian" $-on:click="action.contentEdit"></i><i class="iconfont icon-shanchu"></i></span></li>';
                        }else{
                            //tab组件没有按钮
                            tabLeftHtml += '<li class="' + liData.className + '" li-index="'+liIndex++ +'" $-on:click="action.tabLocation"  '+ tabFunc(liData, storageData) + '><span class="tli-content">' + liData.label + '</span></li>';
                        }
                        break;
                }

            })
        }



        tabLeftHtml += '</ul></div>';
        return tabLeftHtml;
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


    $app.componentRegister('tabLeftNav',{
        priority:0,
        tools:[],
        handle:function(){
            var oldElement = this.$element;

            var storageData = {
                uid:0,
                action:{
                    //点击切换页面
                    tabFlip:function(){
                        this.parentNode.querySelector('.active') && this.parentNode.querySelector('.active').classList.remove('active');
                        this.classList.add('active');

                        //事件的具体实现(切换页面)
                        var pages = document.querySelectorAll('div[page-index]'),
                            //当前点击li的lindex
                            lindex = this.getAttribute('li-index');

                        Object.keys(pages).forEach(function (page) {
                            pages[page].style.display = 'none';
                            if(pages[page].getAttribute('page-index')==lindex){
                                pages[page].style.display='block';
                            }
                        });

                    },

                    //点击定位
                    tabLocation:function(){
                        this.parentNode.querySelector('.active') && this.parentNode.querySelector('.active').classList.remove('active');
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
                    },

                }
            }

            this.watchAttrData('data',function(data){
                var tabLeft = tabLeftRender(data,storageData);
                oldElement.parentNode.replaceChild(this.viewVM(tabLeft,storageData),oldElement);
            }.bind(this));
        }
    })


})
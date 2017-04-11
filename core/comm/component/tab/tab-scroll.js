/**
 * Created by xiyuan on 17-1-5.
 */
tabScroll(function ($app, $appConfig) {
    var TWEEN=null;

    //raf动画帧率回调
    function reqAnimationFrame(handleFn) {
        return (window['requestAnimationFrame'] || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        })(handleFn);
    }

    //获取元素样式
    function getStyle(el, styleName) {
        return el.style[styleName] ? el.style[styleName] : el.currentStyle ? el.currentStyle[styleName] : window.getComputedStyle(el, null)[styleName];
    }

    //获取滚动容器
    function getOverflow(e) {
        if(e.nodeName === "#document-fragment"){
            return e;
        }else if(['auto','scroll'].in(getStyle(e,'overflowY')) !== -1){
            return e
        }else if(e === document.body) {
            return e;
        }else{
            return getOverflow(e.parentNode)
        }
    }

    //获取元素的纵坐标（相对于窗口）
    function getTop(e){
        return e.getBoundingClientRect().top;
    }

    var template='<div class="tab-scroll"><div class="tab-main">' +
            '<ul><li $-class="{focus:index == innerConf.selectIndex}" $-for="(index,tabInfo) in tabList" $-render="tabInfo|contentRender:[$,innerConf,index]"><template config="tabInfo|templateHandle"></template></li></ul>' +
            '<div class="tab-loading" $-if="!innerConf.isInit"><loading-line-scale-pulse-out config="内容加载中..."></loading-line-scale-pulse-out></div></div>' +
        '<div class="tab-nav">' +
            '<ul><li $-class="{focus:index == innerConf.selectIndex}" $-on:click="index|selectHandle:[$,innerConf]" $-bind:describe="tabInfo.name" $-for="(index, tabInfo) in tabList"><span>{{tabInfo.name}}</span></li></ul>' +
        '</div>',
        filter={
            contentRender:function (tabInfo,innerConf,index) {
                if(tabInfo.contentId){
                    var doc=document.createDocumentFragment(),
                        container=innerConf.comp.$element.querySelector('#'+tabInfo.contentId);

                    if(container){
                        while(container.firstChild){
                            doc.appendChild(container.firstChild)
                        }

                        return function (ele) {
                            innerConf.containerMaps[index]=ele;
                            ele.innerHTML='';
                            ele.appendChild(doc);
                        }
                    }
                }
                return function (ele) {
                    innerConf.containerMaps[index]=ele;
                }
            },
            templateHandle:function (tabInfo) {
                if(!tabInfo.contentId && tabInfo.template){
                    return tabInfo;
                }
            },
            selectHandle:function (index,innerConf) {
                return function () {
                    //获取组件距离视窗的相关数据
                    var baseTop=innerConf.overFlowEle.scrollTop,
                        selectContainer=innerConf.containerMaps[index],
                        offsetTop=getTop(selectContainer) - getTop(innerConf.overFlowEle),
                        countTop=baseTop+offsetTop - innerConf.offsetTop;

                    innerConf.selectIndex=index;

                    //动画处理
                    new TWEEN.Tween({y:baseTop})
                        .to({ y: countTop }, 600)
                        .easing( TWEEN.Easing.Quartic.InOut)
                        .onUpdate(function() {
                            innerConf.isClick=true;
                            innerConf.overFlowEle.scrollTop=this.y;
                        })
                        .start();

                    requestAnimationFrame(animate);

                    function animate(time) {
                        requestAnimationFrame(animate);
                        TWEEN.update(time);
                    }

                }
            }
        };

    //tab-scroll组件注册
    $app.componentRegister('tabScroll', {
        //工具引用
        tools: ['{TOOLS}/sys/Tween'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($Tween) {
            var oldElement=this.$element,
                scope={
                    tabList:[],
                    innerConf:{
                        isInit:false,
                        comp:this,
                        offsetTop:0,
                        isClick:false,
                        selectIndex:0,
                        containerMaps:{},
                        overFlowEle:null
                    }
                },
                tabEle=this.viewVM(template,scope,filter).firstChild,

                //滚动事件处理
                scrollEvent=function (e) {
                    if(scope.innerConf.isClick)return scope.innerConf.isClick=false;

                    var selectIndex=scope.innerConf.selectIndex,
                        containerMaps=scope.innerConf.containerMaps,
                        nextEle=containerMaps[selectIndex+1],
                        prevEle=containerMaps[selectIndex-1],
                        nowEle=containerMaps[selectIndex],
                        scrollOffsetTop=getTop(scope.innerConf.overFlowEle)+scope.innerConf.offsetTop;

                    switch (true){
                        case !!nextEle && !!prevEle:
                            if(getTop(nextEle) <= scrollOffsetTop){
                                scope.innerConf.selectIndex=selectIndex+1;
                            }else if(getTop(nowEle) >= scrollOffsetTop){
                                scope.innerConf.selectIndex=selectIndex-1;
                            }
                            break;
                        case !!nextEle :
                            if(getTop(nextEle) <= scrollOffsetTop){
                                scope.innerConf.selectIndex=selectIndex+1;
                            }
                            break;
                        case !!prevEle:
                            if(getTop(nowEle) >= scrollOffsetTop){
                                scope.innerConf.selectIndex=selectIndex-1;
                            }
                            break;
                    }

                };

            //传递动画库到组件全局
            TWEEN=$Tween;

            //元素替换
            oldElement.parentNode.replaceChild(tabEle,oldElement);

            //数据监听
            this.watchAttrData('config',function (tabConf) {
                scope.innerConf.isInit=true;
                scope.innerConf.offsetTop=tabConf.offsetTop||0;
                //获取滚动容器
                scope.innerConf.overFlowEle=getOverflow(tabEle);
                //滚动事件监听
                scope.tabList.length || scope.innerConf.overFlowEle.addEventListener('scroll',scrollEvent);
                scope.tabList=tabConf.list;
            }.bind(this))

        }
    });

});
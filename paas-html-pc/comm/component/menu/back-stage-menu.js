/**
 * Created by 贝贝 on 2016/10/6.
 */
backStageMenu(function($app, $appConfig){

    //组件的html渲染
    var menuHtml = '<ul class="back-stage-menu back-stage-menu1" $-parses-bind:style="menuData.style|menuStyleHandle">'+
            '<li $-for="eleConf in menuData.list" $-events="eleConf.events">' +
                '<div $-on:click="events.menuClickToggle"><i class="iconfont" $-bind:class="eleConf.icon"></i><span>{{eleConf.label}}</span><span class="arrow-right"><i class="iconfont icon-down"></i><i class="iconfont icon-right"></i></span></div>' +
                '<template config="eleConf|liContentTemplateHandle"></template>' +
            '</li></ul>';

    //li子级
    var eleMenuHtml = '<ul class="back-stage-menu"><li $-for="ele in eleConf.list" $-events="ele.events" $-on:click="events.menuInsideLiClick"><a $-bind:href="ele.href">{{ele.content}}</a></li></ul>';
    var filter = {
        //组件最外层ul样式渲染绑定
        menuStyleHandle:function (styles) {
            var style = "";
            styles && typeof styles==='object' && styles.forEach(function (val,key) {
                style += key + ':{{menuData.style["'+ key + '"]}};'
            });
            return style;
        },
        
        //li子级内容处理
        liContentTemplateHandle:function (eleConf) {
            if(eleConf.isGroup){
                return {
                    template:eleMenuHtml,
                    scope: eleConf.scope || {},
                    filter: eleConf.filter || {}
                }
            }else{
                return {
                    template:''
                }
            }
        }
    }

    //back-stage-menu后台设置菜单组件注册
    $app.componentRegister('backStageMenu',{
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle:function(){
            var newElement,
                oldElement = this.$element;

            this.watchAttrData('data',function (menuData) {
                if(menuData && typeof menuData ==='object'){

                    var scope = {
                        menuData:menuData,
                        events:{
                            //点击div展开收起ul
                            menuClickToggle: function () {

                                //先移除所有同级li的点击样式
                                this.parentNode.parentNode.querySelectorAll('.li-focus').forEach(function (liInfo) {
                                    liInfo.classList.remove('li-focus');
                                });
                                this.parentNode.classList.toggle('li-click');
                                this.parentNode.classList.add('li-focus');
                                event.preventDefault();//阻止默认事件
                                event.stopPropagation();//阻止冒泡

                            },
                            //点击最内层li改变样式
                            menuInsideLiClick:function(){

                                //先移除所有外层li的点击样式
                                this.parentNode.parentNode.parentNode.querySelectorAll('.li-focus').forEach(function (liInfo) {
                                    liInfo.classList.remove('li-focus');
                                });
                                this.parentNode.parentNode.parentNode.querySelectorAll('.inside-li-click').forEach(function(eleIn){
                                    eleIn.classList.remove('inside-li-click');
                                });
                                this.classList.add('inside-li-click');
                                this.parentNode.parentNode.classList.add('li-focus');
                            }
                        }
                    }

                    newElement = this.viewVM(menuHtml,scope,filter).firstChild;
                    oldElement.parentNode.replaceChild(newElement,oldElement);
                    oldElement = newElement;
                    newElement = null;
                }

            }.bind(this));

        }
    });
})
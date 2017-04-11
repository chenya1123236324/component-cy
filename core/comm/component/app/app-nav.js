/**
 * Created by xiyuan on 16-12-23.
 */
appNav(function ($app, $appConfig) {

    var template='<div class="app-nav"><div class="nav-befor"><ul><li $-for="navInfo in navConf.navList"><template config="navInfo|menuTemplate"></template></li></ul></div><div class="nav-after"><ul><li $-for="sysInfo in navConf.sysInfoList"><template config="sysInfo|menuTemplate"></template></li></ul></div></div>',
        filter={
            menuTemplate:function (navInfo) {
                var templateConf={};
                switch (navInfo.type){
                    case 'menu':
                        templateConf={
                            template:'<template config="navInfo|menuTemplateHandle:[$,navInfo.content]"></template><ul class="nav-menu"><li $-for="menuInfo in menuConf.list"><template config="menuInfo|menuTemplateHandle"></template></li></ul>',
                            scope:{
                                navInfo:navInfo,
                                menuConf:{
                                    list:navInfo.list
                                }
                            }
                        };
                        break;
                    default:
                        templateConf= navInfo;
                        templateConf.template=navInfo.template||navInfo.content;
                }

                return templateConf;
            },
            menuTemplateHandle:function (navInfo,content) {
                return {
                    template:content||navInfo.content||navInfo||template,
                    scope:navInfo.scope
                }
            }
        };

    $app.componentRegister('appNav', {
        //指令优先级 降序执行
        priority: 1000,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var oldElement=this.$element;

            this.watchAttrData('config',function (navConf) {
                // console.log(window.navConf=navConf)
                var element=this.viewVM(template,{
                    navConf:navConf
                },filter).firstChild;
                //更换成新元素
                oldElement.parentNode.replaceChild(element, oldElement);
                oldElement=element;
            }.bind(this));

        }
    });
});
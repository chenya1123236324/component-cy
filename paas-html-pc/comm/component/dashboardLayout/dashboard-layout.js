/**
 * Created by chenya on 2017/2/14.
 */
//注册dashboardLayout组件
dashboardLayout(function ($app, $appConfig) {
    var dashboardLayoutHTML ='<div class="dashboard">' +
        '<div class="dashboard-content">' +
        '<div class="dashboard-ibox"  $-bind:data-order="eleConf.order"  $-parses-bind:style="eleConf.layout|layoutHandle"  $-for="eleConf in dashboardLayoutConfig.dashboardLayoutData.list">' +
        '<div class="dashboard-ibox-content"  $-parses-bind:style="dashboardLayoutConfig.dashboardLayoutData.style|styleHandle">' +
        '<div class="ibox-title">' +
        '<div class="ibox-name">' +
        '<span  $-parses-bind:style="eleConf.iconColor|iconColorHandle"><i $-parses-bind:class="eleConf.icon|iconHandle"></i></span>' +
        '<span><a $-href={{eleConf.link}}><span>{{eleConf.name}}</span><i class="iconfont icon-right"></i></a></span>' +
        '</div>' +//ibox-name
        '<div class="ibox-tools">' +
        '<i class="iconfont  icon-chenghao" $-events="eleConf.events"></i>' +
        '</div>' +//ibox-tools
        '</div>' +//ibox-title
        '<div class="ibox-content">' +
        '<div class="ibox-content-data" $-parses-bind:style="dashboardLayoutConfig.dashboardLayoutData.style.height|heightHandle"><template config="eleConf|eleTemplateHandle:[$,eleConf.config]"></template></div>' +
        '</div>' +//ibox-content
        '</div>' +//dashboard-ibox-content
        '</div>'+//dashboard-ibox
        '</div>' +//dashboard-content
        '</div>';//dashboard

    var filter={
        //布局样式
        layoutHandle:function (layout) {
            return "width:"+layout;
        },
        //内容样式
        styleHandle:function (styles) {
            var style='';
            styles && typeof styles === 'object' && styles.forEach(function (val,key) {
                style+=key+':{{dashboardLayoutConfig.dashboardLayoutData.style["'+key+'"]}};'
            });
            return style;
        },
        //图标颜色样式
        iconColorHandle:function (iconColor) {
            return "color:"+iconColor;
        },
        //图标样式
        iconHandle:function (icon) {
            return "iconfont "+icon;
        },
        //内容高度
        heightHandle:function (height) {
            return (parseInt(height)-100)+"px";
        },
        //内容模板
        eleTemplateHandle:function (eleConf,conf) {
            return {
                template:'<template config="eleConf.content"></template>'
            }
        }
    };

    //dashboard-layout组件注册
    $app.componentRegister('dashboardLayout', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //组件原有的标签
            var scope,
                newElement,
                oldElement=this.$element,
                That=this;
            //监听获取属性中的数据
            this.watchAttrData('config',function (dashboardLayoutConfig) {
                if(dashboardLayoutConfig && typeof dashboardLayoutConfig === 'object'){
                    scope={
                        dashboardLayoutConfig:dashboardLayoutConfig,
                    };
                    newElement=this.viewVM(dashboardLayoutHTML,scope,filter).firstChild;
                    oldElement.parentNode.replaceChild(newElement,oldElement);
                    oldElement=newElement;
                    newElement=null;
                }
            }.bind(this));
        }
    })
});

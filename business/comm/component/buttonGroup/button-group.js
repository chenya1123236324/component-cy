/**
 * Created by chenya on 2017/2/16.
 */
//注册新版按钮组件
buttonGroup(function ($app, $appConfig) {
    var buttonGroupHTML='<div class="btn-group"  $-parses-bind:style="buttonGroupConfig.style|styleHandle">' +
        '<button  $-events="eleConf.events"  $-parses-bind:class="eleConf.class|classStyleHandle"  $-parses-bind:style="buttonGroupConfig.btnStyle|layoutHandle"  type="button" $-for="eleConf in buttonGroupConfig.list"> <template config="eleConf.align|rowTemplateHandle"></template></button>' +
        '</div>';//btn-group
    var leftIconHTML='<i $-parses-bind:class="eleConf.icon|iconClassStyleHandle" style="padding-right:4px" $-events="eleConf.iconEvents"></i>{{eleConf.label}}';
    var rightIconHTML='{{eleConf.label}}<i $-parses-bind:class="eleConf.icon|iconClassStyleHandle" style="padding-left:4px" $-events="eleConf.iconEvents"></i>';
    var centerIconHTML='{{eleConf.label}}'
    var filter={
        //内容样式
        styleHandle:function (styles) {
            var style='';
            styles && typeof styles === 'object' && styles.forEach(function (val,key) {
                style+=key+':{{buttonGroupConfig.style["'+key+'"]}};'
            });
            return style;
        },
        //布局样式
        layoutHandle:function (styles) {
            var style='';
            styles && typeof styles === 'object' && styles.forEach(function (val,key) {
                style+=key+':{{buttonGroupConfig.btnStyle["'+key+'"]}};'
            });
            return style;
        },
        //图标样式
        rowTemplateHandle:function (eleConf) {
            if(eleConf=="left"){
                return {
                    template:leftIconHTML,
                    scope:eleConf.scope||{},
                    filter:eleConf.filter||{}
                }
            }else if(eleConf=="right"){
                return {
                    template:rightIconHTML,
                    scope:eleConf.scope||{},
                    filter:eleConf.filter||{}
                }
            }else if(eleConf=="center"){
                return {
                    template:centerIconHTML,
                    scope:eleConf.scope||{},
                    filter:eleConf.filter||{}
                }
            }
        },
        //class样式
        classStyleHandle:function (classStyle) {
            return classStyle;
        },
        //图标class样式
        iconClassStyleHandle:function (iconClass) {
            return 'iconfont icon-iconfont'+iconClass;
        },
    };
    //button-group组件注册
    $app.componentRegister('buttonGroup', {
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
            this.watchAttrData('config',function (buttonGroupConfig) {

                if(buttonGroupConfig && typeof buttonGroupConfig === 'object'){
                    scope={
                        buttonGroupConfig:buttonGroupConfig,
                    };
                    newElement=this.viewVM(buttonGroupHTML,scope,filter).firstChild;
                    oldElement.parentNode.replaceChild(newElement,oldElement);
                    oldElement=newElement;
                    newElement=null;
                }
            }.bind(this));
        }
    })
});

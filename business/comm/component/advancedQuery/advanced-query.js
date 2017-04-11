/**
 * Created by chenya on 2017/1/10.
 */
//高级搜索组件
advancedQuery(function ($app, $appConfig) {
    var advancedQueryHTML = '<div class="advancedQuery" $-parses-bind:style="advancedQueryConfig.style|advancedQueryStyleHandle">' +
        '<ul>' +
        '<li $-for="eleConf in advancedQueryConfig.list"><template config="eleConf|buttonTemplateHandle"></template></li>' +
        '</ul>' +
        '</div>';//advancedQuery
    var elementHTML = '<div class="searchTab" $-on:click="isOpen">高级搜索<i class="iconfont icon-down"></i></div>' +
        '<ul class="isShowUL clickTabBefore">' +
        '<template config="eleConf|layoutTemplateHandle"></template>' +
        '</ul>';
    var filter = {
        //样式渲染绑定
        advancedQueryStyleHandle: function (styles) {
            var style = '';
            styles && typeof styles === 'object' && styles.forEach(function (val, key){
                style += key + ':{{advancedQueryConfig.style["' + key + '"]}};'
            });
            return style;
        },
        //按钮组件渲染绑定
        buttonTemplateHandle: function (eleConf) {
            switch (eleConf.type) {
                case "newAddQueryTag": //高级检索中新增的标签
                    return {
                        template: '<template config="eleConf.config"></template>',
                        scope: eleConf.scope || {},
                        filter: eleConf.filter || {}
                    };
                    break;
                case "defaultQueryTag": //默认查询标签获取数据
                    return {
                        template: '<template config="eleConf.config"></template>',
                        scope: eleConf.scope || {},
                        filter: eleConf.filter || {}
                    };
                    break;
                case "formLayoutQueryTag": //form-layout
                    return {
                        template: elementHTML,
                        scope: eleConf.scope || {},
                        filter: eleConf.filter || {}
                    };
                    break;
                default:
                    break;
            }
        },
        //form-layout组件渲染绑定
        layoutTemplateHandle: function (eleConf) {
            return {
                template: '<template config="eleConf.config"></template>',
                scope: eleConf.scope || {},
                filter: eleConf.filter || {}
            }
        }
    };
    //advanced-query组件注册
    $app.componentRegister('advancedQuery', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //组件原有的标签
            var scope,
                newElement,
                oldElement = this.$element,
                That = this;
            //监听获取属性中的数据
            this.watchAttrData('config', function (advancedQueryConfig) {
                if (advancedQueryConfig && typeof advancedQueryConfig === 'object') {
                    console.log(advancedQueryConfig);
                    scope = {
                        advancedQueryConfig: advancedQueryConfig,
                        //打开关闭
                        isOpen:function(){
                            //是否显示ul
                            var isShowUL= document.querySelector(".isShowUL");
                            //点击高级搜索按钮之前
                            isShowUL.classList.toggle("clickTabBefore");
                            //点击高级搜索按钮之后
                            isShowUL.classList.toggle("clickTabAfter");
                        },
                    };
                    newElement = this.viewVM(advancedQueryHTML, scope, filter).firstChild;
                    oldElement.parentNode.replaceChild(newElement, oldElement);
                    oldElement = newElement;
                    newElement = null;
                }
            }.bind(this));
        }
    })
});

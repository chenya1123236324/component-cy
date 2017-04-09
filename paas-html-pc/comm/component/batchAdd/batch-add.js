/**
 * Created by chenya on 2016/11/15.
 */
//批量新增组件

batchAdd(function ($app, $appConfig) {

    //batch-add元素模板
    var template = '<div class="batch-add">' +
        '<div class="batch-add-main">' +
        '<div class="batch-add-head">' +
            '<ul ><li $-for="eleConf in fieldList"><template config="eleConf|eleTemplateHandle:[$,eleConf.config]"></template></li><li><a class="add" $-on:click="contentList|add:[$,list]"><i class="iconfont icon-jiahao"></i></a></li></ul>' +
        '</div>' +//batch-head
        '<div class="batch-add-body" id="batchAddNum">' +
        '<ul $-for="(key,contentField) in contentList"><li $-for="eleConf in contentField"><template config="eleConf|eleTemplateHandle:[$,eleConf.config]"></template></li><li><template config="contentList|iconTemplateHandle"></template> </li></ul>' +
        '</div>' +//batch-body
        '</div>' +//form-batch-main
            //'<div class="batch-footer">' +
            //'<ul>' +
            //'<li><a class="add" $-on:click="contentList|add:[$,list]"><i class="iconfont icon-jiahao"></i>新增</a></li>' +
            // '<li><a class="remove"><i class="iconfont icon-shanchu"></i>删除</a></li>' +
            //'</ul>' +
            //'</div>' +
        '</div>';
    var addHTML='<a class="add" $-on:click="contentList|add:[$,list]"><i class="iconfont icon-jiahao"></i></a>';
    var removeHTML='<a class="remove" $-on:click="contentList|remove:[$,key]"><i class="iconfont icon-jianhao"></i></a>';
    //var template1='<div class="batch-add">' +
    //    '<div class="batch-add-main">' +
    //    ' <div class="batch-add-head">' +
    //    '<ul>' +
    //    '<li $-for="eleConf in fieldList"><template config="eleConf|eleTemplateHandle:[$,eleConf.config]"></template> </li><li><i $-on:click="contentList|add:[$,list]" class="iconfont icon-jiahao"></i></li>' +
    //    '</ul>' +
    //    '</div>'+//batch-add-head
    //    '</div>' +//batch-add-main
    //    '</div>';//batch-add

    filter = {
        //新增一行
        add:function (contentList,list) {
            console.log(contentList,"===contentList22===");
            console.log(list,"===list22===");
            return function () {
                contentList.push(list.clone());
            }
        },
        //删除一行
        remove:function (contentList,index) {
            return function () {
                //contentList.splice(index,1);
                this.parentNode.parentNode.remove();
            }
        },
        eleTemplateHandle:function (eleConf,conf) {
            return {
                template: '<template config="eleConf.config"></template>',
                scope: eleConf.scope || {},
                filter: eleConf.filter || {}
            }
        },
        iconTemplateHandle:function (eleConf,conf) {
            var batchAddNum= document.querySelector("#batchAddNum").getElementsByTagName("ul").length;
            console.log(batchAddNum,"batchAddNum");
            if(batchAddNum==0){
                return {
                    template: addHTML,
                    scope: eleConf.scope || {},
                    filter: eleConf.filter || {}
                }
            }else{
                return {
                    template: removeHTML,
                    scope: eleConf.scope || {},
                    filter: eleConf.filter || {}
                }
            }
        },
    };

    //form-batch组件注册
    $app.componentRegister('batchAdd', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            var scope = {
                    list:[],
                    fieldList:[],
                    contentList:[]
                },
                ele = this.$element,
                batchEle=this.viewVM(template, scope,filter).firstChild;

            //元素替换
            ele.parentNode.replaceChild(batchEle,ele);

            //数据监听
            this.watchAttrData('config', function (batchConfig) {
                console.log(batchConfig,"batchConfig");
                var batchConfig=batchConfig;
                scope.list=batchConfig.list.clone();
                scope.fieldList=batchConfig.list;
                scope.contentList=[batchConfig.list]
            }.bind(this));
        }
    });
});



/**
 * Created by chenya on 2016/12/15.
 */
//注册批量查询条件组件
batchCondition(function ($app, $appConfig) {

    var batchConditionHTML = '<div class="batchConditionContent" $-parses-bind:style="batchConditionConfig.style|styleHandle"><div class="batchConditionGroup"><div class="batchConditionBox"><div class="contentField" $-for="eleConf in batchConditionConfig.list"><template config="eleConf|rowTemplateHandle"></template></div></div>' +
        '<div class="contentText">' +
        '<i $-on:click="batchConditionAdd" class="iconfont icon-jiahao"></i>' +
            //'<i $-on:click="batchConditionReduce" class="iconfont icon-jianhao"></i>' +
        '</div>' +//contentText
        '</div>' +//batchConditionGroup
        '<div class="addBatchConditionBox" id="addBatchConditionBox"></div>' +
        '</div>';//batchConditionContent
    var elementHTML='<span $-class="{require:eleConf.require}"><template config="eleConf|eleTitleTemplateHandle:[$,eleConf.title]"></template></span>' +
        '<template config="eleConf|eleTemplateHandle:[$,eleConf.config]"></template>';

    var filter={
        //样式渲染绑定
        styleHandle:function (styles) {
            console.log(styles,"909090");
            var style='';
            styles && typeof styles === 'object' && styles.forEach(function (val,key) {
                style+=key+':{{batchConditionConfig.style["'+key+'"]}};'
            });
            return style;
        },
        rowTemplateHandle:function (eleConf) {
            return {
                template:elementHTML,
                scope:eleConf.scope||{},
                filter:eleConf.filter||{}
            }
        },
        eleTitleTemplateHandle:function (eleConf) {
            var title="";
            if(eleConf.title ==""){
                title= eleConf.title;
            }else{
                title= eleConf.title+":";
            }
            return {
                template:title
            }
        },
        eleTemplateHandle:function (eleConf,conf) {
            return {
                template:'<template config="eleConf.config"></template>'
            }
        }
    };

    //batch-condition组件注册
    $app.componentRegister('batchCondition', {
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
            this.watchAttrData('config',function (batchConditionConfig) {
                if(batchConditionConfig && typeof batchConditionConfig === 'object'){
                    scope={
                        batchConditionConfig:batchConditionConfig,
                        //新增一条数据
                        batchConditionAdd:function(){
                            var addBatchConditionHTML = '<div class="addBatchCondition"><div class="contentField" $-for="eleConf in batchConditionConfig.list"><template config="eleConf|rowTemplateHandle"></template></div><i $-on:click="batchConditionReduce" class="iconfont icon-jianhao"></i></div>';
                            document.querySelector(".addBatchConditionBox").appendChild(That.viewVM(addBatchConditionHTML,scope,filter).firstChild);
                        },
                        //减少一条数据
                        batchConditionReduce:function(){
                            //删除一行
                            this.parentNode.remove();
                            ////得到新增表单的列表，返回的是一个伪数组，需要转换成数组才可以操作，否则会报异常
                            //var addBatchCondition = document.getElementsByClassName('addBatchCondition');
                            //var addBatchConditionBox = document.getElementById('addBatchConditionBox');
                            //var hasDiv = addBatchConditionBox.getElementsByTagName('div')[0];
                            ////将伪数组转换成真数组并循环遍历
                            //[].forEach.call(addBatchCondition, function(value,key) {
                            //    //当遍历的数组是最后一个节点时，移除掉
                            //    if(key==addBatchCondition.length-1){
                            //        //移除最后一个节点
                            //        addBatchCondition[addBatchCondition.length-1].parentNode.removeChild(addBatchCondition[addBatchCondition.length-1]);
                            //    }
                            //});
                            //if(hasDiv==undefined){
                            //    //TODO【此处提示需要后期做好提示组件后进行修改】
                            //    alert("至少保留一行条件");
                            //}
                        }
                    };
                    newElement=this.viewVM(batchConditionHTML,scope,filter).firstChild;
                    oldElement.parentNode.replaceChild(newElement,oldElement);
                    oldElement=newElement;
                    newElement=null;
                }
            }.bind(this));
        }
    })
});
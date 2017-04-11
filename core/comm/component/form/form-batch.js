/**
 * Created by xiyuan on 17-1-17.
 */
formBatch(function ($app, $appConfig) {

    //form-batch 元素模板
    var template = '<div class="form-batch"><div class="form-batch-main">' +
                '<div class="batch-head">' +
                    '<ul><li $-for="fieldInfo in fieldList">{{fieldInfo.title}}</li><li>操作</li></ul>' +
                '</div>' +
                '<div class="batch-body">' +
                    '<ul $-for="(key,contentField) in contentList"><li $-for="eleConf in contentField"><template config="eleConf|eleTemplateHandle:[$,eleConf.config]"></template></li><li><a class="remove" $-on:click="contentList|remove:[$,key]"><i class="iconfont icon-shanchu"></i>删除</a></li></ul>' +
                '</div>' +
            '</div>' +
            '<div class="batch-footer">' +
                '<ul>' +
                    '<li><a class="add" $-on:click="contentList|add:[$,list]"><i class="iconfont icon-jiahao"></i>新增</a></li>' +
                    // '<li><a class="remove"><i class="iconfont icon-shanchu"></i>删除</a></li>' +
                '</ul>' +
            '</div>' +
            '</div>',
        filter = {
            add:function (contentList,list) {
                return function () {
                    contentList.push(list.clone());
                }
            },
            remove:function (contentList,index) {
                return function () {
                    contentList.splice(index,1);
                }
            },
            eleTemplateHandle:function (eleConf,conf) {
                var template='',
                    $value= eleConf.config.$value?'$-value="'+eleConf.config.$value+'"':'',
                    $model=eleConf.config.$model ?'$-model="'+eleConf.config.$model+'"':'',
                    value=eleConf.config.value === undefined ?'':'value="'+eleConf.config.value+'"',
                    scope={};

                switch (conf.type){
                    case 'time':
                    case 'date':
                    case 'datetime':
                    case 'text':
                    case 'color':
                    case 'file':
                    case 'password':

                    case 'icons':
                    case 'grid':
                    case 'tree':
                    case 'treeAndGrid':
                    case 'organisation':
                    case 'editor':
                    case 'radios':
                    case 'checkboxs':

                        scope.$config=eleConf.config.$config;
                        template='<input $-class="{readonly:eleConf.config.readOnly}" type="'+conf.type+'" '+$model+' $-bind:name="eleConf.config.name" config="$config" '+value+' '+$value+' $-bind:placeholder="eleConf.config.placeholder" $-valid="eleConf.config.valid" $-events="eleConf.config.events">';
                        break;
                    //下拉选择
                    case 'select':
                        scope.$config=eleConf.config.$config;
                        template='<select $-bind:name="eleConf.config.name" config="$config" $-bind:placeholder="eleConf.config.placeholder" '+$model+' '+value+' '+$value+'  $-events="eleConf.config.events"></select>';
                        break;
                    //多行文本框
                    case 'textarea':
                        template='<textarea $-bind:name="eleConf.config.name"  '+$model+' '+value+' '+$value+'  $-bind:placeholder="eleConf.config.placeholder" $-events="eleConf.config.events"></textarea>';
                        break;
                    case 'custom':
                        template='<template config="eleConf.config"></template>';
                        break;
                }

                return {
                    template:template,
                    scope:scope
                }
            }
        };

    //form-batch组件注册
    $app.componentRegister('formBatch', {
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

                if(!batchConfig.list[0].isGroup){
                    scope.list=batchConfig.list;
                    scope.fieldList=batchConfig.list;
                    scope.contentList=[batchConfig.list]
                }else{
                    scope.list=batchConfig.list[0].list;
                    scope.fieldList=batchConfig.list[0].list;
                    scope.contentList=[batchConfig.list[0].list]
                }

            }.bind(this));
        }
    });
});

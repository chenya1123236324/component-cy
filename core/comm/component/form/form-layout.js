/**
 * Created by xiyuan on 16-12-2.
 */
formLayout(function ($app, $appConfig) {

    //表单布局
    var layoutHTML = '<div class="form-layout"><ul><li $-class="{required:eleConf.required,hidden:eleConf.hidden}"  $-for="eleConf in layoutConfig.list" $-bind:class="eleConf.class" $-cmd="eleConf"><template config="eleConf|rowTemplateHandle"></template></li></ul></div>',
        elementHTML='<strong><template config="eleConf|eleTitleTemplateHandle:[$,eleConf.title]"></template></strong>' +
            '<ins><template config="eleConf|eleTemplateHandle:[$,eleConf.config]"></template></ins>',
        filter={
            rowTemplateHandle:function (eleConf) {
                return {
                    template:elementHTML,
                    scope:eleConf.scope||{},
                    filter:eleConf.filter||{}
                }
            },
            eleTitleTemplateHandle:function (eleConf) {
                return {
                    template:'<span title="'+eleConf.title+'">'+eleConf.title+'</span>'
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

    //form-layout组件注册
    $app.componentRegister('formLayout', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var scope,
                newElement,
                oldElement=this.$element;

            this.watchAttrData('config',function (layoutConfig) {
                if(layoutConfig && typeof layoutConfig === 'object'){
                    scope={
                        layoutConfig:layoutConfig
                    }.extend(layoutConfig.scope||{});

                    newElement=this.viewVM(layoutHTML,scope,filter.extend(layoutConfig.filter||{})).firstChild;
                    oldElement.parentNode.replaceChild(newElement,oldElement);
                    oldElement=newElement;
                    newElement=null;
                }
            }.bind(this))

        }
    });

});
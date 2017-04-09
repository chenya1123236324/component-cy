/**
 * Created by xiyuan on 17-3-23.
 */
define(['{HOME}/lib/custom/formStructConvert'], function (formStructConvert) {

    return function (viewInfo, fieldMapInfo) {

        //未使用字段信息
        var notUsedFields = [],
            formLayouts=[],
            fromStruct = formStructConvert({
                view: viewInfo
            }),
            //包含字段
            containFields = viewInfo.columnAssemble.split(',');

        //遍历处理当前模块中字段信息
        fieldMapInfo.forEach(function (moduleInfo) {
            var moduleData = {
                name: moduleInfo.name,
                fields: []
            };

            //提取未使用字段
            moduleInfo.list.forEach(function (fieldInfo) {
                if (containFields.indexOf(String(fieldInfo.id)) === -1) moduleData.fields.push(fieldInfo)

            })

            notUsedFields.push(moduleData);
        })

        if(fromStruct.formLayout.list[0].isGroup){


            var showName='显示字段',
                hiddenName='隐藏字段',
                showIcon='icon-show',
                hiddenIcon='icon-hidden';

            fromStruct.formLayout.list.forEach(function (formLayoutList) {
                formLayoutList.list.forEach(function (listConf) {

                    listConf.actions=[
                        {
                            icon:listConf.hidden?showIcon:hiddenIcon,
                            color:'#59abff',
                            name:listConf.hidden?showName:hiddenName,
                            trigger:function (e,data,rowEle) {
                                var name=showName,
                                    icon=showIcon;

                                if(this.icon === showIcon){
                                    icon=hiddenIcon
                                    name=hiddenName
                                }

                                data.rowData.hidden=!data.rowData.hidden;
                                this.icon=icon;
                                this.name=name;
                            }
                        },
                        /*{
                            icon:'icon-shezhi',
                            color:'#59abff',
                            name:'设置',
                            trigger:function () {

                            }
                        },*/
                        {
                            icon:'icon-shanchu',
                            color:'#ff7e7e',
                            name:'移除',
                            trigger:function (e,data) {
                                $packages('{PLUGINS}/hint/hint-loading',function ($loading) {
                                    var loadingPlugins = $loading('字段删除处理中...');
                                    loadingPlugins.open();
                                    setTimeout(function () {
                                        data.layoutConfig.list.splice(data.index, 1);
                                        setTimeout(function () {
                                            loadingPlugins.state && loadingPlugins.close();
                                        },100)
                                    }.bind(this),500)
                                });
                            }
                        }
                    ]
                })
                formLayouts.push({
                    name:formLayoutList.name,
                    list:formLayoutList.list,
                    scope:fromStruct.formLayout.scope
                })
            })

        }

        return {
            notUsedFields: notUsedFields,
            fieldConvert:fromStruct.fieldConvert,
            formInfo: {
                name: fromStruct.viewName,
                formConf: formLayouts
            }
        }

    }
})
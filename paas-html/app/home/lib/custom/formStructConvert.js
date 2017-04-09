/**
 * Created by xiyuan on 17-1-4.
 */
define(function () {

    //验证错误处理
    function errorHandle() {
        this.parentNode.parentNode.classList.add('err');
    }

    //验证成功处理
    function successHandle() {
        this.parentNode.parentNode.classList.remove('err');
    }

    /**
     * 字段信息转换
     * @param fieldInfo 字段信息
     * @param commConf  公共配置
     * @param recordColumns 修改页面需要的回现数据
     * @returns {{title: *, required: boolean, config: {type: *, name: string, $config: *, valid: {}, readOnly: boolean, placeholder: string}}}
     */
    function fieldConvert(fieldInfo, commConf, recordColumns) {

        //字段是否只读
        var isReadOnly = false,
            isRequired=commConf.requiredIds.in(fieldInfo.id) !== -1,
            //元素类型
            eleType,
            //组件配置
            $config,
            //字段key
            fieldKey=fieldInfo.moduleCode + '_' + fieldInfo.phyColumnName,
            //字段值
            fieldVal=recordColumns?recordColumns[fieldKey]:'',
            //字段约束信息
            constraintInfo,
            //字段校验
            validResult={},
            //占位符动作语言
            actionText='请输入',
            //表单元素name(检查字段是否当前模块)
            fieldName = (commConf.moduleId == fieldInfo.moduleId ? 'obj.' : fieldInfo.moduleCode + '_') + fieldInfo.phyColumnName;

        //检查字段是否只读
        fieldInfo.readonlyScope && (isReadOnly = true) //&& console.log(isReadOnly,'-----',fieldInfo);

        //字段元素类型检查
        switch (fieldInfo.showType) {
            //单选框[字典]
            case '2':
                eleType = 'radios';
                actionText='请选择';
                $config=$FRAME.model();

                $FRAME.model('HOME@custom/commApi:queryMaps').readData(function (data) {
                    $config.write({dataList:data,name:fieldName})
                }).method('getData',fieldInfo.showColVal);

                break;
            //复选框[字典]
            case '3':
                eleType = 'checkboxs';
                actionText='请选择';
                break;
            //下拉框 [字典]
            case '4':
                eleType = 'select';
                actionText='请选择';
                $config=$FRAME.model();

                $FRAME.model('HOME@custom/commApi:queryMaps').readData(function (data) {
                    $config.write({dataList:data,value:fieldVal})
                }).method('getData',fieldInfo.showColVal);

                break;
            //多行文本框
            case '5':
                eleType = 'textarea';
                actionText='请填写';
                break;
            //日期控件
            case '6':
                eleType = 'date';
                actionText='请选择';
                break;
            //文本/外键
            case '1':
                eleType = 'text';
                actionText='请输入';
                break;
            //数据列表选择
            case '7':
                actionText='请选择';
                switch (fieldInfo.showColValSet){
                    //部门选择
                    case '3':
                        eleType = 'tree';
                        $config={
                            treeConf:$FRAME.model('HOME@custom/commApi:orgList'),
                            select:function (info,write) {
                                info=info||{orgName:'',orgCode:''};
                                write(info.orgName,info.orgCode);
                            }
                        };

                        $config.treeConf.method('getData');

                        break;
                    //人员选择
                    case '4':
                        eleType = 'organisation';
                        $config={
                            orgCode:0,
                            select:function (info,write,dialog) {
                                write(info.userInfo.realName,info.userInfo.userCode);
                                dialog.close();
                            }
                        };
                        break;
                    default:
                        eleType = 'grid';

                }
                break;
            //文件上传
            case '8':
            //文件上传
            case '9':
                eleType = 'file';
                actionText='请选择';
                break;
            //富文编辑
            case '10':
                eleType = 'editor';
                actionText='请填写';
                break;
        }

        //字段约束
        if(constraintInfo=commConf.constraintMaps[fieldInfo.colConstraint]){
            //自定义匹配
            validResult['regExp']={
                value: constraintInfo.regularExpression,
                message: '请输入' + constraintInfo.constraintName + '格式',
                errorHandle: errorHandle,
                successHandle: successHandle
            };
        }

        //检查字段唯一性
        if(fieldInfo.isUnique){

            //唯一校验服务
            var uniqueModel=$FRAME.model('HOME@custom/commApi:unique');

            validResult['asyn'] = {
                value: function (value) {
                    return {
                        handle:function (callbck) {
                            uniqueModel.method('valid',{
                                "moduleId": fieldInfo.moduleId,
                                "columnName": fieldInfo.phyColumnName,
                                "recordId": commConf.viewId,
                                "columnValue": value
                            },function (state) {
                                callbck(state);
                            })
                        }
                    }
                },
                message:'你输入的'+fieldInfo.columnName+'已存在!',
                errorHandle: errorHandle,
                successHandle: successHandle
            };
        }

        //校验必填
        if(isRequired){
            validResult['required']={
                value: true,
                message: '请输入' + fieldInfo.columnName,
                errorHandle: errorHandle,
                successHandle: successHandle
            }
        }

        return {
            title: fieldInfo.columnName,
            required: isRequired,
            config: {
                type: eleType,
                name: fieldName,
                $config:$config,
                value:fieldVal,
                valid:validResult,
                readOnly:isReadOnly,
                placeholder: actionText + fieldInfo.columnName
            }
        }
    }

    //子表批量新增信息提取
    function batchAddInfo(commConf) {
        //table选择事件
        var selectEvent = function (event, index) {

            },
            batchStorage = [{
                name: '基本信息',
                focus: true,
                select: selectEvent,
                init: function () {

                },
                contentId: 'base'
            }];

        //遍历子表
        commConf.batchAddViewIds.forEach(function (batchViewId) {

            //tab配置容器
            var resModel = $FRAME.model(),
                //子表数据
                batchModel = $FRAME.model('HOME@custom/add:viewStructConf');

            //子表数据结构获取
            batchModel.method('getConf', batchViewId);

            //监听子表数据
            batchModel.readData(function (batchInfo) {

                //写入tab配置
                resModel.write({
                    name: batchInfo.viewName,
                    focus: true,
                    select: selectEvent,
                    scope:{
                        formLayout:batchInfo.formLayout
                    },
                    template:'<h3 class="tab-title">'+batchInfo.viewName+'</h3><form-batch config="formLayout"></form-batch>'
                })
            });
            batchStorage.push(resModel);
        });
        return batchStorage;
    }

    //对外提供的接口
    return function exports(res, getType,viewId) {

        console.log(res,'>>>');
        //表单视图信息
        var viewInfo = res.view,
            //字段信息
            fieldMaps = {},
            //约束map
            constraintMaps={},
            //显示的字段
            showIds = (viewInfo.showColumns || '').split(','),
            //公共数据
            commConf = {
                viewId:viewId,
                showIds: showIds,
                requiredIds:(viewInfo.requiredCols || '').split(','),
                batchAddViewIds: viewInfo.batchAddViewIds?viewInfo.batchAddViewIds.split(','):[],
                moduleId: viewInfo.moduleId,
                constraintMaps:constraintMaps
            },
            //数据转换容器
            resultFormLayout = [],
            resultActionList = [];

        //约束maps
        (res.constraintList||[]).forEach(function (constraintInfo) {
            constraintMaps[constraintInfo.id]=constraintInfo;
        });

        //字段信息提取成map
        (res.columnList||[]).forEach(function (fieldInfo) {
            //字段信息收集
            fieldMaps[fieldInfo.id] = fieldInfo;
            //字段数据转换
            resultFormLayout.push(fieldConvert(fieldInfo, commConf,res.recordColumns));
        });

        return {
            formLayout: {
                list: resultFormLayout
            },
            viewName: viewInfo.viewName,
            actionList: resultActionList,
            tabConf: getType && batchAddInfo(commConf)
        }

    }

});
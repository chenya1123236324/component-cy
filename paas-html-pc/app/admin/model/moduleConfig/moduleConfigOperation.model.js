/**
 * Created by chenya on 2016/12/27.
 */

//1、操作-新增按钮
model('moduleConfigOperationBtn', [':moduleConfigOperationLayoutAdd'], function (moduleConfigOperationLayoutAdd) {
    var This = this,
        moduleConfigOperationApi;
    this.method('getOperationApi',function (api) {
        moduleConfigOperationApi = api;
    });
    this.$model = [{
        isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing: '20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName: 'eventModuleConfig',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            'margin-right': '30px',
        },
        list: [
            {
                class: 'btn btn-teal', //【必填项】按钮样式
                icon: 'iconfont icon-jiahao', //【非必填项】图标
                label: '新增',//【必填项】按钮文字
                align: 'left',//【必填项】文字居中
                padding: '6px 24px', //【必填项】按钮内边距，可以控制按钮大小
                events: {
                    click: function (event) { //【必填项】按钮事件
                        var moduleId = document.querySelector("#setModuleID").value;
                        //console.log(moduleId,"===moduleId===");
                        moduleConfigOperationLayoutAdd.method('getModuleConfigOperationAdd',moduleId);
                        //新增标签弹框
                        var scope = {
                            addFormData:$FRAME.$model(),
                            moduleConfigOperationLayoutAdd: moduleConfigOperationLayoutAdd
                        };
                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增操作',//【必填项】dialog标题
                                content: '<form id="addFormData" $-form="addFormData"><form-layout config="moduleConfigOperationLayoutAdd"></form-layout></form>',
                                scope:scope,
                                maxmin:true,
                                zoom:'min',
                                filter:{},
                                width:'850px',//【非必填项】dialog宽，不填默认为640px
                                height:'560px;',//【非必填项】dialog高，不填默认为430px
                                btns:[
                                    {
                                        name:'保存',
                                        trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作
                                            //判断是否是数组【列表下拉多选时候，数据处理】
                                            function isArray(field){
                                                if ($FRAME.lib.$type.getType(field) === 'array') {
                                                    return field.join(',').toString();
                                                } else {
                                                    return field;
                                                };
                                            };
                                            //表单校验,保存数据到数据库,局部刷新
                                            if (a.scope.addFormData.valid()) {
                                                var addFormData = a.scope.addFormData.getData(),
                                                    saveFormServer = This.server({
                                                        serverType: 'api',
                                                        method: 'POST',
                                                        url: 'addModuleConfigOperation'
                                                    });
                                                saveFormServer.receive(function (res) {
                                                    if (res.status == "200") {
                                                        //关闭弹窗
                                                        interface.close();
                                                        //提示
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增成功！');
                                                        });
                                                        moduleConfigOperationApi.get('update')();
                                                    } else {
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增失败！');
                                                        });
                                                    }
                                                }.bind(this)).send({
                                                    "batchType": addFormData.batchType || "批量删除",//【必填】"UPDATE",
                                                    "batchUpdateViewId": addFormData.batchUpdateViewId || 1,//【必填】1,
                                                    "description": addFormData.description || "",//"des",
                                                    "flag": 0,//【必填】
                                                    "flushType": addFormData.flushType || "REDIRECT",//【必填】"REDIRECT",
                                                    "followType": addFormData.followType || 1,//【必填】 1,
                                                    "forwardVid": addFormData.forwardVid || 1,//【必填】1,
                                                    "iconClass": addFormData.iconClass || "icon-qiandao",// 【必填】"iconClass",
                                                    "moduleId": moduleId, //模块id
                                                    "operationName": addFormData.operationName || 1,//"moduleId",
                                                    "operationPosition": addFormData.operationPosition || 1,// 0,
                                                    "operationType": addFormData.operationType || 1,//1,
                                                    "ruleId": addFormData.ruleId || 1,//1,【必填】
                                                    "sort": addFormData.sort || 1,//【必填】2,
                                                    "status": addFormData.status || 1,// 1,
                                                    "submitDataType": addFormData.submitDataType || 1,// 【必填】"ALL",
                                                    "submitType": addFormData.submitType || 1,// 1,
                                                    "submitUrl": addFormData.submitUrl || 1,// "url",
                                                    "type": addFormData.type || 1,//1,
                                                    "viewId": isArray(addFormData.viewId )|| 1,// 1
                                                });
                                            } else {
                                                //不关闭弹框
                                                return false;
                                            }
                                        },
                                    },
                                    {
                                        name:'取消',
                                        trigger:function (eve,interface) {
                                            interface.close();
                                        }
                                    },
                                ],

                            })
                        });
                    }
                }
            },

        ]
    }]
});

//2、操作-form-layout 新增
model('moduleConfigOperationLayoutAdd', ['$:@lib/publicData/moduleConfig/selectRelatedPages', '$:@lib/publicData/moduleConfig/targetViewTreeConvert'], function (selectRelatedPages, targetViewTreeConvert) {
    var This = this;
    this.method('getModuleConfigOperationAdd', function (moduleId) {
        //模块Id
        //var moduleId = document.querySelector("#setModuleID").value;
        var validConfServer = this.server({
            serverType: 'jsonp',
            method: 'moduleConfigOperation',
            url: './serverData/config/form/moduleConfigOperation.js'
        });
        validConfServer.receive(function (res) {

            var validSwitchs = {
                0: true,//操作名称
                1: false,//图标
                2: true,//排序
                3: false,//操作类型
                4: false,//刷新类型
                5: false,//按钮位置
                6: true,//关联页面
                7: true,//目标页面
                8: false,//批量操作类型
                9: false,//批量操作视图
                10: false,//提交类型
                11: true,//提交地址
                12: false,//状态
                13: false,//描述
            };
            //---------------------------------不可删------------------------
            //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
            //1、当操作类型为【0或9】（提交、提交确认）时，查询视图的视图类型为：【1、2、3、4、5、7、8】
            //2、当操作类型为【1或2或3】（新增、修改、删除）时，查询视图的视图类型为：【1、4、5】
            //3、当操作类型为【4或5或6或10】（明细查询、流程提交、数据导入、数据导出）时，查询视图的视图类型为：【1、5】
            //4、当操作类型为【7】（批量操作）时，查询视图的视图类型为：【1】
            //5、当操作类型为【8】（新增关联模块数据）时，查询视图的视图类型为：【1、4】
            selectRelatedPages(moduleId,[1,4,5],[0],function (viewId) {
                This.$model.list[6].config.scope.selectViewId = "";
                This.$model.list[6].config.scope.selectViewId = viewId;
            });

            //目标页面  参数:moduleId:模块Id , val:操作类型 ，
            targetViewTreeConvert(moduleId, "1", function (targetView) {
                This.$model.list[7].config.$config.treeConf = "";
                This.$model.list[7].config.$config.treeConf = targetView;
            });
            //---------------------------------不可删------------------------


            this.$model = {
                scope: {
                    validSwitchs: validSwitchs,
                },
                filter: {},
                list: [
                    //【1、操作名称】
                    {
                        title: '操作名称',
                        required: true,
                        config: {
                            type: 'custom',
                            template: '<input type="text" name="operationName" $-valid="operationName"  $-valid-switch="validSwitchs[0]">',
                            scope: {
                                operationName: res.operationName
                            },
                            //需要给元素添加的指令
                            cmd: {
                                "$-bind:name": '',
                                "$-value": '',
                                "$-model": 'value'
                            }
                        },
                        //当前行需要添加的指令
                        cmd: {
                            "$-if": true
                        },
                        //当前行的作用域
                        scope: {
                            value: ''
                        },
                        //当前行的过滤器
                        filter: {}
                    },
                    //【2、图标】
                    {
                        title:'图标',
                        config:{
                            type:'icons',
                            name:'iconClass'
                        },
                        hidden:true
                    },
                    //【3、排序】
                    {
                        title: '排序',
                        required: true,
                        config: {
                            type: 'custom',
                            template: '<input type="text" name="sort" $-valid="sort" $-valid-switch="validSwitchs[2]">',
                            scope: {
                                sort: res.sort
                            },
                            cmd: {
                                "$-value": '',
                                "$-model": ''
                            }
                        }
                    },
                    //【4、操作类型】
                    {
                        title: '操作类型', //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        required: false,
                        config: {
                            type: 'custom',
                            name: 'operationType',
                            template: ' <select config="selectType" $-on:change="selectType"></select>',
                            scope: {
                                selectType: {
                                    name: 'type',
                                    //search:true,
                                    //multiple:true,
                                    style: {
                                    },
                                    events: {
                                        change: function () {
                                            console.log(this.value);
                                            //操作类型
                                            var val = this.value;
                                            //---------------------------------不可删------------------------
                                            //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                                            if(val == 1 || val == 2|| val == 3){
                                                selectRelatedPages(moduleId,[1,4,5],[0],function (viewId) {
                                                    This.$model.list[6].config.scope.selectViewId = "";
                                                    This.$model.list[6].config.scope.selectViewId = viewId;
                                                });
                                            }else if(val == 0 || val == 9){
                                                selectRelatedPages(moduleId,[1,2,3,4,5,7,8],[0],function (viewId) {
                                                    This.$model.list[6].config.scope.selectViewId = "";
                                                    This.$model.list[6].config.scope.selectViewId = viewId;
                                                });
                                            }else if(val == 4 || val == 5|| val == 6|| val == 10){
                                                selectRelatedPages(moduleId,[1,5],[0],function (viewId) {
                                                    This.$model.list[6].config.scope.selectViewId = "";
                                                    This.$model.list[6].config.scope.selectViewId = viewId;
                                                });
                                            }else if(val == 7){
                                                selectRelatedPages(moduleId,[1],[0],function (viewId) {
                                                    This.$model.list[6].config.scope.selectViewId = "";
                                                    This.$model.list[6].config.scope.selectViewId = viewId;
                                                });
                                            }else if(val ==8){
                                                selectRelatedPages(moduleId,[1,4],[0],function (viewId) {
                                                    This.$model.list[6].config.scope.selectViewId = "";
                                                    This.$model.list[6].config.scope.selectViewId = viewId;
                                                });
                                            }

                                            //目标页面  参数:moduleId:模块Id , val:操作类型 ，
                                            targetViewTreeConvert(moduleId, val, function (targetView) {
                                                //console.log(targetView, "内部目标页面");
                                                //console.log(moduleId, "内部目标页面moduleId");
                                                This.$model.list[7].config.$config.treeConf = "";
                                                This.$model.list[7].config.$config.treeConf = targetView;
                                            });
                                            //---------------------------------不可删------------------------

                                            if (val == 1 || val == 2 || val == 4 || val == 6 || val == 8 || val == 10) {
                                                //显示隐藏
                                                //1、刷新类型
                                                flushTypeHidden.hidden=true;
                                                //2、按钮位置
                                                operationPositionHidden.hidden=true;
                                                //3、提交类型
                                                submitTypeHidden.hidden=true;
                                                //4、提交地址
                                                submitUrlHidden.hidden=true;
                                                //5、批量操作类型
                                                batchTypeHidden.hidden=true;
                                                //6、批量操作视图
                                                batchUpdateViewIdHidden.hidden=true;
                                                validSwitchs[11] = false;
                                            } else if (val == 3 || val == 5 || val == 9) {
                                                //显示隐藏
                                                //1、刷新类型
                                                flushTypeHidden.hidden=false;
                                                //2、按钮位置
                                                operationPositionHidden.hidden=false;
                                                //3、提交类型
                                                submitTypeHidden.hidden=true;
                                                //4、提交地址
                                                submitUrlHidden.hidden=true;
                                                //5、批量操作类型
                                                batchTypeHidden.hidden=true;
                                                //6、批量操作视图
                                                batchUpdateViewIdHidden.hidden=true;
                                                validSwitchs[11] = false;
                                            } else if (val == 0) {
                                                //显示隐藏
                                                //1、刷新类型
                                                flushTypeHidden.hidden=false;
                                                //2、按钮位置
                                                operationPositionHidden.hidden=false;
                                                //3、提交类型
                                                submitTypeHidden.hidden=false;
                                                //4、提交地址
                                                submitUrlHidden.hidden=true;
                                                //5、批量操作类型
                                                batchTypeHidden.hidden=true;
                                                //6、批量操作视图
                                                batchUpdateViewIdHidden.hidden=true;
                                                validSwitchs[11] = false;
                                            } else if (val == 7) {
                                                //显示隐藏
                                                //1、刷新类型
                                                flushTypeHidden.hidden=false;
                                                //2、按钮位置
                                                operationPositionHidden.hidden=true;
                                                //3、提交类型
                                                submitTypeHidden.hidden=true;
                                                //4、提交地址
                                                submitUrlHidden.hidden=true;
                                                //5、批量操作类型
                                                batchTypeHidden.hidden=false;
                                                //6、批量操作视图
                                                batchUpdateViewIdHidden.hidden=true;
                                                validSwitchs[11] = false;
                                            }
                                        }
                                    },
                                    dataList: [
                                        {
                                            content: '新增',
                                            value: '1',
                                            selected: true
                                        },
                                        {
                                            content: '修改',
                                            value: '2',
                                        },
                                        {
                                            content: '删除',
                                            value: '3',
                                        },
                                        {
                                            content: '提交',
                                            value: '0',
                                        },
                                        {
                                            content: '明细查询',
                                            value: '4',
                                        }, {
                                            content: '流程提交',
                                            value: '5',
                                        },
                                        {
                                            content: '数据导入',
                                            value: '6',
                                        },
                                        {
                                            content: '批量操作',
                                            value: '7',
                                        },
                                        {
                                            content: '新增关联模块数据',
                                            value: '8',
                                        },
                                        {
                                            content: '提交确认',
                                            value: '9',
                                        },
                                        {
                                            content: '数据导出',
                                            value: '10',
                                        },

                                    ]
                                },
                            }
                        },
                        show: true
                    },
                    //【5、刷新类型】
                    flushTypeHidden={
                        title: '刷新类型',   //1、REDIRECT：页面跳转  2、CURRENT: 刷新当前页  3、GOBACK: 返回上一步  4、FLUSHLIST: 刷新当前列表  5、NO:不操作
                        required: false,
                        config: {
                            type: 'custom',
                            template: ' <select config="selectFlushType" $-on:change="selectFlushType"></select>',
                            scope: {
                                selectFlushType: {
                                    name: 'flushType',
                                    //search:true,
                                    //multiple:true,
                                    style: {
                                    },
                                    events: {
                                        change: function () {
                                            var val = this.value;
                                            if (val == "REDIRECT") {
                                                //目标页面
                                                forwardVidHidden.hidden=false;

                                            } else {
                                                //目标页面
                                                forwardVidHidden.hidden=true;
                                            }
                                        }
                                    },
                                    dataList: [
                                        {
                                            content: '页面跳转',
                                            value: 'REDIRECT',
                                            selected: true
                                        },
                                        {
                                            content: '刷新当前页',
                                            value: 'CURRENT',
                                        },
                                        {
                                            content: '返回上一步',
                                            value: 'GOBACK',
                                        },
                                        {
                                            content: '刷新当前列表',
                                            value: 'FLUSHLIST',
                                        },
                                        {
                                            content: '不操作',
                                            value: 'NO',
                                        },
                                    ]
                                },
                            }
                        },
                        hidden: true
                    },
                    //【6、按钮位置】
                    operationPositionHidden= {
                        title: '按钮位置',  //0、页面顶部  1、查询列表中
                        required: false,
                        config: {
                            type: 'custom',
                            template: ' <select config="selectOperationPosition" $-on:change="selectOperationPosition"></select>',
                            scope: {
                                selectOperationPosition: {
                                    name: 'operationPosition',
                                    //search:true,
                                    //multiple:true,
                                    style: {
                                    },
                                    events: {
                                        change: function () {
                                        }
                                    },
                                    dataList: [
                                        {
                                            content: '页面顶部',
                                            value: '0',
                                            selected: true
                                        },
                                        {
                                            content: '查询列表中',
                                            value: '1',
                                        },
                                    ]
                                },
                            }
                        },
                        hidden: true
                    },
                    //【7、关联页面】
                    {
                        title: '关联页面',
                        required: true,
                        config: {
                            type: 'custom',
                            name: 'viewId',
                            template: ' <select config="selectViewId" $-on:change="selectViewId" $-valid-switch="validSwitchs[6]"></select>',
                            scope: {
                                selectViewId: {
                                    name: 'viewId',
                                    search: true,
                                    multiple: true,
                                    style: {
                                    },
                                    events: {
                                        change: function () {
                                        }
                                    },
                                    dataList: [
                                        {
                                            content: '--请选择--',
                                            value: '-1',
                                        },
                                    ]
                                },
                            }
                        },
                        show: true
                    },
                    //【8、目标页面】
                    forwardVidHidden={
                        title: '目标页面',
                        required: true,
                        config: {
                            type: 'tree',
                            name:'forwardVid',
                            $config:{
                                treeConf:"",
                                select:function (info,write) {
                                    info=info||{cname:'',id:''};
                                    write(info.cname,info.id);
                                }
                            }
                        },
                        hidden: false
                    },
                    //【9、批量操作类型】
                    batchTypeHidden={
                        title: '批量操作类型',   //DELETE 批量删除、UPDATE 批量更新 、CUSTOM 自定义
                        required: false,
                        config: {
                            type: 'custom',
                            template: ' <select config="selectBatchType" $-on:change="selectBatchType"></select>',
                            scope: {
                                selectBatchType: {
                                    name: 'batchType',
                                    //search:true,
                                    //multiple:true,
                                    style: {
                                    },
                                    events: {
                                        change: function () {
                                            var val = this.value;
                                            if (val == "DELETE") {
                                                //4、提交地址
                                                submitUrlHidden.hidden=true;
                                                //6、批量操作视图
                                                batchUpdateViewIdHidden.hidden=true;
                                            } else if (val == "UPDATE") {
                                                //4、提交地址
                                                submitUrlHidden.hidden=true;
                                                //6、批量操作视图
                                                batchUpdateViewIdHidden.hidden=false;

                                            } else if (val == "CUSTOM") {
                                                //4、提交地址
                                                submitUrlHidden.hidden=false;
                                                //6、批量操作视图
                                                batchUpdateViewIdHidden.hidden=false;
                                            }
                                        }
                                    },
                                    dataList: [
                                        {
                                            content: '批量删除',
                                            value: 'DELETE',
                                            selected: true
                                        },
                                        {
                                            content: '批量更新',
                                            value: 'UPDATE',
                                        }, {
                                            content: '自定义',
                                            value: 'CUSTOM',
                                        },
                                    ]
                                },
                            }
                        },
                        hidden: true
                    },
                    //【10、批量操作视图】
                    batchUpdateViewIdHidden= {
                        title: '批量操作视图',
                        required: false,
                        config: {
                            type: 'custom',
                            name: 'batchUpdateViewId',
                            template: ' <input type="text"  name="batchUpdateViewId" />',
                            //template: ' <input type="text" readonly name="batchUpdateViewId"  $-on:click="selectTargetPage"  $-valid="batchUpdateViewId">',
                            scope: {
                                //batchUpdateViewId: res.batchUpdateViewId,
                                selectTargetPage: function () {
                                    $dialog({
                                        title: '请选择',//【必填项】dialog标题
                                        content: "",//【非必填项】dialog内容
                                        passText: '确认',//【必填项】dialog按钮
                                        cancelText: '取消',//【必填项】dialog按钮
                                        width: '700px',//【非必填项】dialog宽，不填默认为640px
                                        height: '560px;',//【非必填项】dialog高，不填默认为430px
                                        template: '', //【必填项】dialog填充内容，需要与scope配合使用 TODO:此处需要加入ztree组件，之前的组件不能使用，调用报错，大概看了下原因，在操作DOM元素选择时报错
                                        scope: { //【必填项】dialog数据绑定，需要与template配合使用

                                        },
                                        pass: function () { //【必填项】dialog通过需要进行的操作
                                            alert('确认成功!');
                                        },
                                        cancel: function () {//【必填项】dialog不通过需要进行的操作
                                        }
                                    });
                                },
                            }
                        },
                        hidden: true
                    },
                    //【11、提交类型】
                    submitTypeHidden= {
                        title: '提交类型',   //0、新增 1、修改 2、自定义 3、批量删除 4、批量编辑
                        required: false,
                        config: {
                            type: 'custom',
                            name: 'submitType',
                            template: ' <select config="selectSubmitType" $-on:change="selectSubmitType"></select>',
                            scope: {
                                selectSubmitType: {
                                    name: 'submitType',
                                    //search:true,
                                    //multiple:true,
                                    style: {
                                    },
                                    events: {
                                        change: function () {
                                            var val = this.value;
                                            if (val == 0 || val == 1) {
                                                //1、提交地址
                                                submitUrlHidden.hidden=true;
                                            } else if (val == 2) {
                                                //1、提交地址
                                                submitUrlHidden.hidden=false;
                                            }
                                        }
                                    },
                                    dataList: [
                                        {
                                            isGroup: false,
                                            disabled: false,//是否不可以选择,默认false(即可选择)
                                            content: '新增',
                                            value: '0',
                                            selected: true
                                        },
                                        {
                                            isGroup: false,
                                            disabled: false,
                                            content: '修改',
                                            value: '1',
                                        }, {
                                            isGroup: false,
                                            disabled: false,
                                            content: '自定义',
                                            value: '2',
                                        },
                                    ]
                                },
                            }
                        },
                        hidden: true
                    },
                    //【12、提交地址】
                    submitUrlHidden= {
                        title: '提交地址',
                        required: true,
                        config: {
                            type: 'custom',
                            template: '<input type="text" name="submitUrl" $-valid="submitUrl" $-valid-switch="validSwitchs[11]">',
                            scope: {
                                submitUrl: res.submitUrl
                            },
                            //需要给元素添加的指令
                            cmd: {
                                "$-bind:name": '',
                                "$-value": '',
                                "$-model": 'value'
                            }
                        },
                        //当前行需要添加的指令
                        cmd: {
                            "$-if": true
                        },
                        //当前行的作用域
                        scope: {
                            value: ''
                        },
                        //当前行的过滤器
                        filter: {},
                        hidden:true
                    },
                    //【13、状态】
                    {
                        title: '状态',
                        required: false,
                        class: 'clos-all',
                        config: {
                            type: 'custom',
                            name: 'status',
                            template: '<input type="radio" name="status" value="0" checked $-on:change="events.change" >启用<input type="radio" name="status" value="1" $-on:change="events.change"  style="margin-left: 15px">非启用',
                            scope: {
                                events: {
                                    change: function () {
                                        console.log(this)
                                    }
                                }
                            }
                        }
                    },
                    //【14、描述】
                    {
                        title: '描述',
                        required: false,
                        class: 'clos-all',
                        config: {
                            type: 'custom',
                            name: 'description',
                            template: '<textarea name="description" cols="30" rows="20"></textarea>',
                            scope: {}
                        }
                    },
                ]
            }
        }.bind(this)).send();

    }.bind(this));
});

//3、操作-form-layout 编辑
model('moduleConfigOperationLayoutEdit', ['$:@lib/publicData/moduleConfig/selectRelatedPages', '$:@lib/publicData/moduleConfig/targetViewTreeConvert'], function (selectRelatedPages, targetViewTreeConvert) {
    var This = this;
    //模块Id
    //var moduleId = document.querySelector("#setModuleID").value;
    var menuServer = this.server({
        serverType: 'api',//如果是访问接口,这里是api,其他的则是http
        method: 'POST',
        url: 'getModuleConfigOperation'
    });
    this.method('getModuleConfigOperation', function (rowId,moduleId) {
        menuServer.receive(function (res, xhr) {
            var validConfServer = this.server({
                serverType: 'jsonp',
                method: 'moduleConfigOperation',
                url: './serverData/config/form/moduleConfigOperation.js'
            });
            validConfServer.receive(function (resValid) {

                var validSwitchs = {
                    0: true,//操作名称
                    1: false,//图标
                    2: true,//排序
                    3: false,//操作类型
                    4: false,//刷新类型
                    5: false,//按钮位置
                    6: true,//关联页面
                    7: true,//目标页面
                    8: false,//批量操作类型
                    9: false,//批量操作视图
                    10: false,//提交类型
                    11: true,//提交地址
                    12: false,//状态
                    13: false,//描述
                };

                //---------------------------------不可删------------------------
                //数组去重
                function deleteRepetion(arr){
                    var arrTable = {},arrData = [];
                    for (var i = 0; i < arr.length; i++) {
                        if( !arrTable[ arr[i] ]){
                            arrTable[ arr[i] ] = true;
                            arrData.push(arr[i])
                        }
                    }
                    return arrData;
                };
                //关联页面  参数:moduleId:模块Id , val:操作类型 ，
                var viewId=deleteRepetion(String(res.data.viewId).split(","));
                var val=res.data.type;
                console.log(viewId,"====viewId===");
                //目标页面  参数:moduleId:模块Id , val:操作类型 ，
                targetViewTreeConvert(moduleId, '1', function (targetView) {
                    This.$model.list[7].config.$config.treeConf = "";
                    This.$model.list[7].config.$config.treeConf = targetView;
                    console.log(val,"操作类型");
                    if(val==1){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="1";
                        This.$model.list[3].config.scope.typeName="新增";
                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,4,5], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }else if(val==2){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="2";
                        This.$model.list[3].config.scope.typeName="修改";

                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,4,5], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });

                    }else if(val==3){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="3";
                        This.$model.list[3].config.scope.typeName="删除";

                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,4,5], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });

                    }else if(val==0){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="0";
                        This.$model.list[3].config.scope.typeName="提交";
                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,2,3,4,5,7,8], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }else if(val==4){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="4";
                        This.$model.list[3].config.scope.typeName="明细查询";
                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,5], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }else if(val==5){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="5";
                        This.$model.list[3].config.scope.typeName="流程提交";

                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,5], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }else if(val==6){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="6";
                        This.$model.list[3].config.scope.typeName="数据导入";
                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,5], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }else if(val==7){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="7";
                        This.$model.list[3].config.scope.typeName="批量操作";
                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }else if(val==8){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="8";
                        This.$model.list[3].config.scope.typeName="新增关联模块数据";
                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,4], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }else if(val==9){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="9";
                        This.$model.list[3].config.scope.typeName="提交确认";
                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,2,3,4,5,7,8], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }else if(val==10){
                        //操作类型  //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                        This.$model.list[3].config.scope.typeValue="10";
                        This.$model.list[3].config.scope.typeName="数据导出";
                        //关联页面  参数:moduleId:模块Id , viewTypes:视图类型集合，
                        selectRelatedPages(moduleId, [1,5], viewId,function (viewId) {
                            This.$model.list[6].config.scope.selectViewId = "";
                            This.$model.list[6].config.scope.selectViewId = viewId;
                        });
                    }
                    //显示隐藏
                    if (val == 1 || val == 2 || val == 4 || val == 6 || val == 8 || val == 10) {
                        //显示隐藏
                        //1、刷新类型
                        flushTypeHidden.hidden=true;
                        //2、按钮位置
                        operationPositionHidden.hidden=true;
                        //3、提交类型
                        submitTypeHidden.hidden=true;
                        //4、提交地址
                        submitUrlHidden.hidden=true;
                        //5、批量操作类型
                        batchTypeHidden.hidden=true;
                        //6、批量操作视图
                        batchUpdateViewIdHidden.hidden=true;
                        validSwitchs[11] = false;
                    } else if (val == 3 || val == 5 || val == 9) {
                        //显示隐藏
                        //1、刷新类型
                        flushTypeHidden.hidden=false;
                        //2、按钮位置
                        operationPositionHidden.hidden=false;
                        //3、提交类型
                        submitTypeHidden.hidden=true;
                        //4、提交地址
                        submitUrlHidden.hidden=true;
                        //5、批量操作类型
                        batchTypeHidden.hidden=true;
                        //6、批量操作视图
                        batchUpdateViewIdHidden.hidden=true;
                        validSwitchs[11] = false;
                    } else if (val == 0) {
                        //显示隐藏
                        //1、刷新类型
                        flushTypeHidden.hidden=false;
                        //2、按钮位置
                        operationPositionHidden.hidden=false;
                        //3、提交类型
                        submitTypeHidden.hidden=false;
                        //4、提交地址
                        submitUrlHidden.hidden=true;
                        //5、批量操作类型
                        batchTypeHidden.hidden=true;
                        //6、批量操作视图
                        batchUpdateViewIdHidden.hidden=true;
                        validSwitchs[11] = false;
                    } else if (val == 7) {
                        //显示隐藏
                        //1、刷新类型
                        flushTypeHidden.hidden=false;
                        //2、按钮位置
                        operationPositionHidden.hidden=true;
                        //3、提交类型
                        submitTypeHidden.hidden=true;
                        //4、提交地址
                        submitUrlHidden.hidden=true;
                        //5、批量操作类型
                        batchTypeHidden.hidden=false;
                        //6、批量操作视图
                        batchUpdateViewIdHidden.hidden=true;
                        validSwitchs[11] = false;
                    };
                });
                //---------------------------------不可删------------------------



                this.$model = {
                    scope: {
                        validSwitchs: validSwitchs,
                    },
                    filter: {},
                    list: [
                        //【1、操作名称】
                        {
                            title: '操作名称',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="operationName" $-valid="operationName"  $-valid-switch="validSwitchs[0]" $-bind:value="name">',
                                scope: {
                                    name:res.data.operationName, //后台获取
                                    operationName: resValid.operationName //表单校验
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        //【2、图标】
                        {
                            title:'图标',
                            config:{
                                type:'icons',
                                name:'iconClass'
                            },
                            hidden:true
                        },
                        //【3、排序】
                        {
                            title: '排序',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="sort" $-valid="sort" $-valid-switch="validSwitchs[2]"  $-bind:value="getSort">',
                                scope: {
                                    getSort:res.data.sort, //后台获取
                                    sort: resValid.sort
                                },
                                cmd: {
                                    "$-value": '',
                                    "$-model": ''
                                }
                            }
                        },
                        //【4、操作类型】
                        {
                            title: '操作类型', //1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                            required: false,
                            config: {
                                type: 'custom',
                                name: 'type',
                                //template: '<input type="text" name="operationType"   readonly  $-bind:value="operationType">',
                                template:'<input type="text" name="type" $-bind:value="typeValue" style="display:none"  /><input type="text"  $-bind:value="typeName" disabled />',
                                scope: {
                                    //operationType:res.data.operationType, //后台获取
                                    typeValue:"",
                                    typeName:"",
                                }
                            },
                            show: true
                        },
                        //【5、刷新类型】
                        flushTypeHidden={
                            title: '刷新类型',   //1、REDIRECT：页面跳转  2、CURRENT: 刷新当前页  3、GOBACK: 返回上一步  4、FLUSHLIST: 刷新当前列表  5、NO:不操作
                            required: false,
                            config: {
                                type: 'custom',
                                template: ' <select config="selectFlushType" $-on:change="selectFlushType"></select>',
                                scope: {
                                    selectFlushType: {
                                        name: 'flushType',
                                        //search:true,
                                        //multiple:true,
                                        style: {
                                        },
                                        events: {
                                            change: function () {
                                                var val = this.value;
                                                //目标页面
                                                var forwardVid = document.querySelector('input[name=forwardVid]').parentNode.parentNode;
                                                if (val == "REDIRECT") {
                                                    forwardVid.style.display = "flex";
                                                } else {
                                                    forwardVid.style.display = "none";
                                                }
                                            }
                                        },
                                        dataList: [
                                            {
                                                content: '页面跳转',
                                                value: 'REDIRECT',
                                                selected: true
                                            },
                                            {
                                                content: '刷新当前页',
                                                value: 'CURRENT',
                                            },
                                            {
                                                content: '返回上一步',
                                                value: 'GOBACK',
                                            },
                                            {
                                                content: '刷新当前列表',
                                                value: 'FLUSHLIST',
                                            },
                                            {
                                                content: '不操作',
                                                value: 'NO',
                                            },
                                        ]
                                    },
                                }
                            },
                            hidden: true
                        },
                        //【6、按钮位置】
                        operationPositionHidden={
                            title: '按钮位置',  //0、页面顶部  1、查询列表中
                            required: false,
                            config: {
                                type: 'custom',
                                template: ' <select config="selectOperationPosition" $-on:change="selectOperationPosition"></select>',
                                scope: {
                                    selectOperationPosition: {
                                        name: 'operationPosition',
                                        //search:true,
                                        //multiple:true,
                                        style: {
                                        },
                                        events: {
                                            change: function () {
                                            }
                                        },
                                        dataList: [
                                            {
                                                content: '页面顶部',
                                                value: '0',
                                                selected: true
                                            },
                                            {
                                                content: '查询列表中',
                                                value: '1',
                                            },
                                        ]
                                    },
                                }
                            },
                            hidden: true
                        },
                        //【7、关联页面】
                        {
                            title: '关联页面',
                            required: true,
                            config: {
                                type: 'custom',
                                name: 'viewId',
                                template: ' <select config="selectViewId" $-on:change="selectViewId" $-valid-switch="validSwitchs[6]"></select>',
                                scope: {
                                    selectViewId: {
                                        name: 'viewId',
                                        search: true,
                                        multiple: true,
                                        style: {
                                        },
                                        events: {
                                            change: function () {
                                            }
                                        },
                                        dataList: [
                                            //{
                                            //    content: '--请选择--',
                                            //    value: '-1',
                                            //},
                                        ]
                                    },
                                }
                            },
                            show: true
                        },
                        //【8、目标页面】
                        {
                            title: '目标页面',
                            required: true,
                            config: {
                                type: 'tree',
                                value:res.data.forwardVid,//组件的value,用于后台传值
                                name:'forwardVid',
                                $config:{
                                    showName:'',//展示出来的input的name属性
                                    showValue:res.data.forwardVid,//展示出来的input的value(用于修改formLayout的回显)
                                    treeConf:"",
                                    select:function (info,write) {
                                        info=info||{cname:'',id:''};
                                        write(info.cname,info.id);
                                    }
                                }
                            },
                            hidden:false
                        },
                        //【9、批量操作类型】
                        batchTypeHidden={
                            title: '批量操作类型',   //DELETE 批量删除、UPDATE 批量更新 、CUSTOM 自定义
                            required: false,
                            config: {
                                type: 'custom',
                                template: ' <select config="selectBatchType" $-on:change="selectBatchType"></select>',
                                scope: {
                                    selectBatchType: {
                                        name: 'batchType',
                                        //search:true,
                                        //multiple:true,
                                        style: {
                                        },
                                        events: {
                                            change: function () {
                                                var val = this.value;
                                                //1、提交地址
                                                var submitUrl = document.querySelector('input[name=submitUrl]').parentNode.parentNode;
                                                //2、批量操作视图
                                                var batchUpdateViewId = document.querySelector('input[name=batchUpdateViewId]').parentNode.parentNode;
                                                if (val == "DELETE") {
                                                    //提交地址
                                                    submitUrl.style.display = "none";
                                                    //批量操作视图
                                                    batchUpdateViewId.style.display = "none";
                                                } else if (val == "UPDATE") {
                                                    //提交地址
                                                    submitUrl.style.display = "none";
                                                    //批量操作视图
                                                    batchUpdateViewId.style.display = "flex";
                                                } else if (val == "CUSTOM") {
                                                    //提交地址
                                                    submitUrl.style.display = "flex";
                                                    //批量操作视图
                                                    batchUpdateViewId.style.display = "flex";
                                                }
                                            }
                                        },
                                        dataList: [
                                            {
                                                content: '批量删除',
                                                value: 'DELETE',
                                                selected: true
                                            },
                                            {
                                                content: '批量更新',
                                                value: 'UPDATE',
                                            }, {
                                                content: '自定义',
                                                value: 'CUSTOM',
                                            },
                                        ]
                                    },
                                }
                            },
                            hidden: true
                        },
                        //【10、批量操作视图】
                        batchUpdateViewIdHidden={
                            title: '批量操作视图',
                            required: false,
                            config: {
                                type: 'custom',
                                name: 'batchUpdateViewId',
                                template: ' <input type="text"  name="batchUpdateViewId"   $-bind:value="batchUpdateViewId" />',
                                scope: {
                                    batchUpdateViewId:res.data.batchUpdateViewId, //后台获取
                                }
                            },
                            hidden: true
                        },
                        //【11、提交类型】
                        submitTypeHidden={
                            title: '提交类型',   //0、新增 1、修改 2、自定义 3、批量删除 4、批量编辑
                            required: false,
                            config: {
                                type: 'custom',
                                name: 'submitType',
                                template: ' <select config="selectSubmitType" $-on:change="selectSubmitType"></select>',
                                scope: {
                                    selectSubmitType: {
                                        name: 'submitType',
                                        //search:true,
                                        //multiple:true,
                                        style: {
                                        },
                                        events: {
                                            change: function () {
                                                var val = this.value;
                                                //1、提交地址
                                                var submitUrl = document.querySelector('input[name=submitUrl]').parentNode.parentNode;
                                                if (val == 0 || val == 1) {
                                                    submitUrl.style.display = "none";
                                                } else if (val == 2) {
                                                    submitUrl.style.display = "flex";
                                                }
                                            }
                                        },
                                        dataList: [
                                            {
                                                isGroup: false,
                                                disabled: false,//是否不可以选择,默认false(即可选择)
                                                content: '新增',
                                                value: '0',
                                                selected: true
                                            },
                                            {
                                                isGroup: false,
                                                disabled: false,
                                                content: '修改',
                                                value: '1',
                                                selected: true
                                            }, {
                                                isGroup: false,
                                                disabled: false,
                                                content: '自定义',
                                                value: '2',
                                                selected: true
                                            },
                                        ]
                                    },
                                }
                            },
                            hidden: true
                        },
                        //【12、提交地址】
                        submitUrlHidden={
                            title: '提交地址',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="submitUrl" $-valid="submitUrl" $-valid-switch="validSwitchs[11]" $-bind:value="url">',
                                scope: {
                                    url:res.data.submitUrl, //后台获取
                                    submitUrl: resValid.submitUrl
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {},
                            hidden:true
                        },
                        //【13、状态】
                        {
                            title: '状态',
                            required: false,
                            class: 'clos-all',
                            config: {
                                type: 'custom',
                                name: 'status',
                                template: '<input type="radio" name="status" value="0" $-checked="status == \'0\'">启用<input type="radio" name="status" value="1" $-checked="status == \'1\'"  style="margin-left: 15px">非启用',
                                scope: {
                                    status:res.data.status//后台获取
                                }
                            }
                        },
                        //【14、描述】
                        {
                            title: '描述',
                            required: false,
                            class: 'clos-all',
                            config: {
                                type: 'custom',
                                name: 'description',
                                template: '<textarea name="description" cols="30" rows="20">'+res.data.description+'</textarea>',
                                scope: {}
                            }
                        },
                    ]
                }
            }.bind(this)).send();

        }.bind(this)).send({
            "id": rowId
        });
    }.bind(this));
});

//4、操作-模糊查询组件
model('moduleConfigOperationQuery',['$:@lib/publicData/fuzzyQueryOperationName'],function (fuzzyQueryOperationName) {
    var This = this,
        requestFlag = false,
        moduleConfigOperationApi;
    this.method('getOperationApi',function (api) {
        moduleConfigOperationApi = api;
    });
    this.method('getOperationQueryGrid', function (moduleConfigOperation,moduleConfigOperationApi) {
        //用户名称
        fuzzyQueryOperationName(This,function(fuzzyQueryOperationList){
            This.$model.fuzzyQueryData.list="";
            This.$model.fuzzyQueryData.list=fuzzyQueryOperationList;
        });
        this.$model = {
            fuzzyQueryData: {
                style: {   //自定义样式
                    width: '240px',//【必填】fuzzyQuery宽度
                },
                placeholder:'请输入操作名称',//文本框内提示
                id:'operationQuery',//当前操作的查询组件id,不填默认为fuzzyQueryID
                events:{
                    click:function (event) { //【必填项】按钮事件
                        //得到输入框节点
                        var getInput=this.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild;
                        //点击的值
                        getInput.value=this.innerText;
                        //点击的id
                        getInput.id=this.id;
                        //关闭模糊搜索到的列表
                        this.parentNode.innerHTML = "";
                        //模糊搜索数据
                        moduleConfigOperation.method('getKeyWordGrid', this.innerText);
                        //如果已经获取,则做刷新
                        requestFlag && moduleConfigOperationApi.get('update')();
                        requestFlag = true;
                    }
                },
                list: [{
                    name:'输入信息', //【必填项】名称
                    value:'-1', //【非必填项】键值
                },]
            }
        }
    });
});

//5、操作-grid组件
model('moduleConfigOperation', ['$:{PLUGINS}/modal/modal-confirm', ':moduleConfigOperationLayoutEdit'], function ($confirm, moduleConfigOperationLayoutEdit) {
    var This = this,
        moduleId='',//模块Id
        opKeyValue='',//关键字
        moduleConfigOperationApi,
        gridConfig = {
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            //"url": "http://paas.memobile.com.cn/gateway/custom/C04005",
            //网络请求的类型 如: POST | GET
            "method": "POST",
            //页面数据展示的条数
            "pageSize": 20,
            //页面可选展示的条数
            "pageSizeList": [10, 20, 30],
            //数据默认排序 [ asc | desc ]
            order: "desc",
            //排序的字段
            "orderField": "id",
            //数据请求时候发送的附带数据
            "sendData": {
                //"currentPage": 1,
                ////"operationFlag": 0, //操作类型  TODO:后台建丰说暂时写死为0，后期会改动
                //"sidx": "id",
                //"flag": 0,
            },
            //列表左边操作
            "leftColsModel": [
                {
                    name: '操作',
                    listConfig: function (data, rowData, index) {
                        var id = rowData.id;
                        //console.log(id,"操作id");
                        return {
                            template: '<span $-drop-menu="dropMenuConfig" class="iconfont icon-fenlei"></span>',
                            scope: {
                                dropMenuConfig: {
                                    config: {
                                        position: 'right'
                                    },
                                    list: [
                                        {
                                            content: '<span $-on:click="events.click">编辑</span>',
                                            scope: {
                                            },
                                            filter: {},
                                            events: {
                                                click: function () {
                                                    var moduleId = document.querySelector("#setModuleID").value;
                                                    moduleConfigOperationLayoutEdit.method('getModuleConfigOperation',id,moduleId);
                                                    var scope = {
                                                        EditFormData:$FRAME.$model(),
                                                        moduleConfigOperationLayoutEdit: moduleConfigOperationLayoutEdit
                                                    };
                                                    //编辑弹框
                                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                        var a;
                                                        dialog(a={
                                                            title: '编辑操作',//【必填项】dialog标题
                                                            content: '<form id="EditFormData" $-form="EditFormData"><form-layout config="moduleConfigOperationLayoutEdit"></form-layout></form>',
                                                            scope:scope,
                                                            maxmin:true,
                                                            zoom:'min',
                                                            filter:{},
                                                            width:'850px',//【非必填项】dialog宽，不填默认为640px
                                                            height:'560px;',//【非必填项】dialog高，不填默认为430px
                                                            btns:[
                                                                {
                                                                    name:'保存',
                                                                    trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作
                                                                        //判断是否是数组【列表下拉多选时候，数据处理】
                                                                        function isArray(field){
                                                                            if ($FRAME.lib.$type.getType(field) === 'array') {
                                                                                return field.join(',').toString();
                                                                            } else {
                                                                                return field;
                                                                            };
                                                                        };
                                                                        //表单校验,保存数据到数据库,局部刷新
                                                                        if(a.scope.EditFormData.valid()){
                                                                            var EditFormData= a.scope.EditFormData.getData(),
                                                                                saveFormServer = This.server({
                                                                                    serverType:'api',
                                                                                    method:'POST',
                                                                                    url:'editModuleConfigOperation'
                                                                                });
                                                                            saveFormServer.receive(function (res) {
                                                                                if (res.status == "200") {
                                                                                    //关闭弹窗
                                                                                    interface.close();
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('编辑成功！');
                                                                                    });
                                                                                    moduleConfigOperationApi.get('update')();
                                                                                } else {
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('编辑失败！');
                                                                                    });
                                                                                }
                                                                            }.bind(this)).send({
                                                                                "batchType": EditFormData.batchType ||"批量删除",//"UPDATE",
                                                                                "batchUpdateViewId":EditFormData.batchUpdateViewId ||1,// 1,
                                                                                "description":EditFormData.description ||"",// "description",
                                                                                "flushType": EditFormData.flushType ||"REDIRECT",//"REDIRECT",
                                                                                "followType": EditFormData.followType ||"",//"followType",
                                                                                "forwardVid": EditFormData.forwardVid ||1,//1,
                                                                                "id": id,
                                                                                "flag": 0,
                                                                                moduleId:moduleId,
                                                                                "operationName":EditFormData.operationName ||"",// "operationName",
                                                                                "operationPosition":EditFormData.operationPosition ||0,// 0,
                                                                                "ruleId": EditFormData.ruleId ||1,//1,
                                                                                "sort": EditFormData.sort ||1,//1,
                                                                                "submitDataType":EditFormData.submitDataType ||"ALL",// "ALL",
                                                                                "submitType":EditFormData.submitType ||1,// 1,
                                                                                "submitUrl":EditFormData.submitUrl ||"",// "url",
                                                                                "type":EditFormData.type ||2,// 2,
                                                                                "viewId": isArray(EditFormData.viewId) ||"",//",,141,,"
                                                                            });
                                                                        }else{
                                                                            //不关闭弹框
                                                                            return false;
                                                                        }
                                                                    },
                                                                },
                                                                {
                                                                    name:'取消',
                                                                    trigger:function (eve,interface) {
                                                                        interface.close();
                                                                    }
                                                                },
                                                            ],

                                                        })
                                                    });
                                                }
                                            }
                                        },
                                        {
                                            content: '<span $-on:click="events.click">删除</span>',
                                            scope: {
                                            },
                                            events: {
                                                click: function () {
                                                    $confirm({
                                                        title: '确认删除',
                                                        content: '确认删除?',
                                                        pass: function () {
                                                            var menuListServer = This.server({
                                                                serverType: 'api',//如果是访问接口,这里是api,其他的则是http
                                                                method: 'POST',
                                                                url: 'deleteOperation'
                                                            });
                                                            menuListServer.receive(function (res) {
                                                                if (res.status == "200") {
                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                        $message('删除成功！');
                                                                    });
                                                                    //更新列表
                                                                    moduleConfigOperationApi.get('update')();
                                                                } else {
                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                        $message('删除失败！');
                                                                    });
                                                                }
                                                            }.bind(this)).send({
                                                                "id": id
                                                            });
                                                        },
                                                        cancel: function () {
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            events: {}
                        }
                    }
                },
                {
                    //列表序号
                    name: '序号',
                    listConfig: function (data, rowData, index) {
                        return {
                            content: index + 1
                        }
                    }
                },
            ],
            //字段模型
            "colsModel": [
                {
                    //字段标题
                    name: "操作名称",
                    //字段key
                    field: "operationName",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                },
                {
                    //字段标题
                    name: "操作类型",
                    //字段key
                    field: "type",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    //type（操作类型）：1、新增 2、修改 3、删除 0、提交 4、明细查询 5、流程提交 6、数据导入 7、批量操作 8、新增关联模块数据 9、提交确认 10、数据导出
                    listConfig: function (data) {
                        switch(data)
                        {
                            case 0:
                                return {
                                    content: '提交'
                                }
                                break;
                            case 1:
                                return {
                                    content: '新增'
                                }
                                break;
                            case 2:
                                return {
                                    content: '修改'
                                }
                                break;
                            case 3:
                                return {
                                    content: '删除'
                                }
                                break;
                            case 4:
                                return {
                                    content: '明细查询'
                                }
                                break;
                            case 5:
                                return {
                                    content: '流程提交'
                                }
                                break;
                            case 6:
                                return {
                                    content: '数据导入'
                                }
                                break;
                            case 7:
                                return {
                                    content: '批量操作'
                                }
                                break;
                            case 8:
                                return {
                                    content: '新增关联模块数据'
                                }
                                break;
                            case 9:
                                return {
                                    content: '提交确认'
                                }
                                break;
                            case 10:
                                return {
                                    content: '数据导出'
                                }
                                break;
                            default:
                                return {
                                    content: ''
                                }
                        }
                    }
                }, {
                    //字段标题
                    name: "状态",
                    //字段key
                    field: "status",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center"
                },
                {
                    //字段标题
                    name: "操作描述",
                    //字段key
                    field: "description",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                },
                {
                    //字段标题
                    name: "创建时间",
                    //字段key
                    field: "createTime",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    listConfig: function (data) {

                        return {
                            template: '{{contentData|Date:[$,"yy-mm-dd"]}}',
                            scope: {
                                contentData: data
                            }
                        }
                    }
                }
            ],
            //行事件处理
            events: {
                click: function () {

                },
                hover: function () {

                },
                unHover: function () {

                },
                select: function () {

                },
                unSelect: function () {

                }
            },
            /**
             * 数据过滤
             * @param data
             * @param [callback]
             */
            filtration: function (data, callback) {
                $FRAME.server({
                    serverType:'api',
                    method: 'POST',
                    url: 'moduleConfigOperation'
                }).fail(function (res) {
                    callback({});
                }).success(function (resData) {
                    callback({
                        //获取的数据总条数
                        "dataCount": resData.totalRecord,
                        //获取的数据列表
                        "dataList":resData.record
                    })
                }).send({
                    currentPage: 1,
                    flag: 0,
                    opKeyValue: "",
                    moduleId:data.moduleId,
                    order:data.order,
                    sidx:data.orderField,
                    pageSize:data.pageSize,
                    pageNow:data.pageNow,
                });
            },
            /**
             * 数据初始化配置
             * @param resData
             * @param $interface
             */
            dataInitConf: function (gridListData, $interface) {
                //往开发作用域中存储列表数据
                $interface.developScope.gridListData = gridListData;
            }
        };

    this.method('getOperationApi',function (api) {
        moduleConfigOperationApi = api;
    });
    this.method('moduleConfigOperation', function (moduleId) {
        gridConfig.sendData.moduleId = moduleId;
        gridConfig.sendData.opKeyValue = "";
        This.$model || (This.$model = gridConfig);
    });
    //关键字刷新列表
    this.method('getKeyWordGrid', function (opKeyValue) {
        gridConfig.sendData.opKeyValue = opKeyValue;
        This.$model || (This.$model = gridConfig);
    });
});



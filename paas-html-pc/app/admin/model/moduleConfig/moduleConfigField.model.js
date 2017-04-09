//1、选择模块-下拉框
model('moduleConfig-select', ['@moduleConfig/moduleConfigView:moduleConfigView', '$:@lib/publicData/moduleConfig/querySingleModuleByModuleId'], function (moduleConfigView, querySingleModuleByModuleId) {
    var This = this;
    var requestFlag = false;
    var gridApi,moduleConfigViewApi,moduleConfigOperationApi;
    //字段
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    //视图
    this.method('getViewApi',function (api) {
        moduleConfigViewApi = api;
    });
    //操作
    this.method('getOperationApi',function (api) {
        moduleConfigOperationApi = api;
    });

    //第一个参数是字段grid的数据,第二个是视图grid的API,第三个是操作grid的API
    this.method('getSelectList', function (moduleConfigField, gridApi,moduleConfigView,moduleConfigViewApi,moduleConfigOperation,moduleConfigOperationApi) {
        var $moduleListServer = this.server({
            serverType: 'api',
            method: 'POST',
            url: 'moduleList'
        });
        //服务请求
        $moduleListServer.receive(function (res) {
            console.log(res, "模块信息");
            var moduleList = {
                name: 'moduleId',
                // search:true,
                //multiple:true,
                style: {
                    width: '160px',
                },
                events: {
                    change: function () {
                        console.log(this.value,"下拉框改变值获取当前ID");
                        //获取模块ID放到隐藏文本框中
                        document.querySelector("#setModuleID").value = this.value || 0;
                        //通过模块ID获取模块信息
                        querySingleModuleByModuleId(this.value, function (res) {
                            console.log(res, "通过模块ID获取模块信息");
                            //获取模块编码
                            document.querySelector("#setModuleID").name = res.data.moduleCode || "DEFAULT";
                        });

                        //把当前选中的模块ID传给字段grid
                        moduleConfigField.method('moduleConfigField', this.value);
                        //把当前选中的模块ID传给视图grid
                        moduleConfigView.method('moduleConfigView',this.value);
                        //把当前选中的模块ID传给操作grid
                        moduleConfigOperation.method('moduleConfigOperation',this.value);
                        //如果已经获取,则做刷新
                        $gridApi=gridApi.get();
                        $moduleConfigViewApi=moduleConfigViewApi.get();
                        $moduleConfigOperationApi=moduleConfigOperationApi.get();
                        $gridApi.update();
                        $moduleConfigViewApi.update();
                        $moduleConfigOperationApi.update();

                    },
                },
                dataList: [{
                    //content: '--请选择--',
                    //value: '-1',
                    //selected: true
                }]
            };
            var getFirstID=res.data[0].id,
                getFirstModuleCode=res.data[0].moduleCode,
                moduleId = $_GET['moduleId'],
                moduleCode = $_GET['moduleCode'];
            if(moduleId){
                //模块ID
                document.querySelector("#setModuleID").value=moduleId;
                //模块编码
                document.querySelector("#setModuleID").name=moduleCode;
            }else{
                //模块ID
                document.querySelector("#setModuleID").value=getFirstID;
                //模块编码
                document.querySelector("#setModuleID").name=getFirstModuleCode;
            }
            res.data.forEach(function (column) {
                if(moduleId){
                    if(moduleId==column.id){
                        moduleList.dataList.push({
                            content: column.moduleName,//模块名称
                            value: column.id,//模块ID
                            moduleCode: column.moduleCode,
                            selected: true
                        })
                    }else{
                        moduleList.dataList.push({
                            content: column.moduleName,//模块名称
                            value: column.id,//模块ID
                            moduleCode: column.moduleCode
                        })
                    }
                }else {
                    if(getFirstID==column.id){
                        moduleList.dataList.push({
                            content: column.moduleName,//模块名称
                            value: column.id,//模块ID
                            moduleCode: column.moduleCode,
                            selected: true
                        })
                    }else{
                        moduleList.dataList.push({
                            content: column.moduleName,//模块名称
                            value: column.id,//模块ID
                            moduleCode: column.moduleCode
                        })
                    }
                }
            });
            //console.log(JSON.stringify(moduleList));
            This.$model = moduleList;
        }.bind(this)).send({});

    });

});

//2、顶部tab导航栏(字段-视图-操作)
model('moduleConfig-tab', function () {
    this.$model = {
        style: {},
        isGroup: true,
        label: '模块配置',
        tabType: 'flip',//必填.左侧tab切换有两种方式(换页flip/定位location),如果是换页,tabType='flip'
        list: [
            {
                label: "字段",
                className: "active",
                events: {
                    mouseover: function () {
                        // console.log('啦啦啦');
                        // alert(666)
                    },
                }
            },
            {
                label: "视图",
                className: "",
                events: {}
            },
            {
                label: "操作",
                className: "",
                events: {}
            }
        ]
    }
});

//4.1、字段-新增按钮
model('moduleConfigFieldBtn', [':moduleConfigFieldLayoutAdd', ':singleMenuData'], function (moduleConfigFieldLayoutAdd, singleMenuData) {
    var This = this,
        gridApi;
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    this.$model = [{
        isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing: '20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName: 'moduleConfigFieldBtn',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
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
                    click: function (e) { //【必填项】按钮事件
                        //模块ID
                        var moduleId = document.querySelector("#setModuleID").value;
                        //模块编码
                        var moduleCode = document.querySelector("#setModuleID").name;
                        singleMenuData.method('getColumnTypeList', moduleConfigFieldLayoutAdd);
                        //var scope = {
                        //    moduleConfigFieldLayoutAdd: moduleConfigFieldLayoutAdd,
                        //    singleMenuData: singleMenuData
                        //};

                        //新增标签弹框
                        var scope = {
                            addFormData:$FRAME.$model(),
                            moduleConfigFieldLayoutAdd: moduleConfigFieldLayoutAdd,
                            singleMenuData: singleMenuData
                        };
                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增字段',//【必填项】dialog标题
                                content: '<div class="body-content-filed-template"><div class="template-left" style="width:25%;"><div class="singleMenu"><single-menu config="singleMenuData"></single-menu></div></div><div class="template-right"  style="width:75%;"><form id="addFormData" $-form="addFormData"><form-layout config="moduleConfigFieldLayoutAdd"></form-layout></form></div></div>',
                                scope:scope,
                                maxmin:true,
                                zoom:'min',
                                filter:{},
                                width:'850px',//【非必填项】dialog宽，不填默认为640px
                                height:'500px;',//【非必填项】dialog高，不填默认为430px
                                btns:[
                                    {
                                        name:'保存',
                                        trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作
                                            //表单校验,保存数据到数据库,局部刷新
                                            var addFormData = a.scope.addFormData.getData();
                                            //显示位置
                                            var displayPosition = addFormData.displayPosition;
                                            if (addFormData.displayPosition != undefined) {
                                                displayPosition = addFormData.displayPosition.join(',').toString();
                                            } else {
                                                displayPosition = addFormData.displayPosition;
                                            }
                                            //只读范围
                                            var readonlyScope;
                                            if (addFormData.readonlyScope != undefined) {
                                                readonlyScope = addFormData.readonlyScope.join(',').toString();
                                            } else {
                                                readonlyScope = addFormData.readonlyScope;
                                            }
                                            //表单校验,保存数据到数据库,局部刷新
                                            if (scope.addFormData.valid()) {
                                                var saveFormServer = This.server({
                                                    serverType: 'api',
                                                    method: 'POST',
                                                    url: 'addModuleConfigField'
                                                });
                                                saveFormServer.receive(function (res) {
                                                    if (res.status == "200") {
                                                        //关闭弹窗
                                                        interface.close();
                                                        //提示
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增成功！');
                                                        });
                                                        gridApi.get('update')();
                                                    } else {
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增失败！');
                                                        });
                                                    }
                                                }.bind(this)).send({
                                                    "column": {
                                                        "moduleCode": moduleCode || " ",  //【必填】     模块编码
                                                        "columnType": addFormData.columnType || "text",  //【必填】   字段类型
                                                        "columnCode": addFormData.columnCode || "",
                                                        "showColValSet": addFormData.showColValSet || "1",
                                                        "columnName": addFormData.columnName || "", //【必填】 字段名称
                                                        "moduleId": moduleId || 0, //【必填】   模块id
                                                        "maxLen": addFormData.maxLen || 10,
                                                        "minLen": addFormData.minLen || 2,
                                                        "colConstraint": addFormData.colConstraint || "",
                                                        "defaultVal": addFormData.defaultVal || "",
                                                        "displayPosition": displayPosition || "1",
                                                        "showType": addFormData.showType || "",
                                                        "showColValSet": addFormData.showColValSet || "1",
                                                        "fieldIptPrompt": addFormData.fieldIptPrompt || "",
                                                        "readonlyScope": readonlyScope || "1",
                                                        "colMark":addFormData.colMark || "normal",
                                                        "colAttrIsmodify": "1"//属性是否可修改：0/1 0 否 1 是
                                                    },
                                                    "moduleRelated": { //TODO：外键需要用到
                                                        "dataCode": "qwe", //【必填】
                                                        "relModuleId": 6, //【必填】 关联模块id
                                                        "moduleId": 1, //【必填】  模块ID
                                                        "moduleCode": "DD", //【必填】  模块编码
                                                        "relModuleCode": "fafdag", //【必填】  关联模块编码
                                                        "columnCode": "r897" //【必填】   字段编码
                                                    },


                                                    //-----------------------------------------------------------------------




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



                        //---------------old-------------------------------

                        ////新增弹框
                        //$dialog({
                        //    title: '新增字段',//【必填项】dialog标题
                        //    content: '',//【非必填项】dialog内容
                        //    passText: '保存',//【必填项】dialog按钮
                        //    cancelText: '取消',//【必填项】dialog按钮
                        //    width: '950px',//【非必填项】dialog宽，不填默认为640px
                        //    height: '560px;',//【非必填项】dialog高，不填默认为430px
                        //    template: '<div class="body-content-template"><div class="template-left" style="width:25%;"><single-menu config="singleMenuData"></single-menu></div><div class="template-right"  style="width:75%;"><form id="addFormData" $-form="addFormData"><form-layout config="moduleConfigFieldLayoutAdd"></form-layout></form></div></div>', //【必填项】dialog填充内容，需要与scope配合使用
                        //    scope: scope,
                        //    pass: function () { //【必填项】dialog通过需要进行的操作
                        //        var addFormData = scope.addFormData.getData();
                        //        //显示位置
                        //        var displayPosition = addFormData.displayPosition;
                        //        if (addFormData.displayPosition != undefined) {
                        //            displayPosition = addFormData.displayPosition.join(',').toString();
                        //        } else {
                        //            displayPosition = addFormData.displayPosition;
                        //        }
                        //        //只读范围
                        //        var readonlyScope;
                        //        if (addFormData.readonlyScope != undefined) {
                        //            readonlyScope = addFormData.readonlyScope.join(',').toString();
                        //        } else {
                        //            readonlyScope = addFormData.readonlyScope;
                        //        }
                        //
                        //
                        //        //表单校验,保存数据到数据库,局部刷新
                        //        if (scope.addFormData.valid()) {
                        //
                        //            var saveFormServer = This.server({
                        //                serverType: 'api',
                        //                method: 'POST',
                        //                url: 'addModuleConfigField'
                        //            });
                        //
                        //            saveFormServer.receive(function (res) {
                        //                //TODO:后期需要调用tip成功组件
                        //                console.log('新增结果', res, '调用tip成功组件');
                        //            }.bind(this)).send({
                        //                "column": {
                        //                    "moduleCode": moduleCode || " ",  //【必填】     模块编码
                        //                    "columnType": addFormData.columnType || "normal",  //【必填】   字段类型
                        //                    "columnCode": addFormData.columnCode || "",
                        //                    "showColValSet": addFormData.showColValSet || "1",
                        //                    "columnName": addFormData.columnName || "", //【必填】 字段名称
                        //                    "moduleId": moduleId || 0, //【必填】   模块id
                        //                    "maxLen": addFormData.maxLen || 10,
                        //                    "minLen": addFormData.minLen || 2,
                        //                    "colConstraint": addFormData.colConstraint || "",
                        //                    "defaultVal": addFormData.defaultVal || "",
                        //                    "displayPosition": displayPosition || "1",
                        //                    "showType": addFormData.showType || "",
                        //                    "showColValSet": addFormData.showColValSet || "1",
                        //                    "fieldIptPrompt": addFormData.fieldIptPrompt || "",
                        //                    "readonlyScope": readonlyScope || "1",
                        //                    "colAttrIsmodify": "1"//属性是否可修改：0/1 0 否 1 是
                        //                },
                        //                "moduleRelated": { //TODO：外键需要用到
                        //                    "dataCode": "qwe", //【必填】
                        //                    "relModuleId": 6, //【必填】 关联模块id
                        //                    "moduleId": 1, //【必填】  模块ID
                        //                    "moduleCode": "DD", //【必填】  模块编码
                        //                    "relModuleCode": "fafdag", //【必填】  关联模块编码
                        //                    "columnCode": "r897" //【必填】   字段编码
                        //                },
                        //            });
                        //        } else {
                        //            //不关闭弹框
                        //            return false;
                        //        }
                        //
                        //        //不关闭
                        //        return false;
                        //    },
                        //    cancel: function () {//【必填项】dialog不通过需要进行的操作
                        //    }
                        //});

                        //---------------old-------------------------------

                    }
                }
            },
        ]
    }]
});

//单层菜单组件
model('singleMenuData', function () {
    var This = this;
    //第一个参数
    this.method('getColumnTypeList', function (moduleConfigFieldLayoutAdd) {
        //请求字段类型数据
        var columnTypeServer = this.server({
            serverType: 'http',
            method: 'get',
            url: './serverData/list/columnType.data'
        });
        //拼接菜单组件数据
        var model = {
            style: {},
            button: [],
            isGroup: true,
            label: '单层菜单',
            list: []
        };
        model.select = function (data) {
            console.log(data.value, "****");
            moduleConfigFieldLayoutAdd.method('getColumnTypeData', data.value);
        };
        //将单层菜单的每一行数据加进来
        columnTypeServer.receive(function (res) {
            res.data.forEach(function (columnType) {
                model.list.push({
                    label: columnType.label,
                    className: columnType.className,
                    value: columnType.value,
                    events: {
                        click: function () {
                        }
                    }
                });
            });
            this.$model = model;
        }.bind(this)).send();
    });
});

//4.1.1、字段新增-form-layout

model('moduleConfigFieldLayoutAdd', ['$:@lib/publicData/moduleConfig/queryFieldConstraintSet','$:@lib/publicData/moduleConfig/showDicTreeConvert'],function (queryFieldConstraintSet,showDicTreeConvert) {
    var This = this;
    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'fieldValid',
        url: './serverData/config/form/fieldConfig.js'
    });

    this.method('getColumnTypeData', function (columnType) {
        var lowColumnType=columnType;
        var columnType=columnType.toUpperCase();
        validConfServer.receive(function (res) {

            switch (lowColumnType) {
                case "normal":
                    //约束
                    queryFieldConstraintSet(This,null,"",function (queryFieldConstraintSet) {
                        //console.log(queryFieldConstraintSet,"新增约束");
                        This.$model.list[5].config.scope.selectColConstraint = {};
                        This.$model.list[5].config.scope.selectColConstraint = queryFieldConstraintSet;
                    });
                    //普通输入（普通文本，多行文本）    NORMAL
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '只读范围',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                    scope: {},
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
                            {
                                title: '显示值类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowType" $-on:change="selectShowType" ></select>',
                                    scope: {
                                        selectShowType: {
                                            name: 'showType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '文本框',
                                                    value: '1',
                                                    selected: true
                                                },
                                                {
                                                    content: '多行文本框',
                                                    value: '5',
                                                },
                                                {
                                                    content: '单行长文本',
                                                    value: '50',
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {  //TODO:后台数据有问题
                                title: '约束',
                                class: 'clos-all',
                                required: true,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectColConstraint" $-on:change="selectColConstraint" ></select>',
                                    scope: {
                                        selectColConstraint: {
                                            name: 'colConstraint',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '可输入最大长度',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="maxLen" $-valid="maxLen">',
                                    scope: {
                                        maxLen: res.maxLen
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
                            {
                                title: '可输入最小长度',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="minLen" $-valid="minLen">',
                                    scope: {
                                        minLen: res.minLen
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
                            {
                                title: '默认存储值',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="defaultVal">',
                                    scope: {},
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
                            {
                                title: '是否唯一',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="radio" name="isUnique" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isUnique" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                    scope: {}
                                }
                            },
                            {
                                title: '隐藏类型',  //NORMAL NAME PHONE
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="radio" name="valHideType" value="NORMAL" checked ><span style="margin-left:8px;">不隐藏</span><input type="radio" name="valHideType" value="NAME"  style="margin-left: 15px"><span style="margin-left:8px;">名称格式</span><input type="radio" name="valHideType" value="PHONE"  ><span style="margin-left:8px;">手机格式</span><input type="radio" name="valHideType" value="TOTAL"  style="margin-left: 15px"><span style="margin-left:8px;">全部隐藏</span>',
                                    scope: {}
                                }
                            },
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"simditor":
                    //富文本框   simditor  SIMDITOR
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"date":
                    // 日期字段    date  DATE
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '只读范围',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                    scope: {},
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
                            {
                                title: '日期类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectDateType" $-on:change="selectDateType" ></select>',
                                    scope: {
                                        selectDateType: {
                                            name: 'dateType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '日期',
                                                    value: 'date',
                                                    selected: true
                                                },
                                                {
                                                    content: '时间',
                                                    value: 'time',
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '默认存储值',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="minLen">',
                                    scope: {},
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
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },

                        ]
                    }
                    break;
                case"foreignkey":
                    //外键   foreignkey  FOREIGNKEY
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '属性类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectColumnType" $-on:change="selectColumnType" ></select>',
                                    scope: {
                                        selectColumnType: {
                                            name: 'columnType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "varchar",
                                                    content: "字符串",
                                                    selected: true
                                                },
                                                {
                                                    value: "int",
                                                    content: "数字"
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '只读范围',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                    scope: {},
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
                            {  //TODO:后期需要动态获取数据
                                title: '约束',
                                class: 'clos-all',
                                required: true,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectColConstraint" $-on:change="selectColConstraint" ></select>',
                                    scope: {
                                        selectColConstraint: {
                                            name: 'colConstraint',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                                {
                                                    content: '不校验',
                                                    value: '1',
                                                },
                                                {
                                                    content: '邮箱',
                                                    value: '2',
                                                },
                                                {
                                                    content: '数字',
                                                    value: '3',
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {  //TODO:后期需要动态获取数据
                                title: '外键',
                                class: 'clos-all',
                                required: true,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectProvince" $-on:change="selectProvince" ></select>',
                                    scope: {
                                        selectProvince: {
                                            name: 'province',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                                {
                                                    content: '联系人',
                                                    value: '1',
                                                },
                                                {
                                                    content: '跟进',
                                                    value: '2',
                                                },
                                                {
                                                    content: '产品',
                                                    value: '3',
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {  //TODO:后期需要动态获取数据
                                title: '显示值',
                                class: 'clos-all',
                                required: true,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowProvince" $-on:change="selectShowProvince" ></select>',
                                    scope: {
                                        selectShowProvince: {
                                            name: 'showProvince',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                                {
                                                    content: 'id',
                                                    value: '1',
                                                },
                                                {
                                                    content: '创建时间',
                                                    value: '2',
                                                },
                                                {
                                                    content: '创建人',
                                                    value: '3',
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {  //TODO:后期需要动态获取数据
                                title: '关联页面',
                                class: 'clos-all',
                                required: true,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowViewId" $-on:change="selectShowViewId" ></select>',
                                    scope: {
                                        selectShowViewId: {
                                            name: 'showViewId',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                                {
                                                    content: 'id',
                                                    value: '1',
                                                },
                                                {
                                                    content: '查询列表',
                                                    value: '2',
                                                },
                                                {
                                                    content: '新增列表',
                                                    value: '3',
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {  //TODO:后期需要动态获取数据
                                title: '移动端关联页面',
                                class: 'clos-all',
                                required: true,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowMobileViewId" $-on:change="selectShowMobileViewId" ></select>',
                                    scope: {
                                        selectShowMobileViewId: {
                                            name: 'showMobileViewId',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '是否唯一',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="radio" name="isUnique" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isUnique" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                    scope: {}
                                }
                            },
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"dictionary":
                    ////点击选择字典
                    //showDicTreeConvert(1, "", function (showDicTreeConvert) {
                    //    This.$model.list[5].config.$config.treeConf = "";
                    //    This.$model.list[5].config.$config.treeConf = showDicTreeConvert;
                    //});
                    //字典   dictionary  DICTIONARY
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '只读范围',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                    scope: {},
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
                            {
                                title: '显示值类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowType" $-on:change="selectShowType" ></select>',
                                    scope: {
                                        selectShowType: {
                                            name: 'showType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "4",
                                                    content: "下拉框",
                                                    selected: true
                                                },
                                                {
                                                    value: "2",
                                                    content: "单选框",
                                                },
                                                {
                                                    value: "3",
                                                    content: "复选框",
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '点击选择字典',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="showDic"  readonly $-valid="showDic">',
                                    scope: {
                                        showDic: res.showDic
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
                            //{
                            //    title: '点击选择字典',
                            //    required: true,
                            //    config: {
                            //        type: 'tree',
                            //        name:'showDic',
                            //        $config:{
                            //            treeConf:"",
                            //            select:function (info,write) {
                            //                console.log(info,"====info====");
                            //                info=info||{orgName:'',orgCode:''};
                            //                write(info.orgName,info.orgCode);
                            //            }
                            //        }
                            //    },
                            //    hidden:false
                            //},
                            {
                                title: '是否唯一',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="radio" name="isUnique" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isUnique" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                    scope: {}
                                }
                            },
                            {
                                title: '默认存储值',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="defaultVal">',
                                    scope: {},
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
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"related":
                    //依赖关系   related   RELATED
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '属性类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectColumnType" $-on:change="selectColumnType" ></select>',
                                    scope: {
                                        selectColumnType: {
                                            name: 'columnType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "varchar",
                                                    content: "字符串",
                                                    selected: true
                                                },
                                                {
                                                    value: "datetime",
                                                    content: "日期",
                                                },
                                                {
                                                    value: "int",
                                                    content: "数字",
                                                },
                                                {
                                                    value: "decimal",
                                                    content: "浮点数字",
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '只读范围',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                    scope: {},
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
                            {
                                title: '显示值类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowType" $-on:change="selectShowType" ></select>',
                                    scope: {
                                        selectShowType: {
                                            name: 'showType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "1",
                                                    content: "文本框",
                                                    selected: true
                                                },
                                                {
                                                    value: "2",
                                                    content: "单选框",
                                                },
                                                {
                                                    value: "3",
                                                    content: "复选框",
                                                },
                                                {
                                                    value: "4",
                                                    content: "下拉框",
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            { //TODO：后期需要动态获取
                                title: '依赖表',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectRelyModuleId"  $-on:change="selectRelyModuleId" ></select>',
                                    scope: {
                                        selectRelyModuleId: {
                                            name: 'relyModuleId',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "1",
                                                    content: "订单",
                                                    selected: true
                                                },
                                            ]
                                        }
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
                            { //TODO：后期需要动态获取
                                title: '依赖表字段',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectRelyColumnId"  $-on:change="selectRelyColumnId" ></select>',
                                    scope: {
                                        selectRelyColumnId: {
                                            name: 'relyColumnId',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "1",
                                                    content: "id",
                                                    selected: true
                                                },
                                            ]
                                        }
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
                            {
                                title: '字段数据单位',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnUnit">',
                                    scope: {},
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
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"chosendata":
                    //数据选择   chosendata  CHOSENDATA
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '显示位置',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {  //TODO:后期需要动态获取数据
                                title: '选择数据模块',
                                class: 'clos-all',
                                required: false,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectModuleId" $-on:change="selectModuleId" ></select>',
                                    scope: {
                                        selectModuleId: {
                                            name: 'selectModuleId',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {  //TODO:后期需要动态获取数据
                                title: '选择数据视图',
                                class: 'clos-all',
                                required: false,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectViewId" $-on:change="selectViewId" ></select>',
                                    scope: {
                                        selectViewId: {
                                            name: 'selectViewId',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {  //TODO:后期需要动态获取数据
                                title: '选择数据移动端视图',
                                class: 'clos-all',
                                required: false,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectMobileSelectViewId" $-on:change="selectMobileSelectViewId" ></select>',
                                    scope: {
                                        selectMobileSelectViewId: {
                                            name: 'mobileSelectViewId',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {  //TODO:后期需要动态获取数据
                                title: '选择数据显示值字段',
                                class: 'clos-all',
                                required: false,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowColId" $-on:change="selectShowColId" ></select>',
                                    scope: {
                                        selectShowColId: {
                                            name: 'selectShowColId',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '是否可选择多条数据',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="radio" name="isMoreData" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isMoreData" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                    scope: {}
                                }
                            },
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"number":
                    //数字和浮点   number  NUMBER
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '属性类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectColumnType" $-on:change="selectColumnType" ></select>',
                                    scope: {
                                        selectColumnType: {
                                            name: 'columnType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "int",
                                                    content: "数字",
                                                    selected: true
                                                },
                                                {
                                                    value: "decimal",
                                                    content: "浮点数字",
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '只读范围',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                    scope: {},
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
                            {  //TODO:后期需要动态获取数据
                                title: '约束',
                                class: 'clos-all',
                                required: true,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectColConstraint" $-on:change="selectColConstraint" ></select>',
                                    scope: {
                                        selectColConstraint: {
                                            name: 'colConstraint',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                                {
                                                    content: '不校验',
                                                    value: '1',
                                                },
                                                {
                                                    content: '邮箱',
                                                    value: '2',
                                                },
                                                {
                                                    content: '数字',
                                                    value: '3',
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '可输入最大长度',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="maxLen" $-valid="maxLen">',
                                    scope: {
                                        maxLen: res.maxLen
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
                            {
                                title: '可输入最小长度',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="minLen" $-valid="minLen">',
                                    scope: {
                                        minLen: res.minLen
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
                            {
                                title: '默认存储值',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="defaultVal">',
                                    scope: {},
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
                            {
                                title: '字段数据单位',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnUnit">',
                                    scope: {},
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
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"money":
                    //金额  money  MONEY
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '属性类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectColumnType" $-on:change="selectColumnType" ></select>',
                                    scope: {
                                        selectColumnType: {
                                            name: 'columnType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "int",
                                                    content: "数字",
                                                    selected: true
                                                },
                                                {
                                                    value: "decimal",
                                                    content: "浮点数字",
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '只读范围',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                    scope: {},
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
                            {  //TODO:后期需要动态获取数据
                                title: '约束',
                                class: 'clos-all',
                                required: true,
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectColConstraint" $-on:change="selectColConstraint" ></select>',
                                    scope: {
                                        selectColConstraint: {
                                            name: 'colConstraint',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    content: '--请选择--',
                                                    value: '-1',
                                                    selected: true
                                                },
                                                {
                                                    content: '不校验',
                                                    value: '1',
                                                },
                                                {
                                                    content: '邮箱',
                                                    value: '2',
                                                },
                                                {
                                                    content: '数字',
                                                    value: '3',
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '可输入最大长度',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="maxLen" $-valid="maxLen">',
                                    scope: {
                                        maxLen: res.maxLen
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
                            {
                                title: '可输入最小长度',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="minLen" $-valid="minLen">',
                                    scope: {
                                        minLen: res.minLen
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
                            {
                                title: '默认存储值',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="defaultVal">',
                                    scope: {},
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
                            {
                                title: '字段数据单位',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnUnit">',
                                    scope: {},
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
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"upload":
                    //上传  upload  UPLOAD
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '显示位置',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '显示值类型',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowType" $-on:change="selectShowType" ></select>',
                                    scope: {
                                        selectShowType: {
                                            name: 'showType',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "8",
                                                    content: "文件上传",
                                                    selected: true
                                                },
                                                {
                                                    value: "9",
                                                    content: "图片上传",
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '支持多文件上传',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="radio" name="isMoreData" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isMoreData" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                    scope: {}
                                }
                            },
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },

                        ]
                    }
                    break;
                case"department":
                    //部门，人员  department  DEPARTMENT
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '显示位置',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '显示值来源',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<select  config="selectShowColValSet" $-on:change="selectShowColValSet" ></select>',
                                    scope: {
                                        selectShowColValSet: {
                                            name: 'showColValSet',
                                            //search:true,
                                            //multiple:true,
                                            style: {
                                            },
                                            events: {},
                                            dataList: [
                                                {
                                                    value: "3",
                                                    content: "选择部门",
                                                    selected: true
                                                },
                                                {
                                                    value: "4",
                                                    content: "选择人员",
                                                },
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                case"autocode":
                    //自动编码 autocode  AUTOCODE
                    This.$model = {
                        scope: {},
                        filter: {},
                        list: [
                            {
                                title: '字段名称',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnName" $-valid="columnName">',
                                    scope: {
                                        columnName: res.columnName
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
                            {
                                title: '字段编码',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="columnCode" $-valid="columnCode">',
                                    scope: {
                                        columnCode: res.columnCode
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
                            {
                                title: '显示位置',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                    scope: {
                                        iconClass: res.iconClass
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
                            {
                                title: '编码格式',
                                required: true,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="text" name="ruleCode" $-valid="ruleCode">',
                                    scope: {
                                        ruleCode: res.ruleCode
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
                            {
                                title: '描述',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                    scope: {}
                                }
                            },
                            {  //隐藏字段类型
                                title: '',
                                required: false,
                                class: 'clos-all',
                                config: {
                                    type: 'custom',
                                    template: '<input type="hidden" name="colMark" $-bind:value="columnType">',
                                    scope: {
                                        columnType: columnType
                                    },
                                },
                            },
                        ]
                    }
                    break;
                default:
                    break;
            }
        }.bind(this)).send();
    }.bind(this));
});


//4.1.2、字段编辑-form-layout
model('moduleConfigFieldLayoutEdit',  ['$:@lib/publicData/moduleConfig/queryFieldConstraintSet','$:@lib/publicData/moduleConfig/showDicTreeConvert'],function (queryFieldConstraintSet,showDicTreeConvert) {
    var This = this;
    This.$model = {};
    var menuServer = this.server({
        serverType: 'api',//如果是访问接口,这里是api,其他的则是http
        method: 'POST',
        url: 'getModuleConfigField'
    });
    this.method('getModuleConfigFieldData', function (rowId) {
        menuServer.receive(function (getRes, xhr) {
            console.log(getRes, "字段获取单条数据");
            //描述
            var description = getRes.data.description == null ? " " : getRes.data.description;
            //字段标识
            var colMark = getRes.data.colMark.toUpperCase();
            var validConfServer = this.server({
                serverType: 'jsonp',
                method: 'fieldValid',
                url: './serverData/config/form/fieldConfig.js'
            });

            console.log(colMark,"====colMark=====");
            validConfServer.receive(function (res) {
                switch (colMark) {
                    case "NORMAL":
                        //约束
                        var colConstraint=getRes.data.colConstraint;
                        console.log(colConstraint,"==约束colConstraint==");
                        //约束
                        queryFieldConstraintSet(This,null,colConstraint,function (queryFieldConstraintSet) {
                            console.log(queryFieldConstraintSet,"编辑约束");
                            This.$model.list[5].config.scope.selectColConstraint = {};
                            This.$model.list[5].config.scope.selectColConstraint = queryFieldConstraintSet;
                        });

                        //普通输入（普通文本，多行文本）  normal
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" $-checked="displayPosition == \'1\'" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" $-checked="displayPosition == \'2\'" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" $-checked="displayPosition == \'3\'" checked ><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4"  $-checked="displayPosition == \'4\'" checked ><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass,
                                            //displayPosition: getRes.data.displayPosition
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
                                {
                                    title: '只读范围',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="readonlyScope" value="1"  $-checked="readonlyScope1 == \'1\'"  checked ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" $-checked="readonlyScope1== \'2\'" checked ><span style="margin:0 1em">编辑界面</span>',
                                        scope: {
                                            readonlyScope: getRes.data.readonlyScope,
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
                                {
                                    title: '显示值类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowType" $-on:change="selectShowType"  ></select>',
                                        scope: {
                                            selectShowType: {
                                                name: 'showType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '文本框',
                                                        value: '1',
                                                        selected: true
                                                    },
                                                    {
                                                        content: '多行文本框',
                                                        value: '5',
                                                    },
                                                    {
                                                        content: '单行长文本',
                                                        value: '50',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '约束',
                                    class: 'clos-all',
                                    required: true,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectColConstraint" $-on:change="selectColConstraint" ></select>',
                                        scope: {
                                            selectColConstraint: {
                                                name: 'colConstraint',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                    {
                                                        content: '不校验',
                                                        value: '1',
                                                    },
                                                    {
                                                        content: '邮箱',
                                                        value: '2',
                                                    },
                                                    {
                                                        content: '数字',
                                                        value: '3',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '可输入最大长度',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="maxLen" $-valid="maxLen" $-bind:value="mLen">',
                                        scope: {
                                            maxLen: res.maxLen,
                                            mLen: getRes.data.maxLen
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
                                {
                                    title: '可输入最小长度',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="minLen" $-valid="minLen" $-bind:value="miLen">',
                                        scope: {
                                            minLen: res.minLen,
                                            miLen: getRes.data.minLen
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
                                {
                                    title: '默认存储值',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="defaultVal" $-bind:value="defaultVal">',
                                        scope: {
                                            defaultVal: getRes.data.defaultVal
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
                                {
                                    title: '是否唯一',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="radio" name="isUnique" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isUnique" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                        scope: {}
                                    }
                                },
                                {
                                    title: '隐藏类型',  //NORMAL NAME PHONE
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="radio" name="valHideType" value="NORMAL" checked ><span style="margin-left:8px;">不隐藏</span><input type="radio" name="valHideType" value="NAME"  style="margin-left: 15px"><span style="margin-left:8px;">名称格式</span><input type="radio" name="valHideType" value="PHONE"  ><span style="margin-left:8px;">手机格式</span><input type="radio" name="valHideType" value="TOTAL"  style="margin-left: 15px"><span style="margin-left:8px;">全部隐藏</span>',
                                        scope: {}
                                    }
                                },
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20">' + description + '</textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"SIMDITOR":
                        //富文本框   simditor
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" $-checked="displayPosition == \'1\'" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" $-checked="displayPosition == \'2\'" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" $-checked="displayPosition == \'3\'" checked ><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4"  $-checked="displayPosition == \'4\'" checked ><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass,
                                            //displayPosition: getRes.data.displayPosition
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
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"DATE":
                        // 日期字段    date
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass
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
                                {
                                    title: '只读范围',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                        scope: {},
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
                                {
                                    title: '日期类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectDateType" $-on:change="selectDateType" ></select>',
                                        scope: {
                                            selectDateType: {
                                                name: 'dateType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '日期',
                                                        value: 'date',
                                                        selected: true
                                                    },
                                                    {
                                                        content: '时间',
                                                        value: 'time',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '默认存储值',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="minLen">',
                                        scope: {},
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
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"FOREIGNKEY":
                        //外键   foreignkey
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '属性类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectColumnType" $-on:change="selectColumnType" ></select>',
                                        scope: {
                                            selectColumnType: {
                                                name: 'columnType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "varchar",
                                                        content: "字符串",
                                                        selected: true
                                                    },
                                                    {
                                                        value: "int",
                                                        content: "数字"
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass
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
                                {
                                    title: '只读范围',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                        scope: {},
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
                                {  //TODO:后期需要动态获取数据
                                    title: '约束',
                                    class: 'clos-all',
                                    required: true,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectColConstraint" $-on:change="selectColConstraint" ></select>',
                                        scope: {
                                            selectColConstraint: {
                                                name: 'colConstraint',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                    {
                                                        content: '不校验',
                                                        value: '1',
                                                    },
                                                    {
                                                        content: '邮箱',
                                                        value: '2',
                                                    },
                                                    {
                                                        content: '数字',
                                                        value: '3',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {  //TODO:后期需要动态获取数据
                                    title: '外键',
                                    class: 'clos-all',
                                    required: true,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectProvince" $-on:change="selectProvince" ></select>',
                                        scope: {
                                            selectProvince: {
                                                name: 'province',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                    {
                                                        content: '联系人',
                                                        value: '1',
                                                    },
                                                    {
                                                        content: '跟进',
                                                        value: '2',
                                                    },
                                                    {
                                                        content: '产品',
                                                        value: '3',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {  //TODO:后期需要动态获取数据
                                    title: '显示值',
                                    class: 'clos-all',
                                    required: true,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowProvince" $-on:change="selectShowProvince" ></select>',
                                        scope: {
                                            selectShowProvince: {
                                                name: 'showProvince',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                    {
                                                        content: 'id',
                                                        value: '1',
                                                    },
                                                    {
                                                        content: '创建时间',
                                                        value: '2',
                                                    },
                                                    {
                                                        content: '创建人',
                                                        value: '3',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {  //TODO:后期需要动态获取数据
                                    title: '关联页面',
                                    class: 'clos-all',
                                    required: true,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowViewId" $-on:change="selectShowViewId" ></select>',
                                        scope: {
                                            selectShowViewId: {
                                                name: 'showViewId',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                    {
                                                        content: 'id',
                                                        value: '1',
                                                    },
                                                    {
                                                        content: '查询列表',
                                                        value: '2',
                                                    },
                                                    {
                                                        content: '新增列表',
                                                        value: '3',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {  //TODO:后期需要动态获取数据
                                    title: '移动端关联页面',
                                    class: 'clos-all',
                                    required: true,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowMobileViewId" $-on:change="selectShowMobileViewId" ></select>',
                                        scope: {
                                            selectShowMobileViewId: {
                                                name: 'showMobileViewId',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '是否唯一',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="radio" name="isUnique" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isUnique" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                        scope: {}
                                    }
                                },
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"DICTIONARY":


                        //字典   dictionary
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" $-checked="displayPosition == \'1\'" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" $-checked="displayPosition == \'2\'" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" $-checked="displayPosition == \'3\'" checked ><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4"  $-checked="displayPosition == \'4\'" checked ><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass,
                                            //displayPosition: getRes.data.displayPosition
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
                                {
                                    title: '只读范围',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="readonlyScope" value="1"  $-checked="readonlyScope1 == \'1\'"  checked ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" $-checked="readonlyScope1== \'2\'" checked ><span style="margin:0 1em">编辑界面</span>',
                                        scope: {
                                            readonlyScope: getRes.data.readonlyScope,
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
                                {
                                    title: '显示值类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowType" $-on:change="selectShowType" ></select>',
                                        scope: {
                                            selectShowType: {
                                                name: 'showType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "4",
                                                        content: "下拉框",
                                                        selected: true
                                                    },
                                                    {
                                                        value: "2",
                                                        content: "单选框",
                                                    },
                                                    {
                                                        value: "3",
                                                        content: "复选框",
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                //{
                                //    title: '点击选择字典',
                                //    required: true,
                                //    class: 'clos-all',
                                //    config: {
                                //        type: 'custom',
                                //        template: '<input type="text" name="showDic"  readonly $-valid="showDic">',
                                //        scope: {
                                //            showDic: res.showDic
                                //        },
                                //        //需要给元素添加的指令
                                //        cmd: {
                                //            "$-bind:name": '',
                                //            "$-value": '',
                                //            "$-model": 'value'
                                //        }
                                //    },
                                //    //当前行需要添加的指令
                                //    cmd: {
                                //        "$-if": true
                                //    },
                                //    //当前行的作用域
                                //    scope: {
                                //        value: ''
                                //    },
                                //    //当前行的过滤器
                                //    filter: {}
                                //},

                                {
                                    title: '点击选择字典',
                                    required: true,
                                    config: {
                                        type: 'tree',
                                        name:'showDic',
                                        $config:{
                                            treeConf:"",
                                            select:function (info,write) {
                                                document.querySelector("#addOrgId").value=info.id;
                                                info=info||{orgName:'',orgCode:''};
                                                write(info.orgName,info.orgCode);
                                            }
                                        }
                                    },
                                    hidden:false
                                },


                                {
                                    title: '是否唯一',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="radio" name="isUnique" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isUnique" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                        scope: {}
                                    }
                                },
                                {
                                    title: '默认存储值',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="defaultVal">',
                                        scope: {},
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
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"RELATED":
                        //依赖关系   related
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '属性类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectColumnType" $-on:change="selectColumnType" ></select>',
                                        scope: {
                                            selectColumnType: {
                                                name: 'columnType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "varchar",
                                                        content: "字符串",
                                                        selected: true
                                                    },
                                                    {
                                                        value: "datetime",
                                                        content: "日期",
                                                    },
                                                    {
                                                        value: "int",
                                                        content: "数字",
                                                    },
                                                    {
                                                        value: "decimal",
                                                        content: "浮点数字",
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass
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
                                {
                                    title: '只读范围',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                        scope: {},
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
                                {
                                    title: '显示值类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowType" $-on:change="selectShowType" ></select>',
                                        scope: {
                                            selectShowType: {
                                                name: 'showType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "1",
                                                        content: "文本框",
                                                        selected: true
                                                    },
                                                    {
                                                        value: "2",
                                                        content: "单选框",
                                                    },
                                                    {
                                                        value: "3",
                                                        content: "复选框",
                                                    },
                                                    {
                                                        value: "4",
                                                        content: "下拉框",
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                { //TODO：后期需要动态获取
                                    title: '依赖表',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectRelyModuleId"  $-on:change="selectRelyModuleId" ></select>',
                                        scope: {
                                            selectRelyModuleId: {
                                                name: 'relyModuleId',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "1",
                                                        content: "订单",
                                                        selected: true
                                                    },
                                                ]
                                            }
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
                                { //TODO：后期需要动态获取
                                    title: '依赖表字段',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectRelyColumnId"  $-on:change="selectRelyColumnId" ></select>',
                                        scope: {
                                            selectRelyColumnId: {
                                                name: 'relyColumnId',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "1",
                                                        content: "id",
                                                        selected: true
                                                    },
                                                ]
                                            }
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
                                {
                                    title: '字段数据单位',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnUnit">',
                                        scope: {},
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
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"CHOSENDATA":
                        //数据选择   chosendata
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" $-checked="displayPosition == \'1\'" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" $-checked="displayPosition == \'2\'" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" $-checked="displayPosition == \'3\'" checked ><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4"  $-checked="displayPosition == \'4\'" checked ><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass,
                                            //displayPosition: getRes.data.displayPosition
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
                                {  //TODO:后期需要动态获取数据
                                    title: '选择数据模块',
                                    class: 'clos-all',
                                    required: false,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectModuleId" $-on:change="selectModuleId" ></select>',
                                        scope: {
                                            selectModuleId: {
                                                name: 'selectModuleId',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {  //TODO:后期需要动态获取数据
                                    title: '选择数据视图',
                                    class: 'clos-all',
                                    required: false,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectViewId" $-on:change="selectViewId" ></select>',
                                        scope: {
                                            selectViewId: {
                                                name: 'selectViewId',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {  //TODO:后期需要动态获取数据
                                    title: '选择数据移动端视图',
                                    class: 'clos-all',
                                    required: false,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectMobileSelectViewId" $-on:change="selectMobileSelectViewId" ></select>',
                                        scope: {
                                            selectMobileSelectViewId: {
                                                name: 'mobileSelectViewId',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {  //TODO:后期需要动态获取数据
                                    title: '选择数据显示值字段',
                                    class: 'clos-all',
                                    required: false,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowColId" $-on:change="selectShowColId" ></select>',
                                        scope: {
                                            selectShowColId: {
                                                name: 'selectShowColId',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '是否可选择多条数据',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="radio" name="isMoreData" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isMoreData" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                        scope: {}
                                    }
                                },
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"NUMBER":
                        //数字和浮点   number
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '属性类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectColumnType" $-on:change="selectColumnType" ></select>',
                                        scope: {
                                            selectColumnType: {
                                                name: 'columnType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "int",
                                                        content: "数字",
                                                        selected: true
                                                    },
                                                    {
                                                        value: "decimal",
                                                        content: "浮点数字",
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass
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
                                {
                                    title: '只读范围',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                        scope: {},
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
                                {  //TODO:后期需要动态获取数据
                                    title: '约束',
                                    class: 'clos-all',
                                    required: true,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectColConstraint" $-on:change="selectColConstraint" ></select>',
                                        scope: {
                                            selectColConstraint: {
                                                name: 'colConstraint',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                    {
                                                        content: '不校验',
                                                        value: '1',
                                                    },
                                                    {
                                                        content: '邮箱',
                                                        value: '2',
                                                    },
                                                    {
                                                        content: '数字',
                                                        value: '3',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '可输入最大长度',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="maxLen" $-valid="maxLen">',
                                        scope: {
                                            maxLen: res.maxLen
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
                                {
                                    title: '可输入最小长度',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="minLen" $-valid="minLen">',
                                        scope: {
                                            minLen: res.minLen
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
                                {
                                    title: '默认存储值',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="defaultVal">',
                                        scope: {},
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
                                {
                                    title: '字段数据单位',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnUnit">',
                                        scope: {},
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
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"MONEY":
                        //金额  money
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '属性类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectColumnType" $-on:change="selectColumnType" ></select>',
                                        scope: {
                                            selectColumnType: {
                                                name: 'columnType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "int",
                                                        content: "数字",
                                                        selected: true
                                                    },
                                                    {
                                                        value: "decimal",
                                                        content: "浮点数字",
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" checked><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4" checked><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass
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
                                {
                                    title: '只读范围',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="readonlyScope" value="1"  ><span style="margin:0 1em">新增界面</span><input type="checkbox" name="readonlyScope" value="2" ><span style="margin:0 1em">编辑界面</span>',
                                        scope: {},
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
                                {  //TODO:后期需要动态获取数据
                                    title: '约束',
                                    class: 'clos-all',
                                    required: true,
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectColConstraint" $-on:change="selectColConstraint" ></select>',
                                        scope: {
                                            selectColConstraint: {
                                                name: 'colConstraint',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        content: '--请选择--',
                                                        value: '-1',
                                                        selected: true
                                                    },
                                                    {
                                                        content: '不校验',
                                                        value: '1',
                                                    },
                                                    {
                                                        content: '邮箱',
                                                        value: '2',
                                                    },
                                                    {
                                                        content: '数字',
                                                        value: '3',
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '可输入最大长度',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="maxLen" $-valid="maxLen">',
                                        scope: {
                                            maxLen: res.maxLen
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
                                {
                                    title: '可输入最小长度',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="minLen" $-valid="minLen">',
                                        scope: {
                                            minLen: res.minLen
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
                                {
                                    title: '默认存储值',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="defaultVal">',
                                        scope: {},
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
                                {
                                    title: '字段数据单位',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnUnit">',
                                        scope: {},
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
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"UPLOAD":
                        //上传  upload
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" $-checked="displayPosition == \'1\'" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" $-checked="displayPosition == \'2\'" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" $-checked="displayPosition == \'3\'" checked ><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4"  $-checked="displayPosition == \'4\'" checked ><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass,
                                            //displayPosition: getRes.data.displayPosition
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
                                {
                                    title: '显示值类型',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowType" $-on:change="selectShowType" ></select>',
                                        scope: {
                                            selectShowType: {
                                                name: 'showType',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "8",
                                                        content: "文件上传",
                                                        selected: true
                                                    },
                                                    {
                                                        value: "9",
                                                        content: "图片上传",
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '支持多文件上传',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="radio" name="isMoreData" value="1" checked ><span style="margin-left:8px;">是</span><input type="radio" name="isMoreData" value="0"  style="margin-left: 15px"><span style="margin-left:8px;">否</span>',
                                        scope: {}
                                    }
                                },
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"DEPARTMENT":
                        //部门，人员  department
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" $-checked="displayPosition == \'1\'" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" $-checked="displayPosition == \'2\'" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" $-checked="displayPosition == \'3\'" checked ><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4"  $-checked="displayPosition == \'4\'" checked ><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass,
                                            //displayPosition: getRes.data.displayPosition
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
                                {
                                    title: '显示值来源',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<select  config="selectShowColValSet" $-on:change="selectShowColValSet" ></select>',
                                        scope: {
                                            selectShowColValSet: {
                                                name: 'showColValSet',
                                                //search:true,
                                                //multiple:true,
                                                style: {
                                                },
                                                events: {},
                                                dataList: [
                                                    {
                                                        value: "3",
                                                        content: "选择部门",
                                                        selected: true
                                                    },
                                                    {
                                                        value: "4",
                                                        content: "选择人员",
                                                    },
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    case"AUTOCODE":
                        //自动编码 autocode
                        This.$model = {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '字段名称',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnName" $-valid="columnName" $-bind:value="columnName">',
                                        scope: {
                                            columnName: res.columnName,
                                            columnName: getRes.data.columnName
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
                                {
                                    title: '字段编码',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="columnCode" $-valid="columnCode" $-bind:value="cCode"  readonly>',
                                        scope: {
                                            columnCode: res.columnCode,
                                            cCode: getRes.data.columnCode
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
                                {
                                    title: '显示位置',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="checkbox" name="displayPosition" value="1" $-checked="displayPosition == \'1\'" checked ><span style="margin:0 1em">查询界面</span><input type="checkbox" name="displayPosition" value="2" $-checked="displayPosition == \'2\'" checked><span style="margin:0 1em">新增页面</span><input type="checkbox" name="displayPosition" value="3" $-checked="displayPosition == \'3\'" checked ><span style="margin:0 1em">修改界面</span><input type="checkbox" name="displayPosition" value="4"  $-checked="displayPosition == \'4\'" checked ><span style="margin:0 1em">详情界面</span>',
                                        scope: {
                                            iconClass: res.iconClass,
                                            //displayPosition: getRes.data.displayPosition
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
                                {
                                    title: '编码格式',
                                    required: true,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="text" name="ruleCode" $-valid="ruleCode">',
                                        scope: {
                                            ruleCode: res.ruleCode
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
                                {
                                    title: '描述',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                                        scope: {}
                                    }
                                },
                                {  //隐藏字段类型
                                    title: '',
                                    required: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<input type="hidden" name="columnType" $-bind:value="columnType">',
                                        scope: {
                                            columnType: getRes.data.columnType
                                        },
                                    },
                                },
                            ]
                        }
                        break;
                    default:
                        break;
                }
            }.bind(this)).send();
        }.bind(this)).send({
            "columnId": rowId,
            "columnCode": "",
            "moduleCode": "",
            "phyColumnCode": "",
            "moduleId": null
        });
    }.bind(this));
});


//4.2、字段-模糊查询组件
model('moduleConfigFieldQuery',['$:@lib/publicData/fuzzyQueryFieldName'], function (fuzzyQueryFieldName) {
    var This = this,
        requestFlag = false,
        moduleConfigOperationApi;
    this.method('getOperationApi',function (api) {
        moduleConfigOperationApi = api;
    });
    this.method('getFieldQueryGrid', function (moduleConfigField,gridApi) {
        //字段名称
        fuzzyQueryFieldName(This,function(fuzzyQueryFieldList){
            This.$model.fuzzyQueryData.list="";
            This.$model.fuzzyQueryData.list=fuzzyQueryFieldList;
        });
        this.$model = {
            fuzzyQueryData: {
                style: {   //自定义样式
                    width: '240px',//【必填】fuzzyQuery宽度
                },
                placeholder:'请输入字段名称',//文本框内提示
                id:'fieldQuery',//当前操作的查询组件id,不填默认为fuzzyQueryID
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
                        moduleConfigField.method('getKeyWordGrid', this.innerText);
                        //如果已经获取,则做刷新
                        requestFlag && gridApi.get('update')();
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

//4.3、字段-grid组件
model('moduleConfigField', ['$:{PLUGINS}/modal/modal-confirm', ':moduleConfigFieldLayoutEdit'], function ($confirm, moduleConfigFieldLayoutEdit) {
    var This = this,
         moduleId='',//模块Id
        keyVal='',
        gridApi,
        gridConfig = {
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            //"url": "http://paas.memobile.com.cn/gateway/custom/C01002",
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
                //"sidx": "id",
                //"keyVal": "",
                //"moduleCode": ""
            },
            //列表左边操作
            "leftColsModel": [
                {
                    name: '操作',
                    listConfig: function (data, rowData, index) {
                        var id = rowData.id;
                        //console.log(id + "字段id");
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
                                                    //模块ID
                                                    var moduleId = document.querySelector("#setModuleID").value;
                                                    //模块编码
                                                    var moduleCode = document.querySelector("#setModuleID").name;
                                                    moduleConfigFieldLayoutEdit.method('getModuleConfigFieldData', id);
                                                    //var scope = {
                                                    //    moduleConfigFieldLayoutEdit: moduleConfigFieldLayoutEdit
                                                    //}
                                                    //编辑标签弹框
                                                    var scope = {
                                                        EditFormData:$FRAME.$model(),
                                                        moduleConfigFieldLayoutEdit: moduleConfigFieldLayoutEdit
                                                    };
                                                    //编辑弹框
                                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                        var a;
                                                        dialog(a={
                                                            title: '编辑操作',//【必填项】dialog标题
                                                            content: '<div style="margin-left:50px;"><form id="EditFormData" $-form="EditFormData"><form-layout config="moduleConfigFieldLayoutEdit"></form-layout></form></div>',
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
                                                                        var EditFormData = a.scope.EditFormData.getData();
                                                                        //显示位置
                                                                        var displayPosition;
                                                                        if (EditFormData.displayPosition != undefined) {
                                                                            displayPosition = EditFormData.displayPosition.join(',').toString();
                                                                        } else {
                                                                            displayPosition = EditFormData.displayPosition;
                                                                        }
                                                                        //只读范围
                                                                        var readonlyScope;
                                                                        if (EditFormData.readonlyScope != undefined) {
                                                                            readonlyScope = EditFormData.readonlyScope.join(',').toString();
                                                                        } else {
                                                                            readonlyScope = EditFormData.readonlyScope;
                                                                        }
                                                                        //表单校验,保存数据到数据库,局部刷新
                                                                        if (scope.EditFormData.valid()) {
                                                                            var saveFormServer = This.server({
                                                                                serverType: 'api',
                                                                                method: 'POST',
                                                                                url: 'editField'
                                                                            });
                                                                            saveFormServer.receive(function (res) {
                                                                                if (res.status == "200") {
                                                                                    //关闭弹窗
                                                                                    interface.close();
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('编辑成功！');
                                                                                    });
                                                                                    gridApi.get('update')();
                                                                                } else {
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('编辑失败！');
                                                                                    });
                                                                                }

                                                                            }.bind(this)).send({
                                                                                "id": id,
                                                                                "moduleId": moduleId || 0,
                                                                                "columnName": EditFormData.columnName || "",
                                                                                "columnCode": EditFormData.columnCode || "",
                                                                                "columnType": EditFormData.columnType || "",
                                                                                "maxLen": EditFormData.maxLen || 20,
                                                                                "minLen": EditFormData.minLen || 1,
                                                                                "colConstraint": EditFormData.colConstraint || 1,
                                                                                "defaultVal": EditFormData.defaultVal || "",
                                                                                "displayPosition": displayPosition || "1,2,3,4",
                                                                                "showType": EditFormData.showType || "",
                                                                                "description": EditFormData.description || "",
                                                                                "isSys": 0, //是否是系统字段 0、否 1、是
                                                                                "isRuleCode": 0, //是否自动编码 0、非自动编码 1、自动编码
                                                                                "isUnique": EditFormData.isUnique || 0,
                                                                                "colMark": "NORMAL",
                                                                                "moduleCode": moduleCode || "CUSTOMER"
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













                                                    //----------------old------------------------
                                                    // $dialog({
                                                    //     title: '编辑操作',//【必填项】dialog标题
                                                    //     content: "",//【非必填项】dialog内容
                                                    //     passText: '保存',//【必填项】dialog按钮
                                                    //     cancelText: '取消',//【必填项】dialog按钮
                                                    //     width: '700px',//【非必填项】dialog宽，不填默认为640px
                                                    //     height: '560px;',//【非必填项】dialog高，不填默认为430px
                                                    //     template: '<form id="EditFormData" $-form="EditFormData"><form-layout config="moduleConfigFieldLayoutEdit"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                                    //     scope: scope,
                                                    //     pass: function () { //【必填项】dialog通过需要进行的操作
                                                    //         var EditFormData = scope.EditFormData.getData();
                                                    //         //显示位置
                                                    //         var displayPosition;
                                                    //         if (EditFormData.displayPosition != undefined) {
                                                    //             displayPosition = EditFormData.displayPosition.join(',').toString();
                                                    //         } else {
                                                    //             displayPosition = EditFormData.displayPosition;
                                                    //         }
                                                    //         //只读范围
                                                    //         var readonlyScope;
                                                    //         if (EditFormData.readonlyScope != undefined) {
                                                    //             readonlyScope = EditFormData.readonlyScope.join(',').toString();
                                                    //         } else {
                                                    //             readonlyScope = EditFormData.readonlyScope;
                                                    //         }
                                                    //
                                                    //         //表单校验,保存数据到数据库,局部刷新
                                                    //         if (scope.EditFormData.valid()) {
                                                    //             var saveFormServer = This.server({
                                                    //                 serverType: 'api',
                                                    //                 method: 'POST',
                                                    //                 url: 'editField'
                                                    //             });
                                                    //             saveFormServer.receive(function (res) {
                                                    //                 //TODO:后期需要调用tip成功组件
                                                    //                 console.log('编辑结果', res, '调用tip成功组件');
                                                    //             }.bind(this)).send({
                                                    //                 "id": id,
                                                    //                 "moduleId": moduleId || 0,
                                                    //                 "columnName": EditFormData.columnName || "",
                                                    //                 "columnCode": EditFormData.columnCode || "",
                                                    //                 "columnType": EditFormData.columnType || "",
                                                    //                 "maxLen": EditFormData.maxLen || 20,
                                                    //                 "minLen": EditFormData.minLen || 1,
                                                    //                 "colConstraint": EditFormData.colConstraint || 1,
                                                    //                 "defaultVal": EditFormData.defaultVal || "",
                                                    //                 "displayPosition": displayPosition || "1,2,3,4",
                                                    //                 "showType": EditFormData.showType || "",
                                                    //                 "description": EditFormData.description || "",
                                                    //                 "isSys": 0, //是否是系统字段 0、否 1、是
                                                    //                 "isRuleCode": 0, //是否自动编码 0、非自动编码 1、自动编码
                                                    //                 "isUnique": EditFormData.isUnique || 0,
                                                    //                 "colMark": "NORMAL",
                                                    //                 "moduleCode": moduleCode || "CUSTOMER"
                                                    //             });
                                                    //         } else {
                                                    //             //不关闭弹框
                                                    //             return false;
                                                    //         }
                                                    //     },
                                                    //     cancel: function () {//【必填项】dialog不通过需要进行的操作
                                                    //     }
                                                    // });
                                                    //----------------old------------------------
                                                }
                                            }
                                        },
                                        {
                                            content: '<span $-on:click="events.click">删除</span>',
                                            scope: {
                                            },
                                            events: {
                                                click: function () {
                                                    console.log(id + "字段id");
                                                    $confirm({
                                                        title:'消息',
                                                        content:'确定删除此条数据？',
                                                        pass:function () {
                                                            var menuListServer = This.server({
                                                                serverType: 'api',//如果是访问接口,这里是api,其他的则是http
                                                                method: 'POST',
                                                                url: 'deleteField'
                                                            });
                                                            menuListServer.receive(function (res) {
                                                                if (res.status == "200") {
                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                        $message('删除成功！');
                                                                    });
                                                                    //更新列表
                                                                    gridApi.get('update')();
                                                                } else {
                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                        $message('系统字段，不可删除！');
                                                                    });
                                                                }
                                                            }.bind(this)).send({
                                                                "columnId": id
                                                            });
                                                        },
                                                        cancel:function () {
                                                        }
                                                    });





                                                    //----------------------------old----------------------
                                                    //$confirm({
                                                    //    title: '确认删除',
                                                    //    content: '确认删除?',
                                                    //    pass: function () {
                                                    //        var menuListServer = That.server({
                                                    //            serverType: 'api',//如果是访问接口,这里是api,其他的则是http
                                                    //            method: 'POST',
                                                    //            url: 'deleteField'
                                                    //        });
                                                    //        menuListServer.receive(function (res) {
                                                    //            //TODO:此处删除成功后需要刷新列表，给用户添加提示
                                                    //            console.log(res);
                                                    //        }.bind(this)).send({
                                                    //            "columnId": id
                                                    //        });
                                                    //    },
                                                    //    cancel: function () {
                                                    //    }
                                                    //})

                                                    //----------------------------old----------------------
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
                //{
                //    titleConfig:{
                //        template:'自定义',
                //        scope:{
                //
                //        },
                //        content:'',
                //        events:{
                //
                //        }
                //    },
                //    listConfig:function (data,rowData,index) {
                //        console.log(rowData.id);
                //        return {
                //            template:rowData.id,
                //            scope:{},
                //            content:'',
                //            events:{
                //
                //            }
                //        }
                //    }
                //}
            ],
            //字段模型
            "colsModel": [
                {
                    //字段标题
                    name: "字段名称",
                    //字段key
                    field: "columnName",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                },
                {
                    //字段标题
                    name: "物理字段名称",
                    //字段key
                    field: "phyColumnName",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center"
                },
                {
                    //字段标题
                    name: "描述",
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
                    url: 'moduleConfigField'
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
                    keyVal: "",
                    moduleCode: "",
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
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    this.method('moduleConfigField', function (moduleId) {
        console.log(moduleId,"下拉框改变数据，获取到moduleId");
        gridConfig.sendData.moduleId = moduleId;
        gridConfig.sendData.keyVal = "";
        This.$model || (This.$model = gridConfig);
    });

    //关键字刷新列表
    this.method('getKeyWordGrid', function (keyVal) {
        gridConfig.sendData.keyVal = keyVal;
        This.$model || (This.$model = gridConfig);
    });

});



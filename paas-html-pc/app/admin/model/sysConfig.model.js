/**
 * Created by 贝贝 on 2016/12/1.
 */
//1.系统字典

//字典列表(点击li时.把dictCode 传给grid组件去获取子字典; 传给新增按钮)
model('dictionaryList', ['$:@lib/array.remove',':dicEditFormLayout'], function ($remove,editFormLayoutModel) {
    var This = this,
        requestFlag = false,
        dicListServer = this.server({
            serverType: 'api',
            method: 'POST',
            url: 'dictionaryList'
        });


    //第一个参数是grid的数据,第二个是grid的API,第三个是新增按钮的receive
    this.method('getDictList', function (childDictList, gridApi, commConf) {

        var operationData = {};//存放行编辑删除按钮需要的数据--(当前行的数据)
        var model = {
            style: {},
            button: [
                {
                    //编辑按钮
                    label: 'edit',
                    icon: 'icon-xieyoujian',
                    events: {
                        click: function () {
                            //调用dialog框,请求当前字典的数据
                            editFormLayoutModel.method('getData', operationData.id);

                            //将scope作用域扩大,使得表单的保存按钮可用scope里的数据
                            var scope = {
                                editFormSource: $FRAME.$model(),
                                editFormLayout: editFormLayoutModel
                            };

                            // 修改弹框
                            $packages('{PLUGINS}/modal/modal-dialog', function (dialog) {
                                var a;
                                dialog(a = {
                                    title: '业务类型信息',//【必填项】dialog标题
                                    content: '<form id="form_dictAdd" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                    scope: scope,
                                    maxmin: true,
                                    zoom: 'min',
                                    filter: {},
                                    width: '700px',//【非必填项】dialog宽，不填默认为640px
                                    height: '560px;',//【非必填项】dialog高，不填默认为430px
                                    btns: [
                                        {
                                            name: '保存',
                                            trigger: function (eve, interface) { //【必填项】dialog通过需要进行的操作

                                                //表单校验
                                                if (a.scope.editFormSource.valid()) {
                                                    var editFormData = a.scope.editFormSource.getData();
                                                    //表单校验,保存数据到数据库
                                                    var editFormServer = This.server({
                                                        serverType: 'api',
                                                        method: 'POST',
                                                        url: 'editDict'//更新字典
                                                    });
                                                    // console.log('修改form的data',editFormData);
                                                    editFormServer.receive(function (res) {
                                                        console.log('修改成功', res);

                                                        if(res.status===200){
                                                            var editIndex = model.list.indexOf(operationData);
                                                            interface.close();
                                                            model.list[editIndex].label = res.data.dictName;
                                                        }
                                                    }.bind(this)).send({

                                                        "dictName": editFormData.dictName,
                                                        "dictCode": editFormData.dictCode,
                                                        "dictParentCode": operationData.dictParentCode,
                                                        "dictType": operationData.dictType,
                                                        "sort": operationData.sort,
                                                        "dictId": operationData.id,
                                                    })
                                                } else {
                                                    //校验不通过
                                                    alert('修改表单校验失败');
                                                    return false;
                                                }
                                            }
                                        },
                                        {
                                            name: '取消',
                                            trigger: function (eve, interface) {
                                                interface.close();
                                            }
                                        }
                                    ]
                                });
                            })


                        }
                    }
                },
                {
                    //删除按钮
                    label: 'delete',
                    icon: 'icon-shanchu',
                    events: {
                        click: function () {
                            //点击删除 , 调用弹框
                            $packages('{PLUGINS}/modal/modal-confirm', function (confirm) {
                                var a;
                                confirm({
                                    title:'删除系统字典',
                                    content:'确定删除此条数据？',
                                    pass:function () {
                                        //确认删除按钮
                                        var deleteServer = This.server({
                                            serverType: 'api',
                                            method: 'POST',
                                            url: 'deleteDict'//删除字典
                                        });
                                        deleteServer.receive(function (res) {
                                            console.log('删除成功', res);
                                            if(res.status === 200){

                                                //从列表里移除这条数据
                                                // $remove(model.list,operationData);
                                                model.list.splice(model.list.in(operationData),1);

                                            }

                                        }.bind(this)).send({
                                            "dictIds": [operationData.id],
                                        })
                                    },
                                    cancel:function () {
                                    }
                                })
                            })

                        }
                    }
                }
            ],
            isGroup: true,
            label: '单层菜单',
            list: []
        };

        model.select = function (dataInfo) {

            //把当前点击的字典的编码传给grid
            childDictList.method('getChildDictList', dataInfo.dictCode);

            //把当前点击的字典的code传给子字典的新增按钮
            commConf.write('dictId', dataInfo.id);
            commConf.write('dictCode', dataInfo.dictCode);

            //把当前点击的字典的id传给该字典的修改按钮,把id和code传给删除按钮
            operationData = dataInfo;

            //如果已经获取该模块视图,则做刷新===============================
            requestFlag && gridApi.get('update')();
            requestFlag = true;
        }

        dicListServer.receive(function (res) {
            res.data.forEach(function (liData) {
                model.list.push({
                    //将单层菜单的每一行数据加进来
                    label: liData.dictName,
                    className:'',
                    dictCode: liData.dictCode,
                    id: liData.id,
                    dictParentCode: liData.dictParentCode,
                    dictType:liData.dictType,
                    sort:liData.sort,
                    events: {
                        click: function () {

                        }
                    }
                });
            });

            this.$model = model;
        }.bind(this)).send({
            "isFindAll": 1,
            "dictType": "",
            "dictIdList": "",
            "ownParentFlag": "",
            "condition": ""
        });

    });
});

//子字典列表grid
model('childDictList', [':dicEditFormLayout','$:@lib/array.remove'], function (editFormLayoutModel,$remove) {
    var This = this,
        gridApi,
        gridConfig = {
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            // "url": "http://paas.memobile.com.cn/gateway/base/B03008",
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

            },
            //列表左边操作
            "leftColsModel": [
                //复选框
                {
                    titleConfig: function () {
                        //开发者专用作用域
                        var developScope = this.developScope;
                        //检查并设置初始值
                        developScope.isAllChecked = false;
                        developScope.masterChange = false;
                        developScope.allChecked = false;
                        //主选择框选择时间标识
                        developScope.allCheckedTime = Date.now();
                        developScope.allCheckedCount === undefined && (developScope.allCheckedCount = 0);
                        //记录所有被选中行的数据(该页面所需)
                        developScope.checkedListData = [];

                        return {
                            template: '<input type="checkbox" $-on:change="onChange" $-checked:false="developScope.allChecked">',
                            scope: {
                                developScope: developScope,
                                onChange: function () {
                                    if (this.checked) {
                                        developScope.isAllChecked = true;
                                        developScope.allChecked = true;
                                        developScope.allCheckedCount = developScope.gridListData.dataList.length;
                                        developScope.checkedListData = developScope.gridListData.dataList;
                                    } else {
                                        developScope.isAllChecked = false;
                                        developScope.allChecked = false;
                                        developScope.allCheckedCount = 0;
                                        developScope.checkedListData = [];
                                    }
                                    developScope.masterChange = true;
                                    developScope.allCheckedTime = Date.now()
                                }
                            },
                            filter: {
                                checkedHandle: function (isAllChecked) {
                                    developScope.masterChange = true;
                                    return isAllChecked
                                }
                            }
                        }
                    },
                    listConfig: function (data, rowData, index, gridListData) {
                        var developScope = this.developScope,
                            dataLen = gridListData.length,
                            isSelf = false,
                            scope = {
                                developScope: developScope,
                                onChange: function () {
                                    isSelf = true;

                                    developScope.allCheckedCount = this.checked ? developScope.allCheckedCount + 1 : developScope.allCheckedCount - 1;

                                    if (dataLen === developScope.allCheckedCount) {
                                        developScope.allChecked = true;
                                    } else {
                                        developScope.allChecked = false;
                                    }

                                    //记录所有被选中的行的数据
                                    if(this.checked){
                                        developScope.checkedListData.push(rowData);
                                    }else{
                                        //从数组中删除该行数据
                                        $remove(developScope.checkedListData,rowData);
                                    }

                                }
                            };

                        return {
                            template: '<input $-on:change="onChange" $-model="$isChecked" type="checkbox" $-checked:false="developScope.isAllChecked|checkedHandle:[$,developScope.allCheckedTime]">',
                            scope: scope,
                            filter: {
                                checkedHandle: function (isAllChecked) {

                                    var isChecked = false;

                                    if (!isSelf || developScope.masterChange) {
                                        isChecked = isAllChecked
                                    } else if (isSelf && isAllChecked) {
                                        isChecked = true;
                                    }

                                    isSelf = false;
                                    developScope.masterChange = false;

                                    return isChecked;

                                }
                            }
                        }
                    }
                },

                //操作
                {
                    name: '操作',
                    listConfig: function (data, rowData, index) {
                        var rowId = rowData.id;
                        return {
                            template: '<span $-drop-menu="dropMenuConfig" class="iconfont icon-fenlei"></span>',
                            scope: {
                                dropMenuConfig: {
                                    config: {
                                        position: 'right'
                                    },
                                    list: [
                                        {
                                            content: '<span>编辑</span>',
                                            scope: {

                                            },
                                            filter: {},
                                            events: {
                                                click: function (event) { //【必填项】按钮事件
                                                    //调用修改模块的模板(点击修改时,新增修改表单,调用修改表单模板)
                                                    // editFormLayoutModel.method('getSelectData',rowData.id);
                                                    editFormLayoutModel.method('getData', rowData.id);

                                                    //将scope作用域扩大,使得表单的保存按钮可用scope里的数据
                                                    var scope = {
                                                        editFormSource:$FRAME.$model(),
                                                        editFormLayout: editFormLayoutModel
                                                    };

                                                    // 修改弹框
                                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                        var a;
                                                        dialog(a={
                                                            title: '字典信息',//【必填项】dialog标题
                                                            content:'<form id="form_dictAdd" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                                            scope: scope,
                                                            maxmin:true,
                                                            zoom:'min',
                                                            filter:{},
                                                            width: '700px',//【非必填项】dialog宽，不填默认为640px
                                                            height: '560px;',//【非必填项】dialog高，不填默认为430px
                                                            btns:[
                                                                {
                                                                    name:'保存',
                                                                    trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作

                                                                        //表单校验
                                                                        if (a.scope.editFormSource.valid()) {
                                                                            var editFormData = a.scope.editFormSource.getData();
                                                                            //表单校验,保存数据到数据库
                                                                            var editFormServer = This.server({
                                                                                serverType: 'api',
                                                                                method: 'POST',
                                                                                url: 'editDict'//更新字典
                                                                            });
                                                                            editFormServer.receive(function (res) {
                                                                                if(res.status===200){
                                                                                    //消息提示
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('修改成功!');
                                                                                    });
                                                                                    interface.close();
                                                                                    gridApi.get('update')();
                                                                                }else{
                                                                                    //消息提示
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('修改失败!');
                                                                                    });
                                                                                }

                                                                            }.bind(this)).send({
                                                                                "dictName": editFormData.dictName,
                                                                                "dictCode": editFormData.dictCode,
                                                                                "dictParentCode": rowData.dictParentCode,
                                                                                "dictType": rowData.dictType,
                                                                                "sort": rowData.sort,
                                                                                "dictId": rowData.id,
                                                                                "userCode": rowData.userCode,
                                                                            })
                                                                        } else {
                                                                            //校验不通过
                                                                            return false;
                                                                        }


                                                                    }
                                                                },
                                                                {
                                                                    name:'取消',
                                                                    trigger:function (eve,interface) {
                                                                        interface.close();
                                                                    }
                                                                }
                                                            ]
                                                        });
                                                    })
                                                }
                                            }
                                        },
                                        {
                                            content: '<span>删除</span>',
                                            scope: {

                                            },
                                            events: {
                                                click: function () {
                                                    $packages('{PLUGINS}/modal/modal-confirm',function (confirm) {
                                                        confirm({
                                                            title:'消息',
                                                            content:'确定删除此条数据？',
                                                            pass:function () {
                                                                //确认删除按钮
                                                                var deleteServer = This.server({
                                                                    serverType: 'api',
                                                                    method: 'POST',
                                                                    url: 'deleteDict'//删除字典
                                                                });
                                                                deleteServer.receive(function (res) {
                                                                    if(res.status===200){
                                                                        //消息提示
                                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                            $message('删除成功!');
                                                                        });
                                                                        gridApi.get('update')();
                                                                    }else{
                                                                        //消息提示
                                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                            $message('删除失败!');
                                                                        });
                                                                    }

                                                                }.bind(This)).send({
                                                                    "dictIds": [rowData.id],
                                                                })
                                                            },
                                                            cancel:function () {
                                                            }
                                                        })
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

                //序号
                /* {
                 //列表序号
                 name: '序号',
                 listConfig: function (data, rowData, index) {
                 return {
                 content: index + 1
                 }
                 }
                 },*/

                // {
                //     titleConfig: {
                //         template: '自定义',
                //         scope: {},
                //         content: '',
                //         events: {}
                //     },
                //     listConfig: function (data, rowData, index) {
                //         return {
                //             template: index,
                //             scope: {},
                //             content: '',
                //             events: {}
                //         }
                //     }
                // }
            ],
            //字段模型
            "colsModel": [
                {
                    //字段标题
                    name: "字典名称",
                    //字段key
                    field: "dictName",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    //列表数据配置
                    listConfig: function (data, rowData, index) {
                        return {
                            template: '<p>{{content}}</p>',
                            scope: {
                                content: data
                            },
                            content: '',
                            events: {}
                        }
                    }
                },
                {
                    //字段标题
                    name: "字典编码",
                    //字段key
                    field: "dictCode",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    //列表数据配置
                    listConfig: function (data, rowData, index) {
                        return {
                            template: '<p>{{content}}</p>',
                            scope: {
                                content: data
                            },
                            content: '',
                            events: {}
                        }
                    }
                },
                /*{
                 name: "创建时间",
                 field: "createTime",
                 order: true,
                 align: "center",
                 listConfig: function (data) {
                 return {
                 template: '{{contentData|Date:[$,"yy-mm-dd"]}}',//过滤,时间戳转成日期
                 scope: {
                 contentData: data
                 }
                 }
                 }
                 },*/
                // {
                //     name: "状态",
                //     field: "CUSTOMER_S_S_SYNS_DNAME",
                //     align: "center"
                // }

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
                    url:"dictPagination"
                }).fail(function (res) {
                    callback({});
                }).success(function (resData) {
                    // console.log('data',resData);
                    callback({
                        //获取的数据总条数
                        "dataCount": resData.totalRecord,
                        //获取的数据列表
                        "dataList":resData.record
                    })
                }).send({
                    // isFindAll: 1,
                    dictType: data.dictType ||'',
                    currentPage: data.pageNow,
                    pageSize: data.pageSize,
                    sidx: data.orderField,
                    order: data.order

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

    this.method('getApi', function (api) {
        gridApi = api;
    });

    this.method('getChildDictList', function (dictParentCode) {
        gridConfig.sendData.dictType = dictParentCode;

        This.$model || (This.$model = gridConfig);
    });
});

//业务类型上的+按钮
model('typeBtn', [ ':dicAddFormLayout'], function (addFormLayoutModel) {
    var This = this;
    this.method('typeBtnEvent',function (dictListModel) {
        this.$model = {
            add: function () { //【必填项】按钮事件
                var scope = {
                    addFormSource:$FRAME.$model(),
                    addFormLayout: addFormLayoutModel,
                }
                //新增弹框
                $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                    var a ;
                    dialog(a={
                        title: '新增业务类型',//【必填项】dialog标题
                        content:'<form id="form_dictAdd" $-form="addFormSource"><form-layout config="addFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                        scope: scope,
                        maxmin:true,
                        zoom:'min',
                        filter:{},
                        width: '780px',//【非必填项】dialog宽，不填默认为640px
                        height: '560px;',//【非必填项】dialog高，不填默认为430px
                        btns:[
                            {
                                name:'保存',
                                trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作

                                    //表单校验
                                    if (a.scope.addFormSource.valid()) {
                                        var addFormData = a.scope.addFormSource.getData();
                                        // console.log('addForm', addFormData);
                                        //表单校验,保存数据到数据库
                                        var addFormServer = This.server({
                                            serverType: 'api',
                                            method: 'POST',
                                            url: 'addDict'//新增字典(单个)
                                        });
                                        addFormServer.receive(function (res) {
                                            console.log('新增成功', res);
                                            if(res.status === 200){
                                                var newDict = {
                                                    dictCode:res.data.dictCode,
                                                    dictParentCode:res.data.dictParentCode,
                                                    dictType:res.data.dictType,
                                                    events:dictListModel.list[0].events,
                                                    id:res.data.id,
                                                    label:res.data.dictName,
                                                    sort:res.data.sort
                                                }
                                                dictListModel.list.unshift(newDict);

                                                interface.close();
                                            }

                                        }.bind(this)).send({
                                            "dictName": addFormData.dictName,
                                            "dictCode": addFormData.dictCode,
                                            "dictParentCode": "0",
                                            "dictType": "",
                                            "sort": 0
                                        });
                                    } else {
                                        //校验不通过
                                        alert('新增表单校验失败');
                                        return false;
                                    }
                                }
                            },
                            {
                                name:'取消',
                                trigger:function (eve,interface) {
                                    interface.close();
                                }
                            }
                        ]
                    });
                });

            }
        }
    }.bind(this));

});

//新增,修改,删除按钮
model('dicBtnGroup', [':childDicAddFormLayout'], function (addFormLayoutModel) {
    var This = this,
        gridApi;
    this.method('getGridApi', function (api) {
        gridApi = api;
    });


    this.$model = [{
        isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing: '20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName: 'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            // padding:'50px',
            // 'margin-bottom':'30px'
        },
        list: [
            {
                class: 'btn btn-teal',//按钮样式
                icon: 'iconfont icon-jiahao', //图标
                label: '新增', //按钮文字
                align: 'left', //文字居左
                padding: '6px 14px',//按钮内边距，可以控制按钮大小
                events: {
                    click: function (event, receive) { //【必填项】按钮事件

                        var scope = {
                            addFormSource:$FRAME.$model(),
                            addFormLayout: addFormLayoutModel,
                        }
                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增字典',//【必填项】dialog标题
                                content: '<form id="form_dictAdd" $-form="addFormSource"><form-layout config="addFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                scope: scope,
                                maxmin:true,
                                zoom:'min',
                                filter:{},
                                width: '700px',//【非必填项】dialog宽，不填默认为640px
                                height: '560px;',//【非必填项】dialog高，不填默认为430px
                                btns:[
                                    {
                                        name:'保存',
                                        trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作

                                            //表单校验
                                            if (a.scope.addFormSource.valid()) {
                                                var addFormData = a.scope.addFormSource.getData();
                                                // console.log('addForm', addFormData);

                                                //把formLayout数据转换成json数据发送
                                                function sendConf(addFormData) {
                                                    var sendData = {
                                                        sysDictionarieList:[]
                                                    };

                                                    if($FRAME.lib.$type.getType(addFormData.dictName)==='array'){
                                                        addFormData.dictCode.forEach(function (dictCode) {
                                                            sendData.sysDictionarieList.push({
                                                                "dictCode": dictCode,
                                                                "dictParentCode":String(receive.dictId),
                                                                "dictType": receive.dictCode,
                                                                "sort": 0
                                                            })
                                                        });
                                                        addFormData.dictName.forEach(function (dictName, index) {
                                                            sendData.sysDictionarieList[index].dictName = dictName;
                                                        });
                                                    }else{
                                                        sendData.sysDictionarieList.push({
                                                            "dictCode": addFormData.dictCode,
                                                            "dictName":addFormData.dictName,
                                                            "dictParentCode":String(receive.dictId),
                                                            "dictType": receive.dictCode,
                                                            "sort": 0
                                                        })
                                                    }


                                                    return sendData;
                                                }

                                                var sendData = sendConf(addFormData);

                                                //表单校验,保存数据到数据库
                                                var addFormServer = This.server({
                                                    serverType: 'api',
                                                    method: 'POST',
                                                    url: 'addDictMultiple'//新增字典(多个)
                                                });
                                                addFormServer.receive(function (res) {
                                                    if(res.status===200){
                                                        interface.close();
                                                        //消息提示
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增成功!');
                                                        });
                                                        gridApi.get('update')();
                                                    }else {
                                                        //消息提示
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增失败!');
                                                        });
                                                    }

                                                }.bind(this)).send(sendData);
                                            } else {
                                                //校验不通过
                                                return false;
                                            }
                                        }
                                    },
                                    {
                                        name:'取消',
                                        trigger:function (eve,interface) {
                                            interface.close();
                                        }
                                    }
                                ]
                            });
                        });

                    }
                },
                iconEvents: {
                    click: function (event) {
                        //停止事件冒泡
                        // event.stopPropagation();
                        // console.log(this,this.innerHTML,event)
                        // alert(this);
                    }
                }
            },
            /*{
                class: 'btn btn-teal-outline',//按钮样式
                icon: '', //图标
                label: '编辑',//按钮文字
                align: 'center',//文字居中
                padding: '6px 14px',//按钮内边距，可以控制按钮大小
                events: {
                    click: function (event,receive) {
                        // console.log(this,this.innerHTML,event)
                    }
                }
            },*/
            {
                class: 'btn btn-teal-outline',//按钮样式
                icon: '', //图标
                label: '删除',//按钮文字
                align: 'center',//文字居中
                padding: '6px 14px',//按钮内边距，可以控制按钮大小
                events: {
                    click: function (event) {
                        var idList=[],
                            checkedList = gridApi.getInnerApi().developScope.checkedListData;
                        checkedList.forEach(function (rowData) {
                            idList.push(rowData.id);
                        });
                        // console.log('选中的行的数据',idList,gridApi.getInnerApi().developScope.checkedListData);
                        $packages('{PLUGINS}/modal/modal-confirm',function (confirm) {
                            confirm({
                                title: '删除字典',
                                content: '确认删除?',
                                pass:function () {
                                    //确认删除按钮
                                    var deleteServer = This.server({
                                        serverType: 'api',
                                        method: 'POST',
                                        url: 'deleteDict'//删除字典
                                    });
                                    deleteServer.receive(function (res) {
                                        if(res.status===200){
                                            //消息提示
                                            $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                $message('批量删除成功!');
                                            });
                                            gridApi.update();
                                        }else{
                                            //消息提示
                                            $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                $message('批量删除失败!');
                                            });
                                        }

                                    }.bind(This)).send({
                                        "dictIds": idList,
                                    })

                                },
                                cancel:function () {

                                }
                            })
                        })
                    }
                }
            },
        ]
    }]
});

//新增字典formLayout(父字典新增--单个)
model('dicAddFormLayout', function () {
    var This = this;
    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'moduleValid',
        url: './serverData/config/form/validConfig.js'
    }).receive(function (res) {
        This.$model = {
            list: [
                {
                    title: '业务类型名称',
                    required: true,
                    // class: 'clos-all',
                    // "$-show":showList[0],
                    config: {
                        type: 'custom',
                        template: '<input type="text" name="dictName" $-valid="validDictName">',
                        scope: {
                            validDictName: res.dictName
                        },
                        cmd: {
                            "$-bind:name": '',
                            "$-value": '',
                        }
                    }
                },
                {
                    title: '业务类型编码',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<input type="text" name="dictCode" $-valid="validDictCode">',
                        scope: {
                            validDictCode: res.dictCode,
                        },
                        cmd: {
                            "$-bind:name": '',
                            "$-value": '',
                        }
                    }
                },
            ]
        }
    }.bind(this)).send();
});

//批量新增字典formLayout(子字典新增--多个)
model('childDicAddFormLayout', ':childDictAddBatch', function (childDictAddBatchModel) {
    var This = this;

    This.$model = {
        list: [
            {
                title: '',
                // class:'clos-all',
                config: {
                    type: 'custom',
                    template: '<batch-condition config="batchCondition"></batch-condition>',
                    scope: {
                        batchCondition: childDictAddBatchModel
                    }
                }
            }
        ]
    }

});

//新增子字典组件的model
model('childDictAddBatch', function () {
    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'moduleValid',
        url: './serverData/config/form/validConfig.js'
    }).receive(function (res) {
        this.$model = {
            style: {
                "margin-left": '-50px'
            },
            list: [
                /*{
                 title:'查询字段',
                 config:{
                 template:'<select  config="queryField"></select> ',
                 scope:{
                 queryField:{
                 name:'queryField',
                 style:{
                 width:'160px',
                 border:'solid 1px #E5EBF4'
                 },
                 dataList:[
                 {
                 content:'名称',
                 value:'1',
                 selected:true
                 },
                 {
                 content:'创建时间',
                 value:'2',
                 },
                 {
                 content:'创建人',
                 value:'3',
                 },
                 ]
                 }
                 }
                 }
                 },
                 {
                 title:'查询条件',
                 config:{
                 template:'<select  config="queryCondition"></select> ',
                 scope:{
                 queryCondition:{
                 name:'queryCondition',
                 style:{
                 width:'160px',
                 border:'solid 1px #E5EBF4'
                 },
                 dataList:[
                 {
                 content:'大于',
                 value:'1',
                 selected:true
                 },
                 {
                 content:'小于',
                 value:'2',
                 },
                 {
                 content:'等于',
                 value:'3',
                 },
                 ]
                 }
                 }
                 }
                 },*/
                {
                    title: '字典名称',
                    required: true,
                    config: {
                        template: '<input name="dictName"  type="text" $-valid="validDictName" style="height:30px;line-height:30px;" class="contentText"/>',
                        scope: {
                            validDictName: res.dictName
                        }
                    }
                },
                {
                    title: '字典编码',
                    required: true,
                    config: {
                        template: '<input name="dictCode"  type="text" $-valid="validDictCode" style="height:30px;line-height:30px;" class="contentText"/>',
                        scope: {
                            validDictCode: res.dictCode
                        }
                    }
                },
            ]
        }
    }.bind(this)).send();
});

//修改字典formLayout
model('dicEditFormLayout', function () {
    var This = this;
    this.method('getData', function (rowId) {
        var editData = {};
        var menuServer = this.server({
            serverType: 'api',//如果是访问接口,这里是api,其他的则是http
            method: 'POST',
            url: 'dictDetail'//查询字典详情
        }).receive(function (res, xhr) {
            editData.dictName = res.data.dictionary.dictName;//字典名称
            editData.dictCode = res.data.dictionary.dictCode;//字典编码

            //请求表单校验信息
            var validConfServer = This.server({
                serverType: 'jsonp',
                method: 'moduleValid',
                url: './serverData/config/form/validConfig.js'
            });
            validConfServer.receive(function (resValid) {
                This.$model = {
                    filter: {},
                    list: [
                        {
                            title: '字典名称',
                            required: true,
                            class: '',
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="dictName" $-valid="validDictName" $-bind:value="editDictName">',
                                scope: {
                                    validDictName: resValid.dictName,
                                    editDictName: editData.dictName
                                },
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                }
                            }
                        },
                        {
                            title: '字典编码',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="dictCode" $-valid="validDictCode" $-bind:value="editDictCode" readonly>',
                                scope: {
                                    validDictCode: resValid.dictCode,
                                    editDictCode: editData.dictCode
                                },
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                }
                            }
                        }
                    ]
                }
            }.bind(This)).send();

        }.bind(this)).send({
            "entCode": "SYSTEM",
            "id": rowId
        });
    });
});


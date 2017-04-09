/**
 * Created by 贝贝 on 2016/12/20.
 */
//操作条件配置
//tree的model
model('treeConf',['$:@lib/treeConvert'],function ($treeConvert){
    var This = this,
        requestFlag=false;

    //第一个参数是grid的数据,第二个是grid的API,第三个是新增按钮的receive
    this.method('getTreeList',function (operatConditionsData,gridApi,commConf) {
        var treeConfServer = This.server({
            serverType:'api',
            method:'POST',
            url:'viewTree'//查询视图树
        }).receive(function (res) {

            This.$model = {
                actions:{
                    click:function () {
                        // console.log(arguments,"///",arguments[1]);
                        if(arguments[1].PID!=0){
                            //调用操作条件列表的获取操作条件方法,把当前视图的id和模块的id传过去
                            operatConditionsData.method('getOperatConditions',{viewId:arguments[1].ID,moduleId:arguments[1].PID});

                            //新增按钮的receive()
                            commConf.write('viewData',{viewId:arguments[1].ID,moduleId:arguments[1].PID});

                            //如果已经获取子字典,则做刷新===============================
                            requestFlag && gridApi.get('update')();
                            requestFlag=true;
                        }
                    },
                    select:function () {

                    },
                    unselect:function () {

                    },
                    selectChange:function () {

                    }
                },
                list:$treeConvert(res.data)
            };
        }.bind(This)).send();
    })

});

//新增按钮
model('operatConditionsBtnGroup',[':operatConditionsAddFormLayout','$:@lib/configSendData/operatConditionsFormLayout'],function (addFormLayoutModel,$sendData) {
    var This = this,
        gridApi;

    this.method('getGridApi',function (api) {
        gridApi = api;
    });

    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            // padding:'50px',
            // 'margin-bottom':'30px'
        },
        list:[
            {
                class:'btn btn-teal',//按钮样式
                icon:'iconfont icon-jiahao', //图标
                label:'新增', //按钮文字
                align:'left', //文字居左
                padding:'6px 14px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event,receive) { //【必填项】按钮事件

                        if(receive!=null){
                            var scope = {
                                addFormSource:$FRAME.$model(),
                                addFormLayout:addFormLayoutModel,
                            }

                            //把viewId传给下拉框的model
                            addFormLayoutModel.method('getSelectData',receive.viewData);

                            //新增弹框
                            $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                var a;
                                dialog(a={
                                    title: '新增操作条件',//【必填项】dialog标题
                                    content: '<form id="form_operatConditionsAdd" $-form="addFormSource"><form-layout config="addFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                    scope:scope,
                                    maxmin:true,
                                    zoom:'min',
                                    filter:{},
                                    width:'700px',//【非必填项】dialog宽，不填默认为640px
                                    height:'560px;',//【非必填项】dialog高，不填默认为430px
                                    btns:[
                                        {
                                            name:'保存',
                                            trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作

                                                    //表单校验
                                                    // if(scope.addFormSource.valid()){
                                                    var addFormData = a.scope.addFormSource.getData();
                                                    // console.log('新增数据',addFormData,$sendData("viewId",receive.viewData.viewId,addFormData));

                                                    //表单校验,保存数据到数据库
                                                    var addFormServer = This.server({
                                                        serverType:'api',
                                                        method:'POST',
                                                        url:'addOperatConditions'//新增操作条件
                                                    });
                                                    addFormServer.receive(function (res) {
                                                        if(res.status===200){
                                                            interface.close();
                                                            //消息提示
                                                            $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                $message('新增成功!');
                                                            });
                                                            gridApi.get('update')();
                                                        }else{
                                                            //消息提示
                                                            $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                $message('新增失败!');
                                                            });
                                                        }

                                                    }.bind(this)).send($sendData("viewId",receive.viewData.viewId,addFormData));
                                                    // }else{
                                                    //     //校验不通过
                                                    //     alert('新增表单校验失败');
                                                    //     return false;
                                                    // }

                                            },
                                        },
                                        {
                                            name:'取消',
                                            trigger:function (eve,interface) {
                                                interface.close();
                                            }
                                        }
                                    ],

                                });
                            });
                        }else{
                            $packages('{PLUGINS}/modal/modal-confirm',function (confirm) {
                                confirm({
                                    title:'提示',
                                    content:'请选择左侧视图',
                                    pass:function () {
                                    },
                                    cancel:function () {
                                    }
                                })
                            });
                        }

                    }
                },
                iconEvents:{
                    click:function (event) {
                        //停止事件冒泡
                        // event.stopPropagation();
                        // console.log(this,this.innerHTML,event)
                        // alert(this);
                    }
                }
            },
            /*{
                class:'btn btn-teal-outline',//按钮样式
                icon:'', //图标
                label:'编辑',//按钮文字
                align:'center',//文字居中
                padding:'6px 14px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        // console.log(this,this.innerHTML,event)
                    }
                }
            },
            {
                class:'btn btn-teal-outline',//按钮样式
                icon:'', //图标
                label:'删除',//按钮文字
                align:'center',//文字居中
                padding:'6px 14px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            },*/
        ]
    }]
});

//操作条件新增formLayout
model('operatConditionsAddFormLayout', ['$:@lib/configData/operatConditionsAddFormLayout',':affectOperations',':sourceColumn'],function ($addFormLayout,affectOperations,sourceColumn) {

    //点击新增按钮时调用该方法,将id传给下拉框
    this.method('getSelectData',function (selectData) {
        console.log('新增选中',selectData);
        affectOperations.method('getListData',selectData,"");
        sourceColumn.method('getListData',selectData.viewId,"");
    });

    this.$model = $addFormLayout(affectOperations,sourceColumn,this);


});

//影响操作下拉框数据(多选下拉框)(请求的是视图包含的字段)
model('affectOperations',function(){
    var This = this;

    /*selected--被选中的项
     如果是新增,selected="";
     如果是修改,selected="被选中着的id1,被选中的id2,...";
     */
    this.method('getListData',function (ids,selected) {
        var selectServer = this.server({
            serverType:'api',
            method:'POST',
            url:'viewOperations'//查询操作集合
        }).receive(function (res) {

            var model={
                name:'affectOperations',
                search:true,
                // multiple:true,
                style:{
                    // width:'100%',
                },
                dataList:[]
            };

            //如果selected="",为新增,不做选中处理
            if(selected==""){
                res.data.forEach(function (operation) {
                    model.dataList.push({
                        content:operation.operationName,//操作名称
                        value:operation.id,//字段id
                    })
                });
            }else{
                //如果是修改,做选中处理
                res.data.forEach(function (operation) {
                    var a={
                        content:operation.operationName,//操作名称
                        value:operation.id,//字段id
                    };
                    if(operation.id==selected){
                        a.selected = true;
                    }else{
                        a.selected = false;
                    }
                    model.dataList.push(a);
                });
            }

            This.$model = model;

        }.bind(this)).send({
            "operationFlag":0,
            "moduleId":ids.moduleId,
            "viewId":ids.viewId,
            "operationPosition":1,
            "isPermission":false

        })
    })

});

//字段下拉框数据(单选下拉框)(请求的是模块包含的字段)
model('sourceColumn',function(){
    var This = this;

    /*selected--被选中的项
     如果是新增,selected="";
     如果是修改,selected="被选中着的id1,被选中的id2,...";
     */
    this.method('getListData',function (viewId,selected) {
        var selectServer = this.server({
            serverType:'api',
            method:'POST',
            url:'viewContainsFields'//(根据视图id查询视图包含字段)
        }).receive(function (res) {

            var model={
                name:'sourceColumnIds',
                // search:true,
                // multiple:true,
                style:{
                    // width:'100%'
                },
                dataList:[]
            };

            //如果selected="",为新增,不做选中处理
            if(selected==""){
                res.data.forEach(function (column) {
                    //如果这条下拉数据有下一级,处理
                    if(column.list&&column.list.length>0){
                        var datas = {
                            isGroup:true,
                            label:column.name,
                            list:[]
                        }
                        //遍历这条数据的下一级数据
                        column.list.forEach(function (data) {
                            datas.list.push({
                                content:data.columnName,//字段名称
                                value:data.id,//字段id
                            })
                        });
                        model.dataList.push(datas);
                    }else{
                        //没有下一级
                        model.dataList.push({
                            content:column.columnName,//字段名称
                            value:column.id,//字段id
                        });
                    }

                });
            }else{
                //如果是修改,做选中处理
                res.data.forEach(function (column) {
                    //如果这条数据有下一级,处理
                    if(column.list&&column.list.length>0){
                        var datas = {
                            isGroup:true,
                            label:column.name,
                            list:[]
                        }
                        //遍历这条数据的下一级数据
                        column.list.forEach(function (data) {
                            var a={
                                content:data.columnName,//字段名称
                                value:data.id,//字段id
                            };
                            if(data.id==selected){
                                a.selected = true;
                            }else{
                                a.selected = false;
                            }
                            datas.list.push(a);
                        });
                        model.dataList.push(datas);
                    }else{
                        //这条数据没有下一级
                        var a={
                            content:column.columnName,//字段名称
                            value:column.id,//字段id
                        };
                        if(column.id==selected){
                            a.selected = true;
                        }else{
                            a.selected = false;
                        }
                        model.dataList.push(a);
                    }
                });
            }

            This.$model = model;

        }.bind(this)).send({
            // "moduleId":moduleId
            "viewId":viewId
        })
    })

});

//操作条件列表grid
model('operatConditionsList',[':operatConditionsEditFormLayout','$:@lib/configSendData/operatConditionsFormLayout'],function (editFormLayoutModel,$sendData) {

    var This = this,
        moduleId='',
        gridApi,
        gridConfig={
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
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
                {
                    name: '操作',
                    listConfig: function (data,rowData,index) {
                        var rowId= rowData.id;

                        return {
                            template: '<span $-drop-menu="dropMenuConfig" class="iconfont icon-fenlei"></span>',
                            scope: {
                                dropMenuConfig: {
                                    config:{
                                        position:'right'
                                    },
                                    list: [
                                        {
                                            content: '<span>编辑</span>',
                                            scope:{

                                            },
                                            filter:{

                                            },
                                            events:{
                                                click:function (event) { //【必填项】按钮事件
                                                    //调用修改模块的模板(点击修改时,新增修改表单,调用修改表单模板)

                                                    editFormLayoutModel.method('getSelectData',{viewId:rowData.viewId,moduleId:moduleId});
                                                    editFormLayoutModel.method('getData',rowData.id);

                                                    //将scope作用域扩大,使得表单的保存按钮可用scope里的数据
                                                    var scope = {
                                                        editFormSource:$FRAME.$model(),
                                                        editFormLayout:editFormLayoutModel
                                                    };

                                                    // 修改弹框
                                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                        var a;
                                                        dialog(a={
                                                            title: '操作条件信息',//【必填项】dialog标题
                                                            content: '<form id="form_operatConditionsEdit" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                                            scope:scope,
                                                            maxmin:true,
                                                            zoom:'min',
                                                            filter:{},
                                                            width:'700px',//【非必填项】dialog宽，不填默认为640px
                                                            height:'560px;',//【非必填项】dialog高，不填默认为430px
                                                            btns:[
                                                                {
                                                                    name:'保存',
                                                                    trigger:function (eve,interface){ //【必填项】dialog通过需要进行的操作

                                                                        //表单校验
                                                                        // if(scope.editFormSource.valid()){
                                                                        var editFormData = a.scope.editFormSource.getData();

                                                                        //表单校验,保存数据到数据库
                                                                        var editFormServer = This.server({
                                                                            serverType:'api',
                                                                            method:'POST',
                                                                            url:'editOperatConditions'//更新操作条件
                                                                        });
                                                                        editFormServer.receive(function (res) {
                                                                            if(res.status===200){
                                                                                interface.close();
                                                                                //消息提示
                                                                                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                    $message('修改成功!');
                                                                                });
                                                                                gridApi.get('update')();
                                                                            }else{
                                                                                //消息提示
                                                                                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                    $message('修改失败!');
                                                                                });
                                                                            }

                                                                        }.bind(this)).send($sendData("id",rowData.id,editFormData))
                                                                        // }else{
                                                                        //     //校验不通过
                                                                        //     alert('修改表单校验失败');
                                                                        //     return false;
                                                                        // }
                                                                    }
                                                                },
                                                                {
                                                                    name:'取消',
                                                                    trigger:function (eve,interface) {
                                                                        interface.close();
                                                                    }
                                                                }
                                                            ],
                                                        });
                                                    });

                                                }
                                            }
                                        },
                                        {
                                            content: '<span>删除</span>',
                                            scope:{

                                            },
                                            events:{
                                                click:function () {
                                                    $packages('{PLUGINS}/modal/modal-confirm',function (confirm) {
                                                        confirm({
                                                            title:'删除操作条件',
                                                            content:'确定删除此条数据？',
                                                            pass:function () {
                                                                //确认删除按钮
                                                                var deleteServer = This.server({
                                                                    serverType:'api',
                                                                    method:'POST',
                                                                    url:'deleteOperatConditions'//删除操作条件
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
                                                                    "id": rowData.id
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
                /*{
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

                 return {
                 template: '<input type="checkbox" $-on:change="onChange" $-checked:false="developScope.allChecked">',
                 scope: {
                 developScope: developScope,
                 onChange: function () {
                 if (this.checked) {
                 developScope.isAllChecked = true;
                 developScope.allChecked = true;
                 developScope.allCheckedCount = developScope.gridListData.dataList.length;
                 } else {
                 developScope.isAllChecked = false;
                 developScope.allChecked = false;
                 developScope.allCheckedCount = 0
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
                 },*/
                {
                    //列表序号
                    name: '序号',
                    listConfig: function (data, rowData, index) {
                        return {
                            content: index + 1
                        }
                    }
                },

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
                    name: "条件名称",
                    //字段key
                    field: "ruleName",
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
                    name: "条件类型",
                    //字段key
                    field: "ruleType",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    //列表数据配置
                    listConfig: function (data, rowData, index) {
                        return {
                            template: '<p>{{content}}</p>',
                            scope: {
                                content: data==='hidden'?'隐藏':''
                            },
                            content: '',
                            events: {}
                        }
                    }
                },
                /*{
                    //字段标题
                    name: "执行顺序",
                    //字段key
                    field: "sort",
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
                },*/
                /*{
                 //字段标题
                 name: "物理对象名称",
                 //字段key
                 field: "phyModuleName",
                 //是否需要开启排序
                 order: true,
                 //字体 对齐方式
                 align: "center",
                 // //列表数据配置
                 // listConfig: function (data, rowData, index) {
                 //     return {
                 //         template: '<p>{{content}}</p>',
                 //         scope: {
                 //             content: data
                 //         },
                 //         content: '',
                 //         events: {}
                 //     }
                 // }
                 },*/
                {
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
                },
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
                    url:"operatConditionsList"
                }).fail(function (res) {
                    callback({});
                }).success(function (resData) {
                    // console.log('resdatga',resData);
                    callback({
                        //获取的数据总条数
                        "dataCount": resData.totalRecord,
                        //获取的数据列表
                        "dataList":resData.record
                    })
                }).send({
                    currentPage: data.pageNow,
                    viewId:data.viewId || '',
                    order: data.order,
                    pageSize: data.pageSize,
                    sidx: data.orderField
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

    this.method('getApi',function (api) {
        gridApi = api;
    });

    this.method('getOperatConditions',function (view) {

        gridConfig.sendData.viewId=view.viewId;
        moduleId = view.moduleId;
        This.$model || (This.$model = gridConfig);
    });

});

//操作条件修改formLayout
model('operatConditionsEditFormLayout', ['$:@lib/configData/operatConditionsEditFormLayout','$:@lib/configData/modelDataListen',':affectOperations',':sourceColumn'],function ($editFormLayout,$modelDataListen,affectOperations,sourceColumn) {

    var This = this,
        formSelecteData;
    //点击修改按钮时调用该方法,将id传给下拉框
    this.method('getSelectData',function (selectData) {

        formSelecteData = selectData;
    });

    this.method('getData',function (rowId) {
        var editData = {};
        var operatConditionsServer = this.server({
            serverType:'api',
            method:'POST',
            url:'operatConditionsDetail',//查询单个操作条件接口
        }).receive(function (res) {

            editData.ruleName = res.data.ruleName;//操作条件名称
            // editData.sort = res.data.sort;//执行顺序
            editData.ruleType = res.data.ruleType;//条件类型
            editData.affectOperationId = res.data.affectOperationId;//影响操作
            // editData.isLinkage = res.data.isLinkage;//是否联动
            editData.operationRuleCondList=[];

            res.data.operationRuleCondList.forEach(function (rule) {
                editData.operationRuleCondList.push({
                    sourceColumnId:rule.sourceColumnId,//来源字段
                    conditionType:rule.conditionType,//条件类型
                    conditionValue:rule.conditionValue//条件值
                })
            });

            //影响字段 , 传参数获取下拉列表(批量组件获取下拉列表需要传不同参数,动态处理)
            affectOperations.method('getListData',formSelecteData,editData.affectOperationId);
            //批量组件的"字段"获取下拉列表
            sourceColumn.method('getListData',formSelecteData.viewId,editData.operationRuleCondList[0].sourceColumnId);

            $modelDataListen([affectOperations,sourceColumn])(function (affectOperations,sourceColumn) {
                This.$model = $editFormLayout(editData,affectOperations,sourceColumn,'',This,formSelecteData);
            }.bind(This));
        }.bind(This)).send({
            "id":rowId
        });
    });


});

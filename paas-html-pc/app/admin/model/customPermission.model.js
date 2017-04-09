/**
 * Created by 贝贝 on 2016/12/24.
 */
//自定义权限

//列表grid
model('customPermissionList',[':customPermissionEditFormLayout'],function (editFormLayoutModel) {

    var This = this,
        gridApi;

    this.method('getApi',function (api) {
        gridApi = api;
    });
    this.$model = {
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            // "url": "http://paas.mecrmcrm.com/gateway/auth/A07001",
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
                                                            title: '权限信息修改',//【必填项】dialog标题
                                                            content: '<form id="form_customPermissionEdit" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
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
                                                                        if(a.scope.editFormSource.valid()){
                                                                            var editFormData = a.scope.editFormSource.getData();

                                                                            //表单校验,保存数据到数据库
                                                                            var editFormServer = This.server({
                                                                                serverType:'api',
                                                                                method:'POST',
                                                                                url:'editCustomPermission'//修改自定义权限
                                                                            });
                                                                            editFormServer.receive(function (res) {
                                                                                if(res.status===200){
                                                                                    interface.close();
                                                                                    //提示消息
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('编辑成功!');
                                                                                    });
                                                                                    gridApi.get('update')();
                                                                                }else{
                                                                                    //提示消息
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('编辑失败!');
                                                                                    });
                                                                                }

                                                                            }.bind(this)).send({
                                                                                "customPermissionId":rowData.id,
                                                                                "name":editFormData.name,
                                                                                "description":editFormData.description
                                                                            })
                                                                        }else{
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
                                            scope:{
                                            },
                                            events:{
                                                click:function () {

                                                    $packages('{PLUGINS}/modal/modal-confirm',function (confirm) {
                                                        confirm({
                                                            title:'删除该消息模板',
                                                            content:'确认删除?',
                                                            pass:function () {
                                                                //确认删除按钮
                                                                var deleteServer = This.server({
                                                                    serverType:'api',
                                                                    method:'POST',
                                                                    url:'deleteCustomPermission'//删除自定义权限
                                                                });
                                                                deleteServer.receive(function (res) {
                                                                    if(res.status===200){
                                                                        //调用提示信息
                                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                            $message('删除成功!');
                                                                        });
                                                                        gridApi.get('update')();
                                                                    }else{
                                                                        //调用提示信息
                                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                            $message('删除失败!');
                                                                        });
                                                                    }


                                                                }.bind(This)).send({
                                                                    "customPermissionId":rowData.id
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
                    name: "权限名称",
                    //字段key
                    field: "name",
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
               /* {
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
                {
                    name: "描述",
                    field: "description",
                    order: true,
                    align: "center",
                    listConfig: function (data) {
                        return {
                            template: '{{description}}',
                            scope: {
                                description: data
                            }
                        }
                    }
                },

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
             * @param data--grid发送的数据
             * @param [callback]
             */
            filtration: function (data, callback) {

                $FRAME.server({
                    serverType:'api',
                    url:"customPermissionList"
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
                    order:data.order,
                    sidx:data.orderField,
                    pageSize:data.pageSize,
                    currentPage:data.pageNow
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

});

//修改formLayout
model('customPermissionEditFormLayout',function () {

    var This = this;
    var permissionServer = this.server({
        serverType:'api',
        method:'POST',
        url:'customPermissionDetail'//查询自定义权限信息
    }),
        permValidServer = this.server({
            serverType:'jsonp',
            method:'moduleValid',
            url:'./serverData/config/form/validConfig.js'
        });

    this.method('getData',function (permissionId) {
        var editData = {};
        permissionServer.receive(function (res) {
            editData.name = res.data.customPermission.name;//权限名称
            editData.description = res.data.customPermission.description=='undefined'?'':res.data.customPermission.description;//描述

            //请求表单校验信息
            permValidServer.receive(function (resValid) {
                This.$model={
                    scope:{

                    },
                    filter:{

                    },
                    list:[
                        {
                            title:'权限名称',
                            // class:'clos-all',
                            required:true,
                            config:{
                                type:'custom',
                                template:'<input type="text" name="name" $-valid="validPermissionName" $-bind:value="editName">',
                                scope:{
                                    validPermissionName:resValid.permissionName,
                                    editName:editData.name
                                },
                                //需要给元素添加的指令
                                cmd:{
                                    "$-bind:name":'',
                                    "$-value":'',
                                    "$-model":'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd:{
                                "$-if":true
                            },
                            //当前行的作用域
                            scope:{
                                value:''
                            },
                            //当前行的过滤器
                            filter:{

                            }
                        },
                        {
                            title:'描述',
                            // class:'clos-all',
                            required:false,
                            config:{
                                type:'custom',
                                template:'<textarea name="description" cols="30" rows="20">{{cont}}</textarea>',
                                scope:{
                                    cont:editData.description,
                                },
                                cmd:{
                                    $value:'',
                                    $model:'',
                                }
                            },
                            show:true
                        }
                    ]
                }
            }.bind(This)).send();
        }.bind(this)).send({
            "customPermissionId": permissionId,
        })
    })
});

//新增按钮
model('permissionAddBtn',[':customPermissionAddFormLayout'],function(addFormLayoutModel){
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
                    click:function (event) { //【必填项】按钮事件

                        var scope={
                            addFormSource:$FRAME.$model(),
                            addFormLayout:addFormLayoutModel,
                        }
                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a ;
                            dialog(a={
                                title: '新增自定义权限',//【必填项】dialog标题
                                content: '<form id="form_permissionAdd" $-form="addFormSource"><form-layout config="addFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
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

                                            //表单校验,保存数据到数据库,局部刷新
                                            if(a.scope.addFormSource.valid()){
                                                //校验成功
                                                var addFormData=a.scope.addFormSource.getData(),
                                                    saveFormServer = This.server({
                                                        serverType:'api',
                                                        method:'POST',
                                                        url:'addPermission'//权限
                                                    });
                                                // console.log('新增的数据',addFormData);

                                                saveFormServer.receive(function (res) {

                                                    if(res.status===200){
                                                        interface.close();
                                                        //提示消息
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增成功!');
                                                        });
                                                        gridApi.get('update')();
                                                    }else{
                                                        //提示消息
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增失败!');
                                                        })
                                                    }

                                                    //调用tip成功组件
                                                }.bind(this)).send({
                                                    "name":addFormData.name,
                                                    "description":addFormData.description
                                                })
                                            }else{
                                                //校验失败
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
           /* {
                class:'btn btn-teal-outline',//按钮样式
                icon:'', //图标
                label:'编辑',//按钮文字
                align:'center',//文字居中
                padding:'6px 14px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {

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

                    }
                }
            },*/
        ]
    }]
});

//新增formLayout
model('customPermissionAddFormLayout',function () {
    //获取模块新增表单校验
    var validConfServer = this.server({
        serverType:'jsonp',
        method:'moduleValid',
        url:'./serverData/config/form/validConfig.js'
    });
    validConfServer.receive(function (res) {

        var scope=this.$model={
            filter:{

            },
            list:[
                {
                    title:'权限名称',
                    required:true,
                    // class:'clos-all',
                    config:{
                        type:'custom',
                        template:'<input type="text" name="name" $-valid="validPermissionName">',
                        scope:{
                            validPermissionName:res.permissionName
                        },
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                    //当前行需要添加的指令
                    cmd:{
                        "$-if":true
                    },
                    //当前行的作用域
                    scope:{
                        value:''
                    },
                    //当前行的过滤器
                    filter:{

                    }
                },
                {
                    title:'描述',
                    required:false,
                    // class:'clos-all',
                    config:{
                        type:'custom',
                        template:'<textarea name="description" cols="30" rows="20"></textarea>',
                        scope:{
                            events:{

                            }
                        }
                    }
                },
            ]
        }
    }.bind(this)).send();

});
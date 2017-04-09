/**
 * Created by 贝贝 on 2016/11/30.
 */
// 模块信息

//模块新增按钮,dialog配置,表单校验
model('moduleAddBtn',[':moduleAddFormLayout'],function(addFormLayoutModel){
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
                            var a;
                            dialog(a={
                                title: '新增模块',//【必填项】dialog标题
                                content: '<form id="form_moduleAdd" $-form="addFormSource"><form-layout config="addFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                scope:scope,
                                maxmin:true,
                                zoom:'min',
                                filter:{},
                                width:'780px',//【非必填项】dialog宽，不填默认为640px
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
                                                        url:'addModule'//新增模块
                                                    });
                                                // console.log('新增表单获取到的数据',addFormData);

                                                saveFormServer.receive(function (res) {
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

                                                }.bind(this)).send({
                                                    "moduleCode": addFormData.moduleCode.toUpperCase(),
                                                    "dpEnable": parseInt(addFormData.dpEnable),
                                                    "moduleName": addFormData.moduleName,
                                                    "description": addFormData.description,
                                                    "isDataSharing":parseInt(addFormData.isDataSharing),
                                                    "isCustomModule": parseInt(addFormData.isCustomModule),
                                                    "isProcess": parseInt(addFormData.isProcess)
                                                })

                                            }else{
                                                //调用错误信息,不关闭弹框
                                                //消息提示
                                                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                    $message('新增失败!');
                                                });
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

//模块列表grid
model('moduleList',[':moduleEditFormLayout'],function (editFormLayoutModel) {

    var This = this,
        gridApi,
        gridConfig = {
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            // "url": "http://paas.mecrmcrm.com/gateway/custom/C10002",
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
                        // var rowId= rowData.id;
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
                                                        var a ;
                                                        dialog(a={
                                                            title: '修改模块信息',//【必填项】dialog标题
                                                            content: '<form id="form_moduleAdd" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                                            scope:scope,
                                                            maxmin:true,
                                                            zoom:'min',
                                                            filter:{},
                                                            width:'780px',//【非必填项】dialog宽，不填默认为640px
                                                            height:'560px;',//【非必填项】dialog高，不填默认为430px
                                                            btns:[
                                                                {
                                                                    name:'保存',
                                                                    trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作

                                                                        //表单校验
                                                                        if(a.scope.editFormSource.valid()){
                                                                            var editFormData = a.scope.editFormSource.getData();
                                                                            console.log('修改后的数据',editFormData);
                                                                            //表单校验,保存数据到数据库
                                                                            var editFormServer = This.server({
                                                                                serverType:'api',
                                                                                method:'POST',
                                                                                url:'editModule'//修改模块信息
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

                                                                            }.bind(this)).send({
                                                                                "moduleCode": editFormData.moduleCode.toUpperCase(),
                                                                                "dpEnable": parseInt(editFormData.dpEnable),
                                                                                "moduleName": editFormData.moduleName,
                                                                                "description": editFormData.description,
                                                                                "isDataSharing": parseInt(editFormData.isDataSharing),
                                                                                "isCustomModule": parseInt(editFormData.isCustomModule),
                                                                                "isProcess": parseInt(editFormData.isProcess),
                                                                                "id":rowData.id,
                                                                                "isDelete":0,
                                                                                "operationLog":0
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
                                                            title:'确认模块',
                                                            content:'确认删除?',
                                                            pass:function () {
                                                                //确认删除按钮
                                                                var deleteServer = This.server({
                                                                    serverType:'api',
                                                                    method:'POST',
                                                                    url:'deleteModule'//删除模块信息
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
                                                                    "moduleIds":[rowData.id]
                                                                })
                                                            },
                                                            cancel:function () {

                                                            }
                                                        })
                                                    });
                                                }
                                            }
                                        },
                                        {
                                            content: '<span>配置管理</span>',
                                            scope:{

                                            },
                                            events:{
                                                click:function () {
                                                    $FRAME.redirect('/admin/moduleConfig/list.html?moduleId='+rowData.id+'&moduleCode='+rowData.moduleCode);
                                                }
                                            }
                                        },
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
                    name: "模块名称",
                    //字段key
                    field: "moduleName",
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
                },
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
                // console.log('dddddd',data);
                $FRAME.server({
                    serverType:'api',
                    url:"modulePage"
                }).fail(function (res) {
                    callback({});
                }).success(function (resData) {
                    callback({
                        //获取的数据总条数
                        "dataCount": resData.dataCount,
                        //获取的数据列表
                        "dataList":resData.dataList
                    })
                }).send({
                    keyValue:data.keyValue || '',
                    isDelete:0,//必填
                    order:data.order,
                    sidx:data.orderField,
                    pageSize:data.pageSize,
                    pageNow:data.pageNow
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

    this.method('getGrid',function (keyValue) {
        gridConfig.sendData.keyValue = keyValue;
        This.$model ?gridApi.update(): (This.$model = gridConfig);
    });


});

//模块新增formLayout数据
model('moduleAddFormLayout',function () {

    var This = this;
    //初始化配置隐藏列表
    var hiddenList={
        0:false, //模块名称
        1:false, //模块编码
        2:false, //配置方式

        3:false, //是否启用流程
        4:false, //启用数据权限
        5:false, //启用数据分享

        6:false //描述

    }

    //获取模块新增表单校验
    var validConfServer = this.server({
        serverType:'jsonp',
        method:'moduleValid',
        url:'./serverData/config/form/validConfig.js'
    });
    validConfServer.receive(function (res) {

        var isProcess,
            dpEnable,
            isDataSharing,
            scope=this.$model={
            scope:{
                hiddenList:hiddenList
            },
            filter:{

            },
            list:[
                {
                    title:'模块名称',
                    required:true,
                    // class:'clos-all',
                    config:{
                        type:'custom',
                        template:'<input type="text" name="moduleName" $-valid="validModuleName">',
                        scope:{
                            validModuleName:res.moduleName
                        },
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        },
                        hidden:hiddenList[0]
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
                    title:'模块编码',
                    required:true,
                    // class:'clos-all',
                    config:{
                        type:'custom',
                        template:'<input type="text" name="moduleCode" $-valid="validModuleCode">',
                        scope:{
                            validModuleCode:res.moduleCode,
                        },
                        cmd:{
                            $value:'',
                            $model:''
                        }
                    },
                    hidden:hiddenList[1]
                },
                {
                    title:'配置方式',
                    required:true,
                    // class:'clos-all',
                    config:{
                        type:'radios',
                        /*template:'<input type="radio" name="isCustomModule" value="1" checked $-on:change="events.change1" $-valid="validConf">可自定义功能页面<input type="radio" name="isCustomModule" value="0" $-on:change="events.change0" style="margin-left: 15px">只作为配置固定连接页面功能',
                        scope:{
                            validConf:res.validConf,
                            events:{
                                //可自定义
                                change1:function(){

                                    // scope.scope.shows['col3']=false;


                                    var view_isProcess = document.querySelector('input[name=isProcess]').parentNode.parentNode,
                                        view_dpEnable = document.querySelector('input[name=dpEnable]').parentNode.parentNode,
                                        view_isDataSharing = document.querySelector('input[name=isDataSharing]').parentNode.parentNode;

                                    view_isProcess.style.display = 'flex';
                                    view_dpEnable.style.display = 'flex';
                                    view_isDataSharing.style.display = 'flex';
                                },
                                //只作链接
                                change0:function () {
                                    var view_isProcess = document.querySelector('input[name=isProcess]').parentNode.parentNode,
                                        view_dpEnable = document.querySelector('input[name=dpEnable]').parentNode.parentNode,
                                        view_isDataSharing = document.querySelector('input[name=isDataSharing]').parentNode.parentNode;
                                    view_isProcess.style.display = 'none';
                                    view_dpEnable.style.display = 'none';
                                    view_isDataSharing.style.display = 'none';
                                },
                            }
                        },*/
                        $config:{
                            name:'isCustomModule',
                            dataList:[
                                {
                                    content:'可自定义功能页面',
                                    value:'1',
                                    checked:true,
                                    change:function () {
                                        isProcess.hidden = false;
                                        dpEnable.hidden = false;
                                        isDataSharing.hidden = false;
                                    }
                                },
                                {
                                    content:'只作为配置固定链接页面功能',
                                    value:'0',
                                    change:function () {
                                        isProcess.hidden = true;
                                        dpEnable.hidden = true;
                                        isDataSharing.hidden = true;
                                    }
                                }
                            ]
                        }
                    },
                    hidden:hiddenList[2],
                    scope:{

                    },
                    filter:{

                    },
                },
                isProcess={
                    title:'是否启用流程',
                    required:false,
                    // class:'clos-all',
                    config:{
                        type:'radios',
                        // template:'<input type="radio" name="isProcess" value="0" checked $-on:change="events.change0" >否<input type="radio" name="isProcess" value="1" $-on:change="events.change1" name="isFlow" value="1" style="margin-left: 15px">是',
                        $config:{
                            name:'isProcess',
                            dataList:[
                                {
                                   content:'否',
                                    value:'0',
                                    checked:true
                                },
                                {
                                    content:'是',
                                    value:'1'
                                }
                            ]
                        }
                    },
                    hidden:hiddenList[3]
                },
                dpEnable={
                    title:'启用数据权限',
                    required:true,
                    // class:'clos-all',
                    config:{
                        type:'radios',
                        // template:'<input type="radio" name="dpEnable" value="0" $-on:change="events.change0" >否<input type="radio" name="dpEnable" value="1" checked $-on:change="events.change1"  style="margin-left: 15px">是',
                        $config:{
                            name:'dpEnable',
                            dataList:[
                                {
                                    content:'否',
                                    value:'0',
                                    change:function () {
                                        isDataSharing.hidden = true;
                                    }
                                },
                                {
                                    content:'是',
                                    value:'1',
                                    checked:true,
                                    change:function () {
                                        isDataSharing.hidden = false;
                                    }
                                }
                            ]
                        }

                    },
                    hidden:hiddenList[4]
                },
                isDataSharing={
                    title:'启用数据分享',
                    required:false,
                    // class:'clos-all',
                    config:{
                        type:'radios',
                        // template:'<input type="radio" name="isDataSharing" value="0" checked $-on:change="events.change" >否<input type="radio" name="isDataSharing" value="1" $-on:change="events.change"  style="margin-left: 15px">是',
                        scope:{
                            events:{
                                change:function(){
                                    // console.log(this)
                                }
                            }
                        },
                        $config:{
                            name:'isDataSharing',
                            dataList:[
                                {
                                    content:'否',
                                    value:'0',
                                    checked:true
                                },
                                {
                                    content:'是',
                                    value:'1'
                                }

                            ]
                        }
                    },
                    hidden:hiddenList[5]
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
                                change:function(){
                                    // console.log(this)
                                }
                            }
                        }
                    },
                    hidden:hiddenList[6]
                },
            ]
        }
    }.bind(this)).send();

});

//模块修改formLayout数据
model('moduleEditFormLayout',function () {
    //请求修改模块的数据
    var This = this;
    var menuServer=this.server({
        serverType:'api',//如果是访问接口,这里是api,其他的则是http
        method:'POST',
        url:'moduleDetail'//查询单个模块信息
    });


    this.method('getData',function (rowId) {

        var editData = {};

        menuServer.receive(function (res,xhr) {
            editData.moduleName = res.data.moduleName;//模块名称
            editData.moduleCode = res.data.moduleCode;//模块编码
            editData.isCustomModule = res.data.isCustomModule;//是否为自定义模块
            editData.isProcess = res.data.isProcess;//是否启用流程
            editData.dpEnable = res.data.dpEnable;//是否启用数据权限
            editData.isDataSharing = res.data.isDataSharing;//是否启用数据分享
            editData.description = res.data.description || "";//模块描述

            //初始化配置隐藏列表
            var hiddenList={
                0:false, //模块名称
                1:false, //模块编码
                2:false, //配置方式

                3:editData.isCustomModule==0, //是否启用流程
                4:editData.isCustomModule==0, //启用数据权限
                5:editData.isCustomModule==0 || editData.dpEnable==0, //启用数据分享

                6:false //描述

            },
                isProcess,
                dpEnable,
                isDataSharing;

            //请求表单校验信息
            var validConfServer = This.server({
                serverType:'jsonp',
                method:'moduleValid',
                url:'./serverData/config/form/validConfig.js'
            });
            validConfServer.receive(function (resValid) {

                This.$model={
                    scope:{
                        hiddenList:hiddenList
                    },
                    filter:{

                    },
                    list:[
                        {
                            title:'模块名称',
                            required:true,
                            config:{
                                type:'custom',
                                template:'<input type="text" name="moduleName" $-valid="validModuleName" $-bind:value="editModuleName">',
                                scope:{
                                    validModuleName:resValid.moduleName,
                                    editModuleName:editData.moduleName
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

                            },
                            hidden:hiddenList[0]
                        },
                        {
                            title:'模块编码',
                            required:true,
                            class:'unchangeable',
                            config:{
                                type:'custom',
                                template:'<input type="text" name="moduleCode" $-bind:value="cont" readonly $-bind:property="paymentType">',
                                scope:{
                                    cont:editData.moduleCode,
                                    // validModuleCode:resValid.moduleCode
                                },
                                cmd:{
                                    $value:'',
                                    $model:'',
                                }
                            },
                            hidden:hiddenList[1]
                        },
                        {
                            title:'配置方式',
                            required:true,
                            class:'unchangeable',
                            // class:'clos-all disabled',
                            config:{
                                type:'radios',
                                // template:'<input type="radio" name="isCustomModule" value="1" checked $-on:change="events.change1">可自定义功能页面<input type="radio" name="isCustomModule" value="0" $-on:change="events.change0" style="margin-left: 15px">只作为配置固定连接页面功能',
                                /*scope:{
                                    events:{
                                        //可自定义
                                        change1:function(){
                                            var view_isProcess = document.querySelector('input[name=isProcess]').parentNode.parentNode,
                                                view_dpEnable = document.querySelector('input[name=dpEnable]').parentNode.parentNode,
                                                view_isDataSharing = document.querySelector('input[name=isDataSharing]').parentNode.parentNode;

                                            view_isProcess.style.display = 'flex';
                                            view_dpEnable.style.display = 'flex';
                                            view_isDataSharing.style.display = 'flex';
                                        },
                                        //只作链接
                                        change0:function () {
                                            var view_isProcess = document.querySelector('input[name=isProcess]').parentNode.parentNode,
                                                view_dpEnable = document.querySelector('input[name=dpEnable]').parentNode.parentNode,
                                                view_isDataSharing = document.querySelector('input[name=isDataSharing]').parentNode.parentNode;
                                            view_isProcess.style.display = 'none';
                                            view_dpEnable.style.display = 'none';
                                            view_isDataSharing.style.display = 'none';
                                        },
                                    }
                                },*/
                                $config:{
                                    name:'isCustomModule',
                                    readOnly:true,
                                    dataList:[
                                        {
                                            content:'可自定义功能页面',
                                            value:'1',
                                            checked:editData.isCustomModule==1,
                                            /*change:function () {
                                                isProcess.hidden = false;
                                                dpEnable.hidden = false;
                                                isDataSharing.hidden = false;
                                            }*/
                                        },
                                        {
                                            content:'只作为配置固定连接页面功能',
                                            value:'0',
                                            checked:editData.isCustomModule==0,
                                           /* change:function () {
                                                isProcess.hidden = true;
                                                dpEnable.hidden = true;
                                                isDataSharing.hidden = true;
                                            }*/
                                        }
                                    ]
                                }

                            },
                            hidden:hiddenList[2]
                        },
                        isProcess={
                            title:'是否启用流程',
                            required:false,
                            // class:'clos-all',
                            config:{
                                type:'radios',
                                // template:'<input type="radio" name="isProcess" value="0" checked $-on:change="events.change0" >否<input type="radio" name="isProcess" value="1" $-on:change="events.change1" name="isFlow" value="1" style="margin-left: 15px">是',
                                /*scope:{
                                    events:{
                                        //否
                                        change0:function () {

                                        },
                                        //是
                                        change1:function(){
                                            console.log(this)
                                        },

                                    }
                                }*/
                                $config:{
                                    name:'isProcess',
                                    dataList:[
                                        {
                                            content:'否',
                                            value:'0',
                                            checked:editData.isProcess!=1
                                        },
                                        {
                                            content:'是',
                                            value:'1',
                                            checked:editData.isProcess==1
                                        }
                                    ]
                                }
                            },
                            hidden:hiddenList[3]
                        },
                        dpEnable={
                            title:'启用数据权限',
                            required:true,
                            // class:'clos-all',
                            config:{
                                type:'radios',
                                // template:'<input type="radio" name="dpEnable" value="0" $-on:change="events.change0" >否<input type="radio" name="dpEnable" value="1" checked $-on:change="events.change1"  style="margin-left: 15px">是',
                                /*scope:{
                                    events:{
                                        //是
                                        change1:function(){
                                            var view_isDataSharing = document.querySelector('input[name=isDataSharing]').parentNode.parentNode;
                                            view_isDataSharing.style.display = 'flex';
                                        },
                                        //否
                                        change0:function () {
                                            var view_isDataSharing = document.querySelector('input[name=isDataSharing]').parentNode.parentNode;
                                            view_isDataSharing.style.display = 'none';
                                        },
                                    }
                                }*/
                                $config:{
                                    name:'dpEnable',
                                    dataList:[
                                        {
                                            content:'否',
                                            value:'0',
                                            checked:editData.dpEnable==0,
                                            /*change:function () {
                                                isDataSharing.hidden = true;
                                            }*/
                                        },
                                        {
                                            content:'是',
                                            value:'1',
                                            checked:editData.dpEnable!=0,
                                            /*change:function () {
                                                isDataSharing.hidden = false;
                                            }*/
                                        }
                                    ]
                                }
                            },
                            hidden:hiddenList[4]
                        },
                        isDataSharing={
                            title:'启用数据分享',
                            required:false,
                            // class:'clos-all',
                            config:{
                                type:'radios',
                                // template:'<input type="radio" name="isDataSharing" value="0" checked $-on:change="events.change" >否<input type="radio" name="isDataSharing" value="1" $-on:change="events.change"  style="margin-left: 15px">是',
                                /*scope:{
                                    events:{
                                        change:function(){
                                            console.log(this)
                                        }
                                    }
                                }*/
                                $config:{
                                    name:'isDataSharing',
                                    dataList:[
                                        {
                                            content:'否',
                                            value:'0',
                                            checked:editData.isDataSharing != 1
                                        },
                                        {
                                            content:'是',
                                            value:'1',
                                            checked:editData.isDataSharing == 1
                                        }
                                    ]
                                }
                            },
                            hidden:hiddenList[5]
                        },
                        {
                            title:'描述',
                            required:false,
                            // class:'clos-all',
                            config:{
                                type:'custom',
                                template:'<textarea name="description" cols="30" rows="20">'+editData.description+'</textarea>',
                                scope:{
                                    events:{
                                        change:function(){
                                            // console.log(this)
                                        }
                                    }
                                }
                            },
                            hidden:hiddenList[6]
                        },
                    ]
                }
            }.bind(This)).send();

        }.bind(this)).send({
            "moduleId":rowId
        });

    }.bind(this))



});

//搜索框(接收模块列表数据)
model('fuzzyQuery',function () {
    var This = this,
        requestFlag = false,
        gridApi,
        moduleServer = this.server({
            serverType:'api',
            method:'POST',
            url:'moduleList'//查询模块列表
        });

    this.method('search',function (gridConfModel,api) {
        gridApi = api;
        moduleServer.receive(function (res) {

            var model = {
                fuzzyQueryData:{
                    style:{   //自定义样式
                        // width:'240px',//【必填】fuzzyQuery宽度
                    },
                    placeholder:'请输入关键字',//文本框内提示
                    id:'moduleQuery',//当前操作的查询组件id,不填默认为fuzzyQueryID
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
                            gridConfModel.method('getGrid', this.innerText);
                            //如果已经获取,则做刷新
                            requestFlag && gridApi.get('update')();
                            requestFlag = true;
                        }
                    },
                    keyDownEvents:{
                        keydown:function (event) { //【必填项】按钮事件
                            var e=window.event||arguments.callee.caller.arguments[0];
                            if(e.keyCode==13){
                                //模糊搜索数据
                                var text = this.value;
                                gridConfModel.method('getGrid',text);
                                //如果已经获取,则做刷新
                                requestFlag && gridApi.get('update')();
                            }
                        }
                    },
                    list:[]
                }
            };
            res.data.forEach(function (module) {
                model.fuzzyQueryData.list.push({
                    name:module.moduleName,
                    value:module.id
                })
            });
            This.$model = model;
        }.bind(This)).send({
            "isDelete" : "0"
        });

    });
});
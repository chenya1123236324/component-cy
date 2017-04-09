/**
 * Created by 贝贝 on 2016/12/10.
 */
//视图公式配置

//模块列表
model('moduleList',function () {
    var This = this,
        requestFlag=false;
    var moduleListServer = this.server({
        serverType:'api',
        method:'POST',
        url:'moduleList'//查询模块集合
    });
    this.method('getModuleList',function (viewFormulaList,gridApi,commConf) {

        var model ={};
        model.style={};
        model.isGroup = true;
        model.select=function (dataInfo) {

            //调用视图公式列表的获取视图公式方法,把当前模块的id传过去
            viewFormulaList.method('getViewFormula',dataInfo.id);
            //新增按钮的receive
            commConf.write('selectId',dataInfo.id);

            //如果已经获取该模块视图,则做刷新===============================
            requestFlag && gridApi.get('update')();
            requestFlag=true;
        };
        model.list=[];
        moduleListServer.receive(function (res) {
            Object.keys(res.data).forEach(function (key) {
                model.list.push({
                    label:res.data[key].moduleName,
                    id:res.data[key].id
                })
            });

            This.$model = model;

        }.bind(This)).send({
            "isDelete" : "0"
        });
    });

});

//视图公式列表grid
model('viewFormulaList',[':viewFormulaEditFormLayout'],function (editFormLayoutModel) {

    var This = this,
        gridApi,
        gridConfig={
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            // "url": "http://paas.memobile.com.cn/gateway/custom/C02001",
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
                                                    editFormLayoutModel.method('getSelectData',gridConfig.sendData.moduleId);
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
                                                            title: '视图公式信息',//【必填项】dialog标题
                                                            content:'<form id="form_viewFormulaAdd" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                                            scope:scope,
                                                            maxmin:true,
                                                            zoom:'min',
                                                            filter:{},
                                                            height:'560px',
                                                            width:'850px',
                                                            btns:[
                                                                {
                                                                    name:'保存',
                                                                    trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作

                                                                        //表单校验
                                                                        if(scope.editFormSource.valid()){
                                                                            var editFormData = a.scope.editFormSource.getData();

                                                                            //表单校验,保存数据到数据库
                                                                            var editFormServer = This.server({
                                                                                serverType:'api',
                                                                                method:'POST',
                                                                                url:'editViewFormula'//更新视图公式
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
                                                                                "entCode": "SYSTEM",
                                                                                "userCode": "US000000001",
                                                                                "formuleName": editFormData.formuleName,
                                                                                "id": rowData.id,
                                                                                "targetColumnId": editFormData.targetColumnId,
                                                                                "sourceColumnIds": editFormData.sourceColumnIds,
                                                                                "type": editFormData.type,
                                                                                "content": editFormData.content,
                                                                                "customUrl": editFormData.customUrl,
                                                                                "defaultVal": editFormData.defaultVal
                                                                            })
                                                                        }else{
                                                                            //校验不通过
                                                                            return false;
                                                                        }



                                                                    },
                                                                },
                                                                {
                                                                    "name":'取消',
                                                                    trigger:function (eve,interface) {
                                                                        interface.close();
                                                                    }
                                                                }
                                                            ],
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
                                                            title:'删除视图公式',
                                                            content:'确定删除此条数据？',
                                                            pass:function () {
                                                                //确认删除按钮
                                                                var deleteServer = This.server({
                                                                    serverType:'api',
                                                                    method:'POST',
                                                                    url:'deleteViewFormula'//删除视图公式
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
                                                                    "entCode": "SYSTEM",
                                                                    "userCode": "US000000001",
                                                                    "formulaId": rowData.id
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
                    name: "公式名称",
                    //字段key
                    field: "formuleName",
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
                    url:"viewFormulaList"
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
                    entCode: data.entCode || "SYSTEM",
                    moduleId: data.moduleId,
                    sidx:data.orderField,
                    order:data.order,
                    pageNow: data.pageNow,
                    pageSize:data.pageSize
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
    this.method('getViewFormula',function (moduleId) {
        gridConfig.sendData.moduleId=moduleId;
        This.$model || (This.$model = gridConfig);
    })


});

//视图公式新增按钮,dialog配置,表单校验
model('viewFormulaAddBtn',[':viewFormulaAddFormLayout'],function(addFormLayoutModel){
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

                        //把moduleId传给下拉框的model
                        addFormLayoutModel.method('getSelectData',receive.selectId);

                        var scope={
                            addFormSource:$FRAME.$model(),
                            addFormLayout:addFormLayoutModel,//.method('addView',receive.selectId)
                            moduleId:receive.selectId
                        }

                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增视图公式',//【必填项】dialog标题
                                content: '<form id="form_viewFormulaAdd" $-form="addFormSource"><form-layout config="addFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
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

                                            //表单校验,保存数据到数据库,局部刷新
                                            if(a.scope.addFormSource.valid()){
                                                //校验成功
                                                var addFormData=a.scope.addFormSource.getData(),
                                                    saveFormServer = This.server({
                                                        serverType:'api',
                                                        method:'POST',
                                                        url:'addViewFormula'//添加视图公式
                                                    });

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
                                                    "entCode": "SYSTEM",
                                                    "userCode": "US000000001",
                                                    "formuleName":addFormData.formuleName,
                                                    "moduleId": receive.selectId,
                                                    "targetColumnId": addFormData.targetColumnId,//目标字段id
                                                    "sourceColumnIds": addFormData.sourceColumnIds instanceof Array?addFormData.sourceColumnIds.join(','):addFormData.sourceColumnIds,//来源字段id集合
                                                    "type": addFormData.type,
                                                    "content": addFormData.content,
                                                    "customUrl": addFormData.customUrl,//自定义URL处理结果
                                                    "defaultVal": addFormData.defaultVal
                                                })

                                            }else{
                                                //调用错误信息,不关闭弹框
                                                return false;
                                            }



                                        },
                                    },
                                    {
                                        name:'取消',
                                        trigger:function (eve,interface) {
                                            interface.close();
                                        }
                                    }
                                ],

                            })
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
        ]
    }]
});


//视图公式新增formLayout
model('viewFormulaAddFormLayout', ':targetList',':sourceList',function (targetList,sourceList) {

    var This = this;
    //点击新增按钮时调用该方法,将id传给下拉框
    this.method('getSelectData',function (id) {
        targetList.method('getListData',id,"");
        sourceList.method('getListData',id,"");
    });


    var validConfServer = this.server({
        serverType:'jsonp',
        method:'moduleValid',
        url:'./serverData/config/form/validConfig.js'
    });
        validConfServer.receive(function (res) {

            var validSwitchs=window.dd={
                0:true,//公式名称
                1:true,//配置方式
                2:true,//目标字段

                3:true,//公式内容
                4:false,//来源字段
                5:false,//URL地址
                6:false//数据值
            },
                hiddenList={
                    0:false,//公式名称
                    1:false,//配置方式
                    2:false,//目标字段

                    3:false,//公式内容
                    4:true,//来源字段
                    5:true,//URL地址
                    6:true//数据值

                },
                content,
                sourceColumnIds,
                customUrl,
                defaultVal;

            This.$model ={
                scope:{
                    validSwitchs:validSwitchs,
                    hiddenList:hiddenList
                 },
                filter:{

                },

                list:[
                    {
                        title:'公式名称',
                        required:true,
                        class:'',
                        config:{
                            type:'custom',
                            template:'<input type="text" name="formuleName" $-valid="validFormulaName" $-valid-switch="validSwitchs[0]">',
                            scope:{
                                validFormulaName:res.name
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[0]
                    },
                    {
                        title:'配置方式',
                        required:true,
                        config:{
                            type:'radios',
                            $config:{
                                name:'type',
                                dataList:[
                                    {
                                        content:'公式计算',
                                        value:'2',
                                        checked:true,
                                        change:function () {
                                            //li显示隐藏
                                            content.hidden=false;
                                            sourceColumnIds.hidden=true;
                                            customUrl.hidden=true;
                                            defaultVal.hidden=true;

                                            //表单校验
                                            validSwitchs[3]=true;
                                            validSwitchs[4]=false;
                                            validSwitchs[5]=false;
                                            validSwitchs[6]=false;
                                        }
                                    },
                                    {
                                        content:'自定义处理URL',
                                        value:'0',
                                        change:function () {
                                            //li显示隐藏
                                            content.hidden=true;
                                            sourceColumnIds.hidden=false;
                                            customUrl.hidden=false;
                                            defaultVal.hidden=true;

                                            //表单校验
                                            validSwitchs[3]=false;
                                            validSwitchs[4]=true;
                                            validSwitchs[5]=true;
                                            validSwitchs[6]=false;
                                        }
                                    },
                                    {
                                        content:'默认值',
                                        value:'1',
                                        change:function () {
                                            //li显示隐藏
                                            content.hidden=true;
                                            sourceColumnIds.hidden=true;
                                            customUrl.hidden=true;
                                            defaultVal.hidden=false;

                                            //表单校验
                                            validSwitchs[3]=false;
                                            validSwitchs[4]=false;
                                            validSwitchs[5]=false;
                                            validSwitchs[6]=true;
                                        }
                                    }
                                ]
                            }
                        },
                        hidden:hiddenList[1]
                    },
                    {
                        title:'目标字段',
                        required:true,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<select config="targetListModel"  name="targetColumnId" $-valid="validFormulaTarget"  $-valid-switch="validSwitchs[2]"></select>',
                            scope:{
                                validFormulaTarget:res.target,
                                // moduleId:selectId,
                                targetListModel:targetList,
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[2]
                    },
                    content={
                        title:'公式内容',
                        required:true,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<input type="text" name="content" $-valid="validFormulaContent"  $-valid-switch="validSwitchs[3]">',
                            scope:{
                                validFormulaContent:res.content
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[3]
                    },
                    sourceColumnIds={
                        title:'来源字段',
                        required:true,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<select config="sourceListModel"  name="sourceColumnIds" $-valid="validFormulaSource"  $-valid-switch="validSwitchs[4]"></select>',
                            scope:{
                                validFormulaSource:res.target,
                                // moduleId:selectId,
                                sourceListModel:sourceList,
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',  //TODO:111111
                            }
                        },
                        hidden:hiddenList[4]
                    },
                    customUrl={
                        title:'URL地址',
                        required:true,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<input type="text" name="customUrl" $-valid="validFormulaName"  $-valid-switch="validSwitchs[5]">',
                            scope:{
                                validFormulaName:res.name
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[5]

                    },
                    defaultVal={
                        title:'数据值',
                        required:true,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<input type="text" name="defaultVal" $-valid="validFormulaName"  $-valid-switch="validSwitchs[6]">',
                            scope:{
                                validFormulaName:res.name
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[6]

                    },
                ]
            }

        }.bind(this)).send();


});

//目标字段下拉框数据
model('targetList',function(){
    var This = this;

    var selectServer = this.server({
        serverType:'api',
        method:'POST',
        url:'queryModuleField'//查询当前模块下所有字段
    });

    /*selected--被选中的项
     如果是新增,selected="";
     如果是修改,selected="被选中着的id1,被选中的id2,...";
     */
    this.method('getListData',function (selectId,selected) {

        selectServer.receive(function (res) {

            var model={
                name:'targetColumnId',
                // search:true,
                // multiple:true,
                style:{
                    // width:'100%',
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
            "moduleId":selectId
        })
    })

});

//来源字段下拉框数据
model('sourceList',function(){
    var This = this;
    var selectServer = this.server({
        serverType:'api',
        method:'POST',
        url:'queryModuleField'
    });

    /*selected--被选中的项
     如果是新增,selected="";
     如果是修改,selected="被选中着的id1,被选中的id2,...";
     */
    this.method('getListData',function (selectId,selected) {

        selectServer.receive(function (res) {
            var model={
                name:'sourceColumnIds',
                search:true,
                multiple:true,
                style:{
                    // width:'100%'
                },
                dataList:[]
            };

            /*//如果selected="",为新增,不做选中处理
            if(selected==""){
                res.data.forEach(function (column) {
                    model.dataList.push({
                        content:column.columnName,//字段名称
                        value:column.id,//字段id
                    })
                });
            }else{
                //如果是修改,做选中处理
                res.data.forEach(function (column) {
                    var a = {
                        content:column.columnName,//字段名称
                        value:column.id,//字段id
                    };
                    if(column.id == selected){
                        a.selected = true;
                    }else{
                        a.selected = false;
                    }
                    model.dataList.push(a);
                });
            }*/

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

                            //判断selected是单个还是多个
                            if(selected.indexOf(',')==-1){

                                data.id==selected?a.selected = true:a.selected = false;

                            }else{

                                var selecteds = selected.split(',');
                                selecteds.forEach(function (selectInfo) {
                                    data.id==selectInfo?a.selected = true:a.selected = false;
                                })

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

                        //判断selected是单个还是多个
                        if(selected.indexOf(',')==-1){

                            column.id==selected?a.selected = true:a.selected = false;

                        }else{

                            var selecteds = selected.join(',');
                            selecteds.forEach(function (selectInfo) {

                                column.id==selectInfo?a.selected = true:a.selected = false;
                            })

                        }
                        model.dataList.push(a);
                    }
                });
            }

            This.$model = model;

        }.bind(this)).send({
            "moduleId":selectId
        })
    })

});
//--------------------------------------------

//视图公式修改formLayout数据
model('viewFormulaEditFormLayout', ':targetList',':sourceList',function (targetList,sourceList) {
    //请求修改视图公式的数据
    var This = this,
        formSelecteData;

    //点击修改按钮时调用该方法,将模块id传给下拉框
    this.method('getSelectData',function (id) {
        formSelecteData = id;
    });

    var menuServer=this.server({
        serverType:'api',//如果是访问接口,这里是api,其他的则是http
        method:'POST',
        url:'viewFormulaDetail'//查询单个视图公式详情
    });
    this.method('getData',function (rowId) {
        var editData = {};
        menuServer.receive(function (res,xhr) {

            editData.formuleName = res.data.formuleName;//视图公式名称
            editData.type = res.data.type;//配置方式
            editData.targetColumnId = res.data.targetColumnId;//目标字段id
            editData.content = res.data.content;//公式内容
            editData.sourceColumnIds = res.data.sourceColumnIds;//来源字段
            editData.customUrl = res.data.customUrl;//URL地址
            editData.defaultVal = res.data.defaultVal;//数据值

            targetList.method('getListData',formSelecteData,editData.targetColumnId);
            sourceList.method('getListData',formSelecteData,editData.sourceColumnIds);

            //请求表单校验信息
            var validConfServer = This.server({
                serverType:'jsonp',
                method:'moduleValid',
                url:'./serverData/config/form/validConfig.js'
            });
            validConfServer.receive(function (resValid) {
                var validSwitchs={
                        0:true,//公式名称
                        1:true,//配置方式
                        2:true,//目标字段

                        3:true,//公式内容
                        4:false,//来源字段
                        5:false,//URL地址
                        6:false//数据值
                    },
                    hiddenList={
                        0:false,//公式名称
                        1:false,//配置方式
                        2:false,//目标字段

                        3:editData.type!=2,//公式内容(配置方式为公式计算才显示)
                        4:editData.type!=0,//来源字段
                        5:editData.type!=0,//URL地址
                        6:editData.type!=1//数据值

                    },
                    content,
                    sourceColumnIds,
                    customUrl,
                    defaultVal;
                This.$model={
                    scope:{
                        validSwitchs:validSwitchs,
                        hiddenList:hiddenList
                    },
                    filter:{

                    },
                    list:[
                        {
                            title:'公式名称',
                            required:true,
                            class:'',
                            config:{
                                type:'custom',
                                template:'<input type="text" name="formuleName" $-valid="validFormulaName" $-valid-switch="validSwitchs[0]" $-bind:value="editViewFName">',
                                scope:{
                                    validFormulaName:resValid.name,
                                    editViewFName:editData.formuleName
                                },
                                cmd:{
                                    "$-bind:name":'',
                                    "$-value":'',
                                }
                            },
                            hidden:hiddenList[0]
                        },
                        {
                            title:'配置方式',
                            required:true,
                            config:{
                                type:'radios',
                                $config:{
                                    name:'type',
                                    dataList:[
                                        {
                                            content:'公式计算',
                                            value:'2',
                                            checked:editData.type=='2',
                                            change:function () {
                                                //li显示隐藏
                                                content.hidden=false;
                                                sourceColumnIds.hidden=true;
                                                customUrl.hidden=true;
                                                defaultVal.hidden=true;

                                                //表单校验
                                                validSwitchs[3]=true;
                                                validSwitchs[4]=false;
                                                validSwitchs[5]=false;
                                                validSwitchs[6]=false;
                                            }
                                        },
                                        {
                                            content:'自定义处理URL',
                                            value:'0',
                                            checked:editData.type=='0',
                                            change:function () {
                                                //li显示隐藏
                                                content.hidden=true;
                                                sourceColumnIds.hidden=false;
                                                customUrl.hidden=false;
                                                defaultVal.hidden=true;

                                                //表单校验
                                                validSwitchs[3]=false;
                                                validSwitchs[4]=true;
                                                validSwitchs[5]=true;
                                                validSwitchs[6]=false;
                                            }
                                        },
                                        {
                                            content:'默认值',
                                            value:'1',
                                            checked:editData.type=='1',
                                            change:function () {
                                                //li显示隐藏
                                                content.hidden=true;
                                                sourceColumnIds.hidden=true;
                                                customUrl.hidden=true;
                                                defaultVal.hidden=false;

                                                //表单校验
                                                validSwitchs[3]=false;
                                                validSwitchs[4]=false;
                                                validSwitchs[5]=false;
                                                validSwitchs[6]=true;
                                            }
                                        }
                                    ]
                                }
                            },
                            hidden:hiddenList[1]
                        },
                        {
                            title:'目标字段',
                            required:true,
                            // class:'clos-all',
                            config:{
                                type:'custom',
                                template:'<select config="targetListModel" name="targetColumnId" $-valid="validFormulaTarget" $-valid-switch="validSwitchs[2]"></select>',
                                scope:{
                                    validFormulaTarget:resValid.target,
                                    // moduleId:selectId,
                                    targetListModel:targetList,//.method('selects',selectId)
                                },
                                cmd:{
                                    "$-bind:name":'',
                                    "$-value":'',
                                }
                            },
                            hidden:hiddenList[2]
                        },
                        content={
                            title:'公式内容',
                            required:true,
                            // class:'clos-all',
                            config:{
                                type:'custom',
                                template:'<input type="text" name="content" $-valid="validFormulaContent" $-bind:value="editViewFContent" $-valid-switch="validSwitchs[3]">',
                                scope:{
                                    validFormulaContent:resValid.content,
                                    editViewFContent:editData.content
                                },
                                cmd:{
                                    "$-bind:name":'',
                                    "$-value":'',
                                }
                            },
                            hidden:hiddenList[3]
                        },
                        sourceColumnIds={
                            title:'来源字段',
                            required:true,
                            // class:'clos-all',
                            config:{
                                type:'custom',
                                template:'<select config="sourceListModel" name="sourceColumnIds" $-valid="validFormulaSource" $-valid-switch="validSwitchs[4]"></select>',
                                scope:{
                                    validFormulaSource:resValid.target,
                                    // moduleId:selectId,
                                    sourceListModel:sourceList,
                                },
                                cmd:{
                                    "$-bind:name":'',
                                    "$-value":'',
                                }
                            },
                            hidden:hiddenList[4]
                        },
                        customUrl={
                            title:'URL地址',
                            required:true,
                            // class:'clos-all',
                            config:{
                                type:'custom',
                                template:'<input type="text" name="customUrl" $-valid="validFormulaName" $-valid-switch="validSwitchs[5]" $-bind:value="editViewFUrl">',
                                scope:{
                                    validFormulaName:resValid.name,
                                    editViewFUrl : editData.customUrl
                                },
                                cmd:{
                                    "$-bind:name":'',
                                    "$-value":'',
                                }
                            },
                            hidden:hiddenList[5]

                        },
                        defaultVal={
                            title:'数据值',
                            required:true,
                            // class:'clos-all',
                            config:{
                                type:'custom',
                                template:'<input type="text" name="defaultVal" $-valid="validFormulaName" $-valid-switch="validSwitchs[6]" $-bind:value="editViewFDef">',
                                scope:{
                                    validFormulaName:resValid.name,
                                    editViewFDef:editData.defaultVal
                                },
                                cmd:{
                                    "$-bind:name":'',
                                    "$-value":'',
                                }
                            },
                            hidden:hiddenList[6]

                        },
                    ]
                }
            }.bind(This)).send();

        }.bind(this)).send({
            "entCode": "SYSTEM",
            "formulaId": rowId
        });
    });
});

/**
 * Created by 贝贝 on 2017/1/13.
 */
//系统日志

//1.后台配置日志
//日志列表grid
 model('moduleConfigLogGrid',function () {
     var This = this,
         gridConfig= {

             //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
             // "url": "http://paas.memobile.com.cn/gateway/log/L02002",
             //网络请求的类型 如: POST | GET
             "method": "POST",
             //页面数据展示的条数
             "pageSize": 20,
             //页面可选展示的条数
             "pageSizeList": [10, 20, 30],
             //数据默认排序 [ asc | desc ]
             order: "asc",
             //排序的字段
             "orderField": "id",
             //数据请求时候发送的附带数据
             "sendData": {
             },
             //列表左边操作
             "leftColsModel": [
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
                 /*{
                     name: '操作',
                     listConfig: function () {

                         return {
                             template: '<span $-drop-menu="dropMenuConfig" class="iconfont icon-fenlei"></span>',
                             scope: {
                                 dropMenuConfig: {
                                     config:{
                                         position:'right'
                                     },
                                     list: [
                                         {
                                             content: '<span $-on:click="events.click">栏目一</span>',
                                             scope:{
                                                 events:{
                                                     click:function () {
                                                         alert('ok')
                                                     }
                                                 }
                                             },
                                             filter:{

                                             }
                                         },
                                         {
                                             content: '栏目二'
                                         },
                                         {
                                             content: '栏目三'
                                         }
                                     ]
                                 }
                             },
                             events: {}
                         }
                     }
                 },*/
                 /*{
                     titleConfig: {
                         template: '自定义',
                         scope: {},
                         content: '',
                         events: {}
                     },
                     listConfig: function (data, rowData, index) {
                         return {
                             template: index,
                             scope: {},
                             content: '',
                             events: {}
                         }
                     }
                 }*/
             ],
             //字段模型
             "colsModel": [
                 {
                     //字段标题
                     name: "操作内容",
                     //字段key
                     field: "operationContent",
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
                     name: "操作类型",
                     field: "operationType",
                     order: true,
                     align: "center",
                     listConfig:function (data,rowData,index) {
                         return {
                             template:'<p>{{content}}</p>',
                             scope:{
                                 content:data=='DELETE'?'删除':data=='UPDATE'?'更新':data=='INSERT'?'新增':'修改'
                             },
                             content: '',
                             events: {}
                         }
                     }
                 },
                 {
                     name: "描述",
                     field: "operationDesc",
                     order: true,
                     align: "center",
                     listConfig:function (data,rowData,index) {
                         return {
                             template:'<p>{{content}}</p>',
                             scope:{
                                 content:data
                             },
                             content: '',
                             events: {}
                         }
                     }
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
                     url:"backStageConfigLogList"
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
                     moduleId: data.moduleId || '',
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

     this.method('getGrid',function (moduleId) {
         gridConfig.sendData.moduleId = moduleId;
         this.$model || (this.$model = gridConfig);
     });
 });

//搜索框
model('moduleConfigFuzzyQuery',function () {
    var This = this,
        requestFlag = false,
        gridApi,
        logServer = this.server({
            serverType:'api',
            method:'POST',
            url:'backStageConfigLogList'//查询后台配置日志列表
        });

    this.method('search',function (gridConfModel,api) {
        gridApi = api;
        logServer.receive(function (res) {

            var model = {
                fuzzyQueryData:{
                    style:{   //自定义样式
                        // width:'240px',//【必填】fuzzyQuery宽度
                    },
                    placeholder:'请输入模块名',//文本框内提示
                    id:'moduleConfigQuery',//当前操作的查询组件id,不填默认为fuzzyQueryID
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
                            gridConfModel.method('getGrid', this.id);
                            //如果已经获取,则做刷新
                            requestFlag && gridApi.get('update')();
                            requestFlag = true;
                        }
                    },
                    list:[]
                }
            };
            res.data.record.forEach(function (log) {
                model.fuzzyQueryData.list.push({
                    name:log.realModuleName,
                    value:log.moduleId
                })
            });
            This.$model = model;
        }.bind(This)).send({
            "currentPage": 1,
            "pageSize": 20,
            "sidx": "moduleId",
            "order": "desc"
        });

    });
});


//2.前端操作日志
//日志列表grid
model('moduleOperatLogGrid',function () {
    var This = this,
        gridConfig= {

        //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
        // "url": "http://paas.memobile.com.cn/gateway/log/L01002",
        //网络请求的类型 如: POST | GET
        "method": "POST",
        //页面数据展示的条数
        "pageSize": 20,
        //页面可选展示的条数
        "pageSizeList": [10, 20, 30],
        //数据默认排序 [ asc | desc ]
        order: "DESC",
        //排序的字段
        "orderField": "moduleId",
        //数据请求时候发送的附带数据
        "sendData": {
        },
        //列表左边操作
        "leftColsModel": [
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
            /*{
             name: '操作',
             listConfig: function () {

             return {
             template: '<span $-drop-menu="dropMenuConfig" class="iconfont icon-fenlei"></span>',
             scope: {
             dropMenuConfig: {
             config:{
             position:'right'
             },
             list: [
             {
             content: '<span $-on:click="events.click">栏目一</span>',
             scope:{
             events:{
             click:function () {
             alert('ok')
             }
             }
             },
             filter:{

             }
             },
             {
             content: '栏目二'
             },
             {
             content: '栏目三'
             }
             ]
             }
             },
             events: {}
             }
             }
             },*/
            /*{
             titleConfig: {
             template: '自定义',
             scope: {},
             content: '',
             events: {}
             },
             listConfig: function (data, rowData, index) {
             return {
             template: index,
             scope: {},
             content: '',
             events: {}
             }
             }
             }*/
        ],
        //字段模型
        "colsModel": [
            {
                //字段标题
                name: "操作内容",
                //字段key
                field: "operationContent",
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
                name: "操作类型",
                field: "operationType",
                order: true,
                align: "center",
                listConfig:function (data,rowData,index) {
                    return {
                        template:'<p>{{content}}</p>',
                        scope:{
                            content:data=='DELETE'?'删除':data=='UPDATE'?'更新':data=='INSERT'?'新增':'修改'
                        },
                        content: '',
                        events: {}
                    }
                }
            },
            {
                name: "描述",
                field: "operationDesc",
                order: true,
                align: "center",
                listConfig:function (data,rowData,index) {
                    return {
                        template:'<p>{{content}}</p>',
                        scope:{
                            content:data
                        },
                        content: '',
                        events: {}
                    }
                }
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
            console.log('dddddd',data);
            $FRAME.server({
                serverType:'api',
                url:"frontOperationLogList"
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
                currentPage:data.pageNow,
                moduleId: data.moduleId || '',
                realModuleName: data.realName || "",
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

    this.method('getGrid',function (realModelName,moduleId) {
        gridConfig.sendData.realModuleName = realModelName;
        gridConfig.sendData.moduleId = moduleId;
        this.$model || (this.$model = gridConfig);
    });
});

//搜索框
model('moduleOperatFuzzyQuery',function () {
    var This = this,
        requestFlag = false,
        gridApi,
        logServer = this.server({
            serverType:'api',
            method:'POST',
            url:'frontOperationLogList'//查询前端操作日志列表
        });

    this.method('search',function (gridConfModel,api) {
        gridApi = api;
        logServer.receive(function (res) {
            var model = {
                fuzzyQueryData:{
                    style:{   //自定义样式
                        // width:'240px',//【必填】fuzzyQuery宽度
                    },
                    placeholder:'请输入模块名称',//文本框内提示
                    id:'moduleOperatQuery',//当前操作的查询组件id,不填默认为fuzzyQueryID
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
                            gridConfModel.method('getGrid', this.innerText,this.id);
                            //如果已经获取,则做刷新
                            requestFlag && gridApi.get('update')();
                            requestFlag = true;
                        }
                    },
                    list:[]
                }
            };
            res.data.record.forEach(function (log) {
                model.fuzzyQueryData.list.push({
                    name:log.realModuleName,
                    value:log.moduleId
                })
            });
            This.$model = model;
        }.bind(This)).send({
            "currentPage": 1,
            "pageSize": 20,
            "sidx": "moduleId",
            "order": "DESC"
        });

    });
});
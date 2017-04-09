/**
 * Created by 贝贝 on 2017/1/10.
 */
//用户列表grid---model
model('authGridConf',function () {
    var This = this,
        // selectData={},
        gridConfig = {
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            // "url": "http://paas.memobile.com.cn/gateway/auth/A02009",
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
                "orgId": '',//部门id
                // "searchKey":"abc",//关键字
                "orgCode":"",//部门编码
                // "roleId":1,//角色id
            },
            //列表左边操作
            "leftColsModel": [
                /*{
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
                 content: '<span $-on:click="events.click">修改</span>',
                 scope:{
                 events:{
                 click:function (event) { //【必填项】按钮事件
                 //调用修改模块的模板(点击修改时,新增修改表单,调用修改表单模板)
                 editFormLayoutModel.method('getData',rowData.id);

                 //将scope作用域扩大,使得表单的保存按钮可用scope里的数据
                 var scope = {
                 editFormLayout:editFormLayoutModel
                 };

                 // 修改弹框
                 $dialog({
                 title: '权限信息修改'+rowData.id,//【必填项】dialog标题
                 content: '',//【非必填项】dialog内容
                 passText:'保存',//【必填项】dialog按钮
                 cancelText:'取消',//【必填项】dialog按钮
                 width:'700px',//【非必填项】dialog宽，不填默认为640px
                 height:'560px;',//【非必填项】dialog高，不填默认为430px
                 template:'<form id="form_customPermissionEdit" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                 scope:scope,
                 //点击dialog的保存按钮
                 pass: function () { //【必填项】dialog通过需要进行的操作

                 //表单校验
                 if(scope.editFormSource.valid()){
                 var editFormData = scope.editFormSource.getData();

                 //表单校验,保存数据到数据库
                 var editFormServer = This.server({
                 serverType:'api',
                 method:'POST',
                 url:'editCustomPermission'//修改自定义权限
                 });
                 editFormServer.receive(function (res) {
                 console.log('修改成功',res);
                 }.bind(this)).send({
                 "customPermissionId":rowData.id,
                 "name":editFormData.name,
                 "description":editFormData.description
                 })
                 }else{
                 //校验不通过
                 alert('修改表单校验失败');
                 return false;
                 }



                 },
                 //点击dialog的取消按钮
                 cancel: function () {//【必填项】dialog不通过需要进行的操作
                 }
                 });
                 }
                 }
                 },
                 filter:{

                 }
                 },
                 {
                 content: '<span $-on:click="events.click">删除</span>',
                 scope:{
                 events:{
                 click:function () {

                 $confirm({
                 title:'确认删除'+rowData.id,
                 content:'确认删除?',
                 pass:function () {
                 //确认删除按钮
                 var deleteServer = This.server({
                 serverType:'api',
                 method:'POST',
                 url:'deleteCustomPermission'//删除自定义权限
                 });
                 deleteServer.receive(function (res) {
                 console.log('删除成功',res);
                 }.bind(This)).send({
                 "customPermissionId":rowData.id
                 })

                 },
                 cancel:function () {

                 }
                 })
                 }
                 }
                 },
                 }
                 ]
                 }
                 },
                 events: {}
                 }
                 }
                 },*/
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
                        //选中多条的数据--(单条数据:model.selectData)
                        developScope.selectDatas = [];

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
                                    developScope.allCheckedTime = Date.now();


                                },

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
                                    selectData=rowData;

                                    //获取数组元素下标的方法indexOf
                                    Array.prototype.indexOf = function(val) {
                                        for (var i = 0; i < this.length; i++) {
                                            if (this[i] == val) return i;
                                        }
                                        return -1;
                                    };
                                    //删除数组某元素的方法
                                    Array.prototype.remove = function(val) {
                                        var index = this.indexOf(val);
                                        if (index > -1) {
                                            this.splice(index, 1);
                                        }
                                    };
                                    if(this.checked){
                                        developScope.selectDatas.push(rowData);
                                    }else{
                                        developScope.selectDatas.remove(rowData);
                                    }

                                    // console.log('selectData',developScope.selectDatas);
                                }
                            };

                        return {
                            template: '<input $-on:change="onChange" $-model="$isChecked" type="checkbox" $-checked:false="developScope.isAllChecked|checkedHandle:[$,developScope.allCheckedTime]">',
                            scope: scope,
                            filter: {
                                checkedHandle: function (isAllChecked) {

                                    var isChecked = false;

                                    if (!isSelf || developScope.masterChange) {
                                        isChecked = isAllChecked;
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
                /*{
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
                    name: "真实姓名",
                    //字段key
                    field: "realName",
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
                    name: "性别",
                    //字段key
                    field: "sex",
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
                    name: "手机号",
                    //字段key
                    field: "mobile",
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
                /*{
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
                 },*/

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
                    url:"userList"
                }).fail(function (res) {
                    callback({});
                }).success(function (resData) {
                    callback({
                        //获取的数据总条数
                        "dataCount": resData.totalRecord,
                        //获取的数据列表
                        "dataList":resData.record
                    })
                }).send(data);
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
    this.method('getAuth',function (data) {
        // console.log('data',data.id)
        gridConfig.sendData = {
            "orgId":data.id,
            "orgCode":data.orgCode
        };
        This.$model || (This.$model = gridConfig);
    });
});

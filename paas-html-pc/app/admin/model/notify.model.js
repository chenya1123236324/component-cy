/**
 * Created by 贝贝 on 2016/12/24.
 */
//通知公告

//列表grid
model('notifyList', [':notifyDetailFormLayout'], function (detailFormLayoutModel) {

    var This = this,
        gridApi;
    this.method('getApi',function (api) {
        gridApi = api;
    });

    this.$model={
        //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
        // "url": "http://paas.mecrmcrm.com/gateway/message/M03006",//查询发送公告分页
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
            /*{
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
             content: '<span $-on:click="events.click">修改</span>',
             scope: {
             events: {
             click: function (event) { //【必填项】按钮事件
             //调用修改模块的模板(点击修改时,新增修改表单,调用修改表单模板)
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
             title: '通知公告修改' + rowData.id,//【必填项】dialog标题
             content: '<form id="form_notifyEdit" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
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
             url: 'editNotify'//修改通知公告
             });
             editFormServer.receive(function (res) {
             console.log('修改成功', res);
             interface.close();
             gridApi.get('update')();
             }.bind(this)).send({
             "senderId": 1,//TODO:发送人Id
             "senderName": "系统管理员",//TODO:发送人名称
             "id": rowData.id,//公告id
             "title": editFormData.title,//消息名称
             "notifyType": editFormData.notifyType,//消息类别
             "receiveType": editFormData.receiveType,//接收类型
             "content": editFormData.content,//消息内容
             "receiveUser": ",11,",//接收人信息
             })
             } else {
             //校验不通过
             alert('修改表单校验失败');
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
             filter: {}
             },
             {
             content: '<span $-on:click="events.click">删除</span>',
             scope: {
             events: {
             click: function () {

             $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
             var a;
             dialog(a={
             title: '确认删除' + rowData.id,
             content: '确认删除?',
             maxmin:false,
             zoom:'min',
             filter:{},
             width:'500px',
             height:'200px',
             btns:[
             {
             name:'确认',
             trigger:function (eve,interface) {
             //确认删除按钮
             var deleteServer = This.server({
             serverType: 'api',
             method: 'POST',
             url: 'deleteNotify'//删除通知公告
             });
             deleteServer.receive(function (res) {
             console.log('删除成功', res);
             interface.close();
             gridApi.get('update')();
             }.bind(This)).send({
             "customPermissionId": rowData.id
             })

             }
             },
             {
             name:'取消',
             trigger:function (eve,interface) {
             interface.close();
             }
             }
             ]
             })
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
                name: "标题",
                //字段key
                field: "title",
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
                name: "消息类别",
                //字段key
                field: "notifyType",
                //是否需要开启排序
                order: true,
                //字体 对齐方式
                align: "center",
                //列表数据配置
                listConfig: function (data, rowData, index) {
                    return {
                        template: '<p>{{type}}</p>',
                        scope: {
                            type: data==='ANNOUNCEMENT'?'公告':data==='NOTICE'?'通知':'系统'
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
             name: "状态",
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
                var rowData = arguments[2];
                var scope = {
                    detailFormLayout: detailFormLayoutModel
                }
                //把当前行的id传给详情formLayout
                detailFormLayoutModel.method('getData', rowData.id);

                $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                    var a;
                    dialog(a={
                        title: '具体信息' + rowData.id,//【必填项】dialog标题
                        id: 'notifyDetail',
                        content: '<form id="form_notifyDetail"><form-layout config="detailFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                        scope: scope,
                        maxmin:true,
                        zoom:'min',
                        filter:{},
                        width: '700px',//【非必填项】dialog宽，不填默认为640px
                        height: '560px;',//【非必填项】dialog高，不填默认为430px
                        btns:[
                            /*{
                             name:'删除',
                             trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作
                             $packages('{PLUGINS}/modal/modal-confirm',function (confirm) {
                             confirm({
                             title: '删除发送公告',
                             content: '确认删除?',
                             pass: function () {
                             //确认删除按钮
                             var deleteServer = This.server({
                             serverType: 'api',
                             method: 'POST',
                             url: 'deleteNotify'//删除通知公告
                             }).receive(function (res) {
                             console.log('删除成功', res);
                             interface.close();
                             gridApi.get('update')();
                             }.bind(This)).send({
                             "notifyId": rowData.id
                             })

                             },
                             cancel: function () {

                             }
                             })
                             })


                             }
                             },*/
                            {
                                name:'确定',
                                trigger:function (eve,interface) {
                                    interface.close();
                                }
                            }
                        ]
                    });
                })

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
                url:"sendNotifyList"
            }).fail(function (res) {
                callback({});
            }).success(function (resData) {
                callback({
                    //获取的数据总条数
                    "dataCount": resData.pageCount,
                    //获取的数据列表
                    "dataList":resData.dataList
                })
            }).send({
                notifyType: data.notifyType || "ALL",
                startTime: data.startTime || "1481608256000",
                endTime: data.endTime || String(Date.now()),
                sidx: data.orderField,
                order: data.order,
                pageSize: data.pageSize,
                pageNow: data.pageNow
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

    }

});

//详情formLayout
model('notifyDetailFormLayout', function () {

    var This = this;
    var notifyServer = this.server({
        serverType: 'api',
        method: 'POST',
        url: 'notifyDetail'//查询单条公告明细
    });

    this.method('getData', function (notifyId) {
        var detailData = {};
        notifyServer.receive(function (res) {
            detailData.title = res.data.title;//标题名称
            detailData.time = res.data.createTime;//创建时间
            detailData.notifyType = res.data.notifyType;//消息类别
            detailData.content = res.data.content;//消息内容

            this.$model = {
                scope: {},
                filter: {},
                list: [
                    {
                        title: '标题名称',
                        required: true,
                        config: {
                            type: 'custom',
                            template: '{{title}}',
                            scope: {
                                title: detailData.title
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
                        title: '通知日期',
                        required: true,
                        config: {
                            type: 'custom',
                            template: '{{time|Date:[$,"yy-mm-dd hh:ii:ss"]}}',
                            scope: {
                                time: detailData.time
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
                        title: '消息类别',
                        required: true,
                        config: {
                            type: 'custom',
                            template: '{{notifyType}}<!--<select config="notifyTypeModel" name="notifyType" $-valid="validNotifyType"></select>-->',
                            scope: {
                                notifyType: detailData.notifyType==='ANNOUNCEMENT'?'公告':detailData.notifyType==='NOTICE'?'通知':'系统'
                            },
                            cmd: {
                                $value: '',
                                $model: '',
                            }
                        },
                        show: true
                    },
                    {
                        title: '消息内容',
                        required: true,
                        class: '',
                        config: {
                            type: 'custom',
                            template: '{{content}}<!--<textarea name="content" cols="30" rows="20" $-valid="content"></textarea>-->',
                            scope: {
                                content: detailData.content
                            }
                        }
                    },
                ]
            }

        }.bind(this)).send({
            "notifyId": notifyId,
        })
    })
});

//新增按钮
model('notifyAddBtn', [':notifyAddFormLayout'], function (addFormLayoutModel) {
    var This = this,
        gridApi;
    this.method('getGridApi',function (api) {
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
                    click: function (event) { //【必填项】按钮事件

                        var scope = {
                            addFormSource:$FRAME.$model(),
                            addFormLayout: addFormLayoutModel,
                        }
                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增公告',//【必填项】dialog标题
                                content: '<form id="form_permissionAdd" $-form="addFormSource"><form-layout config="addFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
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

                                            //表单校验,保存数据到数据库,局部刷新
                                            if (a.scope.addFormSource.valid()) {
                                                //校验成功
                                                var addFormData = a.scope.addFormSource.getData(),
                                                    saveFormServer = This.server({
                                                        serverType: 'api',
                                                        method: 'POST',
                                                        url: 'addNotify'//新增通知公告
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
                                                    "title": addFormData.title,//标题名称
                                                    "senderId": 1,
                                                    "senderName": "系统管理员",
                                                    "content": addFormData.content,
                                                    "notifyType": addFormData.notifyType,//消息类别
                                                    "receiveType": addFormData.receiveType,//接收类型
                                                    "receiveUser": addFormData.receiveType === 'ALL' ? '' : addFormData.receiveType === 'USER' ? addFormData.receiveUser[0] : addFormData.receiveUser[1]//人员选择或部门
                                                })
                                            } else {
                                                //调用错误信息,不关闭弹框
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
                iconEvents: {
                    click: function (event) {
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
model('notifyAddFormLayout', function () {

    //获取模块新增表单校验
    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'moduleValid',
        url: './serverData/config/form/validConfig.js'
    });
    validConfServer.receive(function (res) {

        var hiddenList={
                0:false,//标题名称
                1:false,//消息类别
                2:false,//接受类型

                3:true,//人员选择
                4:true,//部门选择

                5:false,//消息内容

            },
            user,org,
            orgListModel = $FRAME.model('HOME@custom/commApi:orgList');
        orgListModel.method('getData','0');

        this.$model = {
            scope:{
                hiddenList:hiddenList
            },
            filter: {},
            list: [
                {
                    title: '标题名称',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<input type="text" name="title" $-valid="validNotifyTitle">',
                        scope: {
                            validNotifyTitle: res.notifyTitle
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
                    hidden:hiddenList[0]
                },
                {
                    title: '消息类别',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<select config="notifyTypeModel" name="notifyType" $-valid="validNotifyType"></select>',
                        scope: {
                            validNotifyType: res.notifyType,
                            notifyTypeModel: {
                                name: 'notifyType',
                                style: {
                                    // width: '100%'
                                },
                                dataList: [
                                    {
                                        content: '公告',
                                        value: 'ANNOUNCEMENT',
                                    },
                                    {
                                        content: '通知',
                                        value: 'NOTICE',
                                    },
                                    {
                                        content: '系统',
                                        value: 'SYSTEM',
                                    },
                                ]
                            },
                        },
                        cmd: {
                            $value: '',
                            $model: '',
                        }
                    },
                    hidden:hiddenList[1]
                },
                {
                    title: '接收类型',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<select config="receiveTypeModel" name="receiveType" $-valid="validReceiveType"></select>',
                        scope: {
                            validReceiveType: res.notifyRecevType,
                            receiveTypeModel: {
                                name: 'receiveType',
                                style: {
                                    // width: '100%'
                                },
                                events: {
                                    change: function () {
                                        switch (this.value) {
                                            case 'ALL':
                                                user.hidden = true;
                                                org.hidden = true;
                                                break;

                                            case 'USER':
                                                user.hidden = false;
                                                org.hidden = true;
                                                break;

                                            case 'ORGANIZATION':
                                                user.hidden = true;
                                                org.hidden = false;
                                                break;
                                        }
                                    },
                                    click: function () {
                                        // console.log('click')
                                    }
                                },
                                dataList: [
                                    {
                                        content: '企业所有人员',
                                        value: 'ALL',
                                    },
                                    {
                                        content: '选择人员',
                                        value: 'USER',
                                    },
                                    {
                                        content: '选择部门',
                                        value: 'ORGANIZATION',
                                    },
                                ]
                            },
                        },
                        cmd: {
                            $value: '',
                            $model: '',
                        }
                    },
                    hidden:hiddenList[2]
                },
                user={
                    title: '人员选择',
                    required: false,
                    config: {
                        type: 'organisation',
                        name:'receiveUser',
                        $config:{
                            orgCode:0,
                            select:function (info,write,dialog) {
                                write(info.userInfo.realName,info.userInfo.userCode);
                                dialog.close();
                            }
                        },

                    },
                    hidden:hiddenList[3]
                },
                org={
                    title: '部门选择',
                    required: false,
                    config: {
                        type: 'tree',
                        name:'receiveUser',
                        $config:{
                            treeConf:orgListModel,
                            select:function (info,write) {
                                info=info||{orgName:'',orgCode:''};
                                write(info.orgName,info.orgCode);
                            }
                        }
                    },
                    hidden:hiddenList[4]
                },
                {
                    title: '消息内容',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<textarea name="content" cols="30" rows="20" $-valid="content"></textarea>',
                        scope: {
                            content: res.notifyContent
                        }
                    },
                    hidden:hiddenList[5]
                },
            ]
        }
    }.bind(this)).send();

});

//搜索
model('searchFormLayout',function () {
    var gridApi;
    this.method('getGridApi',function (api) {
        gridApi = api;
    });

    var searchData = {
        hiddenFlag:true,
        notifyType:{
            name:'notifyType',
            style:{
                width:'150px'
            },
            events:{},
            dataList:[
                {
                    content:'全部',
                    value:'ALL'
                },
                {
                    content:'公告',
                    value:'ANNOUNCEMENT'
                },
                {
                    content:'通知',
                    value:'NOTICE'
                },
                {
                    content:'系统',
                    value:'SYSTEM'
                }
            ]
        },
        searchTag:{
            name:'searchTag',
            style:{
                width:'150px'
            },
            events:{
                change:function () {
                    if(this.value==='CUSTOM'){
                        searchData.hiddenFlag=false;
                    }else{
                        searchData.hiddenFlag = true;
                    }
                }
            },
            dataList:[
                {
                    content:'全部',
                    value:'ALL'
                },
                {
                    content:'今天',
                    value:'CURDAY'
                },
                {
                    content:'一周',
                    value:'WEEK'
                },
                {
                    content:'一月',
                    value:'MONTH'
                },
                {
                    content:'自定义',
                    value:'CUSTOM'
                }
            ]
        },
        searchBtn:[
            {
                isGroup: true,
                // spacing: '20px',
                eventIdentifierName: 'searchIdentifierName',
                style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'

                },
                list:[
                    {
                        class:'btn btn-teal-outline',//按钮样式
                        icon:'', //图标
                        label:'搜索',//按钮文字
                        align:'center',//文字居中
                        padding:'3.5px 14px',//按钮内边距，可以控制按钮大小
                        events:{
                            click:function (eve,searchFormSource) {
                                var searchConditions = searchFormSource.getData(),
                                    sendData={
                                        "notifyType": searchConditions.notifyType,
                                        "startTime": '',
                                        "endTime": '',
                                    },
                                    startTime,endTime;
                                console.log('自定义时间戳',arguments,searchFormSource,searchConditions);
                                var d = new Date(),
                                    nowDayOfWeek = d.getDay(),//今天本周的第几天
                                    nowDay = d.getDate(),//当前日
                                    nowMonth = d.getMonth(),//当前月
                                    nowYear = d.getFullYear();//当前年

                                switch (searchConditions.searchTag){
                                    case "ALL":
                                        startTime = "1481608256000";
                                        endTime = Date.now();
                                        sendData.startTime = String(startTime);
                                        sendData.endTime = String(endTime);
                                        break;
                                    case "CURDAY":
                                        startTime = new Date(nowYear,nowMonth,nowDay).getTime();
                                        endTime = Date.now();
                                        sendData.startTime = String(startTime);
                                        sendData.endTime = String(endTime);
                                        break;
                                    case 'WEEK':
                                        startTime = new Date(nowYear,nowMonth,nowDay-nowDayOfWeek).getTime();
                                        endTime = Date.now();
                                        sendData.startTime = String(startTime);
                                        sendData.endTime = String(endTime);
                                        break;
                                    case 'MONTH':
                                        startTime = new Date(nowYear,nowMonth,1).getTime();
                                        endTime = Date.now();
                                        sendData.startTime = String(startTime);
                                        sendData.endTime = String(endTime);
                                        break;
                                    case 'CUSTOM':console.log(searchConditions)
                                        startTime = new Date(searchConditions.startTime.replace(/\-/g,'/')).getTime();//转成时间戳
                                        endTime = new Date(searchConditions.endTime.replace(/\-/g,'/')).getTime();//转成时间戳
                                        sendData.startTime = String(startTime);
                                        sendData.endTime = String(endTime);
                                        break;
                                };

                                gridApi.sendData(sendData,false);
                                gridApi.get('update')();
                            }
                        }
                    }
                ]

            }
        ]
    };
    this.$model = searchData;
});
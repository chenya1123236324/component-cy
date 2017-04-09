/**
 * Created by 贝贝 on 2017/1/9.
 */
//消息模板页面

//列表grid
model('messageList', [':messageEditFormLayout',':messageDetailFormLayout'], function (editFormLayoutModel, detailFormLayoutModel) {

    var This = this,
        gridApi;
    this.method('getApi',function (api) {
        gridApi = api;
    });
    this.$model = {
        //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
        // "url": "http://paas.mecrmcrm.com/gateway/message/M02005",//查询消息模板分页
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
                                                        title: '模板修改',//【必填项】dialog标题
                                                        content: '<form id="form_messageEdit" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
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
                                                                            url: 'editMessage'//修改消息模板
                                                                        });
                                                                        editFormServer.receive(function (res) {
                                                                            // console.log('修改成功', res);
                                                                            if(res.status ===200){
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
                                                                            "id": rowData.id,
                                                                            "name": editFormData.name,//模板名称
                                                                            "msgTitle": editFormData.msgTitle,//消息标题
                                                                            "senderId": editFormData.senderId,//发送人id
                                                                            "msgType": editFormData.msgType,//消息类型
                                                                            "receiveType": editFormData.receiveType,//接收类型:ORG(部门)  USER(用户)  ALL(所有)
                                                                            "receiveOrgSet": editFormData.receiveType=='ORG'? editFormData.receiveOrgSet:'',//接收部门集合
                                                                            "receiveUserSet": editFormData.receiveType=='USER'? editFormData.receiveUserSet:'',//接收用户集合
                                                                            "templates": editFormData.templates,//模板内容
                                                                            "description": editFormData.description,//描述

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
                                                        title: '确认删除' + rowData.id,
                                                        content: '确认删除?',
                                                        pass: function () {
                                                            //确认删除按钮
                                                            var deleteServer = This.server({
                                                                serverType: 'api',
                                                                method: 'POST',
                                                                url: 'deleteMessage'//删除消息模板
                                                            });
                                                            deleteServer.receive(function (res) {
                                                                if(res.status ===200){
                                                                    //消息提示
                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                        $message('删除成功!');
                                                                        gridApi.get('update')();
                                                                    });
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
                                                        cancel: function () {

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
                name: "模板名称",
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
            {
                //字段标题
                name: "消息类型",
                //字段key
                field: "msgType",
                //是否需要开启排序
                order: true,
                //字体 对齐方式
                align: "center",
                //列表数据配置
                listConfig: function (data, rowData, index) {
                    return {
                        template: '<p>{{type}}</p>',
                        scope: {
                            type: data=='MESSAGE'?'消息提醒':data=='NOTIFY'?'通知公告':data=='EMAIL'?'邮件':'短信'
                        },
                        content: '',
                        events: {}
                    }
                }
            },
            {
                name: "发送时间",
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
                        title: '具体信息',//【必填项】dialog标题
                        id: 'messageDetail',
                        content: '<form id="form_messageDetail"><form-layout config="detailFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                        scope: scope,
                        maxmin:true,
                        zoom:'min',
                        filter:{},
                        width: '700px',//【非必填项】dialog宽，不填默认为640px
                        height: '560px;',//【非必填项】dialog高，不填默认为430px
                        btns:[
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
                url:"messageTempList"
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
                msgType: data.msgType || 'NOTIFY',
                pageSize: data.pageSize,
                name: data.name || '',
                moduleId:data.moduleId ||'',
                pageNow: data.pageNow,
                sidx: data.order,
                order: data.orderField,
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

//详情formLayout
model('messageDetailFormLayout', function () {

    var This = this;
    //获取模块新增表单校验
    var validConfServer = this.server({
            serverType: 'jsonp',
            method: 'moduleValid',
            url: './serverData/config/form/validConfig.js'
        }),
        //查询消息模板详情
        editFormServer = this.server({
            serverType: 'api',
            method: 'POST',
            url: 'detailMessage'
        });

    this.method('getData',function (msgId) {
        validConfServer.receive(function (res) {
            editFormServer.receive(function (resData) {
                // console.log('消息详情',resData);
                This.$model = {
                    filter: {},
                    list: [
                        {
                            title: '模板名称',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '{{content}}',
                                scope: {
                                    content:resData.data.name
                                    // validTemplateName: res.templateName
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
                            title: '发送人',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '{{content}}',
                                scope: {
                                    content:resData.data.senderName
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
                            title: '发送时间',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '{{content|Date:[$,"yy-mm-dd hh:ii:ss"]}}',
                                scope: {
                                    content:resData.data.createTime
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
                            title: '消息类型',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '{{content}}',
                                scope: {
                                    content:resData.data.msgType==='NOTIFY'?'通知公告':resData.data.msgType==='MESSAGE'?'消息提醒':resData.data.msgType==='EMAIL'?'邮件':'短信'
                                },
                                cmd: {
                                    $value: '',
                                    $model: '',
                                }
                            },
                            show: true
                        },
                        {
                            title: '内容',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '{{content}}',
                                scope: {
                                   content:resData.data.templates
                                }
                            }
                        },
                        {
                            title: '描述',
                            required: false,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '{{content}}',
                                scope: {
                                    content:resData.data.description
                                }
                            }
                        },
                    ]
                }

            }.bind(This)).send({
                "id":msgId
            });
        }.bind(This)).send();
    });

});

//修改formLayout
model('messageEditFormLayout', ['@publicData/orgTreeConf:orgTreeConf', '@publicData/authGridConf:authGridConf'], function (orgTreeConfModel, authGridConfModel) {

    var This = this;
    //获取模块新增表单校验
    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'moduleValid',
        url: './serverData/config/form/validConfig.js'
    }),
        //查询消息模板详情
        editFormServer = this.server({
            serverType: 'api',
            method: 'POST',
            url: 'detailMessage'
        });

    this.method('getData',function (msgId) {
        validConfServer.receive(function (res) {
            editFormServer.receive(function (resData) {
              // console.log('修改form详情',resData);

                var hiddenList={
                    0:false,//模板名称
                    1:false,//消息标题
                    2:false,//发送人
                    3:false,//消息类型
                    4:false,//接受类型

                    5:resData.data.receiveType!='ORG',//部门选择
                    6:resData.data.receiveType!='USER',//人员选择

                    7:false,//内容
                    8:false//描述
                },
                    org,user,
                    orgListModel = $FRAME.model('HOME@custom/commApi:orgList');
                orgListModel.method('getData','0');

                This.$model = {
                    scope:{
                        hiddenList:hiddenList
                    },
                    filter: {},
                    list: [
                        {
                            title: '模板名称',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="name" $-valid="validTemplateName" $-bind:value="data.name">',
                                scope: {
                                    validTemplateName: res.templateName,
                                    data:resData.data
                                },
                            },
                            hidden:hiddenList[0]
                        },
                        {
                            title: '消息标题',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="msgTitle" $-valid="validMessageTitle" $-value="data.msgTitle">',
                                scope: {
                                    validMessageTitle: res.messageTitle,
                                    data:resData.data
                                },
                            },
                            hidden:hiddenList[1]
                        },
                        {
                            title: '发送人',
                            required: true,
                            config: {
                                type: 'organisation',
                                name:'senderId',
                                value:resData.data.senderId,
                                $config:{
                                    showName:'senderName',
                                    showValue:resData.data.senderName,
                                    orgCode:0,
                                    select:function (info,write,dialog) {
                                        write(info.userInfo.realName,info.userInfo.userCode);
                                        dialog.close();
                                    }
                                }
                                // template: '<input type="hidden" name="senderId" $-bind:value="sender.id"><input type="text" name="senderName" $-bind:value="sender.name" $-valid="validSender" $-on:click="click" readonly>',
                            },
                            hidden:hiddenList[2]
                        },
                        {
                            title: '创建日期',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" readonly name="createTime" $-bind:value="data.createTime|Date:[$,\'yy-mm-dd hh:ii:ss\']">',
                                scope:{
                                    data:resData.data
                                }
                            },
                            hidden:hiddenList[2]
                        },
                        {
                            title: '消息类型',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '<select config="msgTypeModel" name="msgType" $-valid="validMsgType"></select>',
                                scope: {
                                    validMsgType: res.msgType,
                                    msgTypeModel: {
                                        name: 'msgType',
                                        style: {
                                            // width: '100%'
                                        },
                                        dataList: [
                                            {
                                                content: '通知公告',
                                                value: 'NOTIFY',
                                                selected:resData.data.msgType=="NOTIFY"
                                            },
                                            {
                                                content: '消息提醒',
                                                value: 'MESSAGE',
                                                selected:resData.data.msgType=="MESSAGE"
                                            },
                                            {
                                                content: '邮件',
                                                value: 'EMAIL',
                                                selected:resData.data.msgType=="EMAIL"
                                            },
                                            {
                                                content: '短信',
                                                value: 'SMS',
                                                selected:resData.data.msgType=="SMS"
                                            }
                                        ]
                                    },
                                },
                                cmd: {
                                    $value: '',
                                    $model: '',
                                }
                            },
                            hidden:hiddenList[3]
                        },
                        {
                            title: '接收类型',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '<select config="receiveTypeModel" name="receiveType" $-valid="validReceiveType"></select>',
                                scope: {
                                    validReceiveType: res.msgRecevType,
                                    receiveTypeModel: {
                                        name: 'receiveType',
                                        style: {
                                            // width: '100%'
                                        },
                                        events: {
                                            change: function () {
                                                switch (this.value) {
                                                    case ' ':
                                                        org.hidden = true;
                                                        user.hidden = true;
                                                        break;

                                                    case 'ORG':
                                                        org.hidden = false;
                                                        user.hidden = true;
                                                        break;

                                                    case 'USER':
                                                        org.hidden = true;
                                                        user.hidden = false;
                                                        break;

                                                }
                                            },
                                            click: function () {
                                                // console.log('click')
                                            }
                                        },
                                        dataList: [
                                            {
                                                content: '--请选择--',
                                                value: ' ',
                                                // selected:true
                                            },
                                            {
                                                content: '选择部门',
                                                value: 'ORG',
                                                selected:resData.data.receiveType=="ORG"
                                            },
                                            {
                                                content: '选择人员',
                                                value: 'USER',
                                                selected:resData.data.receiveType=="USER"
                                            },
                                        ]
                                    },
                                },
                                cmd: {
                                    $value: '',
                                    $model: '',
                                }
                            },
                            hidden:hiddenList[4]
                        },
                        org={
                            title: '部门选择',
                            required: false,
                            config: {
                                type: 'tree',
                                name:'receiveOrgSet',
                                value:resData.data.receiveOrgSet,
                                $config:{
                                    showName:'receiveOrgName',
                                    showValue:resData.data.receiveOrgName||'',
                                    select:function (info,write) {
                                        info=info||{orgName:'',orgCode:''};
                                        write(info.orgName,info.orgCode);
                                    }
                                },
                                // template: '<input type="hidden" name="receiveOrgSet" $-bind:value="receive.orgId"><input type="text" name="receiveName" readonly="readonly" $-on:click="click" $-bind:value="receive.orgName">',
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
                            hidden:hiddenList[5]
                        },
                        user={
                            title: '人员选择',
                            required: false,
                            config: {
                                type: 'organisation',
                                name:'receiveUserSet',
                                value:resData.data.receiveUserSet,
                                $config:{
                                    showName:'receiveUserName',
                                    showValue:resData.data.receiveUserName ||'',
                                    orgCode:0,
                                    select:function (info,write,dialog) {
                                        write(info.userInfo.realName,info.userInfo.userCode);
                                        dialog.close();
                                    }
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
                            hidden:hiddenList[6]
                        },
                        {
                            title: '内容',
                            required: true,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '<textarea name="templates" cols="30" rows="20" $-valid="validMsgContent">{{content}}</textarea>',
                                scope: {
                                    validMsgContent: res.messageContent,
                                    content:resData.data.templates
                                }
                            },
                            hidden:hiddenList[7]
                        },
                        {
                            title: '描述',
                            required: false,
                            // class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '<textarea name="description" cols="30" rows="20">{{content}}</textarea>',
                                scope: {
                                    content:resData.data.description
                                }
                            },
                            hidden:hiddenList[8]
                        },
                    ]
                }

            }.bind(This)).send({
                "id":msgId
            });
        }.bind(This)).send();
    });

});


//新增按钮
model('messageAddBtn', [':messageAddFormLayout'], function (addFormLayoutModel) {
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
                                title: '消息发布',//【必填项】dialog标题
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
                                                        url: 'addMessage'//新增消息模板
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
                                                    "name": addFormData.name,//模板名称
                                                    "msgTitle":addFormData.msgTitle,//消息标题
                                                    "senderName": addFormData.senderName,//发送人
                                                    "senderId": addFormData.senderId,
                                                    "msgType": addFormData.msgType,//消息类型
                                                    "receiveType": addFormData.receiveType,//接收类型
                                                    "receiveUserSet": addFormData.receiveUserSet,//接收用户集合
                                                    "receiveOrgSet": addFormData.receiveOrgSet,//接收部门集合
                                                    "templates": addFormData.templates,//内容
                                                    "description": addFormData.description,//描述

                                                    "receiveUserTactics": '',//接收用户策略（上级领导、下级用户、无）
                                                    // "moduleId": addFormData.moduleId,//模板所属模块
                                                    "msgTactics": '',//	消息策略(可以不填)

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
        ]
    }]
});

//新增formLayout
model('messageAddFormLayout', ['@publicData/orgTreeConf:orgTreeConf', '@publicData/authGridConf:authGridConf'], function (orgTreeConfModel, authGridConfModel) {

    //获取模块新增表单校验
    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'moduleValid',
        url: './serverData/config/form/validConfig.js'
    });
    validConfServer.receive(function (res) {

        var hiddenList={
            0:false,//模板名称
            1:false,//消息标题
            2:false,//发送人
            3:false,//消息类型
            4:false,//接受类型

            5:true,//部门选择
            6:true,//人员选择

            7:false,//内容
            8:false//描述
        },
            org,
            user
            orgListModel = $FRAME.model('HOME@custom/commApi:orgList');
        orgListModel.method('getData','0');

        this.$model = {
            scope:{
                hiddenList:hiddenList
            },
            filter: {},
            list: [
                {
                    title: '模板名称',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<input type="text" name="name" $-valid="validTemplateName">',
                        scope: {
                            validTemplateName: res.templateName
                        },
                    },
                    hidden:hiddenList[0]
                },
                {
                    title: '消息标题',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<input type="text" name="msgTitle" $-valid="validMessageTitle">',
                        scope: {
                            validMessageTitle: res.messageTitle
                        },
                    },
                    hidden:hiddenList[1]
                },
                {
                    title: '发送人',
                    required: true,
                    config: {
                        type: 'organisation',
                        name:'senderId',
                        value:'',
                        $config:{
                            showName:'senderName',
                            showValue:'',
                            orgCode:0,
                            select:function (info,write,dialog) {
                                write(info.userInfo.realName,info.userInfo.id);
                                dialog.close();
                            }
                        }
                        // template: '<input type="hidden" name="senderId" $-bind:value="sender.id"><input type="text" name="senderName" $-bind:value="sender.name" $-valid="validSender" $-on:click="click" readonly>',
                    },
                    hidden:hiddenList[2]
                },
                {
                    title: '消息类型',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<select config="msgTypeModel" name="msgType" $-valid="validMsgType"></select>',
                        scope: {
                            validMsgType: res.msgType,
                            msgTypeModel: {
                                name: 'msgType',
                                style: {
                                    // width: '100%'
                                },
                                dataList: [
                                    {
                                        content: '通知公告',
                                        value: 'NOTIFY',
                                    },
                                    {
                                        content: '消息提醒',
                                        value: 'MESSAGE',
                                    },
                                    {
                                        content: '邮件',
                                        value: 'EMAIL',
                                    },
                                    {
                                        content: '短信',
                                        value: 'SMS',
                                    }
                                ]
                            },
                        },
                        cmd: {
                            $value: '',
                            $model: '',
                        }
                    },
                    hidden:hiddenList[3]
                },
                {
                    title: '接收类型',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<select config="receiveTypeModel" name="receiveType" $-valid="validReceiveType"></select>',
                        scope: {
                            validReceiveType: res.msgRecevType,
                            receiveTypeModel: {
                                name: 'receiveType',
                                style: {
                                    // width: '100%'
                                },
                                events: {
                                    change: function () {
                                        switch (this.value) {
                                            case ' ':
                                                org.hidden = true;
                                                user.hidden = true;
                                                break;

                                            case 'ORG':
                                                org.hidden = false;
                                                user.hidden = true;
                                                break;

                                            case 'USER':
                                                org.hidden = true;
                                                user.hidden = false;
                                                break;

                                        }
                                    },
                                    click: function () {
                                        // console.log('click')
                                    }
                                },
                                dataList: [
                                    {
                                        content: '--请选择--',
                                        value: ' ',
                                        selected:true
                                    },
                                    {
                                        content: '选择部门',
                                        value: 'ORG',
                                    },
                                    {
                                        content: '选择人员',
                                        value: 'USER',
                                    },
                                ]
                            },
                        },
                        cmd: {
                            $value: '',
                            $model: '',
                        }
                    },
                    hidden:hiddenList[4]
                },
                org={
                    title: '部门选择',
                    required: false,
                    config: {
                        type: 'tree',
                        name:'receiveOrgSet',
                        value:'',
                        $config:{
                            showName:'receiveOrgName',
                            showValue:'',
                            treeConf:orgListModel,
                            select:function (info,write) {
                                info = info||{orgName:'',orgCode:''};
                                write(info.orgName,info.orgCode);
                            }
                        }
                    },
                    hidden:hiddenList[5]
                },
                user={
                    title: '人员选择',
                    required: false,
                    config: {
                        type: 'organisation',
                        name:'receiveUserSet',
                        value:'',
                        $config:{
                            showName:'receiveUserName',
                            showValue:'',
                            orgCode:0,
                            select:function (info,write,dialog) {
                                write(info.userInfo.realName,info.userInfo.userCode);
                                dialog.close();
                            }
                        }
                    },
                    hidden:hiddenList[6]
                },
                {
                    title: '内容',
                    required: true,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<textarea name="templates" cols="30" rows="20" $-valid="validMsgContent"></textarea>',
                        scope: {
                            validMsgContent: res.messageContent
                        }
                    },
                    hidden:hiddenList[7]
                },
                {
                    title: '描述',
                    required: false,
                    // class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<textarea name="description" cols="30" rows="20"></textarea>',
                        scope: {

                        }
                    },
                    hidden:hiddenList[8]
                },
            ]
        }
    }.bind(this)).send();

});



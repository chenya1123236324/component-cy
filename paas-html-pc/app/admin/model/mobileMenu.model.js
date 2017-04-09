/**
 * Created by chenya on 2017/1/16.
 */
/*移动端菜单*/
// 1、新增移动端菜单按钮
model('addMobileMenuBtn', [':mobileMenuLayoutAdd'], function (mobileMenuLayoutAdd) {
    var This = this,
        gridApi;
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    this.$model = [{
        isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing: '20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName: 'addMobileMenuBtn',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            'margin': '13px 30px',
        },
        list: [
            {
                class: 'btn btn-teal', //【必填项】按钮样式
                icon: '', //【非必填项】图标
                label: '新增菜单',//【必填项】按钮文字
                align: 'center',//【必填项】文字居中
                padding: '6px 22px', //【必填项】按钮内边距，可以控制按钮大小
                events: {
                    click: function (event) { //【必填项】按钮事件
                        //新增标签弹框
                        var scope = {
                            addFormData:$FRAME.$model(),
                            addFormLayout: mobileMenuLayoutAdd,
                        };
                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增菜单',//【必填项】dialog标题
                                content: '<form id="addFormData" $-form="addFormData"><form-layout config="addFormLayout"></form-layout></form>',
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
                                            if (a.scope.addFormData.valid()) {
                                                var addFormData = a.scope.addFormData.getData(),
                                                    saveFormServer = This.server({
                                                        serverType: 'api',
                                                        method: 'POST',
                                                        url: 'addMenu'
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
                                                    "menuName": addFormData.menuName || null,//*[菜单名称，必填],
                                                    "menuDesc": addFormData.menuDesc || "",//[菜单描述,选填],
                                                    "menuGroup": addFormData.menuGroup || "",//*[菜单分组,必填],
                                                    "parentId": (addFormData.parentId == -1) ? 0 : addFormData.parentId || 0,
                                                    "iconClass": addFormData.iconClass || null,//*[菜单图标样式，必填],
                                                    "isEnable": addFormData.isEnable || 1,//[是否启用]
                                                    "menuOrder": addFormData.menuOrder || null,//*[菜单排序，必填],
                                                    "viewId": addFormData.viewId || null,//161*[视图id，必填],
                                                    "sourceType": 1,//[不填则默认为0],
                                                    "moduleId": addFormData.moduleId || null,//9[模块id]
                                                    "colour":addFormData.colour|| null,
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
                    }
                }
            },
        ]
    }]
});

//2、移动端菜单-form-layout 新增
model('mobileMenuLayoutAdd', ['$:@lib/publicData/menuCascade', '$:@lib/publicData/dictionaryList'], function (selectModule, selectDictionaryList) {
    var This = this;
    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'menuValid',
        url: './serverData/config/form/menuConfig.js'
    });
    validConfServer.receive(function (res) {
        //选择模块
        selectModule(This,"","",function (moduleId) {
            This.$model.list[3].config.scope.selectModuleId = "";
            This.$model.list[3].config.scope.selectModuleId = moduleId;
        });
        //选择分组
        selectDictionaryList(This,"", function (parentId) {
            This.$model.list[5].config.scope.selectMenuGroup = "";
            This.$model.list[5].config.scope.selectMenuGroup = parentId;
        });
        This.$model = {
            scope: {},
            filter: {},
            list: [
                {
                    title: '菜单名称',
                    required: true,
                    config: {
                        type: 'custom',
                        template: '<input type="text" name="menuName" $-valid="menuName">',
                        scope: {
                            menuName: res.menuName
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
                    title: '排序',
                    required: true,
                    config: {
                        type: 'custom',
                        template: '<input type="text" name="menuOrder" $-valid="menuOrder">',
                        scope: {
                            menuOrder: res.menuOrder
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
                    title:"菜单样式",
                    required: true,
                    config:{
                        type:'custom',
                        template:'<input config="iconConf" type="icons" name="iconClass"><input type="color" $-on:input="iconConf|colorChange" name="colour" style="margin-left:10px;">',
                        scope:{
                            iconConf:{
                                color:''
                            }
                        },
                        filter:{
                            colorChange:function(iconConf){
                                return function(){
                                    iconConf.color=this.value;
                                }
                            }
                        }
                    }
                },
                {
                    title: '选择模块',
                    required: true,
                    config: {
                        type: 'custom',
                        template: '<select  config="selectModuleId" $-on:change="selectChange" ></select>',
                        scope: {
                            selectModuleId: {
                                name: 'moduleId',
                                //search:true,
                                //multiple:true,
                                style: {
                                },
                                events: {},
                                dataList: [
                                    //{
                                    //    content: '--请选择--',
                                    //    value: '-1',
                                    //    selected: true
                                    //},
                                ]
                            }
                        }
                    }
                },
                {
                    title: '选择视图',
                    required: true,
                    config: {
                        type: 'custom',
                        template: '<select  config="selectViewId" $-on:change="selectChange" ></select>',
                        scope: {
                            selectViewId: {
                                name: 'viewId',
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
                    title: '选择分组',
                    required: false,
                    config: {
                        type: 'custom',
                        template: '<select  config="selectMenuGroup" $-on:change="selectMenuGroup" ></select>',
                        scope: {
                            selectMenuGroup: {
                                name: 'menuGroup',
                                //search:true,
                                //multiple:true,
                                style: {
                                },
                                events: {
                                    change: function () {
                                    },
                                },
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
                    title: '是否启用',
                    required: false,
                    class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<input type="radio" name="isEnable" value="1" checked $-on:change="events.change" >是<input type="radio" name="isEnable" value="0" $-on:change="events.change"  style="margin-left: 15px">否',
                        scope: {
                            events: {
                                change: function () {
                                    console.log(this)
                                }
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
                        template: '<textarea name="menuDesc" cols="30" rows="20"></textarea>',
                        scope: {
                            events: {
                                change: function () {
                                    console.log(this)
                                }
                            }
                        }
                    }
                },
            ]
        }
    }.bind(this)).send();
});

//3、移动端菜单-form-layout 编辑
model('mobileMenuLayoutEdit', ['$:@lib/publicData/menuCascade', '$:@lib/publicData/dictionaryList'], function (selectModule, selectDictionaryList) {
    var This = this;
    var menuServer = this.server({
        serverType: 'api',//如果是访问接口,这里是api,其他的则是http
        method: 'POST',
        url: 'getMenu'
    });
    this.method('getMenuData', function (rowId) {
        menuServer.receive(function (res, xhr) {
            //console.log(res, "res");
            //数据校验
            var validConfServer = This.server({
                serverType: 'jsonp',
                method: 'menuValid',
                url: './serverData/config/form/menuConfig.js'
            });
            validConfServer.receive(function (resValid) {
                //选择模块
                selectModule(This,res.data.moduleId,res.data.viewId,function (moduleId) {
                    This.$model.list[3].config.scope.selectModuleId = "";
                    This.$model.list[3].config.scope.selectModuleId = moduleId;
                });
                //选择分组
                selectDictionaryList(This, res.data.menuGroup,function (parentId) {
                    This.$model.list[5].config.scope.selectMenuGroup = "";
                    This.$model.list[5].config.scope.selectMenuGroup = parentId;
                });

                This.$model = {
                    scope: {},
                    filter: {},
                    list: [
                        {
                            title: '菜单名称',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="menuName" $-valid="menuName" $-bind:value="name">',
                                scope: {
                                    name: res.data.menuName,  //从后台获取
                                    menuName: resValid.menuName //表单验证
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
                            title: '排序',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="menuOrder" $-valid="menuOrder" $-bind:value="order">',
                                scope: {
                                    order: res.data.menuOrder,  //从后台获取
                                    menuOrder: resValid.menuOrder  //表单验证
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
                            title:"菜单样式",
                            required: true,
                            config:{
                                type:'custom',
                                template:'<input config="iconConf" type="icons" name="iconClass"><input type="color" $-on:input="iconConf|colorChange" name="colour" style="margin-left:10px;">',
                                scope:{
                                    iconConf:{
                                        color: res.data.colour,//从后台获取

                                    }
                                },
                                filter:{
                                    colorChange:function(iconConf){
                                        return function(){
                                            iconConf.color=this.value;
                                        }
                                    }
                                }
                            }
                        },
                        {
                            title: '选择模块',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<select  config="selectModuleId" $-on:change="selectChange" ></select>',
                                scope: {
                                    selectModuleId: {
                                        name: 'moduleId',
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
                            title: '选择视图',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<select  config="selectViewId" $-on:change="selectChange" ></select>',
                                scope: {
                                    selectViewId: {
                                        name: 'viewId',
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
                            title: '选择分组',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<select  config="selectMenuGroup" $-on:change="selectMenuGroup" ></select>',
                                scope: {
                                    selectMenuGroup: {
                                        name: 'menuGroup',
                                        //search:true,
                                        //multiple:true,
                                        style: {
                                        },
                                        events: {
                                            change: function () {
                                            },
                                        },
                                        dataList: [
                                            //{
                                            //    content: '--请选择--',
                                            //    value: '-1',
                                            //    //selected: true
                                            //},
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            title: '是否启用',
                            required: false,
                            class: 'clos-all',
                            config: {
                                type: 'custom',
                                template: '<input type="radio" name="isEnable" value="1" checked $-on:change="events.change" >是<input type="radio" name="isEnable" value="0" $-on:change="events.change"  style="margin-left: 15px">否',
                                scope: {
                                    events: {
                                        change: function () {
                                            console.log(this)
                                        }
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
                                template: '<textarea name="menuDesc" cols="30" rows="20">' + res.data.menuDesc + '</textarea>',
                                scope: {}
                            }
                        },
                    ]
                }
            }.bind(this)).send();

        }.bind(this)).send({
            "menuId": rowId
        });

    }.bind(this));
});

//4、移动端菜单-grid组件
model('mobileMenu', ['$:{PLUGINS}/modal/modal-confirm',':mobileMenuLayoutEdit'], function ($confirm, mobileMenuLayoutEdit) {
    var This = this,
        gridApi;
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    this.$model = {
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
            //"searchVal": "",
            //"parentId": "",
            //"sourceType": "1", //类型(1:移动端，0:PC。默认0)
            //"sidx": "id",
            //"pageNow": 1,
        },
        //列表左边操作
        "leftColsModel": [
            {
                name: '操作',
                listConfig: function (data, rowData, index) {
                    var id = rowData.id;
                    //console.log(id);
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
                                                //调用首页标签编辑中的formlayout
                                                mobileMenuLayoutEdit.method('getMenuData', id);
                                                //编辑标签弹框
                                                var scope = {
                                                    EditFormData:$FRAME.$model(),
                                                    mobileMenuLayoutEdit: mobileMenuLayoutEdit
                                                };
                                                //编辑弹框
                                                $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                    var a;
                                                    dialog(a={
                                                        title: '编辑菜单',//【必填项】dialog标题
                                                        content: '<form id="EditFormData" $-form="EditFormData"><form-layout config="mobileMenuLayoutEdit"></form-layout></form>',
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
                                                                    if (a.scope.EditFormData.valid()) {
                                                                        var EditFormData = a.scope.EditFormData.getData(),
                                                                            saveFormServer = This.server({
                                                                                serverType: 'api',
                                                                                method: 'POST',
                                                                                url: 'editMenu'
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
                                                                            "menuName": EditFormData.menuName || null,
                                                                            "menuDesc": EditFormData.menuDesc || "",
                                                                            "menuGroup": EditFormData.menuGroup || null,
                                                                            "parentId": (EditFormData.parentId == -1) ? 0 : EditFormData.parentId || 0,
                                                                            "iconClass": EditFormData.iconClass || null,
                                                                            "isEnable": EditFormData.isEnable || null,
                                                                            "menuOrder": EditFormData.menuOrder || null,
                                                                            "viewId": EditFormData.viewId || null,
                                                                            "sourceType": 1,
                                                                            "id": id,
                                                                            "moduleId": EditFormData.moduleId || null,
                                                                            "colour":EditFormData.colour|| null,
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
                                            }
                                        }
                                    },
                                    {
                                        content: '<span $-on:click="events.click">删除</span>',
                                        scope: {
                                        },
                                        events: {
                                            click: function () {
                                                $confirm({
                                                    title:'消息',
                                                    content:'确定删除此条数据？',
                                                    pass:function () {
                                                        var menuListServer = This.server({
                                                            serverType: 'api',//如果是访问接口,这里是api,其他的则是http
                                                            method: 'POST',
                                                            url: 'deleteMenu'
                                                        });
                                                        menuListServer.receive(function (res) {
                                                            if (res.status == "200" && res.data.count==1) {
                                                                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                    $message('删除成功！');
                                                                });
                                                                //更新列表
                                                                gridApi.get('update')();
                                                            } else {
                                                                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                    $message('删除失败！');
                                                                });
                                                            }
                                                        }.bind(this)).send({
                                                            "menuId": id
                                                        });
                                                    },
                                                    cancel:function () {
                                                    }
                                                });
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
            //{
            //    titleConfig:function () {
            //        //开发者专用作用域
            //        var developScope=this.developScope;
            //        //检查并设置初始值
            //        developScope.isAllChecked=false;
            //        developScope.masterChange=false;
            //        developScope.allChecked=false;
            //        //主选择框选择时间标识
            //        developScope.allCheckedTime=Date.now();
            //        developScope.allCheckedCount === undefined && (developScope.allCheckedCount =0);
            //
            //        return {
            //            template:'<input type="checkbox" $-on:change="onChange" $-checked:false="developScope.allChecked">',
            //            scope:{
            //                developScope:developScope,
            //                onChange:function () {
            //                    if(this.checked){
            //                        developScope.isAllChecked=true;
            //                        developScope.allChecked=true;
            //                        developScope.allCheckedCount =developScope.gridListData.dataList.length;
            //                    }else{
            //                        developScope.isAllChecked=false;
            //                        developScope.allChecked=false;
            //                        developScope.allCheckedCount = 0
            //                    }
            //                    developScope.masterChange=true;
            //                    developScope.allCheckedTime=Date.now()
            //                }
            //            },
            //            filter: {
            //                checkedHandle: function (isAllChecked) {
            //                    developScope.masterChange=true;
            //                    return isAllChecked
            //                }
            //            }
            //        }
            //    },
            //    listConfig:function (data,rowData,index,gridListData) {
            //        var developScope=this.developScope,
            //            dataLen=gridListData.length,
            //            isSelf=false,
            //            scope={
            //                developScope:developScope,
            //                onChange:function () {
            //                    isSelf=true;
            //
            //                    developScope.allCheckedCount=this.checked?developScope.allCheckedCount+1:developScope.allCheckedCount-1;
            //
            //                    if(dataLen === developScope.allCheckedCount){
            //                        developScope.allChecked =true;
            //                    }else{
            //                        developScope.allChecked =false;
            //                    }
            //
            //
            //                }
            //            };
            //
            //        return {
            //            template:'<input $-on:change="onChange" $-model="$isChecked" type="checkbox" $-checked:false="developScope.isAllChecked|checkedHandle:[$,developScope.allCheckedTime]">',
            //            scope:scope,
            //            filter:{
            //                checkedHandle:function (isAllChecked) {
            //
            //                    var isChecked=false;
            //
            //                    if(!isSelf || developScope.masterChange ){
            //                        isChecked=isAllChecked
            //                    }else if(isSelf && isAllChecked){
            //                        isChecked=true;
            //                    }
            //
            //                    isSelf=false;
            //                    developScope.masterChange=false;
            //
            //                    return isChecked;
            //
            //                }
            //            }
            //        }
            //    }
            //},
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
                name: "菜单名称",
                //字段key
                field: "menuName",
                //是否需要开启排序
                order: true,
                //字体 对齐方式
                align: "center",
            },
            {
                //字段标题
                name: "排序",
                //字段key
                field: "menuOrder",
                //是否需要开启排序
                order: true,
                //字体 对齐方式
                align: "center"
            },
            {
                //字段标题
                name: "状态",
                //字段key
                field: "isEnable",
                //是否需要开启排序
                order: true,
                //字体 对齐方式
                align: "center",
                listConfig: function (data, rowData, index) {
                    if (data == 0) {
                        return {
                            content: '已禁止'
                        }
                    }
                    return {
                        content: '启用'
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
         * @param data
         * @param [callback]
         */
        filtration: function (data, callback) {
            $FRAME.server({
                serverType:'api',
                method: 'POST',
                url: 'menuGridList'
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
                searchVal:"",
                parentId:"",
                order:data.order,
                sidx:data.orderField,
                pageSize:data.pageSize,
                pageNow:data.pageNow,
                sourceType: 1, //类型(1:移动端，0:PC。默认0)
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



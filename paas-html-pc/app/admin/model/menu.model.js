
//菜单管理
//0、菜单树形结构
model('treeConf', ['$:{PLUGINS}/modal/modal-confirm','$:@lib/menuTreeConvert', ':menuLayoutAdd',":menuLayoutEdit"], function ($confirm,$menuTreeConvert,menuLayoutAdd,menuLayoutEdit) {
    var This = this,
        requestFlag = false,
        gridApi;
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    //第一个参数是grid的数据,第二个是grid的API,第三个是新增按钮的receive
    this.method('getMenuGridList', function (menuGrid, gridApi, commConf) {
        var treeConfServer = This.server({
            serverType: 'api',
            method: 'POST',
            url: 'queryMenuList'//查询菜单集合
        }).receive(function (res) {

            console.log(res,"返回的res");

            This.$model = {
                actions: {
                    click: function () {
                        //console.log(arguments,"======arguments====");
                            //刷新列表
                            menuGrid.method('getMenuGrid', arguments[1].parentId);
                            //如果已经获取,则做刷新
                            requestFlag && gridApi.get('update')();
                            requestFlag = true;
                    },
                    select: function () {
                        // console.log(arguments,'select')
                    },
                    unselect: function () {
                        // console.log(arguments,'unselect')
                    },
                    selectChange: function () {
                        // console.log(arguments,'change')
                    }
                },
                btns:[
                    {
                        name:'新增',
                        content:'<i class="iconfont icon-add"></i>',
                        events:{
                            click:function (eve,nodeInfo,treeInfo,method) {
                                //console.log('yes',nodeInfo,treeInfo)
                                //nodeInfo.name+='++';
                                //method.add({
                                //    checked:true,
                                //    name:'+++++'
                                //})
                                //-------------------------------------------------
                                //新增标签弹框
                                var scope = {
                                    addFormData:$FRAME.$model(),
                                    addFormLayout: menuLayoutAdd,
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
                                                                method.add({
                                                                    checked:true,
                                                                    name:addFormData.menuName,
                                                                    id:res.data.id
                                                                });
                                                                //提示
                                                                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                    $message('新增成功！');
                                                                });
                                                                //gridApi.get('update')();
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
                                                            "sourceType": addFormData.sourceType || 0,//[不填则默认为0],
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
                    function (nodeData) {
                        return {
                            name: '修改',
                            content: '<i class="iconfont icon-icon4">',
                            events: {
                                click:function (eve,nodeInfo,treeInfo,method) {
                                    var id=nodeInfo.id;
                                    console.log(nodeInfo,"=====nodeInfo====");
                                    //调用编辑中的formlayout
                                    menuLayoutEdit.method('getMenuData', id);
                                    //编辑标签弹框
                                    var scope = {
                                        EditFormData:$FRAME.$model(),
                                        menuLayoutEdit: menuLayoutEdit
                                    };
                                    //编辑弹框
                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                        var a;
                                        dialog(a={
                                            title: '编辑菜单',//【必填项】dialog标题
                                            content: '<form id="EditFormData" $-form="EditFormData"><form-layout config="menuLayoutEdit"></form-layout></form>',
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
                                                                    nodeInfo.name=EditFormData.menuName;
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
                                                                "sourceType": 0,//类型(1:移动端，0:PC。默认0)
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
                        }
                    },
                    function (nodeData) {
                        return {
                            name:'删除',
                            content:'<i class="iconfont icon-shanchu"></i>',
                            events:{
                                click:function (eve,nodeInfo,treeInfo,method) {
                                    var id=nodeInfo.id;
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
                                                    if (res.status == "200"&& res.data.count==1) {
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('删除成功！');
                                                        });
                                                        //移除节点
                                                        method.remove();
                                                        //更新列表
                                                        //gridApi.get('update')();
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
                    }
                ],
                list: $menuTreeConvert(res.data)
            };
        }.bind(This)).send(
            {
                "sourceType": 0,
                "menuIdList": null,
                "searchVal": null
            }
        );
    })

});

// 1、新增菜单按钮
model('addMenuBtn', [':menuLayoutAdd'], function (menuLayoutAdd) {
    var This = this,
        gridApi;
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    this.$model = [{
        isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing: '20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName: 'homeMark',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
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
                    click: function (event, receive) { //【必填项】按钮事件
                        //新增标签弹框
                        var scope = {
                            addFormData:$FRAME.$model(),
                            addFormLayout: menuLayoutAdd,
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
                                                    "sourceType": addFormData.sourceType || 0,//[不填则默认为0],
                                                    "moduleId": addFormData.moduleId || null,//9[模块id]
                                                    "iconColor":addFormData.iconColor|| null,
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

//2、菜单-form-layout 新增
model('menuLayoutAdd', ['$:@lib/publicData/menuCascade','$:@lib/publicData/queryMenuList'], function (selectModule,selectMenuList) {
    var This = this;
    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'menuValid',
        url: './serverData/config/form/menuConfig.js'
    });

    validConfServer.receive(function (res) {
        //选择模块
        selectModule(This,"","",function (moduleId) {
            console.log(moduleId,"外部的");
            This.$model.list[3].config.scope.selectModuleId = {};
            This.$model.list[3].config.scope.selectModuleId = moduleId;
        });

        //选择一级菜单
        selectMenuList(This,"",function(parentId){
            This.$model.list[5].config.scope.selectParentId={};
            This.$model.list[5].config.scope.selectParentId=parentId;
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
                        template:'<input config="iconConf" type="icons" name="iconClass"><input type="color" $-on:input="iconConf|colorChange" name="iconColor" style="margin-left:10px;">',
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
                                events: {
                                    change:function () {
                                        var moduleId=this.value;//模块id

                                        console.log(moduleId,"你选择的moduleId");

                                        //This.$model.list[4].config.scope.selectViewId=" ";
                                        ////选择视图
                                        //moduleListModel.method('selectViewId',moduleId,function (viewIdList) {
                                        //    console.log(viewIdList,"====viewIdList666===");
                                        //    This.$model.list[4].config.scope.selectViewId=" ";
                                        //    This.$model.list[4].config.scope.selectViewId=viewIdList;
                                        //});
                                    },
                                },
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
                    title: '选择一级菜单',
                    required: false,
                    config: {
                        type: 'custom',
                        template: '<select  config="selectParentId" $-on:change="selectChange" ></select>',
                        scope: {
                            selectParentId: {
                                name: 'parentId',
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
                                        value: '-1'
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
                                }
                            }
                        }
                    }
                },
            ]
        }
    }.bind(this)).send();
});

//3、菜单-form-layout 编辑
model('menuLayoutEdit', ['$:@lib/publicData/menuCascade','$:@lib/publicData/queryMenuList','$:@lib/publicData/viewIdCascade'], function (selectModule,selectMenuList,viewIdCascade) {
    var This = this;
    var menuServer = this.server({
        serverType: 'api',//如果是访问接口,这里是api,其他的则是http
        method: 'POST',
        url: 'getMenu'
    });
    this.method('getMenuData', function (rowId) {
        menuServer.receive(function (res, xhr) {
            console.log(res,"res");
            console.log(res.data.iconClass,"res.data.iconClass");
            console.log(res.data.iconColour,"res.data.iconColour");
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
                     //选择视图
                    viewIdCascade(This,res.data.moduleId,res.data.viewId,function (viewIdCascade) {
                        This.$model.list[4].config.scope.selectViewId=" ";
                        This.$model.list[4].config.scope.selectViewId=viewIdCascade;
                    });
                //选择一级菜单
                selectMenuList(This,res.data.parentId,function(parentId){
                    This.$model.list[5].config.scope.selectParentId="";
                    This.$model.list[5].config.scope.selectParentId=parentId;
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
                                template:'<input config="iconConf" type="icons" name="iconClass" $-bind:value="iconConf.iconClass" ><input type="color" $-on:input="iconConf|colorChange" name="iconColor" $-bind:value="iconConf.iconColour" style="margin-left:10px;">',
                                scope:{
                                    iconConf:{
                                        iconClass: res.data.iconClass,//从后台获取菜单图标
                                        iconColour:res.data.iconColour,    //从后台获取菜单颜色
                                        color:res.data.iconColour,    //从后台获取菜单颜色
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
                            title: '选择一级菜单',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<select  config="selectParentId" $-on:change="selectChange" ></select>',
                                scope: {
                                    selectParentId: {
                                        name: 'parentId',
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
                                                value: '-1'
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

//4、菜单-grid组件
model('menuGrid', ['$:{PLUGINS}/modal/modal-confirm', ':menuLayoutEdit'], function ($confirm, menuLayoutEdit) {
    var This = this,
        gridApi,
        parentId='',
      gridConfig = {
        //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
        //"url": "http://paas.mecrmcrm.com/gateway/auth/A05006",
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
            ////"parentId": "",
            //"sourceType": 0,
            //"sidx": "id",
            //"pageNow": 1,
        },
        //列表左边操作
        "leftColsModel": [
            {
                name: '操作',
                listConfig: function (data, rowData, index) {
                    var id = rowData.id;
                    //console.log(id,"=====id===");
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
                                                menuLayoutEdit.method('getMenuData', id);
                                                //编辑标签弹框
                                                var scope =window.ds= {
                                                    EditFormData:$FRAME.$model(),
                                                    menuLayoutEdit: menuLayoutEdit
                                                };
                                                //编辑弹框
                                                $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                    var a;
                                                    dialog(a={
                                                        title: '编辑菜单',//【必填项】dialog标题
                                                        content: '<form id="EditFormData" $-form="EditFormData"><form-layout config="menuLayoutEdit"></form-layout></form>',
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
                                                                            "sourceType": 0,//类型(1:移动端，0:PC。默认0)
                                                                            "id": id,
                                                                            "moduleId": EditFormData.moduleId || null,
                                                                            "iconColor":EditFormData.iconColor|| null,
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
            {
                //列表序号
                name: '序号',
                listConfig: function (data, rowData, index) {
                    return {
                        content: index + 1
                    }
                }
            },
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
            //return {
            //    //获取的数据总条数
            //    "dataCount": data.data.totalRecord,
            //    //获取的数据列表
            //    "dataList": data.data.record
            //}
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
                searchVal: "",
                parentId: "",
                sourceType: 0,
                order:data.order,
                sidx:data.orderField,
                pageSize:data.pageSize,
                pageNow:data.pageNow,
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
    this.method('getGridApi',function (api) {
        gridApi = api;
    });

    this.method('getMenuGrid', function (parentId) {
        //console.log(parentId, "----parentId----");
        gridConfig.sendData.parentId = parentId;
        //This.$model || (This.$model = gridConfig);
        This.$model ?gridApi.update(): (This.$model = gridConfig);
    });

});







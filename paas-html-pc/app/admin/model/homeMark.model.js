/**
 * Created by chenya on 2016/12/13.
 */
//1、新增标签按钮
model('addLabelBtn',[':homeMarkLayoutAdd'],function(homeMarkLayoutAdd){
    var This = this,
        gridApi;
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'homeMark',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            'margin-right':'30px',
        },
        list:[
            {
                class:'btn btn-teal', //【必填项】按钮样式
                icon:'', //【非必填项】图标
                label:'新增标签',//【必填项】按钮文字
                align:'center',//【必填项】文字居中
                padding:'6px 24px', //【必填项】按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) { //【必填项】按钮事件
                        //新增标签弹框
                        var scope = {
                            addFormData:$FRAME.$model(),
                            addFormLayout:homeMarkLayoutAdd,
                        };

                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增标签',//【必填项】dialog标题
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
                                            if(a.scope.addFormData.valid()){
                                                var addFormData= a.scope.addFormData.getData(),
                                                    saveFormServer = This.server({
                                                        serverType:'api',
                                                        method:'POST',
                                                        url:'addHomeMark'
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
                                                    "name":addFormData.name||" ",
                                                    "viewId":addFormData.viewId ||null,
                                                    "viewType":addFormData.viewType ||null,
                                                    "titleColId":addFormData.titleColId||null,
                                                    "layout":addFormData.layout||null,
                                                    "flagColId":addFormData.flagColId||null,
                                                    "description":addFormData.description||" ",
                                                    "flag":addFormData.flag||null,
                                                    "i18nKey":addFormData.i18nKey||null,
                                                    "moduleId":addFormData.moduleId||null
                                                });
                                            }else{
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

//2、首页标签-form-layout 新增
model('homeMarkLayoutAdd',['$:@lib/publicData/homeMarkCascade'],function (selectModule) {
    var This=this;
    var validConfServer = this.server({
        serverType:'jsonp',
        method:'homeMarkValid',
        url:'./serverData/config/form/homeMarkConfig.js'
    });
    validConfServer.receive(function (res) {
        //选择模块
        selectModule(This,"","",function (moduleId) {
            This.$model.list[2].config.scope.selectModuleId = {};
            This.$model.list[2].config.scope.selectModuleId = moduleId;
        });
        This.$model={
            scope:{
            },
            filter:{
            },
            list:[
                {
                    title:'标签名称',
                    required:true,
                    config:{
                        type:'custom',
                        template:'<input type="text" name="name" $-valid="validName" >',
                        scope:{
                            validName:res.name
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
                    title:'选择类型 ', //CUSTOMVIEW 关联视图、NOTIFY 消息通知
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectData"  $-on:change="selectChange"></select>',
                        scope:{
                            selectData:{
                                name:'viewType',
                                //search:true,
                                //multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var  val=this.value;
                                        //var moduleId=document.querySelector('select[name =moduleId]').parentNode.parentNode.parentNode;
                                        //console.log(moduleId);
                                        //3、选择模块
                                        var moduleId=document.querySelector('select[name=moduleId]').parentNode.parentNode.parentNode;
                                        //4、选择视图
                                        var viewId=document.querySelector('select[name=viewId]').parentNode.parentNode.parentNode;
                                        //5、选择标题字段
                                        var titleColId=document.querySelector('select[name=titleColId]').parentNode.parentNode.parentNode;
                                        //6、标题标识
                                        var flagColId=document.querySelector('select[name=flagColId]').parentNode.parentNode.parentNode;
                                        //【消息通知】
                                        if(val=="NOTIFY"){
                                            //3、选择模块
                                            moduleId.style.display='none';
                                            //4、选择视图
                                            viewId.style.display='none';
                                            //5、选择标题字段
                                            titleColId.style.display='none';
                                            //6、标题标识
                                            flagColId.style.display='none';
                                            //【关联视图】
                                        }else if(val=="CUSTOMVIEW"){
                                            //3、选择模块
                                            moduleId.style.display='flex';
                                            //4、选择视图
                                            viewId.style.display='flex';
                                            //5、选择标题字段
                                            titleColId.style.display='flex';
                                            //6、标题标识
                                            flagColId.style.display='flex';
                                        }
                                    },
                                },
                                dataList:[
                                    {
                                        content:'消息通知',
                                        value:'NOTIFY',
                                        selected:true
                                    },
                                    {
                                        content:'关联视图',
                                        value:'CUSTOMVIEW',
                                    },
                                ]
                            },
                        }
                    },
                    show:true
                },
                {
                    title:'选择模块',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectModuleId" $-on:change="selectChange"></select>',
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
                    },
                    hidden:true
                },
                {
                    title:'选择视图',
                    required:false,
                    config:{
                        type:'custom',
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
                    },
                    hidden:true
                },
                {
                    title:'选择标题字段',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectTitleColId" $-on:change="selectTitleColId"></select>',
                        scope:{
                            selectTitleColId:{
                                name:'titleColId',
                                //search:true,
                                //multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                    },
                                },
                                dataList:[
                                    {
                                        content:'--请选择--',
                                        value:'-1',
                                        selected:true
                                    },
                                ]
                            },
                        }
                    },
                    hidden:true
                },
                {
                    title:'标题标识',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectData" $-on:change="selectChange"></select>',
                        scope:{
                            selectData:{
                                name:'flagColId',
                                //search:true,
                                //multiple:true,
                                style:{
                                },
                                events:{
                                },
                                dataList:[
                                    {
                                        content:'--请选择--',
                                        value:'-1',
                                        selected:true
                                    },
                                ]
                            },
                        }
                    },
                    hidden:true
                },
                {
                    title:'描述',
                    required:false,
                    class:'clos-all',
                    config:{
                        type:'custom',
                        template:'<textarea name="description" cols="30" rows="20"></textarea>',
                        scope:{
                            events:{
                                change:function(){
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

//3、首页标签-form-layout 编辑
model('homeMarkLayoutEdit',['$:@lib/publicData/homeMarkCascade'],function (selectModule) {
    var This=this;
    var menuServer=this.server({
        serverType:'api',//如果是访问接口,这里是api,其他的则是http
        method:'POST',
        url:'getHomeMark'
    });
    this.method('getHomeMarkData',function (rowId) {
        menuServer.receive(function (res,xhr) {
            //选择类型
            var viewType =res.data.viewType;
            //是否隐藏
            var isHidden = false;
            var Selected1,Selected2;
            //数据校验
            var validConfServer = This.server({
                serverType:'jsonp',
                method:'homeMarkValid',
                url:'./serverData/config/form/homeMarkConfig.js'
            });
            validConfServer.receive(function (resValid) {
                //选择模块
                selectModule(This,res.data.moduleId,res.data.viewId,function (moduleId) {
                    This.$model.list[2].config.scope.selectModuleId = {};
                    This.$model.list[2].config.scope.selectModuleId = moduleId;
                });
                //判断显示隐藏
                if(viewType=="CUSTOMVIEW"){ //关联视图
                    isHidden = false;
                    Selected1= true;
                    Selected2= false;
                }else{
                    isHidden = true;
                    Selected1= false;
                    Selected2= true;
                }
                This.$model={
                    scope:{
                    },
                    filter:{
                    },
                    list:[
                        {
                            title:'标签名称',
                            required:true,
                            config:{
                                type:'custom',
                                template:'<input type="text" name="name" $-bind:value="name"  $-valid="validName">',
                                scope:{
                                    name:res.data.name,
                                    validName:resValid.name
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
                            title:'选择类型 ', //CUSTOMVIEW 关联视图、NOTIFY 消息通知
                            required:false,
                            config:{
                                type:'custom',
                                template:' <select config="selectData"  $-on:change="selectChange"></select>',
                                scope:{
                                    selectData:{
                                        name:'viewType',
                                        //search:true,
                                        //multiple:true,
                                        style:{
                                        },
                                        events:{
                                            change:function () {
                                                console.log(this.value);
                                                var  val=this.value;
                                                //var moduleId=document.querySelector('select[name =moduleId]').parentNode.parentNode.parentNode;
                                                //console.log(moduleId);
                                                //3、选择模块
                                                var moduleId=document.querySelector('select[name=moduleId]').parentNode.parentNode.parentNode;
                                                //4、选择视图
                                                var viewId=document.querySelector('select[name=viewId]').parentNode.parentNode.parentNode;
                                                //5、选择标题字段
                                                var titleColId=document.querySelector('select[name=titleColId]').parentNode.parentNode.parentNode;
                                                //6、标题标识
                                                var flagColId=document.querySelector('select[name=flagColId]').parentNode.parentNode.parentNode;
                                                //【消息通知】
                                                if(val=="NOTIFY"){
                                                    //3、选择模块
                                                    moduleId.style.display='none';
                                                    //4、选择视图
                                                    viewId.style.display='none';
                                                    //5、选择标题字段
                                                    titleColId.style.display='none';
                                                    //6、标题标识
                                                    flagColId.style.display='none';
                                                    //【关联视图】
                                                }else if(val=="CUSTOMVIEW"){
                                                    //3、选择模块
                                                    moduleId.style.display='flex';
                                                    //4、选择视图
                                                    viewId.style.display='flex';
                                                    //5、选择标题字段
                                                    titleColId.style.display='flex';
                                                    //6、标题标识
                                                    flagColId.style.display='flex';
                                                }
                                            },
                                        },
                                        dataList:[
                                            {
                                                content:'消息通知',
                                                value:'NOTIFY',
                                                selected:Selected2
                                            },
                                            {
                                                content:'关联视图',
                                                value:'CUSTOMVIEW',
                                                selected:Selected1

                                            },
                                        ]
                                    },
                                }
                            },
                            show:true
                        },
                        {
                            title:'选择模块',
                            required:false,
                            config:{
                                type:'custom',
                                template:' <select config="selectModuleId" $-on:change="selectChange"></select>',
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
                            },
                            hidden:isHidden
                        },
                        {
                            title:'选择视图',
                            required:false,
                            config:{
                                type:'custom',
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
                                            }
                                        ]
                                    }
                                }
                            },
                            hidden:isHidden
                        },
                        {
                            title:'选择标题字段',
                            required:false,
                            config:{
                                type:'custom',
                                template:' <select config="selectTitleColId" $-on:change="selectTitleColId"></select>',
                                scope:{
                                    selectTitleColId:{
                                        name:'titleColId',
                                        //search:true,
                                        //multiple:true,
                                        style:{
                                        },
                                        events:{
                                            change:function () {
                                                console.log(this.value);
                                            },
                                        },
                                        dataList:[
                                            {
                                                content:'--请选择--',
                                                value:'-1',
                                                selected:true
                                            },
                                        ]
                                    },
                                }
                            },
                            hidden:isHidden
                        },
                        {
                            title:'标题标识',
                            required:false,
                            config:{
                                type:'custom',
                                template:' <select config="selectData" $-on:change="selectChange"></select>',
                                scope:{
                                    selectData:{
                                        name:'flagColId',
                                        //search:true,
                                        //multiple:true,
                                        style:{
                                        },
                                        events:{
                                        },
                                        dataList:[
                                            {
                                                content:'--请选择--',
                                                value:'-1',
                                                selected:true
                                            },
                                        ]
                                    },
                                }
                            },
                            hidden:isHidden
                        },
                        {
                            title:'描述',
                            required:false,
                            class:'clos-all',
                            config:{
                                type:'custom',
                                template:'<textarea name="description" $-bind:value="description" cols="30" rows="20">'+res.data.description+'</textarea>',
                                //scope:{
                                //    description:res.data.description
                                //}
                            }
                        },
                    ]
                }
            }.bind(this)).send();

        }.bind(this)).send({
            "id":rowId
        });
    }.bind(this));
});

//4、首页标签-grid组件
model('homeMarkGrid',['$:{PLUGINS}/modal/modal-confirm',':homeMarkLayoutEdit'],function($confirm,homeMarkLayoutEdit){
    var That =this,
        gridApi;
    this.method('getGridApi',function (api) {
        gridApi = api;
    });
    setTimeout(function () {
        this.$model={
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            //网络请求的类型 如: POST | GET
            "method": "POST",
            //页面数据展示的条数
            "pageSize": 20,
            //页面可选展示的条数
            "pageSizeList": [10,20,30],
            //数据默认排序 [ asc | desc ]
            order: "desc",
            //排序的字段
            "orderField":"id",
            //数据请求时候发送的附带数据
            "sendData":{
                //"pageNow":1,
                //"sidx":"id",
            },
            //列表左边操作
            "leftColsModel":[
                {
                    name: '操作',
                    listConfig: function (data,rowData,index) {
                        var id=rowData.id;
                        return {
                            template: '<span $-drop-menu="dropMenuConfig" class="iconfont icon-fenlei"></span>',
                            scope: {
                                dropMenuConfig: {
                                    config:{
                                        position:'right'
                                    },
                                    list: [
                                        {
                                            content: '<span $-on:click="events.click">编辑</span>',
                                            scope:{
                                            },
                                            filter:{
                                            },
                                            events:{
                                                click:function () {
                                                    //调用首页标签编辑中的formlayout
                                                    homeMarkLayoutEdit.method('getHomeMarkData',id);
                                                    var scope = {
                                                        EditFormData:$FRAME.$model(),
                                                        homeMarkLayoutEdit:homeMarkLayoutEdit
                                                    };
                                                    //编辑弹框
                                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                        var a;
                                                        dialog(a={
                                                            title: '编辑标签',//【必填项】dialog标题
                                                            content: '<form id="EditFormData" $-form="EditFormData"><form-layout config="homeMarkLayoutEdit"></form-layout></form>',
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
                                                                        if(a.scope.EditFormData.valid()){
                                                                            var EditFormData= a.scope.EditFormData.getData(),
                                                                                saveFormServer = That.server({
                                                                                    serverType:'api',
                                                                                    method:'POST',
                                                                                    url:'editHomeMark'
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
                                                                                "name":EditFormData.name,
                                                                                "viewId":EditFormData.viewId ||null,
                                                                                "viewType":EditFormData.viewType ||null,
                                                                                "titleColId":EditFormData.titleColId||null,
                                                                                "layout":EditFormData.layout||null,
                                                                                "flagColId":EditFormData.flagColId||null,
                                                                                "description":EditFormData.description||" ",
                                                                                "flag":EditFormData.flag||null,
                                                                                "i18nKey":EditFormData.i18nKey||null,
                                                                                "moduleId":EditFormData.moduleId||null,
                                                                                "id":id
                                                                            });
                                                                        }else{
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
                                            scope:{
                                            },
                                            events:{
                                                click:function () {
                                                    $confirm({
                                                        title:'消息',
                                                        content:'确定删除此条数据？',
                                                        pass:function () {
                                                            var menuListServer =That.server({
                                                                serverType:'api',//如果是访问接口,这里是api,其他的则是http
                                                                method:'POST',
                                                                url:'deleteHomeMark'
                                                            });
                                                            menuListServer.receive(function (res) {
                                                                if (res.status == "200") {
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
                                                                "id" :id
                                                            });
                                                        },
                                                        cancel:function () {
                                                        }
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
                    name:'序号',
                    listConfig:function (data,rowData,index) {
                        return {
                            content:index+1
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
                    name:"标签名称",
                    //字段key
                    field:"name",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                },
                {
                    //字段标题
                    name:"关联视图类型",
                    //字段key
                    field:"viewType",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    listConfig: function (data, rowData, index) {
                        if (data == "CUSTOMVIEW") {
                            return {
                                content: '关联视图'
                            }
                        }
                        return {
                            content: '消息通知'
                        }
                    }
                },
                {
                    //字段标题
                    name:"布局类型",
                    //字段key
                    field:"layout",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                },
                {
                    //字段标题
                    name:"创建时间",
                    //字段key
                    field:"createTime",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    listConfig: function (data) {
                        return {
                            template: '{{contentData|Date:[$,"yy-mm-dd"]}}',
                            scope: {
                                contentData: data
                            }
                        }
                    }
                },{
                    //字段标题
                    name:"描述",
                    //字段key
                    field:"description",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                },
            ],
            //行事件处理
            events:{
                click:function () {

                },
                hover:function () {

                },
                unHover:function () {

                },
                select:function () {

                },
                unSelect:function () {

                }
            },
            /**
             * 数据过滤
             * @param data
             * @param [callback]
             */
            filtration:function(data,callback){
                $FRAME.server({
                    serverType:'api',
                    method: 'POST',
                    url: 'HomeMarkGridList'
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
                    pageNow:data.pageNow,
                });
            },
            /**
             * 数据初始化配置
             * @param resData
             * @param $interface
             */
            dataInitConf:function (gridListData,$interface) {
                //往开发作用域中存储列表数据
                $interface.developScope.gridListData=gridListData;
            }
        };

        window.yy=this.$model;

    }.bind(this),100);

});




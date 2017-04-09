
/**
 * Created by chenya on 2016/12/27.
 */

//1、选择模块-下拉框
model('viewSettings-select', ['$:@lib/publicData/moduleConfig/querySingleModuleByModuleId'], function (querySingleModuleByModuleId) {
    var This = this;
    var requestFlag = false;
    var moduleConfigViewApi,moduleConfigOperationApi;

    //视图
    this.method('getViewApi',function (api) {
        moduleConfigViewApi = api;
    });
    //操作
    this.method('getOperationApi',function (api) {
        moduleConfigOperationApi = api;
    });
    this.method('getSelectList', function (viewSettingsView,moduleConfigViewApi,viewSettingsOperation,moduleConfigOperationApi) {
        var $moduleListServer = this.server({
            serverType: 'api',
            method: 'POST',
            url: 'moduleList'
        });
        //服务请求
        $moduleListServer.receive(function (res) {
            console.log(res, "模块信息");
            var moduleList = {
                name: 'moduleId',
                // search:true,
                //multiple:true,
                style: {
                    width: '160px',
                },
                events: {
                    change: function () {
                        console.log(this.value);
                        //获取模块ID放到隐藏文本框中
                        document.querySelector("#setModuleID").value = this.value || 0;
                        //通过模块ID获取模块信息
                        querySingleModuleByModuleId(this.value, function (res) {
                            console.log(res, "通过模块ID获取模块信息");
                            //获取模块编码
                            document.querySelector("#setModuleID").name = res.data.moduleCode || "DEFAULT";
                        });

                        //把当前选中的模块ID传给视图grid
                        viewSettingsView.method('moduleConfigView',this.value);
                        //把当前选中的模块ID传给操作grid
                        viewSettingsOperation.method('moduleConfigOperation',this.value);
                        //如果已经获取,则做刷新
                        requestFlag && moduleConfigViewApi.get('update')();
                        requestFlag && moduleConfigOperationApi.get('update')();
                        requestFlag = true;
                    },
                },
                dataList: [{
                    content: '--请选择--',
                    value: '-1',
                    selected: true
                }]
            };
            var getFirstID=res.data[0].id;
            res.data.forEach(function (column) {
                if(getFirstID==column.id){
                    moduleList.dataList.push({
                        content: column.moduleName,//模块名称
                        value: column.id,//模块ID
                        moduleCode: column.moduleCode,
                        selected: true
                    })
                }else{
                    moduleList.dataList.push({
                        content: column.moduleName,//模块名称
                        value: column.id,//模块ID
                        moduleCode: column.moduleCode
                    })
                }
            });
            //console.log(JSON.stringify(moduleList));
            This.$model = moduleList;
        }.bind(this)).send({});
    });

});

//2、顶部tab导航栏(字段-视图-操作)
model('viewSettings-tab', function () {
    this.$model = {
        style: {},
        isGroup: true,
        label: '模块配置',
        tabType: 'flip',//必填.左侧tab切换有两种方式(换页flip/定位location),如果是换页,tabType='flip'
        list: [
            {
                label: "视图",
                className: "active",
                events: {}
            },
            {
                label: "操作",
                className: "",
                events: {}
            }
        ]
    }
});

//3、视图-新增按钮
model('viewSettingsViewBtn',[':viewSettingsViewLayoutAdd'],function(viewSettingsViewLayoutAdd){
    var This = this,
        moduleConfigViewApi;
    this.method('getViewApi',function (api) {
        moduleConfigViewApi = api;
    });
    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'eventModuleConfig',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            'margin-right':'30px',
        },
        list:[
            {
                class:'btn btn-teal', //【必填项】按钮样式
                icon:'iconfont icon-jiahao', //【非必填项】图标
                label:'新增',//【必填项】按钮文字
                align:'left',//【必填项】文字居中
                padding:'6px 24px', //【必填项】按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) { //【必填项】按钮事件

                        var moduleId = document.querySelector("#setModuleID").value;
                        viewSettingsViewLayoutAdd.method('getDropDownViewData',moduleId);
                        //新增弹框
                        var scope = {
                            addFormData:$FRAME.$model(),
                            viewSettingsViewLayoutAdd: viewSettingsViewLayoutAdd,
                        };
                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增视图',//【必填项】dialog标题
                                content: '<form id="addFormData" $-form="addFormData"><form-layout config="viewSettingsViewLayoutAdd"></form-layout></form>',
                                scope:scope,
                                maxmin:true,
                                zoom:'min',
                                filter:{},
                                width:'960px',//【非必填项】dialog宽，不填默认为640px
                                height:'560px;',//【非必填项】dialog高，不填默认为430px
                                btns:[
                                    {
                                        name:'保存',
                                        trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作
                                            //判断是否是数组【列表下拉多选时候，数据处理】
                                            function isArray(field){
                                                if ($FRAME.lib.$type.getType(field) === 'array') {
                                                    return field.join(',').toString();
                                                } else {
                                                    return field;
                                                };
                                            };
                                            //表单校验,保存数据到数据库,局部刷新
                                            if(a.scope.addFormData.valid()){
                                                var addFormData= a.scope.addFormData.getData(),
                                                    saveFormServer = This.server({
                                                        serverType:'api',
                                                        method:'POST',
                                                        url:'addModuleConfigView'
                                                    });
                                                saveFormServer.receive(function (res) {
                                                    if (res.status == "200") {
                                                        //关闭弹窗
                                                        interface.close();
                                                        //提示
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增成功！');
                                                        });
                                                        moduleConfigViewApi.get('update')();
                                                    } else {
                                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                            $message('新增失败！');
                                                        });
                                                    };
                                                }.bind(this)).send({
                                                    "orderType": "desc",//【后期添加】
                                                    "orderCol": "",//【后期添加】
                                                    "viewFormulaIds":isArray(addFormData.viewFormulaIds) ||"", //addFormData.viewFormulaIds.join(",")
                                                    "searchColumns": isArray(addFormData.searchColumns)||"",//"searchColumns",
                                                    "dpEnable": addFormData.dpEnable ||"TRUE",//【必填】"TRUE",
                                                    "description": addFormData.description ||"",//"description",
                                                    "defaultSearchTagId": isArray(addFormData.defaultSearchTagId) ||1,//1,
                                                    "sourceModuleCode":addFormData.sourceModuleCode ||"",// 【后期添加】"sourceModuleCode",
                                                    "viewName": addFormData.viewName ||"",//【必填】"viewName",
                                                    "sourceModuleId":addFormData.sourceModuleId ||1,// 【后期添加】2,
                                                    "isSearch":addFormData.isSearch ||"",// 【后期添加】"isSearch",
                                                    "isBatchAddView":addFormData.isBatchAddView ||1,// 1,
                                                    "viewMarks":isArray(addFormData.viewMarks)||"",//"页面显示标签",
                                                    "requiredCols": isArray(addFormData.requiredCols) ||"",//【必填】"必填字段",
                                                    "viewUrl":addFormData.viewUrl ||"",// "viewUrl",
                                                    "columnAssemble": isArray(addFormData.columnAssemble) ||"",//【必填】"包含字段",
                                                    "layoutType":addFormData.layoutType ||"",// 【后期添加】"layoutType",
                                                    "moduleId":moduleId,// 【必填】
                                                    "showColumns": isArray(addFormData.showColumns) ||"",//【必填】"显示字段",
                                                    "editRelatedModule":isArray(addFormData.editRelatedModule) ||"",// "可修改数据的关联模块字段",
                                                    "dataModules": addFormData.dataModules ||"",//【后期添加】"dataModules",
                                                    "fuzzyQueryCols":isArray(addFormData.fuzzyQueryCols) ||"",// "模糊查询字段",
                                                    "batchAddViewIds": addFormData.batchAddViewIds ||"",//【后期添加】"batchAddViewIds",
                                                    "layoutContent": addFormData.layoutContent ||"",//【后期添加】"layoutContent",
                                                    "searchTag": isArray(addFormData.searchTag)||"",//"searchTag",
                                                    "viewGroups":addFormData.viewGroups ||"",// "viewGroups",
                                                    "flag": 0,
                                                    //TODO：后期需要修改
                                                    "viewSpcShows":null,
                                                    //TODO：后期需要修改
                                                    "batchCtrls":null,
                                                    "viewType": addFormData.viewType ||1,//1,
                                                    "flagCol": addFormData.flagCol ||1,//1,
                                                    "isGroup":addFormData.isGroup ||0, //0、单独页面使用（默认） 1 分组 2、标签页
                                                    "layoutRelation":addFormData.layoutRelation ||"",// "layoutRelation",
                                                    //TODO：后期需要修改
                                                    "viewDataConds":null,
                                                    "dataPermission":addFormData.dataPermission ||"1", //数据权限（1：当前用户 2：当前部门 3：当前部门及下属部门 4：自定义数据权限 5：全部）
                                                });
                                            }else{
                                                //不关闭弹框
                                                return false;
                                            };
                                        },
                                    },
                                    {
                                        name:'保存并布局',
                                        trigger:function (eve,interface) {
                                            interface.close();
                                        }
                                    },
                                ],

                            })
                        });




                        //-----------------------old---------------------------
                        ////新增弹框
                        //$dialog({
                        //    title: '新增视图',//【必填项】dialog标题
                        //    content: '',//【非必填项】dialog内容
                        //    passText:'保存',//【必填项】dialog按钮
                        //    cancelText:'取消',//【必填项】dialog按钮
                        //    width:'700px',//【非必填项】dialog宽，不填默认为640px
                        //    height:'560px;',//【非必填项】dialog高，不填默认为430px
                        //    template:'<form id="addFormData" $-form="addFormData"><form-layout config="viewSettingsViewLayoutAdd"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                        //    scope:scope,
                        //    pass: function () { //【必填项】dialog通过需要进行的操作
                        //        //表单校验,保存数据到数据库,局部刷新
                        //        if(scope.addFormData.valid()){
                        //            var addFormData=scope.addFormData.getData(),
                        //                saveFormServer = This.server({
                        //                    serverType:'api',
                        //                    method:'POST',
                        //                    url:'addModuleConfigView'
                        //                });
                        //            saveFormServer.receive(function (res) {
                        //                //TODO:后期需要调用tip成功组件
                        //                console.log('新增结果',res,'调用tip成功组件');
                        //            }.bind(this)).send({
                        //                "orderType": "desc",//【后期添加】
                        //                "orderCol": "",//【后期添加】
                        //                "viewFormulaIds": addFormData.viewFormulaIds ||"",
                        //                "searchColumns": addFormData.searchColumns ||"",//"searchColumns",
                        //                "dpEnable": addFormData.dpEnable ||"TRUE",//【必填】"TRUE",
                        //                "description": addFormData.description ||"",//"description",
                        //                "defaultSearchTagId": addFormData.defaultSearchTagId ||1,//1,
                        //                "sourceModuleCode":addFormData.sourceModuleCode ||"",// 【后期添加】"sourceModuleCode",
                        //                "viewName": addFormData.viewName ||"",//【必填】"viewName",
                        //                "sourceModuleId":addFormData.sourceModuleId ||1,// 【后期添加】2,
                        //                "isSearch":addFormData.isSearch ||"",// 【后期添加】"isSearch",
                        //                "isBatchAddView":addFormData.isBatchAddView ||1,// 1,
                        //                "viewMarks": addFormData.viewMarks ||"",//"viewMarks",
                        //                "requiredCols": addFormData.requiredCols ||"",//【必填】"requiredCols",
                        //                "viewUrl":addFormData.viewUrl ||"",// "viewUrl",
                        //                "columnAssemble": addFormData.columnAssemble ||"",//【必填】"columnAssemble",
                        //                "layoutType":addFormData.layoutType ||"",// 【后期添加】"layoutType",
                        //                "moduleId":174 ||addFormData.moduleId,// 【必填】174, //TODO：后期需要动态获取
                        //                "showColumns": addFormData.showColumns ||"",//【必填】"showColumns",
                        //                "editRelatedModule":addFormData.editRelatedModule ||"",// "editRelatedModule",
                        //                "dataModules": addFormData.dataModules ||"",//【后期添加】"dataModules",
                        //                "fuzzyQueryCols":addFormData.fuzzyQueryCols ||"",// "fuzzyQueryCols",
                        //                "batchAddViewIds": addFormData.batchAddViewIds ||"",//【后期添加】"batchAddViewIds",
                        //                "layoutContent": addFormData.layoutContent ||"",//【后期添加】"layoutContent",
                        //                "searchTag": addFormData.searchTag ||"",//"searchTag",
                        //                "viewGroups":addFormData.viewGroups ||"",// "viewGroups",
                        //                //TODO：后期需要修改
                        //                "viewSpcShows":null,
                        //                //TODO：后期需要修改
                        //                "batchCtrls":null,
                        //                "viewType": addFormData.viewType ||1,//1,
                        //                "flagCol": addFormData.flagCol ||1,//1,
                        //                "isGroup":addFormData.isGroup ||0, //0、单独页面使用（默认） 1 分组 2、标签页
                        //                "layoutRelation":addFormData.layoutRelation ||"",// "layoutRelation",
                        //                //TODO：后期需要修改
                        //                "viewDataConds":null,
                        //                "dataPermission":addFormData.dataPermission ||"1", //数据权限（1：当前用户 2：当前部门 3：当前部门及下属部门 4：自定义数据权限 5：全部）
                        //            });
                        //        }else{
                        //            //不关闭弹框
                        //            return false;
                        //        }
                        //    },
                        //    cancel: function () {//【必填项】dialog不通过需要进行的操作
                        //    }
                        //});

                        //-----------------------old---------------------------

                    }
                }
            },

        ]
    }]
});

//4、视图-form-layout 新增
model('viewSettingsViewLayoutAdd',['$:@lib/publicData/moduleConfig/queryCurrentModule','$:@lib/publicData/moduleConfig/querySearchField','$:@lib/publicData/moduleConfig/queryViewFormulaSet','$:@lib/publicData/moduleConfig/queryTagByModule'],function (queryCurrentModule,querySearchField,queryViewFormulaSet,queryTagByModule) {
    var This=this;
    var validConfServer = this.server({
        serverType:'jsonp',
        method:'moduleConfigView',
        url:'./serverData/config/form/moduleConfigView.js'
    });
    this.method('getDropDownViewData',function (moduleId) {
    validConfServer.receive(function (res) {
        //--------------------------------不可删---------------------
        //查询当前模块下字段集合
        queryCurrentModule(This,moduleId,[0],function(moduleId){
            //console.log(moduleId,"===moduleId===");
            This.$model.list[2].config.scope.selectColumnAssemble.dataList=[];
            This.$model.list[2].config.scope.selectColumnAssemble.dataList=moduleId;
            This.$model.list[3].config.scope.selectShowColumns.dataList=[];
            This.$model.list[3].config.scope.selectShowColumns.dataList=moduleId;
            This.$model.list[4].config.scope.selectRequiredCols.dataList=[];
            This.$model.list[4].config.scope.selectRequiredCols.dataList=moduleId;
        });

        //查询可搜索字段【可查询字段】
        querySearchField(This,moduleId,[0],function(querySearchField){
            This.$model.list[9].config.scope.selectSearchColumns.dataList=[];
            This.$model.list[9].config.scope.selectSearchColumns.dataList=querySearchField;
        });

        //查询视图公式集合【配置公式】
        queryViewFormulaSet(This,moduleId,[0],function(queryViewFormulaSet){
            //console.log(queryViewFormulaSet,"====queryViewFormulaSet===");
            This.$model.list[6].config.scope.selectViewFormulaIds.dataList=[];
            This.$model.list[6].config.scope.selectViewFormulaIds.dataList=queryViewFormulaSet;
        });

        //查询模块下的查询标签【查询条件】
        queryTagByModule(This,moduleId,[0],function(queryTagByModule){
            //console.log(queryTagByModule,"====查询条件===");
            This.$model.list[11].config.scope.selectSearchTag.dataList=[];
            This.$model.list[11].config.scope.selectSearchTag.dataList=queryTagByModule;
        });

        //查询模块下的查询标签【默认查询条件】
        queryTagByModule(This,moduleId,[0],function(queryTagByModule){
            //console.log(queryTagByModule,"====默认查询条件===");
            This.$model.list[12].config.scope.selectDefaultSearchTagId.dataList=[];
            This.$model.list[12].config.scope.selectDefaultSearchTagId.dataList=queryTagByModule;
        });

        //--------------------------------不可删---------------------
    this.$model={
        scope:{
        },
        filter:{
        },
        list:[
            //【1、视图名称】
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'custom',
                    template:'<input type="text" name="viewName" $-valid="viewName">',
                    scope:{
                        viewName:res.viewName
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
            //【2、视图类型】
            {
                title:'视图类型', //1、列表 2、新增 3、修改 4、详情 5、自定义 6、批量更新 7、批量新增 8、修改【含批量新增明细】
                required:true,
                config:{
                    type:'custom',
                    template:' <select config="selectViewType" $-on:change="selectViewType"></select>',
                    scope:{
                        selectViewType:{
                            name:'viewType',
                            //search:true,
                            //multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                    //【1、列表】
                                    if(val==1){
                                        //3、包含字段
                                        columnAssembleHidden.hidden=true;
                                        //4、显示字段
                                        showColumnsHidden.hidden=true;
                                        //5、必填字段
                                        requiredColsHidden.hidden=true;
                                        //6、可修改数据关联模块
                                        editRelatedModuleHidden.hidden=true;
                                        //7、配置公式
                                        viewFormulaIdsHidden.hidden=true;
                                        //8、页面显示标签
                                        viewMarksHidden.hidden=true;
                                        //9、使用批量新增
                                        isBatchAddViewHidden.hidden=true;
                                        //10、可查询字段
                                        searchColumnsHidden.hidden=false;
                                        //11、模糊查询字段
                                        fuzzyQueryColsHidden.hidden=false;
                                        //12、查询条件
                                        searchTagHidden.hidden=false;
                                        //13、默认查询条件
                                        defaultSearchTagIdHidden.hidden=true;
                                        //14、特殊显示配置
                                        specialConfigurationHidden.hidden=true;
                                        //15、启用数据权限
                                        dpEnableHidden.hidden=true;
                                        //16、自定义URL
                                        viewUrlHidden.hidden=true;
                                        //18、移动端显示字段
                                        mobileShowColumnsHidden.hidden=false;
                                        //19、标题字段
                                        mobileListTitleHidden.hidden=false;
                                        //20、副标题字段
                                        mobileListCaptionsHidden.hidden=false;
                                        //21、批量新增视图选择
                                        BatchAddViewIdsHidden.hidden=true;

                                    }else if(val==2){    //【2、新增】
                                        //3、包含字段
                                        columnAssembleHidden.hidden=false;
                                        //4、显示字段
                                        showColumnsHidden.hidden=false;
                                        //5、必填字段
                                        requiredColsHidden.hidden=false;
                                        //6、可修改数据关联模块
                                        editRelatedModuleHidden.hidden=false;
                                        //7、配置公式
                                        viewFormulaIdsHidden.hidden=false;
                                        //8、页面显示标签
                                        viewMarksHidden.hidden=true;
                                        //9、使用批量新增
                                        isBatchAddViewHidden.hidden=true;
                                        //10、可查询字段
                                        searchColumnsHidden.hidden=true;
                                        //11、模糊查询字段
                                        fuzzyQueryColsHidden.hidden=true;
                                        //12、查询条件
                                        searchTagHidden.hidden=true;
                                        //13、默认查询条件
                                        defaultSearchTagIdHidden.hidden=true;
                                        //14、特殊显示配置
                                        specialConfigurationHidden.hidden=true;
                                        //15、启用数据权限
                                        dpEnableHidden.hidden=true;
                                        //16、自定义URL
                                        viewUrlHidden.hidden=true;
                                        //18、移动端显示字段
                                        mobileShowColumnsHidden.hidden=true;
                                        //19、标题字段
                                        mobileListTitleHidden.hidden=true;
                                        //20、副标题字段
                                        mobileListCaptionsHidden.hidden=true;
                                        //21、批量新增视图选择
                                        BatchAddViewIdsHidden.hidden=true;

                                    }else if(val==3){ //【3、修改】
                                        //3、包含字段
                                        columnAssembleHidden.hidden=false;
                                        //4、显示字段
                                        showColumnsHidden.hidden=false;
                                        //5、必填字段
                                        requiredColsHidden.hidden=false;
                                        //6、可修改数据关联模块
                                        editRelatedModuleHidden.hidden=false;
                                        //7、配置公式
                                        viewFormulaIdsHidden.hidden=false;
                                        //8、页面显示标签
                                        viewMarksHidden.hidden=false;
                                        //9、使用批量新增
                                        isBatchAddViewHidden.hidden=true;
                                        //10、可查询字段
                                        searchColumnsHidden.hidden=true;
                                        //11、模糊查询字段
                                        fuzzyQueryColsHidden.hidden=true;
                                        //12、查询条件
                                        searchTagHidden.hidden=true;
                                        //13、默认查询条件
                                        defaultSearchTagIdHidden.hidden=true;
                                        //14、特殊显示配置
                                        specialConfigurationHidden.hidden=true;
                                        //15、启用数据权限
                                        dpEnableHidden.hidden=true;
                                        //16、自定义URL
                                        viewUrlHidden.hidden=true;
                                        //18、移动端显示字段
                                        mobileShowColumnsHidden.hidden=true;
                                        //19、标题字段
                                        mobileListTitleHidden.hidden=true;
                                        //20、副标题字段
                                        mobileListCaptionsHidden.hidden=true;
                                        //21、批量新增视图选择
                                        BatchAddViewIdsHidden.hidden=true;

                                    }else if(val==4){//【4、详情】
                                        //3、包含字段
                                        columnAssembleHidden.hidden=false;
                                        //4、显示字段
                                        showColumnsHidden.hidden=false;
                                        //5、必填字段
                                        requiredColsHidden.hidden=false;
                                        //6、可修改数据关联模块
                                        editRelatedModuleHidden.hidden=true;
                                        //7、配置公式
                                        viewFormulaIdsHidden.hidden=true;
                                        //8、页面显示标签
                                        viewMarksHidden.hidden=false;
                                        //9、使用批量新增
                                        isBatchAddViewHidden.hidden=true;
                                        //10、可查询字段
                                        searchColumnsHidden.hidden=true;
                                        //11、模糊查询字段
                                        fuzzyQueryColsHidden.hidden=true;
                                        //12、查询条件
                                        searchTagHidden.hidden=true;
                                        //13、默认查询条件
                                        defaultSearchTagIdHidden.hidden=true;
                                        //14、特殊显示配置
                                        specialConfigurationHidden.hidden=true;
                                        //15、启用数据权限
                                        dpEnableHidden.hidden=true;
                                        //16、自定义URL
                                        viewUrlHidden.hidden=true;
                                        //18、移动端显示字段
                                        mobileShowColumnsHidden.hidden=true;
                                        //19、标题字段
                                        mobileListTitleHidden.hidden=false;
                                        //20、副标题字段
                                        mobileListCaptionsHidden.hidden=false;
                                        //21、批量新增视图选择
                                        BatchAddViewIdsHidden.hidden=true;

                                    }else if(val==5){//【5、自定义】
                                        //3、包含字段
                                        columnAssembleHidden.hidden=true;
                                        //4、显示字段
                                        showColumnsHidden.hidden=true;
                                        //5、必填字段
                                        requiredColsHidden.hidden=true;
                                        //6、可修改数据关联模块
                                        editRelatedModuleHidden.hidden=true;
                                        //7、配置公式
                                        viewFormulaIdsHidden.hidden=true;
                                        //8、页面显示标签
                                        viewMarksHidden.hidden=true;
                                        //9、使用批量新增
                                        isBatchAddViewHidden.hidden=true;
                                        //10、可查询字段
                                        searchColumnsHidden.hidden=true;
                                        //11、模糊查询字段
                                        fuzzyQueryColsHidden.hidden=true;
                                        //12、查询条件
                                        searchTagHidden.hidden=true;
                                        //13、默认查询条件
                                        defaultSearchTagIdHidden.hidden=true;
                                        //14、特殊显示配置
                                        specialConfigurationHidden.hidden=true;
                                        //15、启用数据权限
                                        dpEnableHidden.hidden=true;
                                        //16、自定义URL
                                        viewUrlHidden.hidden=false;
                                        //18、移动端显示字段
                                        mobileShowColumnsHidden.hidden=true;
                                        //19、标题字段
                                        mobileListTitleHidden.hidden=true;
                                        //20、副标题字段
                                        mobileListCaptionsHidden.hidden=true;
                                        //21、批量新增视图选择
                                        BatchAddViewIdsHidden.hidden=true;
                                    }else if(val==7 ) {//【7、批量新增 】
                                        //3、包含字段
                                        columnAssembleHidden.hidden=false;
                                        //4、显示字段
                                        showColumnsHidden.hidden=false;
                                        //5、必填字段
                                        requiredColsHidden.hidden=false;
                                        //6、可修改数据关联模块
                                        editRelatedModuleHidden.hidden=false;
                                        //7、配置公式
                                        viewFormulaIdsHidden.hidden=false;
                                        //8、页面显示标签
                                        viewMarksHidden.hidden=true;
                                        //9、使用批量新增
                                        isBatchAddViewHidden.hidden=true;
                                        //10、可查询字段
                                        searchColumnsHidden.hidden=true;
                                        //11、模糊查询字段
                                        fuzzyQueryColsHidden.hidden=true;
                                        //12、查询条件
                                        searchTagHidden.hidden=true;
                                        //13、默认查询条件
                                        defaultSearchTagIdHidden.hidden=true;
                                        //14、特殊显示配置
                                        specialConfigurationHidden.hidden=true;
                                        //15、启用数据权限
                                        dpEnableHidden.hidden=true;
                                        //16、自定义URL
                                        viewUrlHidden.hidden=true;
                                        //18、移动端显示字段
                                        mobileShowColumnsHidden.hidden=true;
                                        //19、标题字段
                                        mobileListTitleHidden.hidden=true;
                                        //20、副标题字段
                                        mobileListCaptionsHidden.hidden=true;
                                        //21、批量新增视图选择
                                        BatchAddViewIdsHidden.hidden=false;

                                    }
                                }
                            },
                            dataList:[
                                {
                                    content:'列表',
                                    value:'1',
                                    selected:true
                                },
                                {
                                    content:'新增',
                                    value:'2',
                                },
                                {
                                    content:'修改',
                                    value:'3',
                                },
                                {
                                    content:'详情',
                                    value:'4',
                                },
                                {
                                    content:'自定义',
                                    value:'5',
                                },
                                {
                                    content:'批量新增',
                                    value:'7',
                                },
                            ]
                        }
                    }
                },
                show:true
            },
            //【3、包含字段】
            columnAssembleHidden={
                title:'包含字段',   //1、REDIRECT：页面跳转  2、CURRENT: 刷新当前页  3、GOBACK: 返回上一步  4、FLUSHLIST: 刷新当前列表  5、NO:不操作
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectColumnAssemble" $-on:change="selectColumnAssemble"></select>',
                    scope:{
                        selectColumnAssemble:{
                            name:'columnAssemble',
                            //search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                }
                            },
                            dataList:[
                                {
                                    content:'--请选择--',
                                    value:'-1',
                                },
                            ]
                        }
                    }
                },
                hidden:true
            },
            //[4、显示字段]
            showColumnsHidden={
                title:'显示字段',  //0、页面顶部  1、查询列表中
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectShowColumns" $-on:change="selectShowColumns"></select>',
                    scope:{
                        selectShowColumns:{
                            name:'showColumns',
                            search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'id',
                                    value:'1',
                                },
                                {
                                    content:'创建时间',
                                    value:'2',
                                },
                                {
                                    content:'创建人',
                                    value:'2',
                                },
                            ]
                        }
                    }
                },
                hidden:true
            },
            //【5、必填字段】
            requiredColsHidden={
                title:'必填字段 ',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectRequiredCols" $-on:change="selectRequiredCols"></select>',
                    scope:{
                        selectRequiredCols:{
                            name:'requiredCols',
                            search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'--请选择--',
                                    value:'-1',
                                },
                            ]
                        }
                    }
                },
                hidden:true
            },
            //【6、可修改数据关联模块】
            editRelatedModuleHidden={
                title:'可修改数据关联模块 ',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectEditRelatedModule" $-on:change="selectEditRelatedModule"></select>',
                    scope:{
                        selectEditRelatedModule:{
                            name:'editRelatedModule',
                            search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'id',
                                    value:'1',
                                },
                                {
                                    content:'创建时间',
                                    value:'2',
                                },
                                {
                                    content:'创建人',
                                    value:'2',
                                },
                            ]
                        }
                    }
                },
                hidden:true
            },
            //【7、配置公式 】
            viewFormulaIdsHidden={
                title:'配置公式 ',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectViewFormulaIds" $-on:change="selectViewFormulaIds"></select>',
                    scope:{
                        selectViewFormulaIds:{
                            name:'viewFormulaIds',
                            //search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'--请选择--',
                                    value:'-1',
                                },
                            ]
                        }
                    }
                },
                hidden:true
            },
            //【8、页面显示标签】
            viewMarksHidden={
                title:'页面显示标签',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectViewMarks" $-on:change="selectViewMarks"></select>',
                    scope:{
                        selectViewMarks:{
                            name:'viewMarks',
                            search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'id',
                                    value:'1',
                                },
                                {
                                    content:'创建时间',
                                    value:'2',
                                },
                                {
                                    content:'创建人',
                                    value:'2',
                                },
                            ]
                        }
                    }
                },
                hidden:true
            },
            //【9、使用批量新增】
            isBatchAddViewHidden={
                title:'使用批量新增',
                required:false,
                class:'clos-all',
                config:{
                    type:'custom',
                    name:'isBatchAddView  ',
                    template:'<input type="radio" name="isBatchAddView" value="0" checked $-on:change="events.change" >否<input type="radio" name="isBatchAddView" value="1" $-on:change="events.change"  style="margin-left: 15px">是',
                    scope:{
                        events:{
                            change:function(){
                                console.log(this)
                            }
                        }
                    }
                },
                hidden:true
            },
            //【10、可查询字段】
            searchColumnsHidden={
                title:'可查询字段',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectSearchColumns" $-on:change="selectSearchColumns"></select>',
                    scope:{
                        selectSearchColumns:{
                            name:'searchColumns',
                            //search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'--请选择--',
                                    value:'-1',
                                },
                            ]
                        }
                    }
                },
                hidden:false
            },
            //【11、模糊查询字段】
            fuzzyQueryColsHidden={
                title:'模糊查询字段',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectFuzzyQueryCols" $-on:change="selectFuzzyQueryCols"></select>',
                    scope:{
                        selectFuzzyQueryCols:{
                            name:'fuzzyQueryCols',
                            search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'id',
                                    value:'1',
                                },
                                {
                                    content:'创建时间',
                                    value:'2',
                                },
                                {
                                    content:'创建人',
                                    value:'2',
                                },
                            ]
                        }
                    }
                },
                hidden:false
            },
            //【12、查询条件】
            searchTagHidden={
                title:'查询条件',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectSearchTag" $-on:change="selectSearchTag"></select>',
                    scope:{
                        selectSearchTag:{
                            name:'searchTag',
                            //search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'--请选择--',
                                    value:'-1',
                                },
                            ]
                        }
                    }
                },
                hidden:true
            },
            //【13、默认查询条件】    //???????默认只能选择一个
            defaultSearchTagIdHidden={
                title:'默认查询条件',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectDefaultSearchTagId" $-on:change="selectDefaultSearchTagId"></select>',
                    scope:{
                        selectDefaultSearchTagId:{
                            name:'defaultSearchTagId',
                            search:false,
                            multiple:false,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'--请选择--',
                                    value:'-1',
                                }
                            ]
                        }
                    }
                },
                hidden:true
            },
            //【14、特殊显示配置】
            specialConfigurationHidden={
                title:'特殊显示配置',
                required:false,
                config:{
                    type:'custom',
                    name:'specialConfiguration',
                    template:'<span name="specialConfiguration" $-on:click="isHideSpecialConfiguration">点击添加特殊显示配置</span>',
                    scope:{
                        isHideSpecialConfiguration:function(){
                            document.querySelector('.addSpecialDisplay').style.display="block";
                        }
                    }
                },
                hidden:true
            },
            //【15、启用数据权限】       // TRUE、启用 FALSE、未启用
            dpEnableHidden={
                title:'启用数据权限',
                required:true,
                //class:'clos-all',
                config:{
                    type:'custom',
                    name:'dpEnable',
                    template:'<input type="radio" name="dpEnable" value="TRUE" checked $-on:change="events.change" >启用<input type="radio" name="dpEnable" value="FALSE" $-on:change="events.change"  style="margin-left: 15px">未启用',
                    scope:{
                        events:{
                            change:function(){
                                console.log(this)
                            }
                        }
                    }
                },
                hidden:false
            },
            //【16、自定义URL】
            viewUrlHidden={
                title:'自定义URL',
                required:false,
                config:{
                    type:'custom',
                    template:'<input type="text" name="viewUrl" $-valid="validUrl">',
                    scope:{
                        validUrl:res.viewUrl //数据校验
                    },
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                hidden:true
            },
            //【18、移动端显示字段】
            mobileShowColumnsHidden={
                title:'移动端显示字段',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectMobileShowColumns" $-on:change="selectMobileShowColumns"></select>',
                    scope:{
                        selectMobileShowColumns:{
                            name:'mobileShowColumns',
                            search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'创建时间',
                                    value:'1',
                                },
                                {
                                    content:'企业编码',
                                    value:'2',
                                },
                                {
                                    content:'最后更新时间',
                                    value:'3',
                                },
                            ]
                        }
                    }
                },
                hidden:false
            },
             //【19、标题字段】
            mobileListTitleHidden={
                title:'标题字段',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectMobileListTitle" $-on:change="selectMobileListTitle"></select>',
                    scope:{
                        selectMobileListTitle:{
                            name:'mobileListTitle',
                            search:false,
                            multiple:false,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'企业编码',
                                    value:'1',
                                },
                                {
                                    content:'创建时间',
                                    value:'2',
                                },
                                {
                                    content:'最后更新时间',
                                    value:'3',
                                },
                            ]
                        }
                    }
                },
                hidden:false
            },
            //【20、副标题字段】
            mobileListCaptionsHidden={
                title:'副标题字段',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectMobileListCaptions" $-on:change="selectMobileListCaptions"></select>',
                    scope:{
                        selectMobileListCaptions:{
                            name:'mobileListCaptions',
                            search:false,
                            multiple:false,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'企业编码',
                                    value:'1',
                                },
                                {
                                    content:'创建时间',
                                    value:'2',
                                },
                                {
                                    content:'最后更新时间',
                                    value:'3',
                                },
                            ]
                        }
                    }
                },
                hidden:false
            },
            //【21、批量新增视图选择】
            BatchAddViewIdsHidden={
                title:'批量新增视图选择',
                required:false,
                config:{
                    type:'custom',
                    template:' <select config="selectBatchAddViewIds" $-on:change="selectBatchAddViewIds"></select>',
                    scope:{
                        selectBatchAddViewIds:{
                            name:'BatchAddViewIds',
                            search:true,
                            multiple:true,
                            style:{
                            },
                            events:{
                                change:function () {
                                    console.log(this.value);
                                    var val=this.value;
                                }
                            },
                            dataList:[
                                {
                                    content:'创建时间',
                                    value:'1',
                                },
                                {
                                    content:'企业编码',
                                    value:'2',
                                },
                                {
                                    content:'最后更新时间',
                                    value:'3',
                                },
                            ]
                        }
                    }
                },
                hidden:true
            },
            //【17、描述】
            {
                title:'描述',
                required:false,
                class:'clos-all',
                config:{
                    type:'custom',
                    name:'description',
                    template:'<textarea name="description" rows="3" cols="20"></textarea>',
                    scope:{
                    }
                }
            },
        ]
    }
    }.bind(this)).send();
    }.bind(this));
});

//5、视图-form-layout 编辑
model('viewSettingsViewLayoutEdit',['$:@lib/publicData/moduleConfig/queryCurrentModule','$:@lib/publicData/moduleConfig/querySearchField','$:@lib/publicData/moduleConfig/queryViewFormulaSet','$:@lib/publicData/moduleConfig/queryTagByModule'],function (queryCurrentModule,querySearchField,queryViewFormulaSet,queryTagByModule) {
    var This=this;
    var menuServer=this.server({
        serverType:'api',//如果是访问接口,这里是api,其他的则是http
        method:'POST',
        url:'querySingleView'
    });
    this.method('getviewSettingsViewData',function (rowId,moduleId) {
        menuServer.receive(function (res,xhr) {
            console.log(res.data,"查询单个视图");
    var validConfServer = this.server({
        serverType:'jsonp',
        method:'moduleConfigView',
        url:'./serverData/config/form/moduleConfigView.js'
    });

    validConfServer.receive(function (resValid) {

        //--------------------------------不可删---------------------
        //数组去重
        function deleteRepetion(arr){
            var arrTable = {},arrData = [];
            for (var i = 0; i < arr.length; i++) {
                if( !arrTable[ arr[i] ]){
                    arrTable[ arr[i] ] = true;
                    arrData.push(arr[i])
                }
            }
            return arrData;
        };

        //包含字段
        var columnAssemble=res.data.columnAssemble.split(",");
        //查询当前模块下字段集合【包含字段】
        queryCurrentModule(This,moduleId,deleteRepetion(columnAssemble),function(moduleId){
            //包含字段
            This.$model.list[2].config.scope.selectColumnAssemble.dataList=[];
            This.$model.list[2].config.scope.selectColumnAssemble.dataList=moduleId;
        });

        //显示字段
        var showColumns=res.data.showColumns.split(",");
        //查询当前模块下字段集合【显示字段】
        queryCurrentModule(This,moduleId,deleteRepetion(showColumns),function(moduleId){
            //显示字段
            This.$model.list[3].config.scope.selectShowColumns.dataList=[];
            This.$model.list[3].config.scope.selectShowColumns.dataList=moduleId;
        });

        //必填字段
        var requiredCols=res.data.requiredCols.split(",");
        //查询当前模块下字段集合【必填字段】
        queryCurrentModule(This,moduleId,deleteRepetion(requiredCols),function(moduleId){
            //必填字段
            This.$model.list[4].config.scope.selectRequiredCols.dataList=[];
            This.$model.list[4].config.scope.selectRequiredCols.dataList=moduleId;
        });

        //查询可搜索字段
        var searchColumns=res.data.searchColumns.split(",");
        querySearchField(This,moduleId,deleteRepetion(searchColumns),function(querySearchField){
            This.$model.list[9].config.scope.selectSearchColumns.dataList=[];
            This.$model.list[9].config.scope.selectSearchColumns.dataList=querySearchField;
        });

        //查询视图公式集合【配置公式】
        var viewFormulaIds=res.data.viewFormulaIds.split(",");
        queryViewFormulaSet(This,moduleId,deleteRepetion(viewFormulaIds),function(queryViewFormulaSet){
            This.$model.list[6].config.scope.selectViewFormulaIds.dataList=[];
            This.$model.list[6].config.scope.selectViewFormulaIds.dataList=queryViewFormulaSet;

            //视图类型
            var val=  res.data.viewType;
            //【1、列表】
            if(val==1){
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="1";
                This.$model.list[1].config.scope.viewTypeName="列表";
                //3、包含字段
                columnAssembleHidden.hidden=true;
                //4、显示字段
                showColumnsHidden.hidden=true;
                //5、必填字段
                requiredColsHidden.hidden=true;
                //6、可修改数据关联模块
                editRelatedModuleHidden.hidden=true;
                //7、配置公式
                viewFormulaIdsHidden.hidden=true;
                //8、页面显示标签
                viewMarksHidden.hidden=true;
                //9、使用批量新增
                isBatchAddViewHidden.hidden=true;
                //10、可查询字段
                searchColumnsHidden.hidden=false;
                //11、模糊查询字段
                fuzzyQueryColsHidden.hidden=false;
                //12、查询条件
                searchTagHidden.hidden=false;
                //13、默认查询条件
                defaultSearchTagIdHidden.hidden=true;
                //14、特殊显示配置
                specialConfigurationHidden.hidden=true;
                //15、启用数据权限
                dpEnableHidden.hidden=true;
                //16、自定义URL
                viewUrlHidden.hidden=true;
                //18、移动端显示字段
                mobileShowColumnsHidden.hidden=false;
                //19、标题字段
                mobileListTitleHidden.hidden=false;
                //20、副标题字段
                mobileListCaptionsHidden.hidden=false;
                //21、批量新增视图选择
                BatchAddViewIdsHidden.hidden=true;

            }else if(val==2){    //【2、新增】
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="2";
                This.$model.list[1].config.scope.viewTypeName="新增";
                //3、包含字段
                columnAssembleHidden.hidden=false;
                //4、显示字段
                showColumnsHidden.hidden=false;
                //5、必填字段
                requiredColsHidden.hidden=false;
                //6、可修改数据关联模块
                editRelatedModuleHidden.hidden=false;
                //7、配置公式
                viewFormulaIdsHidden.hidden=false;
                //8、页面显示标签
                viewMarksHidden.hidden=true;
                //9、使用批量新增
                isBatchAddViewHidden.hidden=true;
                //10、可查询字段
                searchColumnsHidden.hidden=true;
                //11、模糊查询字段
                fuzzyQueryColsHidden.hidden=true;
                //12、查询条件
                searchTagHidden.hidden=true;
                //13、默认查询条件
                defaultSearchTagIdHidden.hidden=true;
                //14、特殊显示配置
                specialConfigurationHidden.hidden=true;
                //15、启用数据权限
                dpEnableHidden.hidden=true;
                //16、自定义URL
                viewUrlHidden.hidden=true;
                //18、移动端显示字段
                mobileShowColumnsHidden.hidden=true;
                //19、标题字段
                mobileListTitleHidden.hidden=true;
                //20、副标题字段
                mobileListCaptionsHidden.hidden=true;
                //21、批量新增视图选择
                BatchAddViewIdsHidden.hidden=true;

            }else if(val==3){ //【3、修改】
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="3";
                This.$model.list[1].config.scope.viewTypeName="修改";
                //3、包含字段
                columnAssembleHidden.hidden=false;
                //4、显示字段
                showColumnsHidden.hidden=false;
                //5、必填字段
                requiredColsHidden.hidden=false;
                //6、可修改数据关联模块
                editRelatedModuleHidden.hidden=false;
                //7、配置公式
                viewFormulaIdsHidden.hidden=false;
                //8、页面显示标签
                viewMarksHidden.hidden=false;
                //9、使用批量新增
                isBatchAddViewHidden.hidden=true;
                //10、可查询字段
                searchColumnsHidden.hidden=true;
                //11、模糊查询字段
                fuzzyQueryColsHidden.hidden=true;
                //12、查询条件
                searchTagHidden.hidden=true;
                //13、默认查询条件
                defaultSearchTagIdHidden.hidden=true;
                //14、特殊显示配置
                specialConfigurationHidden.hidden=true;
                //15、启用数据权限
                dpEnableHidden.hidden=true;
                //16、自定义URL
                viewUrlHidden.hidden=true;
                //18、移动端显示字段
                mobileShowColumnsHidden.hidden=true;
                //19、标题字段
                mobileListTitleHidden.hidden=true;
                //20、副标题字段
                mobileListCaptionsHidden.hidden=true;
                //21、批量新增视图选择
                BatchAddViewIdsHidden.hidden=true;

            }else if(val==4){//【4、详情】
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="4";
                This.$model.list[1].config.scope.viewTypeName="详情";
                //3、包含字段
                columnAssembleHidden.hidden=false;
                //4、显示字段
                showColumnsHidden.hidden=false;
                //5、必填字段
                requiredColsHidden.hidden=false;
                //6、可修改数据关联模块
                editRelatedModuleHidden.hidden=true;
                //7、配置公式
                viewFormulaIdsHidden.hidden=true;
                //8、页面显示标签
                viewMarksHidden.hidden=false;
                //9、使用批量新增
                isBatchAddViewHidden.hidden=true;
                //10、可查询字段
                searchColumnsHidden.hidden=true;
                //11、模糊查询字段
                fuzzyQueryColsHidden.hidden=true;
                //12、查询条件
                searchTagHidden.hidden=true;
                //13、默认查询条件
                defaultSearchTagIdHidden.hidden=true;
                //14、特殊显示配置
                specialConfigurationHidden.hidden=true;
                //15、启用数据权限
                dpEnableHidden.hidden=true;
                //16、自定义URL
                viewUrlHidden.hidden=true;
                //18、移动端显示字段
                mobileShowColumnsHidden.hidden=true;
                //19、标题字段
                mobileListTitleHidden.hidden=false;
                //20、副标题字段
                mobileListCaptionsHidden.hidden=false;
                //21、批量新增视图选择
                BatchAddViewIdsHidden.hidden=true;

            }else if(val==5){//【5、自定义】
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="5";
                This.$model.list[1].config.scope.viewTypeName="自定义";
                //3、包含字段
                columnAssembleHidden.hidden=true;
                //4、显示字段
                showColumnsHidden.hidden=true;
                //5、必填字段
                requiredColsHidden.hidden=true;
                //6、可修改数据关联模块
                editRelatedModuleHidden.hidden=true;
                //7、配置公式
                viewFormulaIdsHidden.hidden=true;
                //8、页面显示标签
                viewMarksHidden.hidden=true;
                //9、使用批量新增
                isBatchAddViewHidden.hidden=true;
                //10、可查询字段
                searchColumnsHidden.hidden=true;
                //11、模糊查询字段
                fuzzyQueryColsHidden.hidden=true;
                //12、查询条件
                searchTagHidden.hidden=true;
                //13、默认查询条件
                defaultSearchTagIdHidden.hidden=true;
                //14、特殊显示配置
                specialConfigurationHidden.hidden=true;
                //15、启用数据权限
                dpEnableHidden.hidden=true;
                //16、自定义URL
                viewUrlHidden.hidden=false;
                //18、移动端显示字段
                mobileShowColumnsHidden.hidden=true;
                //19、标题字段
                mobileListTitleHidden.hidden=true;
                //20、副标题字段
                mobileListCaptionsHidden.hidden=true;
                //21、批量新增视图选择
                BatchAddViewIdsHidden.hidden=true;
            }else if(val==7 ) {//【7、批量新增 】
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="7";
                This.$model.list[1].config.scope.viewTypeName="批量新增";
                //3、包含字段
                columnAssembleHidden.hidden=false;
                //4、显示字段
                showColumnsHidden.hidden=false;
                //5、必填字段
                requiredColsHidden.hidden=false;
                //6、可修改数据关联模块
                editRelatedModuleHidden.hidden=false;
                //7、配置公式
                viewFormulaIdsHidden.hidden=false;
                //8、页面显示标签
                viewMarksHidden.hidden=true;
                //9、使用批量新增
                isBatchAddViewHidden.hidden=true;
                //10、可查询字段
                searchColumnsHidden.hidden=true;
                //11、模糊查询字段
                fuzzyQueryColsHidden.hidden=true;
                //12、查询条件
                searchTagHidden.hidden=true;
                //13、默认查询条件
                defaultSearchTagIdHidden.hidden=true;
                //14、特殊显示配置
                specialConfigurationHidden.hidden=true;
                //15、启用数据权限
                dpEnableHidden.hidden=true;
                //16、自定义URL
                viewUrlHidden.hidden=true;
                //18、移动端显示字段
                mobileShowColumnsHidden.hidden=true;
                //19、标题字段
                mobileListTitleHidden.hidden=true;
                //20、副标题字段
                mobileListCaptionsHidden.hidden=true;
                //21、批量新增视图选择
                BatchAddViewIdsHidden.hidden=false;
            }
        });

        //查询模块下的查询标签【查询条件】
        var searchTag=res.data.searchTag.split(",");
        queryTagByModule(This,moduleId,deleteRepetion(searchTag),function(queryTagByModule){
            This.$model.list[11].config.scope.selectSearchTag.dataList=[];
            This.$model.list[11].config.scope.selectSearchTag.dataList=queryTagByModule;
        });

        //查询模块下的查询标签【默认查询条件】
        var defaultSearchTagId=res.data.defaultSearchTagId;
        queryTagByModule(This,moduleId,defaultSearchTagId,function(queryTagByModule){
            This.$model.list[12].config.scope.selectDefaultSearchTagId.dataList=[];
            This.$model.list[12].config.scope.selectDefaultSearchTagId.dataList=queryTagByModule;
        });
        //--------------------------------不可删--------------------

        this.$model={
            scope:{
            },
            filter:{
            },
            list:[
                //【1、视图名称】
                {
                    title:'视图名称',
                    required:true,
                    config:{
                        type:'custom',
                        template:'<input type="text" name="viewName" $-bind:value="name" $-valid="viewName">',
                        scope:{
                            name:res.data.viewName,//后台获取数据
                            viewName:resValid.viewName //数据校验
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
                //【2、视图类型】
                {
                    title:'视图类型', //1、列表 2、新增 3、修改 4、详情 5、自定义 6、批量更新 7、批量新增 8、修改【含批量新增明细】
                    required:true,
                    config:{
                        type:'custom',
                        template:'<input type="text" name="viewType" $-bind:value="viewTypeValue" style="display:none"  /><input type="text"  $-bind:value="viewTypeName" disabled />',
                        scope:{
                            viewTypeValue:"",
                            viewTypeName:"",
                        }
                    },
                    show:true
                },
                //【3、包含字段】
                columnAssembleHidden={
                    title:'包含字段',   //1、REDIRECT：页面跳转  2、CURRENT: 刷新当前页  3、GOBACK: 返回上一步  4、FLUSHLIST: 刷新当前列表  5、NO:不操作
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectColumnAssemble" $-on:change="selectColumnAssemble"></select>',
                        scope:{
                            selectColumnAssemble:{
                                name:'columnAssemble',
                                //search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                    }
                                },
                                dataList:[
                                    {
                                        content:'--请选择--',
                                        value:'-1',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //[4、显示字段]
                showColumnsHidden={
                    title:'显示字段',  //0、页面顶部  1、查询列表中
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectShowColumns" $-on:change="selectShowColumns"></select>',
                        scope:{
                            selectShowColumns:{
                                name:'showColumns',
                                search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'id',
                                        value:'1',
                                    },
                                    {
                                        content:'创建时间',
                                        value:'2',
                                    },
                                    {
                                        content:'创建人',
                                        value:'2',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //【5、必填字段】
                requiredColsHidden={
                    title:'必填字段 ',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectRequiredCols" $-on:change="selectRequiredCols"></select>',
                        scope:{
                            selectRequiredCols:{
                                name:'requiredCols',
                                search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'--请选择--',
                                        value:'-1',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //【6、可修改数据关联模块】
                editRelatedModuleHidden={
                    title:'可修改数据关联模块 ',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectEditRelatedModule" $-on:change="selectEditRelatedModule"></select>',
                        scope:{
                            selectEditRelatedModule:{
                                name:'editRelatedModule',
                                search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'id',
                                        value:'1',
                                    },
                                    {
                                        content:'创建时间',
                                        value:'2',
                                    },
                                    {
                                        content:'创建人',
                                        value:'2',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //【7、配置公式 】
                viewFormulaIdsHidden={
                    title:'配置公式 ',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectViewFormulaIds" $-on:change="selectViewFormulaIds"></select>',
                        scope:{
                            selectViewFormulaIds:{
                                name:'viewFormulaIds',
                                //search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'--请选择--',
                                        value:'-1',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //【8、页面显示标签】
                viewMarksHidden={
                    title:'页面显示标签',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectViewMarks" $-on:change="selectViewMarks"></select>',
                        scope:{
                            selectViewMarks:{
                                name:'viewMarks',
                                search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'id',
                                        value:'1',
                                    },
                                    {
                                        content:'创建时间',
                                        value:'2',
                                    },
                                    {
                                        content:'创建人',
                                        value:'2',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //【9、使用批量新增】
                isBatchAddViewHidden={
                    title:'使用批量新增',
                    required:false,
                    class:'clos-all',
                    config:{
                        type:'custom',
                        name:'isBatchAddView  ',
                        template:'<input type="radio" name="isBatchAddView" value="0" checked $-on:change="events.change" >否<input type="radio" name="isBatchAddView" value="1" $-on:change="events.change"  style="margin-left: 15px">是',
                        scope:{
                            events:{
                                change:function(){
                                    console.log(this)
                                }
                            }
                        }
                    },
                    hidden:true
                },
                //【10、可查询字段】
                searchColumnsHidden={
                    title:'可查询字段',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectSearchColumns" $-on:change="selectSearchColumns"></select>',
                        scope:{
                            selectSearchColumns:{
                                name:'searchColumns',
                                //search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'--请选择--',
                                        value:'-1',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:false
                },
                //【11、模糊查询字段】
                fuzzyQueryColsHidden={
                    title:'模糊查询字段',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectFuzzyQueryCols" $-on:change="selectFuzzyQueryCols"></select>',
                        scope:{
                            selectFuzzyQueryCols:{
                                name:'fuzzyQueryCols',
                                search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'id',
                                        value:'1',
                                    },
                                    {
                                        content:'创建时间',
                                        value:'2',
                                    },
                                    {
                                        content:'创建人',
                                        value:'2',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:false
                },
                //【12、查询条件】
                searchTagHidden={
                    title:'查询条件',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectSearchTag" $-on:change="selectSearchTag"></select>',
                        scope:{
                            selectSearchTag:{
                                name:'searchTag',
                                //search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'--请选择--',
                                        value:'-1',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //【13、默认查询条件】    //???????默认只能选择一个
                defaultSearchTagIdHidden={
                    title:'默认查询条件',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectDefaultSearchTagId" $-on:change="selectDefaultSearchTagId"></select>',
                        scope:{
                            selectDefaultSearchTagId:{
                                name:'defaultSearchTagId',
                                search:false,
                                multiple:false,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'--请选择--',
                                        value:'-1',
                                    }
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //【14、特殊显示配置】
                specialConfigurationHidden={
                    title:'特殊显示配置',
                    required:false,
                    config:{
                        type:'custom',
                        name:'specialConfiguration',
                        template:'<span name="specialConfiguration" $-on:click="isHideSpecialConfiguration">点击添加特殊显示配置</span>',
                        scope:{
                            isHideSpecialConfiguration:function(){
                                document.querySelector('.addSpecialDisplay').style.display="block";
                            }
                        }
                    },
                    hidden:true
                },
                //【15、启用数据权限】       // TRUE、启用 FALSE、未启用
                dpEnableHidden={
                    title:'启用数据权限',
                    required:true,
                    //class:'clos-all',
                    config:{
                        type:'custom',
                        name:'dpEnable',
                        template:'<input type="radio" name="dpEnable" value="TRUE" $-checked="dpEnable == \'TRUE\'" $-on:change="events.change" >启用<input type="radio" name="dpEnable" value="FALSE" $-checked="dpEnable == \'FALSE\'" style="margin-left: 15px">未启用',
                        scope:{
                            dpEnable:res.data.dpEnable//后台获取
                        }
                    },
                    hidden:false
                },
                //【16、自定义URL】
                viewUrlHidden={
                    title:'自定义URL',
                    required:false,
                    config:{
                        type:'custom',
                        template:'<input type="text" name="viewUrl" $-valid="validUrl">',
                        scope:{
                            viewUrl:res.data.viewUrl,//后台获取数据
                            validUrl:resValid.viewUrl //数据校验
                        },
                        placeholder:'',
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                    hidden:true
                },
                //【18、移动端显示字段】
                mobileShowColumnsHidden={
                    title:'移动端显示字段',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectMobileShowColumns" $-on:change="selectMobileShowColumns"></select>',
                        scope:{
                            selectMobileShowColumns:{
                                name:'mobileShowColumns',
                                search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'创建时间',
                                        value:'1',
                                    },
                                    {
                                        content:'企业编码',
                                        value:'2',
                                    },
                                    {
                                        content:'最后更新时间',
                                        value:'3',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:false
                },
                //【19、标题字段】
                mobileListTitleHidden={
                    title:'标题字段',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectMobileListTitle" $-on:change="selectMobileListTitle"></select>',
                        scope:{
                            selectMobileListTitle:{
                                name:'mobileListTitle',
                                search:false,
                                multiple:false,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'企业编码',
                                        value:'1',
                                    },
                                    {
                                        content:'创建时间',
                                        value:'2',
                                    },
                                    {
                                        content:'最后更新时间',
                                        value:'3',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:false
                },
                //【20、副标题字段】
                mobileListCaptionsHidden={
                    title:'副标题字段',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectMobileListCaptions" $-on:change="selectMobileListCaptions"></select>',
                        scope:{
                            selectMobileListCaptions:{
                                name:'mobileListCaptions',
                                search:false,
                                multiple:false,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'企业编码',
                                        value:'1',
                                    },
                                    {
                                        content:'创建时间',
                                        value:'2',
                                    },
                                    {
                                        content:'最后更新时间',
                                        value:'3',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:false
                },
                //【21、批量新增视图选择】
                BatchAddViewIdsHidden={
                    title:'批量新增视图选择',
                    required:false,
                    config:{
                        type:'custom',
                        template:' <select config="selectBatchAddViewIds" $-on:change="selectBatchAddViewIds"></select>',
                        scope:{
                            selectBatchAddViewIds:{
                                name:'BatchAddViewIds',
                                search:true,
                                multiple:true,
                                style:{
                                },
                                events:{
                                    change:function () {
                                        console.log(this.value);
                                        var val=this.value;
                                    }
                                },
                                dataList:[
                                    {
                                        content:'创建时间',
                                        value:'1',
                                    },
                                    {
                                        content:'企业编码',
                                        value:'2',
                                    },
                                    {
                                        content:'最后更新时间',
                                        value:'3',
                                    },
                                ]
                            }
                        }
                    },
                    hidden:true
                },
                //【17、描述】
                {
                    title:'描述',
                    required:false,
                    class:'clos-all',
                    config:{
                        type:'custom',
                        name:'description',
                        template:'<textarea name="description" rows="3" cols="20">'+res.data.description+'</textarea>',
                        scope:{
                        }
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

//6、视图-模糊查询组件
model('viewSettingsViewQuery',['$:@lib/publicData/fuzzyQueryViewName'],function(fuzzyQueryViewName){
    var This = this,
        requestFlag = false,
        moduleConfigViewApi;
    this.method('getViewApi',function (api) {
        moduleConfigViewApi = api;
    });
    this.method('getViewQueryGrid', function (viewSettingsView,moduleConfigViewApi) {
        //用户名称
        fuzzyQueryViewName(This,function(fuzzyQueryViewList){
            This.$model.fuzzyQueryData.list="";
            This.$model.fuzzyQueryData.list=fuzzyQueryViewList;
        });
        this.$model = {
            fuzzyQueryData: {
                style: {   //自定义样式
                    width: '240px',//【必填】fuzzyQuery宽度
                },
                placeholder:'请输入视图名称',//文本框内提示
                id:'viewQuery',//当前操作的查询组件id,不填默认为fuzzyQueryID
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
                        viewSettingsView.method('getKeyWordGrid', this.innerText);
                        //如果已经获取,则做刷新
                        requestFlag && moduleConfigViewApi.get('update')();
                        requestFlag = true;
                    }
                },
                list: [{
                    name:'输入信息', //【必填项】名称
                    value:'-1', //【非必填项】键值
                },]
            }
        }
    });
});

//7、视图-grid组件
model('viewSettingsView',['$:{PLUGINS}/modal/modal-confirm',':viewSettingsViewLayoutEdit'],function($confirm,viewSettingsViewLayoutEdit){
    var This = this,
        moduleId='',
        keyVal='',//关键字
        moduleConfigViewApi,
        gridConfig={
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
            },
            //列表左边操作
            "leftColsModel":[
                {
                    name: '操作',
                    listConfig: function (data,rowData,index) {
                        var id=rowData.id;
                        console.log(id,"视图id");
                        return {
                            template: '<span $-drop-menu="dropMenuConfig" class="iconfont icon-fenlei"></span>',
                            scope: {
                                dropMenuConfig: {
                                    config:{
                                        position:'right'
                                    },
                                    list: [
                                        {
                                            content: '<span $-on:click="events.click">预览</span>',
                                            scope:{
                                            },
                                            filter:{
                                            },
                                            events:{
                                                click:function () {
                                                    $FRAME.redirect('/home/custom/list?viewId=1253');
                                                }
                                            }
                                        },
                                        {
                                            content: '<span $-on:click="events.click">编辑</span>',
                                            scope:{

                                            },
                                            filter:{

                                            },
                                            events:{
                                                click:function () {
                                                    var moduleId = document.querySelector("#setModuleID").value;
                                                    viewSettingsViewLayoutEdit.method('getviewSettingsViewData',id,moduleId);
                                                    var scope = {
                                                        EditFormData:$FRAME.$model(),
                                                        viewSettingsViewLayoutEdit: viewSettingsViewLayoutEdit
                                                    };
                                                    //编辑弹框
                                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                        var a;
                                                        dialog(a={
                                                            title: '编辑操作',//【必填项】dialog标题
                                                            content: '<form id="EditFormData" $-form="EditFormData"><form-layout config="viewSettingsViewLayoutEdit"></form-layout></form>',
                                                            scope:scope,
                                                            maxmin:true,
                                                            zoom:'min',
                                                            filter:{},
                                                            width:'960px',//【非必填项】dialog宽，不填默认为640px
                                                            height:'560px;',//【非必填项】dialog高，不填默认为430px
                                                            btns:[
                                                                {
                                                                    name:'保存',
                                                                    trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作

                                                                        //判断是否是数组【列表下拉多选时候，数据处理】
                                                                        function isArray(field){
                                                                            if ($FRAME.lib.$type.getType(field) === 'array') {
                                                                                return field.join(',').toString();
                                                                            } else {
                                                                                return field;
                                                                            };
                                                                        };

                                                                        //表单校验,保存数据到数据库,局部刷新
                                                                        if(a.scope.EditFormData.valid()){
                                                                            var EditFormData= a.scope.EditFormData.getData(),
                                                                                saveFormServer = This.server({
                                                                                    serverType:'api',
                                                                                    method:'POST',
                                                                                    url:'editModuleConfigView'
                                                                                });
                                                                            saveFormServer.receive(function (res) {
                                                                                if (res.status == "200") {
                                                                                    //关闭弹窗
                                                                                    interface.close();
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('编辑成功！');
                                                                                    });
                                                                                    moduleConfigViewApi.get('update')();
                                                                                } else {
                                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                                        $message('编辑失败！');
                                                                                    });
                                                                                }
                                                                            }.bind(this)).send({
                                                                                "id": id,
                                                                                "orderType": "desc",//【后期添加】"desc",
                                                                                "orderCol": "",//【后期添加】"orderCol",
                                                                                "viewFormulaIds": isArray(EditFormData.viewFormulaIds)  ||"",//"viewFormulaIds",
                                                                                "searchColumns": isArray(EditFormData.searchColumns)  ||"",//"searchColumns",
                                                                                "dpEnable": EditFormData.dpEnable ||"TRUE",//【必填】"TRUE",
                                                                                "description": EditFormData.description ||"",//"description",
                                                                                "defaultSearchTagId": isArray(EditFormData.defaultSearchTagId) ||1,//1,
                                                                                "sourceModuleCode": EditFormData.sourceModuleCode ||"",//【后期添加】"sourceModuleCode",
                                                                                "viewName": EditFormData.viewName ||"",//【必填】"00000000000000",
                                                                                "sourceModuleId":EditFormData.sourceModuleId ||1,// 【后期添加】"2,
                                                                                "isSearch":EditFormData.isSearch ||"",// "isSearch",
                                                                                "isBatchAddView":EditFormData.isBatchAddView ||1,// 1,
                                                                                "viewMarks": isArray(EditFormData.viewMarks) ||"",//"viewMarks",
                                                                                "requiredCols": isArray(EditFormData.requiredCols)||"",//【必填】"requiredCols",
                                                                                "viewUrl": EditFormData.viewUrl ||"",//"viewUrl",
                                                                                "columnAssemble": isArray(EditFormData.columnAssemble) ||"",//【必填】"columnAssemble",
                                                                                "layoutType": EditFormData.layoutType ||"",//【后期添加】"layoutType",
                                                                                "showColumns": isArray(EditFormData.showColumns) ||"",//【必填】"showColumns",
                                                                                "editRelatedModule": isArray(EditFormData.editRelatedModule) ||"",//"editRelatedModule",
                                                                                "dataModules": EditFormData.dataModules ||"",//【后期添加】"dataModules",
                                                                                "fuzzyQueryCols":isArray(EditFormData.fuzzyQueryCols)||"",// "fuzzyQueryCols",
                                                                                "batchAddViewIds": EditFormData.batchAddViewIds ||"",//【后期添加】"batchAddViewIds",
                                                                                "layoutContent": EditFormData.layoutContent ||"",//【后期添加】"layoutContent",
                                                                                "searchTag": isArray(EditFormData.searchTag) ||"",//"searchTag",
                                                                                "viewGroups":EditFormData.viewGroups ||"",// "viewGroups",
                                                                                "viewType": EditFormData.viewType ||1,//1,
                                                                                "flagCol": EditFormData.flagCol ||1,//1,
                                                                                "isGroup": EditFormData.isGroup ||1,//1,
                                                                                "layoutRelation": EditFormData.layoutRelation ||"",//"layoutRelation",
                                                                                "dataPermission": EditFormData.dataPermission ||"1",//"1",
                                                                                "viewSpcShows":null,
                                                                                "batchCtrls": null,
                                                                                "viewDataConds": null





                                                                                //"name":EditFormData.name,
                                                                                //"viewId":EditFormData.viewId ||-1,
                                                                                //"viewType":EditFormData.viewType ||null,
                                                                                //"titleColId":EditFormData.titleColId||null,
                                                                                //"layout":EditFormData.layout||null,
                                                                                //"flagColId":EditFormData.flagColId||null,
                                                                                //"description":EditFormData.description||null,
                                                                                //"flag":EditFormData.flag||null,
                                                                                //"i18nKey":EditFormData.i18nKey||null,
                                                                                //"moduleId":1 ,  //TODO:后期需要从url中动态获取
                                                                                //"id":id
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

                                                    //--------------------old--------------------
                                                    //$dialog({
                                                    //    title: '编辑操作',//【必填项】dialog标题
                                                    //    content: "",//【非必填项】dialog内容
                                                    //    passText:'保存',//【必填项】dialog按钮
                                                    //    cancelText:'取消',//【必填项】dialog按钮
                                                    //    width:'700px',//【非必填项】dialog宽，不填默认为640px
                                                    //    height:'560px;',//【非必填项】dialog高，不填默认为430px
                                                    //    template:'<form id="EditFormData" $-form="EditFormData"><form-layout config="viewSettingsViewLayoutEdit"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                                    //    scope:scope,
                                                    //    pass: function (e) { //【必填项】dialog通过需要进行的操作
                                                    //        //表单校验,保存数据到数据库,局部刷新
                                                    //        if(scope.EditFormData.valid()){
                                                    //            var EditFormData=scope.EditFormData.getData(),
                                                    //                saveFormServer = This.server({
                                                    //                    serverType:'api',
                                                    //                    method:'POST',
                                                    //                    url:'editModuleConfigView'
                                                    //                });
                                                    //            saveFormServer.receive(function (res) {
                                                    //                //TODO:后期需要调用tip成功组件
                                                    //                console.log('编辑结果',res,'调用tip成功组件');
                                                    //            }.bind(this)).send({
                                                    //
                                                    //                "id": id,
                                                    //                "orderType": "desc",//【后期添加】"desc",
                                                    //                "orderCol": "",//【后期添加】"orderCol",
                                                    //                "viewFormulaIds": EditFormData.viewFormulaIds ||"",//"viewFormulaIds",
                                                    //                "searchColumns": EditFormData.searchColumns ||"",//"searchColumns",
                                                    //                "dpEnable": EditFormData.dpEnable ||"TRUE",//【必填】"TRUE",
                                                    //                "description": EditFormData.description ||"",//"description",
                                                    //                "defaultSearchTagId": EditFormData.defaultSearchTagId ||1,//1,
                                                    //                "sourceModuleCode": EditFormData.sourceModuleCode ||"",//【后期添加】"sourceModuleCode",
                                                    //                "viewName": EditFormData.viewName ||"",//【必填】"00000000000000",
                                                    //                "sourceModuleId":EditFormData.sourceModuleId ||1,// 【后期添加】"2,
                                                    //                "isSearch":EditFormData.isSearch ||"",// "isSearch",
                                                    //                "isBatchAddView":EditFormData.isBatchAddView ||1,// 1,
                                                    //                "viewMarks": EditFormData.viewMarks ||"",//"viewMarks",
                                                    //                "requiredCols": EditFormData.requiredCols ||"",//【必填】"requiredCols",
                                                    //                "viewUrl": EditFormData.viewUrl ||"",//"viewUrl",
                                                    //                "columnAssemble": EditFormData.columnAssemble ||"",//【必填】"columnAssemble",
                                                    //                "layoutType": EditFormData.layoutType ||"",//【后期添加】"layoutType",
                                                    //                "showColumns": EditFormData.showColumns ||"",//【必填】"showColumns",
                                                    //                "editRelatedModule": EditFormData.editRelatedModule ||"",//"editRelatedModule",
                                                    //                "dataModules": EditFormData.dataModules ||"",//【后期添加】"dataModules",
                                                    //                "fuzzyQueryCols":EditFormData.fuzzyQueryCols ||"",// "fuzzyQueryCols",
                                                    //                "batchAddViewIds": EditFormData.batchAddViewIds ||"",//【后期添加】"batchAddViewIds",
                                                    //                "layoutContent": EditFormData.layoutContent ||"",//【后期添加】"layoutContent",
                                                    //                "searchTag": EditFormData.searchTag ||"",//"searchTag",
                                                    //                "viewGroups":EditFormData.viewGroups ||"",// "viewGroups",
                                                    //                "viewType": EditFormData.viewType ||1,//1,
                                                    //                "flagCol": EditFormData.flagCol ||1,//1,
                                                    //                "isGroup": EditFormData.isGroup ||1,//1,
                                                    //                "layoutRelation": EditFormData.layoutRelation ||"",//"layoutRelation",
                                                    //                "dataPermission": EditFormData.dataPermission ||"1",//"1",
                                                    //                "viewSpcShows":null,
                                                    //                "batchCtrls": null,
                                                    //                "viewDataConds": null
                                                    //
                                                    //
                                                    //
                                                    //
                                                    //
                                                    //                //"name":EditFormData.name,
                                                    //                //"viewId":EditFormData.viewId ||-1,
                                                    //                //"viewType":EditFormData.viewType ||null,
                                                    //                //"titleColId":EditFormData.titleColId||null,
                                                    //                //"layout":EditFormData.layout||null,
                                                    //                //"flagColId":EditFormData.flagColId||null,
                                                    //                //"description":EditFormData.description||null,
                                                    //                //"flag":EditFormData.flag||null,
                                                    //                //"i18nKey":EditFormData.i18nKey||null,
                                                    //                //"moduleId":1 ,  //TODO:后期需要从url中动态获取
                                                    //                //"id":id
                                                    //            });
                                                    //        }else{
                                                    //            //不关闭弹框
                                                    //            return false;
                                                    //        }
                                                    //    },
                                                    //    cancel: function () {//【必填项】dialog不通过需要进行的操作
                                                    //    }
                                                    //});
                                                    //--------------------old--------------------
                                                }
                                            }
                                        },
                                        {
                                            content: '<span $-on:click="events.click">重新布局</span>',
                                            scope:{

                                            },
                                            filter:{

                                            },
                                            events:{
                                                click:function () {
                                                    $FRAME.redirect('/admin/view/layout.html');
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
                                                            var menuListServer =This.server({
                                                                serverType:'api',//如果是访问接口,这里是api,其他的则是http
                                                                method:'POST',
                                                                url:'deleteView'
                                                            });
                                                            menuListServer.receive(function (res) {
                                                                if (res.status == "200") {
                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                        $message('删除成功！');
                                                                    });
                                                                    //更新列表
                                                                    moduleConfigViewApi.get('update')();
                                                                } else {
                                                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                                        $message('删除失败！');
                                                                    });
                                                                }
                                                            }.bind(this)).send({
                                                                "viewId" :id
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
                    name:"视图名称",
                    //字段key
                    field:"viewName",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                },
                {
                    //字段标题
                    name:"视图类型",
                    //字段key
                    field:"viewType",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    //1、列表 2、新增 3、修改 4、详情 5、自定义 6、批量更新 7、批量新增 8、修改【含批量新增明细】
                    listConfig: function (data) {
                        switch(data)
                        {
                            case 1:
                                return {
                                    content: '列表'
                                }
                                break;
                            case 2:
                                return {
                                    content: '新增'
                                }
                                break;
                            case 3:
                                return {
                                    content: '修改'
                                }
                                break;
                            case 4:
                                return {
                                    content: '详情'
                                }
                                break;
                            case 5:
                                return {
                                    content: '自定义'
                                }
                                break;
                            case 6:
                                return {
                                    content: '批量更新'
                                }
                                break;
                            case 7:
                                return {
                                    content: '批量新增'
                                }
                                break;
                            case 8:
                                return {
                                    content: '修改【含批量新增明细】'
                                }
                                break;
                            default:
                                return {
                                    content: ''
                                }
                        }
                    }
                },
                {
                    //字段标题
                    name:"视图描述",
                    //字段key
                    field:"description",
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
                }
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
                    url: 'moduleConfigView'
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
                    currentPage:1,
                    moduleId:"",
                    flag:0,//操作标记 0：PC端 1:移动端
                    keyVal: "",
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
            dataInitConf:function (gridListData,$interface) {
                //往开发作用域中存储列表数据
                $interface.developScope.gridListData=gridListData;
            }
        };

    this.method('getViewApi',function (api) {
        moduleConfigViewApi = api;
    });

    this.method('moduleConfigView',function (moduleId) {
        try{
            gridConfig.sendData.moduleId = moduleId;
            gridConfig.sendData.keyVal = "";
            This.$model || (This.$model = gridConfig);
        }
        catch(e){
            console.warn(e)
        }
    });

    //关键字刷新列表
    this.method('getKeyWordGrid', function (keyVal) {
        gridConfig.sendData.keyVal = keyVal;
        This.$model || (This.$model = gridConfig);
    });


});





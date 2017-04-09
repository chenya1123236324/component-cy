
/**
 * Created by chenya on 2016/12/27.
 */
//5.1、视图-新增按钮
model('moduleConfigViewBtn',[':moduleConfigViewLayoutAdd'],function(moduleConfigViewLayoutAdd){
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
                        //var scope={
                        //    moduleConfigViewLayoutAdd:moduleConfigViewLayoutAdd,
                        //}
                        var moduleId = document.querySelector("#setModuleID").value;
                        moduleConfigViewLayoutAdd.method('getDropDownViewData',moduleId);
                        //新增弹框
                        var scope = {
                            addFormData:$FRAME.$model(),
                            moduleConfigViewLayoutAdd: moduleConfigViewLayoutAdd,
                            formLayout1:{
                                "list": [
                                {
                                    "title": "配置显示设置",
                                    "required": true,
                                    "config": {
                                        type:'custom',
                                        template:' <select config="showColumnModule"></select>',
                                        scope:{
                                            showColumnModule:{
                                                name:'showColumn',
                                                //search:true,
                                                //multiple:true,
                                                style:{
                                                    width:"120px;"
                                                },
                                                events:{
                                                    change:function () {
                                                    }
                                                },
                                                dataList:[
                                                    {
                                                        content:'特殊颜色',
                                                        value:'1',
                                                    },
                                                    {
                                                        content:'特殊图标图标',
                                                        value:'2',
                                                    },
                                                ]
                                            }
                                        },
                                        "valid": {
                                            "required": {
                                                "value": true,
                                                "message": "请输入配置显示设置"
                                            }
                                        },
                                        "readOnly": false,
                                        "placeholder": "",
                                        "events": {},
                                        "$model": "$COL_3888"
                                    }
                                },
                                {
                                    "title": "选择颜色",
                                    "required": true,
                                    "config": {
                                        type:'custom',
                                        template:' <select config="showValModule"></select>',
                                        scope:{
                                            showValModule:{
                                                name:'showVal',
                                                //search:true,
                                                //multiple:true,
                                                style:{
                                                    width:"120px;"
                                                },
                                                events:{
                                                    change:function () {
                                                    }
                                                },
                                                dataList:[
                                                    {
                                                        value: "#FF0000",
                                                        content: "红色"
                                                    },
                                                    {
                                                        value: "#db7093",
                                                        content: "淡红色"
                                                    },
                                                    {
                                                        value: "#EB9900",
                                                        content: "橙色"
                                                    },
                                                    {
                                                        value: "#ffa07a",
                                                        content: "浅橙色"
                                                    },
                                                    {
                                                        value: "#FFFF00",
                                                        content: "黄色"
                                                    },
                                                    {
                                                        value: "#ffffe0",
                                                        content: "淡黄色"
                                                    },
                                                    {
                                                        value: "#008000",
                                                        content: "绿色"
                                                    },
                                                    {
                                                        value: "#98fb98",
                                                        content: "淡绿色"
                                                    },
                                                    {
                                                        selected: "",
                                                        value: "#00FFFF",
                                                        content: "青色"
                                                    },
                                                    {
                                                        value: "#e0ffff",
                                                        content: "淡青色"
                                                    },
                                                    {
                                                        value: "#0000F5",
                                                        content: "蓝色"
                                                    },
                                                    {
                                                        value: "#87ceeb",
                                                        content: "天蓝色"
                                                    },
                                                    {
                                                        value: "#6400B2",
                                                        content: "紫色"
                                                    },
                                                    {
                                                        value: "#9370db",
                                                        content: "淡紫色"
                                                    }

                                                ]
                                            }
                                        },
                                        "valid": {
                                            "required": {
                                                "value": true,
                                                "message": "请输入选择颜色"
                                            }
                                        },
                                        "readOnly": false,
                                        "placeholder": "请输入选择颜色",
                                        "events": {},
                                        "$model": "$COL_3890"
                                    }
                                },
                                {
                                    "title": "选择可视范围",
                                    "required": true,
                                    "config": {
                                        type:'custom',
                                        template:' <select config="showTypeModule"></select>',
                                        scope:{
                                            showTypeModule:{
                                                name:'showType',
                                                //search:true,
                                                //multiple:true,
                                                style:{
                                                    width:"120px;"
                                                },
                                                events:{
                                                    change:function () {
                                                    }
                                                },
                                                dataList:[
                                                    {
                                                        value: "1",
                                                        content: "所在行"
                                                    },
                                                    {
                                                        value: "2",
                                                        content: "所在单元格(待开发)"
                                                    }
                                                ]
                                            }
                                        },
                                        "valid": {
                                            "required": {
                                                "value": true,
                                                "message": "请输入选择可视范围"
                                            }
                                        },
                                        "readOnly": false,
                                        "placeholder": "请输入选择可视范围",
                                        "events": {},
                                        "$model": "$COL_3892"
                                    }
                                },
                                {
                                    "title": "选择特殊显示列",
                                    "required": true,
                                    "config": {
                                        type:'custom',
                                        template:' <select config="showWayModule"></select>',
                                        scope:{
                                            showWayModule:{
                                                name:'showWay',
                                                //search:true,
                                                //multiple:true,
                                                style:{
                                                    width:"120px;"
                                                },
                                                events:{
                                                    change:function () {
                                                    }
                                                },
                                                dataList:[
                                                    {
                                                        value: "1",
                                                        content: "创建时间"
                                                    },
                                                    {
                                                        value: "2",
                                                        content: "字段"
                                                    }
                                                ]
                                            }
                                        },
                                        "valid": {
                                            "required": {
                                                "value": true,
                                                "message": "请输入选择特殊显示列"
                                            }
                                        },
                                        "readOnly": false,
                                        "placeholder": "请选择选择特殊显示列",
                                        "events": {},
                                        "$model": "$COL_3939"
                                    }
                                },
                                {
                                    "title": "筛选条件",
                                    "required": false,
                                    "config": {
                                        type:'custom',
                                        template:' <select config="searchTypeModule"></select>',
                                        scope:{
                                            searchTypeModule:{
                                                name:'searchType',
                                                //search:true,
                                                //multiple:true,
                                                style:{
                                                    width:"120px;"
                                                },
                                                events:{
                                                    change:function () {
                                                    }
                                                },
                                                dataList:[
                                                    {
                                                        value: "6",
                                                        content: "包含"
                                                    },
                                                    {
                                                        value: "3",
                                                        content: "等于"
                                                    },
                                                    {
                                                        value: "7",
                                                        content: "不等于"
                                                    }
                                                ]
                                            }
                                        },
                                        "valid": {},
                                        "readOnly": false,
                                        "placeholder": "请选择筛选条件",
                                        "events": {},
                                        "$model": "$COL_3940"
                                    }
                                },
                                {
                                        "title": "筛选条件对应值",
                                        "required": false,
                                        "config": {
                                            //searchVal
                                            type:'custom',
                                            template:' <select config="searchValModule"></select>',
                                            scope:{
                                                searchValModule:{
                                                    name:'searchVal',
                                                    //search:true,
                                                    //multiple:true,
                                                    style:{
                                                        width:"120px;"
                                                    },
                                                    events:{
                                                        change:function () {
                                                        }
                                                    },
                                                    dataList:[
                                                        {
                                                            value:"-1",
                                                            content: "请选择"
                                                        },
                                                    ]
                                                }
                                            },
                                            "valid": {},
                                            "readOnly": false,
                                            "placeholder": "请选择客户名称",
                                            "events": {},
                                            "$model": "$COL_3941"
                                        }
                                    }
                            ],
                                "scope": {
                                "$COL_3888": {},
                                "$COL_3890": {},
                                "$COL_3892": {},
                                "$COL_3939": {},
                                "$COL_3940": {},
                                "$COL_3941": {}
                            }
                        }
                        };
                        //新增弹框
                        $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                            var a;
                            dialog(a={
                                title: '新增视图',//【必填项】dialog标题
                                content: '<form id="addFormData" $-form="addFormData"><form-layout config="moduleConfigViewLayoutAdd"></form-layout><div id="formBatchContent" class="addSpecialDisplay "  style="margin-top:100px;padding:30px;display:none;"><form-batch config="formLayout1"></form-batch></div></form>',
                                scope:scope,
                                maxmin:true,
                                zoom:'min',
                                filter:{},
                                width:'1200px',//【非必填项】dialog宽，不填默认为640px
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


                                            console.log(a.scope.addFormData.getData().viewType,"a.scope.addFormData.getData()");
                                            console.log(a.scope.addFormData.getData(),"a.scope.addFormData.getData()");

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
                                                    }
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
                                            }
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
                    }
                }
            },

        ]
    }]
});

//5.1.1、视图-form-layout 新增
model('moduleConfigViewLayoutAdd',['$:@lib/publicData/moduleConfig/queryCurrentModule','$:@lib/publicData/moduleConfig/querySearchField','$:@lib/publicData/moduleConfig/queryViewFormulaSet','$:@lib/publicData/moduleConfig/queryTagByModule','$:@lib/publicData/moduleConfig/pageDisplayLabel'],function (queryCurrentModule,querySearchField,queryViewFormulaSet,queryTagByModule,pageDisplayLabel) {
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
            console.log(moduleId,"===moduleId0323===");
            This.$model.list[2].config.scope.selectColumnAssemble.dataList=[];
            This.$model.list[2].config.scope.selectColumnAssemble.dataList=moduleId;
            This.$model.list[3].config.scope.selectShowColumns.dataList=[];
            This.$model.list[3].config.scope.selectShowColumns.dataList=moduleId;
            This.$model.list[4].config.scope.selectRequiredCols.dataList=[];
            This.$model.list[4].config.scope.selectRequiredCols.dataList=moduleId;
        });

           //查询可搜索字段
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
         //查询页面标签
        pageDisplayLabel(This,moduleId,[0],function(pageDisplayLabel){
            console.log(pageDisplayLabel,"====pageDisplayLabel===");
            This.$model.list[7].config.scope.selectViewMarks.dataList=[];
            This.$model.list[7].config.scope.selectViewMarks.dataList=pageDisplayLabel;
        });
        //--------------------------------不可删---------------------
        var validSwitchs = {
            0: false,//自定义URL
        };

    this.$model={
        scope: {
            validSwitchs: validSwitchs,
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
                    readonly:'readonly',
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
                                    //特殊显示配置
                                    var addSpecialDisplay=document.querySelector('.addSpecialDisplay');
                                    //【1、列表】
                                    if(val==1){
                                        //特殊显示配置
                                         addSpecialDisplay.style.display='none';
                                        //3、包含字段
                                        columnAssembleHidden.hidden=false;
                                        //4、显示字段
                                        showColumnsHidden.hidden=false;
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
                                        defaultSearchTagIdHidden.hidden=false;
                                        //14、特殊显示配置
                                        specialConfigurationHidden.hidden=false;
                                        //15、启用数据权限
                                        dpEnableHidden.hidden=false;
                                        //16、自定义URL
                                        viewUrlHidden.hidden=true;
                                        //16、自定义URL必填验证
                                        validSwitchs[0] = false;
                                    }else if(val==2){    //【2、新增】
                                        //特殊显示配置
                                        addSpecialDisplay.style.display='none';
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
                                        isBatchAddViewHidden.hidden=false;
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
                                        //16、自定义URL必填验证
                                        validSwitchs[0] = false;
                                    }else if(val==3){ //【3、修改】
                                        //特殊显示配置
                                        addSpecialDisplay.style.display='none';
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
                                        //16、自定义URL必填验证
                                        validSwitchs[0] = false;
                                    }else if(val==4){//【4、详情】
                                        //特殊显示配置
                                        addSpecialDisplay.style.display='none';
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
                                        //16、自定义URL必填验证
                                        validSwitchs[0] = false;
                                    }else if(val==5){//【5、自定义】

                                        //特殊显示配置
                                        addSpecialDisplay.style.display='none';
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
                                        //16、自定义URL必填验证
                                        validSwitchs[0] = true;

                                    }else if(val==6){//【6、批量更新】
                                        //特殊显示配置
                                        addSpecialDisplay.style.display='none';
                                        //3、包含字段
                                        columnAssembleHidden.hidden=false;
                                        //4、显示字段
                                        showColumnsHidden.hidden=false;
                                        //5、必填字段
                                        requiredColsHidden.hidden=false;
                                        //6、可修改数据关联模块
                                        editRelatedModuleHidden.hidden=true;
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
                                        //16、自定义URL必填验证
                                        validSwitchs[0] = false;

                                    }else if(val==7 || val==8) {//【7、批量新增  8、修改【含批量新增明细】】
                                        //特殊显示配置
                                        addSpecialDisplay.style.display='none';
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
                                        //16、自定义URL必填验证
                                        validSwitchs[0] = false;
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
                                    content:'修改【含批量新增明细】',
                                    value:'8',
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
                                    content:'批量更新',
                                    value:'6',
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
                                change:function (event) {
                                    console.log(this,"得到的数据");
                                    console.log(event,"event");
                                    console.log(this.selectedIndex,"this.selectedIndex");
                                    console.log(this.options[this.selectedIndex].text,"text");
                                    console.log(this.options[this.selectedIndex].value,"value");
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
                hidden:false
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
                hidden:false
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
                hidden:false
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
                //hidden:true
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
                    template:'<input type="text" name="viewUrl" $-valid="validUrl" $-valid-switch="validSwitchs[0]">',
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

//5.1.2、视图-form-layout 编辑
model('moduleConfigViewLayoutEdit',['$:@lib/publicData/moduleConfig/queryCurrentModule','$:@lib/publicData/moduleConfig/querySearchField','$:@lib/publicData/moduleConfig/queryViewFormulaSet','$:@lib/publicData/moduleConfig/queryTagByModule','$:@lib/publicData/moduleConfig/pageDisplayLabel'],function (queryCurrentModule,querySearchField,queryViewFormulaSet,queryTagByModule,pageDisplayLabel) {
    var This=this;
    var menuServer=this.server({
        serverType:'api',//如果是访问接口,这里是api,其他的则是http
        method:'POST',
        url:'querySingleView'
    });
    this.method('getModuleConfigViewData',function (rowId,moduleId) {
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

        //console.log(res.data.columnAssemble,"res.data.columnAssemble");

        //包含字段
        var columnAssemble=String(res.data.columnAssemble).split(",");
        //查询当前模块下字段集合【包含字段】
        queryCurrentModule(This,moduleId,deleteRepetion(columnAssemble),function(moduleId){
            //包含字段
            This.$model.list[2].config.scope.selectColumnAssemble.dataList=[];
            This.$model.list[2].config.scope.selectColumnAssemble.dataList=moduleId;
        });

        //显示字段
        var showColumns=String(res.data.showColumns).split(",");
        //查询当前模块下字段集合【显示字段】
        queryCurrentModule(This,moduleId,deleteRepetion(showColumns),function(moduleId){
            //显示字段
            This.$model.list[3].config.scope.selectShowColumns.dataList=[];
            This.$model.list[3].config.scope.selectShowColumns.dataList=moduleId;
        });
        //必填字段
        var requiredCols=String(res.data.requiredCols).split(",");
        //查询当前模块下字段集合【必填字段】
        queryCurrentModule(This,moduleId,deleteRepetion(requiredCols),function(moduleId){
            //必填字段
            This.$model.list[4].config.scope.selectRequiredCols.dataList=[];
            This.$model.list[4].config.scope.selectRequiredCols.dataList=moduleId;
        });

        //查询可搜索字段
        var searchColumns=String(res.data.searchColumns).split(",");
            querySearchField(This,moduleId,deleteRepetion(searchColumns),function(querySearchField){
                This.$model.list[9].config.scope.selectSearchColumns.dataList=[];
                This.$model.list[9].config.scope.selectSearchColumns.dataList=querySearchField;
            });

        //查询视图公式集合【配置公式】
        var viewFormulaIds=String(res.data.viewFormulaIds).split(",");
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
                columnAssembleHidden.hidden=false;
                //4、显示字段
                showColumnsHidden.hidden=false;
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
                defaultSearchTagIdHidden.hidden=false;
                //14、特殊显示配置
                specialConfigurationHidden.hidden=false;
                //15、启用数据权限
                dpEnableHidden.hidden=false;
                //16、自定义URL
                viewUrlHidden.hidden=true;
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
                viewMarksHidden.hidden=false;
                //9、使用批量新增
                isBatchAddViewHidden.hidden=false;
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
            }else if(val==6){//【6、批量更新】
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="6";
                This.$model.list[1].config.scope.viewTypeName="批量更新";
                //3、包含字段
                columnAssembleHidden.hidden=false;
                //4、显示字段
                showColumnsHidden.hidden=false;
                //5、必填字段
                requiredColsHidden.hidden=false;
                //6、可修改数据关联模块
                editRelatedModuleHidden.hidden=true;
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

            }else if(val==7) {//【7、批量新增 】
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="7";
                This.$model.list[1].config.scope.viewTypeName="批量新增";
                //视图类型
                selected1=false,selected2=false,selected3=false,selected4=false,selected5=false,selected6=false,selected7=true,selected8=false;
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
            }else if(val==8) {//【8、修改【含批量新增明细】】
                //视图类型
                This.$model.list[1].config.scope.viewTypeValue="8";
                This.$model.list[1].config.scope.viewTypeName="修改【含批量新增明细】";
                //视图类型
                selected1=false,selected2=false,selected3=false,selected4=false,selected5=false,selected6=false,selected7=false,selected8=true;
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
            }
        });

        //查询模块下的查询标签【查询条件】
        var searchTag=String(res.data.searchTag).split(",");
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


        //查询页面标签
        var viewMarks=String(res.data.viewMarks).split(",");
        pageDisplayLabel(This,moduleId,deleteRepetion(viewMarks),function(pageDisplayLabel){
            console.log(pageDisplayLabel,"====pageDisplayLabel编辑===");
            This.$model.list[7].config.scope.selectViewMarks.dataList=[];
            This.$model.list[7].config.scope.selectViewMarks.dataList=pageDisplayLabel;
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
                    hidden:false
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
                    hidden:false
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
                    hidden:false
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
                    hidden:false
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
                    //hidden:true
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
                            //validUrl:resValid.viewUrl //数据校验
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
        };
    }.bind(this)).send();
        }.bind(this)).send({
            "id":rowId
        });
    }.bind(this));

});


//5.2、视图-模糊查询组件
model('moduleConfigViewQuery',['$:@lib/publicData/fuzzyQueryViewName'],function(fuzzyQueryViewName){
    var This = this,
        requestFlag = false,
        moduleConfigViewApi;
    this.method('getViewApi',function (api) {
        moduleConfigViewApi = api;
    });
    this.method('getViewQueryGrid', function (moduleConfigView,moduleConfigViewApi) {
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
                        moduleConfigView.method('getKeyWordGrid', this.innerText);
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

//5.3、视图-grid组件
model('moduleConfigView',['$:{PLUGINS}/modal/modal-confirm',':moduleConfigViewLayoutEdit'],function($confirm,moduleConfigViewLayoutEdit){
    var This =this,
        moduleId='',
        keyVal='',//关键字
        moduleConfigViewApi,
        gridConfig={
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            //"url": "http://paas.memobile.com.cn/gateway/custom/C11001",
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
                //"currentPage":1,
                //"pageSize":20,
                //"sidx":"id",
                //"flag":0,//操作标记 0：PC端 1:移动端
            },
            //列表左边操作
            "leftColsModel":[
                {
                    name: '操作',
                    listConfig: function (data,rowData,index) {
                        var id=rowData.id;
                        //console.log(id,"视图id");
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
                                                    $FRAME.redirect('/home/custom/list?viewId='+id);
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
                                                    moduleConfigViewLayoutEdit.method('getModuleConfigViewData',id,moduleId);
                                                    //var scope={
                                                    //    moduleConfigViewLayoutEdit:moduleConfigViewLayoutEdit
                                                    //}
                                                    var scope = {
                                                        EditFormData:$FRAME.$model(),
                                                        moduleConfigViewLayoutEdit: moduleConfigViewLayoutEdit,
                                                        formLayout1:{
                                                            "list": [
                                                                {
                                                                    "title": "配置显示设置",
                                                                    "required": true,
                                                                    "config": {
                                                                        type:'custom',
                                                                        template:' <select config="showColumnModule"></select>',
                                                                        scope:{
                                                                            showColumnModule:{
                                                                                name:'showColumn',
                                                                                //search:true,
                                                                                //multiple:true,
                                                                                style:{
                                                                                    width:"120px;"
                                                                                },
                                                                                events:{
                                                                                    change:function () {
                                                                                    }
                                                                                },
                                                                                dataList:[
                                                                                    {
                                                                                        content:'特殊颜色',
                                                                                        value:'1',
                                                                                    },
                                                                                    {
                                                                                        content:'特殊图标图标',
                                                                                        value:'2',
                                                                                    },
                                                                                ]
                                                                            }
                                                                        },
                                                                        "valid": {
                                                                            "required": {
                                                                                "value": true,
                                                                                "message": "请输入配置显示设置"
                                                                            }
                                                                        },
                                                                        "readOnly": false,
                                                                        "placeholder": "",
                                                                        "events": {},
                                                                        "$model": "$COL_3888"
                                                                    }
                                                                },
                                                                {
                                                                    "title": "选择颜色",
                                                                    "required": true,
                                                                    "config": {
                                                                        type:'custom',
                                                                        template:' <select config="showValModule"></select>',
                                                                        scope:{
                                                                            showValModule:{
                                                                                name:'showVal',
                                                                                //search:true,
                                                                                //multiple:true,
                                                                                style:{
                                                                                    width:"120px;"
                                                                                },
                                                                                events:{
                                                                                    change:function () {
                                                                                    }
                                                                                },
                                                                                dataList:[
                                                                                    {
                                                                                        value: "#FF0000",
                                                                                        content: "红色"
                                                                                    },
                                                                                    {
                                                                                        value: "#db7093",
                                                                                        content: "淡红色"
                                                                                    },
                                                                                    {
                                                                                        value: "#EB9900",
                                                                                        content: "橙色"
                                                                                    },
                                                                                    {
                                                                                        value: "#ffa07a",
                                                                                        content: "浅橙色"
                                                                                    },
                                                                                    {
                                                                                        value: "#FFFF00",
                                                                                        content: "黄色"
                                                                                    },
                                                                                    {
                                                                                        value: "#ffffe0",
                                                                                        content: "淡黄色"
                                                                                    },
                                                                                    {
                                                                                        value: "#008000",
                                                                                        content: "绿色"
                                                                                    },
                                                                                    {
                                                                                        value: "#98fb98",
                                                                                        content: "淡绿色"
                                                                                    },
                                                                                    {
                                                                                        selected: "",
                                                                                        value: "#00FFFF",
                                                                                        content: "青色"
                                                                                    },
                                                                                    {
                                                                                        value: "#e0ffff",
                                                                                        content: "淡青色"
                                                                                    },
                                                                                    {
                                                                                        value: "#0000F5",
                                                                                        content: "蓝色"
                                                                                    },
                                                                                    {
                                                                                        value: "#87ceeb",
                                                                                        content: "天蓝色"
                                                                                    },
                                                                                    {
                                                                                        value: "#6400B2",
                                                                                        content: "紫色"
                                                                                    },
                                                                                    {
                                                                                        value: "#9370db",
                                                                                        content: "淡紫色"
                                                                                    }

                                                                                ]
                                                                            }
                                                                        },
                                                                        "valid": {
                                                                            "required": {
                                                                                "value": true,
                                                                                "message": "请输入选择颜色"
                                                                            }
                                                                        },
                                                                        "readOnly": false,
                                                                        "placeholder": "请输入选择颜色",
                                                                        "events": {},
                                                                        "$model": "$COL_3890"
                                                                    }
                                                                },
                                                                {
                                                                    "title": "选择可视范围",
                                                                    "required": true,
                                                                    "config": {
                                                                        type:'custom',
                                                                        template:' <select config="showTypeModule"></select>',
                                                                        scope:{
                                                                            showTypeModule:{
                                                                                name:'showType',
                                                                                //search:true,
                                                                                //multiple:true,
                                                                                style:{
                                                                                    width:"120px;"
                                                                                },
                                                                                events:{
                                                                                    change:function () {
                                                                                    }
                                                                                },
                                                                                dataList:[
                                                                                    {
                                                                                        value: "1",
                                                                                        content: "所在行"
                                                                                    },
                                                                                    {
                                                                                        value: "2",
                                                                                        content: "所在单元格(待开发)"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        },
                                                                        "valid": {
                                                                            "required": {
                                                                                "value": true,
                                                                                "message": "请输入选择可视范围"
                                                                            }
                                                                        },
                                                                        "readOnly": false,
                                                                        "placeholder": "请输入选择可视范围",
                                                                        "events": {},
                                                                        "$model": "$COL_3892"
                                                                    }
                                                                },
                                                                {
                                                                    "title": "选择特殊显示列",
                                                                    "required": true,
                                                                    "config": {
                                                                        type:'custom',
                                                                        template:' <select config="showWayModule"></select>',
                                                                        scope:{
                                                                            showWayModule:{
                                                                                name:'showWay',
                                                                                //search:true,
                                                                                //multiple:true,
                                                                                style:{
                                                                                    width:"120px;"
                                                                                },
                                                                                events:{
                                                                                    change:function () {
                                                                                    }
                                                                                },
                                                                                dataList:[
                                                                                    {
                                                                                        value: "1",
                                                                                        content: "创建时间"
                                                                                    },
                                                                                    {
                                                                                        value: "2",
                                                                                        content: "字段"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        },
                                                                        "valid": {
                                                                            "required": {
                                                                                "value": true,
                                                                                "message": "请输入选择特殊显示列"
                                                                            }
                                                                        },
                                                                        "readOnly": false,
                                                                        "placeholder": "请选择选择特殊显示列",
                                                                        "events": {},
                                                                        "$model": "$COL_3939"
                                                                    }
                                                                },
                                                                {
                                                                    "title": "筛选条件",
                                                                    "required": false,
                                                                    "config": {
                                                                        type:'custom',
                                                                        template:' <select config="searchTypeModule"></select>',
                                                                        scope:{
                                                                            searchTypeModule:{
                                                                                name:'searchType',
                                                                                //search:true,
                                                                                //multiple:true,
                                                                                style:{
                                                                                    width:"120px;"
                                                                                },
                                                                                events:{
                                                                                    change:function () {
                                                                                    }
                                                                                },
                                                                                dataList:[
                                                                                    {
                                                                                        value: "6",
                                                                                        content: "包含"
                                                                                    },
                                                                                    {
                                                                                        value: "3",
                                                                                        content: "等于"
                                                                                    },
                                                                                    {
                                                                                        value: "7",
                                                                                        content: "不等于"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        },
                                                                        "valid": {},
                                                                        "readOnly": false,
                                                                        "placeholder": "请选择筛选条件",
                                                                        "events": {},
                                                                        "$model": "$COL_3940"
                                                                    }
                                                                },
                                                                {
                                                                    "title": "筛选条件对应值",
                                                                    "required": false,
                                                                    "config": {
                                                                        //searchVal
                                                                        type:'custom',
                                                                        template:' <select config="searchValModule"></select>',
                                                                        scope:{
                                                                            searchValModule:{
                                                                                name:'searchVal',
                                                                                //search:true,
                                                                                //multiple:true,
                                                                                style:{
                                                                                    width:"120px;"
                                                                                },
                                                                                events:{
                                                                                    change:function () {
                                                                                    }
                                                                                },
                                                                                dataList:[
                                                                                    {
                                                                                        value:"-1",
                                                                                        content: "请选择"
                                                                                    },
                                                                                ]
                                                                            }
                                                                        },
                                                                        "valid": {},
                                                                        "readOnly": false,
                                                                        "placeholder": "请选择客户名称",
                                                                        "events": {},
                                                                        "$model": "$COL_3941"
                                                                    }
                                                                }
                                                            ],
                                                            "scope": {
                                                                "$COL_3888": {},
                                                                "$COL_3890": {},
                                                                "$COL_3892": {},
                                                                "$COL_3939": {},
                                                                "$COL_3940": {},
                                                                "$COL_3941": {}
                                                            }
                                                        }
                                                    };
                                                    //编辑弹框
                                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                        var a;
                                                        dialog(a={
                                                            title: '编辑视图',//【必填项】dialog标题
                                                            content: '<form id="EditFormData" $-form="EditFormData"><form-layout config="moduleConfigViewLayoutEdit"></form-layout><div id="formBatchContent" class="addSpecialDisplay "  style="margin-top:100px;padding:30px;display:none;"><form-batch config="formLayout1"></form-batch></div></form>',
                                                            scope:scope,
                                                            maxmin:true,
                                                            zoom:'min',
                                                            filter:{},
                                                            width:'1200px',//【非必填项】dialog宽，不填默认为640px
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

                                                    //---------------old-----------------------------
                                                    //$dialog({
                                                    //    title: '编辑操作',//【必填项】dialog标题
                                                    //    content: "",//【非必填项】dialog内容
                                                    //    passText:'保存',//【必填项】dialog按钮
                                                    //    cancelText:'取消',//【必填项】dialog按钮
                                                    //    width:'700px',//【非必填项】dialog宽，不填默认为640px
                                                    //    height:'560px;',//【非必填项】dialog高，不填默认为430px
                                                    //    template:'<form id="EditFormData" $-form="EditFormData"><form-layout config="moduleConfigViewLayoutEdit"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
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
                                                    //---------------old-----------------------------


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
                                                    $FRAME.redirect('/demo/form/layout.html');
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
                                                        title:'确认删除',
                                                        content:'确认删除?',
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
                {
                    //列表序号
                    name:'序号',
                    listConfig:function (data,rowData,index) {
                        return {
                            content:index+1
                        }
                    }
                },
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
                    moduleId:data.moduleId,
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





/**
 * Created by 贝贝 on 2016/12/20.
 */
//视图条件配置

//tree的model
model('treeConf',['$:@lib/treeConvert'],function ($treeConvert) {
    var This = this,
        requestFlag=false;

    //第一个参数是grid的数据,第二个是grid的API,第三个是新增按钮的receive
    this.method('getTreeList',function (viewConditionsData,gridApi,commConf) {
        var treeConfServer = This.server({
            serverType:'api',
            method:'POST',
            url:'viewTree'//查询视图树
        }).receive(function (res) {
            console.log('tree',res);
            This.$model = {
                checkbox:false,
                actions:{
                    click:function () {
                        // console.log(arguments,"///",arguments[1]);
                        if(arguments[1].PID!=0){
                            //调用视图条件列表的获取视图条件方法,把当前视图的id和模块的id传过去
                            viewConditionsData.method('getViewConditions',{ID:arguments[1].ID,PID:arguments[1].PID});

                            //新增按钮的receive()
                            commConf.write('viewData',arguments[1]);

                            //如果已经获取子字典,则做刷新===============================
                            requestFlag && gridApi.get('update')();
                            requestFlag=true;
                        }
                    },
                    select:function () {
                    },
                    unselect:function () {
                    },
                    selectChange:function () {
                    }
                },
                list:$treeConvert(res.data)
            };
        }.bind(This)).send();
    })

});

//新增按钮
model('viewConditionsBtnGroup',[':viewConditionsAddFormLayout','$:@lib/configSendData/viewConditionsFormLayout'],function (addFormLayoutModel,$sendData) {
    var This = this,gridApi;

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
                        if(receive!=null){

                            //把选择的视图data传给下拉框的model
                            addFormLayoutModel.method('getSelectData',receive.viewData);
                            var scope = {
                                addFormSource:$FRAME.$model(),
                                addFormLayout:addFormLayoutModel,
                            }

                            //新增弹框
                            $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                var a;
                                dialog(a={
                                    title: '新增视图条件',//【必填项】dialog标题
                                    maxmin:true,
                                    content:'<form id="form_viewConditionsAdd" $-form="addFormSource"><form-layout config="addFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                    scope:scope,
                                    zoom:'min',
                                    filter:{},
                                    width:'700px',//【非必填项】dialog宽，不填默认为640px
                                    height:'560px;',//【非必填项】dialog高，不填默认为430px
                                    btns:[
                                        {
                                            name:'提交',
                                            trigger:function (eve,interface) {
                                                //表单校验
                                                // if(scope.addFormSource.valid()){
                                                var addFormData = a.scope.addFormSource.getData();

                                                //表单校验,保存数据到数据库
                                                var addFormServer = This.server({
                                                    serverType:'api',
                                                    method:'POST',
                                                    url:'addViewConditions'//新增视图条件
                                                });
                                                addFormServer.receive(function (res) {
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

                                                }.bind(this)).send($sendData("viewId",receive.viewData.ID,addFormData));
                                                // }else{
                                                //     //校验不通过
                                                //     alert('新增表单校验失败');
                                                //     return false;
                                                // }
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
                            });

                        }else {
                            $packages('{PLUGINS}/modal/modal-confirm',function (confirm) {
                                confirm({
                                    title:'提示',
                                    content:'请选择左侧视图',
                                    pass:function () {
                                    },
                                    cancel:function () {
                                    }
                                })
                            });

                        }

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
            /*{
                class:'btn btn-teal-outline',//按钮样式
                icon:'', //图标
                label:'编辑',//按钮文字
                align:'center',//文字居中
                padding:'6px 14px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        // console.log(this,this.innerHTML,event)
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
                        // console.log(this,this.innerHTML,event)
                    }
                }
            },*/
        ]
    }]
});

//视图条件新增formLayout
model('viewConditionsAddFormLayout', ['$:@lib/configData/viewConditionsCascade','$:@lib/configData/viewConditionVal',':affectColumns',':sourceColumn',':fieldFilterAffectColumns',':fieldFilterCustomVal'],function (affectColumn,conditionVal,affectColumnModel,sourceColumnModel,fieldFilterAffectColumnsModel,fieldFilterCustomValModel) {

    var This = this,
        viewData,//保存当前选择的视图data(id和模块id ), 供后面筛选字段时使用
        affectData={},//影响字段数据(创建一个变量保存影响字段的model)
        sourceData,//字段数据
        fieldFilterAffectData,//影响字段数据-->字段筛选
        fieldFilterCustomData;//字段数据-->字段筛选
    //点击新增按钮时调用该方法,将视图信息(id,moduleId)传给下拉框
    this.method('getSelectData',function (selectData) {
        try{
            viewData = selectData;
            affectColumnModel.method('getListData',selectData.ID,"");
            sourceColumnModel.method('getListData',selectData.PID,"");
            fieldFilterAffectColumnsModel.method('getNewListData',selectData.ID,"");

            //确保影响字段的数据获取到再做复制
            affectColumnModel.readData(function () {
                 affectData = affectColumnModel.dataList;
            });
            //确保字段的数据获取到再做复制
            sourceColumnModel.readData(function () {
                sourceData = sourceColumnModel.dataList;
            });
            //确保影响字段-->字段筛选 的数据获取到再做复制
            fieldFilterAffectColumnsModel.readData(function () {
                fieldFilterAffectData = fieldFilterAffectColumnsModel.dataList;
            });

        }
       catch(e){
           console.log('--',e)
       }


    });
    //======================================
    var hiddenList = {
        0:false,//条件名称

        1:false,//执行顺序

        2:false,//条件类型
        3:false,//影响字段
        4:false,//是否联动
        5:false,//条件
    },
        selectField,
        //影响字段change事件
        changeEvents = {
            change:function () {
                // console.log('原本的');
            }
        },
        //字段筛选-->影响字段change事件
        fieldFilterChangeEvents={
            change:function () {
                //改变字段的数据
                selectField = this.value;
                fieldFilterCustomValModel.method('getNewListData',selectField,"",function(dataList){
                    fieldFilterCustomData = dataList;
                    sourceColumnModel.dataList = fieldFilterCustomData;
                    sourceColumnModel.dataList[0].selected = true;
                });
            }
        };

    This.$model = {
        scope:{
            hiddenList:hiddenList,
            //影响字段的events
            changeEvents:changeEvents,
            //字段筛选-->影响字段的events
            fieldFilterChangeEvents:fieldFilterChangeEvents
        },
        list:[
            {
                title:'条件名称',
                requiredd:false,
                config:{
                    type:'custom',
                    template:'<input type="text" name="ruleName">',
                    scope:{
                    },
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                    }
                },
                hidden:hiddenList[0]
            },
            sort={
                title:'执行顺序',
                required:false,
                config:{
                    type:'custom',
                    template:'<input type="text" name="sort">',
                    scope:{
                    },
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                    }
                },
                hidden:hiddenList[1]
            },
            {
                title:'条件类型',
                // class:'clos-all',
                required:false,
                config:{
                    type:'custom',
                    template:'<select config="ruleTypeModel"  name="ruleType" $-on:change="change"></select>',
                    scope:{
                        ruleTypeModel:{
                            name:'ruleType',
                            style:{
                                // width:'100%',
                            },
                            events:{
                                change:function () {


                                    switch (this.value){
                                        case 'columnFilter':
                                            //执行顺序隐藏
                                            sort.hidden = true;

                                            //改变影响字段的数据
                                            affectColumnModel.multiple=false;
                                            affectColumnModel.dataList=fieldFilterAffectData;
                                            affectColumnModel.dataList[0].selected = true;
                                            affectColumnModel.events = {};//这里要先将events置空,再改变events(组件监听events只是监听里面事件个数和事件名)
                                            affectColumnModel.events = fieldFilterChangeEvents;

                                            //改变字段(初始化)
                                            fieldFilterCustomValModel.method('getNewListData',fieldFilterAffectData[0].value,"",function (dataList) {
                                                fieldFilterCustomData = dataList;
                                                sourceColumnModel.name = 'customVal';
                                                sourceColumnModel.dataList = fieldFilterCustomData;
                                                sourceColumnModel.dataList[0].selected = true;
                                            });

                                            //改变条件值
                                            This.$model.list[5].config.scope.batchCondition.list[2].config={};
                                            This.$model.list[5].config.scope.batchCondition.list[2].config = {
                                                template:'<select config="conditionValue"></select>',
                                                scope:{
                                                    conditionValue:{
                                                        name:'conditionValue',
                                                        search:true,
                                                        multiple:false,
                                                        events:{},
                                                        dataList:sourceData
                                                    }

                                                }
                                            }

                                            break;

                                        default :
                                            //执行顺序显示
                                            sort.hidden = false;

                                            //影响字段的数据还原
                                            affectColumnModel.multiple=true;
                                            affectColumnModel.dataList=affectData;
                                            affectColumnModel.dataList[0].selected = true;
                                            affectColumnModel.events = {};
                                            affectColumnModel.events = changeEvents;

                                            //字段的数据还原
                                            sourceColumnModel.name = 'sourceColumnId';
                                            sourceColumnModel.dataList = sourceData;
                                            sourceColumnModel.dataList[0].selected = true;

                                            //条件值还原
                                            This.$model.list[5].config.scope.batchCondition.list[2].config={};
                                            This.$model.list[5].config.scope.batchCondition.list[2].config={
                                                template:'<input type="text" name="conditionValue">',
                                                scope:{}
                                            }


                                    }
                                }
                            },
                            dataList:[
                                {
                                    content:'请选择',
                                    value:' '
                                },
                                {
                                    content:'隐藏',
                                    value:'hidden'
                                },
                                {
                                    content:'显示',
                                    value:'show'
                                },
                                {
                                    content:'只读',
                                    value:'readOnly'
                                },
                                {
                                    content:'字段筛选',
                                    value:'columnFilter'
                                },
                            ]
                        }
                    },
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                    }
                },
                hidden:hiddenList[2]
            },
            affectColumns={
                title:'影响字段',
                required:false,
                // class:'clos-all',
                config:{
                    type:'custom',
                    template:'<select config="affectColumnsModel"></select>',
                    scope:{
                        affectColumnsModel:affectColumnModel,
                    }
                },
                hidden:hiddenList[3]
            },
            {
                title:'是否联动',
                required:false,
                config:{
                    type:'radios',
                    $config:{
                        name:'isLinkage',
                        dataList:[
                            {
                                content:'否',
                                value:'0',
                                checked:true
                            },
                            {
                                content:'是',
                                value:'1'
                            }
                        ]
                    }
                },
                hidden:hiddenList[4]
            },
            condition={
                title:'',
                class:'clos-all batchConditChange',
                config:{
                    type:'custom',
                    template:'<batch-condition config="batchCondition"></batch-condition>',
                    scope:{
                        batchCondition:{
                            style:{
                                "margin-left":'-88px'
                                // width:"100%",
                            },
                            list:[
                                {
                                    title:'字段',
                                    // required:false,
                                    config:{
                                        template:'<select config="sourceColumnIdModel"></select>',
                                        scope:{
                                            //要改变的部分========================================
                                            sourceColumnIdModel:sourceColumnModel
                                            //=====================================================
                                        }
                                    }
                                },
                                {
                                    title:'条件',
                                    required:false,
                                    config:{
                                        template:'<select config="conditionTypeModel"  name="conditionType"></select>',
                                        scope:{
                                            conditionTypeModel:{
                                                name:'conditionType',
                                                style:{
                                                    // width:'100%'
                                                },
                                                dataList:[
                                                    {
                                                        content:'大于',
                                                        value:1
                                                    },
                                                    {
                                                        content:'小于',
                                                        value:2
                                                    },
                                                    {
                                                        content:'大于',
                                                        value:1
                                                    },
                                                    {
                                                        content:'等于',
                                                        value:3
                                                    },
                                                    {
                                                        content:'大于等于',
                                                        value:4
                                                    },
                                                    {
                                                        content:'小于等于',
                                                        value:5
                                                    },
                                                    {
                                                        content:'包含',
                                                        value:6
                                                    },
                                                    {
                                                        content:'不等于',
                                                        value:7
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    title:'',
                                    required:false,
                                    config:{
                                        //要改变的部分========================================
                                        template:'<input type="text" name="conditionValue">',
                                        scope:{
                                        }
                                        //====================================================
                                    }

                                }
                            ]
                        }
                    },
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                    }
                },
                hidden:hiddenList[5]
            },
        ]
    }


});

//影响字段下拉框数据(多选下拉框)(请求的是视图包含的字段)
model('affectColumns',function(){
    var This = this;

    /*selected--被选中的项
     如果是新增,selected="";
     如果是修改,selected="被选中着的id1,被选中的id2,...";
     */
    this.method('getListData',function (viewId,selected) {
        var selectServer = this.server({
            serverType:'api',
            method:'POST',
            url:'viewColumns'//查询视图包含字段集合
        }).receive(function (res) {

            var model={
                name:'affectColumns',
                // search:true,
                multiple:true,
                style:{
                    // width:'100%',
                },
                events:{
                    change:function () {
                        // console.log('原model事件');
                    }
                },
                dataList:[]
            };

            //如果selected="",为新增,不做选中处理
            if(selected==""){

                res.data.forEach(function (column) {
                    model.dataList.push({
                        content:column.columnName,//字段名称
                        value:column.id,//字段id
                        selected:false
                    })
                });
            }else{
                //如果是修改,做选中处理
                var selecteds = selected.split(",");
                res.data.forEach(function (column) {
                    var a = {
                        content:column.columnName,//字段名称
                        value:column.id,//字段id
                    }

                    selecteds.forEach(function (sele) {
                        if(column.id==sele){
                            a.selected = true;
                        }else{
                            a.selected = false;
                        }
                    });
                    model.dataList.push(a);
                });
            }

            This.$model = model;

        }.bind(this)).send({
            "viewId":viewId
        })
    })

});

//影响字段下拉框数据(下拉单选)-->字段筛选
model('fieldFilterAffectColumns',function(){
    var This = this;
    /*selected--被选中的项
     如果是新增,selected="";
     如果是修改,selected="被选中着的id1,被选中的id2,...";
     */
    this.method('getNewListData',function (viewId,selected) {
        var selectServer = this.server({
            serverType:'api',
            method:'POST',
            url:'columnFilterAffectColumns'//选择字段筛选时,要请求的影响字段接口
        }).receive(function (res) {

            var model={
                name:'affectColumns',
                // search:true,
                multiple:false,
                style:{
                    // width:'100%',
                },
                events:{
                    change:function () {
                        //根据选中的值请求字段的数据
                        // console.log('新model事件');
                    }
                },
                dataList:[]
            };

            //如果selected="",为新增,不做选中处理
            if(selected==""){

                res.data.forEach(function (column) {
                    model.dataList.push({
                        content:column.columnName,//字段名称
                        value:column.id,//字段id
                        selected:false
                    })
                });
            }else{
                //如果是修改,做选中处理
                var selecteds = selected.split(",");
                res.data.forEach(function (column) {
                    var a = {
                        content:column.columnName,//字段名称
                        value:column.id,//字段id
                    }

                    selecteds.forEach(function (sele) {
                        if(column.id==sele){
                            a.selected = true;
                        }else{
                            a.selected = false;
                        }
                    });
                    model.dataList.push(a);
                });
            }

            This.$model = model;

        }.bind(this)).send({
            "viewId":viewId
        })
    })

});

//字段下拉框数据(单选下拉框)(请求的是模块包含的字段)
model('sourceColumn',function(){
    var This = this;

    /*selected--被选中的项
     如果是新增,selected="";
     如果是修改,selected="被选中着的id1,被选中的id2,...";
     */
    this.method('getListData',function (moduleId,selected) {

        var selectServer = this.server({
            serverType:'api',
            method:'POST',
            url:'queryModuleField'//查询当前模块下的所有字段
        }).receive(function (res) {
            // console.log('字段',res);

            var model={
                name:'sourceColumnId',
                // search:true,
                // multiple:true,
                style:{
                    // width:'100%'
                },
                dataList:[]
            };

            //如果selected="",为新增,不做选中处理
           /* if(selected==""){
                res.data.forEach(function (column) {
                    model.dataList.push({
                        content:column.columnName,//字段名称
                        value:column.id,//字段id
                    })
                });
            }else{
                //如果是修改,做选中处理
                // var selecteds = selected.split(",");
                res.data.forEach(function (column) {
                    var a = {
                        content:column.columnName,//字段名称
                        value:column.id,//字段id
                    }

                    if(column.id==selected){
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
            "moduleId":moduleId
        })
    })

});

//字段下拉框数据(单选下拉框)(请求的是模块包含的字段)-->字段筛选
model('fieldFilterCustomVal',function(){
    var This = this;

    /*selected--被选中的项
     如果是新增,selected="";
     如果是修改,selected="被选中着的id1,被选中的id2,...";
     */
    this.method('getNewListData',function (affectsId,selected,callback) {

        var selectServer = this.server({
            serverType:'api',
            method:'POST',
            url:'columnFilterCustomVal'//选择字段筛选时,字段 数据的接口
        }).receive(function (res) {

            var model={
                name:'customVal',
                // search:true,
                // multiple:true,
                style:{
                    // width:'100%'
                },
                dataList:[]
            };

            //如果selected="",为新增,不做选中处理
            if(selected==""){
                Object.keys(res.data).forEach(function (key) {
                    model.dataList.push({
                        content:key,//字段名称
                        value:res.data[key]//字段value
                    })
                })
            }else{
                //如果是修改,做选中处理
                // var selecteds = selected.split(",");

                Object.keys(res.data).forEach(function (key) {
                    var a = {
                        content:key,//字段名称
                        value:res.data[key]//字段value
                    }

                    if(a.value==selected){
                        a.selected = true;
                    }else{
                        a.selected = false;
                    }
                    model.dataList.push(a);
                });
            }
            typeof callback ==='function' && callback(model.dataList);
            This.$model = model;

        }.bind(this)).send({
            "columnId":affectsId
        })
    })

});

//视图条件列表grid
model('viewConditionsList',[':viewConditionsEditFormLayout','$:@lib/configSendData/viewConditionsFormLayout'],function (editFormLayoutModel,$sendData) {

    var This = this,
        moduleId='',
        gridApi,
        gridConfig={
            //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
            // "url": "http://paas.memobile.com.cn/gateway/custom/C07003",
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

                                                    editFormLayoutModel.method('getSelectData',{viewId:rowData.viewId,moduleId:moduleId});
                                                    editFormLayoutModel.method('getData',rowData.id);

                                                    // 修改弹框
                                                    $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                                        var a;

                                                        //将scope作用域扩大,使得表单的保存按钮可用scope里的数据
                                                        var scope = {
                                                            editFormSource:$FRAME.$model(),
                                                            editFormLayout:editFormLayoutModel
                                                        };
                                                        dialog(a={
                                                            title: '视图条件信息',//【必填项】dialog标题
                                                            maxmin:true,
                                                            content:'<form id="form_viewConditionsEdit" $-form="editFormSource"><form-layout config="editFormLayout"></form-layout></form>', //【必填项】dialog填充内容，需要与scope配合使用
                                                            scope:scope,
                                                            zoom:'max',
                                                            filter:{},
                                                            width:'700px',//【非必填项】dialog宽，不填默认为640px
                                                            height:'560px;',//【非必填项】dialog高，不填默认为430px
                                                            btns:[
                                                                {
                                                                    name:'提交',
                                                                    trigger:function (eve,interface) { //【必填项】dialog通过需要进行的操作

                                                                        //表单校验
                                                                        // if(scope.editFormSource.valid()){
                                                                        var editFormData = a.scope.editFormSource.getData();

                                                                        //表单校验,保存数据到数据库
                                                                        var editFormServer = This.server({
                                                                            serverType:'api',
                                                                            method:'POST',
                                                                            url:'editViewConditions'//更新视图条件
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


                                                                        }.bind(This)).send($sendData("id",rowData.id,editFormData))
                                                                        // }else{
                                                                        //     //校验不通过
                                                                        //     alert('修改表单校验失败');
                                                                        //     return false;
                                                                        // }
                                                                    }
                                                                },
                                                                {
                                                                    name:'取消',
                                                                    trigger:function (eve,interface) {
                                                                        interface.close();
                                                                    }
                                                                }
                                                            ],
                                                        });
                                                    });

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
                                                            title:'删除视图条件',
                                                            content:'确定删除此条数据？',
                                                            pass:function () {
                                                                //确认删除按钮
                                                                var deleteServer = This.server({
                                                                    serverType:'api',
                                                                    method:'POST',
                                                                    url:'deleteViewConditions'//删除视图公式
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
                                                                    "id": rowData.id
                                                                })
                                                            },
                                                            cancel:function () {
                                                            }
                                                        })

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
                    name: "条件名称",
                    //字段key
                    field: "ruleName",
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
                    name: "条件类型",
                    //字段key
                    field: "ruleType",
                    //是否需要开启排序
                    order: true,
                    //字体 对齐方式
                    align: "center",
                    //列表数据配置
                    listConfig: function (data, rowData, index) {
                        return {
                            template: '<p>{{content}}</p>',
                            scope: {
                                content: data=='hidden'?'隐藏':data=='show'?'显示':data=='readOnly'?'只读':'筛选'
                            },
                            content: '',
                            events: {}
                        }
                    }
                },
                {
                    //字段标题
                    name: "执行顺序",
                    //字段key
                    field: "sort",
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
                    url:"viewConditionsList"
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
                    currentPage: data.pageNow,
                    viewId:data.viewId || '',
                    order: data.order,
                    pageSize: data.pageSize,
                    sidx: data.orderField
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

    this.method('getViewConditions',function (view) {
        gridConfig.sendData.viewId=view.ID;
        moduleId = view.PID;
        This.$model || (This.$model = gridConfig);
    });

});

//视图条件修改formLayout
model('viewConditionsEditFormLayout', ['$:@lib/configData/viewConditionsEditFormLayout','$:@lib/configData/modelDataListen',':affectColumns',':sourceColumn',':fieldFilterAffectColumns',':fieldFilterCustomVal'],function ($editFormLayout,$editDataListen,affectColumns,sourceColumn,fieldFilterAffectColumnsModel,fieldFilterCustomValModel) {

    var This = this,
        formSelecteData;
    //点击修改按钮时调用该方法,获取修改行的数据
    this.method('getSelectData',function (selectData) {
        formSelecteData = selectData;
        /*affectColumns.method('getListData',selectData.viewId);
        sourceColumn.method('getListData',selectData.moduleId);*/
    });

    this.method('getData',function (rowId) {

        var editData = {};
        var viewConditionsServer = this.server({
            serverType:'api',
            method:'POST',
            url:'viewConditionsDetail',//查询单个视图条件接口
        }).receive(function (res) {
            // console.log('修改res',res);
            editData.ruleName = res.data.ruleName;//视图条件名称
            editData.sort = res.data.sort||'';//执行顺序
            editData.ruleType = res.data.ruleType;//条件类型
            editData.affectColumns = res.data.affectColumns;//影响字段
            editData.isLinkage = res.data.isLinkage;//是否联动
            editData.viewRuleConditions=[];

            //如果条件类型是字段筛选
            if(res.data.ruleType==='columnFilter'){
                res.data.viewRuleConditions.forEach(function (rule) {
                    editData.viewRuleConditions.push({
                        "customVal":rule.customVal,//字段
                        "conditionType":rule.conditionType,//条件类型
                        "conditionValue":rule.conditionValue//条件值
                    })
                });

                //影响字段 , 传参数获取下拉列表(批量组件获取下拉列表需要传不同参数,动态处理)
                fieldFilterAffectColumnsModel.method('getNewListData',formSelecteData.viewId,editData.affectColumns);
                //批量组件的"字段"获取下拉列表
                fieldFilterCustomValModel.method('getNewListData',editData.affectColumns,editData.viewRuleConditions[0].customVal,function () {});
                //批量组件的"字段值"获取下拉列表
                sourceColumn.method('getListData',formSelecteData.moduleId,editData.viewRuleConditions[0].conditionValue);


                $editDataListen([fieldFilterAffectColumnsModel,fieldFilterCustomValModel,sourceColumn])(function (fieldFilterAffectColumnsModel,fieldFilterCustomValModel,sourceColumn) {
                    //传个数组给方法 ,这个方法的返回值是个方法, 此方法的参数是个回调函数,取到数据(前面括号里的是参数,后面括号里的是返回的数据)
                    This.$model = $editFormLayout(editData,fieldFilterAffectColumnsModel,fieldFilterCustomValModel,sourceColumn,This,formSelecteData);
                });

            }else{
                //条件类型非字段筛选
                res.data.viewRuleConditions.forEach(function (rule) {
                    editData.viewRuleConditions.push({
                        "sourceColumnId":rule.sourceColumnId,//来源字段
                        "conditionType":rule.conditionType,//条件类型
                        "conditionValue":rule.conditionValue//条件值
                    })
                });

                //影响字段 , 传参数获取下拉列表(批量组件获取下拉列表需要传不同参数,动态处理)
                affectColumns.method('getListData',formSelecteData.viewId,editData.affectColumns);
                //批量组件的"字段"获取下拉列表
                sourceColumn.method('getListData',formSelecteData.moduleId,editData.viewRuleConditions[0].sourceColumnId);


                $editDataListen([affectColumns,sourceColumn])(function (affectColumns,sourceColumn) {
                    This.$model = $editFormLayout(editData,affectColumns,sourceColumn,'',This,formSelecteData);
                });

            }

        }.bind(this)).send({
            "id":rowId
        });
    });


});

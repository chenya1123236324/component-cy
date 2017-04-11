/**
 * Created by lei on 17-1-10.
 */
//当前位置组件
model('currentLocation',function(){

    var viewId = $_GET['viewId'];

    var locationSever = this.server({
        serverType: 'api',
        method: 'post',
        url: 'currentLocation'    //'custom/C14003',
    }).success(function (res) {
        var superiorName = null,  //顶级菜单名称
            locationNameOne = null,   //当前页面的名称
            listArr = [];
        res.forEach(function(data){

            var dataViewId;
            if(data.viewId > 0){
                dataViewId = data.viewId
            }
            //pid为0 时指顶级菜单
            if(data.pid === 0){
                superiorName = data.name;
            }
            //判断isCurrentLocation为true指当前页面，false指后面列表
            if(data.isCurrentLocation === true){
                locationNameOne = data.name;
            }else{
                if(data.pid != 0){
                    var listData = {
                        locationName:data.name,//右侧位置名称
                        // href:'',
                        events:{
                            click:function (event) {
                                var viewDetail = $FRAME.$model(function () {
                                    //请求接口视图详情
                                    var $moduleListServer = this.server({
                                        serverType:'api',
                                        method:'POST',
                                        url:'viewRenderConditions'     //视图渲染条件,此处用来判断viewId对应的页面
                                    }).receive(function (res) {

                                        if( res.status == 0 ) {
                                            console.log("新增页面数据异常!")
                                        } else {
                                            var viewInfo = res.data.view,  //得到视图信息
                                                viewType = viewInfo.viewType,  //视图类型
                                                customUrl = viewInfo.viewUrl;  //自定义路由

                                            //根据视图类型来决定跳转的页面
                                            if(viewType && viewType === 1){  //列表页面
                                                $FRAME.redirect('home/custom/list.html?viewId='+viewId);

                                            }else if(viewType && viewType === 2){     //新增页面
                                                $FRAME.redirect('home/custom/add.html?viewId='+viewId);

                                            }else if(viewType && viewType === 3){    //修改页面
                                                $FRAME.redirect('home/custom/edit.html?viewId=' + viewId);

                                            }else if(viewType && viewType === 4){     //详情页面
                                                $FRAME.redirect('home/custom/detail.html?viewId=' + viewId + '&recordId=48&cp=1');

                                            }else if(viewType && viewType === 5){     //自定义页面
                                                $FRAME.redirect(customUrl);
                                            }


                                        }
                                    }.bind(this)).send({
                                        "viewId":dataViewId
                                    });

                                });
                            }
                        }
                    };

                    listArr.push(listData)
                }
            }
        })
        this.$model=[{
            superiorName:superiorName,
            locationNameOne:locationNameOne,
            locationHref:"#1",
            leftColor:'#fff',  //左侧内容背景颜色
            rightColor:'#fff', //右侧内容背景颜色
            activeColor:'#21c3b9', //右侧内容鼠标悬浮背景颜色
            verticalLine:'1px solid #A3B0CC',//右侧内容竖线颜色
            list:listArr
        }]
    }.bind(this)).fail(function (msg) {
        console.log(msg)
    }).send({
        viewId: viewId
    })
});

//高级搜索advanced-query组件
model('advancedQuery', ['$:@lib/custom/treat/searchCascade', '$:@lib/custom/treat/systemSearchBtn', '$:@lib/custom/treat/customerTagsSearch'], function (searchCascade, systemSearchBtn, customerTagsSearch) {
    var This = this,
        viewId = $_GET['viewId'],
        $gridApi = null,
        searchLabel = null,
        btnGroupsCustom = null;
    // btnGroupsSystem=null;

    searchCascade(This, function (moduleList) {

        This.$model.list[0].config.scope.advancedQuery.list[0].config.scope.batchCondition.list[0].config.scope.queryField = moduleList;
    });



    This.method('gridList', function (gridApi, viewId) {
        //系统查询标签
        systemSearchBtn(This, gridApi, function (btnGroupsSystem) {
            This.$model.list[1].config.scope.defaultQueryTag.list = btnGroupsSystem;
        });

        //自定义查询标签
        customerTagsSearch(This, gridApi, function (customerSystem) {
            This.$model.list[2].config.scope.newAddQueryTag.list = customerSystem;
        })


        this.$model = {
            style: {
                "background": "#fcfdff",
                "height": "60px",
            },
            list: [

                //form-layout
                {
                    type: 'formLayoutQueryTag',  //【组件判断标识，不可改】
                    config: {
                        template: '<form-layout config="advancedQuery"></form-layout>',
                        scope: {
                            advancedQuery: {
                                scope: {},
                                filter: {},
                                list: [
                                    {
                                        title: '',
                                        require: false,
                                        config: {
                                            type: 'custom',
                                            template: '<batch-condition config="batchCondition"></batch-condition>',
                                            scope: {
                                                batchCondition: {
                                                    style: {
                                                        "margin-left": "0",
                                                        "margin-top": "20px",
                                                    },
                                                    list: [
                                                        {
                                                            title: '',
                                                            require: false,
                                                            config: {
                                                                template: '<select  config="queryField"></select> ',
                                                                scope: {
                                                                    queryField: {
                                                                        name: 'queryField',
                                                                        style: {
                                                                            width: '160px',
                                                                        },
                                                                        dataList: []
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            title: '',
                                                            require: false,
                                                            config: {
                                                                template: '<select  config="queryCondition"></select> ',
                                                                scope: {
                                                                    queryCondition: {
                                                                        name: 'queryCondition',
                                                                        style: {
                                                                            width: '160px',
                                                                        },
                                                                        dataList: [
                                                                            {
                                                                                content: '--请选择--',
                                                                                value: '-1',
                                                                                selected: true
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            title: '',
                                                            require: false,
                                                            config: {
                                                                template: '<input name="contentText"  type="text" style="height:30px;line-height:30px;" class="contentText"/>',
                                                                scope: {}
                                                            }
                                                        }
                                                    ]
                                                }
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
                                        title: '',
                                        require: false,
                                        class: 'clos-all',
                                        config: {
                                            type: 'custom',
                                            template: '<btn-group-me data="advancedSearchSave" receive="getFormData"></btn-group-me>',
                                            scope: {
                                                advancedSearchSave: [{
                                                    isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
                                                    spacing: '20px',//【非必填项】两个按钮之间的间距
                                                    eventIdentifierName: 'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
                                                    style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                                                        display: "inline-block",
                                                        margin: "30px 4px",
                                                    },
                                                    list: [
                                                        {
                                                            class: 'btn btn-blue', //【必填项】按钮样式
                                                            icon: '', //【非必填项】图标
                                                            label: '保存',//【必填项】按钮文字
                                                            align: 'center',//【必填项】文字居中
                                                            padding: '6px 40px', //【必填项】按钮内边距，可以控制按钮大小
                                                            events: {
                                                                click: function (event, receiveData) {    //【必填项】按钮事件
                                                                    var formData = receiveData.getData();

                                                                    var contentText = formData.contentText,        //输入的内容，备用
                                                                        listBtn,
                                                                        conditionList = [];                        //新增标签接口的入参集合

                                                                    //这里三个输入框得到的数据任意一个做个判断，是否是多个条件（如果是值为数组）
                                                                    if (!Array.isArray(contentText)) {
                                                                        var columnId = formData.queryField.split(',')[4],       //grid列表中的列字段ID
                                                                            moduleIdSearch = formData.queryField.split(',')[5];  //modelId

                                                                        var transmitData = {
                                                                            "columnId": columnId,
                                                                            "moduleId": moduleIdSearch,
                                                                            "searchType": formData.queryCondition,
                                                                            "screenVal": formData.contentText
                                                                        }

                                                                        conditionList.push(transmitData);
                                                                    } else {
                                                                        var columnIds = formData.queryField,
                                                                            queryConditions = formData.queryCondition,         //搜索条件类型
                                                                            contentTexts = formData.contentText;         //搜索内容

                                                                        columnIds.forEach(function (res, key) {
                                                                            var columnId = res.split(','),
                                                                                transmitData = {};

                                                                            transmitData.columnId = columnId[4];
                                                                            transmitData.moduleId = columnId[5];

                                                                            conditionList.push(transmitData);

                                                                        })

                                                                        //将多个条件类型依次插入数组
                                                                        queryConditions.forEach(function (data, key) {
                                                                            conditionList[key].searchType = data
                                                                        })

                                                                        //将多个搜索内容依次插入数组
                                                                        contentTexts.forEach(function(data,key){
                                                                            conditionList[key].screenVal = data
                                                                        })

                                                                    }

                                                                    //新增弹框
                                                                    $packages('{PLUGINS}/modal/modal-dialog', function (dialog) {
                                                                        var a;
                                                                        dialog(a = {
                                                                            title: '新增查询标签名称',//【必填项】dialog标题
                                                                            content: '<div class="queryNameLayout" style="margin:30px;"><form-layout config="queryName"></form-layout></form></div>', //【必填项】dialog填充内容，需要与scope配合使用
                                                                            scope: {
                                                                                queryName: {
                                                                                    scope: {},
                                                                                    filter: {},
                                                                                    list: [
                                                                                        {
                                                                                            title: '查询标签名称',
                                                                                            required: false,
                                                                                            config: {
                                                                                                type: 'custom',
                                                                                                template: '<input type="text" name="queryName">',
                                                                                                scope: {},
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
                                                                                    ]

                                                                                }
                                                                            },
                                                                            maxmin: false,
                                                                            zoom: 'min',
                                                                            filter: {},
                                                                            width: '460px',//【非必填项】dialog宽，不填默认为640px
                                                                            height: '200px;',//【非必填项】dialog高，不填默认为430px
                                                                            btns: [
                                                                                {
                                                                                    name: '保存',
                                                                                    trigger: function (eve, interface) {         //【必填项】dialog通过需要进行的操作
                                                                                        //当保存成功数据过后
                                                                                        //新增的加入自定义的搜索条件
                                                                                        var relname = document.querySelector("[name='queryName']").value,
                                                                                            moduleId = $_GET['moduleId'],
                                                                                            viewId = $_GET['viewId'];

                                                                                        //新增查询标签
                                                                                        var addQueryTags = $FRAME.$model(function () {

                                                                                            //选择模块
                                                                                            var $queryTagsServer = this.server({
                                                                                                serverType: 'api',
                                                                                                method: 'POST',
                                                                                                url: 'queryTags'        //新增条件查询,C08007
                                                                                            }).receive(function (res) {
                                                                                                queryTagsId = res.data.id;   //查询标签id

                                                                                                var listBtn = {
                                                                                                    class: 'btn btn-sapphire-blue', //【必填项】按钮样式   宝蓝色
                                                                                                    icon: 'iconfont icon-chenghao', //【非必填项】图标
                                                                                                    label: res.data.tagName,//【必填项】按钮文字
                                                                                                    align: 'right',//【必填项】文字居中
                                                                                                    padding: '7px 14px',  //【必填项】按钮内边距，可以控制按钮大小
                                                                                                    events: {
                                                                                                        click: function (event) {

                                                                                                            //使用查询标签下的 真实数据分页
                                                                                                            $gridApi = gridApi.get();
                                                                                                            console.log(gridApi, $gridApi)

                                                                                                            $gridApi.sendData({
                                                                                                                "viewId": res.data.viewId,    //暂时写死 应为
                                                                                                                "currentPage": 1,
                                                                                                                "pageSize": 20,
                                                                                                                "sidx": "id",
                                                                                                                "order": "desc",
                                                                                                                "tagId": queryTagsId,      //目前写死，queryTagsId
                                                                                                                "fuzzyQueryVal": ''
                                                                                                            }, false);
                                                                                                            $gridApi.update();
                                                                                                        }
                                                                                                    },
                                                                                                    iconEvents: {
                                                                                                        click: function (event) {
                                                                                                            //停止事件冒泡
                                                                                                            event.stopPropagation();

                                                                                                            $packages('{PLUGINS}/modal/modal-dialog', function (dialog) {
                                                                                                                dialog({
                                                                                                                    title: '确认删除',
                                                                                                                    maxmin: true,
                                                                                                                    content: '<h3>{{title}}</h3>',
                                                                                                                    scope: {
                                                                                                                        title: '确认删除?'
                                                                                                                    },
                                                                                                                    filter: {},
                                                                                                                    height: '200px',
                                                                                                                    width: '400px',
                                                                                                                    btns: [
                                                                                                                        {
                                                                                                                            name: '确认',
                                                                                                                            trigger: function (eve, interface) {

                                                                                                                                var tagsDelete = $FRAME.$model(function () {

                                                                                                                                    var $queryTagsServer = this.server({
                                                                                                                                        serverType: 'api',
                                                                                                                                        method: 'POST',
                                                                                                                                        url: 'deleteTags'
                                                                                                                                    }).receive(function (res) {

                                                                                                                                        customerTagsSearch(This, gridApi, function (customerSystem) {
                                                                                                                                            This.$model.list[2].config.scope.newAddQueryTag.list = customerSystem;
                                                                                                                                        })

                                                                                                                                    }.bind(this)).send({
                                                                                                                                        "id": queryTagsId
                                                                                                                                    });
                                                                                                                                });

                                                                                                                                interface.close();
                                                                                                                            }
                                                                                                                        },
                                                                                                                        {
                                                                                                                            name: '取消',
                                                                                                                            theme: "warning", //[ primary , success , info , warning , danger ]
                                                                                                                            trigger: function (eve, interface) {
                                                                                                                                interface.close();
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                })
                                                                                                            })

                                                                                                        }
                                                                                                    }
                                                                                                };

                                                                                                This.$model.list[2].config.scope.newAddQueryTag.list.push(listBtn)

                                                                                            }.bind(this)).send({
                                                                                                "moduleId": moduleId,
                                                                                                "tagName": relname,
                                                                                                "viewId": viewId,
                                                                                                "searchs": conditionList
                                                                                            });


                                                                                        });
                                                                                        interface.close();
                                                                                    },
                                                                                },
                                                                                {
                                                                                    name: '取消',
                                                                                    trigger: function (eve, interface) {
                                                                                        interface.close();
                                                                                    }
                                                                                },
                                                                            ],

                                                                        })
                                                                    });
                                                                    document.querySelector(".isShowUL").className = 'isShowUL clickTabBefore';


                                                                }
                                                            }
                                                        }, {
                                                            class: 'btn btn-blue-outline',//按钮样式
                                                            icon: '', //图标
                                                            label: '取消',//按钮文字
                                                            align: 'center',//文字居中
                                                            padding: '6px 40px',//按钮内边距，可以控制按钮大小
                                                            events: {
                                                                click: function (event) {
                                                                    document.querySelector(".isShowUL").className = 'isShowUL clickTabBefore';
                                                                    //批量清空新增的搜索条件
                                                                    document.getElementById("addBatchConditionBox").innerHTML = "";
                                                                }
                                                            }
                                                        },
                                                    ]
                                                }]
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
                                    }
                                ]
                            }
                        }
                    }
                },

                //默认查询标签获取数据
                {
                    type: 'defaultQueryTag', //【组件判断标识，不可改】
                    config: {
                        template: '<button-group config="defaultQueryTag"></button-group>',
                        scope: {
                            defaultQueryTag: {
                                style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                                    display: "inline-block",
                                },
                                btnStyle: {  //【必填项】按钮内边距，可以控制按钮大小
                                    padding: '8px 14px',
                                    'margin-left': '10px'
                                },
                                list: []
                            }
                        }
                    }
                },
                //得到高级检索中新增的标签
                {
                    type: 'newAddQueryTag', //【组件判断标识，不可改】
                    config: {
                        template: '<button-group config="newAddQueryTag"></button-group>',
                        scope: {
                            newAddQueryTag: {
                                style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                                    display: "inline-block",
                                    float: "right",
                                },
                                btnStyle: {  //【必填项】按钮内边距，可以控制按钮大小
                                    padding: '6px 5px',
                                    'margin-left': '10px'
                                },
                                list: []
                            }
                        }
                    }
                },
            ]
        }
    })
});


//列表的数据
model('gridConf', ['$:@lib/custom/treat/dataListConf'], function (dataListConf) {
    var This = this


    var gridStructureSever = this.server({
        serverType: 'api',
        method: 'post',
        url: 'viewRenderConditions'
    });

    this.method('getConf', function (viewId, gridApi) {

        gridStructureSever.success(function (res) {
            // console.log(res,'-->>',dataListConf(res))
            //获取方法转译后的数据
            this.$model = dataListConf(viewId, res, gridApi);

        }.bind(this)).fail(function (msg) {
            console.log(msg)
        }).send({
            viewId: viewId
        })
    })

});


//清空
model('btnEmpty', function () {
    var This = this,
        viewId = $_GET['viewId']
    This.method('emptyBtn', function (gridApi) {


        This.$model = [{
            isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
            spacing: '15px',//【非必填项】两个按钮之间的间距
            eventIdentifierName: 'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
            style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                // padding:'50px',
                // 'margin-bottom':'30px'
            },
            list: [
                {
                    class: 'btn btn-teal-outline',           //【必填项】按钮样式
                    icon: '',                                //【非必填项】图标
                    label: '清空',                           //【必填项】按钮文字
                    align: 'center',                         //【必填项】文字居中
                    padding: '4px 14px',                     //【必填项】按钮内边距，可以控制按钮大小
                    events: {
                        click: function (event) {            //【必填项】按钮事件
                            var $gridApi = gridApi.get();
                            console.log($gridApi, '111111111111')
                            // window.location.reload(true);
                            $gridApi.sendData({
                                viewId: viewId,
                                "currentPage": 1,
                                "pageSize": 20,
                                "sidx": "id",
                                "order": "desc",
                                fuzzyQueryVal: ''
                            }, false);

                            $gridApi.update();

                        }
                    }
                }
            ]
        }]
    })

});


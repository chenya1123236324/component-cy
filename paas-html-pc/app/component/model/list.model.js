
//消息中心的消息列表
model('news-center-list',function(){

    // var newsListServer = this.server({
    //     type:'http',
    //     url:'',
    //     // receive:function(data){
    //     //     this.$model = [
    //     //         {
    //     //             label:'消息的li层',
    //     //             list:[
    //     //                 {
    //     //                     label:'消息的title',
    //     //                     list:[
    //     //                         {
    //     //                             icon:'icon-wenjianjia'
    //     //                         },
    //     //                         {
    //     //                             content:'第一个li的标题'
    //     //                         }
    //     //                     ]
    //     //                 },{
    //     //                     label:'消息的content',
    //     //                     list:[
    //     //                         {
    //     //                             icon:''
    //     //                         },{
    //     //                             content:'第一个li的内容'
    //     //                         }
    //     //                     ]
    //     //                 },{
    //     //                     label:'消息的时间',
    //     //                     list:[
    //     //                         {
    //     //                             icon:'icon-shuxian'
    //     //                         },{
    //     //                             content:'2016年10月10日 18点35分44秒'
    //     //                         }
    //     //                     ]
    //     //                 }
    //     //             ]
    //     //         },
    //     //         {
    //     //             label:'消息的li层',
    //     //             list:[
    //     //                 {
    //     //                     label:'消息的title',
    //     //                     list:[
    //     //                         {
    //     //                             icon:'icon-wenjianjia'
    //     //                         },
    //     //                         {
    //     //                             content:'第二个li的标题'
    //     //                         }
    //     //                     ]
    //     //                 },{
    //     //                     label:'消息的content',
    //     //                     list:[
    //     //                         {
    //     //                             icon:''
    //     //                         },{
    //     //                             content:'第二个li的内容'
    //     //                         }
    //     //                     ]
    //     //                 },{
    //     //                     label:'消息的时间',
    //     //                     list:[
    //     //                         {
    //     //                             icon:'icon-shuxian'
    //     //                         },{
    //     //                             content:'2016年10月10日 18点35分44秒'
    //     //                         }
    //     //                     ]
    //     //                 }
    //     //             ]
    //     //         }
    //     //     ]
    //     // }
    //
    //
    // });

    // newsListServer.send({name:''});


    this.$model = [
        {
            label:'消息的li层',
            list:[
                {
                    label:'消息的title',
                    className:'list-title',
                    list:[
                        {
                            icon:'icon-wenjianjia'
                        },
                        {
                            content:'第一个li的标题'
                        }
                    ]
                },
                {
                    label:'消息的content',
                    className:'list-content',
                    list:[
                        {
                            icon:''
                        },{
                            content:'第一个li的内容'
                        }
                    ]
                },
                {
                    label:'消息的时间',
                    className:'list-time',
                    list:[
                        {
                            icon:'icon-shuxian'
                        },{
                            content:'2016年10月10日 18点35分44秒'
                        }
                    ]
                }
            ]
        },
        {
            label:'消息的li层',
            list:[
                {
                    label:'消息的title',
                    className:'list-title',
                    list:[
                        {
                            icon:'icon-wenjianjia'
                        },
                        {
                            content:'第二个li的标题'
                        }
                    ]
                },
                {
                    label:'消息的content',
                    className:'list-content',
                    list:[
                        {
                            icon:''
                        },{
                            content:'第二个li的内容'
                        }
                    ]
                },
                {
                    label:'消息的时间',
                    className:'list-time',
                    list:[
                        {
                            icon:'icon-shuxian'
                        },{
                            content:'2016年10月10日 18点35分44秒'
                        }
                    ]
                }
            ]
        }
    ]


    function aa(model){
        var dataModel = config.dataModel;
        var re = [];
        model.forEach(function(_d){
           var tmp = {
               label : _d[dataModel.label],
           }
        })
    }

});

model('ztree-list',function(){
    // this.$model = [
    //         {
    //             isGroup:true,
    //             nextSibling:false,
    //             label:'li层数据',
    //             spanClassName:'switch1_open_nb',//li里span的类名
    //             aContent:'赞同科技(2660)',//li里a的内容
    //             aUrl:'',//li里a的href
    //             list:[//li里ul的数据
    //                 {
    //                     isGroup:false,
    //                     nextSibling:true,
    //                     label:'li层数据',
    //                     spanClassName:'dot_mid',//li里span的类名
    //                     aContent:'人力资源部(25)',//li里a的内容
    //                     aUrl:'',//li里a的href
    //                 },
    //                 {
    //                     isGroup:true,
    //                     nextSibling:true,
    //                     label:'li层数据',
    //                     spanClassName:'switch1_open_nb',//li里span的类名
    //                     aContent:'市场部(1125)',//li里a的内容
    //                     aUrl:'',//li里a的href
    //                     list:[
    //                         {
    //                             isGroup:false,
    //                             nextSibling:false,
    //                             label:'li层数据',
    //                             spanClassName:'dot_last',//li里span的类名
    //                             aContent:'华北市场(25)',//li里a的内容
    //                             aUrl:'',//li里a的href
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     isGroup:true,
    //                     nextSibling:false,
    //                     label:'li层数据',
    //                     spanClassName:'switch_open_nb',//li里span的类名
    //                     aContent:'市场部(1125)',//li里a的内容
    //                     aUrl:'',//li里a的href
    //                     list:[
    //                         {
    //                             isGroup:false,
    //                             nextSibling:false,
    //                             label:'li层数据',
    //                             spanClassName:'dot_mid',//li里span的类名
    //                             aContent:'华北市场(25)',//li里a的内容
    //                             aUrl:'',//li里a的href
    //                         },
    //                         {
    //                             isGroup:false,
    //                             nextSibling:false,
    //                             label:'li层数据',
    //                             spanClassName:'dot_last',//li里span的类名
    //                             aContent:'华北市场(25)',//li里a的内容
    //                             aUrl:'',//li里a的href
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]


    this.$model = [
        {
            iconOpen:'switch1_open_nb',     //节点展开图标类名
            iconClose:'switch1_close_nb', //节点收起图标类名
            isPull:true,   //节点是否展开
            chkDisabled:false,    //节点的复选框是否被禁用
            checked:false,      //节点的输入框是否被勾选
            name:'赞同科技',//节点的名称
            tId:'',//不要赋值(节点的唯一标识)
            events: {
                click: function () {
                    // console.log("我点击了最外层li");
                }
            },
            children:[          //孩子节点
                {
                    icon:'dot_mid',//如果只设置icon属性,则展开收起都用同一个图标
                    chkDisabled:false,
                    checked:false,
                    name:'人力资源部',
                    tId:''
                },
                {
                    iconOpen:'switch_open_nb',
                    iconClose:'switch_close_nb',
                    isPull:false,   //节点是否展开
                    chkDisabled:true,
                    checked:false,
                    name:'市场部',
                    tId:'',
                    children:[
                        {
                            iconOpen:'switch_open_nb',
                            iconClose:'switch_close_nb',
                            isPull:false,   //节点是否展开
                            chkDisabled:false,
                            checked:true,
                            name:'华北市场',
                            tId:'',
                            children:[
                                {
                                    icon:'dot_last',
                                    chkDisabled:false,
                                    checked:false,
                                    name:'北京市场',
                                    tId:''
                                }
                            ]
                        }

                    ]
                },
                {
                    icon:'dot_mid',
                    chkDisabled:false,
                    checked:false,
                    name:'运营管理部',
                    tId:''
                },
                {
                    iconOpen:'switch_open_nb',
                    iconClose:'switch_close_nb',
                    isPull:true,   //节点是否展开
                    chkDisabled:false,
                    checked:false,
                    name:'技术委员会部',
                    tId:'',
                    children:[
                        {
                            icon:'dot_mid',
                            chkDisabled:false,
                            checked:false,
                            name:'支付结算事业部',
                            tId:''
                        },
                        {
                            icon:'dot_last',
                            chkDisabled:false,
                            checked:true,
                            name:'交付中心',
                            tId:''
                        }
                    ]
                },
                {
                    icon:'dot_mid',
                    chkDisabled:false,
                    checked:true,
                    name:'财务办',
                    tId:''
                },
                {
                    icon:'dot_last',
                    chkDisabled:false,
                    checked:false,
                    name:'行政部',
                    tId:''
                }
            ]

        }
    ]



})

/**
 * Created by chenya on 2016/10/24.
 */
//得到高级检索内容中保存、清空按钮数据
model('advancedSearchSave',function(){
    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'10px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'advancedSearchSave',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            display:"inline-block",
            margin: "0 30px 30px 20px",
        },
        list:[
            {
                class:'btn btn-blue', //【必填项】按钮样式   宝蓝色
                icon:'', //【非必填项】图标
                label:'保存',//【必填项】按钮文字
                align:'center',//【必填项】文字居中
                padding:'6px 45px',  //【必填项】按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) { //【必填项】按钮事件
                        console.log(this,this.innerHTML,event)
                    }
                }
            },{
                class:'btn btn-blue-outline',//按钮样式  印第安红
                icon:'', //图标
                label:'清空',//按钮文字
                align:'center',//文字居中
                padding:'6px 45px',  //按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        //批量清空新增的搜索条件
                        document.getElementById("addSearchBox").innerHTML = "";
                    }
                }
            }
        ]
    }]
});

//得到高级检索中新增的标签
model('newAddQueryTag',function(){
    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'10px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'newAddQueryTag',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            display:"inline-block",
            margin: "11px 0",
            float:"right",
        },
        list:[
            {
                class:'btn btn-azurite', //【必填项】按钮样式   宝蓝色
                icon:'iconfont icon-chenghao', //【非必填项】图标
                label:'全部高级客户',//【必填项】按钮文字
                align:'left',//【必填项】文字居左
                padding:'6px 5px',  //【必填项】按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) { //【必填项】按钮事件
                        console.log(this,this.innerHTML,event)
                    }
                },
                iconEvents:{
                    click:function (event) {
                        //停止事件冒泡
                        event.stopPropagation();
                        console.log(this,this.innerHTML,event)
                        alert("您确定要删除这条信息吗?");
                    }
                }
            }
        ]
    }]
});

//得到高级检索中下拉框检索类目与检索规则
model('searchSelect',function(){

    this.$model = {
        selectChange:function () {
            console.log(this.value)
        },
        //检索类目
        searchCategories:{
            style:{
                width:'220px',
            },
            name:'selectList',
             //content:"检索类目",//默认select框里是请选择,如有其他需要,请填写内容
             //icon:'icon-xiala',
            dataList:[
                {
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'检索类目',
                    value:'searchCategories0',
                    selected:true
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'名称',
                    value:'searchCategories1',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'联系人',
                    value:'searchCategories2',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'创建时间',
                    value:'searchCategories3',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'检索类目',
                    value:'searchCategories4',
                    selected:false
                }
            ]
        },
        //检索规则
        searchRule:{
            style:{
                width:'160px',
            },
            name:'selectList2',
            //content:"检索规则",//默认select框里是请选择,如有其他需要,请填写内容
            //icon:'icon-xiala',
            dataList:[
                {
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'检索规则',
                    value:'searchRule0',
                    selected:true
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'等于',
                    value:'searchRule1',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'大于',
                    value:'searchRule2',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'小于',
                    value:'searchRule3',
                    selected:false
                }
            ]
        }
    }



});








//Grid-dialog组件中按钮
model('gridDialogButton',function(){
    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            "text-align": "center",
        },
        list:[
            {
                class:'btn btn-teal', //【必填项】按钮样式
                icon:'', //【非必填项】图标
                label:'确定',//【必填项】按钮文字
                align:'center',//【必填项】文字居中
                padding:'6px 40px', //【必填项】按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) { //【必填项】按钮事件
                        console.log(this,this.innerHTML,event);
                        alert("dialog组件保存");
                    }
                }
            },{
                class:'btn btn-teal-outline',//按钮样式
                icon:'', //图标
                label:'取消',//按钮文字
                align:'center',//文字居中
                padding:'6px 40px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event);
                        //关闭dialog框
                        document.querySelector("#GRIDZD .modal").style.display="none";
                        //关闭dialog遮罩层
                        document.querySelector("#GRIDZD .modal-backdrop").style.display="none";
                    }
                }
            }
        ]
    }]
});


//Grid中调用的dialog组件
model('gridDialogData',function(){

    //----------测试数据----------------
    var gridModel=this.model();
    //this.method('setGridData',function(gridData){
    //    gridModel.write(gridData);
    //});
    gridModel.write('btnModel',gridModel);
    var btnModel=["1"];
    //----------测试数据----------------

    this.$model = {
        dialogData:{
            title:"请选择显示的字段", //【必填】 dialog标题名称
            dialogID:"GRIDZD",   //【必填】 dialog的ID，唯一标识dialog
            style:{
                width:'640px', //【必填】 dialog宽度  不填默认是640px
                height:'430px'//【必填】 dialog高度   不填默认是430px
            },
            list:[
                {
                    //template: '<grid data="gridData"></grid>',
                    template: '<btn-group-me data="btnModel"></btn-group-me>',
                    scope:{
                        btnModel:btnModel
                    }
                },{
                    template: '<input type="test" value="操作" class="searchText"/>',
                    scope:{

                    }
                }
            ],
            events:{
                click:function (event) { //【必填项】点击事件
                    console.log(this,this.innerHTML,event)
                }
            }
        }
    }
});

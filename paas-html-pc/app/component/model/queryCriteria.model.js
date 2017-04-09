/**
 * Created by chenya on 2016/11/1.
 */

//得到查询条件组件中下拉框查询字段与查询条件
model('queryCriteriaSelect',function(){
    this.$model = {
        selectChange:function () {
            console.log(this.value)
        },
        //查询字段
        queryField:{
            style:{
                width:'160px',
            },
            name:'queryField',
            //content:"查询字段",//默认select框里是请选择,如有其他需要,请填写内容
            //icon:'icon-xiala',
            dataList:[
               {
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'名称',
                    value:'queryField1',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'联系人',
                    value:'queryField2',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'创建时间',
                    value:'queryField3',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'价格',
                    value:'queryField4',
                    selected:false
                }
            ]
        },
        //查询条件
        queryCondition:{
            style:{
                width:'160px',
            },
            name:'queryCondition',
            //content:"查询条件",//默认select框里是请选择,如有其他需要,请填写内容
            //icon:'icon-xiala',
            dataList:[
                {
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'等于',
                    value:'queryCondition1',
                    selected:true
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'大于',
                    value:'queryCondition2',
                    selected:false
                },{
                    isGroup:false,
                    disabled:false,//是否不可以选择,默认false(即可选择)
                    content:'小于',
                    value:'queryCondition3',
                    selected:false
                }
            ]
        }
    }



});

//得到查询条件组件中保存、清空按钮数据
model('queryCriteriaSave',function(){
    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'advancedSearchSave',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            display:"inline-block",
            margin: "40px 30px 10px 88px",
        },
        list:[
            {
                class:'btn btn-teal', //【必填项】按钮样式   宝蓝色
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
                class:'btn btn-teal-outline',//按钮样式  印第安红
                icon:'', //图标
                label:'取消',//按钮文字
                align:'center',//文字居中
                padding:'6px 45px',  //按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        //批量清空新增的搜索条件
                        document.getElementById("addQueryConditionBox").innerHTML = "";
                    }
                }
            }
        ]
    }]
});

//得到查询条件组件的配置信息
model('queryCriteria',function(){
    this.$model=[{
        queryName:"配置查询条件", //【为后期扩展预留，可不填】
        style: { //查询条件组件css样式配置
            display:"inline-block",//【必填项】
            width:"60%",//【必填项】//查询条件组件宽度
            background:"#f6f8fa",//【非必填项】//查询条件组件背景颜色
            margin: "50px 50px"//【非必填项】//查询条件组件距离外部盒子边距
    },
        list:[]
    }]
});
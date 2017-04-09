/**
 * Created by chenya on 2016/10/24.
 */

//默认查询标签获取数据
model('defaultQueryTag',function(){
    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'10px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'defaultQueryTag',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            //"text-align":"center",
             padding:"11px 0",
            display:"inline-block",
        },
        list:[
            {
                class:'btn btn-sapphire-blue', //【必填项】按钮样式   宝蓝色
                icon:'', //【非必填项】图标
                label:'潜在客户',//【必填项】按钮文字
                align:'center',//【必填项】文字居中
                padding:'7px 14px',  //【必填项】按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) { //【必填项】按钮事件
                        console.log(this,this.innerHTML,event)
                    }
                }
            },{
                class:'btn btn-indian-red',//按钮样式  印第安红
                icon:'', //图标
                label:'意向客户',//按钮文字
                align:'center',//文字居中
                padding:'8px 14px', //按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            },{
                class:'btn btn-darkviolet',//按钮样式
                icon:'', //图标
                label:'高级客户', //按钮文字
                align:'center', //文字居左
                padding:'8px 14px', //按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            },{
                class:'btn btn-golden',//按钮样式
                icon:'', //图标
                label:'VIP客户', //按钮文字
                align:'right', //文字居右
                padding:'8px 14px', //按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            }
        ]
    }]
});

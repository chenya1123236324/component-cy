/**
 * Created by chenya on 2016/10/26.
 */
//dialog组件中按钮
model('dialogButton',function(){
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
                label:'保存',//【必填项】按钮文字
                align:'center',//【必填项】文字居中
                padding:'6px 40px', //【必填项】按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) { //【必填项】按钮事件
                        // console.log(this,this.innerHTML,event);
                        // alert("dialog组件保存");
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
                        document.querySelector("#XZZDMC .modal").style.display="none";
                        //关闭dialog遮罩层
                        document.querySelector("#XZZDMC .modal-backdrop").style.display="none";
                    }
                }
            }
        ]
    }]
});


//dialog组件模板
model('dialogData',function(){

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
            title:"新增字典名称", //【必填】 dialog标题名称
            dialogID:"XZZDMC",   //【必填】 dialog的ID，唯一标识dialog
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
                    template: '<input type="test" value="dialog组件中填充数据" class="searchText"/>',
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
/**
 * Created by chenya on 2016/11/24.
 */

//模糊查询组件模板
model('fuzzyQuery',function(){
    this.$model ={
        fuzzyQueryData:{
            style:{   //自定义样式
                width:'240px',//【必填】fuzzyQuery宽度
            },
            placeholder:'请输入用户名',//文本框内提示
            id:'',//当前操作的查询组件id,不填默认为fuzzyQueryID
            events:{
                click:function (event) { //【必填项】按钮事件
                    console.log(this);
                    //得到输入框节点
                    var getInput=this.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild;
                    //点击的值
                    getInput.value=this.innerText;
                    //点击的id
                    getInput.id=this.id;
                    //关闭模糊搜索到的列表
                    this.parentNode.innerHTML = "";
                }
            },
            keyDownEvents:{
                keydown:function (event) { //【必填项】按钮事件
                    var e=window.event||arguments.callee.caller.arguments[0];
                    if(e.keyCode==13){
                        alert("你按下了回车");
                    }
                }
            },
            list:[
                {
                    name:'潜在客户', //【必填项】名称
                    value:'V001', //【非必填项】键值
                },
                {
                    name:'潜在客户', //【必填项】名称
                    value:'V001', //【非必填项】键值
                },
                {
                    name:'潜在客户', //【必填项】名称
                    value:'V001', //【非必填项】键值
                },
                {
                    name:'潜在客户', //【必填项】名称
                    value:'V001', //【非必填项】键值
                },
                {
                    name:'重点客户', //【必填项】名称
                    value:'V002', //【非必填项】键值
                },
                {
                    name:'正式客户', //【必填项】名称
                    value:'V003', //【非必填项】键值
                },
                {
                    name:'区域公海', //【必填项】名称
                    value:'V004', //【非必填项】键值
                },{
                    name:'客户跟进', //【必填项】名称
                    value:'V005', //【非必填项】键值
                },
                {
                    name:'重点跟进06', //【必填项】名称
                    value:'V006', //【非必填项】键值
                },{
                    name:'重点跟进07', //【必填项】名称
                    value:'V007', //【非必填项】键值
                },{
                    name:'重点跟进08', //【必填项】名称
                    value:'V008', //【非必填项】键值
                },{
                    name:'重点跟进09', //【必填项】名称
                    value:'V009', //【非必填项】键值
                },{
                    name:'重点跟进10', //【必填项】名称
                    value:'V010', //【非必填项】键值
                },{
                    name:'重点跟进11', //【必填项】名称
                    value:'V011', //【非必填项】键值
                },{
                    name:'重点跟进12', //【必填项】名称
                    value:'V012', //【非必填项】键值
                },{
                    name:'重点跟进13', //【必填项】名称
                    value:'V013', //【非必填项】键值
                },{
                    name:'重点跟进14', //【必填项】名称
                    value:'V014', //【非必填项】键值
                },
            ]
        }
    }
});
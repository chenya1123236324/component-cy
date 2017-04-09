/**
 * Created by chenya on 2016/11/21.
 */


//dashboard组件模板
model('dashboard',function(){
    this.$model = {
        dashboardData:{
            style:{   //自定义样式
                height:'320px',//【必填】dashboard高度
                margin:'8px',//【必填】dashboard间距
            },
            list:[
                {
                    icon:'', //【必填项】图标
                    iconColor:'#00e76d', //【非必填项】图标颜色
                    name:'',//【必填项】名称
                    link:'',//【必填项】链接
                    layout:'75%', //【必填项】布局百分比
                    order:'2',//【必填项】排序
                    showHead:false,//【非必填项】是否显示头部，默认显示
                    content:{  //【必填项】填充内容
                        template:'<input type="checkbox">',
                        scope:{},
                    },
                    events:{
                        click:function (event) { //【必填项】事件
                            console.log(this,this.innerHTML,event);
                            alert("你确定要删除吗？");
                        }
                    }
                },
                {
                    icon:'icon-shuju', //【必填项】图标
                    iconColor:'#00a79d', //【非必填项】图标颜色，默认颜色为#505050
                    name:'快捷方式',//【必填项】名称
                    link:'/home/index.html',//【必填项】链接
                    layout:'25%', //【必填项】布局百分比
                    order:'1',//【必填项】排序
                    showHead:true,//【非必填项】是否显示头部，默认显示
                    content:{  //【必填项】填充内容
                        template:'<input type="checkbox">',
                        scope:{},
                    },
                    events:{
                        click:function (event) { //【必填项】事件
                            console.log(this,this.innerHTML,event);
                            alert("你确定要删除吗？");
                        }
                    }
                },{
                    icon:'icon-caidan', //【必填项】图标
                    iconColor:'', //【非必填项】图标颜色
                    name:'常用操作',//【必填项】名称
                    link:'/home/index.html',//【必填项】链接
                    layout:'25%', //【必填项】布局百分比
                    order:'3',//【必填项】排序
                    showHead:true,//【非必填项】是否显示头部，默认显示
                    content:{  //【非必填项】填充内容
                        template:'<input type="checkbox">',
                        scope:{},
                    },
                    events:{
                        click:function (event) { //【必填项】事件
                            console.log(this,this.innerHTML,event);
                            alert("你确定要删除吗？");
                        }
                    }
                },{
                    icon:'icon-shuju', //【必填项】图标
                    iconColor:'#00a79d', //【非必填项】图标颜色
                    name:'工作统计',//【必填项】名称
                    link:'/home/index.html',//【必填项】链接
                    layout:'50%', //【必填项】布局百分比
                    order:'4',//【必填项】排序
                    showHead:true,//【非必填项】是否显示头部，默认显示
                    content:{  //【非必填项】填充内容
                        template:'<input type="checkbox">',
                        scope:{},
                    },
                    events:{
                        click:function (event) { //【必填项】事件
                            console.log(this,this.innerHTML,event)
                        }
                    }
                },{
                    icon:'icon-rili', //【必填项】图标
                    iconColor:'red', //【非必填项】图标颜色
                    name:'日程安排',//【必填项】名称
                    link:'/home/index.html',//【必填项】链接
                    layout:'25%', //【必填项】布局百分比
                    order:'5',//【必填项】排序
                    showHead:true,//【非必填项】是否显示头部，默认显示
                    content:{  //【非必填项】填充内容
                        template:'<input type="checkbox">',
                        scope:{},
                    },
                    events:{
                        click:function (event) { //【必填项】事件
                            console.log(this,this.innerHTML,event)
                        }
                    }
                },{
                    icon:'icon-shuju', //【必填项】图标
                    iconColor:'#00a79d', //【非必填项】图标颜色
                    name:'常用操作',//【必填项】名称
                    link:'/home/index.html',//【必填项】链接
                    layout:'25%', //【必填项】布局百分比
                    order:'6',//【必填项】排序
                    showHead:true,//【非必填项】是否显示头部，默认显示
                    content:{  //【非必填项】填充内容
                        template:'<input type="checkbox">',
                        scope:{},
                    },
                    events:{
                        click:function (event) { //【必填项】事件
                            console.log(this,this.innerHTML,event)
                        }
                    }
                },{
                    icon:'icon-shuju', //【必填项】图标
                    iconColor:'', //【非必填项】图标颜色
                    name:'销售KPI',//【必填项】名称
                    link:'/home/index.html',//【必填项】链接
                    layout:'50%', //【必填项】布局百分比
                    order:'7',//【必填项】排序
                    showHead:true,//【非必填项】是否显示头部，默认显示
                    content:{  //【非必填项】填充内容
                        template:'<input type="checkbox">',
                        scope:{},
                    },
                    events:{
                        click:function (event) { //【必填项】事件
                            console.log(this,this.innerHTML,event);
                            alert("7777");
                        }
                    }
                },
            ]
        }
    }
});
/**
 * Created by chenya on 2017/2/14.
 */
//dashboardLayout组件模板
model('dashboardLayout', ['$:{PLUGINS}/shade/dialog'],function($dialog){
    this.$model = {
        dashboardLayoutData:{
            style:{   //自定义样式
                height:'320px',//【必填】dashboardLayout高度
                margin:'8px',//【必填】dashboardLayout间距
            },
            list:[
                {
                    icon:'icon-shuju', //【必填项】图标
                    iconColor:'#00a79d', //【非必填项】图标颜色，默认颜色为#505050
                    name:'快捷方式',//【必填项】名称
                    link:'/home/custom/list.html?viewId=1253',//【必填项】链接
                    layout:'25%', //【必填项】布局百分比
                    order:'1',//【必填项】排序
                    showHead:true,//【非必填项】是否显示头部，默认显示
                    content:{  //【必填项】填充内容
                        template: '<input type="text" name="iconClass" id="iconClass" $-on:click="selectIcon"  readonly>',
                        scope: {
                            selectIcon: function () {
                                $dialog({
                                    title: '选择图标',//【必填项】dialog标题
                                    id: 'menuSelectIcon',//【非必填项】dialog指定id
                                    content: '',//【非必填项】dialog内容
                                    passText: '保存',//【必填项】dialog按钮
                                    cancelText: '取消',//【必填项】dialog按钮
                                    width: '700px',//【非必填项】dialog宽，不填默认为640px
                                    height: '560px;',//【非必填项】dialog高，不填默认为430px
                                    template: '<icons-select data="iconsModelData"></icons-select>', //【必填项】dialog填充内容，需要与scope配合使用
                                    scope: {
                                        iconsModelData: {
                                            iconConfig: {
                                                cols: 4,//不填默认一行显示4个图标
                                            },
                                            icons: [
                                                "icon-yonghuming",
                                                "icon-mima",
                                                "icon-qiandao",
                                                "icon-dingdan",
                                                "icon-qiandao",
                                                "icon-qianyue",
                                                "icon-wenjianjia",
                                                "icon-icon4",
                                                "icon-fanhui",
                                                "icon-baoji",
                                                "icon-xiaoshou",
                                                "icon-hot",
                                                "icon-jinggaofull",
                                                "icon-baocun",
                                                "icon-sousuoleibie",
                                                "icon-chanpin"
                                            ],
                                            events: {
                                                click: function () {
                                                    console.log(this.title, 'icon-title');
                                                    var icon = this.title;
                                                    var iconClass = document.querySelector("#iconClass").value = icon;
                                                    //关闭当前弹窗
                                                    document.querySelector("#menuSelectIcon").remove();
                                                }
                                            }
                                        }
                                    },
                                    pass: function () { //【必填项】dialog通过需要进行的操作

                                    },
                                    cancel: function () {//【必填项】dialog不通过需要进行的操作
                                    }
                                });
                            }
                        },
                    },
                    events:{
                        click:function (event) { //【必填项】事件
                            console.log(this,this.innerHTML,event);
                            alert("你确定要删除快捷方式吗？");
                        }
                    }
                },
                {
                    icon:'icon-shuju', //【必填项】图标
                    iconColor:'#00e76d', //【非必填项】图标颜色
                    name:'合同跟进',//【必填项】名称
                    link:'/home/index.html',//【必填项】链接
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
                            alert("你确定要删除合同跟进吗？");
                        }
                    }
                },
                {
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
                },
                {
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
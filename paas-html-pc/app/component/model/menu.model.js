//后台设置菜单(write by yaobeibei)
model('page-back-menu',['$:@configData/adminMenuData'], function ($adminMenuData) {

    var menuServer=this.server({
        type:'http',//如果是访问接口,这里是api
        method:'get',
        url:''
    });

    //配置页面菜单数据
    this.$model =$adminMenuData(menuServer);

});

//个人中心菜单(write by yaobeibei)
model('page-person-menu',function(){
    this.$model = [
        {
            isGroup: true,
            label: '个人中心模块li层',
            list: [
                {
                    isGroup: true,
                    label:'个人中心div层',
                    list:[
                        {
                            icon:'icon-gerenzhongxin'
                        },
                        {
                            content:'个人中心'
                        },
                        {
                            isGroup:true,
                            label:'展开收起箭头',
                            list:[
                                {
                                    icon:'icon-down'
                                },{
                                    icon:'icon-right'
                                }
                            ]
                        }
                    ]
                },
                {
                    isGroup:true,
                    label:'个人中心ul层',
                    list:[
                        {
                            isGroup:false,
                            content:'个人信息',
                            events:{
                                click:function () {

                                }
                            }
                        },{
                            isGroup:false,
                            content:'修改密码',
                            events:{
                                click:function () {

                                }
                            }
                        }
                    ]
                }
            ],
            events:{

            }
        }
    ]


});

//消息中心菜单(write by yaobeibei)
model('page-news-menu',function(){
    this.$model = [
        {
            isGroup: true,
            label: '消息信息模块li层',
            list: [
                {
                    isGroup: true,
                    label:'消息信息div层',
                    list:[
                        {
                            icon:'icon-xiaoxixinxi'
                        },
                        {
                            content:'消息信息',
                            events:{
                                click:function () {
                                    
                                }
                            }
                        },
                        {
                            isGroup:false,
                            label:'展开收起箭头',
                            list:[
                                {
                                    icon:''
                                },{
                                    icon:''
                                }
                            ]
                        }
                    ]
                },
                {
                    isGroup:false,
                    label:'消息信息ul层'
                }
            ],
            events:{
                load:function(event){
                    // var span1 = document.createElement('span');
                    // span1.className = "news-number";
                    // span1.innerHTML = '('+5+')';
                    // this.appendChild(span1);

                }
            }
        },
        {
            isGroup: true,
            label: '通知公告模块li层',
            list: [
                {
                    isGroup: true,
                    label:'通知公告div层',
                    list:[
                        {
                            icon:'icon-iconfontcolor34'
                        },
                        {
                            content:'通知公告',
                            events:{
                                click:function () {
                                    
                                }
                            }
                        },
                        {
                            isGroup:false,
                            label:'展开收起箭头',
                            list:[
                                {
                                    icon:''
                                },{
                                    icon:''
                                }
                            ]
                        }
                    ]
                },
                {
                    isGroup:false,
                    label:'通知公告ul层'
                }
            ],
            events:{
                load:function(event){
                    // var span2 = document.createElement('span');
                    // span2.className = "notice-number";
                    // span2.innerHTML = '('+55+')';
                    // this.appendChild(span2);
                }
            }
        }
    ]
});

//单层菜单组件
model('single-menu',function () {
    this.$model = {
        style:{

        },
        className:'',
       /* button:[
            {
                //编辑按钮
                label:'edit',
                icon:'icon-xieyoujian',
                events:{
                    click:function(){
                        //获取当前编辑行的节点和文本
                        var cont = this.parentNode.parentNode.querySelector('.tli-content');
                        var txt = cont.innerHTML;

                        //点击编辑时,先判断是否有正在编辑的项,如果有提示并return,没有才执行下面的
                        var edits = document.querySelector('.tab-left-nav').querySelector('.type-edit');
                        if(edits && edits!=this){
                            //如果上一个没有保存,提示并return
                            alert('请保存当前的修改!');
                            return;
                        } else {

                            if (cont.childNodes[0].value) {
                                //如果是编辑状态 , 点击进行保存
                                cont.innerHTML = cont.childNodes[0].value;
                                this.classList.remove('icon-baocun', 'type-edit');
                                this.classList.add('icon-xieyoujian');

                            } else {
                                cont.innerHTML = "<input type='text' value='" + txt + "' />";
                                this.classList.remove('icon-xieyoujian');
                                this.classList.add('icon-baocun', 'type-edit');
                            }
                        }
                    }
                }
            },
            {
                //删除按钮
                label:'delete',
                icon:'icon-shanchu',
                events:{
                    click:function(){
                        //点击删除 , 调用弹框
                        alert('确认删除吗?调用dialog')




                    }
                }
            }
        ],*/
        isGroup:true,
        label:'单层菜单',
        // tabType:'flip',//必填.左侧tab切换有两种方式(换页flip/定位location),如果是换页,tabType='flip'
        list:[
                {
                    label:"客户管理",
                    className:"active",
                    id:1,
                    pid:0,
                    events:{
                        click:function () {
                            // console.log('lalala',label);
                        },
                        mouseover:function () {
                            // console.log('moseover');
                        }
                    }
                },
                {
                    label:"联系人管理",
                    className:"",
                    events:{
                        mouseover:function () {
                            // console.log('mouseover')
                        }
                    }
                },
                {
                    label:"销售机会管理",
                    className:"",
                    events:{

                    }
                },
                {
                    label:"仪表盘",
                    className:"",
                    events:{

                    }
                },
                {
                    label:"数据报表",
                    className:"",
                    events:{

                    }
                },
                {
                    label:"市场活动管理",
                    className:"",
                    events:{

                    }
                },
                {
                    label:"竞争对手管理",
                    className:"",
                    events:{

                    }
                },
                {
                    label:"产品管理",
                    className:"",
                    events:{

                    }
                },
                {
                    label:"合同",
                    className:"",
                    events:{

                    }
                },
                {
                    label:"目标管理",
                    className:"",
                    events:{

                    }
                }
            ]
    }
});
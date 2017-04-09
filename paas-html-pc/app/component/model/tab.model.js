/**
 * Created by 贝贝 on 2016/11/4.
 */
//右侧tab导航栏
model('right-nav',function(){

    this.$model={
        style:{
            // position:'absolute',
            // right:'50px',
            // top:'50px'
        },
        isGroup:true,
        label:'列表',
        list:[
            {
                label:"基本信息1",
                className:"active",
                events:{
                    mouseover:function () {
                        console.log('啦啦啦');
                        alert(666)
                    },
                }
            },
            {
                label:"基本信息2",
                className:"",
                events:{

                }
            },
            {
                label:"基本信息3",
                className:"",
                events:{

                }
            },
            {
                label:"基本信息4",
                className:"",
                events:{

                }
            },
            {
                label:"基本信息5",
                className:"",
                events:{

                }
            },
            {
                label:"基本信息6",
                className:"",
                events:{

                }
            },
        ]
    }

});

//左侧tab导航栏
model('left-nav',function(){
   this.$model = {
       style:{

       },
       isGroup:true,
       label:'列表',
       tabType:'flip',//必填.左侧tab切换有两种方式(换页flip/定位location),如果是换页,tabType='flip'
       list:[
           {
               label:"客户管理",
               className:"active",
               events:{
                   click:function () {
                       console.log('lalala',label);
                   },
                   mouseover:function () {
                       console.log('moseover');
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

//字典类别列表与搜索
model('dictionary-list',function(){
    this.$model ={
        style:{

        },
        //后面的操作删除按钮
        button:[
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
        ],
        isGroup:true,
        label:'列表',
        tabType:'location',//必填.左侧tab切换有两种方式(换页/定位),如果是换页,tabType='flip'
        list:[
            {
                label:"行业",
                className:"active",
                events:{

                }
            },
            {
                label:"分组",
                className:"",
                events:{

                }
            },
            {
                label:"所属部门",
                className:"",
                events:{

                }
            },
            {
                label:"客户类别",
                className:"",
                events:{

                }
            },
            {
                label:"联系人重要性",
                className:"",
                events:{

                }
            },
            {
                label:"跟进方式",
                className:"",
                events:{

                }
            },
            {
                label:"商机状态",
                className:"",
                events:{

                }
            },
            {
                label:"寄送方式",
                className:"",
                events:{

                }
            },
            {
                label:"跟进类别",
                className:"",
                events:{

                }
            },
            {
                label:"公司重要性",
                className:"",
                events:{

                }
            }
        ]
    }
});

//顶部tab导航栏(字段-视图-操作)
model('top-nav',function(){
    this.$model = {
        style:{

        },
        isGroup:true,
        label:'模块配置',
        tabType:'flip',//必填.左侧tab切换有两种方式(换页flip/定位location),如果是换页,tabType='flip'
        list:[
            {
                label:"字段",
                className:"active",
                events:{
                    mouseover:function () {
                        // console.log('啦啦啦');
                        // alert(666)
                    },
                }
            },
            {
                label:"视图",
                className:"",
                events:{

                }
            },
            {
                label:"操作",
                className:"",
                events:{

                }
            }
        ]
    }
});
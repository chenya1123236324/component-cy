
define(function () {

   return function (menuServer) {

       return {
           style:{

           },
           list:[
               {
                   isGroup: true,
                   label: '组件原型图',
                   icon:'icon-xiaoxishezhi',
                   list:[
                       {
                           isGroup:false,
                           href:'/component-cy/paas-html-pc/annotation/index.html',
                           content:'原型图标注',
                           events:{
                               click:function () {
                                   window.open('/component-cy/paas-html-pc/annotation/index.html');
                               }
                           }
                       },

                   ],
                   events:{

                   }
               },
               {
                   isGroup: true,
                   label: '基础组件',
                   icon:'icon-quanxianshezhi',
                   list:[
                       {
                           isGroup:false,
                           href: 'admin/button/button',
                           content:'按钮组件',
                           events:{
                               click:function () {
                               }
                           }
                       },
                       {
                           isGroup:false,
                           href: 'admin/advancedQuery/advancedQuery',
                           content:'高级检索组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,
                           href: 'admin/currentLocation/currentLocation',
                           content: '当前位置组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,
                           href: 'admin/valid/valid',
                           content: '表单校验组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,
                           href: 'admin/dialog/dialog',
                           content: 'dialog组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,
                           href: 'admin/confirm/confirm',
                           content: 'confirm组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,
                           href: 'admin/tab/tab',
                           content: '选项卡组件',
                           events:{
                               click:function () {

                               }
                           }
                       }
                   ],
                   events:{
                       click:function(event){
                           // this.classList.toggle('liClick');
                           // event.preventDefault();//阻止默认事件
                           // event.stopPropagation();//阻止冒泡
                           // console.log('model点击事件');
                       }
                   }
               },
               {
                   isGroup:true,
                   label: '日期时间组件',
                   icon:'icon-company-info',
                   list:[
                       {
                        isGroup:false,//如果还有展开层,这里要写true,下同
                           href: 'admin/date/date',
                           content: '日期组件',
                        events:{
                        click:function () {
                        }
                        }
                       },
                       {
                           isGroup:false,
                           href: 'admin/time/time',
                           content: '时间组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                        isGroup:false,
                           href: 'admin/datetime/datetime',
                           content: '日期时间组件',
                        events:{
                        click:function () {

                        }
                        }
                       },
                       /*{
                        isGroup:false,
                        href:'',
                        content:'在线登录人数统计',
                        events:{
                        click:function () {

                        }
                        }
                        }*/
                   ],
                   events:{

                   }
               },
               {
                   isGroup: true,
                   label:'图标颜色组件',
                   icon:'icon-iconfontxitongshezhi',
                   list:[
                       {
                           isGroup:false,//如果还有展开层,这里要写true,下同
                           href:'admin/icons/icons',
                           content:'图标组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,//如果还有展开层,这里要写true,下同
                           href:'admin/color/color',
                           content:'颜色组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,//如果还有展开层,这里要写true,下同
                           href:'admin/iconColor/iconColor',
                           content:'图标颜色组件',
                           events:{
                               click:function () {

                               }
                           }
                       },
                   ],
                   events:{

                   }
               },
               {
                   isGroup: true,
                   label: '个性化组件',
                   icon:'icon-setting',
                   list:[
                       {
                           isGroup:false,//如果还有展开层,这里要写true,下同
                           href:'admin/homeMenu/homeMenu',
                           content:'首页菜单组件',
                           events:{
                               click:function () {
                               }
                           }
                       },
                       {
                           isGroup:false,
                           href:'admin/dashboard/dashboard',
                           content:'dashboard组件',
                           events:{
                               click:function () {
                               }
                           }
                       },{
                           isGroup:false,
                           href:'admin/menu/menu',
                           content:'菜单设置',
                           events:{
                               click:function () {

                               }
                           }
                       },{
                           isGroup:false,
                           href:'admin/viewFormula/viewFormula',
                           content:'视图公式配置',
                           events:{
                               click:function () {

                               }
                           }
                       },{
                           isGroup:false,
                           href:'admin/viewConditions/viewConditions',
                           content:'视图条件配置',
                           events:{
                               click:function () {

                               }
                           }
                       },{
                           isGroup:false,
                           href:'admin/operationConditions/operationConditions',
                           content:'操作条件配置',
                           events:{
                               click:function () {

                               }
                           }
                       },{
                           isGroup:false,
                           href:'admin/homeMark/homeMark',
                           content:'首页标签',
                           events:{
                               click:function () {

                               }
                           }
                       }
                   ],
                   events:{

                   }
               },
               {
                   isGroup: true,
                   label: '移动端配置',
                   icon:'icon-yidongduan',
                   list:[
                       {
                           isGroup:false,//如果还有展开层,这里要写true,下同
                           href:'admin/viewSettings/viewSettings.html',
                           content:'移动端视图设置',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,//如果还有展开层,这里要写true,下同
                           href:'admin/mobileMenu/mobileMenu.html',
                           content:'移动端菜单',
                           events:{
                               click:function () {

                               }
                           }
                       },
                   ],
                   events:{

                   }
               },
               {
                   isGroup: true,
                   label: '系统日志',
                   icon:'icon-5_2xitongrizhi',
                   list: [
                       {
                           isGroup:false,
                           href:'admin/sysLog/moduleDataLog',
                           content:'模块数据日志',
                           events:{
                               click:function () {

                               }
                           }
                       },
                       {
                           isGroup:false,
                           href:'admin/sysLog/moduleConfOperationLog',
                           content:'模块配置操作日志',
                           events:{
                               click:function () {

                               }
                           }
                       },

                   ],
                   events:{

                   }
               }
           ]
       }

   }


});
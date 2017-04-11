/**
 * Created by chenya on 2016/11/3.
 */


//注册首页菜单组件
homeMenu(function ($app, $appConfig) {
    /**
     * 首页菜单解析渲染
     * @param data,scope
     */
    function renderHomeMenu(data,scope){
        //文档片段(用于存储元素)
        //检查data是否是object
        if( typeof data === "object"){
            //拼接首页菜单组件html
            var mosaicHomeMenu='';
            mosaicHomeMenu=createHomeMenu(data,scope);
            return mosaicHomeMenu;
        }
    }

    /**
     * 创建首页菜单元素
     * @param data,scope
     */
    function createHomeMenu(data,scope) {
        //菜单节点
        var menuElement='';
        //菜单基础信息配置
        var base=data.menuBaseInformation;
        //菜单详细信息配置
        var detail=data.menuDetailedInformation;
        //菜单详细信息配置中的菜单列表
        var menuList =detail.menuList;
        //true表示用户前端展示菜单，false表示后台设置菜单
        var isFrontPage=data.menuBaseInformation.isFrontPage;
        //菜单列数
        var columnCount=0;
        //得到分组数
        columnCount=Object.keys(menuList).length;
        if(columnCount<=1){
            columnCount=2;
        }else if(columnCount<=6){
            columnCount=3;
        }else if(columnCount<=10){
            columnCount=4;
        }else if(columnCount<=50){
            columnCount=5;
        }

        //console.log("-------------homeMenu组件中Model返还回来的数据------------------");
        ////Model返还回来的数据
        //console.log(JSON.stringify(data));
        //console.log(Object.keys(menuList).length);
        //console.log("-------------homeMenu组件中Model返还回来的数据------------------");

        <!--首页菜单-->
        menuElement+='<div class="homeMenu">' +
                <!--首页菜单头部-->
            '<div class="top-nav">';
         //当isFrontPage为false时说明此时的配置为后台配置菜单,当为false时说明为前端展示菜单
        if(isFrontPage==false){
            <!--首页菜单左侧-->
            menuElement+='<div class="top-nav-left">' +
                    <!--头部导航左侧中左侧部分-->
                '<ul class="nav-left-left">' +
                '<li style="width:160px;"><a href="'+base.companyLink+'"><img src="'+base.companyLogo+'"/></a></li>' +
                '<li style="width:80px;" class="menuConfigName">组件库</li>' +
                '</ul>' +//nav-left-left
                '</div>';//top-nav-left
        }else{

                <!--首页菜单左侧-->
        menuElement+='<div class="top-nav-left">' +
                <!--头部导航左侧中左侧部分-->
            '<ul class="nav-left-left">' +
            '<li><a href="'+base.companyLink+'"><img src="'+base.companyLogo+'"/></a></li>' +
            '<li><i class="iconfont '+base.menuIcon+'"></i>' +
            '<ul class="main-menu-children" class="menu-column-count" style="-moz-column-count:'+columnCount+';-webkit-column-count:'+columnCount+';">';
        //检查menuList是否是数组
        if(menuList instanceof Array){
            menuList.forEach(function (menuData,key) {
                menuElement+='<li class="group">' +
                    '<span>'+menuData.groupName+'</span>' +
                    '<ul>';
               //检查list是否是数组
                if(menuList[key].list instanceof Array){
                    menuList[key].list.forEach(function(listData){
                        menuElement+='<li><a href="'+listData.menuLink+'"><i class="iconfont '+listData.menuIcon+'" style="color:'+listData.iconColor+';"></i><span>'+listData.menuName+'</span></a></li>';
                    });
                }
                menuElement+='</ul>' +
                    '</li>';//group
            });
        }
        menuElement+= '</ul>' +
            '</li>' +
            '<li><a href="'+base.homeLink+'"><i class="iconfont '+base.homeIcon+'"></i></a></li>' +
            '</ul>' +//nav-left-left
                <!--头部导航左侧中右侧部分-->
            '<ul class="nav-left-right">';
        //检查menuList是否是数组
        if(menuList instanceof Array){
            //计数器
            var num=0;
            menuList.forEach(function (menuData,key) {
                        //判断是否在菜单头部显示
                        if(menuData.isMenuDisplay){
                            //累加在菜单头部显示的个数
                            num =num+1;
                            //得到用户屏幕的宽度
                            var screenWidth=screen.width;
                            //当屏幕小于1400的笔记本时,只显示7条
                            if(screenWidth<=1400){
                                if(num<=7){
                                    //是否在菜单头部显示孩子节点
                                    if(menuData.isShowChildren){
                                        menuElement+=' <li><span class="icon-line">'+menuData.groupName+'<i class="iconfont icon-xiala"></i></span>' +
                                            '<ul class="nav-left-right-children">';
                                        //检查list是否是数组
                                        if(menuList[key].list instanceof Array){
                                            menuList[key].list.forEach(function(listData){
                                                menuElement+=' <li><a href="'+listData.menuLink+'"><i class="iconfont '+listData.menuIcon+'" style="color:'+listData.iconColor+';"></i><span>'+listData.menuName+'</span></a></li>';
                                            });
                                        }
                                        menuElement+='</ul>' +
                                            '</li>';

                                    }else{ //不在头部显示孩子节点
                                        menuElement+='<li><span class="icon-line" ><a href="'+menuData.link+'">'+menuData.groupName+'</a></span></li>';
                                    }
                                }
                            }else{
                                //当屏幕大于1400的电脑时,显示12条
                                if(num<=12){
                                    //是否在菜单头部显示孩子节点
                                    if(menuData.isShowChildren){
                                        menuElement+=' <li><span class="icon-line">'+menuData.groupName+'<i class="iconfont icon-xiala"></i></span>' +
                                            '<ul class="nav-left-right-children">';
                                        //检查list是否是数组
                                        if(menuList[key].list instanceof Array){
                                            menuList[key].list.forEach(function(listData){
                                                menuElement+=' <li><a href="'+listData.menuLink+'"><i class="iconfont '+listData.menuIcon+'" style="color:'+listData.iconColor+';"></i><span>'+listData.menuName+'</span></a></li>';
                                            });
                                        }
                                        menuElement+='</ul>' +
                                            '</li>';

                                    }else{//不在头部显示孩子节点
                                        menuElement+='<li><span class="icon-line" ><a href="'+menuData.link+'">'+menuData.groupName+'</a></span></li>';
                                    }
                                }
                            }
                        }
            });
        }
            menuElement+= '</ul>' +//nav-left-right
            '</div>';//top-nav-left

        }//else

                <!--首页菜单右侧-->
        menuElement+='<div class="top-nav-right">';
        //当isFrontPage为false时说明此时的配置为后台配置菜单,当为false时说明为前端展示菜单
        if(isFrontPage==false){
            menuElement+= '<ul class="nav-right-right">' +
                '<li><img class="menu-head" src="'+base.userHead+'"/><span class="icon-line">'+base.userName+'<i class="iconfont icon-xiala"></i></span>' +
                '<ul style="display:none;">' +
                '<li><span >'+base.userInformation+'</span></li>' +
                '</ul>' +
                '</li>' +
                '</ul>';//nav-right-right
        }else{
            menuElement+= '<ul class="nav-right-right">' +
                '<li><span class="icon-line"><i class="iconfont icon-xinxi"></i><a href="'+base.MessageLink+'"><span style="display:none;"  class="info-amount">'+base.MessageNumber+'</span></a></span></li>' +
                '<li><img class="menu-head" src="'+base.userHead+'"/><span class="icon-line">'+base.userName+'<i class="iconfont icon-xiala"></i></span>' +
                '<ul style="display:none;">' +
                '<li><span>'+base.userInformation+'</span></li>' +
                '</ul>' +
                '</li>' +
                '<li><a href="'+base.settingLink+'"><span><i class="iconfont icon-shezhi"></i>设置</span></a></li>' +
                '</ul>';//nav-right-right
        }
        menuElement+='</div>' +//top-nav-right
            '</div>';//top-nav
        menuElement+='</div>';//homeMenu
        //返回拼接后创建菜单元素
        return menuElement;
    }

    //home-menu组件注册
    $app.componentRegister('homeMenu', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //组件原有的标签
            var oldElement=this.$element;
            var That=this;
            //监听获取属性中的数据
            this.watchAttrData('data',function (data) {
                var newElement,homeMenuHtml;
                //数据存储器 【预留:后期双向数据绑定需要用到】
                var scope={
                    assign:{
                    }
                };
                    //创建一个新的div标签
                newElement=document.createElement('div');
                    //给这个新的div标签添加一个class
                newElement.className="home-menu";
                //首页菜单组件解析渲染
                homeMenuHtml=renderHomeMenu(data,scope);
                //tpl里组件的属性,指令,必须用viewVM渲染才可用
                newElement.appendChild(That.viewVM(homeMenuHtml,scope.assign));
                //元素替换
                oldElement.parentNode.replaceChild(newElement,oldElement);
            }.bind(this))
        }
    })
});

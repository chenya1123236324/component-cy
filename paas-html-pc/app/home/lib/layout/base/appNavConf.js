/**
 * Created by xiyuan on 16-12-28.
 */
define(function () {

    var userScope,
        entScope,
        navData={
        navList:[
            {
                type:'custom',
                template:'<i class="img" $-parses:style="background-image:url( {{ COMM + imageUrl }} );background-position: center center;width: 100px;height: 49px;background-size: cover;"></i>',//<a>{{entName}}</a>
                scope:entScope={
                    entName:'赞同科技',
                    imageUrl:'/style/less/component/homeMenu/menu-logo.png'
                }
            },
            {
                type:'custom',
                template:'<div $-app-menu="layoutBaseConf.menuList"><i class="iconfont icon-menu"></i></div>',
            },
            {
                type:'custom',
                template:'<a $-bind:href="indexHref"><i class="iconfont icon-index-copy"></i></a>',
                scope:{
                    indexHref:'home/custom/index'
                }
            },
            /*{
                type:'menu',
                content:'客户',
                href:'',
                list:[
                    {
                        content:'公海客户',
                        href:'',
                        icon:'gong'
                    },
                    {
                        content:'联系人',
                        href:'',
                        icon:'caidanlianxiren'
                    },
                    {
                        content:'区域公海',
                        href:'qukong',
                        icon:'caidanlianxiren'
                    }
                ]
            },
            {
                type:'menu',
                content:'跟进',
                href:'',
                list:[

                ]
            },
            {
                type:'menu',
                content:'宣传资料',
                href:'',
                list:[
                    {
                        content:'报价单',
                        iocn:'baojiadan'
                    },
                    {
                        content:'订单',
                        iocn:'caidan-dingdan'
                    }
                ]
            },
            {
                type:'menu',
                content:'市场营销'
            },
            {
                type:'menu',
                content:'服务资料'
            },
            {
                type:'menu',
                content:'目标'
            }*/
        ],
        sysInfoList:[
            /*{
                type:'custom',
                template:'<a><i class="iconfont icon-xinxi"></i><span>8</span></a>'
            },*/
            {
                type:'menu',
                content:'<i class="img" $-parses:style="background-image:url( {{ COMM + imageUrl }} );background-size: 100% 100%;width: 35px;height: 35px;margin-right: 10px;"></i><a href="admin/personalInformation/personalInformation"><span>{{userName}}</span></a>',
                scope:userScope={
                    imageUrl:"/img/comm/head.png",
                    userName:'用户'
                },
                list:[
                    {
                        content:'<a href="admin/personalInformation/personalInformation">个人信息</a>'
                    },
                    {
                        content:'<a href="admin/modifyPassword/modifyPassword">修改密码</a>'
                    }
                ]
            },
            {
                type:'custom',
                template:'<a target="_blank" href="#!/admin/organization/organization"><i class="iconfont icon-shezhi"></i><span>设置</span></a>'
            }
        ]
    }

    return $FRAME.$model(function () {
        this.$model = navData;

        //用户信息
        var userInfoServer = this.server({
            serverType: 'http',
            url:'http://paas.mecrmcrm.com/current/user'
        }).success(function (res) {
            $FRAME.localStorage('userInfo',res);
            entScope.entName=res.entName;
            userScope.userName=res.realName;
        }).fail(function () {
            $FRAME.localStorage('userInfo',{});
            entScope.entName='赞同科技';
            userScope.userName='匿名用户';
        }).send();

        var appNavServer = this.server({
            serverType: 'api',
            url:'shortcutMenuList'
        });

        appNavServer.success(function (res) {
            res.slice(0,6).forEach(function (menuInfo) {
                var url;
                // 0 : 查询列表  1:新增页面   2:自定义url
                switch (menuInfo.menuType){
                    case 0:
                        url='home/custom/list?viewId='+menuInfo.viewId+'&moduleId='+menuInfo.moduleId+'&pageName='+menuInfo.menuName;
                        break;
                    case 1:
                        url='home/custom/add?viewId='+menuInfo.viewId+'&moduleId='+menuInfo.moduleId+'&pageName='+menuInfo.menuName;
                        break;
                    case 2:
                        url=menuInfo.menuUrl;
                        break;
                }

                navData.navList.push({
                    type:'menu',
                    content:'<a href="'+url+'">'+menuInfo.menuName+'</a>'
                })
            });

            // console.log(res);

        }).fail(function () {
            
        }).send({
            // "userId": 11
        });

    })

});
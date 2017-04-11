model('homeMenu', function () {
    this.$model = {
        selectChange: function () {
            console.log(this.value)
        },//菜单基础信息配置【此名称组件中用到，不可修改】
        menuBaseInformation: {
            isFrontPage: true,//【必填】true表示用户前端展示菜单，false表示后台设置菜单
            companyLogo: './comm/style/less/component/homeMenu/menu-logo.png',
            companyLink: '/admin/button/button.html',//【必填】公司logo点击链接
            menuIcon: 'icon-menu',//【必填】主菜单图标
            homeIcon: 'icon-index-copy',//【必填】首页图标
            homeLink: '/admin/button/button.html',//【必填】首页点击链接
            MessageNumber: '3',//【必填】消息数量，默认为0
            MessageLink: '/admin/button/button.html',//【必填】消息数量，默认为0
            userHead: './comm/style/less/component/homeMenu/menu-head.png',//【必填】用户头像
            userName: '陈亚',//【必填】用户名称
            userInformation: '用户信息',//【非必填】
            settingLink: '/admin/button/button.html',//【必填】设置链接
            style: {          //【非必填】预留功能
            },
            list: []
        },//菜单详细信息配置【此名称组件中用到，不可修改】
        menuDetailedInformation: {
            style: {},
            menuList: [
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: true,//【必填】是否在菜单头部显示
                    isShowChildren: true,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//
                    groupName: '客户', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-gong",//【必填】菜单图标
                            iconColor: "#b14241",//【必填】菜单颜色
                            menuName: '公海客户',//【必填】菜单名称

                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-caidanlianxiren",//【必填】菜单图标
                            iconColor: "#50aa00",//【必填】菜单颜色
                            menuName: '联 系 人',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-qukong",//【必填】菜单图标
                            iconColor: "#d88a12",//【必填】菜单颜色
                            menuName: '区域公海',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-kehu",//【必填】菜单图标
                            iconColor: "#e41915",//【必填】菜单颜色
                            menuName: '重点客户',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-qian2",//【必填】菜单图标
                            iconColor: "#db7ba9",//【必填】菜单颜色
                            menuName: '潜在客户',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-kaohechengji",//【必填】菜单图标
                            iconColor: "#cb66ea",//【必填】菜单颜色
                            menuName: '正式客户',//【必填】菜单名称
                        },
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: true,//【必填】是否在菜单头部显示
                    isShowChildren: true,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//
                    groupName: '跟进', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-kehugenjin",//【必填】菜单图标
                            iconColor: "#4fbc93",//【必填】菜单颜色
                            menuName: '客户跟进',//【必填】菜单名称

                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-gong",//【必填】菜单图标
                            iconColor: "#b14241",//【必填】菜单颜色
                            menuName: '公海客户',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-zhongdiangenjin",//【必填】菜单图标
                            iconColor: "#fe3d13",//【必填】菜单颜色
                            menuName: '重点跟进',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-hetong",//【必填】菜单图标
                            iconColor: "#1c5970",//【必填】菜单颜色
                            menuName: '合同跟进',//【必填】菜单名称
                        }
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: false,//【必填】是否在菜单头部显示
                    isShowChildren: true,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//
                    groupName: '竞品信息', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-baojiadan",//【必填】菜单图标
                            iconColor: "#ce9c4a",//【必填】菜单颜色
                            menuName: '报价单',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-yusan",//【必填】菜单图标
                            iconColor: "#265400",//【必填】菜单颜色
                            menuName: '服务管理',//【必填】菜单名称
                        },
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: true,//【必填】是否在菜单头部显示
                    isShowChildren: true,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//【必填】
                    groupName: '宣传资料', //分组名称
                    list: [
                         {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-caidan-dingdan",//【必填】菜单图标
                            iconColor: "#6e8620",//【必填】菜单颜色
                            menuName: '订  单',//【必填】菜单名称
                        }, {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-fapiao",//【必填】菜单图标
                            iconColor: "#9c8515",//【必填】菜单颜色
                            menuName: '发  票',//【必填】菜单名称
                        }, {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-chanpin",//【必填】菜单图标
                            iconColor: "#9b9360",//【必填】菜单颜色
                            menuName: '产  品',//【必填】菜单名称
                        }, {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-diyxuanchuanye",//【必填】菜单图标
                            iconColor: "#409899",//【必填】菜单颜色
                            menuName: '宣传资料',//【必填】菜单名称
                        },
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: false,//【必填】是否在菜单头部显示
                    isShowChildren: true,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//【必填】
                    groupName: '市场营销', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-wenzhangliebiao",//【必填】菜单图标
                            iconColor: "#87c2d9",//【必填】菜单颜色
                            menuName: '营销列表',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-laba",//【必填】菜单图标
                            iconColor: "#8290dc",//【必填】菜单颜色
                            menuName: '快速市场',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-liwu",//【必填】菜单图标
                            iconColor: "#a281b4",//【必填】菜单颜色
                            menuName: '市场活动',//【必填】菜单名称
                        }
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: false,//【必填】是否在菜单头部显示
                    isShowChildren: true,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//【必填】
                    groupName: '目标', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-huo",//【必填】菜单图标
                            iconColor: "#a05100",//【必填】菜单颜色
                            menuName: '目标度量',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-chaxun",//【必填】菜单图标
                            iconColor: "#db8d62",//【必填】菜单颜色
                            menuName: '汇总查询',//【必填】菜单名称
                        },
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: false,//【必填】是否在菜单头部显示
                    isShowChildren: true,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//【必填】
                    groupName: '销售', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-qian2",//【必填】菜单图标
                            iconColor: "#db7ba9",//【必填】菜单颜色
                            menuName: '潜在客户',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-dengpao",//【必填】菜单图标
                            iconColor: "#a3b4bb",//【必填】菜单颜色
                            menuName: '商机',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-jingzhengduishou01",//【必填】菜单图标
                            iconColor: "#3db7f7",//【必填】菜单颜色
                            menuName: '竞争对手',//【必填】菜单名称
                        },
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: false,//【必填】是否在菜单头部显示
                    isShowChildren: false,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//【必填】
                    groupName: '服务资料', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-news",//【必填】菜单图标
                            iconColor: "#96d6c2",//【必填】菜单颜色
                            menuName: '文章',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-yinzhang",//【必填】菜单图标
                            iconColor: "#fa1100",//【必填】菜单颜色
                            menuName: '合同',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-chanpin",//【必填】菜单图标
                            iconColor: "#9b9360",//【必填】菜单颜色
                            menuName: '产品',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-icon",//【必填】菜单图标
                            iconColor: "#38aa75",//【必填】菜单颜色
                            menuName: '服务',//【必填】菜单名称
                        },
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: false,//【必填】是否在菜单头部显示
                    isShowChildren: true,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//【必填】
                    groupName: '工具', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-heilongjiangtubiao03",//【必填】菜单图标
                            iconColor: "#0c226c",//【必填】菜单颜色
                            menuName: '报表',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-jingbaodeng",//【必填】菜单图标
                            iconColor: "#fa1100",//【必填】菜单颜色
                            menuName: '警报',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-rili",//【必填】菜单图标
                            iconColor: "#d60d98",//【必填】菜单颜色
                            menuName: '日历',//【必填】菜单名称
                        },
                    ]
                },
                {
                    isGroup: true, //【必填】是否是分组
                    isMenuDisplay: true,//【必填】是否在菜单头部显示
                    isShowChildren: false,//【必填】是否在菜单头部显示孩子节点
                    link: '/admin/button/button.html',//
                    groupName: '更多', //分组名称
                    list: [
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-color",//【必填】菜单图标
                            iconColor: "#ee7730",//【必填】菜单颜色
                            menuName: '个性化设置',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-zidingyi",//【必填】菜单图标
                            iconColor: "#f47d6b",//【必填】菜单颜色
                            menuName: '自定义项',//【必填】菜单名称
                        },
                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-gongwenbao",//【必填】菜单图标
                            iconColor: "#7ba268",//【必填】菜单颜色
                            menuName: '业务管理',//【必填】菜单名称
                        },

                        {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-shuju",//【必填】菜单图标
                            iconColor: "#d67bba",//【必填】菜单颜色
                            menuName: '数据管理',//【必填】菜单名称
                        }, {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-wendang",//【必填】菜单图标
                            iconColor: "#29b388",//【必填】菜单颜色
                            menuName: '文档管理',//【必填】菜单名称
                        }, {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-anquan",//【必填】菜单图标
                            iconColor: "#bdb967",//【必填】菜单颜色
                            menuName: '安全性',//【必填】菜单名称
                        }, {
                            menuLink: '/admin/button/button.html', //【必填】菜单链接
                            menuIcon: "icon-shezhi1",//【必填】菜单图标
                            iconColor: "#4a7b10",//【必填】菜单颜色
                            menuName: '管理',//【必填】菜单名称
                        },
                    ]
                },
            ]
        }
    }
});
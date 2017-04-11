model('dashboard', ['$:{PLUGINS}/modal/modal-confirm'], function ($confirm) {
    this.$model = {
        dashboardLayoutData: {
            style: {   //自定义样式
                height: '320px',//【必填】dashboardLayout高度
                margin: '8px',//【必填】dashboardLayout间距
            },
            list: [
                {
                    icon: 'icon-news', //【必填项】图标
                    iconColor: '#FFC0CB', //【非必填项】图标颜色
                    name: '快捷方式',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '25%', //【必填项】布局百分比
                    order: '1',//【必填项】排序
                    showHead: true,//【非必填项】是否显示头部，默认显示
                    content: {  //【必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
                {
                    icon: 'icon-icon', //【必填项】图标
                    iconColor: '#6495ED', //【非必填项】图标颜色
                    name: '合同跟进',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '75%', //【必填项】布局百分比
                    order: '2',//【必填项】排序
                    showHead: false,//【非必填项】是否显示头部，默认显示
                    content: {  //【必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
                {
                    icon: 'icon-caidan', //【必填项】图标
                    iconColor: '#3CB371', //【非必填项】图标颜色
                    name: '常用操作',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '25%', //【必填项】布局百分比
                    order: '3',//【必填项】排序
                    showHead: true,//【非必填项】是否显示头部，默认显示
                    content: {  //【非必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
                {
                    icon: 'icon-shuju', //【必填项】图标
                    iconColor: '#00a79d', //【非必填项】图标颜色
                    name: '工作统计',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '50%', //【必填项】布局百分比
                    order: '4',//【必填项】排序
                    showHead: true,//【非必填项】是否显示头部，默认显示
                    content: {  //【非必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
                {
                    icon: 'icon-rili', //【必填项】图标
                    iconColor: 'red', //【非必填项】图标颜色
                    name: '日程安排',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '25%', //【必填项】布局百分比
                    order: '5',//【必填项】排序
                    showHead: true,//【非必填项】是否显示头部，默认显示
                    content: {  //【非必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
                {
                    icon: 'icon-liwu', //【必填项】图标
                    iconColor: '#a281b4', //【非必填项】图标颜色
                    name: '市场活动',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '25%', //【必填项】布局百分比
                    order: '6',//【必填项】排序
                    showHead: true,//【非必填项】是否显示头部，默认显示
                    content: {  //【非必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
                {
                    icon: 'icon-yinzhang', //【必填项】图标
                    iconColor: '#fa1100', //【非必填项】图标颜色
                    name: '服务资料',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '25%', //【必填项】布局百分比
                    order: '7',//【必填项】排序
                    showHead: true,//【非必填项】是否显示头部，默认显示
                    content: {  //【非必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
                {
                    icon: 'icon-caidan-dingdan', //【必填项】图标
                    iconColor: '#87CEEB', //【非必填项】图标颜色
                    name: '客户跟进',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '25%', //【必填项】布局百分比
                    order: '7',//【必填项】排序
                    showHead: true,//【非必填项】是否显示头部，默认显示
                    content: {  //【非必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
                {
                    icon: 'icon-kehu', //【必填项】图标
                    iconColor: '#FFA500', //【非必填项】图标颜色
                    name: '重点客户',//【必填项】名称
                    link: '/admin/button/button.html',//【必填项】链接
                    layout: '25%', //【必填项】布局百分比
                    order: '7',//【必填项】排序
                    showHead: true,//【非必填项】是否显示头部，默认显示
                    content: {  //【非必填项】填充内容
                        template: '',
                        scope: {},
                    },
                    events: {
                        click: function (event) { //【必填项】事件
                            $confirm({
                                title: '消息',
                                content: '确定删除此条数据？',
                                pass: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除成功！');
                                    });
                                },
                                cancel: function () {
                                    $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                        $message('删除失败！');
                                    });
                                }
                            })
                        }
                    }
                },
            ]
        }
    }
});
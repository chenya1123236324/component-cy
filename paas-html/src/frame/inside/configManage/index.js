/**
 * Created by xiyuan on 15-12-2.
 */
//@make : start

/*配置管理器*/
var $configManage = {
        __reload__:[],
        reload:function(fn){
            $configManage.__reload__.push(fn);
        }
    },

/*配置存储对象（默认配置）*/
    $configStroage = {
        //框架系统配置
        systemConfig:{
            callbackName:{
                model:'model',
                view:'view',
                controller:'controller'
            },
            fileSuffix:{
                view: 'view',
                controller: 'controller',
                model: 'model'
            }
        },
        //路由模式
        routeModel: 'hash',
        //路由后缀
        routeSuffix: '',
        //视图模板后缀
        tplSuffix:'html',
        //默认视图请求方式
        viewRequire:'ajax',
        //默认的视图
        defaultView:'index',
        //默认的控制器操作
        defaultController:'index',
        //默认路由
        defaultRoute:'index',
        //自动路由
        autoRoute: {},
        //路由列表(常规路由:normalRoute \ 正则路由:regexpRoute \ 参数路由:parameterRoute \ 混合路由:mixRoute)
        routeList:[],
        //路径资源
        pathList:{
            src:{
                paths:{},
                maps:{}
            },
            paths:{
                sort:[],
                list:{

                }
            },
            maps:{
                sort:[],
                list:{

                }
            }
        },
        zipPath:{

        },
        //自定义配置
        customConfigs:{

        },
        //开启的自定义配置
        loadConfig:[],
        //自定义有效的配置
        customConfig:{},

        //页面布局注册资源
        layoutRegister:{},

        //页面切换注册资源
        pageToggleRegister:{
            defualt:{
                layout:'',
                animate:{
                    defualt:{
                        back:function(page){
                            window.document.body.innerHTML='';
                            window.document.body.appendChild(page);
                        },
                        make:function(page){
                            window.document.body.innerHTML='';
                            window.document.body.appendChild(page);
                        }
                    }
                }
            }
        },

        //启用的页面切换资源
        selectPageToggle:'defualt',

        //页面切换
        pageToggle:{},

        //表达式过滤器
        $filter:{},

        //系统拦截器
        interceptor:{},

        //应用引导
        bootstrapFns:[],

        //服务注册容器
        serverRegisterStroage:{},

        //默认的数据库
        defaultDB:null,

        //默认的数据库名称
        defaultDBName:null
    },
    _systemConfig=$configStroage.systemConfig;

/*配置初始化*/
Include('configInit.js');

/*配置检查*/
Include('configCheck.js');

/*配置解析*/
Include('configParse.js');

//@make : end
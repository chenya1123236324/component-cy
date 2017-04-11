
/**
 * 主配置文件
 * $app 配置对象
 * $appConfig 配置文件的自定义配置(以备通用的变量定义)
 */
config(function($app,$appConfig){

    //定义配置中的配置
    $appConfig({
        CWD:$FRAME.lib.$path.cwd,
        COMM:'./comm',
        APP_PATH:'./app',
        APP_CONFIG:'./config',
        FRAME_ROOT:$FRAME.lib.$path.normalize($FRAME.lib.$path.frameDir+'/../')
    });

    /*系统配置*/
    $app.systemConfig({
        callbackName: {
            view: 'view',
            controller: 'controller',
            model: 'model'
        },
        fileSuffix:{
            view: 'view',
            controller: 'controller',
            model: 'model'
        }
    });

    /*路由模式 【 # hash 与 / html5 】默认hash */
    $app.routeModel('hash');

    /*路由后缀 默认空*/
    $app.routeSuffix('.html');

    /*视图模板后缀 默认html*/
    $app.tplSuffix('.tpl');

    /*视图请求方式 【 ajax 与 jsonp 】 默认ajax*/
    $app.viewRequire('ajax');

    /*默认的页面切换模板*/
    $app.pageToggle('crm-pc');

    //默认的路由
    $app.defaultRoute('demo/index');

    /*扩展配置*/
    $app.extendConfig({
        //基础配置 内部主要包含框架的指令与组件
        baseConfig:$appConfig.FRAME_ROOT+'/config/baseConfig.js',
        //应用引导配置
        bootstrapConfig:$appConfig.APP_CONFIG+'/systemConfig/bootstrapConfig.js',
        //应用路径配置
        pathConfig:$appConfig.APP_CONFIG+'/systemConfig/path.js',
        //应用路由表
        route:$appConfig.APP_CONFIG+'/routeConfig/route.js',
        //页面切换注册
        pageToggleRegister:$appConfig.APP_CONFIG+'/registerConfig/pageToggle/crm-pc.js',
        //公共配置
        commConfig:$appConfig.APP_CONFIG+'/customConfig/commConfig.js',
        //表达式过滤器注册
        filterPackage:$appConfig.APP_CONFIG+'/registerConfig/filterRegister/filterPackage.js',
    });

    //加载自定义模式
    $app.loadConfig('comm');

});
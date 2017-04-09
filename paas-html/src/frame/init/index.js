/**
 * Created by xiyuan on 15-11-30.
 */
/*初始化配置*/
//触发配置初始化
$eventManage.$apply('config:init', this);

//配置加载完毕后的回调(应用开始启动)
$configManage.configInit(function(){

    //设置设备平台属性
    document.querySelector('HTML').setAttribute('device-platform',$platform.os.family);

    //加载有效自定义配置
    $configManage.reloadCoustomConfig();

    //路由监控
    $routeManage.routeWatch();

    //页面切换器初始化
    $configStroage.pageToggle=$configStroage.pageToggleRegister[$configStroage.selectPageToggle]||$configStroage.pageToggleRegister['default'];
    window.document.body.innerHTML=$configStroage.pageToggle.layout;

    //页面切换初始化
    typeof $configStroage.pageToggle.init === "function" && $configStroage.pageToggle.init();

    //配置加载执行的回调
    $configManage.__reload__.forEach(function (fn) {
        fn();
    });
    delete $configManage.__reload__;
    delete $configManage.reload;

    //应用引导启动
    (function (bootstraps){
        var i=~0,l=bootstraps.length;
        while (++i<l){
            bootstraps[i]();
        }
    })($configStroage.bootstrapFns);

    //
    // console.log($configStroage,'--init 文件---');


    //系统初始化页面跳转定位 [已有的路径与默认的路由路径]
    if($configStroage.routeModel === 'html5' || !window.location.hash.match(/^#!\/[^\s]+/)){
        var href=$routeManage.assign($configStroage.defaultRoute).path;

        if($configStroage.routeModel === 'html5'){
            var pageUrl = $path.resolve(href,$routeManage.rootProjectPath);
            //添加新的历史记录
            window.history.pushState({
                "target": href
            }, null, pageUrl);

        }else{
            //通知hash监听器当前跳转不需要做处理
            $routeManage.hashListener=false;
            $url.hash('!/' + href);
        }
    }else{
        $routeManage.assign(getPathNormalize($configStroage.routeModel));
    }

    //消除物理点击和移动浏览器上的点击事件的触发之间的300ms延迟
    new $extend.FastClick(document.body);
});

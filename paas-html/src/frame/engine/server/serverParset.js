/**
 * Created by xiyuan on 16-8-16.
 */
//解析配置文件中注册的服务
(function (serverRegisterConfHandle) {
    //检查配置是否加载完毕
    typeof $configManage.reload === "function" ? $configManage.reload(serverRegisterConfHandle):serverRegisterConfHandle();
})(function () {
    'use strict';

    var serverRegisterStroage=$configStroage.serverRegisterStroage;

    Object.keys(serverRegisterStroage).forEach(function (key) {
        var serverName=key,
            serverConf=serverRegisterStroage[key];

        //检查是否注册还是继承
        switch (typeof serverConf){
            case 'function':
                $serverManage.register(serverName,serverConf($serverManage));
                break;
            case 'object':
                $serverManage.register(serverName,serverConf);
                break;
        }
    });

});



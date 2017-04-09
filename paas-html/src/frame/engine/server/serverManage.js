/**
 * Created by xiyuan on 16-8-16.
 */

//服务管理
var serverManage=function ($serverStroage) {
        this.$serverStroage=$serverStroage||{};
    };

//获取注册的服务
serverManage.prototype.get=function (serverName) {
    return this.$serverStroage[serverName];
};

//服务注册
serverManage.prototype.register=function (serverName,conf) {
    this.$serverStroage[serverName]=conf;
};

//服务注册
serverManage.prototype.extend=function (serverName,conf) {
    var serverConf={},
        targetServer=this.$serverStroage[serverName];

    Object.keys(targetServer).forEach(function (key) {
        serverConf[key]=targetServer[key];
    });

    serverConf.extend=conf;

    return serverConf;
};

//实例化服务管理器
var $serverManage=new serverManage();

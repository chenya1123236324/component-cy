/**
 * Created by xiyuan on 16-8-15.
 */

/**
 * 服务接口
 * @param serverInstance
 * @param servers
 */

function serverInterface(conf,servers){

    var interface,
        instance=new serverImage(conf,this);

    //检查服务是否注册
    if(!instance){
        return false;
    }

    //合并服务中的接口
    interface=instance.interface();

    Object.defineProperty(this, '__stroage__', {
        writable: true,
        enumerable: false,
        configurable: true
    });

    this.__stroage__={
        conf:conf,
        servers:servers,
        instance:instance
    };

    Object.keys(interface).forEach(function (key) {
        this[key]=interface[key];
    }.bind(this))

}

//服务接口
serverInterface.prototype.url=function (apiUrl) {
    this.__stroage__.instance.setConf('url',apiUrl);
    return this;
};

//服务数据发送
serverInterface.prototype.send=function (data) {
    this.__stroage__.instance.setConf('data',data||{});
    this.__stroage__.instance.startUp();
    // return this;
};

//设置超时时间
serverInterface.prototype.timeout=function (time) {
    this.__stroage__.instance.setConf('timeout',Number(time));
    return this;
};

//缓存开启
serverInterface.prototype.cache=function (toggle) {
    this.__stroage__.instance.setConf('cache',!!toggle);
    return this;
};

//选项会在请求中设置 XMLHttpRequestResponseType 属性
serverInterface.prototype.responseType=function (responseType) {
    this.__stroage__.instance.setConf('responseType',responseType);
    return this;
};

//请求数据接收
serverInterface.prototype.receive=serverInterface.prototype.allReceive=function (receiveFn) {
    this.__stroage__.instance.setConf('receive',receiveFn);
    return this;
};

//请求数据成功
serverInterface.prototype.success=function (successFn) {
    this.__stroage__.instance.setConf('success',successFn);
    return this;
};

//请求数据失败
serverInterface.prototype.fail=function (failFn) {
    this.__stroage__.instance.setConf('fail',failFn);
    return this;
};



//请求数据接收
serverInterface.prototype.onceReceive=function (receiveFn) {
    this.__stroage__.instance.setConf('onceReceive',receiveFn);
    return this;
};

//请求数据成功
serverInterface.prototype.onceSuccess=function (successFn) {
    this.__stroage__.instance.setConf('onceSuccess',successFn);
    return this;
};

//请求数据失败
serverInterface.prototype.onceFail=function (failFn) {
    this.__stroage__.instance.setConf('onceFail',failFn);
    return this;
};

//设置请求配置
serverInterface.prototype.setConf=function (confFn) {
    this.__stroage__.instance.setConf('setConf',confFn);
    return this;
};
/**
 * Created by xiyuan on 16-8-15.
 */

function serverImage(conf,serverInterface) {
    conf = typeof conf === 'object' ? conf : {url: conf};
    this.conf = conf;
    this.confArray = [];
    this.tmpConf = {};
    this.serverInterface = serverInterface;
    var instanceConf=this.instanceConf = {};

    var defulteServerType = 'http',
        serverType = defulteServerType;
    serverType = (typeof conf === 'object' && conf.serverType) || serverType;

    //获取服务库中的实例
    if (!(this.instance = $serverManage.get(serverType))) {
        $log.warning('[数据服务] ' + serverType + '服务器未注册!')
    }

    //获取服务类型
    if (typeof conf === 'object') {
        Object.keys(conf).forEach(function (val) {
            instanceConf[val] = conf[val];
        })
    }
    //服务初始化
    typeof this.instance.init === 'function' && this.instance.init(instanceConf);

}

//设置配置
serverImage.prototype.setConf = function (confName, conf) {

    this.confArray.push({
        key: confName,
        data: conf
    });
};

//服务器动
serverImage.prototype.startUp = function () {

    var conf = this.conf,
        tmpConf = this.tmpConf,
        instance = this.instance,
        instanceConf = this.instanceConf,
        extendServer = instance.extend ||{};

    //获取服务类型
    if (typeof conf === 'object') {
        Object.keys(conf).forEach(function (val) {
            instanceConf[val] = conf[val];
        })
    }

    //处理继承中的配置
    switch( typeof extendServer.config){
        case 'object':
            Object.keys(extendServer.config).forEach(function (key) {
                switch (key){
                    case 'header':
                        instanceConf[key] =instanceConf[key] ? $object.concat(instanceConf[key],extendServer.config[key]):extendServer.config[key];
                        break;
                    default:
                        instanceConf[key] = extendServer.config[key];
                }
            });
            break;
        case 'function':
            extendServer.config(instanceConf);

    }

    var $receive = [],
        $success = [],
        $fail = [],
        deleteIndex=[];

    //合并临时配置
    this.confArray.forEach(function (confData,index) {
        var key = confData.key,
            conf = confData.data;
        tmpConf[key] = conf;

        switch (key) {
            case 'data':
                instanceConf.data = $object.concat(instanceConf.data || {}, conf);
                break;
            case 'setConf':
                switch (typeof conf) {
                    case 'object':
                        Object.keys(conf).forEach(function (key) {
                            instanceConf[key] = conf[key];
                        });
                        break;
                    case 'function':
                        conf(instanceConf);
                }
                break;
            case 'receive':
                $receive.push(conf);
                break;
            case 'success':
                $success.push(conf);
                break;
            case 'fail':
                $fail.push(conf);
                break;
            case 'onceReceive':
                $receive.push(conf);
                deleteIndex.push(index);
                break;
            case 'onceSuccess':
                $success.push(conf);
                deleteIndex.push(index);
                break;
            case 'onceFail':
                $fail.push(conf);
                deleteIndex.push(index);
                break;
            default:
                instanceConf[key] = conf;
        }
    });

    //删除配置中的 once
    deleteIndex.reverse().forEach(function (i) {
        this.confArray.splice(i,1);
    }.bind(this));

    (function () {
        'use strict';
        //实现继承中的拦截器
        var filters = extendServer.filter ||{};

        //响应处理
        function response(type,$task) {
            instanceConf[type] && $task.unshift(instanceConf[type]);

            //检查是否有处理任务
            if(!$task.length) return;

            //此函数是提供给服务处理请求专用
            instanceConf[type] = function () {
                var res,
                    isCallback = false,
                    args = [].slice.call(arguments);

                //回调处理
                function callback() {
                    args = [].slice.call(arguments);
                    isCallback = true;

                    $task.forEach(function (callback) {
                        callback.apply(this, args)
                    }.bind(this))
                }

                //检查是否有过滤器
                if (typeof filters[type] === "function") {
                    res = filters[type].apply(this, args.push(callback.bind(this)) && args);
                    isCallback || callback.apply(this, res instanceof Array ? res : [res])
                }else{
                    callback.apply(this, args)
                }
            };
        }

        //值接收
        response('receive',$receive);

        //成功
        response('success',$success);

        //失败
        response('fail',$fail);

        //检查是否有结果处理器
        if(typeof filters.processor === "function"){

            //备份相关数据结果回调
            var receiveBackups= instanceConf['receive'],
                successBackups= instanceConf['success'],
                failBackups= instanceConf['fail'],
                receiveRes={},
                successRes={},
                failRes={},
                handleFns={
                    receive:function () {
                        receiveRes.isRun=true;
                        typeof receiveBackups === "function" && receiveBackups.apply(this,arguments);
                    },
                    success:function () {
                        successRes.isRun=true;
                        typeof successBackups === "function" && successBackups.apply(this,arguments);
                    },
                    fail:function () {
                        failRes.isRun=true;
                        typeof failBackups === "function" && failBackups.apply(this,arguments);
                    }
                };

            instanceConf['success']=function () {
                successRes.args=arguments;
            };
            instanceConf['fail']=function () {
                failRes.args=arguments;
            };

            instanceConf['receive']=function (res) {
                receiveRes.args=arguments;
                filters.processor(res,handleFns,this);

                if( !failRes.isRun && !successRes.isRun){
                    successRes.args && typeof successBackups === "function" && successBackups.apply(this,successRes.args);
                    failRes.args && typeof failBackups === "function" && failBackups.apply(this,failRes.args);
                }
                receiveRes.isRun || (typeof receiveBackups === "function" && receiveBackups.apply(this,receiveRes.args));
            };
        }

    })();

    //实例初始化
    typeof instance.requestInit === "function" && instance.requestInit(instanceConf);

    //实现继承中的初始化
    typeof extendServer.requestInit === "function" && extendServer.requestInit(instanceConf);

    //实例处理
    typeof instance.handle === "function" && instance.handle(instanceConf, function () {
        //配置复位
        this.tmpConf = {};
        this.confArray = [];
        this.instanceConf = {};
    }.bind(this));

    //实例请求
    function request() {
        instance.request(instanceConf,(extendServer.filter||{}).request);
    }

    //实现请求重写
    if(typeof extendServer.request === "function"){
        extendServer.request(instanceConf,request);
    }else{
        request();
    }


};

//服务接口
serverImage.prototype.interface = function () {
    var extendInterface,
        extendServer = this.instance.extend ||{},
        interface=this.instance.interface ? this.instance.interface.call(this, this.tmpConf,this.instanceConf,this.serverInterface) : {};

        //实现继承中的接口挂载
        if(extendServer.interface){
            extendInterface=extendServer.interface.call(this.instance, this.tmpConf);
            Object.keys(extendInterface).forEach(function (key) {
                interface[key]=extendInterface[key];
            });
        }
        return interface;
};
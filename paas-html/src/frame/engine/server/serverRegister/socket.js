$serverManage.register('socket', {
    //服务初始化
    init:function (stroage) {
        stroage.WS=$net.socket({
            url:stroage.url,
            data:stroage.sendData
        });

    },
    //请求初始化
    requestInit: function (stroage, interceptors) {

    },
    handle: function (stroage, callbackFn, interceptors) {

        stroage.WS.error(function (event) {
            typeof stroage.fail === "function" && stroage.fail.call(stroage.WS, event, stroage);
        }).close(function (event) {
            typeof stroage.fail === "function" && stroage.fail.call(stroage.WS, event, stroage);
        }).message(function (event) {
            typeof stroage.receive === "function" && stroage.receive.call(stroage.WS, event, stroage);
        }).open(function (event) {
            typeof stroage.receive === "function" && stroage.receive.call(stroage.WS, event, stroage);
        })


    },
    //服务请求
    request: function (stroage, interceptors) {
        if(!stroage.isRequest){
            stroage.WS.request();
            stroage.isRequest=true;
        }
    },
    //额外的接口
    interface: function (stroage,instanceConf,serverInterface) {
        return {
            error:function (fn) {
                instanceConf.WS.error(fn);
                return serverInterface;
            },
            close:function (fn) {
                instanceConf.WS.close(fn);
                return serverInterface;
            },
            message:function (fn) {
                instanceConf.WS.message(fn);
                return serverInterface;
            },
            open:function (fn) {
                instanceConf.WS.open(fn);
                return serverInterface;
            }
        }
    }
});
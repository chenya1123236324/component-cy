socketApiServerRegister(function ($app, $appConfig) {

    var host,
        gateway;

    //路径规范化
    function normalize(path) {
        var DOT_RE = /\/\.\//g,
            DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//,
            MULTI_SLASH_RE = /([^:/])\/+\//g;

        path = path.replace(DOT_RE, "/");
        path = path.replace(MULTI_SLASH_RE, "$1/");
        while (path.match(DOUBLE_DOT_RE)) {
            path = path.replace(DOUBLE_DOT_RE, "/")
        }
        return path
    }

    //获取绝对地址
    function resolve(url, host) {
        var dir = /^(http|https|file):\/\//i.test(url) ? url : host + '/' + url;
        return normalize(dir);
    }

    $app.serverRegister('socketApi', {
        //服务初始化
        init: function (stroage) {
            //获取缓存中的地址
            host = $FRAME.getConfig('API_HOST', 'apiUrlMap');
            gateway= $FRAME.getConfig('API_GATEWAY', 'apiUrlMap');

            //兼容 默认不填写 api的网关路径
            if (!host.match(new RegExp(gateway))) {
                host += '/'+gateway;
            }

            //规范请求的地址
            stroage.url = resolve(stroage.url, host);

            stroage.WS = $FRAME.lib.$net.socket({
                url: stroage.url,
                data: stroage.sendData
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
            if (!stroage.isRequest) {
                stroage.WS.request();
                stroage.isRequest = true;
            }
        },
        //额外的接口
        interface: function (stroage, instanceConf, serverInterface) {
            return {
                error: function (fn) {
                    instanceConf.WS.error(fn);
                    return serverInterface;
                },
                close: function (fn) {
                    instanceConf.WS.close(fn);
                    return serverInterface;
                },
                message: function (fn) {
                    instanceConf.WS.message(fn);
                    return serverInterface;
                },
                open: function (fn) {
                    instanceConf.WS.open(fn);
                    return serverInterface;
                }
            }
        }
    });


});
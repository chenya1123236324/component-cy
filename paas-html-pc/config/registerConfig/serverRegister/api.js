/**
 * Created by xiyuan on 16-8-16.
 */
apisServerRegister(function ($app, $appConfig) {

    var host='服务器地址未设置',
        gateway,
        noTokenUrls = ['mobileAuth'],
        API_URL_MAP=null;

    //接口错误字典
    var APIERRORMAP = {
        1001: "用户账号不存在",
        1002: "密码错误",
        1003: "验证码错误",
        1004: "登录异常",
        1005: "用户账号被锁定",
        1006: "用户密码有误",
        1007: "企业账号不存在",
        1008: "账号被禁用",
        1009: "登录超时",
        11002: "超过企业使用规定的有效期",
        "fail":'服务端出错!'
    };

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

    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    //获取绝对地址
    function resolve(url, host) {
        var dir = /^(http|https|file):\/\//i.test(url) ? url : host + '/' + url;
        return normalize(dir);
    }

    $app.serverRegister('api', function ($serverStroage) {

        return apiServer = $serverStroage.extend('http', {

            filter: {
                //结果处理
                processor:function (res,handles,xhr) {
                    if(res && res.status == 200){
                        handles.success(res.data)
                    }else{
                        // console.log(res && res.message,'----')
                        handles.fail(res && res.message || (xhr.status === 404 ?'服务接口未找到！':'服务端未知错误！'))
                    }
                },
                receive: function (data, xhr, callback) {

                    data = data || {
                            data: null,
                            message: "请求异常!",
                            state: 0
                        };

                    if (typeof data !== "object") {
                        data = {
                            data: null,
                            message: data ? APIERRORMAP[data] : '',
                            state: 0
                        }
                    }

                    return [data, xhr];
                },
                success: function (data, xhr) {
                    return [data];
                },
                fail: function (data, xhr) {
                    return [data];
                },
                request:function (conf,send) {
                    delete conf.header['Content-type'];
                    send(JSON.stringify(conf.sendData));
                }
            },
            requestInit: function (conf) {
                //过滤地址并添加token
                if (noTokenUrls.in(conf.url) === -1) {
                    (conf.data = conf.data || {})['token'] = $FRAME.localStorage('loginToken');
                }

                //检查是否开启formData方式传递数据
                if(conf.isFormData){
                    //表单数据对象
                    var $formData = new FormData();
                    //循环取出数据容器中数据放入FormData中
                    Object.keys(conf.data).forEach(function (name) {
                        $formData.append(name, conf.data[name]);
                    });
                    conf.data=$formData;
                }

                //获取缓存中的地址
                host=$FRAME.getConfig('API_HOST','apiUrlMap');
                gateway= $FRAME.getConfig('API_GATEWAY', 'apiUrlMap');

                //兼容 默认不填写协议
                if(!host.match(/(\w+\:)\/\//)){
                    host='http://'+host;
                }

                //兼容 默认不填写 api的网关路径
                if (!host.match(new RegExp(gateway))) {
                    host += '/'+gateway;
                }

                //获取api 字典
                if(!API_URL_MAP){
                    API_URL_MAP=$FRAME.getConfig('API_URL_MAP','apiUrlMap');
                }

                //规范请求的地址
                conf.url = resolve(API_URL_MAP?API_URL_MAP[conf.url]||conf.url:conf.url, host);

            },
            config: {
                header: {
                    // 'Device-Type':'mobile'
                    'X-XSRF-TOKEN':getCookie('XSRF-TOKEN')
                },
                timeout:6000,
                method:'post',
                responseType: 'json'
            },
            interface: function () {
                return {}
            },
            //require
            request:function (conf,$request) {
                $request();
            }

        });

    })

});
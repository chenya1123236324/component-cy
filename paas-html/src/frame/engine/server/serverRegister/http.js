$serverManage.register('http', {
    //服务
    requestInit: function (stroage, interceptors) {
        stroage.xhr = new XMLHttpRequest();
        stroage.async = stroage.async || true;
        stroage.header = stroage.header || {};
        stroage.sendData = stroage.data || {};
        stroage.responseType = stroage.responseType || 'json';
    },
    handle: function (stroage, callbackFn, interceptors) {

        var res,
            xhr = stroage.xhr;

        xhr.onreadystatechange = function () {
            //读取状态
            if (xhr.readyState === 4) {
                //请求状态
                if (xhr.status > 199 && xhr.status < 300) {
                    switch (stroage.responseType) {
                        case 'html':
                            res = xhr.responseText;
                            break;
                        case 'xml':
                            res = xhr.responseXML;
                            break;
                        case 'json':
                            res = $json.toObject(xhr.responseText);
                            break;
                        default:
                            res = xhr.response || xhr.responseText;
                    }
                    typeof stroage.success === "function" && stroage.success.call(xhr, res, stroage);
                } else {
                    typeof stroage.fail === "function" && stroage.fail.call(xhr, res, stroage);
                }
                typeof stroage.receive === "function" && stroage.receive.call(xhr, res, stroage);

                typeof callbackFn === "function" && callbackFn();
            }

        };
    },
    //服务请求
    request: function (stroage, requestFilters) {
        var isRequest=false;

        //超时设置
        stroage.timeout && (stroage.xhr.timeout = stroage.timeout);

        //处理请求类型
        stroage.method = (new RegExp(stroage.method, 'ig').exec('GET,DELETE,POST,PUT,HEAD').toString() || 'GET');

        var sendData = stroage.sendData ? $url.objectToUrl(stroage.sendData) : '';

        //检查请求类型
        switch (stroage.method) {
            case 'POST':

                break;
            case 'GET':
                stroage.url = stroage.url + (sendData && (stroage.url.indexOf('?') === -1 ? '?' : '&') + sendData);
                break;
            case 'DELETE':

                break;
            case 'PUT':

                break;
            case 'HEAD':

                break;
        }

        //打开请求资源
        stroage.xhr.open(stroage.method, stroage.url, stroage.async);

        //请求类型检查
        switch (stroage.method) {
            case 'POST':
                stroage.header['Content-type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                break;
            case 'GET':
                //判断请求是否需要设置content-type(主要处理zip压缩)
                //(typeof option.preset === "function" && option.preset.type) || xhr.setRequestHeader('Content-type','application/text/html;charset=utf-8');
                break;
            case 'DELETE':

                break;
            case 'PUT':

                break;
            case 'HEAD':

                break;
        }

        function request(sendData) {
            isRequest=true;

            //ajax请求缓存
            typeof stroage.cache !== "undefined" && !stroage.cache && (stroage.header["Cache-Control"] = "no-cache") && (stroage.header["If-Modified-Since"] = "0");

            //设置请求头
            Object.keys(stroage.header).forEach(function (key) {
                stroage.xhr.setRequestHeader(key, stroage.header[key]);
            });
            stroage.xhr.send(sendData);
        }

        //请求过滤
        typeof requestFilters === "function" && requestFilters(stroage,request);

        //发送数据
        isRequest || request(sendData);
    },
    //额外的接口
    interface: function (stroage) {

        return {
            //请求类型设置
            method: function (methodType) {
                stroage.method = methodType;
            },
            async: function (asyncToggle) {
                stroage.async = !!asyncToggle;
            },
            header: function (headers) {
                stroage.header = stroage.header || {};
                switch (typeof headers){
                    case 'function':
                        headers(stroage.header);
                        break;
                    case 'object':
                        Object.keys(headers).forEach(function (key) {
                            stroage.header[key] = headers[key];
                        });
                        break;
                }
            }
        }
    }
});
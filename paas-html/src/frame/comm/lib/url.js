/**
 * Created by xiyuan on 15-11-4.
 */
!function (factory) {

    if (typeof define === "function" && define.amd) {

        define('url', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('url', [], function (require) {
            return factory();
        });

    } else {
        window.url = factory();
    }

}(function () {

    var url = {};
    /* url编码 */
    var encode = window ? window.encodeURIComponent : encodeURIComponent;

    /*获取变量的类型*/
    var getType = function (value) {
        var type = typeof (value);
        if (type == 'object') {
            type = Object.prototype.toString.call(value).match(/Object\s+([a-z0-9_]*)/i)[1].toLocaleLowerCase()
        }
        return type;
    };

    /* 获取url的hash */
    url.hash = function (url) {
        if (typeof arguments[0] === "string")window.location.hash = encodeURI(arguments[0]);
        return window.location.hash.replace(/^#/, '');
    };

    /* 获取url地址 */
    url.url = url.href = function () {
        if (typeof arguments[0] === "string")window.location.href = arguments[0];
        return window.location.href;
    };

    /* 设置或返回主机名和当前 URL 的端口号 */
    url.host = function () {
        if (typeof arguments[0] === "string")window.location.host = arguments[0];
        return window.location.host;
    };

    /* 设置或返回当前 URL 的主机名 */
    url.hostName = function () {
        if (typeof arguments[0] === "string")window.location.hostname = arguments[0];
        return window.location.hostname;
    };

    /* 设置或返回当前 URL 的端口号 */
    url.port = function () {
        if (typeof arguments[0] === "string")window.location.port = arguments[0];
        return window.location.port;
    };

    /* 设置或返回当前 URL 的协议 */
    url.protocol = function (url) {
        var protocol;
        if (typeof url === "string"){
            protocol=url.match(/(\w+\:)\/\//);
        }
        return protocol?protocol[1]:window.location.protocol;
    };

    /* 合并数据到url参数中 */
    url.computedUrl = function (_url, data) {
        var hashIndex = _url.indexOf('#'), normal, hash, dataUrl = url.objectToUrl(data);
        if (hashIndex < 0) {
            normal = _url;
            hash = '';
        } else {
            normal = _url.slice(0, hashIndex);
            hash = _url.slice(hashIndex);
        }

        normal += dataUrl ? (normal.indexOf('?') < 0 ? '?' : '&') : '';

        return normal + dataUrl;//+ hash;
    };

    /* 把对象转换成url参数 */
    url.objectToUrl = function (obj) {
        var key, value, str = '';
        var data = [];
        switch (getType(obj)) {
            case 'object':
                for (key in obj) {
                    value = obj[key];
                    if (typeof value === 'object') {
                        for (var i in value) {
                            str += '&' + encode(key) + '=' + encode(value[i]);
                        }
                    } else {
                        str += '&' + encode(key) + '=' + encode(value);
                    }
                }
                return str.replace(/^&/, '');
                break;
            case 'array':
                for (key in obj) {
                    value = obj[key];
                    data.push(encode(key) + '=' + encode(value));
                }
                return data.join('&');
                break;
        }
        return obj;
    };

    /* 转换URL参数为object */
    url.urlToObject = function (str,toggle) {
        var _str=str,
            result = {},
            index = str.indexOf('?')+1,
            hashIndex=str.indexOf('#');

        if(index){

            //检查hash是否存在,并且检查sercha是否在hash前面
            if(hashIndex > index){
                str = str.substring(index,hashIndex);

                //判断是否开启合并hash中的参数
                if(toggle){
                    _str=_str.substring(hashIndex);
                    index=_str.indexOf('?')+1;
                    index && (str=str+'&'+_str.substring(index))
                }

            //检查hash是否存在
            }else if(toggle && hashIndex < index || hashIndex === -1 ){

                str = str.substring(index);
            }

            var arr = str.split("&"),

                key=~0,l=arr.length;
            while (++key<l){
                var value = arr[key].split('=');
                //修复多个重名表单name值
                var nameKey = decodeURIComponent(value[0]);
                var nameValue = decodeURIComponent(value[1]);
                var nameValues = result[nameKey];
                switch (typeof nameValues) {
                    case 'object':
                        result[nameKey].push(nameValue);
                        break;
                    case 'string':
                        result[nameKey] = [nameValues, nameValue];
                        break;
                    default :
                        result[nameKey] = nameValue;
                }
            }


        }
        return result;
    };

    return url;
});

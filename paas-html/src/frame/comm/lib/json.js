(function (factory) {

    if (typeof define === "function" && define.amd) {

        define('json',['object'], factory);

    } else if (typeof define === "function" && define.cmd) {

        define('json', ['object'], function (require) {
            return factory(require('object'));
        });

    } else {
        window.json = factory();
    }

})(function ($object) {

    //篡改系统JSON转字符串
    var jsonStringify=JSON.stringify;
    JSON.stringify=function (obj) {
        return jsonStringify($object.clone(obj))
    };

    var json = {};

    //把对象转换成json字符串
    json.toString = function (obj) {
        var TmpArray = [];
        for (var i in obj) {
            obj[i] = typeof obj[i] == 'string' ? '"' + (obj[i].replace(/"/g, '\\"')) + '"' : (typeof obj[i] == 'object' ? arguments.callee(obj[i]) : obj[i]);
            TmpArray.push(i + ':' + obj[i]);
        }
        return '{' + TmpArray.join(',') + '}';
    };

    //把字符串解析成对象
    json.toObject = function (str) {
        if (typeof (str) == 'object') {
            return str;
        } else {
            try {
                var json = new Function("return " + str)();
            }
            catch (e) {
                return str;
            }
            return json;
        }
    };

    return json;

});

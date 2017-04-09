
(function (factory) {
    if (typeof define === "function" && define.amd) {

        define('net', ['json','type','url','jsonp','socket'], factory);

    } else if (typeof define === "function" && define.cmd) {

        define('net', [], function (require) {
            return factory();
        });

    } else {
        window.net = factory();
    }
})(function (json,type,url,jsonp,socket) {
    var net={
            jsonp:jsonp,
            socket:socket
        },
        $url=url;

    /*工具*/
    var tools={
        toObject:json.toObject,
        getType:type.getType,
        objectToUrl:url.objectToUrl
    };

//@MAKE:start 编译开始

    Include('./ajax.js');

    Include('./get.js');

//@MAKE:end 编译结束

    return net;
});

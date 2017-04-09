/**
 * Created by xiyuan on 15-11-30.
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        define('buffer',[], factory);

    } else if (typeof define === "function" && define.cmd) {

        define('buffer', [], function (require) {
            return factory();
        });

    } else {
        window.buffer = factory();
    }
})(function () {
    var exports={};

    exports.uint8ArrayToBase64=function( bytes ) {
        var binary = '';
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    };

    exports.arrayBufferToBase64=function(buffer){
        return exports.uint8ArrayToBase64(new Uint8Array( buffer ))
    };

    exports.uint8ArrayToImage=function( bytes ,fileName) {
        return 'data:image/' + (fileName||'png').match(/[^\.\s\\\/]+$/) +
            ';base64,'+
            exports.uint8ArrayToBase64(bytes);
    };

    exports.arrayBufferToImage=function(buffer,fileName){
        return exports.uint8ArrayToImage(new Uint8Array( buffer ),fileName);
    };

    return exports;

});


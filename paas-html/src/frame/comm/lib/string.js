/**
 * Created by xiyuan on 15-11-4.
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        define('string', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('string', [], function (require) {
            return factory();
        });

    } else {
        window.string = factory();
    }
})(function () {
    /*字符串处理（与PHP的 trim功能相同）*/
    String.prototype.ltrim=function(str){
        if(typeof str == "undefined"){
            return this.replace(/^\s*/,'')
        }
        return this.substr(0,str.length) === str && (this.substr(str.length)) || this;
    };

    String.prototype.rtrim=function(str){
        if(typeof str == "undefined"){
            return this.replace(/\s*$/,'')
        }
        return this.substr(-str.length) === str && (this.substr(0,this.length-str.length)) || this;
    };

    String.prototype.trim=function(str){
        return this.ltrim(str).rtrim(str);
    };

    var string={};

    //html编码
    string.HTMLEncode=function (str) {
        var s = "";
        if(str.length == 0) return "";
        s    =    str.replace(/&/g,"&amp;");
        s    =    s.replace(/</g,"&lt;");
        s    =    s.replace(/>/g,"&gt;");
        s    =    s.replace(/ /g,"&nbsp;");
        s    =    s.replace(/\'/g,"&#39;");
        s    =    s.replace(/\"/g,"&quot;");
        return   s;
    };

    //解码html;
    string.HTMLDecode = function (str) {
        var s = "";
        if(str.length == 0)   return "";
        s = str.replace(/&amp;/g,"&");
        s = s.replace(/&lt;/g,"<");
        s = s.replace(/&gt;/g,">");
        s = s.replace(/&nbsp;/g," ");
        s = s.replace(/&#39;/g,"\'");
        s = s.replace(/&quot;/g,"\"");
        return   s;
    };

    //转换为小写
    string.manualLowercase = function(s) {
        /* jshint bitwise: false */
        return isString(s)
            ? s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);})
            : s;
    };

    //转换为大写
    string.manualUppercase = function(s) {
        /* jshint bitwise: false */
        return isString(s)
            ? s.replace(/[a-z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) & ~32);})
            : s;
    };

    //转换为小写
    string.lowercase = function(string) {return isString(string) ? string.toLowerCase() : string;};

    //转换为大写
    string.lowercase = function(string) {return isString(string) ? string.toUpperCase() : string;};

    //检测字符大小写转换
    if ('i' !== 'I'.toLowerCase()) {
        string.lowercase = string.manualLowercase;
        string.uppercase = string.manualUppercase;
    }

    //转换为正则字符
    string.escapeForRegexp = function(s) {
        return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').
        replace(/\x08/g, '\\x08');
    };

    return string;
});
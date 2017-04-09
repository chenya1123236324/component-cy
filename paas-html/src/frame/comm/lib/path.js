/**
 * Created by xiyuan on 15-11-4.
 */
(function (factory) {

    if (typeof define === "function" && define.amd) {

        define('path', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('path', [], function (require) {
            return factory();
        });

    } else {
        window.path = factory();
    }

})(function () {

    var path = {};

    var DIRNAME_RE = /[^?#]*\//;

    var DOT_RE = /\/\.\//g;
    var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//
    var MULTI_SLASH_RE = /([^:/])\/+\//g
    var scripts = document.scripts
    var loaderScript = document.getElementById("frameDir") || scripts[scripts.length - 1]
    var getScriptAbsoluteSrc = function (node) {
        return node.hasAttribute ? node.src : node.getAttribute("src", 4)
    };

    /*获取文件路径*/
    var dirname = path.dirname = function (path) {
        return path.match(DIRNAME_RE)[0]
    };

    /*当前项目入口地址*/
    var cwd = path.cwd = (!location.href || location.href.indexOf('about:') === 0) ? '' : dirname(location.href);

    /*当前框架地址*/
    path.frameDir = path.frameRoot = function () {
        var frameRootElement = document.querySelectorAll('[frameRoot]');
        if (frameRootElement.length == 1) {
            frameRootElement = document.querySelectorAll('[frameroot]')[0];
        } else {
            frameRootElement = document.scripts[scripts.length - 1];
        }
        return dirname(getScriptAbsoluteSrc(frameRootElement) || cwd);
    }();

    /*规范化路径*/
    var normalize = path.normalize = function (path) {
        // /a/b/./c/./d ==> /a/b/c/d
        path = path.replace(DOT_RE, "/")

        /*
         a//b/c ==> a/b/c
         a///b/////c ==> a/b/c
         */
        path = path.replace(MULTI_SLASH_RE, "$1/");

        // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
        while (path.match(DOUBLE_DOT_RE)) {
            path = path.replace(DOUBLE_DOT_RE, "/")
        }

        return path
    };

    /*绝对路径*/
    path.resolve = function (path, url) {
        var dir = /^(http|https|file):\/\//i.test(path) ? path : dirname(url || window.location.href) + (path || '');
        return normalize(dir);
    };

    /*获取路径中的文件名*/
    path.fileName = function (path) {
        var res = path.match(/^[\S]+\/([^\s\/]+)$/)
        return res ? res[1] : '';
    };

    /*获取路径中的文件*/
    path.file = function (path) {
        var res = path.match(/^[\S]+\/([^\s\.\/]+)[^\s\/]*$/);
        return res ? res[1] : '';
    };

    /*获取路径中的文件后缀*/
    path.suffix = function (path) {
        var res = path.match(/\.[^\.\/]*$/);
        return res ? res[0] : '';
    };

    /*获取去除后缀路径*/
    path.noSuffix = function (path) {
        var res = path.match(/[^?#]*\/[^\.\/]*/);
        return res ? res[0] : '';
    };

    return path;
});

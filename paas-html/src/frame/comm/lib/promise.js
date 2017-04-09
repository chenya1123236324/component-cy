/**
 * Created by xiyuan on 16-8-11.
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        define('promise', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('promise', [], function (require) {
            return factory();
        });

    } else {
        window.string = factory();
    }
})(function () {
    var $promise=function () {

    };



    return $promise;
});
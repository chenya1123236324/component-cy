/**
 * Created by xiyuan on 16-8-17.
 */

if (typeof define === "function" && define.amd) {

    define('log', function () {
        return $log;
    });

} else if (typeof define === "function" && define.cmd) {
    define('log', [], function (require) {
        return $log;
    });

} else {
    window.$log = $log;
}
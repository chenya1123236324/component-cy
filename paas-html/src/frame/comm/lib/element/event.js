/**
 * Created by xiyuan on 15-12-7.
 */

/*事件绑定与解除*/
var addEventListener = function (element, type, fn) {
        element.addEventListener(type, fn, false);
    },
    removeEventListener = function (element, type, fn) {
        element.removeEventListener(type, fn, false);
    },
    eventElementCache = {

    };

/**/

$element.on = function (element, type, fn) {
    addEventListener(element, type, fn);
};

$element.off = function (element, type, fn) {
    removeEventListener(element, type, fn);
};



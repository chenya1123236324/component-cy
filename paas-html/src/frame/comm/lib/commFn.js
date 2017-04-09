/**
 * Created by xiyuan on 15-11-24.
 */
(function(factory){
    if (typeof define === "function" && define.amd) {

        define('commFn', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('commFn', [], function (require) {
            return factory();
        });

    } else {
        window.commFn = factory();
    }

})(function(){
    var commFn={};

    //延时方法
    commFn.sleep=function (milliSeconds){
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }

    /*id生成器*/
    commFn.makeId=function () {
        return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/x/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    return commFn;
});

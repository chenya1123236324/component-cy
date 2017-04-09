/**
 * Created by chenya on 2017/1/3.
 */
//查询单个模块
define(function () {
    //参数:
    // 1、callback    回调函数
    return function (model,callback) {
        var This=model;
        var querySingleModule = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'moduleList'
            }).receive(function (res) {
                typeof callback === 'function' && callback(res);
            }.bind(this)).send({});

        });
        return querySingleModule;
    }
});
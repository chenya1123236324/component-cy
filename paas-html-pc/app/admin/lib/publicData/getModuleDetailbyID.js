/**
 * Created by chenya on 2017/2/20.
 */
//根据模块ID获取模块信息
define(function () {
    //参数:
    //1、moduleId      模块id
    // 2、callback    回调函数
    return function (model,moduleId,callback) {
        var This=model;
        var moduleDetailModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'moduleDetail'
            }).receive(function (res) {
                typeof callback === 'function' && callback(res);
            }.bind(this)).send({});
        });
        return moduleDetailModel;
    }
});

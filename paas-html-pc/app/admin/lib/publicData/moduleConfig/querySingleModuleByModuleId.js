
//通过moduleId查询单个模块信息
define(function () {
    //参数:
    // 1、moduleId     模块ID
    // 2、callback    回调函数
    return function (moduleId,callback) {
        var querySingleModule = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'moduleDetail'
            }).receive(function (res) {
                typeof callback === 'function' && callback(res);
            }.bind(this)).send({
                moduleId:moduleId
            });

        });
        return querySingleModule;
    }
});

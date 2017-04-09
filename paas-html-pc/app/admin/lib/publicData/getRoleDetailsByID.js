//根据角色Id获取角色详情
define(function () {
    //参数:
    // 1、roleId     角色Id
    // 2、callback    回调函数
    return function (roleId,callback) {
        var querySingleModule = $FRAME.$model(function () {
            //角色详情
            this.server({
                serverType:'api',
                method:'POST',
                url:'roleDetail'
            }).receive(function (res) {
                typeof callback === 'function' && callback(res);
            }.bind(this)).send({
                roleId:roleId
            });
        });
        return querySingleModule;
    }
});


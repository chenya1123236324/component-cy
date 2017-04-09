/**
 * Created by chenya on 2017/3/4.
 */
//模糊查询用户名称
define(function () {
    //参数:
    // 2、callback    回调函数
    return function (model,callback) {
        var This=model;
        var userListModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'userList'
            }).receive(function (res) {
                   var list=[];
                res.data.record.forEach(function (column) {
                    list.push({
                        name:column.realName,//用户名称
                        value:column.id,//用户id
                    });
                });
                typeof callback === 'function' && callback(list);
            }.bind(this)).send({});
        });
        return userListModel;
    }
});
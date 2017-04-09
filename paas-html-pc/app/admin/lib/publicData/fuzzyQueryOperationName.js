/**
 * Created by chenya on 2017/3/5.
 */
/**
 * Created by chenya on 2017/3/4.
 */
//模糊查询操作名称
define(function () {
    //参数:
    // 2、callback    回调函数
    return function (model,callback) {
        var This=model;
        var operationListModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'moduleConfigOperation'
            }).receive(function (res) {
                var list=[];
                res.data.record.forEach(function (column) {
                    list.push({
                        name:column.operationName,//操作名称
                        value:column.id,//操作id
                    });
                });
                typeof callback === 'function' && callback(list);
            }.bind(this)).send({
                "currentPage": 1,
                "moduleId": "",
                "flag": 0,
                "pageSize": 20,
                "sidx": "id",
                "order": "desc"
            });
        });
        return operationListModel;
    }
});
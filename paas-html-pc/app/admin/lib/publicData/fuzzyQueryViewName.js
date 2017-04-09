/**
 * Created by chenya on 2017/3/9.
 */
//模糊查询视图名称
define(function () {
    //参数:
    // 2、callback    回调函数
    return function (model,callback) {
        var This=model;
        var viewListModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'moduleConfigView'
            }).receive(function (res) {
                var list=[];
                res.data.record.forEach(function (column) {
                    list.push({
                        name:column.viewName,//视图名称
                        value:column.id,//视图id
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
        return viewListModel;
    }
});
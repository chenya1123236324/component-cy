/**
 * Created by chenya on 2017/3/8.
 */

//模糊查询字段名称
define(function () {
    //参数:
    // 2、callback    回调函数
    return function (model,callback) {
        var This=model,
            moduleId = $_GET['moduleId'];
        var fieldListModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'moduleConfigField'
            }).receive(function (res) {
                var list=[];
                res.data.record.forEach(function (column) {
                    list.push({
                        name:column.columnName,//字段名称
                        value:column.id,//字段id
                    });
                });
                typeof callback === 'function' && callback(list);
            }.bind(this)).send({
                "currentPage":1,
                "pageSize":20,
                "sidx":"",
                "order":"desc",
                moduleId:moduleId,
                orderField:"id",
                "keyVal":"",
                pageNow:1,
                "moduleCode":""
            });
        });
        return fieldListModel;
    }
});
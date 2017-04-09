/**
 * Created by chenya on 2017/3/10.
 */
//查询当前模块下字段集合
define(function () {
    //参数:
    //1、moduleId       模块id
    // 2、callback    回调函数
    return function (model,moduleId,queryCurrent,callback) {
        var This=model;
        var roleIdsListModel = $FRAME.$model(function () {
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'queryModuleField'
            }).receive(function (res) {
                var dataList=[ {
                    content:'--请选择--',
                    value:'-1',
                }];

                var list=[];
                //分组
                res.data.forEach(function (group) {
                    //孩子节点
                    if(group.list !=undefined){
                        group.list.forEach(function(column){
                            queryCurrent.forEach(function(val, index) {
                                if(val==column.id) {
                                    list.push({
                                        content: column.columnName,//字段名称
                                        value: column.id,//字段id
                                        selected:true
                                    });
                                }else{
                                    list.push({
                                        content: column.columnName,//字段名称
                                        value: column.id,//字段id
                                    });
                                }
                            });
                        });
                    }
                    dataList.push({
                        Group:true,//是否分组
                        label:group.name,//分组名称
                        list:list//分组列表
                    });
                });

                typeof callback === 'function' && callback(dataList);
            }.bind(this)).send({
                "moduleId":moduleId
            });
        });
        return roleIdsListModel;
    }
});

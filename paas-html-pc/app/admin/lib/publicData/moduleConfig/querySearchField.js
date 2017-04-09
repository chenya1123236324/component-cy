/**
 * Created by chenya on 2017/3/10.
 */
//查询可搜索字段
define(function () {
    //参数:
    //2、moduleId       模块id
    //3、searchColumns  查询可搜索字段
    //4、callback    回调函数
    return function (model,moduleId,searchColumns,callback) {
        var This=model;
        var roleIdsListModel = $FRAME.$model(function () {
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'viewCanSearch'
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
                            searchColumns.forEach(function(val, index) {
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
                            Group:group.Group,//是否分组
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
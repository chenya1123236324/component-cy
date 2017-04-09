/**
 * Created by chenya on 2017/3/14.
 */
//查询视图公式集合【配置公式】
define(function () {
    //参数:
    //2、moduleId       模块id
    //3、searchTag     查询
    //4、callback    回调函数
    return function (model,moduleId,searchTag,callback) {
        var This=model;
        var roleIdsListModel = $FRAME.$model(function () {
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'queryViewFormulaSet'
            }).receive(function (res) {
                var dataList=[ {
                    content:'--请选择--',
                    value:'-1',
                }];
                res.data.forEach(function (column) {

                    searchTag.forEach(function(val, index) {
                        if(val==column.id){
                            dataList.push({
                                content:column.columnName,//字段名称
                                value:column.id,//字段id
                                selected:true
                            });
                        }else{
                            dataList.push({
                                content:column.formuleName,//公式名称
                                value:column.id,//公式id
                            });
                        }
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


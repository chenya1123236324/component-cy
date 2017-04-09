/**
 * Created by chenya on 2017/3/28.
 */
//约束
define(function () {
    //参数:
    //1、constraintIdList   约束ID集合
    //2、constraintId        约束ID
    //3、callback    回调函数
    return function (model,constraintIdList,constraintId,callback) {
        var This=model;
        var moduleListModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'queryFieldConstraintSet'
            }).receive(function (res) {
                var moduleList={
                    name:'selectColConstraint',
                    // search:true,
                    //multiple:true,
                    style:{
                    },
                    events:{
                        change:function () {
                        },
                    },
                    dataList:[{
                        content:'--请选择--',
                        value:'-1',
                        //selected:true
                    }]
                };
                res.data.forEach(function (column) {

                    if(constraintId==column.id){
                        //选择模块
                        moduleList.dataList.push({
                            content:column.constraintName,//约束名称
                            value:column.id,//约束id
                            selected:true
                        });
                    }else{
                        moduleList.dataList.push({
                            content:column.constraintName,//约束名称
                            value:column.id,//约束id
                        })
                    }

                });
                typeof callback === 'function' && callback(moduleList);
            }.bind(this)).send({
                constraintIdList:constraintIdList,
            });
        });
        return moduleListModel;
    }
});
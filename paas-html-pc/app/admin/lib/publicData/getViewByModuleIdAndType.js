/**
 * Created by chenya on 2017/3/6.
 */

//根据模块id和操作类型查找关联视图
define(function () {
      //参数:
     //1、moduleId      模块id
     //2、operationType  操作类型
    // 3、callback    回调函数
    return function (model,moduleId,operationType,callback) {
        var This=model;
        var associationViewModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'relatedPages'
            }).receive(function (res) {
                var roleIdsList={
                    name:'viewId',
                    // search:true,
                    multiple:true,
                    style:{
                    },
                    events:{
                        change:function () {
                        },
                    },
                    dataList:[
                        {
                            content:'--请选择--',
                            value:'-1'
                        }
                    ]
                };
                res.data.forEach(function (column) {
                    if(moduleId==column.id){  //后期编辑的时候修改
                        roleIdsList.dataList.push({
                            content:column.viewName,//视图名称
                            value:column.id,//视图id
                            selected:true
                        });
                    }else{
                        roleIdsList.dataList.push({
                            content:column.viewName,//视图名称
                            value:column.id,//视图id
                        });
                    }
                });
                typeof callback === 'function' && callback(roleIdsList);
            }.bind(this)).send({
                "moduleId": moduleId,
                "operationType": operationType
            });
        });
        return associationViewModel;
    }
});
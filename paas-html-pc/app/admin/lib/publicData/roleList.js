/**
 * Created by chenya on 2017/2/14.
 */
//查询角色集合
define(function () {
    //参数:
    //1、roleIds       角色id
    // 2、callback    回调函数
    return function (model,roleIds,callback) {
        var This=model;
        var roleIdsListModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'queryCharacterSet'
            }).receive(function (res) {
                var roleIdsList={
                    name:'roleIds',
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
                    if(roleIds==column.id){
                        roleIdsList.dataList.push({
                            content:column.roleName,//角色名称
                            value:column.id,//角色id
                            selected:true
                        })
                    }else{
                        roleIdsList.dataList.push({
                            content:column.roleName,//角色名称
                            value:column.id,//角色id
                            //selected:true
                        })
                    }

                });
                typeof callback === 'function' && callback(roleIdsList);
            }.bind(this)).send({});
        });
        return roleIdsListModel;
    }
});
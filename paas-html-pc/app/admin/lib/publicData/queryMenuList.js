/**
 * Created by chenya on 2016/12/28.
 */

//选择一级菜单下拉框
define(function () {
    //参数:
     //1、 parentId    选择一级菜单
    // 2、callback    回调函数
    return function (model,parentId,callback) {
        var This=model;
        var menuListModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'queryMenuList'
            }).receive(function (res) {
                var moduleList={
                    name:'parentId',
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
                    }]
                };
                res.data.forEach(function (column) {
                    if(parentId==column.id){
                        moduleList.dataList.push({
                            content:column.menuName,//菜单名称
                            value:column.id,//菜单id
                            selected:true
                        });
                    }else{
                        moduleList.dataList.push({
                            content:column.menuName,//菜单名称
                            value:column.id,//菜单id
                        });
                    }
                });
                typeof callback === 'function' && callback(moduleList);
            }.bind(this)).send({
                "parentId": 0,
                "sourceType": 0,
                "menuIdList": null,
                "searchVal": null
            });
        });
        return menuListModel;
    }
});



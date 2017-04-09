/**
 * Created by chenya on 2017/1/4.
 */
//关联页面下拉框
define(function () {
    //参数:
    // 1、moduleId          模块Id
    // 2、operationType    操作类型
    // 3、viewId          关联页面
    // 4、callback       回调函数
    return function (moduleId,viewTypes,viewId,callback) {
        var relatedPagesModel = $FRAME.$model(function () {
            //选择模块
            this.server({
                serverType:'api',
                method:'POST',
                url:'queryViewSet'
            }).receive(function (res) {
                var moduleList={
                    name:'viewId',
                    //search:true,
                    multiple:true,
                    style:{
                    },
                    events:{
                        change:function () {
                        },
                    },
                    dataList:[ {
                        content:'--请选择--',
                        value:'-1',
                    }]
                };
                res.data.forEach(function (column) {
                    viewId.forEach(function(val, index) {
                        if(val==column.id){
                            moduleList.dataList.push({
                                content:column.viewName,//视图名称
                                value:column.id,//视图id
                                selected:true
                            });
                        }else{
                            moduleList.dataList.push({
                                content:column.viewName,//视图名称
                                value:column.id,//视图id
                            });
                        }
                    });
                });
                typeof callback === 'function' && callback(moduleList);
            }.bind(this)).send({
                "moduleId": moduleId,
                "viewFlag":0,
                "viewTypes": viewTypes
            });
        });
        return relatedPagesModel;
    }
});
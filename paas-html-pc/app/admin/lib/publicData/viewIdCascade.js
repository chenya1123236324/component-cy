/**
 * Created by chenya on 2017/3/22.
 */
//选择视图下拉框
define(function () {
    //参数:
    //1、moduleId       模块ID
    //2、viewId        视图ID
    //3、callback    回调函数
    return function (model,moduleId,viewId,callback) {
        var This=model;
        var viewListModel = $FRAME.$model(function () {
            //选择视图
            var $moduleListServer = this.server({
                serverType:'api',
                method:'POST',
                url:'queryViewSet'
            }).receive(function (res) {
                var viewIdList={
                    name:'viewId',
                    // search:true,
                    //multiple:true,
                    style:{
                    },
                    events:{
                        change:function () {
                            //选择标题字段
                            var viewId=this.value; //视图id
                        },
                    },
                    dataList:[{
                        content:'--请选择--',
                        value:'-1',
                        //selected:true
                    }]
                };
                res.data.forEach(function (column) {
                    if(viewId==column.id){
                        viewIdList.dataList.push({
                            content:column.viewName,//视图名称
                            value:column.id,//视图id
                            selected:true
                        });
                    }else{
                        viewIdList.dataList.push({
                            content:column.viewName,//视图名称
                            value:column.id,//视图id
                        });
                    }
                });
                typeof callback === 'function' && callback(viewIdList);
            }.bind(this)).send({
                moduleId:moduleId,
            });

        });
        return viewListModel;
    }
});
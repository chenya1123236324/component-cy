/**
 * Created by chenya on 2016/12/26.
 */
//首页标签选择模块、视图级联
define(function () {
    //参数:
    // 1、callback    回调函数
    return function (model,callback) {
        var This=model;
        var moduleListModel = $FRAME.$model(function () {
             //选择模块
            var $moduleListServer = this.server({
                    serverType:'api',
                    method:'POST',
                    url:'moduleList'
            }).receive(function (res) {
                    var moduleList={
                        name:'moduleId',
                        // search:true,
                        //multiple:true,
                        style:{
                            width:'100%',
                        },
                        events:{
                            change:function () {
                                var moduleId=this.value;//模块id
                                //选择视图
                                moduleListModel.method('selectViewId',moduleId,function (viewIdList) {
                                    console.log(res,"====moduleId===");
                                    This.$model.list[3].config.scope.selectViewId="";
                                    This.$model.list[3].config.scope.selectViewId=viewIdList;
                                });

                            },
                        },
                        dataList:[{
                            content:'--请选择--',
                            value:'-1',
                            selected:true
                        }]
                    };
                    res.data.forEach(function (column) {
                        moduleList.dataList.push({
                            content:column.moduleName,//模块名称
                            value:column.id,//模块id
                        })
                    });
                    typeof callback === 'function' && callback(moduleList);
                }.bind(this)).send({});

            //选择视图
            this.method('selectViewId',function (id,callback) {
                this.server({
                    serverType:'api',
                    method:'POST',
                    url:'queryViewSet'
                }).receive(function (res) {
                    var viewIdList={
                        name:'viewId',
                        // search:true,
                        //multiple:true,
                        style:{
                            width:'100%',
                        },
                        events:{
                            change:function () {
                                //选择标题字段
                                var viewId=this.value; //视图id
                                moduleListModel.method('selectTitleColId',viewId,function (titleColId) {
                                    console.log(titleColId,"====selectTitleColId===");
                                    This.$model.list[4].config.scope.selectTitleColId="";
                                    This.$model.list[4].config.scope.selectTitleColId=titleColId;
                                });
                            },
                        },
                        dataList:[{
                            content:'--请选择--',
                            value:'-1',
                            selected:true
                        }]
                    };
                    res.data.forEach(function (column) {
                        viewIdList.dataList.push({
                            content:column.viewName,//视图名称
                            value:column.id,//视图id
                        })
                    });
                    typeof callback === 'function' && callback(viewIdList);
                }.bind(this)).send({
                    moduleId:id,
                });
            }.bind(this));

            //选择标题字段
            this.method('selectTitleColId',function (id,callback) {
                this.server({
                    serverType:'api',
                    method:'POST',
                    url:'viewContainsFields'
                }).receive(function (res) {
                    var TitleColIdList={
                        name:'viewId',
                        // search:true,
                        //multiple:true,
                        style:{
                            width:'100%',
                        },
                        events:{
                            change:function () {
                                //var viewId=this.value; //视图id
                                //moduleListModel.method('selectTitleColId',viewId,function (titleColId) {
                                //    console.log(titleColId,"====selectTitleColId===");
                                //    This.$model.list[5].config.scope.selectTitleColId="";
                                //    //This.$model.list[5].config.scope.selectTitleColId=titleColId;
                                //});
                            },
                        },
                        dataList:[{
                            content:'--请选择--',
                            value:'-1',
                            selected:true
                        }]
                    };
                    res.data.forEach(function (column) {
                        viewIdList.dataList.push({
                            content:column.columnName,//标题字段名称
                            value:column.id,//标题字段id
                        })
                    });
                    typeof callback === 'function' && callback(TitleColIdList);
                }.bind(this)).send({
                    viewId:id,
                });
            }.bind(this));
        });
        return moduleListModel;
    }
});
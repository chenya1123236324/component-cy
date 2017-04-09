/**
 * Created by 贝贝 on 2017/1/3.
 */
//视图条件 影响字段、字段级联
define(function () {
    /*参数
    1.callback   回调函数
     */
    return function (model,ids,callback) {
        var This = model;
        var viewConditAddListModel = $FRAME.$model(function () {
            //选择影响字段
            var affectColumnServer = this.server({
                serverType:'api',
                method:'POST',
                url:'columnFilterAffectColumns'//选择字段筛选时,要请求的影响字段接口
            }).receive(function (res) {
                //------拼接影响字段model------
                var affectColumnsModel = {
                    name:'affectColumns',
                    // search:true,
                    multiple:false,
                    style:{
                        width:'100%',
                    },
                    events:{
                      change:function () {
                          var affectsId = this.value;//选中的影响字段id
                          console.log('字段id',this.value);
                          //改变--字段
                          viewConditAddListModel.method('customVal',affectsId,function (customValModel) {
                              customValModel.dataList[0].selected = true;
                              // This.$model.list[5].config.scope.batchCondition.list[0].config.scope.sourceColumnIdModel=" ";
                              This.$model.list[5].config.scope.batchCondition.list[0].config.scope.sourceColumnIdModel.name=customValModel.name;
                              This.$model.list[5].config.scope.batchCondition.list[0].config.scope.sourceColumnIdModel.dataList=customValModel.dataList;
                          });
                      }
                    },
                    dataList:[]

                };
                res.data.forEach(function (column) {
                    affectColumnsModel.dataList.push({
                        content:column.columnName,//影响字段名称
                        value:column.id//影响字段id,
                    })
                });
                this.$model = affectColumnsModel;
                //将请求到的影响字段的model返回
                typeof callback ==='function' && callback(viewConditAddListModel);
            }.bind(this)).send({
                'viewId':ids.ID
            });

            //字段
            this.method('customVal',function (affectsId,callback) {
                console.log('affectsId',affectsId);
                var columnsServer = this.server({
                    serverType:'api',
                    method:'POST',
                    url:'columnFilterCustomVal'//选择字段筛选时,字段 数据的接口
                }).receive(function (res) {
                    console.log('res',res);
                    //------拼接字段model------
                    var customValModel = {
                        name:'customVal',
                        // search:true,
                        multiple:false,
                        style:{
                            width:'100%',
                        },
                        events:{
                            change:function () {

                            }
                        },
                        dataList:[]
                    }
                    Object.keys(res.data).forEach(function (column) {
                        customValModel.dataList.push({
                            content:column,//字段名称
                            value:res.data[column]//字段value
                        })
                    })
                    console.log('ziduan',customValModel);
                    /*res.data.forEach(function (column) {
                        customValModel.dataList.push({
                            content:column.columnName,//字段名称
                            value:column.id,//字段id
                        })
                    });*/
                    //将请求到的影响字段的model返回
                    typeof callback ==='function' && callback(customValModel);
                }.bind(this)).send({
                    "columnId":affectsId
                })
            });
        })
    }
})
/**
 * Created by 贝贝 on 2017/1/4.
 */
//视图条件 条件值(选择字段筛选时,条件值变为单选下拉框,请求接口)
define(function () {
    /*参数:
    1.ids:  模块id--ids.PID;  视图id--ids.ID
    2.callback: 回调函数
     */
    return function (model,sourceColumnModel,callback) {
        var This = model;
        var viewConditAddListModel = $FRAME.$model(function () {
                //条件值的config
                var conditionValueConfig = {
                    template:'<select config="conditionValueModel"  name="conditionValue"></select>',
                    scope:{
                        conditionValueModel:{
                            name:'conditionValue',
                            // search:true,
                            multiple:false,
                            style:{
                                width:'100%',
                            },
                            dataList:sourceColumnModel.dataList
                        }
                    }
                }

                //将请求到的条件值的config返回
                typeof callback ==='function' && callback(conditionValueConfig);
        })
    }
})
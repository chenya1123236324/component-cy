/**
 * Created by chenya on 2017/1/17.
 */
//选择分组
define(function () {
    //参数:
    // 1、menuGroup    菜单分组ID
    // 2、callback    回调函数
    return function (model,menuGroup, callback) {
        var This = model;
        var dictionaryListModel = $FRAME.$model(function () {
            //选择模块
            var $moduleListServer = this.server({
                serverType: 'api',
                method: 'POST',
                url: 'dictionaryList'
            }).receive(function (res) {
                var moduleList = {
                    name: 'menuGroup',
                    // search:true,
                    //multiple:true,
                    style: {
                    },
                    events: {
                        change: function () {
                        },
                    },
                    dataList: [{
                        content: '--请选择--',
                        value: '-1',
                        //selected: true
                    }]
                };
                res.data.forEach(function (column) {
                    //这里需要判断当 dictCode: "group"，是分组的时候才push
                   if(column.dictCode=="group"){
                       if(menuGroup==column.id){
                           moduleList.dataList.push({
                               content: column.dictName,//字典名称
                               value: column.id,//字典id
                               selected:true
                           })
                       }else{
                           moduleList.dataList.push({
                               content: column.dictName,//字典名称
                               value: column.id,//字典id
                           })
                       }
                   }
                });
                typeof callback === 'function' && callback(moduleList);
            }.bind(this)).send({});
        });
        return dictionaryListModel;
    }
});
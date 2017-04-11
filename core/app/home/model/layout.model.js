/**
 * Created by xiyuan on 16-12-28.
 */
model('base',['$:@lib/layout/base/appNavConf','$:@lib/layout/base/menuList'],function (appNavConf,menuList) {

    this.$model={
        menuList:menuList,
        appNavConf:appNavConf,

    };

    setTimeout(function () {
        this.$model.location={
            name:'销售管理',
                list:[
                {
                    name:'会员合同'
                },
                {
                    name:'汇款信息',
                    select:true,
                },
                {
                    name:'销售列表'
                }
            ]
        }
    // }.bind(this),3000)
    }.bind(this),0)
});
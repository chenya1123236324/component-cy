/**
 * Created by xiyuan on 16-12-28.
 */
model('base',['$:@lib/layout/base/appNavConf','$:@lib/layout/base/menuList'],function (appNavConf,menuList) {

    this.$model={
        menuList:menuList,
        appNavConf:appNavConf
    };

});
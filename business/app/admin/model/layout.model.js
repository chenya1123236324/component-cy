/**
 * Created by xiyuan on 16-12-28.
 */
model('base',['$:@lib/layout/base/homeMenu','COMPONENT@menu:page-back-menu','@publicData/homeMenu:homeMenu'],function ($homeMenu,pageBackMenu,homeMenu) {

    $homeMenu(pageBackMenu,homeMenu).readData(function (res) {
        this.$model={
            pageBackMenu:res.pageBackMenu,
            homeMenu:res.homeMenu
        };
    }.bind(this))

});
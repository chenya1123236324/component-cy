/**
 * Created by 贝贝 on 2016/11/29.
 */
controller('layout',function () {
    //头部菜单
    var homeMenuModel = this.model('@publicData/homeMenu:homeMenu');
    this.assign('homeMenu',homeMenuModel);

    //左侧菜单
    var pageBackMenuModel = this.model('COMPONENT@menu:page-back-menu');
    this.assign('pageBackMenu',pageBackMenuModel);

    this.display();
})
/**
 * Created by chenya on 2016/11/3.
 */
//首页菜单组件
controller('home-menu',function () {
    var homeMenu = this.model('@homeMenu:homeMenu');
    this.assign('homeMenu',homeMenu);
    this.display();
});
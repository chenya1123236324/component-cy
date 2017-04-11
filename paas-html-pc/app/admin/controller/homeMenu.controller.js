// 首页菜单组件
controller('homeMenu',function () {
  this.title('首页菜单组件');
    var homeMenu = this.model('@homeMenu:homeMenu');
    this.assign('homeMenu',homeMenu);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});

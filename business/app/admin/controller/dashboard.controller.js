//dashboard组件
controller('dashboard',function () {
    this.title('dashboard组件');
    var dashboard = this.model('@dashboard:dashboard');
    this.assign('dashboard',dashboard);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();

})
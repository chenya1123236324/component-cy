//按钮组件
controller('button', function () {
    this.title('按钮组件');
    var btnGroupMe = this.model('@button:btnGroupMe');
    this.assign('btnGroupMe',btnGroupMe);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});

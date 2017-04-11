//选项卡组件
controller('tab',function () {
    this.title('选项卡组件');
    var tab = this.model('@tab:tab');
    this.assign('tab',tab);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();

})
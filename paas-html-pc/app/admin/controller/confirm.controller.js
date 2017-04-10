//confirm组件
controller('confirm',function () {
    this.title('confirm组件');
    var confirm = this.model('@confirm:confirm');
    this.assign('confirm',confirm);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();

})
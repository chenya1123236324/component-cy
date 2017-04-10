//dialog组件
controller('dialog',function () {
    this.title('dialog组件');
    var dialog = this.model('@dialog:dialog');
    this.assign('dialog',dialog);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();

})
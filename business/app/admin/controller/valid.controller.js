controller('valid',function () {
    this.title("表单校验组件");
    this.assign('valid',this.model('@valid:valid'));
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});
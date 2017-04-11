controller('person',function () {
    this.title("人员选择组件");
    this.assign('person',this.model('@person:person'));
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});

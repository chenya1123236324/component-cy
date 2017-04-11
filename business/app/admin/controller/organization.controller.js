controller('organization',function () {
    this.title("组织名称组件");
    this.assign('organization',this.model('@organization:organization'));
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});
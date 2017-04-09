//高级检索组件
controller('advancedQuery', function () {
    this.title('高级检索组件');
    var advancedQuery = this.model('@advancedQuery:advancedQuery');
    this.assign('advancedQuery',advancedQuery);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});




/**
 * Created by 贝贝 on 2016/12/23.
 */
//角色权限
controller('list',function () {
    this.title('高级检索组件');
    //高级搜索
    var advancedQuery = this.model('@rolePermission:advancedQuery');
    this.assign('advancedQuery',advancedQuery);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});




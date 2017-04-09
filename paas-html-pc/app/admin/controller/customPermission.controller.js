/**
 * Created by 贝贝 on 2016/12/24.
 */
//自定义权限
controller('list',function () {
//===============================================================================
    this.title('自定义权限');

//=================================================================================

    // 头部模块模糊查询
    var fuzzyQueryModel = this.model('COMPONENT@fuzzyQuery:fuzzyQuery');
    // this.assign('fuzzyQueryData',fuzzyQueryModel);

    //新增按钮receive的数据
    var commConf=this.model();
    this.assign('commConf',commConf);

    //grid组件API(提供一个空的model ,可以往里面写数据)
    var gridApi=this.model();
    this.assign('gridApi',gridApi);

    //新增按钮
    var btnGroupMeModel = this.model('@customPermission:permissionAddBtn');
    btnGroupMeModel.method('getGridApi',gridApi);
    this.assign('btnGroupMe',btnGroupMeModel);

    //列表grid组件
    var gridConfModel = this.model('@customPermission:customPermissionList');
    gridConfModel.method('getApi',gridApi);
    this.assign('gridConf',gridConfModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});
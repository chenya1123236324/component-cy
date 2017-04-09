/**
 * Created by 贝贝 on 2016/12/24.
 */
//通知公告
controller('list',function () {
//===============================================================================
    this.title('通知公告');
//=================================================================================

    //grid的API
    var gridApi = this.model();
    this.assign('gridApi',gridApi);

    // 头部模块模糊查询
    var fuzzyQueryModel = this.model('COMPONENT@fuzzyQuery:fuzzyQuery');
    // this.assign('fuzzyQueryData',fuzzyQueryModel);

    //搜索
    var searchListModel = this.model('@notify:searchFormLayout');
    searchListModel.method('getGridApi',gridApi);
    this.assign('search',searchListModel);


    //新增按钮
    var btnGroupMeModel = this.model('@notify:notifyAddBtn');
    btnGroupMeModel.method('getGridApi',gridApi);
    this.assign('btnGroupMe',btnGroupMeModel);

    //列表grid组件
    var gridConfModel = this.model('@notify:notifyList');
    gridConfModel.method('getApi',gridApi);
    this.assign('gridConf',gridConfModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});
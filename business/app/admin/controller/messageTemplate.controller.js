/**
 * Created by 贝贝 on 2017/1/9.
 */
//消息模板页面

controller('list',function () {
//===============================================================================
    this.title('消息模板');
//=================================================================================

    var gridApi = this.model();
    this.assign('gridApi',gridApi);

    // 头部模块模糊查询
    var fuzzyQueryModel = this.model('COMPONENT@fuzzyQuery:fuzzyQuery');
    // this.assign('fuzzyQueryData',fuzzyQueryModel);

    //新增按钮
    var btnGroupMeModel = this.model('@messageTemplate:messageAddBtn');
    btnGroupMeModel.method('getGridApi',gridApi);
    this.assign('btnGroupMe',btnGroupMeModel);

    //列表grid组件
    var gridConfModel = this.model('@messageTemplate:messageList');
    gridConfModel.method('getApi',gridApi);
    this.assign('gridConf',gridConfModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});
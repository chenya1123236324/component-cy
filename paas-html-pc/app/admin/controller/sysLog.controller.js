/**
 * Created by 贝贝 on 2017/1/13.
 */
// 系统日志

//1.后台配置日志
controller('moduleConfOperationLog',function () {
    //===============================================================================
    this.title('系统日志-后台配置');
//=================================================================================

    //grid的API
    var gridApi = this.model();
    this.assign('gridApi',gridApi);

    //日志列表grid
    var gridModel = this.model('@sysLog:moduleConfigLogGrid');
    gridModel.method('getGrid','');
    this.assign('gridConf',gridModel);

    // 头部模块模糊查询
    var fuzzyQueryModel = this.model('@sysLog:moduleConfigFuzzyQuery');
    fuzzyQueryModel.method('search',gridModel,gridApi);
    this.assign('fuzzyQueryData',fuzzyQueryModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});

//2.前端操作日志
controller('moduleDataLog',function () {

    this.title('系统日志-前端操作');

    //grid的API
    var gridApi = this.model();
    this.assign('gridApi',gridApi);

    //日志列表grid
    var gridModel = this.model('@sysLog:moduleOperatLogGrid');
    gridModel.method('getGrid','');
    this.assign('gridConf',gridModel);

    // 头部模块模糊查询
    var fuzzyQueryModel = this.model('@sysLog:moduleOperatFuzzyQuery');
    fuzzyQueryModel.method('search',gridModel,gridApi);
    this.assign('fuzzyQueryData',fuzzyQueryModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});
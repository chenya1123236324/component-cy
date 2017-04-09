/**
 * Created by 贝贝 on 2016/11/30.
 */
// 模块信息
controller('list',function () {
//===============================================================================
    this.title('模块信息');
//=================================================================================

    //新增按钮的receive的数据
    var commConf = this.model();
    this.assign('commConf',commConf);

    //grid组件API
    var gridApi = this.model();
    this.assign('gridApi',gridApi);

    //新增模块按钮
    var btnGroupMeModel = this.model('@module:moduleAddBtn');
    btnGroupMeModel.method('getGridApi',gridApi);
    this.assign('btnGroupMe',btnGroupMeModel);

    //模块列表grid
    var gridConfModel = this.model('@module:moduleList');
    gridConfModel.method('getApi',gridApi);
    gridConfModel.method('getGrid',"");
    this.assign('gridConf',gridConfModel);

    // 头部模块模糊查询
    var fuzzyQueryModel = this.model('@module:fuzzyQuery');
    fuzzyQueryModel.method('search',gridConfModel,gridApi);
    this.assign('fuzzyQueryData',fuzzyQueryModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});

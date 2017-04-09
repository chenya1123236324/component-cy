/**
 * Created by 贝贝 on 2016/12/1.
 */
//视图条件配置
controller('operationConditions',function () {
//==================================================================================
    this.title('操作条件配置');
//===================================================================================


    //新增按钮receive的数据
    var commConf=this.model();
    this.assign('commConf',commConf);

    //grid组件API(提供一个空的model ,可以往里面写数据)
    var gridApi=this.model();
    this.assign('gridApi',gridApi);


    //grid组件
    var gridConfModel = this.model('@operationConditions:operatConditionsList');
    gridConfModel.method('getApi',gridApi);
    this.assign('gridConf',gridConfModel);

    //组织架构树
    var treeDataModel = this.model('@operationConditions:treeConf');
    treeDataModel.method('getTreeList',gridConfModel,gridApi,commConf);
    this.assign('treeConf',treeDataModel);

    //过滤器(查询tree)
    this.filter('searchFilter',function (searchValue,treeSearch) {
        return function () {
            treeSearch(searchValue);
        }
    });

    // 头部
    var fuzzyQueryModel = this.model('COMPONENT@fuzzyQuery:fuzzyQuery');
    // this.assign('fuzzyQueryData',fuzzyQueryModel);

    //按钮
    var btnGroupMeModel = this.model('@operationConditions:operatConditionsBtnGroup');
    btnGroupMeModel.method('getGridApi',gridApi);
    this.assign('btnGroupMe',btnGroupMeModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
})
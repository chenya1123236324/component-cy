/**
 * Created by 贝贝 on 2016/12/1.
 */
//1.系统字典
controller('sysDictionary',function () {
//========================================================================
    this.title('系统字典');
//=======================================================================


    //新增按钮receive的数据
    var commConf=this.model();
    this.assign('commConf',commConf);

    //grid组件API(提供一个空的model ,可以往里面写数据)
    var gridApi=this.model();
    this.assign('gridApi',gridApi);


    //grid组件
    var gridConfModel = this.model('@sysConfig:childDictList');
    gridConfModel.method('getApi',gridApi);
    this.assign('gridConf',gridConfModel);

    //字典类别列表
    var dicListModel = this.model('@sysConfig:dictionaryList');
    dicListModel.method('getDictList',gridConfModel,gridApi,commConf);
    this.assign('dicListModel',dicListModel);

    //过滤器(查询单层菜单)
    this.filter('searchFilter',function (searchValue,singMenuSearch) {
        return function () {
            singMenuSearch(searchValue);
        }
    });

    //列表里的新增,修改和删除按钮
    var addDicType = this.model('@sysConfig:typeBtn');
    addDicType.method('typeBtnEvent',dicListModel);
    this.assign('bussinessEvent',addDicType);

    // 模糊查询
    var fuzzyQueryModel = this.model('COMPONENT@fuzzyQuery:fuzzyQuery');
    // this.assign('fuzzyQueryData',fuzzyQueryModel);

    //新增按钮
    var btnGroupMeModel = this.model('@sysConfig:dicBtnGroup');
    btnGroupMeModel.method('getGridApi',gridApi);
    this.assign('btnGroupMe',btnGroupMeModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
})
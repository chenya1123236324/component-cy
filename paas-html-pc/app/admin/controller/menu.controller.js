/**
 * Created by chenya on 2016/11/30.
 */
//菜单管理
controller('menu',function () {
    this.title('菜单管理');

    //0、grid组件API(提供一个空的model ,可以往里面写数据)
    var gridApi = this.model();
    this.assign('gridApi', gridApi);

    //1、新增按钮receive的数据
    var commConf=this.model();
    this.assign('commConf',commConf);

    //2、新增菜单按钮
    var addMenuBtn = this.model('@menu:addMenuBtn');
    addMenuBtn.method('getGridApi', gridApi);
    this.assign('addMenuBtn',addMenuBtn);

    //3、菜单管理Grid
    var menuGrid = this.model('@menu:menuGrid');
    menuGrid.method('getGridApi', gridApi);
    menuGrid.method('getMenuGrid', "");
    this.assign('menuGrid',menuGrid);

    //4、组织架构树
    var treeDataModel = this.model('@menu:treeConf');
    treeDataModel.method('getMenuGridList',menuGrid,gridApi,commConf);
    treeDataModel.method('getGridApi', gridApi);
    this.assign('treeData',treeDataModel);
    //5、头部导航与左侧菜单
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
})






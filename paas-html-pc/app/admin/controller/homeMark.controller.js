/**
 * Created by chenya on 2016/12/13.
 */
//1.首页标签
controller('homeMark',function () {
    this.title('首页标签');
    //0、grid组件API(提供一个空的model ,可以往里面写数据)
    var gridApi = this.model();
    this.assign('gridApi', gridApi);

    //1、新增标签按钮
    var addLabelBtn = this.model('@homeMark:addLabelBtn');
    addLabelBtn.method('getGridApi', gridApi);
    this.assign('addLabelBtn',addLabelBtn);

    //2、首页标签Grid
    var homeMarkGrid = this.model('@homeMark:homeMarkGrid');
    homeMarkGrid.method('getGridApi', gridApi);
    this.assign('homeMarkGrid',homeMarkGrid);

    //3、头部导航与左侧菜单
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();

})
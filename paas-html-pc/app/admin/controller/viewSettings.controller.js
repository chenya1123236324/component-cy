/**
 * Created by chenya on 2017/1/22.
 */
//移动端视图、操作
controller('viewSettings',function () {
    this.title('移动端视图设置');

    //1、视图API
    var moduleConfigViewApi = this.model();
    this.assign('moduleConfigViewApi', moduleConfigViewApi);

    //2、操作API
    var moduleConfigOperationApi = this.model();
    this.assign('moduleConfigOperationApi', moduleConfigOperationApi);


    //3、顶部tab导航栏(字段-视图-操作)
    var viewSettingsTab = this.model('@viewSettings/viewSettingsView:viewSettings-tab');
    this.assign('viewSettingsTab',viewSettingsTab);


    //7.1、视图-新增按钮
    var viewSettingsViewBtn = this.model('@viewSettings/viewSettingsView:viewSettingsViewBtn');
    viewSettingsViewBtn.method('getViewApi', moduleConfigViewApi);
    this.assign('viewSettingsViewBtn',viewSettingsViewBtn);


    //7.3、视图-grid组件
    var viewSettingsView = this.model('@viewSettings/viewSettingsView:viewSettingsView');
    viewSettingsView.method('getViewApi', moduleConfigViewApi);
    viewSettingsView.method('moduleConfigView', 173);
    this.assign('viewSettingsView',viewSettingsView);

    //7.2、视图-模糊查询组件
    var viewSettingsViewQuery = this.model('@viewSettings/viewSettingsView:viewSettingsViewQuery');
    viewSettingsViewQuery.method('getViewQueryGrid',viewSettingsView,moduleConfigViewApi);
    this.assign('viewSettingsViewQuery',viewSettingsViewQuery);


    //8.1、操作-新增按钮
    var viewSettingsOperationBtn = this.model('@viewSettings/viewSettingsOperation:viewSettingsOperationBtn');
    viewSettingsOperationBtn.method('getOperationApi', moduleConfigOperationApi);
    this.assign('viewSettingsOperationBtn',viewSettingsOperationBtn);


    //8.3、操作-grid组件
    var viewSettingsOperation = this.model('@viewSettings/viewSettingsOperation:viewSettingsOperation');
    viewSettingsOperation.method('getOperationApi', moduleConfigOperationApi);
    viewSettingsOperation.method('moduleConfigOperation', 173);
    this.assign('viewSettingsOperation',viewSettingsOperation);

    //8.2、操作-模糊查询组件
    var viewSettingsOperationQuery = this.model('@viewSettings/viewSettingsOperation:viewSettingsOperationQuery');
    viewSettingsOperationQuery.method('getOperationQueryGrid',viewSettingsOperation,moduleConfigOperationApi);
    this.assign('viewSettingsOperationQuery',viewSettingsOperationQuery);


    //3、选择模块-下拉框
    var viewSettingsSelect=this.model('@viewSettings/viewSettingsView:viewSettings-select');
    viewSettingsSelect.method('getSelectList',viewSettingsView,moduleConfigViewApi,viewSettingsOperation,moduleConfigOperationApi);
    viewSettingsSelect.method('getViewApi', moduleConfigViewApi);
    //viewSettingsSelect.method('getOperationApi', moduleConfigOperationApi);
    this.assign('viewSettingsSelect',viewSettingsSelect);

   //4、头部导航与左侧菜单
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});
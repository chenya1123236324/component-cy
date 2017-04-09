

//1、菜单管理--列表
controller('list',function () {
    this.title('模块配置管理');

    //0、字段API
    var gridApi = this.model();
    this.assign('gridApi', gridApi);

     //2、视图API
    var moduleConfigViewApi = this.model();
    this.assign('moduleConfigViewApi', moduleConfigViewApi);

    //3、操作API
    var moduleConfigOperationApi = this.model();
    this.assign('moduleConfigOperationApi', moduleConfigOperationApi);

    //6、顶部tab导航栏(字段-视图-操作)
    var moduleConfigTab = this.model('@moduleConfig/moduleConfigField:moduleConfig-tab');
    this.assign('moduleConfigTab',moduleConfigTab);

    //7.1、字段-新增按钮
    var moduleConfigFieldBtn = this.model('@moduleConfig/moduleConfigField:moduleConfigFieldBtn');
    moduleConfigFieldBtn.method('getGridApi', gridApi);
    this.assign('moduleConfigFieldBtn',moduleConfigFieldBtn);

    //字段formLayout
    var moduleConfigFieldLayoutAdd = this.model('@moduleConfig/moduleConfigField:moduleConfigFieldLayoutAdd');
    //字段类别列表
    var singleMenuData = this.model('@moduleConfig/moduleConfigField:singleMenuData');
    singleMenuData.method('getColumnTypeList',moduleConfigFieldLayoutAdd);


    //6.3、字段-grid组件
    var moduleConfigField = this.model('@moduleConfig/moduleConfigField:moduleConfigField');
    moduleConfigField.method('getGridApi', gridApi);
    var moduleId = $_GET['moduleId'];
    moduleConfigField.method('moduleConfigField', moduleId?moduleId:173);

    this.assign('moduleConfigField',moduleConfigField);


    //6.2、字段-模糊查询组件
    var moduleConfigFieldQuery = this.model('@moduleConfig/moduleConfigField:moduleConfigFieldQuery');
    moduleConfigFieldQuery.method('getFieldQueryGrid',moduleConfigField,gridApi);
    this.assign('moduleConfigFieldQuery',moduleConfigFieldQuery);



    //7.1、视图-新增按钮
    var moduleConfigViewBtn = this.model('@moduleConfig/moduleConfigView:moduleConfigViewBtn');
    moduleConfigViewBtn.method('getViewApi', moduleConfigViewApi);
    this.assign('moduleConfigViewBtn',moduleConfigViewBtn);



    //7.3、视图-grid组件
    var moduleConfigView = this.model('@moduleConfig/moduleConfigView:moduleConfigView');
    moduleConfigView.method('getViewApi', moduleConfigViewApi);
    var moduleId = $_GET['moduleId'];
    moduleConfigView.method('moduleConfigView', moduleId?moduleId:173);
    this.assign('moduleConfigView',moduleConfigView);


    //7.2、视图-模糊查询组件
    var moduleConfigViewQuery = this.model('@moduleConfig/moduleConfigView:moduleConfigViewQuery');
    moduleConfigViewQuery.method('getViewQueryGrid',moduleConfigView,moduleConfigViewApi);
    this.assign('moduleConfigViewQuery',moduleConfigViewQuery);

    //8.1、操作-新增按钮
    var moduleConfigOperationBtn = this.model('@moduleConfig/moduleConfigOperation:moduleConfigOperationBtn');
    moduleConfigOperationBtn.method('getOperationApi', moduleConfigOperationApi);
    this.assign('moduleConfigOperationBtn',moduleConfigOperationBtn);

    //8.2、操作-grid组件
    var moduleConfigOperation = this.model('@moduleConfig/moduleConfigOperation:moduleConfigOperation');
    moduleConfigOperation.method('getOperationApi', moduleConfigOperationApi);
    var moduleId = $_GET['moduleId'];
    moduleConfigOperation.method('moduleConfigOperation', moduleId?moduleId:173);
    this.assign('moduleConfigOperation',moduleConfigOperation);

    //8.3、操作-模糊查询组件
    var moduleConfigOperationQuery = this.model('@moduleConfig/moduleConfigOperation:moduleConfigOperationQuery');
    moduleConfigOperationQuery.method('getOperationQueryGrid',moduleConfigOperation,moduleConfigOperationApi);
    this.assign('moduleConfigOperationQuery',moduleConfigOperationQuery);


    //3、选择模块-下拉框
    var moduleConfigSelect=this.model('@moduleConfig/moduleConfigField:moduleConfig-select');
    moduleConfigSelect.method('getSelectList',moduleConfigField,gridApi,moduleConfigView,moduleConfigViewApi,moduleConfigOperation,moduleConfigOperationApi);
    moduleConfigSelect.method('getGridApi', gridApi);
    moduleConfigSelect.method('getViewApi', moduleConfigViewApi);
    moduleConfigSelect.method('getOperationApi', moduleConfigOperationApi);
    this.assign('moduleConfigSelect',moduleConfigSelect);

    //4、头部导航与左侧菜单
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});




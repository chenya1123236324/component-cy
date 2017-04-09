/**
 * Created by chenya on 2017/1/16.
 */

//移动端菜单
controller('mobileMenu', function () {
    this.title('移动端菜单');

    //0、grid组件API(提供一个空的model ,可以往里面写数据)
    var gridApi = this.model();
    this.assign('gridApi', gridApi);

    //2、菜单管理Grid
    var mobileMenu = this.model('@mobileMenu:mobileMenu');
    mobileMenu.method('getGridApi', gridApi);
    this.assign('mobileMenuGrid', mobileMenu);

    //3、新增菜单按钮
    var addMobileMenuBtn = this.model('@mobileMenu:addMobileMenuBtn');
    addMobileMenuBtn.method('getGridApi', gridApi);
    this.assign('addMobileMenuBtn', addMobileMenuBtn);

    //4、头部导航与左侧菜单
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
})
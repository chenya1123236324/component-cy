/**
 * Created by xiyuan on 16-12-21.
 */

//自定义主界面
controller('index',function () {
   this.display();
});

//自定义列表
controller('list',function () {
    var gridConfModel=this.model('@custom/list:gridConf');

    gridConfModel.method('getConf',$_GET['viewId']);

    this.title('列表页面--['+$_GET['pageName']+']');

    this.assign('gridConf',gridConfModel);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});

//自定新增页面
controller('add',function () {
    var viewStructConf=this.model('@custom/add:viewStructConf');

    this.title('新增页面');

    this.assign('viewStructConf',viewStructConf);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();

    //表单数据结构获取
    viewStructConf.method('getConf',1132,true);
});

//自定编辑页面
controller('edit',function () {
    var viewStructConf=this.model('@custom/edit:viewStructConf');

    this.title('编辑页面');

    this.assign('viewStructConf',viewStructConf);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();

    //表单数据结构获取
    viewStructConf.method('getConf',{
        viewId: 739, recordId: 4
    },true);
});
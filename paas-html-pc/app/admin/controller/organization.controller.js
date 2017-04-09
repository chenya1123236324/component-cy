/**
 * Created by chenya on 2016/12/19.
 */

//部门用户
controller('organization',function () {
    this.title('按钮组件');
    var btnGroupMe = this.model('@organization:btnGroupMe');
    this.assign('btnGroupMe',btnGroupMe);
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});

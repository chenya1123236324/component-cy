/**
 * Created by chenya on 2017/1/12.
 */

//修改密码
controller('modifyPassword',function () {
    this.title('修改密码');
    //修改密码列表
    var modifyPassword = this.model('@modifyPassword:modifyPassword');
    this.assign('modifyPassword',modifyPassword);
    //保存按钮
    var modifyPasswordSave = this.model('@modifyPassword:modifyPasswordSave');
    this.assign('modifyPasswordSave',modifyPasswordSave);
    //导航
    this.assign('layoutBaseConf',this.model('HOME@layout:base'));
    this.layout('HOME@layout:base','tpl').display();
});
/**
 * Created by chenya on 2017/1/12.
 */
//个人信息
controller('personalInformation',function () {
    this.title('个人信息');
    //个人信息列表
    var personalInformation = this.model('@personalInformation:personalInformation');
    this.assign('personalInformation',personalInformation);
    //保存
    var personalInformationSave = this.model('@personalInformation:personalInformationSave');
    this.assign('personalInformationSave',personalInformationSave);
    //导航
    this.assign('layoutBaseConf',this.model('HOME@layout:base'));
    this.layout('HOME@layout:base','tpl').display();
});



/**
 * Created by chenya on 2016/12/12.
 */
//1.企业信息
controller('enterpriseInformation',function () {
    this.title('企业信息');

    //1、企业信息
    var enterpriseInformation = this.model('enterpriseInformation:enterpriseInformation');
    this.assign('enterpriseInformation',enterpriseInformation);
    //2、保存
    var enterpriseInformationSave = this.model('enterpriseInformation:enterpriseInformationSave');
    //将enterpriseInformation的Model数据传到enterpriseInformationSave中
    //enterpriseInformationSave.method('getInformation',enterpriseInformation);
    this.assign('enterpriseInformationSave',enterpriseInformationSave);

    //3、头部导航与左侧菜单
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();
});

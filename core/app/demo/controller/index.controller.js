/**
 * Created by xiyuan on 16-11-21.
 */
controller('index',function () {
    var pageTitle='主页面演示';

    this.title(pageTitle);
    this.assign('pageTitle',pageTitle);

    this.assign('menuList',this.model('@index:menuList'));
    // this.assign('menuList',[]);

    this.assign('add',function (menuList) {
        return function () {
            menuList.push({
                name:menuList.length+'+++++++++++'
            })
        }
    })
    this.assign('remove',function (menuList) {
        return function () {
            menuList.splice(0,1);
        }
    })

    var baseModel=this.model('@layout:base');

    /*//数据监听并改变
    baseModel.watch('appNavConf',function (appNavConf) {
        appNavConf.watch('navList',function (navList) {
            navList[8].content='列表'
        },true);
    },true);*/

    this.assign('layoutBaseConf',baseModel);
    this.layout('@layout:base','tpl').display();
});
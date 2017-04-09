/**
 * Created by chenya on 2017/2/14.
 */
//dashboardLayout组件
controller('dashboard-layout',function () {
    var dashboardLayout = this.model('@dashboardLayout:dashboardLayout');
    this.assign('dashboardLayout',dashboardLayout);
    this.display();
});

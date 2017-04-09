/**
 * Created by chenya on 2016/11/21.
 */
//dashboard组件
controller('dashboard',function () {
    var dashboard = this.model('@dashboard:dashboard');
    this.assign('dashboard',dashboard);
    this.display();
});
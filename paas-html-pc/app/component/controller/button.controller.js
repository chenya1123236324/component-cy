/**
 * Created by chenya on 2016/10/12.
 */
//button 组件
controller('button',function () {
    var btnGroupMe = this.model('@button:btnGroupMe');
    this.assign('btnGroupMe',btnGroupMe);
    this.display();
});
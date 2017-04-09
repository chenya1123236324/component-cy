/**
 * Created by chenya on 2017/2/16.
 */

//新版button 组件
controller('button-group',function () {
    var buttonGroup = this.model('@buttonGroup:buttonGroup');
    this.assign('buttonGroup',buttonGroup);
    this.display();
});

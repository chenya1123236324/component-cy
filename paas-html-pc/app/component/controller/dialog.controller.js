/**
 * Created by chenya on 2016/10/26.
 */
//dialog 组件
controller('dialog',function () {
    //得到diglog按钮数据
    var dialogButton = this.model('@dialog:dialogButton');
    this.assign('dialogButton',dialogButton);

    //得到dialog模板拼接数据
    var dialogData = this.model('@dialog:dialogData');
    this.assign('dialogData',dialogData);

    this.display();
});
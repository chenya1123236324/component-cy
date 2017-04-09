/**
 * Created by chenya on 2016/11/15.
 */
//批量新增batch-add组件
controller('batch-add',function () {
    var batchAdd = this.model('@batchAdd:batchAdd');
    this.assign('batchAdd',batchAdd);
    this.display();
});




















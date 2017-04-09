/**
 * Created by chenya on 2016/12/15.
 */
//批量查询条件组件
controller('batch-condition',function () {
    this.title("批量查询");

    //批量查询条件组件
    this.assign('batchCondition',this.model('@batchCondition:batchCondition'));

    this.display();
});
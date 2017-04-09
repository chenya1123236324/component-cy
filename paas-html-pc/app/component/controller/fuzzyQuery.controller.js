/**
 * Created by chenya on 2016/11/24.
 */
//模糊查询组件
controller('fuzzy-query',function () {
    var fuzzyQuery = this.model('@fuzzyQuery:fuzzyQuery');
    this.assign('fuzzyQuery',fuzzyQuery);
    this.display();
});
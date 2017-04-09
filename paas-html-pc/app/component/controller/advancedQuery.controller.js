/**
 * Created by chenya on 2017/1/10.
 */

//高级搜索advanced-query组件
controller('advanced-query',function () {
    //高级搜索
    var advancedQuery = this.model('@advancedQuery:advancedQuery');
    this.assign('advancedQuery',advancedQuery);

    ////高级搜索1
    //var advancedQuery1 = this.model('@advancedQuery:advancedQuery1');
    //this.assign('advancedQuery1',advancedQuery1);
    //
    ////得到高级检索中新增的标签
    //var newAddQueryTag = this.model('@advancedQuery:newAddQueryTag');
    //this.assign('newAddQueryTag',newAddQueryTag);
    ////默认标签
    //var defaultQueryTag = this.model('@advancedQuery:defaultQueryTag');
    //this.assign('defaultQueryTag',defaultQueryTag);

    this.display();
});
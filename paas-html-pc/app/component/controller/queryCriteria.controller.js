/**
 * Created by chenya on 2016/11/1.
 */

//查询条件组件
controller('query-criteria',function () {
    //得到查询条件中select下拉框中的数据【queryCriteriaSelect的名称不可改变！！！】
    var queryCriteriaSelect = this.model('@queryCriteria:queryCriteriaSelect');
    this.assign('queryCriteriaSelect',queryCriteriaSelect);
    //得到查询条件中保存、清空按钮数据【queryCriteriaSave的名称不可改变！！！】
    var queryCriteriaSave = this.model('@queryCriteria:queryCriteriaSave');
    this.assign('queryCriteriaSave',queryCriteriaSave);

    //得到查询条件中组件配置信息
    var queryCriteria = this.model('@queryCriteria:queryCriteria');
    this.assign('queryCriteria',queryCriteria);

    this.display();
});

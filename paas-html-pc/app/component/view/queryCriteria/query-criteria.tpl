<h1>查询条件组件</h1>

<div class="query-criteria">
    <div class="queryCriteria">
        <div class="queryCondition">
            <span class="queryConditionLeft">配置查询条件</span>
            <span class="queryConditionRight"></span>
        </div>

        <div class="queryForm">
            <span>标签名称:</span>
            <input type="test" class="tagName" name="tagName"/>
        </div>
        <div class="queryForm">
            <span>查询字段:</span>
            <select data="queryCriteria.queryField" name="queryField" class="queryField"  $-on:change="queryCriteria.selectChange"></select>
            <span class="tagQueryCondition">查询条件:</span>
            <select data="queryCriteria.queryCondition" name="queryCondition" class="queryCondition"  $-on:change="queryCriteria.selectChange"></select>
            <input type="test" class="searchText" name="searchText"/>
            <i $-on:click="queryCriteriaAdd" class="iconfont icon-jiahao"></i>
            <i $-on:click="queryCriteriaReduce" class="iconfont icon-jianhao"></i>
        </div>
        <div class="addQueryConditionBox" id="addQueryConditionBox"></div>
        <btn-group-me data="queryCriteriaSave"></btn-group-me>

    </div>
</div>



<!--查询条件组件-->
<!--<query-criteria data="queryCriteria"></query-criteria>-->
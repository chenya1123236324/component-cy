<!--模块信息列表-->
<div class="module-list">
    <!--模块信息头-->
    <div class="list-top module-list-top">
        <ul>
            <li>
                <div>
                    <span class="txt">通知公告</span><span class="type">通知</span>
                </div>
            </li>
            <li>
                <div>
                    <!--模糊查询-->
                    <!--<fuzzy-query data="fuzzyQueryData"></fuzzy-query>-->

                </div>
            </li>
        </ul>
    </div>
    <!--模块操作-->
    <div class="list-middle module-list-middle">
        <div>
            <!--按钮组件-->
            <btn-group-me data="btnGroupMe"></btn-group-me>
        </div>
        <div class="form-layout" $-form="searchFormSource">
            <!--<span>类别{{57}}个</span>-->

            <select config="search.notifyType"></select>
            <select config="search.searchTag"></select>

            <input type="date" name="startTime" style="height: 30px;" $-hidden="search.hiddenFlag">
            <input type="date" name="endTime" style="height: 30px;" $-hidden="search.hiddenFlag">

            <btn-group-me data="search.searchBtn" receive="searchFormSource"></btn-group-me>

        </div>
    </div>
    <!--模块信息体-->
    <div class="list-bottom module-list-bottom">
        <list-grid config="gridConf" api="gridApi"></list-grid>
    </div>
</div>
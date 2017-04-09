<!--模块信息列表-->
<div class="module-list">
    <!--模块信息头-->
    <div class="list-top module-list-top">
        <ul>
            <li>
                <div>
                    <span class="txt">模块信息</span><span class="type">自定义</span>
                </div>
            </li>
            <li>
                <div>
                    <!--模糊查询-->
                    <fuzzy-query data="fuzzyQueryData"></fuzzy-query>
                    <!--<input type="text" $-model="gridConf.sendData.keyValue" $-on:keypress="gridApi.update">-->
                </div>
            </li>
        </ul>
    </div>
    <!--模块操作-->
    <div class="list-middle module-list-middle">
        <div>
            <!--按钮组件-->
            <btn-group-me data="btnGroupMe" receive="commConf"></btn-group-me>
        </div>
        <div>
            <!--<span>类别{{57}}个</span>-->
        </div>
    </div>
    <!--模块信息体-->
    <div class="list-bottom module-list-bottom">
        <list-grid config="gridConf" api="gridApi"></list-grid>
    </div>
</div>
<div class="page-cont sys-dictionary">
    <!--左侧业务类别-->
    <div class="page-cont-left dic-left">
        <div class="dictionary-type">
            <div class="dictionary-type-top">
                <div class="dic-type-up"  tabindex="0" $-on:blur="bussinessEvent.blur">
                    <i class="iconfont icon-sousuoleibie"></i>
                    <span class="dic-type-txt">业务类型</span>
                    <span class="dic-type-btn">
                                <i class="iconfont icon-jiahao" $-on:click="bussinessEvent.add"></i>
                        <!--<i class="iconfont icon-xieyoujian" $-on:click="bussinessEvent.edit"></i>-->
                        <!--<i class="iconfont icon-shanchu" $-on:click="bussinessEvent.delete"></i>-->
                            </span>
                </div>
                <div class="dic-type-down">
                    <i class="iconfont icon-search"></i><input type="text" placeholder="请输入搜索的业务类型..." $-model="searchValue" $-on:keypress="searchValue|searchFilter:[$,singleMenuApi.search]">
                </div>
            </div>

            <!--列表-->
            <div class="dictionary-type-bottom">
                <single-menu config="dicListModel" api="singleMenuApi"></single-menu>
            </div>

        </div>
    </div>
    <!--右侧数据-->
    <div class="page-cont-right dic-right">
        <!--头-->
        <div class="list-top">
            <ul>
                <li>
                    <div>
                        <span class="txt">业务类型</span><span class="type">类型</span>
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
        <!--操作-->
        <div class="list-middle">
            <div>
                <!--按钮组件-->
                <btn-group-me data="btnGroupMe" receive="commConf"></btn-group-me>
            </div>
            <div>
                <!--<span>类别{{57}}个</span>-->
            </div>
        </div>
        <!--体-->
        <div class="list-bottom">
            <list-grid config="gridConf" api="gridApi"></list-grid>
        </div>
    </div>
</div>
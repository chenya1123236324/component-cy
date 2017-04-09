<div class="page-cont view-formula">
    <!--左侧业务类别-->
    <div class="page-cont-left viewf-left">
        <div class="dictionary-type">
            <div class="dictionary-type-top" >
                <div class="dic-type-up"  tabindex="0" $-on:blur="bussinessEvent.blur">
                    <i class="iconfont icon-sousuoleibie"></i>
                    <span class="dic-type-txt" $-on:click="singleMenuApi.update">视图公式</span>
                    <!--<span class="dic-type-btn">
                        <i class="iconfont icon-jiahao" $-on:click="bussinessEvent.add"></i>
                        <i class="iconfont icon-xieyoujian" $-on:click="bussinessEvent.edit"></i>
                        <i class="iconfont icon-shanchu" $-on:click="bussinessEvent.delete"></i>
                    </span>-->
                </div>
                <div class="dic-type-down">
                    <i class="iconfont icon-search"></i>
                    <input type="text" placeholder="请输入搜索的模块..." $-model="searchValue" $-on:keypress="searchValue|searchFilter:[$,singleMenuApi.search]">
                </div>
            </div>

            <!--模块列表-->
            <div class="dictionary-type-bottom">
                <single-menu config="moduleListModel" api="singleMenuApi"></single-menu>

            </div>

        </div>
    </div>
    <!--右侧数据-->
    <div class="page-cont-right viewf-right">
        <!--头-->
        <div class="list-top">
            <ul>
                <li>
                    <div>
                        <span class="txt">公式列表</span>
                        <span class="type">公式</span>
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
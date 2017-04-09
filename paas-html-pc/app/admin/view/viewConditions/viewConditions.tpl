<div class="page-cont view-formula">

    <div class="page-cont-left ztree-container">
        <!--顶部的组织架构及操作-->
        <div class="ztree-top">
            <div>
                <i class="iconfont icon-zuzhijiagou"></i>
                <span>视图条件</span>
            </div>

            <!-- 组织架构树上面的增删改按钮
             <div class="btn-group">
                 <button class="add"><i class="iconfont icon-jiahao"></i></button>
                 <button class="edit"><i class="iconfont icon-xieyoujian"></i></button>
                 <button class="delete"><i class="iconfont icon-shanchu"></i></button>
             </div>-->
        </div>

        <!--搜索框-->
        <div class="ztree-mid">
            <i class="iconfont icon-search"></i>
            <input type="text" placeholder="请输入搜索的视图名称..." $-model="searchValue" $-on:keypress="searchValue|searchFilter:[$,treeApi.search]">
        </div>

        <!--组织架构树-->
        <div class="ztree-bottom">
            <list-tree config="treeConf" api="treeApi"></list-tree>
        </div>


    </div>

    <!--右侧数据-->
    <div class="page-cont-right viewf-right">
        <!--头-->
        <div class="list-top">
            <ul>
                <li>
                    <div>
                        <span class="txt">视图条件配置</span><span class="type">条件</span>
                    </div>
                </li>
                <li>
                    <div>
                        <!--模糊查询-->
                        <fuzzy-query data="fuzzyQueryData"></fuzzy-query>
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
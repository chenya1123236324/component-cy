

<!--后台设置布局-->
<!--首页菜单-->
<!--右侧内容-->
<div class="page-main-content">
    <!--ztree组件-->
    <div class="admin-menu-layout-list">

        <div class="ztree-container menu-layout-list-left" style="overflow:auto;height:1150px;">
            <!--组织架构树-->
            <list-tree config="treeData" api="treeApi"></list-tree>
        </div>

        <div class="menu-layout-list-right">
            <div class="menu-list-settings">
                <div class="menu-list-settings-left">
                    <div class="menu-list-content">
                        <span>菜单设置</span>
                        <span>菜单</span>
                    </div>
                </div>
                <div class="menu-list-settings-right">
                    <!--新增菜单列表-按钮组件-->
                    <btn-group-me data="addMenuBtn" receive="commConf"></btn-group-me>
                </div>
            </div>
            <div class="menu-list-grid">
                <!--菜单列表-grid组件-->
                <list-grid config="menuGrid" api="gridApi"></list-grid>
            </div>
        </div>
    </div>
</div>










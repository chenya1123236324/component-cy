<!--后台设置布局-->
<!--首页菜单-->
<!--右侧内容-->
<div class="page-main-content">
    <!--后台配置管理-->
    <div class="admin-homeMark-layout">
        <!--首页标签-设置-->
        <div class="homeMark-settings">
            <div class="homeMark-settings-left">
                <div class="homeMark-txt">
                    <span>首页标签</span>
                    <span>标签</span>
                </div>
            </div>
            <div class="homeMark-settings-right">
                <!--按钮组件-->
                <btn-group-me data="addLabelBtn"></btn-group-me>
            </div>
        </div>
        <!--首页标签-内容-->
        <div class="homeMark-content">
            <!--首页标签-grid-->
            <list-grid config="homeMarkGrid" api="gridApi"></list-grid>
        </div>
    </div>
</div>
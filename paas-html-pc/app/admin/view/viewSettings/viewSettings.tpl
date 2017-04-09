<!--后台设置布局-->
<!--首页菜单-->
<div class="page-main-content">
    <!--后台配置管理-->
    <div class="admin-viewSettings-layout-list">
        <!--模块配置管理-设置-->
        <div class="viewSettings-list-settings">
            <div class="viewSettings-list-settings-left">
                <div class="viewSettings-select-module">
                    选择模块:
                    <select config="viewSettingsSelect" $-on:change="viewSettingsSelect" id="viewSettingsId"></select>
                    <input type="text" value="173" id="setModuleID" style="display:none;">
                </div>
            </div>
            <div class="viewSettings-list-settings-right">
            </div>
        </div>

        <!--模块配置管理-内容-->
        <div class="viewSettings-list-content">
            <!--模块配置管理-tab-->
            <div class="viewSettings-list-tab">
                <div class="viewSettings-tab-left">
                    <tab-top-nav config="viewSettingsTab"></tab-top-nav>
                </div>
                <div class="viewSettings-tab-right">
                    <!--&lt;!&ndash;字段&ndash;&gt;-->
                    <!--<div page-index="0">-->
                    <!--&lt;!&ndash;新增字段-按钮组件&ndash;&gt;-->
                    <!--<btn-group-me data="viewSettingsFieldBtn" receive="btnField"></btn-group-me>-->
                    <!--&lt;!&ndash;新增字段-模糊查询&ndash;&gt;-->
                    <!--<fuzzy-query data="viewSettingsFieldQuery"></fuzzy-query>-->
                    <!--&lt;!&ndash;&lt;!&ndash;新增字段清空-按钮组件&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;<btn-group-me data="viewSettingsReset"></btn-group-me>&ndash;&gt;-->
                    <!--</div>-->

                    <!--视图-->
                    <div page-index="0">
                        <!--新增模块列表-按钮组件-->
                        <btn-group-me data="viewSettingsViewBtn"></btn-group-me>
                        <!--模糊查询-->
                        <fuzzy-query data="viewSettingsViewQuery"></fuzzy-query>
                        <!--&lt;!&ndash;清空-按钮组件&ndash;&gt;-->
                        <!--<btn-group-me data="viewSettingsViewReset"></btn-group-me>-->
                    </div>
                    <!--操作-->
                    <div page-index="1" style="display:none;">
                        <!--新增模块列表-按钮组件-->
                        <btn-group-me data="viewSettingsOperationBtn"></btn-group-me>
                        <!--模糊查询-->
                        <fuzzy-query data="viewSettingsOperationQuery"></fuzzy-query>
                        <!--&lt;!&ndash;清空-按钮组件&ndash;&gt;-->
                        <!--<btn-group-me data="viewSettingsOperationReset"></btn-group-me>-->
                    </div>

                    <!--清空-按钮组件-->
                    <btn-group-me data="viewSettingsReset"></btn-group-me>
                </div>
            </div>
            <!--模块配置管理-grid-->
            <div class="viewSettings-list-grid">
                <!--字段-->
                <!--<div page-index="0" style="width:100%">-->
                <!--<list-grid config="viewSettingsField" api="gridApi"></list-grid>-->
                <!--</div>-->
                <!--视图-->
                <div page-index="0" style="display:block;width:100%">
                    <list-grid config="viewSettingsView" api="moduleConfigViewApi"></list-grid>
                </div>
                <!--操作-->
                <div page-index="1" style="display:none;width:100%">
                    <list-grid config="viewSettingsOperation" api="moduleConfigOperationApi"></list-grid>
                </div>
            </div>
        </div>
    </div>
</div>









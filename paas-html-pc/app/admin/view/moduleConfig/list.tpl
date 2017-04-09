<!--后台设置布局-->
<!--首页菜单-->
<!--右侧内容-->
<div class="page-main-content">
    <!--后台配置管理-->
    <div class="admin-moduleConfig-layout-list">
        <!--模块配置管理-设置-->
        <div class="moduleConfig-list-settings">
            <div class="moduleConfig-list-settings-left">
                <div class="moduleConfig-select-module">
                    选择模块:
                    <select config="moduleConfigSelect" $-on:change="moduleConfigSelect" id="moduleConfigId"></select>
                    <input type="text" value="" id="setModuleID" name="" style="display:none;">
                </div>
            </div>
            <div class="moduleConfig-list-settings-right">
            </div>
        </div>

        <!--模块配置管理-内容-->
        <div class="moduleConfig-list-content">
            <!--模块配置管理-tab-->
            <div class="moduleConfig-list-tab">
                <div class="moduleConfig-tab-left">
                    <tab-top-nav config="moduleConfigTab"></tab-top-nav>
                </div>
                <div class="moduleConfig-tab-right">
                    <!--字段-->
                    <div page-index="0">
                        <!--新增字段-按钮组件-->
                        <btn-group-me data="moduleConfigFieldBtn" receive="btnField"></btn-group-me>
                        <!--新增字段-模糊查询-->
                        <fuzzy-query data="moduleConfigFieldQuery"></fuzzy-query>
                        <!--&lt;!&ndash;新增字段清空-按钮组件&ndash;&gt;-->
                        <!--<btn-group-me data="moduleConfigReset"></btn-group-me>-->
                    </div>
                    <!--视图-->
                    <div page-index="1" style="display:none;">
                        <!--新增模块列表-按钮组件-->
                        <btn-group-me data="moduleConfigViewBtn"></btn-group-me>
                        <!--模糊查询-->
                        <fuzzy-query data="moduleConfigViewQuery"></fuzzy-query>
                        <!--&lt;!&ndash;清空-按钮组件&ndash;&gt;-->
                        <!--<btn-group-me data="moduleConfigViewReset"></btn-group-me>-->
                    </div>
                    <!--操作-->
                    <div page-index="2" style="display:none;">
                        <!--新增模块列表-按钮组件-->
                        <btn-group-me data="moduleConfigOperationBtn"></btn-group-me>
                        <!--模糊查询-->
                        <fuzzy-query data="moduleConfigOperationQuery"></fuzzy-query>
                        <!--&lt;!&ndash;清空-按钮组件&ndash;&gt;-->
                        <!--<btn-group-me data="moduleConfigOperationReset"></btn-group-me>-->
                    </div>

                    <!--清空-按钮组件-->
                    <!--<btn-group-me data="moduleConfigReset"></btn-group-me>-->
                </div>
            </div>
            <!--模块配置管理-grid-->
            <div class="moduleConfig-list-grid">
                <!--字段-->
                <div page-index="0" style="width:100%">
                    <list-grid config="moduleConfigField" api="gridApi"></list-grid>
                </div>
                <!--视图-->
                <div page-index="1" style="display:none;width:100%">
                    <list-grid config="moduleConfigView" api="moduleConfigViewApi"></list-grid>
                </div>
                <!--操作-->
                <div page-index="2" style="display:none;width:100%">
                    <list-grid config="moduleConfigOperation" api="moduleConfigOperationApi"></list-grid>
                </div>
            </div>
        </div>
    </div>
</div>










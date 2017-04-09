<!--后台设置布局-->
<!--首页菜单-->
<!--右侧内容-->
<div class="page-main-content">
    <!--后台配置管理--企业信息-->
    <div class="admin-enterpriseInformation-layout-list">
        <div class="enterpriseInformation-layout-title">
            <span class="enterpriseInformation-txt">企业信息</span>
            <span class="enterpriseInformation-enterprise">企业</span>
        </div>
        <form id="form_moduleAdd"  class="enterpriseInformation-form" $-form="getFormData">
            <!--企业信息-内容-->
            <div class="enterpriseInformation-content">
                <div class="enterpriseInformation-content-left">
                    <form-layout config="enterpriseInformation"></form-layout>
                </div>
            </div>
            <div class="enterpriseInformation-content-footer">
                <!--企业信息保存-按钮组件-->
                <btn-group-me data="enterpriseInformationSave" receive="getFormData"></btn-group-me>
            </div>
        </form>
    </div>
</div>









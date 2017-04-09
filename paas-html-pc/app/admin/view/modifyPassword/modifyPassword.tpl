<!--修改密码-->
<div class="modifyPassword-main">
    <div class="modifyPassword-navigation">
        <h2>个人中心</h2><i class="iconfont icon-right1" style="color:#a7b6d0;"></i>

        <h2>修改密码</h2><i class="iconfont icon-sjiantou04-copy" style="color:#9ca3ad;"></i>
        <i class="iconfont icon-yonghu" style="color:#e8585a;"></i>

        <h2> <a href="./admin/personalInformation/personalInformation.html">个人信息</a></h2>
        <i class="iconfont icon-shuxian" style="color:#a3b0cc;"></i>
        <i class="iconfont icon-mima" style="color:#59aad9;"></i>

        <h2><a href="./admin/modifyPassword/modifyPassword.html">修改密码</a></h2>
    </div>
    <div class="modifyPassword-content">
        <div class="content-title">
            <i class="iconfont icon-mima" style="color:#59aad9;"></i>
            <span>修改密码</span>
        </div>

        <div class="content-body">
            <form id="form_moduleAdd" class="modifyPassword-form" $-form="getFormData">
                <form-layout config="modifyPassword"></form-layout>
                <div class="btn-save">
                    <!--企业信息保存-按钮组件-->
                    <btn-group-me data="modifyPasswordSave" receive="getFormData"></btn-group-me>
                </div>
            </form>
        </div>

    </div>
</div>
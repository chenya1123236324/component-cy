<!--个人信息-->
<div class="personalInformation-main">
    <div class="personalInformation-navigation">
        <h2>个人中心</h2><i class="iconfont icon-right1" style="color:#a7b6d0;"></i>

        <h2>个人信息</h2><i class="iconfont icon-sjiantou04-copy" style="color:#9ca3ad;"></i>
        <i class="iconfont icon-yonghu" style="color:#e8585a;"></i>

        <h2><a href="./admin/personalInformation/personalInformation.html">个人信息</a></h2>
        <i class="iconfont icon-shuxian" style="color:#a3b0cc;"></i>
        <i class="iconfont icon-mima" style="color:#59aad9;"></i>

        <h2><a href="./admin/modifyPassword/modifyPassword.html">修改密码</a></h2>
    </div>
    <div class="personalInformation-upload">
        <div class="upload-box">
            <div class="upload-head">
                <img src="./comm/img/comm/uploadAvatar.png" alt="头像"/>
            </div>
            <div class="upload-operation">
                <div class="upload-btn"><i class="iconfont icon-jiantou-copy"></i>本地上传</div>
                <span>120x120像素</span>
                <span>请上传小于5M的JPG、或GIF或PNG文件;该头像会对外显示，请您注意不要上传私密头像</span>
            </div>
        </div>
    </div>

    <div class="personalInformation-content">
        <div class="content-title">
            <i class="iconfont icon-xinxi1" style="color:#ce9c4a;"></i>
            <span>基本信息</span>
        </div>

        <div class="content-body">
            <form id="form_moduleAdd" class="personalInformation-form" $-form="getFormData">
                <form-layout config="personalInformation"></form-layout>
                <div class="btn-save">
                    <!--企业信息保存-按钮组件-->
                    <btn-group-me data="personalInformationSave" receive="getFormData"></btn-group-me>
                </div>
            </form>
        </div>

    </div>

</div>
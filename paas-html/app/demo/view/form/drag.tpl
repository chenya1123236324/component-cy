<!--<h1>{{pageTitle}}</h1>-->
<div class="form-edit">
    <div class="edit-field">
        <dl>
            <dt>
                <span>未使用字段</span>
            </dt>
            <dd>
                <ul>
                    <li>客户名称</li>
                    <li>名称</li>
                    <li>ID</li>
                    <li>创建人</li>
                    <li>企业编码</li>
                    <li>是否删除</li>
                    <li>同步错误原因</li>
                    <li $-drag="dragConf">注册资本</li>
                    <li>组织机构代码</li>
                    <li>营业执照号码</li>
                    <li>税号</li>
                    <li $-drag="dragConf">联系人地址邮箱</li>
                </ul>
            </dd>
        </dl>
    </div>
    <div class="edit-form">
        <form-layout-edit config="formLayout"></form-layout-edit>
    </div>
</div>
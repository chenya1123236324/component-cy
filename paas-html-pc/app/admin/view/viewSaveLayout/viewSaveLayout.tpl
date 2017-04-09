<layout-block location="menu">

</layout-block>
<div class="buttons-container">
    <button $-btn-material $-url:back><i class="iconfont icon-fanhui"></i>返回</button>
    <button type="button" $-btn-material class="primary" $-on:click="submit(formInfoData.formInfo.formConf)">保存布局</button>
</div>
<div class="form-edit">
    <div class="edit-field">
        <dl $-for="module in formInfoData.notUsedFields">
            <dt>
                <span>{{module.name}}</span>
            </dt>
            <dd>
                <ul>
                    <li $-drag="dragConf|dragConfHandle:[$,field,formInfoData,index,module]" $-for="(index,field) in module.fields">{{field.columnName}}</li>
                </ul>
            </dd>
        </dl>
    </div>
    <div class="edit-form" >
        <div $-for="formInfo in formInfoData.formInfo.formConf">
            <h3 class="form-title">{{formInfo.name}}</h3>
            <form-layout-edit config="formInfo"></form-layout-edit>
        </div>
    </div>
</div>
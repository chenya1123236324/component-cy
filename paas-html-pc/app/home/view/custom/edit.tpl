<div class="page-title-buttons">
    <div class="buttons-container">
        <button $-btn-material $-url:back><i class="iconfont icon-fanhui"></i>返回</button>
        <button $-btn-material type="button" class="primary"  $-on:click="submit(viewStructConf.batchForms,viewStructConf.masterForms,viewStructConf.viewInfo)">保存</button>
    </div>
</div>
<div class="p-h-c-e">
    <h3 class="page-name"><i class="iconfont icon-icon4"></i><span class="loading-container" $-hidden="viewStructConf.viewName"><span class="loading-spinners dots"></span>加载中<span class="loading-spinners"></span></span>{{viewStructConf.viewName}}</h3>

    <tab-scroll config="viewStructConf.tabConf">
        <!--<container id="base">
            <h3 class="tab-title">基本信息</h3>
            <form $-form="masterForm">
                <form-layout config="viewStructConf.formLayout"></form-layout>
            </form>
        </container>-->
    </tab-scroll>
</div>


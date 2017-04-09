
<div class="topBtn">
	<btn-group-me data="formLayout.btnConf"></btn-group-me>
</div>

<div class="p-h-c-d" style="margin-top: 70px;">
    <h3 class="page-name"><i class="iconfont icon-dingdan"></i><span class="loading-container" $-hidden="formLayout.viewName"><span class="loading-spinners dots"></span>加载中<span class="loading-spinners"></span></span>{{formLayout.viewName}}</h3>

    <tab-scroll config="formLayout.tabConf">
        <container id="base">
            <div class="tabtitle">基本信息</div>
            <list-detail config="formLayout.configList"></list-detail>
        </container>
    </tab-scroll>

</div>

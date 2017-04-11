
<div class="news-container" style="background-color:#fff;">
    <!--顶部栏-->
    <div class="news-center-nav" $-form="searchFormSource" style="position: fixed;top:50px;">
        <ul class="news-center-nav-left">
            <li><span>消息中心</span><span class="text-icon">消息</span></li>
        </ul>
        <div class="searchBtn" style="float: right;">
            <btn-group-me data="search.searchBut" receive="searchFormSource"></btn-group-me>
        </div>
        <div class="news-center-nav-right" style="float: right;position: initial;">
            <!--三个下拉框组件一个按钮-->
            <select config="search.infoType"></select>
            <select config="search.dataType"></select>
            <select config="search.readyType"></select>

            <input type="date" name="startTime" style="height: 30px;" $-hidden="search.hiddenFlag">
            <input type="date" name="endTime" style="height: 30px;" $-hidden="search.hiddenFlag">
        </div>

    </div>


    <!--消息中心左侧菜单-->
    <div class="news-center-menu" style="background: #EAEDF1;width:15%;">
        <!--<p><%=userMsg.userName%><span><%=userMsg.organizationName%></span></p>-->
        <div class="news-menu-nav">
            <i class="iconfont icon-xiaoxi"></i>
            <span>消息中心</span>
        </div>

        <div class="news-menu-top" $-on:click="hiddenHandle.click" $-class="{msg-click:hiddenHandle.isPull}" >

            <i class="iconfont icon-triangle-right-copy" ></i>

            <span>消息</span>
        </div>
        <!--消息中心左侧菜单-->
        <div class="news-menu-down">
            <!--<back-stage-menu data="newsCenterMenu"></back-stage-menu>-->
            <div class="news-message" $-on:click="search.showHandle.click">
                <i class="iconfont icon-xiaoxixinxi" ></i>

                <span>消息信息 ({{newsList.count}})</span>
            </div>
            <div class="news-notice">
                <i class="iconfont icon-iconfontcolor34" ></i>

                <span>通知公告 (22)</span>
            </div>
        </div>
    </div>

    <!--消息中心-消息列表-->
    <div class="news-list" style="margin:67px 20px 0 20px;width:82%;">
        <div class="newsList-top" style="overflow: hidden;">
            <div class="news-button" style="float:left;" >
                <btn-group-me data="messageButton" ></btn-group-me>
            </div>
            <div class="totalNews" style="" >消息共{{newsList.count}}条</div>
        </div>
        <div class="newsList" style="margin-top: 23px;">
            <list-grid config="newsList.newsListConf" api="gridApi"></list-grid>
        </div>

    </div>

</div>
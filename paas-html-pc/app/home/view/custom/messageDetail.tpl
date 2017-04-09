
<div class="news-container" style="background-color:#fff;">
    <!--顶部栏-->
    <div class="news-center-nav" style="position: fixed;top:50px;">
        <ul class="news-center-nav-left">
            <li><span>消息中心</span><span class="text-icon">消息</span></li>
        </ul>

    </div>


    <!--消息中心左侧菜单-->
    <div class="news-center-menu">
        <!--<p><%=userMsg.userName%><span><%=userMsg.organizationName%></span></p>-->
        <div class="news-menu-nav">
            <i class="iconfont icon-xiaoxi"></i>
            <span>消息中心</span>
        </div>

        <div class="news-menu-top" $-on:click="hiddenHandle.click" $-class="{msg-click:hiddenHandle.isPull}">

            <i class="iconfont icon-triangle-right-copy" ></i>

            <span>消息</span>
        </div>
        <!--消息中心左侧菜单-->
        <div class="news-menu-down">
            <!--<back-stage-menu data="newsCenterMenu"></back-stage-menu>-->
            <div class="news-message" $-on:click="searchButton.showHandle.click">
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
    <div class="news-center-right">


        <btn-group-me data="goBackButton"></btn-group-me>

        <!--消息详情-->
        <div class="news-details">
            <!--标题-->
            <div class="news-title">
                <h3 style="text-align: center">{{singleNews.title}}</h3>
                <p class="news-title-time">{{singleNews.createTime|Date:[$,"yy-mm-dd h:m:s"]}}</p>
            </div>
            <!--内容-->
            <div class="news-content">

                <p class="news-content-notice">{{singleNews.messageContent}}</p>

            </div>


        </div>




    </div>

</div>


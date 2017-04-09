
<div class="news-container">
    <!--顶部栏-->
    <div class="news-center-nav">
        <ul class="news-center-nav-left">
            <li><span>消息中心</span><span class="text-icon">消息</span></li>
        </ul>
        <ul class="news-center-nav-right">
            <!--三个下拉框组件一个按钮-->
            <input type="text" placeholder="全部">
            <input type="text" placeholder="全部">
            <input type="text" placeholder="全部">
            <input type="button" value="查询">
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
            <back-stage-menu data="newsCenterMenu"></back-stage-menu>
            <span class="news-number">(5)</span>
            <span class="notice-number">(22)</span>
        </div>

    </div>

    <!--消息中心-消息列表-->
    <div class="news-center-right">
        <!-------------------------ul组件----老版消息列表------------------>
        <!--<news-center-list receive="newsCenterList"></news-center-list>-->
        <button class="news-return">
            <i class="iconfont icon-fanhui"></i>
            <span>返回消息列表</span>
        </button>

        <!--消息详情-->
        <div class="news-details">
            <!--标题-->
            <div class="news-title">
                <p class="news-title-txt">标题内容标题内容标题内容标题内容</p>
                <p class="news-title-time">2016-08-22 20:23:23</p>
            </div>
            <!--内容-->
            <div class="news-content">

                <p class="news-content-notice">本活动适用于实名认证用户,新老用户均可参加</p>

                <div class="news-content-txt">
                    <p class="news-content-txt-title">服务器ECS活动内容:</p>
                    <div class="news-content-txt-content">
                        <p>1)购买ECS(包年包月|经典网络)3个月以上可享受整单85折</p>
                        <p>2)购买ECS(包年包月|经典网络)3个月以上可享受整单85折</p>
                    </div>
                </div>

                <p class="news-content-remark">
                    备注:本活动不与官网ECS年付85折、企业最高免费3膈俞服务器、推荐码等相关活动重复享受，优惠有效期截止至9月15日。
                </p>
            </div>


        </div>




    </div>

</div>


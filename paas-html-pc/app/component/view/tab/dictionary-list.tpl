<div class="tab-left-container">
    <!--左侧tab-->
    <div class="dictionary-type">
        <div class="dictionary-type-top">
            <div class="dic-type-up"  tabindex="0" $-on:blur="bussinessEvent.blur">
                <i class="iconfont icon-sousuoleibie"></i>
                <span class="dic-type-txt">业务类型</span>
                <span class="dic-type-btn">
                    <i class="iconfont icon-jiahao" $-on:click="bussinessEvent.add"></i>
                    <i class="iconfont icon-xieyoujian" $-on:click="bussinessEvent.edit"></i>
                    <i class="iconfont icon-shanchu" $-on:click="bussinessEvent.delete"></i>
                </span>
            </div>
            <div class="dic-type-down">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="请输入搜索的部门...">
            </div>
        </div>

        <div class="dictionary-type-bottom">
            <tab-left-nav data="dicListModel"></tab-left-nav>
        </div>

    </div>

    <!--&lt;!&ndash;情景一 切换页面&ndash;&gt;-->
    <!--<div class="tab-left-pages-window">-->
        <!--<div class="tab-left-pages-container">-->
            <!--<div class="tab-left-page" page-index="0" style="background-color: pink">-->
                <!--<span>第一页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="1"  style="background-color: yellow">-->
                <!--<span>第二页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="2" style="background-color: cyan">-->
                <!--<span>第三页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="3" style="background-color: lightgreen">-->
                <!--<span>第四页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="4" style="background-color: red">-->
                <!--<span>第五页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="5" style="background-color: blanchedalmond">-->
                <!--<span>第六页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="6" style="background-color: greenyellow">-->
                <!--<span>第七页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="7" style="background-color: honeydew">-->
                <!--<span>第八页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="8" style="background-color: skyblue">-->
                <!--<span>第九页</span>-->
            <!--</div>-->
            <!--<div class="tab-left-page" page-index="9" style="background-color: honeydew">-->
                <!--<span>第十页</span>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->

    <!--情景二 定位-->
    <div class="tab-left-page-one">
        <div class="tab-left-pages-container">
            <div class="tab-page-content" tabindex="0" page-index="0" style="background-color: pink;height: 300px;">
                <span>第一页</span>
            </div>
            <div class="tab-page-content" page-index="1" style="background-color: yellow;height: 200px;">
                <span>第二页</span>
            </div>
            <div class="tab-page-content" page-index="2" style="background-color: cyan;height: 180px;">
                <span>第三页</span>
            </div>
            <div class="tab-page-content" page-index="3" style="background-color: lightgreen;height: 150px;">
                <span>第四页</span>
            </div>
            <div class="tab-page-content" page-index="4" style="background-color: red;height: 220px;">
                <span>第五页</span>
            </div>
            <div class="tab-page-content" page-index="5" style="background-color: blanchedalmond;height: 50px;">
                <span>第六页</span>
            </div>
            <div class="tab-page-content" page-index="6" style="background-color: greenyellow;height: 50px;">
                <span>第七页</span>
            </div>
            <div class="tab-page-content" page-index="7" style="background-color: honeydew;height: 80px;">
                <span>第八页</span>
            </div>
            <div class="tab-page-content" page-index="8" style="background-color: skyblue;height: 50px;">
                <span>第九页</span>
            </div>
            <div class="tab-page-content" page-index="9" style="background-color: honeydew;height: 50px;">
                <span>第十页</span>
            </div>
        </div>
    </div>




</div>
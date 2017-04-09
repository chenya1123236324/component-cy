<!--ztree组件-->


<div class="ztree-container">
    <!--顶部的组织架构及操作-->
    <div class="ztree-top">
        <div>
            <i class="iconfont icon-zuzhijiagou"></i>
            <span>组织架构</span>
        </div>

        <div class="btn-group">
            <button class="add"><i class="iconfont icon-jiahao"></i></button>
            <button class="edit"><i class="iconfont icon-xieyoujian"></i></button>
            <button class="delete"><i class="iconfont icon-shanchu"></i></button>
        </div>

    </div>


    <!--搜索框-->
    <div class="ztree-mid">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="请输入搜索的部门...">
    </div>

    <!--组织架构树-->
    <ztree-list data="treeData" api=""></ztree-list>
    <!--<ul class="ztree">-->
        <!--<li>-->
            <!--<span class="switch1_open_nb"></span>-->
            <!--<a href="">赞同科技({{2660}})</a>-->
            <!--&lt;!&ndash;<span>&ndash;&gt;-->
                <!--&lt;!&ndash;<button class="add"><i class="iconfont icon-jiahao"></i></button>&ndash;&gt;-->
                <!--&lt;!&ndash;<button class="edit"><i class="iconfont icon-xieyoujian"></i></button>&ndash;&gt;-->
                <!--&lt;!&ndash;<button class="delete"><i class="iconfont icon-shanchu"></i></button>&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->

            <!--<ul>-->
                <!--<li>-->
                    <!--&lt;!&ndash;isGroup:false&ndash;&gt;-->
                    <!--<span class="dot_mid"></span>-->
                    <!--<a href="">人力资源部({{25}})</a>-->
                <!--</li>-->

                <!--<li>-->
                    <!--&lt;!&ndash;isGroup:true 有ul展开栏&ndash;&gt;-->
                    <!--<span class="switch_open_nb"></span>-->
                    <!--<a href="">市场部({{1546}})</a>-->
                    <!--<ul>-->
                        <!--<li>-->
                            <!--<span class="dot_last"></span>-->
                            <!--<a href="">华北市场({{25}})</a>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</li>-->
    <!--</ul>-->
</div>
<h1>dataGrid组件开发</h1>
<br/><br/><br/><br/>


<!--dataGrid组件开始-->
    <div class="grid-container">
        <!--表格主体-->
        <div class="grid-table">
            <!--表格主体左侧部分-->
            <div class="grid-table-left-wrap">
             <div class="grid-table-left">
                 <!--表格主体左侧头部部分-->
                <div class="grid-header-group">
                    <ul class="grid-header-row">
                        <li index-data="0"   style="text-align:left;width:50px;">
                            <input type="checkbox" >
                        </li>
                        <li index-data="1" style="text-align:left;width:60px;">操作</li>
                        <li index-data="2" style="text-align:left;width:50px;">序号</li>
                    </ul>
                </div>
                 <!--表格主体左侧内容部分-->
                <div class="grid-row-group">
                    <ul rows-index="0" class="grid-body-row">
                        <li style="text-align:center;padding:0">
                           <input type="checkbox">
                        </li>
                        <li style="text-align: left">
                            <i class="iconfont icon-fenlei"></i>
                                <ul>
                                    <li><a href="">设置权限</a></li>
                                    <li><a href="">编辑</a></li>
                                    <li><a href="">克隆角色</a></li>
                                    <li><a href="">角色成员</a></li>
                                    <li><a href="">删除</a></li>
                                </ul>
                        </li>
                        <li style="text-align:left">1</li>
                    </ul>
                    <ul rows-index="1" class="grid-body-row hover">
                        <li style="text-align:center;padding:0">
                                    <input type="checkbox">
                        </li>
                        <li style="text-align: left">
                            <i class="iconfont icon-fenlei"></i>
                            <ul>
                                <li><a href="">设置权限</a></li>
                            </ul>
                        </li>
                        <li style="text-align: left">2</li>
                    </ul>
                    <ul rows-index="2" class="grid-body-row">
                        <li style="text-align:center;padding:0">
                            <input type="checkbox">
                        </li>
                        <li style="text-align: left">
                            <i class="iconfont icon-fenlei"></i>
                            <ul>
                                <li><a href="">编辑</a></li>
                                <li><a href="">删除</a></li>
                            </ul>

                        </li>
                        <li style="text-align: left">3</li>
                    </ul>
                    <ul rows-index="3" class="grid-body-row">
                        <li style="text-align:center;padding:0">
                            <input type="checkbox">
                        </li>
                        <li style="text-align: left"><i class="iconfont icon-fenlei"></i>
                            <ul>
                                <li><a href="">设置权限</a></li>
                                <li><a href="">编辑</a></li>
                                <li><a href="">克隆角色</a></li>
                                <li><a href="">删除</a></li>
                            </ul>
                        </li>
                        <li style="text-align: left">4</li>
                    </ul>
                </div>
            </div>
            </div>

            <!--表格主体右侧部分-->
            <div class="grid-table-right-wrap">
                <div class="grid-table-right">
                    <!--表格主体右侧头部部分-->
                    <div class="grid-header-group">
                        <ul class="grid-header-row">
                            <li index-data="3" order-data="asc" style="text-align:left;">公司名称
                                <span>
                                  <i class="iconfont icon-down-copy-asc"></i>
                                  <i class="iconfont icon-down-copy-desc"></i>
                                </span>
                            </li>
                            <li index-data="4" order-data="asc"  style="text-align:left;">客户类型
                                 <span >
                                  <i class="iconfont icon-down-copy-asc"></i>
                                  <i class="iconfont icon-down-copy-desc"></i>
                                </span>
                            </li>
                            <li index-data="5" order-data="asc"  style="text-align:left;">创建人
                                 <span>
                                  <i class="iconfont icon-down-copy-asc"></i>
                                  <i class="iconfont icon-down-copy-desc"></i>
                                </span>
                            </li>
                            <li index-data="6" order-data="asc"  style="text-align:left;">客户层级</li>
                            <li index-data="6" order-data="asc"  style="text-align:left;">分配状态</li>
                            <li index-data="6" order-data="asc"  style="text-align:left;">联系人姓名</li>
                            <li index-data="6" order-data="asc"  style="text-align:left;">联系人座机</li>
                            <li index-data="7" order-data="asc"  style="text-align:left;">联系人手机
                                <span>
                                  <i class="iconfont icon-down-copy-asc"></i>
                                  <i class="iconfont icon-down-copy-desc"></i>
                                </span>
                            </li>
                            <li><i class="iconfont icon-shezhi"></i></li>
                        </ul>
                    </div>
                    <!--表格主体右侧内容部分-->
                    <div class="grid-row-group">
                        <ul rows-index="0" class="grid-body-row">
                            <li style="text-align:left;"><a title="上海赞同科技发展有限公司">上海赞同科技发展有限公司</a></li>
                            <li style="text-align:left;"><a title="潜在客户">潜在客户</a></li>
                            <li style="text-align:left;"><a title="刘德华">刘德华</a></li>
                            <li style="text-align:left;"><a title="客户层级">客户层级</a></li>
                            <li style="text-align:left;"><a title="分配状态">分配状态</a></li>
                            <li style="text-align:left;"><a title="唐僧">唐僧</a></li>
                            <li style="text-align:left;"><a title="0311-78904567">0311-78904567</a></li>
                            <li style="text-align:left;"><a title="18709092345">18709092345</a></li>
                            <li style="text-align:left;"><a title=""></a></li>
                        </ul>
                        <ul rows-index="1" class="grid-body-row hover">
                            <li style="text-align:left;"><a title="上海赞同科技发展有限公司">上海赞同科技发展有限公司</a></li>
                            <li style="text-align:left;"><a title="潜在客户">潜在客户</a></li>
                            <li style="text-align:left;"><a title="刘德华">刘德华</a></li>
                            <li style="text-align:left;"><a title="客户层级">客户层级</a></li>
                            <li style="text-align:left;"><a title="分配状态">分配状态</a></li>
                            <li style="text-align:left;"><a title="唐僧">唐僧</a></li>
                            <li style="text-align:left;"><a title="0311-78904567">0311-78904567</a></li>
                            <li style="text-align:left;"><a title="18709092345">18709092345</a></li>
                            <li style="text-align:left;"><a title=""></a></li>
                        </ul>
                        <ul rows-index="2" class="grid-body-row">
                            <li style="text-align:left;"><a title="上海赞同科技发展有限公司">上海赞同科技发展有限公司</a></li>
                            <li style="text-align:left;"><a title="潜在客户">潜在客户</a></li>
                            <li style="text-align:left;"><a title="刘德华">刘德华</a></li>
                            <li style="text-align:left;"><a title="客户层级">客户层级</a></li>
                            <li style="text-align:left;"><a title="分配状态">分配状态</a></li>
                            <li style="text-align:left;"><a title="唐僧">唐僧</a></li>
                            <li style="text-align:left;"><a title="0311-78904567">0311-78904567</a></li>
                            <li style="text-align:left;"><a title="18709092345">18709092345</a></li>
                            <li style="text-align:left;"><a title=""></a></li>
                        </ul>
                        <ul rows-index="3" class="grid-body-row">
                            <li style="text-align:left;"><a title="上海赞同科技发展有限公司">上海赞同科技发展有限公司</a></li>
                            <li style="text-align:left;"><a title="潜在客户">潜在客户</a></li>
                            <li style="text-align:left;"><a title="刘德华">刘德华</a></li>
                            <li style="text-align:left;"><a title="客户层级">客户层级</a></li>
                            <li style="text-align:left;"><a title="分配状态">分配状态</a></li>
                            <li style="text-align:left;"><a title="唐僧">唐僧</a></li>
                            <li style="text-align:left;"><a title="0311-78904567">0311-78904567</a></li>
                            <li style="text-align:left;"><a title="18709092345">18709092345</a></li>
                            <li style="text-align:left;"><a title=""></a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

         <!--表格底部-->
        <div class="grid-footer">
            <ul>
                <li class="page-paging-container">
                    <div class="pagelist">
                        <ul>
                            <li><a href="首页">首页</a></li>
                            <li><a href="上一页"><</a></li>
                            <li><a href="1">1</a></li>
                            <li><a href="2">2</a></li>
                            <li><a href="3">3</a></li>
                            <li><a href="4">4</a></li>
                            <li><a href="5">5</a></li>
                            <li><a href="6">6</a></li>
                            <li><a class="current" href="7">7</a></li>
                            <li><a href="下一页"> ></a></li>
                            <li><a href="尾页">尾页</a></li>
                        </ul>
                    </div>
                </li>
                <li class="page-info-container">
                    第<input type="text" name="targetPage" class="targetPage" />页
                    <span  class="buttonStyle">确定</span>
                    共<span class="pageCount">1</span>页

                </li>
                <li class="page-select-container">
                    <span class="pageButton hover">20条</span>
                    <span class="pageButton">30条</span>
                    <span class="pageButton">40条</span>
                    共<span class="dataCount">4</span>条

                </li>
            </ul>
            <div class="noData" style="font-size: 14px;text-align: center;width:100%;display:none;">
                无数据!!!
            </div>
        </div>

         <!--dialog开始-->
        <dialog data="gridDialogData"></dialog>
        <!--dialog结束-->
    </div>
<!--dataGrid组件结束-->


<!--组件调用-->
<!--TODO:许老师完成-->
<data-grid data=""></data-grid>


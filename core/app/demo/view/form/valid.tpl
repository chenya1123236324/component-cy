<h1>{{pageTitle}}</h1>
<div>
    <div class="form-layout">
        <ul>
            <li class="require"><strong>视图名称:</strong><ins><input $-valid="valid.viewName" placeholder="请输入视图名称" type="text"></ins></li>
            <li class="require"><strong>视图类型:</strong><ins><input type="text"  $-valid="valid.viewType"></ins></li>
            <li class="require clos-all"><strong>包含字段:</strong><ins><input type="text" $-valid="{require:{value:true,message:'包含字段必填'},minlen:{value:6,message:'包含字段最短{{value}}字符'}}"></ins></li>
            <li><strong>可查询字段:</strong><ins><input type="text"></ins></li>
            <li><strong>过滤条件:</strong><ins><input type="text"></ins></li>
            <li><strong>查询条件:</strong><ins><input type="text"></ins></li>
            <li><strong>默认查询条件:</strong><ins><input type="text"></ins></li>
            <li><strong>页面显示标签:</strong><ins><input type="date"></ins></li>
            <li><strong>启用数据权限:</strong><ins><input type="text"></ins></li>
            <li class="clos-all ins-top"><strong>描述:</strong><ins><textarea></textarea></ins></li>
        </ul>
    </div>
</div>
<h1>{{pageTitle}}</h1>
<dl $-for="(index,val) in menuList">
    <dt>
        <a $-bind:href="val.href">{{index}}-{{val.name}}</a>
    </dt>
    <dd $-for="dval in val.list">
        <a $-bind:href="dval.href">{{dval.name}}</a>
    </dd>
</dl>

<button type="button" $-on:click="add(menuList)">元素新增测试</button>
<button type="button" $-on:click="remove(menuList)">元素删除测试</button>
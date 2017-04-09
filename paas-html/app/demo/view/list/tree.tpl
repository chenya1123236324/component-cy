<!--<h1 $-bind:class="class" class="one">{{pageTitle}}</h1>-->

<input type="text" $-model="searchValue"/><button type="button" $-on:click="searchValue|searchFilter:[$,treeApi.search]">搜索</button>
<br>
<list-tree config="treeConf" api="treeApi"></list-tree>

<!--<button $-on:click="treeApi|testTreeApi">testApi</button>-->

<dl>
    <dt>选中的treeNode</dt>
    <dl $-for="info in treeApi.selectDatas">{{info.name}}</dl>
</dl>


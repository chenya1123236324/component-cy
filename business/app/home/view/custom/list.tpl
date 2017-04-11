
<form id="form" name="form" style="margin: 0;">
	<input type="hidden" name="ids"/>
</form>
<div class='header_place'>
	<div class="crumbs">
		<current-location data="currentLocation"></current-location>
	</div>
	<form $-form="getFormData">
		<advanced-query config="advancedQuery"></advanced-query>
	</form>
</div>
 <div class="middle">
 	<div class="leftBtn">
 		<btn-group-me data="gridConf.btnConf"></btn-group-me>
 	</div>
 	
 	<div class="rightFuzzy">
 		<span class="InpSearch">
 			<input type="text" placeholder="搜索" $-model="gridConf.gridConf.sendData.fuzzyQueryVal" $-on:keypress ="gridApi.update">
 		</span>
 		<span class="empty">
 			<btn-group-me data="btnEmpty"></btn-group-me>
 		</span>
 	</div>
 </div>
<div class = "gridBox">
	<div class = 'grid'>
	 	<list-grid config="gridConf.gridConf" api="gridApi"></list-grid>
	</div>
</div>



componentRegister(function($app,$appConfig){

    var componentPath=$appConfig.COMM+'/component';

    /*扩展配置(组件引用)*/
    $app.extendConfig({

        'tip':componentPath+'/form/tip.js',
        'iconsSelect':componentPath+'/form/icons-select.js',
        'pageMenu':componentPath+'/list/page-menu.js',
        'backStageMenu':componentPath+'/menu/back-stage-menu.js',
        'singleMenu':componentPath+'/menu/single-menu.js',
        'newsCenterList':componentPath+'/list/news-center-list.js',
        // 'ztreeList':componentPath+'/list/ztree-list.js',
        'menuMaster':componentPath+'/menu/menu-master.js',
        'btnGroupMe':componentPath+'/button/btn-group-me.js',
        'currentLocation':componentPath+'/currentLocation/current-location.js',
        'advancedSearch':componentPath+'/list/advanced-search.js',
        'queryCriteria':componentPath+'/queryCriteria/query-criteria.js',
        'homeMenu':componentPath+'/homeMenu/home-menu.js',
        // 'dataGrid':componentPath+'/list/data-grid.js',
        'tabRightNav': componentPath+'/tab/right-nav.js',
        'tabLeftNav': componentPath+'/tab/left-nav.js',
        'tabTopNav': componentPath+'/tab/top-nav.js',
        'batchAdd': componentPath+'/batchAdd/batch-add.js',
        'dashboard': componentPath+'/dashboard/dashboard.js',
        'fuzzyQuery': componentPath+'/fuzzyQuery/fuzzy-query.js',
        'listDetail':componentPath+'/list/list-detail.js',
        'listHomePage':componentPath+'/list/list-home-page.js',

        'batchCondition':componentPath+'/batchCondition/batch-condition.js',
        'advancedQuery':componentPath+'/advancedQuery/advanced-query.js',
        'app':componentPath+'/app/index.js',
        'dashboardLayout':componentPath+'/dashboardLayout/dashboard-layout.js',
        'buttonGroup':componentPath+'/buttonGroup/button-group.js',
    })
});
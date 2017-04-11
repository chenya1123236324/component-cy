componentRegister(function($app,$appConfig){

    var componentPath=$appConfig.FRAME_ROOT+'/comm/component';

    /*扩展配置(组件引用)*/
    $app.extendConfig({
        'For':componentPath+'/comm/for.js',
        'listGrid':componentPath+'/list/list-grid.js',
        'listTree':componentPath+'/list/list-tree.js',
        'listIcon':componentPath+'/list/list-icon.js',
        'template':componentPath+'/render/template.js',
        'select':componentPath+'/form/form-select.js',
        'formBatch':componentPath+'/form/form-batch.js',
        'formLayout':componentPath+'/form/form-layout.js',
        'formLayoutEdit':componentPath+'/form/form-layout-edit.js',
        'input':componentPath+'/form/form-input.js',
        'tabScroll':componentPath+'/tab/tab-scroll.js',
        //加载的动画
        'loadingLineScalePulseOut':componentPath+'/loading/loading-line-scale-pulse-out.js',
        //应用个性化组件
        'app':componentPath+'/app/index.js'
    })
});
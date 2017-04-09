/**
 * Created by xiyuan on 16-12-23.
 */
app(function($app,$appConfig){

    var appComponentPath=$appConfig.FRAME_ROOT+'/comm/component/app';

    /*扩展配置(组件引用)*/
    $app.extendConfig({
        //导航
        'appNav':appComponentPath+'/app-nav.js',
        //当前页面位置
        'appLocation':appComponentPath+'/app-location.js',
        //组织机构
        'appOrganisation':appComponentPath+'/app-organisation.js'
    })

});
/**
 * 项目路径配置
 */
pathConfig(function($app,$appConfig){

    //取出配置中的数据(项目根路径)
    var cwd=$appConfig.CWD;

    /*应用路径配置*/
    $app.path({
        // 路径配置
        paths: {
            'APP':cwd+'/app',
            'HOME':cwd+'/app/home',
            'COMPONENT':cwd+'/app/component',
            'ADMIN':cwd+'/app/admin',
            'COMM':$appConfig.COMM,
            'DEMO':$appConfig.FRAME_ROOT+'/app/demo',
            'PLUGINS':$appConfig.FRAME_ROOT+'/desktop/plugins',
			'TOOLS':$appConfig.FRAME_ROOT+'/comm/tools'
        },

        // 映射配置
        maps: {

        }
    });

});
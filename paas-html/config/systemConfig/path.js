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
            'DEMO':cwd+'/app/demo',
            'HOME':cwd+'/app/home',
            'COMM':cwd+'/comm',
            'TOOLS':cwd+'/comm/tools',
            'PLUGINS':cwd+'/desktop/plugins'
        },

        // 映射配置
        maps: {

        }
    });

});
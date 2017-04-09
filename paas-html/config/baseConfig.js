
/**
 * 主配置文件
 * $app 配置对象
 * $appConfig 配置文件的自定义配置(以备通用的变量定义)
 */
baseConfig(function($app,$appConfig){

    var FRAME_COMM_PATH=$appConfig.FRAME_ROOT+'/comm';

    /*扩展配置*/
    $app.extendConfig({
        //指令注册
        directiveRegister:FRAME_COMM_PATH+'/directive/index.js',
        //组件注册
        componentRegister:FRAME_COMM_PATH+'/component/index.js'
    });

});
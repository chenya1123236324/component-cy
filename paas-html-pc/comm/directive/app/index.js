/**
 * Created by xiyuan on 16-12-28.
 */
app(function($app,$appConfig){

    var appDirectivePath=$appConfig.COMM+'/directive/app';

    /*扩展配置(指令引用)*/
    $app.extendConfig({
        // 'appMenu':appDirectivePath+'/$-app-menu.js'
    })

});
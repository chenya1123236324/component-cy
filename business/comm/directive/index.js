directiveRegister(function ($app,$appConfig) {

    var directivePath=$appConfig.COMM+'/directive';

    /*扩展配置(组件引用)*/
    $app.extendConfig({
        //应用指令
        'app':directivePath+'/app/index.js'
    })

});

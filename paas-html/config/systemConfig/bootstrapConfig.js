/**
 * Created by xiyuan on 16-6-8.
 */
bootstrapConfig(function ($app, $appConfig) {
    $app.bootstrap(function () {

        //indexeddb兼容
        window.indexedDB || $packages('{TOOLS}/sys/indexeddbshim.min.js',function () {
            window.indexedDB=window.shimIndexedDB;
        })

    });

});
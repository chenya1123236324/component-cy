/**
 * Created by xiyuan on 16-6-8.
 */
bootstrapConfig(function ($app, $appConfig) {
    $app.bootstrap(function () {

        //获取缓存中的地址
        var host = $FRAME.getConfig('API_HOST', 'apiUrlMap'),
            gateway = $FRAME.getConfig('API_GATEWAY', 'apiUrlMap'),
            netStateWorker=new Worker($appConfig.COMM+'/taskWorkers/app/netState.js');

        //兼容 默认不填写 api的网关路径
        if (!host.match(new RegExp(gateway))) {
            host += '/' + gateway;
        }

        //监听网络情况
        netStateWorker.addEventListener('message',function (event) {
            switch (event.data.state){
                case true:
                    window.navigator.onnet=true;
                    window.dispatchEvent(new Event('onnet'));
                    break;
                case false:
                    window.navigator.onnet=false;
                    window.dispatchEvent(new Event('offnet'));
            }
        },false);

        //启动网络监听
        /*netStateWorker.postMessage({
            type:'start',
            url:host+'/websocket'
        })*/

        //indexeddb兼容
        window.indexedDB || $packages('{TOOLS}/sys/indexeddbshim.min.js',function () {
            window.indexedDB=window.shimIndexedDB;
        })




    });

});
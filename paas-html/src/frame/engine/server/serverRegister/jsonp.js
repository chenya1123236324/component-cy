$serverManage.register('jsonp', {
    //服务请求
    request: function (stroage, interceptors) {
        $jsonp({
            url: stroage.url,
            type: 'js',
            element: false,
            callbackName:'callback',
            jsonpParameter:false,
            jsonpCallback: stroage.method,
            complete:function () {
                if(arguments.length){
                    typeof stroage.success === 'function' && stroage.success.apply(this,arguments)
                }else{
                    typeof stroage.error === 'function' && stroage.error.apply(this,arguments)
                }
                typeof stroage.receive === 'function' && stroage.receive.apply(this,arguments)
            }

        })
    }
});
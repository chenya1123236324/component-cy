/**
 * Created by xiyuan on 16-8-15.
 */

function serverVm() {
    var i=~0,
        __stroage__=[],
        argLen=arguments.length,
        args=[].slice.call(arguments);

    while (++i<argLen){
        __stroage__.push(new serverInterface(args[i],__stroage__));
    }

    if(__stroage__.length === 1 ){
        return __stroage__[0];
    }

    //接口数据处理
    function handle(active,arg) {
        __stroage__.forEach(function (instance) {
            instance[active].apply(instance,arg);
        });
    }

    var interface={
        get:function (index) {
            return __stroage__[index];
        },
        setConf:function () {
            handle('setConf',arguments);
            return interface;
        },
        send:function () {
            handle('send',arguments);
        },
        cache:function () {
            handle('cache',arguments);
            return interface;
        },
        responseType:function () {
            handle('responseType',arguments);
            return interface;
        },
        receive:function () {
            [].slice.call(arguments).forEach(function (val,index) {
                __stroage__[index].receive(val);
            });
            return interface;
        },
        success:function () {
            [].slice.call(arguments).forEach(function (val,index) {
                __stroage__[index].success(val);
            });
            return interface;
        },
        fail:function () {
            [].slice.call(arguments).forEach(function (val,index) {
                __stroage__[index].fail(val);
            });
            return interface;
        },
        allReceive:function (fn) {
            if(typeof fn === "function"){
                var count=__stroage__.length,
                    res=[];

                __stroage__.forEach(function (instance,index) {
                    instance['receive'].call(instance,function(data,xhr){
                        res[index]={data:data,req:xhr};
                        if(!--count){
                            fn.apply(this,res);
                        }
                    });
                });
            }

            return interface;
        }
    };

    //对外提供的接口
    return interface;
}

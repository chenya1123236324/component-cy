/**
 * Created by xiyuan on 16-5-18.
 */

var $listen=(function(){

    //监听器对象
    var listen=function(){
        this.data={};
        this.handleFns=[];
        this.receiveFns=[];
    };

    //监听器初始化方法(主要初始化内部数据)
    listen.prototype.init=function(fn){

        var $appConfigFn=function(){
            var arg=arguments;
            switch (arg.length){
                case 1:
                    if(typeof arg[0] === 'object'){
                        $object.extends($appConfigFn,arg[0]);
                    }else{
                        $log.warning('[主配置文件]配置设置参数有误!')
                    }
                    break;
                case 2:
                    if(typeof arg[0] !== 'string'){
                        $log.warning('[主配置文件]配置设置参数有误!')
                    }else{
                        $appConfigFn[arg[0]]=arg[1];
                    }
                    break;
            }
        };

        fn($appConfigFn);

        var _$appConfigFn={};
        for(var key in $appConfigFn){
            _$appConfigFn[key]=$appConfigFn[key]
        }

        $object.extends(this.data,_$appConfigFn);
        return this;

    };

    //监听器触发
    listen.prototype.trigger=function(){
        var handleFns=this.handleFns,
            receiveFns=this.receiveFns,
            i=~0,l=handleFns.length,
            $i,$l=receiveFns.length,
            resData,
            dataObject=this.data||{
                data:this.data
            };
        //遍历执行数据处理
        while (++i<l){
            //检查处理器反馈的数据
            if(resData=handleFns[i].apply(dataObject,arguments)){
                $i=~0;
                while (++$i<$l){
                    //触法数据接收回调
                    receiveFns[$i].call(dataObject,resData);
                }
            }
        }
        return this;
    };

    //监听器处理器
    listen.prototype.handle=function(fn){
        this.handleFns.push(fn);
        return this;
    };

    //数据接收器
    listen.prototype.receive=function(fn){
        this.receiveFns.push(fn);
        return this;
    };

    //对外提供数据接口
    return function (){
        return new listen();
    }

})();

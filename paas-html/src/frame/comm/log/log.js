/**
 * Created by xiyuan on 15-11-24.
 */
(function(factory,exports){
    if (typeof define === "function" && define.amd) {

        define('log', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('log', [], function (require) {
            return factory();
        });

    } else {
        exports.$$LogInterface = factory();
    }

})(function(){
    'use strict';

    /*日志模型*/
    function LogInterface(){
        //监听存储器
        this.__EVENTS__={
            eventList:[],
            typeEventList:{}
        }
    };

    /*添加日志监听处理*/
    LogInterface.prototype.addEventListener=function(type,fn){
        var events=this.__EVENTS__,
            eventList=events.eventList,
            typeEventList=events.typeEventList;
        fn||(fn=type,type=null);
        typeof fn === "function" && (type?(typeEventList[type]||(typeEventList[type]=[])).push(fn):eventList.push(fn));
    };

    /*日志触发处理*/
    LogInterface.prototype.eventEmit=function(type,arg){
        var events=this.__EVENTS__,
            eventList=events.eventList,
            typeEventList=events.typeEventList;

        //执行全局日志事件
        var len=eventList.length,i= 0,emit;
        while(i<len){
            emit=eventList[i];
            typeof emit === "function" && emit.apply({type:type},arg);
            i++;
        }
        //执行日志类型事件
        len=typeEventList[type].length,i=0;
        while(i<len){
            emit=typeEventList[type][i];
            typeof emit === "function" && emit.apply({type:type},arg);
            i++;
        }
    };

    /*添加日志类型*/
    LogInterface.prototype.addLogType=function(type,emit){
        var self=this,
            events=this.__EVENTS__,
            typeEventList=events.typeEventList;
        //创建日志方法
        var emits=typeEventList[type]||(typeEventList[type]=[]);
        //typeof emit === "function" && emits.push(emit);
        this[type]=function(){
            return function (){
                var msg=typeof emit === "function" ? emit.apply({type:type},arguments) :'';
                return self.eventEmit(type,arguments),msg;
            }
        }(type,emit);
    };

    /*var log=new LogInterface();

    /!*错误日志*!/
    log.addLogType('error',function(type,msg){
        console.log(type,msg)
    })

    /!*警告日志*!/
    log.addLogType('warning',function(){
        console.log('warning',arguments)
    })

    /!*控制台输出日志*!/
    log.addLogType('console',function(){
        console.log('console')
    })*/

    return LogInterface;
},this);


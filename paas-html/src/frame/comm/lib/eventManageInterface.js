/**
 * Created by xiyuan on 15-12-2.
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        define('eventManageInterface',['type'], factory);

    } else if (typeof define === "function" && define.cmd) {

        define('eventManageInterface', [type], function (require) {
            return factory();
        });

    } else {
        window.eventManageInterface = factory(type);
    }

})(function (type) {
    'use strict';
    var eventManage=function(){
        this.eventStroage={};
    };

    //监听
    eventManage.prototype.$watch=function(eventName,callback){
        if(typeof callback !== "function"){
            return false
        }
        var eventStroage=this.eventStroage[eventName];
        this.eventStroage[eventName]=eventStroage?eventStroage.push(callback) && eventStroage:[callback];
    };

    //触发 @eventName : 事件名称  @target : 事件对象
    eventManage.prototype.$apply=function(eventName,target){
        var eventStroage=this.eventStroage[eventName];
        if(type.isArray(eventStroage)){
            var len=eventStroage.length,i=~0,target=target||{},eventObject={
                target:target
            };
            //设置事件目标事件类型
            target.type=target.type||eventName;

            //执行事件监听
            while (++i<len){
                eventStroage[i].call(target,eventObject);
            }
        }
    };

    //销毁
    eventManage.prototype.$destroy=function(eventName,callback){
        var eventStroage=this.eventStroage[eventName];
        if(type.isArray(eventStroage)){
            typeof callback === 'function' ? function(){
                //执行事件回调匹配
                while (i++,i<len){
                    if(eventStroage[i].toString() === callback.toString()){
                        eventStroage.splice(i,1);
                        return
                    }
                }
            }():delete this.eventStroage[eventName];
        }
    };

    return eventManage;

});
/**
 * Created by xiyuan on 15-12-3.
 */

var $eventManage=this.$eventManage=new $eventManageInterface();
(function (exports) {
    'use strict';

    /*监听配置初始化开始*/
    $eventManage.$watch('config:init',function(){
        //console.log(arguments,this,'config:init')
    });

    /*监听配置加载*/
    $eventManage.$watch('config:load',function(event){

    });

    /*监听配置初始化完毕*/
    $eventManage.$watch('config:end',function(event){
        //检查是否初次加载配置
        if(this.__$$ID$$__ === 1){

        }
    });

    /*页面渲染事件*/
    $eventManage.$watch('page:render',function(event){
        //代理框架外部页面渲染事件
        $FRAME.$event.$apply('page:render',this)
    });

})(this);
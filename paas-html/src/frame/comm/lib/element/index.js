/**
 * Created by xiyuan on 15-12-4.
 */
//@make : start

!function(factory){
    if (typeof define === "function" && define.amd) {

        define('element',['type'], factory);

    } else if (typeof define === "function" && define.cmd) {

        define('element', ['type'], function (require) {
            return factory();
        });

    } else {
        window.element = factory(type);
    }

}(function($type){
    'use strict';

    /*基础处理*/
    Include('base.js');

    /*选择器*/
    Include('query.js');

    /*事件处理*/
    Include('event.js');

    return $element;
});

//@make : end
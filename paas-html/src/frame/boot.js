/**
 * Created by xiyuan on 15-11-30.
 */
//文件引入
var Include = new Function();
//@make : start

new function ($FRAME) {

    /*公共代码*/
    Include('comm/index.js');

    /*内部框架处理代码*/
    Include('inside/index.js');

    /*框架渲染引擎*/
    Include('engine/index.js');

    /*应用初始化*/
    Include('init/index.js');

    /*第三方扩展*/
    Include('init/extend/index.js');


}(
    /*框架接口*/
    window.$FRAME = {}
);

//@make : end
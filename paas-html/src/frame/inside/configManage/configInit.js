/**
 * Created by xiyuan on 15-12-3.
 */
(function (exports) {
    'use strict';

    $configManage.configInit = function (callback) {
        //检查应用是否配置
        $configManage.configCheck(callback);
        $configManage.rewrite=true;

    };

})(this);

/**
 * Created by xiyuan on 15-12-2.
 */

~function (exports) {
    'use strict';

    $configManage.configCheck = function (callback) {
        //检测应用是否配置
        if (!$configManage.rewrite) {

            var configUrl = document.querySelector('[app-config]').getAttribute('app-config');
            if (!configUrl) {
                $log.warning('应用配置未设置，启用默认配置!');
            } else {
                $jsonp({
                    url: configUrl,
                    jsonpCallback: 'config',
                    complete: function () {
                        var arg = arguments,
                            len = arg.length,
                            i = 0;

                        //检查是否成功
                        if(len){

                            //返回的数据处理(检查是否有多个回调)
                            if (this.many) {


                            } else {
                                //请求完毕后处理配置解析
                                $configManage.configParse(arg[i],function(info){
                                    typeof callback === "function" && callback();
                                });
                            }
                        }

                    }
                });

            }
        }

    };

}(this);

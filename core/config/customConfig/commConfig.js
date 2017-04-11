/**
 * Created by xiyuan on 17-2-24.
 */
commConfig(function ($app,$appConfig) {

    //数据接口配置
    $app.customConfig('comm', {
        PATH:{
            FRAME_ROOT:$appConfig.FRAME_ROOT
        }
    });

});
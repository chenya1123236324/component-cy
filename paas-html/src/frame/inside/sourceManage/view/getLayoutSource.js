/**
 * Created by xiyuan on 16-5-17.
 */

var _layoutSource={};

function getLayoutSource(url,requestType,callbackFn){
    //页面布局资源获取
    $sourceManage.sourceGet($pathManage.zipPathParse(url),{
        callbackName: 'layout',
        sourceType: 'custom',
        getType:requestType,
        sourceName:'页面布局'
    },function(res){
        typeof callbackFn === 'function' && callbackFn(res);
    })
};
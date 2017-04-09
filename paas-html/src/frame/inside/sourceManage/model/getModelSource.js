/**
 * Created by xiyuan on 16-5-18.
 */
function getModelSource(model,callbackFn){

    model=model.replace(/@:([\w-]+)$/,'@$1');
    //路径解析并提取资源
    var pathSourceInfo = $pathManage.pathParse(model, 'model'),
        pathSource = pathSourceInfo.source,
        pathSlice = pathSourceInfo.slice,
        afterPath = pathSourceInfo.afterPath,
        modulePath = pathSourceInfo.modulePath,
        fileSuffixs = _systemConfig.fileSuffix,
        callbackNames = _systemConfig.callbackName;

    sourceGet(pathSource, {
        callbackName: callbackNames.model,
        fileSuffix: fileSuffixs.model,
        slice: pathSlice,
        sourceType: 'model'
    }, function (source, sourceType) {
        //添加 模块路径
        this.modulePath=modulePath;
        this.afterPath=afterPath;
        typeof callbackFn === 'function' && callbackFn.apply(this,arguments);
    });
}



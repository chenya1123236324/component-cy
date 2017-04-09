/**
 * Created by xiyuan on 16-5-18.
 */
function getControllerSource(controller, callbackFn, parameter) {
    parameter = parameter || {};
    switch ($type.getType(controller)) {
        case 'function':
            controller = controller(parameter);
        case 'string':
            controller = controller.replace(/@:([\w-]+)$/, '@$1');
            //路径解析并提取资源
            var pathSourceInfo = $pathManage.pathParse(controller, 'controller'),
                pathSource = pathSourceInfo.source,
                pathSlice = pathSourceInfo.slice,
                afterPath = pathSourceInfo.afterPath,
                modulePath = pathSourceInfo.modulePath,
                fileSuffixs = _systemConfig.fileSuffix,
                callbackNames = _systemConfig.callbackName;

            sourceGet(pathSource, {
                callbackName: callbackNames.controller,
                fileSuffix: fileSuffixs.controller,
                slice: pathSlice,
                sourceType: 'controller'
            }, function (source, sourceType) {
                //添加 模块路径
                this.afterPath=afterPath;
                this.modulePath=modulePath;
                typeof callbackFn === 'function' && callbackFn.apply(this, arguments);
            });

            break;
    }
}



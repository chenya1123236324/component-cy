/**
 * Created by xiyuan on 16-5-18.
 */

function getViewSource(view,callbackFn,parameter,_tplSuffix){
    parameter=parameter||{};

    var fileSuffixs = _systemConfig.fileSuffix,
        callbackNames = _systemConfig.callbackName,
        tplSuffix = _tplSuffix||$configStroage.tplSuffix,
        viewRequire = $configStroage.viewRequire,
        tplParameter;

    switch ($type.getType(view)) {
        case 'function':
            view = view(function (option) {
                tplSuffix = option.tplSuffix || option.suffix || tplSuffix;
                viewRequire = option.viewRequire || option.requireType || viewRequire;
                tplParameter = option.parameter || option.tplParameter;
            }, parameter);
        case 'string':
            //view=view.replace(/@:([\w-]+)$/,'@$1');
            //路径解析

            var pathSourceInfo = $pathManage.pathParse(view, 'view'),
            pathSource = pathSourceInfo.source,
            pathSlice = pathSourceInfo.slice;

            //视图文件获取模式纠正文件路径
            if(viewRequire === 'ajax'){
                var pathValue=pathSource[pathSource.length-1].value;
                if(pathSlice){
                    pathValue=pathValue.replace('.'+_systemConfig.fileSuffix['view'],'');
                }
                pathSource[pathSource.length-1].value=pathValue+'/'+(pathSlice||$configStroage.defaultView)
            }

            sourceGet(pathSource, {
                callbackName: callbackNames.view,
                fileSuffix: fileSuffixs.view,
                slice: pathSlice||$configStroage.defaultView,
                sourceType: 'view',
                tplSuffix: tplSuffix.replace(/^\.+/, ''),
                getType: viewRequire,
                parameter: tplParameter && typeof tplParameter === 'object' ? tplParameter : {}
            }, function (source, sourceType) {
                typeof callbackFn === 'function' && callbackFn.apply(this,arguments);
            });

            break;
    }


}
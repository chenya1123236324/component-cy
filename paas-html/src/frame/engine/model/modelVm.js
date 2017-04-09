/**
 * Created by xiyuan on 16-5-18.
 */
function modelVm(modelPath, $referer) {
    // console.log(modelPath, $referer)
    //实例化回调
    var modelObj,
        callbackFn,
        initCallbackFn,
        modelCode,
        This = {
            realPath: '',
            pathSlice: ''
        },
        includeModel = [],
        modelSource,
        $modulePath = $referer ? $referer.__storage__.__info__.modulePath : '';

    //路径转换(比对配置中的路径)
    function pathToUrl(path) {
        var $src = $configStroage.pathList.src,
            paths = $src.paths,
            sort = $configStroage.pathList.maps.sort,
            sortList = $configStroage.pathList.maps.list,
            key, value, i, l, $i, $l, $value, tmpValue, rflag;

        //检查是否匹配到path路径
        key = paths[path] || path;
        i = ~0;
        l = sort.length;

        //路径替换
        maps:
            while (++i < l) {
                value = sortList[sort[i]];
                $i = ~0;
                $l = value.length;
                while (++$i < $l) {
                    $value = value[$i];
                    //进行map匹对
                    if (key.match($value.regexp) && ((tmpValue = key.replace($value.regexp, '')) === '' || tmpValue.indexOf('/') === 0)) {
                        key = $value.value + tmpValue;
                        rflag = true;
                        break maps;
                    }
                }

            }

        return key;

    }

    //执行Model处理(处理依赖的model与工具包)
    function handleExec(modelCode, modelObj, includeModel, callback) {
        var i = ~0,
            l = includeModel.length,
            modelName,
            packages = [],
            packagePath,
            packagesFlag = [];

        callback = typeof callback === "function" ? callback : function () {
        };

        while (++i < l) {
            modelName = includeModel[i];
            packagePath = modelName.replace(/^\$:/, '');
            //判断是否js模块
            if (packagePath !== modelName) {
                packagesFlag.push(i);
                packagePath = packagePath.indexOf('@') ? packagePath : pathToUrl($modulePath) + '/' + packagePath.slice(1);
                packages.push(packagePath);
            } else {
                includeModel[i] = controllerImage.prototype.model.call(modelObj, modelName);
            }
        }
        //数据模型执行
        if (packages.length) {

            //添加包依赖的接收函数
            packages.push(function () {
                var arg=arguments;
                packagesFlag.forEach(function (key, index) {
                    includeModel[key] = arg[index];
                });

                modelCode.apply(modelObj, includeModel);
                callback(modelCode)
            });

            //执行包依赖加载
            $packages.apply(this,packages);
        } else {
            modelCode.apply(modelObj, includeModel);
            callback(modelCode)
        }
    }


    //检查(内建/数据/外部)模型
    if (typeof modelPath === "object") {
        //实例化model
        callbackFn = modelObj = new modelImage($referer ? $referer.__storage__.__info__ : null);

        //内建model
        if (modelCode = modelPath.modelCode) {
            includeModel = modelPath.includeModel;

            handleExec(modelCode, modelObj, includeModel);

            //纯数据模型
        } else {
            callbackFn.$model = modelPath.data;
        }

        //引入外部数据模型
    } else {
        $sourceManage.getModelSource(modelPath, function (source, sourceType) {
            This = this;
            $modulePath = this.modulePath;
            modelObj = new modelImage(this);

            //提取数据模型执行码
            if (source && (modelSource = source[this.pathSlice] || $log.warning('[数据模型] ' + this.realPath + '中' + this.pathSlice + '模型不存在!') && false)) {
                i = 0;
                l = modelSource.length;

                initCallbackFn ? initCallbackFn(modelObj, This): initCallbackFn=modelObj;

                modelSourceEnd:
                    while (++i < l) {
                        switch ($type.getType(modelSource[i])) {
                            case 'function':
                                modelCode = modelSource[i];
                                break modelSourceEnd;
                            case 'string':
                                includeModel.push(modelSource[i]);
                                break;
                            case 'array':
                                includeModel = includeModel.concat(modelSource[i]);
                                break;
                        }
                    }

                //实例化引入的model
                handleExec(modelCode, modelObj, includeModel, function () {
                    //兼容同步与异步回调(返回数据model)
                    callbackFn ? callbackFn(modelObj, This) : (callbackFn = modelObj);
                });

            } else {

                initCallbackFn ? initCallbackFn(modelObj, This): initCallbackFn=modelObj;
                //兼容同步与异步回调
                callbackFn ? callbackFn(modelObj, this) : (callbackFn = modelObj);
            }

        });
    }

    //对外提供数据模型实例化
    return {
        init:function (callback) {
            initCallbackFn ?callback(initCallbackFn, This): initCallbackFn=callback;
        },
        load:function (callback) {
            //兼容同步与异步回调
            callbackFn ? callback(callbackFn, This) : callbackFn = callback;
        }
    }
}
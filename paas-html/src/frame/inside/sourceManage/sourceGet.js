/*资源获取*/
function sourceGet(pathSource, option, callbackFn) {
    new findPathSource(pathSource, option, callbackFn);
};

/*资源存储容器*/
var __sourceStorage__ = {};

//存储当前请求的资源信息
var sourceTask = {};

/*路径资源查找*/
function findPathSource() {
    this._init_.apply(this, arguments);
};

function nofindFile(This) {
    //执行资源回调
    This.callbackFn(undefined, This.sourceType);
}

findPathSource.prototype._init_ = function (pathSource, option, callbackFn) {
    var defaultSlice = 'index',
        callbackName = option.callbackName,
        fileSuffix = option.fileSuffix,
        pathSlice = option.slice || defaultSlice,
        parameter = option.parameter || {},
        sourceType = option.sourceType;

    this.findPath = '';
    this.nowPath = '';
    this.finalPath = '';
    this.zipFlag = false;
    this.end = false;
    this.nowZipSource = null;
    this.rootZipName = '';
    this.sourceName = option.sourceName || '自定义';
    this.pathSource = pathSource;
    this.callbackName = callbackName;
    this.fileSuffix = fileSuffix;
    this.pathSlice = pathSlice;
    this.parameter = parameter;
    this.sourceType = sourceType;
    this.tplSuffix = option.tplSuffix;
    this.getType = option.getType;
    this.callbackFn = callbackFn || function () {
        };

    //获取资源
    this.getSource();

};

//资源处理
findPathSource.prototype.__handle__ = function () {
    var This = this,
        nowZipSource = this.nowZipSource,
        callbackName = this.callbackName,
        fileSuffix = this.fileSuffix,
        sourceType = this.sourceType,
        filePath = $path.normalize(this.findPath),
        sourcePath = filePath,
        tplSuffix = this.tplSuffix || '',
        getType = this.getType,
        fileSource,
        fileCode,
        _tmpCallback,
        $res = {},
        sourceTypeName;


    switch (sourceType) {
        case 'view':
            sourceTypeName = '视图模板';
            break;
        case 'controller':
            sourceTypeName = '控制器';
            break;
        case 'model':
            sourceTypeName = '数据模型';
            break;
        case 'custom':
            sourceTypeName = this.sourceName;
            break;
        case 'define':
            sourceTypeName = '工具包';
            break;
    }
    this.sourceName = sourceTypeName;

    //检测资源是zip否压缩包
    if (nowZipSource) {

        //用来收集Jsonp数据
        var many,
            viewTypeJsonp = true,
            jsonpStorage,
            jsonpHandle = function () {
                //用来处理一个请求里有多个回调
                if (jsonpStorage) {
                    !many && (jsonpStorage = [jsonpStorage], many = true)
                    jsonpStorage.push(arguments)
                } else {
                    jsonpStorage = arguments;
                }
            };

        //代码运行沙箱
        switch (sourceType) {
            case 'view':
                sourcePath = sourcePath.replace(/\/+$/, '/' + $configStroage.defaultView);
                if (getType !== 'jsonp') {
                    viewTypeJsonp = false;
                    sourcePath = sourcePath.replace(new RegExp('\\.' + tplSuffix + '$'), '') + '.' + tplSuffix;
                }
            case 'custom':
                if (getType !== 'jsonp' && viewTypeJsonp) {
                    viewTypeJsonp = false;
                }
            case 'controller':
            case 'define':
            case 'model':
                if (viewTypeJsonp) {
                    sourcePath = sourcePath.replace(new RegExp((fileSuffix ? ('\\.' + fileSuffix) : '') + '(\\.js)?$'), '') + (fileSuffix ? '.' + fileSuffix : '') + '.js';
                }
                fileSource = nowZipSource.file(sourcePath);
                if (!fileSource) {
                    $log.warning('压缩包:' + $path.resolve(this.nowPath).replace(/\/$/, '') + ' 中缺失资源【' + sourcePath.replace(/^\/?\w+\//, '') + '】');
                    nofindFile(This);
                    return;
                }
                fileCode = fileSource.asText();

                //针对view的ajax类型请求
                if (!viewTypeJsonp) {
                    //执行资源回调
                    This.callbackFn(fileCode, sourceType);
                    break;
                }

                //jsonp代码沙箱执行
                eval(
                    '_tmpCallback=' + callbackName +
                    ';var ' + callbackName + '=jsonpHandle;' +
                    fileCode + ';' +
                    callbackName + '=_tmpCallback'
                );

                //jsonp数据转换提取
                (function (res) {
                    var i = ~0, l = arguments.length, v;
                    //检查是否有多个回调
                    if (many) {
                        if (sourceType !== 'view') {
                            while (++i < l) {
                                v = arguments[i];
                                //检查当前参数是否只有一个
                                if (v.length === 1) {
                                    $res[i] = v;
                                } else {
                                    $res[v[0]] = v;
                                }
                            }
                        } else {
                            $res = arguments[0];
                        }

                    } else {
                        if (sourceType !== 'view') {
                            $res[arguments.length === 1 ? 0 : arguments[0]] = arguments;
                        } else {
                            $res = res;
                        }
                    }
                    //执行资源回调
                    This.callbackFn($res, sourceType);

                }).apply(this, jsonpStorage);

        }
        This.realPath = $path.normalize(This.nowPath + sourcePath.replace(/^[^\/\\]*[\/\/]+/, ''));
    } else {

        var _filePath, tplText;

        //资源获取[通过ajax或jsonp方式获取资源]
        switch (sourceType) {
            case 'view':
                filePath = filePath.replace(/\/+$/, '/' + $configStroage.defaultView);
                if (getType !== 'jsonp') {
                    _filePath = filePath.replace(new RegExp('\\.' + tplSuffix + '?$'), '') + '.' + tplSuffix;
                    if (tplText = this.getCache(_filePath)) {
                        //执行资源回调
                        this.callbackFn(tplText, sourceType);
                    } else {
                        //通过ajax获取视图模板
                        $net.ajax({
                            type: 'GET',
                            url: _filePath,
                            dataType: 'html',
                            data: this.parameter,
                            success: function (tplText) {
                                This.pushCache(_filePath, tplText);
                                //执行资源回调
                                This.callbackFn(tplText, sourceType);
                            },
                            error: function () {
                                //执行查找资源失败回调
                                nofindFile(This);
                                $log.warning(sourceTypeName + '文件【' + _filePath + '】不存在!')
                            }
                        });
                    }

                    break;
                }
            case 'custom':
                if (getType !== 'jsonp') {
                    _filePath = tplSuffix ? filePath.replace(new RegExp('\\.' + tplSuffix + '?$'), '') + '.' + tplSuffix : filePath;
                    if (tplText = this.getCache(_filePath)) {
                        //执行资源回调
                        this.callbackFn(tplText, sourceType);
                    } else {
                        //通过ajax获取视图模板
                        $net.ajax({
                            type: 'GET',
                            url: _filePath,
                            dataType: 'html',
                            data: this.parameter,
                            success: function (tplText) {
                                This.pushCache(_filePath, tplText);
                                //执行资源回调
                                This.callbackFn(tplText, sourceType);
                            },
                            error: function () {
                                //执行查找资源失败回调
                                nofindFile(This);
                                $log.warning(sourceTypeName + '文件【' + _filePath + '】不存在!')
                            }
                        });
                    }

                    break;
                }
            case 'controller':
            case 'define':
            case 'model':
                _filePath = filePath.replace(/\/+$/, '').replace(new RegExp((fileSuffix ? ('\\.' + fileSuffix) : '') + '(\\.js)?$'), '') + (fileSuffix ? '.' + fileSuffix : '') + '.js';
                if ($res = this.getCache(_filePath)) {
                    //执行资源回调
                    this.callbackFn($res, sourceType);
                } else {
                    $res = {};
                    //记录请求资源任务(避免多次调用)
                    sourceTask[_filePath] = sourceTask[_filePath] || [];
                    sourceTask[_filePath].push(This);

                    //同时多次同样资源合成
                    if (sourceTask[_filePath].length > 1)break;

                    $jsonp({
                        url: _filePath,
                        type: 'js',
                        element: false,
                        //jsonpParameter:false,
                        jsonpCallback: callbackName,
                        success: function (res) {
                            var i = ~0, l = arguments.length, v;
                            //检查是否有多个回调
                            if (this.many) {
                                if (sourceType !== 'view') {
                                    while (++i < l) {
                                        v = arguments[i];
                                        //检查当前参数是否只有一个
                                        if (v.length === 1) {
                                            //$res[i] = v;
                                            $res['index'] = v;
                                        } else {
                                            $res[v[0]] = v;
                                        }
                                    }
                                } else {
                                    $res = arguments[0];
                                }
                            } else {
                                if (sourceType !== 'view') {
                                    $res[arguments.length === 1 ? 0 : arguments[0]] = arguments;
                                } else {
                                    $res = res;
                                }
                            }
                            This.pushCache(_filePath, $res);

                            //执行资源回调
                            if (v = sourceTask[_filePath]) {
                                i = ~0;
                                l = v.length;
                                while (++i < l) {
                                    v[i].callbackFn($res, sourceType);
                                }
                                delete sourceTask[_filePath];
                            }

                        },
                        error: function () {
                            $log.warning(sourceTypeName + '文件【' + _filePath + '】不存在!');

                            var v, i, l;
                            //执行查找资源失败回调//执行资源回调
                            if (v = sourceTask[_filePath]) {
                                i = ~0;
                                l = v.length;
                                while (++i < l) {
                                    nofindFile(v[i]);
                                }
                                delete sourceTask[_filePath];
                            }
                        }

                    });
                }
        }
        This.realPath = _filePath;
    }
};

//缓存资源如zip和单独的文件等
findPathSource.prototype.pushCache = function (pathKey, source) {
    __sourceStorage__[pathKey] = {
        source: source,
        count: 1
    };
};

//取出缓存资源
findPathSource.prototype.getCache = function (pathKey) {
    var source = __sourceStorage__[pathKey];
    if (source) {
        source.count += 1;
        source = source.source;
    }
    return source;
};

//获取路径资源
findPathSource.prototype.getSource = function (index) {
    index = index || 0;

    if (this.pathSource.length <= index) {
        this.end || this.__handle__();
        return;
    }
    var This = this,
        pathSource = this.pathSource,
        v = pathSource[index++],
        pathType = v.type,
        vPath = v.value,
        zipFlag = this.zipFlag,
        asynchronous = false,
        zipPath,
        nowZip = this.nowPath.replace(/[\\\/]*$/, ''),
        zipSource;

    //用作转换地址为绝对地址
    if (index === 1) {
        vPath = $path.resolve(vPath, $path.cwd);
    }

    this.findPath += (this.findPath ? '/' : '') + vPath;
    zipPath = pathType === 'zip' ? $path.normalize(this.findPath.replace(/(?:\.zip\/?$|\/*$)/i, '.zip')) : '';

    if (zipFlag) {
        switch (pathType) {
            case 'url':
                if (this.pathSource.length <= index) {
                    vPath = $path.normalize(this.rootZipName + '/' + vPath);
                } else {
                    this.nowPath += zipPath + '/';
                }
                break;
            case 'zip':
                this.nowPath += zipPath + '/';
                zipPath = $path.normalize(this.rootZipName + '/' + zipPath);
                zipSource = this.nowZipSource.file(zipPath);

                if (!zipSource) {
                    var zipName = zipPath.replace(/^\/?\w+\//, '');
                    $log.warning('压缩包:' + $path.resolve(nowZip).replace(new RegExp('\/' + zipName + '\/$'), '') +
                        ' 中未找到【' + zipPath + '】压缩包');
                    //执行查找资源失败回调
                    nofindFile(This);
                    return;
                }
                this.rootZipName = vPath;
                This.nowZipSource = $zip(zipSource.asArrayBuffer());

                break;
        }

    } else {
        switch (pathType) {
            case 'url':
                this.nowPath += vPath + '/';
                break;
            case 'zip':
                asynchronous = true;

                this.findPath = vPath;
                this.zipFlag = true;
                this.rootZipName = vPath;
                this.nowPath = zipPath + '/';
                if (zipSource = This.getCache(zipPath)) {
                    This.nowZipSource = zipSource;
                    This.getSource(index);
                } else {
                    $zip.load(zipPath, function (state, source, c) {
                        if (!state) {
                            $log.warning('请求的 ' + zipPath + ' 压缩包不存在!');
                            //执行查找资源失败回调
                            nofindFile(This);
                            return;
                        }

                        This.nowZipSource = source;
                        This.pushCache(zipPath, source);
                        This.getSource(index);

                    });
                }
                break;
        }
    }

    //检查是否异步
    asynchronous || this.getSource(index);
};


/*
 *
 $zip.load('http://project.com/base.zip',function(state,source,c){
 var sourceData=source.file('controller/home.controller.js');
 console.log(sourceData.asText())
 })
 $zip.load('http://project.com/base.zip',function(state,source,c){
 var sourceData=source.file('test/ngx.zip');
 console.log($zip(sourceData.asArrayBuffer()))
 })

 $zip.load('http://project.com/base.zip',function(state,source,c){
 var sourceData=source.file('test/ngx.zip');
 console.log($zip(sourceData.asArrayBuffer()).file('ngx-fancyindex/header.html').asText())
 })
 */


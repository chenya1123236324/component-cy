/**
 * Created by xiyuan on 15-12-2.
 */
(function (exports) {
    'use strict';

    //@make : start

    //提供给配置中设置配置
    var $appConfigFn = function () {
        var arg = arguments;
        switch (arg.length) {
            case 1:
                if (typeof arg[0] === 'object') {
                    $object.extends($appConfigFn, arg[0]);
                } else {
                    $log.warning('[主配置文件]配置设置参数有误!')
                }
                break;
            case 2:
                if (typeof arg[0] !== 'string') {
                    $log.warning('[主配置文件]配置设置参数有误!')
                } else {
                    $appConfigFn[arg[0]] = arg[1];
                }
                break;
        }
    };

    /*应用配置解析*/
    $configManage.configParse = function (configFn, callback, parentInterface) {
        var isMasterInterface = parentInterface ? false : true;
        if (!parentInterface) {
            parentInterface = new configIniterface();
            var id = parentInterface.__$$ID$$__;
            configMap[id] = {
                fileLength: 0,
                object: parentInterface,
                callback: typeof callback === 'function' ? callback : function () {
                }
            };
        }

        //执行配置
        try {
            //并传递自定义参数配置
            configFn(parentInterface, isMasterInterface ? $appConfigFn : $object.clone($appConfigFn));

            //配置数据转移
            if (isMasterInterface) {
                var _$appConfigFn = {};
                for (var key in $appConfigFn) {
                    if(!$appConfigFn.hasOwnProperty(key))continue;
                    _$appConfigFn[key] = $appConfigFn[key]
                }
                $appConfigFn = _$appConfigFn;
            }

        } catch (e) {
            $log.error('应用配置错误', e);
        }
    };

    /*配置对象map*/
    var configMap = {}, configId = 0;

    /*远程配置获取*/
    function getConfig(configUrl, parentInterface, jsonpCallback) {
        configUrl = $path.resolve(configUrl);
        $jsonp({
            url: configUrl,
            element:false,
            jsonpCallback: jsonpCallback || 'config',
            complete: function () {
                var arg = arguments,
                    len = arg.length,
                    i = 0;
                //检查是否成功
                if (len) {
                    //请求完毕后处理配置解析
                    $configManage.configParse(arg[i], null, parentInterface);
                } else {
                    $log.warning('【配置文件】 ' + this.option.url + ' 加载失败，请检查！');
                }

                //配置加载触发
                $eventManage.$apply('config:load', this);

                //检测配置是否加载完毕
                configCheckLoad(parentInterface);
            }
        });
    };

    /*检测配置是否加载完毕*/
    function configCheckLoad(parentInterface) {
        var info = configMap[parentInterface.__$$ID$$__];
        //检查是否加载完毕
        if (--info.fileLength <= 0) {
            //配置加载完毕的回调
            info.callback(parentInterface);
            //加载完毕触发配置加载完毕
            $eventManage.$apply('config:end', info);
        }
    };

    /*配置对象接口*/
    function configIniterface() {
        //config资源ID
        this.__$$ID$$__ = ++configId;
    };

    /*系统配置*/
    configIniterface.prototype.systemConfig = function (config) {
        var systemConfig = $configStroage.systemConfig,
            _callbackName = systemConfig.callbackName,
            _fileSuffix = systemConfig.fileSuffix,
            callbackName,
            fileSuffix;
        //检查配置
        if (typeof config === 'object') {
            //检查回调函数名称
            if (typeof (callbackName = config.callbackName) === 'object') {
                typeof callbackName.model === 'string' && (_callbackName.model = callbackName.model);
                typeof callbackName.view === 'string' && (_callbackName.view = callbackName.view);
                typeof callbackName.controller === 'string' && (_callbackName.controller = callbackName.controller);
            }
            //检查文件后缀
            if (typeof (fileSuffix = config.fileSuffix) === 'object') {
                typeof fileSuffix.model === 'string' && (_fileSuffix.model = fileSuffix.model);
                typeof fileSuffix.view === 'string' && (_fileSuffix.view = fileSuffix.view);
                typeof fileSuffix.controller === 'string' && (_fileSuffix.controller = fileSuffix.controller);
            }

        }
    };

    /*应用模块*/
    configIniterface.prototype.module = function (config) {

    };

    /*应用路径配置*/
    configIniterface.prototype.path = function (config) {
        var paths = config.paths,
            map = config.maps,
            $value,
            pathSource,
            _regexp,
            zipRegexp = /@zip\{\s*([^\}\s]+)\s*\}/,
            key, stringSize,
            pathList = $configStroage.pathList,
            $MAPS = pathList.src.maps,
            $PATHS = pathList.src.paths,
        //以path的长度来排序匹配顺序
            _maps = pathList.maps.list,
            _sort = pathList.maps.sort;

        //zip包查询
        function zipQuery(path, pathSource, isFirst) {
            var index, url = '', name;
            if (_regexp = path.match(zipRegexp)) {
                name = _regexp[1];
                index = _regexp.index;
                //查询前面是否有字符路径
                url = path.slice(0, index);

                //填写入当前路径zip信息
                isFirst && (pathSource.zip = {
                    name: name,
                    path: url
                }) && url && pathSource.source.push({
                    type: 'url',
                    value: url
                });

                //zip路径存入
                pathSource.source.push({
                    type: 'zip',
                    isFirst: isFirst || false,
                    value: name
                });

                //再次查询zip
                pathSource = zipQuery(path.slice(index + _regexp[0].length), pathSource);

            } else {
                path && pathSource.source.push({
                    type: 'url',
                    value: path
                });
            }

            return pathSource;
        };

        //路由映射
        if (typeof map === 'object') {

            for (key in map) {
                if(!map.hasOwnProperty(key))continue;
                $value = map[key];
                stringSize = key.length;
                $MAPS[key] = $value;

                if (!_maps[stringSize]) {
                    _maps[stringSize] = [];
                    _sort.push(stringSize);
                }
                pathSource = zipQuery($value, {
                    zip: false,
                    source: []
                }, true);
                _maps[stringSize].push({
                    path: key,
                    value: $value,
                    innerZip: pathSource.zip,
                    regexp: new RegExp('^' + key),
                    //查询解析zip路径
                    source: pathSource.source
                });

            }

            //path 匹配顺序排序
            pathList.maps.sort = _sort = _sort.sort(function (a, b) {
                return b - a;
            });
        }

        //解析路径
        if (typeof paths === 'object') {
            //以path的长度来排序匹配顺序
            _maps = pathList.paths.list;
            _sort = pathList.paths.sort;
            for (key in paths) {
                if(!paths.hasOwnProperty(key))continue;
                $value = paths[key];
                stringSize = key.length;
                $PATHS[key] = $value;

                if (!_maps[stringSize]) {
                    _maps[stringSize] = [];
                    _sort.push(stringSize);
                }
                pathSource = zipQuery($value, {
                    zip: false,
                    source: []
                }, true);
                _maps[stringSize].push({
                    path: key,
                    value: $value,
                    innerZip: pathSource.zip,
                    regexp: new RegExp('^' + key),
                    //查询解析zip路径
                    source: pathSource.source
                });

            }

            //path 匹配顺序排序
            pathList.paths.sort = _sort.sort(function (a, b) {
                return b - a;
            });

        }

    };

    /*远程zip包*/
    configIniterface.prototype.zipPath = function (config) {
        if (typeof config === 'object') {
            for (var key in config) {
                if(!config.hasOwnProperty(key))continue;
                $configStroage.zipPath[key] = config[key];
            }
        } else {
            $log.warning('zipPath配置数据类型错误！');
        }
    };

    /*路由模式 【 # hash 与 / html5 】默认hash */
    configIniterface.prototype.routeModel = function (config) {
        $configStroage.routeModel = config;
    };

    /*路由后缀 默认空*/
    configIniterface.prototype.routeSuffix = function (config) {
        $configStroage.routeSuffix = config;
    };

    /*视图模板后缀 默认html*/
    configIniterface.prototype.tplSuffix = function (config) {
        $configStroage.tplSuffix = config.replace(/^\.+/, '');
    };

    /*视图请求方式 【 ajax 与 jsonp 】 默认ajax*/
    configIniterface.prototype.viewRequire = function (config) {
        $configStroage.viewRequire = config;
    };

    /*应用路由配置 */
    Include('parse/route.js');

    /*自动路由*/
    configIniterface.prototype.autoRoute = function (config) {

    };

    /*应用监听*/
    configIniterface.prototype.on = function (eventName, callback) {
        $eventManage.$watch(eventName, callback);
    };

    /*应用日志*/
    configIniterface.prototype.log = function (config) {

    };

    /*别名配置*/
    configIniterface.prototype.alias = function (config) {

    };

    /*拦截器*/
    configIniterface.prototype.interceptor = function (config) {
        if(typeof config === "object" && config !== null){
            Object.keys(config).forEach(function(key){
                ($configStroage.interceptor[key]=$configStroage.interceptor[key]||[]).push(config[key])
            })
        }
    };

    /*配置继承*/
    configIniterface.prototype.extendConfig = function (config) {
        var id = this.__$$ID$$__,
            info = configMap[id];
        switch ($type.getType(config)) {
            case 'array':
                var len = config.length, i = ~0;
                while (++i < len) {
                    info.fileLength++;
                    getConfig(config[i], this);
                }
                break;
            case 'object':
                for (var key in config) {
                    if(!config.hasOwnProperty(key))continue;
                    info.fileLength++;
                    getConfig(config[key], this, key);
                }
                break;

        }
    };

    /*加载自定义模式*/
    configIniterface.prototype.loadConfig = function (mode, mode2, mode3) {
        var arg = arguments, l = arg.length, i = ~0, v;
        while (++i < l) {
            if (typeof (v = arg[i]) === 'string') {
                $configStroage.loadConfig.push(v);
            }
        }
    };

    /*自定义配置加载器*/
    configIniterface.prototype.customConfig = function (mode, value) {
        if (typeof mode !== 'string') {
            $log.warning('[自定义配置]customConfig第一个模式参数错误,应为字符类型');
            return;
        }
        $configStroage.customConfigs[mode] = value;
    };

    //重新加载有效的自定义配置
    $configManage.reloadCoustomConfig = function () {
        $configStroage.customConfig = {};
        var d = $configStroage.loadConfig, ds = $configStroage.customConfigs, i = ~0, l = d.length;

        $packages('object', function (obj) {
            while (++i < l) {
                obj.extends($configStroage.customConfig, obj.clone(ds[d[i]]));
            }
        });
    };

    //读取系统配置
    $configManage.getSystemConfig = function () {

    };

    //读取自定义配置
    $configManage.getConfig = function (key, mode) {
        if(!key)return $configStroage.customConfig;
        var res;
        $packages('object', function (obj) {
            res = obj.clone(obj.parseStringData(key, mode ? $configStroage.customConfigs[mode] || {} : $configStroage.customConfig));
        });
        return res;
    };

    //设置自定义配置
    $configManage.setConfig = function (key, value, mode) {
        var res;
        $packages('object', function (obj) {
            res = obj.clone(obj.setStringData(key, mode ? $configStroage.customConfigs[mode] || ($configStroage.customConfigs[mode] = {}) : $configStroage.customConfig, value));
        });
        return res;
    };

    //获取layout资源
    function requestSource(name, url, requestType, mode) {
        $sourceManage.getLayoutSource(url, requestType, function (layoutSource) {
            $configStroage[mode][name] = layoutSource;
        });
    };

    //页面布局注册器
    configIniterface.prototype.layoutRegister = function () {
        var arg = arguments,
            arg1 = arg[0],
            arg2 = arg[1],
            arg3 = arg[2],
            i = ~0, l = arg.length;

        switch (typeof arg1) {
            //判断是否单个布局注册
            case 'string':
                if (typeof arg2 === 'string') {
                    requestSource(arg1, arg2, arg3 === 'jsonp' ? arg3 : 'ajax', 'layoutRegister');
                } else {
                    $log.warning('[配置文件]注册页面"' + arg[0] + '"布局配置第二个参数应为字符类型!');
                    return;
                }
                break;

            //判断是否多个配置一起加载
            case 'object':
                for (i in arg1) {
                    if(!arg1.hasOwnProperty(i))continue;
                    requestSource(i, arg1[i], arg2 === 'jsonp' ? arg2 : 'ajax', 'layoutRegister');
                }

        }
    };

    //页面切换注册器
    configIniterface.prototype.pageToggleRegister = function () {

        var ptrName,
            ptrValue,
            arg = arguments,
            arg1 = arg[0],
            arg2 = arg[1],
            errFlag=false;

        switch (typeof arg1) {
            //检测是否外置名称
            case 'string':
                ptrName=arg1;
                ptrValue=arg2;
                break;
            //检测是否完整配置
            case 'object':
                ptrValue=arg1;
                ptrName=arg1.name;
        }

        //检测当前参数配置是否正确
        if(typeof ptrName !== 'string'){
            errFlag=true;
            $log.warning('[配置文件]页面切换注册配置 注册名参数异常!');
        }

        if(typeof ptrValue !== 'object'){
            errFlag=true;
            $log.warning('[配置文件]页面切换注册配置 注册配置参数异常!');
        }else{
            if(typeof ptrValue.layout !== 'string'){
                errFlag=true;
                $log.warning('[配置文件]页面切换注册配置 注册配置layout参数异常!');
            }
            if(typeof ptrValue.animate !== 'object'){
                errFlag=true;
                $log.warning('[配置文件]页面切换注册配置 注册配置animate参数异常!');
            }
        }

        if(errFlag){
            return;
        }

        return $configStroage.pageToggleRegister[ptrName]=ptrValue;
    };

    //应用默认的页面切换
    configIniterface.prototype.pageToggle = function () {

        var arg = arguments,
            arg1 = arg[0];

        if(arg.length>1 ){
            if (!this.pageToggleRegister.apply(this,arg)) return;
        }

        if(typeof arg1 === 'object' ){
            arg1.name=arg1.name?arg1.name:'default';
            if (!this.pageToggleRegister.apply(this,arg)) return;
            $configStroage.selectPageToggle=arg1.name;
        }

        if(typeof arg1 === 'string'){
            $configStroage.selectPageToggle=arg1;
        }
    };

    //引用引导配置
    configIniterface.prototype.bootstrap = function (fn) {
        if(typeof fn !== "function"){
            $log.warning('[配置文件]应用引导 参数应为function类型!');
            return;
        }
        $configStroage.bootstrapFns.push(fn);
    };

    //属性指令注册
    configIniterface.prototype.directiveRegister = function (name,conf) {
        $directiveManage.register(name, conf);
    };

    //组件注册
    configIniterface.prototype.componentRegister = function (name,conf) {
        $directiveManage.register(name, conf,true);
    };

    //过滤器注册
    configIniterface.prototype.filterRegister = function (name,filterFn) {
        typeof filterFn === 'function' && ($configStroage.$filter[name]=filterFn);
    };

    //服务注册
    configIniterface.prototype.serverRegister = function (serverName,serverHandle) {
        $configStroage.serverRegisterStroage[serverName]=serverHandle;
    };

    //数据库配置
    configIniterface.prototype.DB=function (dbName,handle) {
        return handle(function (tableName,struct) {
            return new $DB(dbName).create(tableName,struct);
        });
    };

    //默认的数据库
    configIniterface.prototype.defaultDB=function (dbName) {
        $configStroage.defaultDBName= dbName;
        $configStroage.defaultDB= new $DB(dbName);
    };

    //indexedDB数据库配置
    configIniterface.prototype.noSql=function (dbName,handle) {
        return handle(function (tableName,struct) {
            return new noSql(dbName).create(tableName,struct);
        });
    };

    //默认的indexedDB数据库
    configIniterface.prototype.defaultNoSql=function (dbName) {
        $configStroage.defaultNoSqlName= dbName;
        $configStroage.defaultNoSql= new noSql(dbName);
    };


})(this);

//@make : end

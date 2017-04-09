/**
 * Created by xiyuan on 15-12-7.
 */
function routeParse() {

    var args = arguments, l = args.length, i = ~0, arg,

    //自身路由对象
        selfRoute = new routeParent(this),

    //路由器信息存储
        routeInfo = selfRoute.__info__,

    //子路由
        childrenRoute = routeInfo.childrenRoute = [],

    //拦截器
        interceptors = routeInfo.interceptors = [],

    //路由路径
        path = routeInfo.path = [],

    //路由指向配置（如指定视图、控制器或视图模板）
        routeConfig,

    //自身路由处理器
        selfRouteFn,

    //用作参数路由分析
        argi, argl, argv, argList,
        stringMatch, si, sl, sv, sp, sf, $sp, _$sp, $src,
        mi, ml, mv, mp, mps, fns,
        ns, rs, ra,
        __i, __l, __v, _i, _l, _v, $i, $l, $v,
        $count, _$count;

    //路径字典
    var pathMap = routeInfo.pathMap = {
        //常规路由
        normalRoute: [],

        //正则路由
        regexpRoute: [],

        //参数路由
        parameterRoute: []
    };

    //路由path类型(默认常规路由 a, 参数 b, 正则 c)
    routeInfo.__type__ = 'a';

    while (++i < l) {
        arg = args[i];
        switch ($type.getType(arg)) {
            //路由器配置（视图、控制器）
            case 'object':
                routeConfig = routeInfo.routeConfig = arg;
                break;
            //内置路由器
            case 'function':
                selfRouteFn = arg;
                break;
            //路由器路径
            case 'array':

                //检查当前数组只能有两种数据【路径|路径参数】
                argi = ~0, argl = arg.length, argList = null;
                //初始化ns,rs（常规/正则 参数路由存储器）
                ns = [], rs = [];

                while (++argi < argl) {
                    argv = arg[argi];
                    switch ($type.getType(argv)) {
                        case 'string':
                            ns.push(argv);
                            break;
                        case 'regexp':
                            rs.push(argv);
                            break;
                        case 'object':
                            //合并继承的参数回调处理
                            argList = $object.extend(argList || {}, argv);
                            break;
                    }
                }

                //判断当前路由是否是参数路由
                if (argList) {
                    //分析出回调类型参数
                    fns = [];

                    Object.keys(argList).forEach(function ($v) {
                        typeof $v === 'function' && fns.push({
                            key: $i,
                            fn: $v
                        });
                    });

                    var parameterMap = [];

                    //解析常规的参数路由
                    si = ~0, sl = ns.length;
                    while (++si < sl) {
                        //参数路径
                        $src = sp = $sp = ns[si];
                        //分解参数路由中的参数标识
                        if (stringMatch = sp.match(/\{[\w$-]+\}/g)) {
                            //检查参数标识是否存在回调中
                            mi = ~0, ml = stringMatch.length, sf = false, mps = [], ra = [];
                            while (++ mi < ml) {
                                mv = stringMatch[mi];
                                mp = mv.slice(1);
                                mp = mp.slice(0, -1);
                                if (sv = argList[mp]) {
                                    switch ($type.getType(sv)) {
                                        case 'regexp':
                                            //重构正则路径
                                            sv = sv.source;
                                        case 'string':
                                            //重构正则路径
                                            $sp = $sp.replace(mv, sv);
                                            $src = $src.replace(mv, '(' + sv.replace(/([\(\)])/g, '\\$1') + ')');
                                            //预备匹配路由时候提取具体参数
                                            mps.push({
                                                key: mp,
                                                regexp: sv
                                            });

                                            break;
                                        case 'array':
                                            if ($l = sv.length) {
                                                $i = ~0, $v = [];
                                                while (++$i < $l) {
                                                    $v.push({
                                                        regexp: sv[$i],
                                                        key: mp,
                                                        mv: mv
                                                    })
                                                }
                                                ra.push($v);
                                            }
                                            break;
                                        default:
                                            $log.warning('【路由配置】参数路由的参数映射值类型非法，请修改为regexp、string、function这三种类型之一')
                                    }
                                    sf || (sf = true)
                                }
                            }

                            //如果当前参数标识不存在回调中，重置为path中
                            if (sf) {
                                //检查是否有复合参数映射
                                if (_l = ra.length) {
                                    _i = ~0, $count = [];
                                    while (++ _i < _l) {
                                        _v = ra[_i];
                                        __i = ~0, __l = _v.length;
                                        //检查是否是第一次第一层循环
                                        if ($l = $count.length) {
                                            //解析第二层数据
                                            _$count = [].concat($count);
                                            $count = [];
                                            while (++ __i < __l) {
                                                __v = _v[__i];
                                                $i = ~0;
                                                while (++ $i < $l) {
                                                    $v = _$count[$i];
                                                    $count.push($v.concat(__v));
                                                }
                                            }

                                        } else {
                                            while (++ __i < __l) {
                                                __v = _v[__i];
                                                $count.push([__v]);
                                            }
                                        }
                                    }

                                    $i = ~0, $l = $count.length;
                                    while (++$i < $l) {
                                        $v = $count[$i], _i = ~0, _l = $v.length;
                                        _$count = [].concat(mps);
                                        _$sp = $sp;
                                        $src = $sp;
                                        while (++ _i < _l) {
                                            _v = $v[_i];
                                            mv = _v.mv, mp = _v.key, _v = _v.regexp;
                                            switch ($type.getType(_v)) {
                                                case 'regexp':
                                                    //重构正则路径
                                                    _v = _v.source;
                                                case 'string':
                                                    _$sp = _$sp.replace(mv, _v);
                                                    $src = $src.replace(mv, '(' + _v.replace(/([\(\)])/g, '\\$1') + ')');
                                                    //预备匹配路由时候提取具体参数
                                                    _$count.push({
                                                        key: mp,
                                                        regexp: _v
                                                    });
                                                    break;

                                            }
                                        }

                                        //复合参数路由信息存储
                                        parameterMap.push({
                                            regexps: _$count,
                                            fns: fns,
                                            path: _$sp,
                                            src: $src
                                        })

                                    }


                                } else {
                                    //单个参数路由信息存储
                                    parameterMap.push({
                                        regexps: mps,
                                        fns: fns,
                                        path: $sp,
                                        src: $src
                                    })
                                }

                            } else {
                                //非参数路由存储
                                path.push(sp);
                            }

                        } else {
                            //添加进正常字符串路由
                            path.push(sp);
                        }
                    }


                    //解析正则的参数路由
                    if (fns.length) {
                        si = ~0, sl = rs.length;
                        while (++ si < sl) {
                            //单个参数路由信息存储
                            parameterMap.push({
                                regexps: [],
                                fns: fns,
                                path: rs[si].source
                            })
                        }
                    } else {
                        //在正则状态路由中没有回调方法
                        routeInfo.path = path.concat(rs);
                    }

                    //数据插入参数路由
                    pathMap.parameterRoute = pathMap.parameterRoute.concat(parameterMap);
                    routeInfo.path = routeInfo.path.concat(parameterMap);

                } else {
                    //非参数路由
                    routeInfo.path = path.concat(arg);
                }

                break;
            //路由器路径
            case 'string':
            case 'regexp':
                path.push(arg);
                break;

        }
    }

    //路由类型分类
    routeTypeSwitch(this, selfRoute);

    //执行路由处理器（子路由回调）
    selfRouteFn && selfRouteFn(selfRoute);

    return this;
};

//路由类型分析并分类
function routeTypeSwitch(routeRoot, selfRoute) {
    var routeInfo = selfRoute.__info__,
        paths = routeInfo.path,
        pl = paths.length,
        i = ~0,
        path,
        _type,
        type = routeInfo.__type__,
    //路径字典
        pathMap = routeInfo.pathMap;

    //检测路由path类型(默认常规路由 a, 参数 b, 正则 c)
    while (++i < pl) {
        path = paths[i];
        switch ($type.getType(path)) {
            case 'string':
                _type = 'a';
                pathMap.normalRoute.push(path);
                break;
            case 'regexp':
                pathMap.regexpRoute.push(path);
                _type = 'c';
                break;
            default:
                continue;
        }

        //类型修正
        type = type.replace(_type, '') + _type;
    }

    //路由类型
    routeInfo.__type__ = type;

    //检查当前路由是否是顶级路由
    if (routeRoot.__routeRoot__) {
        //往上级路由添加子路由
        routeRoot.__info__.childrenRoute.push(selfRoute);
        return;
    }

    //添加路由到顶级\根 配置中
    $configStroage.routeList.push(selfRoute);

};

//路由对象实例接口
function routeParent(routeRoot) {
    //传递上级路由
    this.__routeRoot__ = routeRoot;
    //路由信息
    this.__info__ = {};

};

//路由规则配置
routeParent.prototype.when = routeParse;

//当找不到路由,重定向
routeParent.prototype.other = function () {
    return this;
};

//自动路由
routeParent.prototype.autoRoute = function (option) {
    this.__info__.autoRoute = option;
    return this;
};

//路由拦截器
routeParent.prototype.interceptor = function () {
    return this;
};

//路由路径后缀
routeParent.prototype.suffix = function (suffix) {
    typeof suffix === 'string' && (this.__info__.suffix = suffix);
    return this;
};

/*应用路由配置处理器*/
configIniterface.prototype.route = routeParse;

/**
 * 默认路由路径
 * @param routePath
 */
configIniterface.prototype.defaultRoute = function(routePath){
    $configStroage.defaultRoute=routePath;
};
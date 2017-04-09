(function (factory) {
    if (typeof define === "function" && define.amd) {

        define('object', ['type'], factory);

    } else if (typeof define === "function" && define.cmd) {

        define('object', [], function (require) {
            return factory();
        });

    } else {
        window.object = factory();
    }
})(function (type) {
    'use strict';

    /**
     * 数据属性设置
     * @param obj
     * @param key
     */
    function def(obj, key) {
        Object.defineProperty(obj, key, {
            writable: true,
            enumerable: false,
            configurable: true
        });
    }

    /*给数组原型对象添加in方法*/
    Array.prototype.in = function (v) {
        var i = 0, len = this.length;
        while (len > i) {
            if (this[i] == v) {
                return i;
            }
            i++;
        }
        return -1;
    };

    //设置数组原型中的in不可遍历
    def(Array.prototype,'in');

    //对象遍历
    Object.prototype.forEach=function (fn) {
        fn=typeof fn === 'function'?fn:new Function;
        Object.keys(this).forEach(function (key) {
            fn(this[key],key);
        }.bind(this))
        fn=null;
    };

    //对象克隆
    Object.prototype.clone=function () {
        return object.clone(this);
    };

    //对象继承
    Object.prototype.extend=function () {
        var args=[].slice.call(arguments);
        args.unshift(this);
        return object.extends.apply(object,args);
    };

    //对象属性写入
    Object.prototype.setAttr=function () {
        var args=[].slice.call(arguments);
        args.unshift(this);
        return object.write.apply(object,args);
    };

    //对象属性读取
    Object.prototype.getAttr=function () {
        var args=[].slice.call(arguments);
        args.unshift(this);
        return object.get.apply(object,args);
    };

    //设置原型中的forEach clone 不可遍历
    def(Object.prototype,'forEach');
    def(Object.prototype,'clone');
    def(Object.prototype,'extend');
    def(Object.prototype,'setAttr');
    def(Object.prototype,'getAttr');

    var object = {},
        //继承
        _extend = object.extend = function () {
            var i=~0,
                args=arguments,
                argLen=args.length;
            if (argLen < 2) return args[0];

            while (++i<argLen){
                if (i == 0 || !arguments[i]) continue;
                Object.keys(args[i]).forEach(function(j){
                    args[0][j] = args[i][j];
                });
            }
            return args[0];
        },
        //深度克隆
        _clone = object.clone = function (obj,recordKey) {
            var result=obj,
                level,
                _toString = {}.toString;

            if(!recordKey){
                recordKey={};
                level=1;
            }

            // null, undefined, non-object, function
            if (!obj || typeof obj !== 'object') {
                return obj;
            }

            // DOM Node
            if (obj.nodeType && 'cloneNode' in obj) {
                return obj.cloneNode(true);
            }

            // Date
            if (_toString.call(obj) === '[object Date]') {
                return new Date(obj.getTime());
            }

            // RegExp
            if (_toString.call(obj) === '[object RegExp]') {
                var flags = [];
                if (obj.global) {
                    flags.push('g');
                }
                if (obj.multiline) {
                    flags.push('m');
                }
                if (obj.ignoreCase) {
                    flags.push('i');
                }

                return new RegExp(obj.source, flags.join(''));
            }


            if (typeof obj === 'object' && obj !== null) {

                result = obj instanceof Array ?[]: {};

                var keys=Object.keys(obj);

                keys.forEach(function(val){

                    //为防止数据绑定中的特殊数据导致无限循环
                    if(recordKey[val] && recordKey[val].in(obj[val]) !== -1 && typeof obj[val] === 'object' && obj[val] !== null){
                        return ;
                    }

                    //记录值
                    (recordKey[val]=recordKey[val]||[]).push(obj[val]);

                    result[val]=_clone(obj[val],recordKey);
                });
            }

            //清除记录
            if(level){
                recordKey=null;
            }
            return result;
        },

        //深度继承
        _extends = object.extends = function () {
            if (arguments.length < 2) {
                return false;
            }
            var i = ~0, s = 0, arg = arguments, l = arg.length, argi;
            while (++i < l) {
                if (i == 0) {
                    continue;
                }
                s = 0, argi = arg[i];

                for (var j in argi) {
                    //原型
                    if (!argi.hasOwnProperty(j)) {
                        continue;
                    };

                    var oldValue = arguments[0][j];
                    var newValue = argi[j];

                    if ((type.isArray(oldValue) || type.isObject(oldValue) /*|| type.isFunction(oldValue)*/) && (type.isArray(newValue) || type.isObject(newValue) /*|| type.isFunction(newValue)*/)) {
                        _extends.call(this, arguments[0][j], argi[j]);
                    } else {
                        arguments[0][j] = argi[j];
                    }
                }
            }
            return arguments[0];
        },

        //对象合并克隆
        _concat = object.concat = function () {
            var res = {},
                args = [].slice.call(arguments);

            args.forEach(function (arg) {
                Object.keys(arg).forEach(function (val) {
                    res[val] = _clone(arg[val]);
                });
            });

            return res;
        },
        //配置合并
        _merge = object.merge = function (now, def) {
            for (var key in def) {
                typeof now[key] === "undefined" && (now[key] = def[key])
            }
            return now;
        },

        //arguments参数转为数组
        _argToArray = object.argToArray = function (arg) {
            var len = arg.length, i = 0, _arg = [];
            while (len > i) {
                _arg.push(arg[i]);
                i++;
            }
            return _arg;
        },

        /**
         * 检查属性是否原型属性
         * @param obj
         * @param key
         * @returns {boolean}
         */
        _hasPrototypeProperty = object.hasPrototypeProperty = function d(obj, key) {
            return !obj.hasOwnProperty(key) && key in obj;
        },
        /*数据配置解析*/
        _parseStringData = object.parseStringData = function (keyString, data) {
            if (arguments.length < 2) {
                return arguments[0];
            }
            keyString = keyString.match(/^[\w+\.]+$/g);
            if (keyString) {
                keyString = keyString[0].replace(/\[([\S]+)\]/g, function (reg, $1) {
                    return '.' + $1;
                });
                var attrs = keyString.split('.'), i = ~0, l = attrs.length;
                while (++i < l) {
                    data = data[attrs[i]];
                    if (typeof data === "undefined") {
                        console.log(attrs[i] + '属性不存在！');
                        return null;
                    }
                }
                return data;
            } else {
                console.log('取值方法有误！');
                return false;
            }
        };

    /*数据配置设置*/
    object.setStringData = function (keyString, data, values) {
        if (arguments.length < 2) {
            return arguments[0];
        }

        keyString = keyString.match(/^[\w+\.]+$/g);
        if (keyString) {
            keyString = keyString[0].replace(/\[([\S]+)\]/g, function (reg, $1) {
                return '.' + $1;
            });

            var attrs = keyString.split('.'), i = ~0, l = attrs.length;
            while (++i < l) {
                if (i + 1 === l) {
                    data[attrs[i]] = values;
                    return values;
                }
                data = data[attrs[i]];
                if (typeof data === "undefined") {
                    console.log(attrs[i] + '属性不存在！');
                    return null;
                }
            }

        } else {
            console.log('取值方法有误！');
            return false;
        }
    };

    /**
     * model数据写入
     * @param obj
     * @param key
     * @param data
     */
    object.write = function write(obj, key, data) {

        (function getLevel(model, modelKey, writeKey) {

            if (!writeKey) {
                if (!modelKey) {
                    return data;
                }
                model[modelKey] = data;
                return true;
            }

            var property;
            //提取key字符中对象所属的第一个属性
            writeKey = writeKey.replace(/^\[([^.\]]+)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
                //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
                property = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
                return '';
            });
            //检查对象
            if (typeof model[modelKey] !== 'object' || model[modelKey] === null) {
                modelKey && (model[modelKey] = {});
            }
            getLevel(modelKey ? model[modelKey] : model, property, writeKey);
        })(obj, '', key)

        return obj;
    };

    /**
     * 数据获取
     * @param obj
     * @param key
     */
    object.get = function get(obj, key) {

        return function getLevel(model, writeKey) {
            if (!writeKey) {
                return model;
            }

            var property;
            //提取key字符中对象所属的第一个属性
            writeKey = writeKey.replace(/^\[([^.\]]+)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
                //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
                property = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
                return '';
            });

            //检查对象
            if (!model) {
                model = {};
            }

            return getLevel(model[property], writeKey);
        }(obj, key);

    };

    /*function clone(obj,recordKey) {
        var result=obj,
            level,
            _toString = {}.toString;

        if(!recordKey){
            recordKey={};
            level=1;
        }

        // null, undefined, non-object, function
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        // DOM Node
        if (obj.nodeType && 'cloneNode' in obj) {
            return obj.cloneNode(true);
        }

        // Date
        if (_toString.call(obj) === '[object Date]') {
            return new Date(obj.getTime());
        }

        // RegExp
        if (_toString.call(obj) === '[object RegExp]') {
            var flags = [];
            if (obj.global) {
                flags.push('g');
            }
            if (obj.multiline) {
                flags.push('m');
            }
            if (obj.ignoreCase) {
                flags.push('i');
            }

            return new RegExp(obj.source, flags.join(''));
        }
        if (typeof obj === 'object' && obj !== null) {

            result = obj instanceof Array ?[]: {};

            Object.keys(obj).forEach(function(val){

                //为防止数据绑定中的特殊数据导致无限循环
                if(recordKey[val] && recordKey[val].indexOf(obj[val]) !== -1 && typeof obj[val] === 'object' && obj[val] !== null){
                    return ;
                }

                //记录值
                (recordKey[val]=recordKey[val]||[]).push(obj[val]);

                result[val]=clone(obj[val],recordKey);
            });
        }

        //清除记录
        if(level){
            recordKey=null;
        }
        return result;
    }*/
    return object;
});

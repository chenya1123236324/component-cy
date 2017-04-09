/**
 * Created by xiyuan on 16-8-18.
 */

var nowTime = Date.now(),
    secretKey = $safety.MD5(nowTime),
    errorFlag = 'state:fail (timeFlag:' + nowTime + ')',
    //缓存容器
    __cacheStroage__ = {},
    __localStroage__ = {},
    __sessionStroage__ = {},
    //框架缓存关键字
    keyWords = ['__$frameCache__', '__$stroageCache__'];

//分解并获取key
function getKey(nowKey) {
    var nextKey;
    //提取key字符中对象所属的第一个属性
    nowKey = nowKey.replace(/^\[([^.\]]+[^\]]+?)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
        //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
        nextKey = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
        return '';
    });

    return {
        nowKey: nextKey,
        nextKey: nowKey
    }
}

//根据key的读取与设置
function handleVal(stroageData, nowKey, value, nextKey,isDelete) {
    //检查是否需要删除
    if(arguments.length === 3 && value === null){
        isDelete=true;
    }

    value = arguments.length > 2 ? value : null;

    //提取key字符中对象所属的第一个属性
    nowKey = nowKey.replace(/^\[([^.\]]+[^\]]+?)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
        //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
        nextKey = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
        return '';
    });

    if (!nowKey) {
        if(isDelete){
            delete stroageData[nextKey];
        }else if (value !== null) {
            stroageData[nextKey] = value;
        }
        return stroageData[nextKey];
    } else {
        //检查下级是否存在,如果不是 则赋予对象
        if (typeof stroageData[nextKey] === "undefined") {
            isDelete || (stroageData[nextKey] = {});
        } else if (typeof stroageData[nextKey] !== 'object' || stroageData[nextKey] === null) {
            return errorFlag;
        }
        return handleVal(stroageData[nextKey], nowKey, value, nextKey,isDelete)
    }
}


//读取与设置缓存
$FRAME.cache = function (key, value) {
    var res;
    switch (arguments.length) {
        case 0:
            return __cacheStroage__;
        case 1:
            res = handleVal(__cacheStroage__, key);
            if (res === errorFlag) {
                $log.warning('[cache]读取cache失败请检查缓存中的:' + key);
            }
            return res;
        default:
            res = handleVal(__cacheStroage__, key, value);
            if (res === errorFlag) {
                $log.warning('[cache]读取cache失败请检查key:' + key);
            }
            return res;
    }
};

//读取与设置localStorage
$FRAME.localStorage = function (key,value) {
    var res;
    __localStroage__=localStorage.getItem('__$stroageCache__');
    switch (arguments.length) {
        case 0:
            return __localStroage__;
        case 1:
            res = handleVal(__localStroage__, key);
            if (res === errorFlag) {
                $log.warning('[cache]读取cache失败请检查缓存中的:' + key);
            }
            return res;
        default:
            res = handleVal(__localStroage__, key, value);
            if (res === errorFlag) {
                $log.warning('[cache]读取cache失败请检查key:' + key);
            }
            localStorage.setItem('__$stroageCache__',__localStroage__);
            return res;
    }
};

//删除location缓存
$FRAME.localStorageRemove=function (key) {
    if(!key)return;
    handleVal(__localStroage__, key,null);
    return localStorage.setItem('__$stroageCache__',__localStroage__);
};

//读取与设置sessionStorage
$FRAME.sessionStorage = function (key,value) {
    var res;
    __sessionStroage__=sessionStorage.getItem('__$stroageCache__');
    switch (arguments.length) {
        case 0:
            return __sessionStroage__;
        case 1:
            res = handleVal(__sessionStroage__, key);
            if (res === errorFlag) {
                $log.warning('[cache]读取cache失败请检查缓存中的:' + key);
            }
            return res;
        default:
            res = handleVal(__sessionStroage__, key, value);
            if (res === errorFlag) {
                $log.warning('[cache]读取cache失败请检查key:' + key);
            }
            sessionStorage.setItem('__$stroageCache__',__sessionStroage__);
            return res;
    }
};

//删除session缓存
$FRAME.sessionStorageRemove=function (key) {
    if(!key)return;
    handleVal(__localStroage__, key,null);
    return localStorage.setItem('__$stroageCache__',__localStroage__);
};

var StorageGetItem = Storage.prototype.getItem,
    StorageSetItem = Storage.prototype.setItem,
    StorageClear = Storage.prototype.clear,
    StorageRemoveItem = Storage.prototype.removeItem;


//获取缓存
Storage.prototype.getItem = Storage.prototype.get = function () {
    var key = arguments[0],
        __cacheData__;
    if (key) {
        var keyInfo = getKey(key);
        //检查是否获取框架缓存
        if (keyWords.in(keyInfo.nowKey) !== -1) {
            //检查是否有框架缓存,否则初始化
            if (!(__cacheData__ = StorageGetItem.call(this, keyInfo.nowKey))) {
                StorageSetItem.call(this, keyInfo.nowKey, '{}');
                return keyInfo.nextKey ? undefined : {};
            }

            //获取框架缓存数据
            try {
                __cacheData__ = JSON.parse(__cacheData__);
                return keyInfo.nextKey ? handleVal(__cacheData__, keyInfo.nextKey) : __cacheData__;
            }
            catch (e) {
                StorageSetItem.call(this, keyInfo.nowKey, '{}');
                return keyInfo.nextKey ? undefined : {};
            }
        }
    }

    return key ? StorageGetItem.call(this, key) : this;
};

//写入缓存
Storage.prototype.setItem = Storage.prototype.set = function () {
    var key = arguments[0],
        value = arguments[1] || '',
        error = false,
        __cacheData__;
    if (key) {
        var keyInfo = getKey(key);
        //检查是否获取框架缓存
        if (keyWords.in(keyInfo.nowKey) !== -1) {
            //检查是否有框架缓存,否则初始化
            if (!(__cacheData__ = StorageGetItem.call(this, keyInfo.nowKey))) {
                __cacheData__ = {};
            } else {
                //获取框架缓存数据
                try {
                    __cacheData__ = JSON.parse(__cacheData__);
                }
                catch (e) {
                    __cacheData__ = {};
                }
            }

            if (keyInfo.nextKey) {
                if (error = (handleVal(__cacheData__, keyInfo.nextKey, value) === errorFlag)) {
                    $log.warning('[cache]设置cache失败!请检查缓存数据', __cacheData__);
                }

                StorageSetItem.call(this, keyInfo.nowKey, JSON.stringify(__cacheData__));
            }else{
                StorageSetItem.call(this, keyInfo.nowKey, typeof value === 'object'?JSON.stringify(value):value);
            }
            return error ? null : value;
        }
        StorageSetItem.apply(this, arguments);
        return value;
    }

    return null;
};

//清空缓存
Storage.prototype.clear = function () {
    Object.keys(this).forEach(function (key) {
        //除框架缓存其他缓存一律清除
        if (keyWords.in(key) !== -1) return;
        StorageRemoveItem.call(this, key);
    }.bind(this));
    return true;
};

//删除缓存
Storage.prototype.removeItem = Storage.prototype.remove = function () {
    if (keyWords.in(arguments[0]) !== -1) {
        $log.warning('你没有权限删除框架缓存！');
        return false;
    }
    return StorageRemoveItem.apply(this, arguments);
};

//缓存key关键词预定 (兼容火狐以防报错)
try {

    keyWords.forEach(function (key) {

        localStorage[key] = localStorage[key] || '{}';
        sessionStorage[key] = sessionStorage[key] || '{}';

        Object.defineProperty(window.localStorage, key, {
            set: function () {
                $log.warning('不可改写框架缓存！');
            },
            get: function () {
                return localStorage.getItem(key);
            }
        });

        Object.defineProperty(window.sessionStorage, key, {
            set: function () {
                $log.warning('不可改写框架缓存！');
            },
            get: function () {
                return sessionStorage.getItem(key);
            }
        });

    });
}
catch (e) {
}
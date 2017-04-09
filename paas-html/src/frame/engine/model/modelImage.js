/**
 * Created by xiyuan on 16-5-18.
 */
function modelImage(info) {

    //隐藏定义存储数据
    def(this, '__storage__');
    var storage = this.__storage__ = {
        readData: [],
        methods: {},
        watchDep: new watchDep(),
        $model: null,
        watchOn: true,
        __info__: info
    };
    this.$model = null;

    //监听
    Object.defineProperty(this, '$model', {
        enumerable: false,
        configurable: true,
        set: function (newVal) {

            //数据依赖源继承(检查是否数据中是否存在继承源,如该有则沿用之前的)
            if (newVal && newVal.__dep__) {
                storage.watchDep = newVal.__dep__;
                storage.watchOn=false;
            }else{
                storage.watchDep.$data = newVal;
                //依赖数据关联
                storage.watchDep.update({
                    parentData: this,
                    key: '$model'
                });
            }

            if (storage.watchOn) {
                storage.watchOn = false;
                //数据读取初始化
                readDataInit.bind(this)(storage,newVal);
            }

        }.bind(this),
        get: function () {
            return storage.watchDep.$data;
        }
    });

    /**
     * 数据读取初始化
     * @param storage
     */
    function readDataInit(storage,modelData) {
        var loadDatas = storage.readData;
        //执行$model加载完后的回调
        loadDatas.forEach(function (fn) {
            fn(modelData);
        });
    }
}

/**
 * 获取另一个model
 * @param modelPath
 * @returns {$modelInterface}
 */
modelImage.prototype.model = function (modelPath) {
    var modelObj = new modelImage(this);
    return controllerImage.prototype.model.call(modelObj, modelPath);
};

/**
 * $model数据加载后回调
 * @param fn
 */
modelImage.prototype.readData = function (fn) {
    this.__storage__.readData.push(fn);
    //检查$model数据是否加载
    if (!this.__storage__.watchOn) {
        fn.bind(this)(this.$model);
    }
    return this;
};

/**
 * 数据监控
 * @param watchKey
 * @param fn
 */
modelImage.prototype.watch = function (watchKey, fn ,isRead) {
    this.__storage__.watchDep.add(watchKey, fn, this ,isRead);
    return this;
};

/**
 * 移除数据监控
 * @param watchKey
 * @param fn
 */
modelImage.prototype.removeWatch = function (watchKey, fn) {
    this.__storage__.watchDep.remove(watchKey, fn);
    return this;
};

/**
 * 启动数据监听
 * @param watchKey
 */
modelImage.prototype.startWatch = function (watchKey) {
    this.__storage__.watchDep.start(watchKey);
};

/**
 * 临时关闭数据监听
 * @param watchKey
 */
modelImage.prototype.stopWatch = function (watchKey) {
    this.__storage__.watchDep.stop(watchKey);
};

/**
 * 自定义提供方法
 * @param methodName
 * @param fn
 */
modelImage.prototype.method = function (methodName, fn) {
    this.__storage__.methods[methodName] = fn;
};

/**
 * model数据写入
 * @param key
 * @param data
 */
modelImage.prototype.write = function (key, data) {
    switch (arguments.length) {
        case 0:
            return;
        case 1:
            data = key;
            key = '';
            break;
    }

    (function getLevel(model, modelKey, writeKey) {
        if (!writeKey) {
            model[modelKey] = data;
            return;
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
            model[modelKey] = {};
            //数据更新
            model.inspect();
        }
        getLevel(model[modelKey], property, writeKey);

    })(this, '$model', key)

};

/**
 * model数据获取
 * @param key
 * @param data
 */
modelImage.prototype.get = function (key) {

    return function getLevel(model, modelKey, writeKey) {
        if (!writeKey) {
            return model[modelKey];
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
            return model[modelKey];
        }

        return getLevel(model[modelKey], property, writeKey);
    }(this, '$model', key);

};

/**
 * 服务请求
 */
modelImage.prototype.server = $FRAME.server=serverVm;

/**
 * 数据库
 * @type {$DB}
 */
modelImage.prototype.db = function (dbName, version, description, dbSize) {
    return new $DB(dbName, version, description, dbSize)
};

modelImage.prototype.table = function (tableName) {
    if (!$configStroage.defaultDB) {
        $configStroage.defaultDBName = 'defaultDB';
        $configStroage.defaultDB = new $DB('defaultDB');
    }
    return $configStroage.defaultDB.table(tableName);
};

modelImage.prototype.createTable = function (tableName, struct) {
    if (!$configStroage.defaultDB) {
        $configStroage.defaultDBName = 'defaultDB';
        $configStroage.defaultDB = new $DB('defaultDB');
    }
    return $configStroage.defaultDB.create(tableName, struct);
};


/**
 * indexedDB数据库
 * @type {$DB}
 */
modelImage.prototype.noSql = function (dbName, version) {
    return new noSql(dbName, version)
};

modelImage.prototype.noSqlTable = function (tableName) {
    return new noSql($configStroage.defaultNoSqlName|| 'defaultDB').table(tableName);
};

modelImage.prototype.createNoSqlTable = function (tableName, struct) {
    return new noSql($configStroage.defaultNoSqlName|| 'defaultDB').create(tableName, struct);
};


/**
 * 监控依赖
 */
function watchDep() {
    //监控挂载
    this.watchs = [];
    //监控执行计数
    this.watchExecCount=0;
    //下级监控
    this.child = {};
    //挂载的数据
    this.$data = null;
    //数据备份
    this.$oldData = null;
    //以前的源数据
    this.sourceData=null;
    //父级依赖
    this.$rootDep = null;
    //监控开关 (关闭后不会触发挂载的回调)
    this.watchToggle = true;
    //变化信息
    this.changeInfo = null;
    //隐藏$rootDep数据
    def(this, '$rootDep');
}

/**
 * 添加当前数据的监控
 * @param watchKey
 * @param fn
 * @returns {watchDep}
 */
watchDep.prototype.add = function (watchKey, fn, scope,isRead) {
    if (!watchKey) {
        this.watchs.push({
            fn: fn,
            scope: scope
        });

        //检查监听计数
        isRead && this.watchExecCount && ++this.watchExecCount && fn(this.$data, this.changeInfo);

        return this;
    }

    var watchChild = this.child,
        $data = this.$data,
        tmpData,
        property,
        watchData,
        //提取key字符中对象所属的第一个属性
        watchKey = watchKey.replace(/^\[([^.\]]+)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
            //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
            property = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
            return '';
        });

    //把key存入下级监控中
    if (!(watchData = watchChild[property])) {
        //创建新的子级监控节点
        watchData = watchChild[property] = new watchDep();

        //记录父级依赖
        watchData.$rootDep = this;
    }

    //赋值
    watchData.update({
        parentData: typeof $data === 'object' && $data !== null ? $data : (tmpData = {}, tmpData[property] = null, tmpData),
        key: property
    });

    //继续挂载子级监控
    watchData.add(watchKey, fn, scope,isRead);

};

/**
 * 移除当前数据监控点
 * @param watchKey
 * @param fn
 */
watchDep.prototype.remove = function (watchKey, fn) {
    if (!watchKey) {
        if (fn) {
            //匹配删除
            this.watchs.forEach(function (value, index) {
                if (fn.toString() == value.toString()) {
                    this.watchs.splice(index, 1);
                    return this;
                }
            }.bind(this));
        } else {
            //删除所有
            this.watchs = [];
        }

        return this;
    }

    var watchChild = this.child,
        property,
        watchData,
        //提取key字符中对象所属的第一个属性
        watchKey = watchKey.replace(/^\[([^.\]]+)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
            //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
            property = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
            //把key存入下级监控中
            watchData = watchChild[property];
            return '';
        });

    //继续挂载子级监控
    watchData && watchData.remove(watchKey, fn);
};


/**
 * 数据监听开关
 * @param watchKey
 * @param toggle
 * @returns {watchToggle}
 */
function watchToggle(watchKey, toggle) {
    toggle = !!toggle;
    if (!watchKey) {
        this.watchToggle = toggle;
        return this;
    }

    var watchChild = this.child,
        property,
        watchData,
        //提取key字符中对象所属的第一个属性
        watchKey = watchKey.replace(/^\[([^.\]]+)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
            //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
            property = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
            return '';
        });


    //把key存入下级监控中
    if (!(watchData = watchChild[property])) {
        //创建新的子级监控节点
        watchData = watchChild[property] = new watchDep();
        //记录父级依赖
        watchData.$rootDep = this;
    }

    //继续挂载子级监控 (开/关)
    watchData[toggle ? 'start' : 'stop'](watchKey);
};

/**
 * 开启数据监听
 * @param watchKey
 * @returns {watchDep}
 */
watchDep.prototype.start = function (watchKey) {
    return watchToggle.bind(this)(watchKey, true)
};

/**
 * 关闭数据监听
 * @param watchKey
 */
watchDep.prototype.stop = function (watchKey) {
    return watchToggle.bind(this)(watchKey, false);
};

/**
 * 更新当前挂载的数据
 * @param bindData
 */
watchDep.prototype.update = function (bindData) {
    try {

        //检查是否常规属性
        if (!bindData.parentData.hasOwnProperty(bindData.key)) {
            // bindData.parentData[bindData.key] = undefined;
        }

        //改变数据实际值
        this.$data = bindData.parentData[bindData.key];

        //数据监测
        Object.defineProperty(bindData.parentData, bindData.key, {
            enumerable: true,
            configurable: true,
            set: function (newData) {
                var tmpData,
                    isChange,
                    childs = this.child,
                    sourceData=this.sourceData;

                //赋值
                this.$data = newData;

                //触发监控,数据比对(定位到数据差异位置,并避免同样数据重新渲染)
                isChange=!this.diff(newData, this.$oldData);

                //检查数据是否同源,否则解除之前数据的绑定
                if(this.sourceData !== newData && this.sourceData && this.sourceData.__dep__){
                    var oldDep = this.sourceData.__dep__;

                    //解除旧数据的绑定
                    Object.keys(oldDep.child).forEach(function (watchKey) {

                        //解除数据绑定监听
                        Object.defineProperty(this.sourceData, watchKey, {
                            writable: true,
                            enumerable: true,
                            configurable: true,
                            value: this.sourceData[watchKey]
                        });

                    }.bind(this));

                    delete this.sourceData.__dep__;
                }

                //广播更新下级挂载的数据
                Object.keys(childs).forEach(function (key) {
                    childs[key].update({
                        parentData: typeof newData === 'object' && newData !== null ? newData : (tmpData = {}, tmpData[key] = null, tmpData),
                        key: key
                    });
                });

                //数据改变则通知绑定更新
                isChange && this.trigger();

                //源数据
                this.sourceData = newData;

                //记录绑定的数据
                this.bindData = bindData;

            }.bind(this),
            get: function () {
                return this.$data;
            }.bind(this)
        });

        // console.log(this.$data)

        //获取更新方法
        this.getOwnPropertyDescriptorSet = Object.getOwnPropertyDescriptor(bindData.parentData, bindData.key).set.bind(this);

        //触发子级更新
        this.getOwnPropertyDescriptorSet(bindData.parentData[bindData.key]);
    }

    catch (e) {
    }

};

/**
 * 数据对比
 * @param newData
 * @param oldData
 * @returns {boolean}
 */
watchDep.prototype.diff = function (newData, oldData) {

    var $oldData,
        isPass = false,
        newType = getType(newData),
        oldType = getType(oldData),
        emptyType = 'Undefined,Null',

        //用来记录需要新增的新数据与需要删除的旧数据
        addDatas = [],
        changeDatas = [],
        removeDatas = [];

    //检查类型是否一致
    if (newType === oldType) {

        switch (newType) {
            case 'Object':
                var newKeys = Object.keys(newData),
                    oldKeys = Object.keys(oldData),
                    _oldKeys = [].concat(oldKeys);

                //检查数据键值是否一致

                if (!(isPass = String(newKeys.sort()) === String(oldKeys.sort()))) {

                    //数据遍历检查
                    newKeys.forEach(function (key, index) {

                        //检查是否是新增的数据
                        if (!(key in oldData)) {
                            //新增的属性
                            addDatas.push({
                                index: index,
                                data: newData[key]
                            })
                        }

                        //排除已存在的数据
                        var oldIndex = oldKeys.in(key);
                        if (oldIndex !== -1) {
                            oldKeys.splice(oldIndex, 1);
                        }

                    });

                    //遍历过时的数据
                    oldKeys.forEach(function (key) {
                        removeDatas.push({
                            index: _oldKeys.in(key),
                            data: oldData[key]
                        })
                    })

                }

                break;
            case 'Array':
                var index,
                    newLen = newData.length,
                    oldLen = oldData.length,
                    size = newLen - oldLen;

                //检查数据源是否一致
                if (this.sourceData === newData) {
                    var tmpIndex,
                        existKeys = {},
                        changeFlg = false;

                    //对数据进行分类
                    newData.forEach(function (val, index) {
                        if ((tmpIndex = oldData.in(val)) === -1) {
                            addDatas.push({
                                index: index,
                                data: val
                            })
                        } else {
                            changeDatas.push({
                                index: index,
                                oldIndex: tmpIndex,
                                data: val
                            });

                            index !== tmpIndex && (changeFlg = true);

                            existKeys[tmpIndex] = true;
                        }

                    });

                    //提取需要移除的旧数据
                    oldData.forEach(function (val, index) {
                        existKeys[index] || removeDatas.push({
                            index: index,
                            data: val
                        })
                    });

                    isPass = newLen === oldLen && !changeFlg && addDatas.length === 0 && removeDatas.length === 0

                } else {

                    switch (true) {
                        case size > 0:
                            index = oldLen - 1;
                            while (++index < newLen) {
                                addDatas.push({
                                    index: index,
                                    data: newData[index]
                                })
                            }

                            break;
                        case size < 0:
                            index = oldLen + size - 1;

                            while (++index < oldLen) {
                                removeDatas.push({
                                    index: index,
                                    data: oldData[index]
                                })
                            }
                            break
                    }

                }

                break;
            default:
                if (newData === oldData) {
                    isPass = true;
                }

        }

        //检查两个数据是否都是空
    } else if (emptyType.indexOf(newType) > -1 && emptyType.indexOf(oldType) > -1 && newType === oldType) {
        isPass = true;
    }

    //数据备份
    switch (newType) {
        case 'Object':

            $oldData = {};
            Object.keys(newData).forEach(function (key) {
                $oldData[key] = newData[key];
            });

            def(newData, '__dep__', this);
            // def(newData, '__dep__', typeof oldData === "undefined" && newData && this.$rootDep ?this.$rootDep.child[this.bindData.key]:this);

            __inspect__keys.forEach(function (key) {
                def(newData.__proto__, key, __inspect__[key]);
            });

            break;
        case 'Array':

            $oldData = [].concat(newData);

            def(newData, '__dep__', this);
            // def(newData, '__dep__', typeof oldData === "undefined" && newData && this.$rootDep ?this.$rootDep.child[this.bindData.key]:this);

            arrayMethodKeys.forEach(function (key) {
                def(newData.__proto__, key, arrayMethods[key]);
            });

            break;
    }

    //数据备份
    this.$oldData = $oldData || newData;

    //数据更改信息
    isPass || (this.changeInfo = {
        //数据类型
        oldType: oldType,
        newType: newType,
        //数据
        oldData: oldData,
        newData: newData,
        //源数据
        sourceData: this.sourceData,
        //数据新增与删除
        addDatas: addDatas,
        changeDatas: changeDatas,
        removeDatas: removeDatas

    });

    return isPass;

};

/**
 * 触发当前挂载监听
 */
watchDep.prototype.trigger = function () {
    //检查是否关闭监控
    if (!this.watchToggle)return false;
    //计数
    this.watchExecCount++;
    //遍历触发挂载的回调
    this.watchs.forEach(function (watch) {
        watch.fn.bind(watch)(this.$data, this.changeInfo);
    }.bind(this));
    return true;
};

/**
 * 销毁监听数据
 */
watchDep.prototype.destroy = function () {


    Object.defineProperty('','',{
        configurable: true,
        enumerable: true,
        value: undefined,
        writable: true
    })

    //数据监测
    Object.defineProperty(bindData.parentData, bindData.key, {
        enumerable: true,
        configurable: true,
        set: function (newData) {
            var tmpData,
                isChange,
                childs = this.child,
                sourceData=this.sourceData;

            //赋值
            this.$data = newData;

            //触发监控,数据比对(定位到数据差异位置,并避免同样数据重新渲染)
            isChange=!this.diff(newData, this.$oldData);

            //检查数据是否同源,否则解除之前数据的绑定
            if(this.sourceData !== newData && this.sourceData && this.sourceData.__dep__){
                var oldDep = this.sourceData.__dep__;

                //解除旧数据的绑定
                Object.keys(oldDep.child).forEach(function (watchKey) {

                    //解除数据绑定监听
                    Object.defineProperty(this.sourceData, watchKey, {
                        writable: true,
                        enumerable: true,
                        configurable: true,
                        value: this.sourceData[watchKey]
                    });

                }.bind(this));

                delete this.sourceData.__dep__;
            }

            //广播更新下级挂载的数据
            Object.keys(childs).forEach(function (key) {
                childs[key].update({
                    parentData: typeof newData === 'object' && newData !== null ? newData : (tmpData = {}, tmpData[key] = null, tmpData),
                    key: key
                });
            });

            //数据改变则通知绑定更新
            isChange && this.trigger();

            //源数据
            this.sourceData = newData;

            //记录绑定的数据
            this.bindData = bindData;

        }.bind(this),
        get: function () {
            return this.$data;
        }.bind(this)
    });


    return true;
};

/**
 * 数据属性设置
 * @param obj
 * @param key
 */
function def(obj, key, val, enumerable) {

    var conf = {
        writable: true,
        configurable: true,
        enumerable: !!enumerable
    };

    typeof val !== 'undefined' && (conf['value'] = val);

    Object.defineProperty(obj, key, conf);
}

/**
 * 获取数据类型
 * @param data
 * @returns {*}
 */
function getType(data) {
    return {}.toString.call(data).match(/object\s+(\w*)/)[1]
}


/**
 * 用来监听数组的操作
 * @type {any}
 */
var arrayProto = Array.prototype,
    arrayMethods = {},
    arrayMethodKeys = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', 'inspect'];

arrayMethodKeys.forEach(function (method) {

    //记录原始原型
    var original = arrayProto[method];

    def(arrayMethods, method, function () {

        var dep = this.__dep__ || {},
            bindData = dep.bindData,
            args = [].slice.call(arguments),
            result = original && original.apply(this, args);

        //通知更新
        if (bindData) {
            bindData.parentData[bindData.key] = this;
            // dep.update(bindData);
        }

        return original ? result : this;
    });
});

var __inspect__ = Object.create({}),
    __inspect__keys = ['inspect', 'addItem', 'removeItem'];

__inspect__keys.forEach(function (method) {
    def(__inspect__, method, function () {

        var arg1 = arguments[0],
            arg2 = arguments[1];
        switch (method) {
            case 'addItem':
                typeof arg1 === "undefined" || (this[arg1] = arg2);
                break;
            case 'removeItem':
                typeof arg1 === "undefined" || (delete this[arg1]);
                break;
        }

        var dep = this.__dep__ || {},
            bindData = dep.bindData;

        //通知更新
        if (bindData) {
            bindData.parentData[bindData.key] = this;
            // dep.update(bindData);
        }

        return this;
    });
});

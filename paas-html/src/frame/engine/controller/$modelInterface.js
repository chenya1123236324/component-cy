/**
 * Created by xiyuan on 16-5-18.
 */

/**
 * 数据模型接口
 * @param modelPath
 * @param $referer
 * @returns {$modelInterface}
 */
function $modelInterface(modelPath,$referer){

    //引用的资源
    def(this,'__$referer__');
    this.__$referer__=$referer;

    //数据模型方法,用于存储需要调用的方法
    def(this,'__allTaskModel__');
    this.__allTaskModel__=[];

    //数据模型监听相关操作,用于存储需要调用的监听相关操作
    def(this,'__allWatchTask__');
    this.__allWatchTask__=[];

    //存储$model数据初次载入完毕回调
    def(this,'__loadData__');
    this.__loadData__=[];

    //model实例对象
    def(this,'model');
    this.model=null;

    //$model数据
    def(this,'$model');
    this.$model=null;

    //调用数据模型
    var MV=modelVm(modelPath,$referer);

    MV.init(function(modelObj,modelInfo){

        //执行任务 (方法与数据监控)
        this.__allWatchTask__.forEach(function(task){
            switch (task.type){
                case 'watch':
                    modelObj.watch.apply(modelObj,task.parameter);
                    break;
                //删除数据监听
                case 'removeWatch':
                    modelObj.removeWatch.apply(modelObj,task.parameter);
                    break;
                //启动数据监听
                case 'startWatch':
                    modelObj.startWatch.apply(modelObj,task.parameter);
                    break;
                //停止数据监听
                case 'stopWatch':
                    modelObj.stopWatch.apply(modelObj,task.parameter);
                    break;

            }
        });

    }.bind(this));

    MV.load(function(modelObj,modelInfo){
        this.model=modelObj;
        modelVmInit.bind(this)(modelObj,modelInfo);
    }.bind(this));

    return this;
};

/**
 * 控制器中调用数据模型方法接口
 * @param methodName
 * @returns {*}
 */
$modelInterface.prototype.method=function(methodName){
    var arg=arguments,i=0,l=arg.length, v,newArg=[];
    if(l === 2){
        v=arg[1];
        newArg=$type.isArray(v)?v:[v];
    }else{
        while (++i<l){
            newArg.push(arg[i]);
        }
    }
    try{
        //检查当前model是否初始化
        if(this.model)return this.model.__storage__.methods[methodName].apply(this.model,newArg);

        //存储到方法存储器中
        this.__allTaskModel__.push({methodName:methodName,parameter:newArg,type:'method'});
    }
    catch (e){
        $log.warning('[数据模型] 外部自定义模型的'+methodName+'方法未定义或方法内部错误!');
    }

    return this;

};

/**
 * 数据模型监测
 * @param key
 * @param fn
 */
$modelInterface.prototype.watch=function(key,fn,isRead){

    switch (arguments.length){
        case 0:
            return;
        case 1:
            fn=key;
            key='';
            break;
    }

    //存储到方法存储器中
    this.__allWatchTask__.push({parameter:[key,fn.bind(this.__$referer__),isRead],type:'watch'});
    //检测是否$model数据载入完毕
    if(this.model){
        this.model.watch.apply(this.model,[key,fn,isRead]);
    }
    return this;
};

/**
 * 删除数据模型监测
 * @param key
 * @param fn
 */
$modelInterface.prototype.removeWatch=function(key,fn){
    //存储到方法存储器中
    this.__allWatchTask__.push({parameter:[key,fn],type:'removeWatch'});
    //检测是否$model数据载入完毕
    if(this.model){
        this.model.removeWatch.apply(this.model,[key,fn]);
    }
    return this;
};

/**
 * 启动数据监听
 * @param key
 */
$modelInterface.prototype.startWatch=function(key){
    //存储到方法存储器中
    this.__allWatchTask__.push({parameter:[key],type:'startWatch'});
    //检测是否$model数据载入完毕
    if(this.model){
        this.model.startWatch.apply(this.model,[key]);
    }
    return this;
};

/**
 * 关闭数据监听
 * @param key
 */
$modelInterface.prototype.stopWatch=function(key){
    //存储到方法存储器中
    this.__allWatchTask__.push({parameter:[key],type:'stopWatch'});
    //检测是否$model数据载入完毕
    if(this.model){
        this.model.stopWatch.apply(this.model,[key]);
    }
    return this;
};

/**
 * $model数据加载后回调
 * @param fn
 */
$modelInterface.prototype.readData=function(fn){
    //改变函数的作用域
    // fn=fn.bind(this.__$referer__);
    //存储到方法存储器中
    this.__loadData__.push({parameter:[fn],type:'loadData'});

    //检测是否$model数据载入完毕
    if(this.model){
        if(!this.model.__storage__.watchOn){
            fn.bind(this)(this.model.$model);
        }else{
            this.model.readData(function () {
                fn.apply(this,arguments);
            }.bind(this));
        }
    }
    return this;
};

/**
 * model数据写入
 * @param key
 * @param data
 */
$modelInterface.prototype.write=function(key, data){
    modelImage.prototype.write.apply(this,arguments)
    return this;
};

/**
 * model数据获取
 * @param key
 */
$modelInterface.prototype.get=function(key){
    return modelImage.prototype.get.apply(this,arguments);
};

/**
 * 获取源数据
 * @param key
 */
$modelInterface.prototype.getSource=function(key){
    return $FRAME.lib.$object.clone(modelImage.prototype.get.apply(this,arguments));
};

/**
 * model类型
 */
$modelInterface.prototype.__isModel__=true;

/**
 * model实例化后的初始化
 * @param modelObj
 * @param modelInfo
 */
function modelVmInit(modelObj,modelInfo){

    //model数据源映射到model接口对象上
    function mappedModel($model){

        if(!$model || typeof $model !== 'object')return false;

        //模型数据与模型对象进行绑定
        var propertyNames=Object.keys($model);
        propertyNames.forEach(function(key){
            //数据映射
            key in this || Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                set: function (nv) {
                    $model[key]=nv;
                }.bind(this),
                get: function () {
                    return $model[key];
                }
            });
        }.bind(this));
    }

    //model数据加载完后进行数据映射
    modelObj.readData(mappedModel.bind(this));

    //数据绑定
    Object.defineProperty(this, '$model', {
        enumerable: false,
        configurable: true,
        set: function (newVal) {
            modelObj.$model = newVal;
            //模型数据与模型对象进行绑定
            mappedModel.bind(this)(newVal);
        }.bind(this),
        get: function () {
            return modelObj.$model;
        }
    });

    //执行任务 (方法与数据监控)
    var modelMethod,
        modelMethods=modelObj.__storage__.methods;

    this.__allTaskModel__.forEach(function(task){
        modelMethod=modelMethods[task.methodName];
        if(!modelMethod){
            $log.warning('[数据模型] '+modelInfo.realPath+'文件中'+modelInfo.pathSlice+' 模型的'+task.methodName+'方法未定义!');
            return;
        }
        //调用对应的model方法
        modelMethod.apply(modelObj,task.parameter);
    });

    //数据挂载
    this.__loadData__.forEach(function(task){
        modelObj.readData.apply(modelObj,task.parameter);
    });

}




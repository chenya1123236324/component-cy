/**
 * Created by xiyuan on 16-8-1.
 */
/**
 *
 * @param behaviorTree
 * @param watchFn
 * @param watchData
 */
function watchSyntaxData(behaviorTree, toggle) {

    //用来开启是否监控立即执行
    toggle = typeof toggle === "undefined" ? true : !!toggle;

    //对象存储器
    var objectInfoStroage = behaviorTree.objectInfoStroage = behaviorTree.objectInfoStroage || {
                watchFns: behaviorTree.watchCallBacks,
                //当前文本节点下监听集合 {model:$model,key:watchKey}
                $rootListens: [],
                //监听开关
                toggle: true,
                //主任务监听开关
                $toggle: toggle,
                //需要替代的model
                replaceModel:{},
                //语法树
                behaviorTree: behaviorTree,
                //监控的数据
                watchData: behaviorTree.$pageAssign
            },
        //语法节点,并进行数据绑定
        listenDatas = behaviorTree.listenDatas;

    if (listenDatas.length && typeof behaviorTree.$value === 'undefined') {
        //动态监听
        dynamicListen(listenDatas, objectInfoStroage, behaviorTree.evalSyntx);
    } else {
        typeof behaviorTree.$value !== 'undefined' && (objectInfoStroage.toggle = false);
        computations(objectInfoStroage, behaviorTree.evalSyntx);
    }
    //手动销毁数据对象
    objectInfoStroage=listenDatas=null;
}

/**
 * 文本节点值的运算
 * @param textNode
 * @param evalSyntx
 * @param listenLen
 * @param parentListen
 */
function computations(objectInfoStroage, evalSyntx, listenLen, parentListen) {
    //监听未完成则停止运算
    if (listenLen)return;

    var $pageModel = objectInfoStroage.watchData.$pageModel,
        $pageFilter = objectInfoStroage.watchData.$pageFilter;

    //检查是否有上级(用于动态监听)
    if (parentListen && typeof objectInfoStroage.behaviorTree.$value === 'undefined') {
        var modelName,
            modelData,
            isWatch,
            watchRecord = parentListen.watchRecord = parentListen.watchRecord || {},
            watchSyntx = parentListen.watchSyntx,

            //数据提取与计算(主要用于监控)
            watchKey = watchSyntx.replace(/\[([^\/]+)\]/g, function (all, evalStr) {
                //创建数据副本
                var $pageModel = {};

                //数据克隆
                Object.keys(objectInfoStroage.watchData.$pageModel).forEach(function (modelKey) {
                    var mapVal=objectInfoStroage.watchData.$pageModel[modelKey];
                    $pageModel[modelKey]={};
                    $pageModel[modelKey].$model=mapVal?$object.clone(mapVal.$model):mapVal;
                });

                return "['" + eval(evalStr) + "']";
            });

        watchKey = watchKey.replace(/^\[([^.\]]+)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
            //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
            modelName = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
            return '';
        });

        //从页面总数据模型中获取对应的模型数据
        modelData = $pageModel[modelName];

        //转换常规数据为双向监听(把视图中所有数据转换成双向 与 treeConvert.js中 line 84 相对应)
        if (!(modelData instanceof $modelInterface)) {
            modelData = $MODEL();
            //数据写入
            modelData.write('', $pageModel[modelName]);
            //重新赋值
            $pageModel[modelName] = modelData;
        }

        if (modelData instanceof $modelInterface) {

            //监控回调
            function watchFn() {
                //判断监听状态
                objectInfoStroage.toggle && parentListen.computations();
            }

            //移除数据中的'.$model'语法标识
            watchKey = watchKey.replace(/\.\$model\.?/, '');

            //移除之前的动态监听
            //modelData.removeWatch(watchKey, watchFn);

            watchRecord[watchKey] ? isWatch = true : watchRecord[watchKey] = true;

            //当监控的数据模型数据加载完毕后的监控启动.
            modelData.readData(function () {
                //进行父级运算
                parentListen.computations();

                //检查是否已经有监听
                if (!isWatch) {
                    //数据监听,并触发文本值的计算
                    modelData.watch(watchKey, watchFn);
                }
                //手动销毁数据对象
                watchKey=modelData=watchFn=null;
            })

        } else {
            //未受监控的数据则直接运算
            parentListen.computations();
        }

        //手动销毁数据对象
        $pageModel =$pageFilter = modelName=isWatch=watchRecord = watchSyntx=null;

    } else {
        var value;
        objectInfoStroage.behaviorTree.isValue = true;

        //主任务执行开关
        if (!objectInfoStroage.$toggle) {
            objectInfoStroage.$toggle = true;
            return;
        }
        //在数据解析前关闭当前文本节点下的所有语法监听
        objectInfoStroage.toggle = false;


        (function (pageModel) {
            var $pageModel={},
                //获取语法过程中需要替换的数据与监听的Key
                replaceModelKey=Object.keys(objectInfoStroage.replaceModel);

            pageModel.forEach(function (val,key) {
                $pageModel[key]=val;
            });

            //检查需要替换的watchKey(主要是避免model数据中有数据,但是监控中的数据确未填充)
            if(replaceModelKey.length){
                var sortKey=[],
                    _watchKey,
                    replaceIndex=0,
                    replaceKey='__replaceWatchKey__'+Date.now()+'_MODEL_';

                replaceModelKey.forEach(function (nowWatchKey) {
                    sortKey.push({
                        len:nowWatchKey.length,
                        index:sortKey.length,
                        watchKey:nowWatchKey,
                        val:objectInfoStroage.replaceModel[nowWatchKey]
                    })
                });

                //进行数据排序
                sortKey=sortKey.sort(function (a,b) {
                    return b.len - a.len;
                });

                //遍历需要替换的数据
                sortKey.forEach(function (data) {
                    _watchKey=replaceKey+(replaceIndex++);
                    $pageModel[_watchKey]=data.val;
                    //开始替换语法中的语法字符
                    evalSyntx=evalSyntx.replace(data.watchKey,'$pageModel.'+_watchKey)
                });
            }

            //运行
            try {
                value = eval(evalSyntx);
            }
            catch (e) {
                value = undefined;
                // console.log('语法解析错误:' ,e,'---------------')
            }

            objectInfoStroage.behaviorTree.$value = value;

            //赋值给文本节点
            objectInfoStroage.watchFns.forEach(function (fn) {
                fn(value/*,'yes'*/);
            });

            //语法解析完毕后开启当前文本节点语法监听
            objectInfoStroage.toggle = true;

            //销毁闭包中的数据对象
            $pageModel  = pageModel =value=replaceModelKey=sortKey=_watchKey=replaceIndex=replaceKey=null;

        })($pageModel);

        //销毁数据对象
        $pageModel =$pageFilter =null;
    }
}

/**
 * 动态监听
 * @param listenDatas
 */
function dynamicListen(listenDatas, objectInfoStroage, evalSyntx, parentListen, parentListenLen) {
    var listenLen = listenDatas.length,
        $pageModel = objectInfoStroage.watchData.$pageModel;

    listenDatas.forEach(function (listenData) {
        var watchKey,
            modelName,
            modelData,
            listenEvalSyntx=listenData;

        if (typeof listenData === 'object') {

            //注入触发事件
            listenData.computations = function () {
                listenLen && listenLen--;
                computations(objectInfoStroage, evalSyntx, listenLen, parentListen, parentListenLen);

            };

            //回调处理子级监控依赖
            dynamicListen(listenData.dep, objectInfoStroage, evalSyntx, listenData, listenLen);
            return
        } else {
            listenLen--;
        }

        watchKey = listenData.replace(/^\[([^.\]]+)\]|^\.?([^.\[\]]+)/, function (str, arrKey, objKey) {
            //匹配提取[key]或.key 这两种形式的key 并去除key外部的单引号或双引号
            modelName = (arrKey || objKey).match(/^(['"]?)([\s\S]+)\1$/).pop();
            return '';
        });

        //从页面总数据模型中获取对应的模型数据
        modelData = $pageModel[modelName];

        //防止获取到不存在的数据（创建一个数据监听）
        if (typeof modelData === 'undefined') {
            modelData = $MODEL();

            //转换常规数据为双向监听(把视图中所有数据转换成双向 与 treeConvert.js中 line 84 相对应)
        } else if (!(modelData instanceof $modelInterface)) {
            modelData = $MODEL();
            //数据写入
            modelData.write('', $pageModel[modelName]);
        }

        //重新赋值
        $pageModel[modelName] === modelData || ($pageModel[modelName] = modelData);

        if (modelData instanceof $modelInterface) {

            //监听记录
            listenLen++;

            //移除数据中的'.$model'语法标识
            watchKey = watchKey.replace(/\.\$model\.?/, '');

            //利用闭包来储存相关数据
            (function (modelData, watchKey) {

                //防止 model read 与watch同时执行
                var nowWatchKey='$pageModel.'+listenEvalSyntx;

                //当监控的数据模型数据加载完毕后的监控启动.
                modelData.readData(function ($model) {
                    listenLen--;
                    //语法试运行(主要检查数据是否全部填充)
                    try{
                        eval(nowWatchKey);
                    }
                    catch (e){
                        //记录需要替换的key
                        objectInfoStroage.replaceModel[nowWatchKey]=undefined;
                    }

                    //执行语法运算(检查是否顶层数据)
                    computations(objectInfoStroage, evalSyntx, listenLen, parentListen, parentListenLen);

                    //数据监听,并触发文本值的计算
                    modelData.watch(watchKey, function (val) {

                        //语法试运行(主要检查数据是否全部填充)
                        try{
                            eval(nowWatchKey);
                            delete objectInfoStroage.replaceModel[nowWatchKey];
                        }
                        catch (e){
                            //记录需要替换的key
                            objectInfoStroage.replaceModel[nowWatchKey]=undefined;
                        }
                        //判断监听状态
                        objectInfoStroage.toggle && computations(objectInfoStroage, evalSyntx, listenLen, parentListen, parentListenLen);
                    });

                });

            })(modelData, watchKey)

        } else {
            computations(objectInfoStroage, evalSyntx, listenLen, parentListen, parentListenLen);
        }


    });

}

/**
 * 设置多层级数据
 * @param model
 * @param modelKey
 * @param writeKey
 * @param data
 */
function setLevelData(model, modelKey, writeKey,data) {
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
    }
    setLevelData(model[modelKey], property, writeKey,data);
    property=null;
}

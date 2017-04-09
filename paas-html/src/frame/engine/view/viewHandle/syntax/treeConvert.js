/**
 * Created by xiyuan on 16-7-18.
 */

/**
 * 语法树转换
 * @param behaviorTree
 * @returns {*}
 */
function treeConvert(behaviorTree) {
    //转化正则字符
    function convertRegExp(str) {
        return str.replace(/[-.*+?^${}()|[\]\/\\]/g, '\\$&');
    }

    //数据监听容器
    var listenDatas = [],
        $pageAssign = behaviorTree.$pageAssign,
        $pageModel = $pageAssign.$pageModel,
        //语法树
        syntaxTree = behaviorTree.syntaxTree,
        //语法队列
        queue = syntaxTree.queue,
        //语法的大分类
        state,
        //语法小类型
        type,
        //语法内容
        content,
        //处理的信息
        handleInfo,
        //语法节点
        syntxNode,
        //队列索引
        qi = ~0,
        //队列长度
        ql = queue.length,
        //上一步变量语法
        lastVarSyntx = '',
        //转化后的语法解析 (备用动态运算)
        evalSyntx = '',
        //定义的变量上下文字符
        $assignVar = behaviorTree.assignVar || '$pageModel',
        //过滤器上下文字符
        $filterVar = behaviorTree.filterVar || '$pageFilter';

    while (++qi < ql) {
        syntxNode = queue[qi];
        type = syntxNode.type;
        content = syntxNode.content;
        handleInfo = syntxNode.handleInfo;

        switch (syntxNode.state) {
            //修饰符
            case 'decorate':
                lastVarSyntx += content;
                break;
            //自运算
            case 'selfAssignment':
                if (handleInfo.loaction === "prev") {
                    //前置
                    lastVarSyntx += content;
                } else {
                    //后置
                    evalSyntx += content;
                    lastVarSyntx = '';
                }

                break;
            //变量
            case 'variable':
                switch (type) {
                    case "object":
                        var i = 0,
                            element,
                            _decorate = lastVarSyntx,
                            isContainObject = false,
                            level = handleInfo.level,
                            nowLevel = handleInfo.nowLevel;

                        switch (typeof (element = level[i])) {
                            case 'string':
                                //检查并拼装语法(全部转换为双向数据 与 watchSyntaxData.js line 187  相对应 )
                                // lastVarSyntx += $assignVar + '.' + element + ($pageModel[element] instanceof $modelInterface || typeof $pageModel[element] === 'undefined' ? '.$model' : '');
                                lastVarSyntx += $assignVar + '.' + element + ($pageModel[element] instanceof $modelInterface || typeof $pageModel[element] === 'undefined' ? '.$model' : '.$model');
                                break;
                            case 'object':
                                //检查子级节点中是否有需要监听的数据
                                element.listenDatas.length && (isContainObject = true);
                                //添加到监听数据中
                                listenDatas = listenDatas.concat(element.listenDatas);


                                //添加子级语法字符
                                switch (element.mode) {
                                    case 'block':
                                        lastVarSyntx += '[' + element.evalSyntx + ']';
                                        break;
                                    case 'blockVal':
                                    case 'blockFn':
                                        lastVarSyntx += '(' + element.evalSyntx + ')';
                                        break;
                                }
                                break;
                        }

                        //变量组合内部
                        while (++i <= nowLevel) {
                            switch (typeof (element = level[i])) {
                                case 'string':
                                    lastVarSyntx += '.' + element;
                                    break;
                                case 'object':
                                    //检查子级节点中是否有需要监听的数据
                                    element.listenDatas.length && (isContainObject = true);
                                    //添加到监听数据中
                                    listenDatas = listenDatas.concat(element.listenDatas);
                                    //添加子级语法字符
                                    switch (element.mode) {
                                        case 'block':
                                            lastVarSyntx += '[' + element.evalSyntx + ']';
                                            break;
                                        case 'blockVal':
                                        case 'blockFn':
                                            lastVarSyntx += '(' + element.evalSyntx + ')';
                                            break;
                                    }
                                    break;
                            }
                        }

                        //检查当期语法树是否过滤器的参数与是否$,如果是则忽略不加入监控  并且不能是代码块
                        if (!(nowLevel === 0 && behaviorTree.distinction === 'filterArg' && level[0] === '$') /*&& !(handleInfo.mode === 'blockVal' || handleInfo.mode === 'blockFn')*/  ) {

                            //移除监控变量字符串中的修饰符与顶级对象名称前缀(主要用来获取model)
                            var listenData = (_decorate ? lastVarSyntx.replace(_decorate, '') : lastVarSyntx).match(new RegExp('^' + convertRegExp($assignVar + '.')+'([^\(]+)'));
                            if(listenData && (listenData=listenData[1])){

                                //检查是否包含子级监控
                                if (isContainObject) {
                                    //拼装成复杂的多重动态监听
                                    listenDatas = [{watchSyntx: listenData, dep: listenDatas}]
                                } else {

                                    //移除语法上的修饰符,并添加到监听数据中
                                    listenDatas.push(listenData);
                                }
                            }
                        }
                        break;
                    case 'string':
                    case 'number':
                        lastVarSyntx += content;
                        break;
                }
                //语法拼接
                evalSyntx += lastVarSyntx;

                break;
            //运算符号
            case 'arithmetic':
                evalSyntx += content;
                lastVarSyntx = '';
                break;
            //数据过滤
            case 'deviation':
                switch (type) {
                    case 'filter':
                        //语法复位
                        evalSyntx = evalSyntx.replace(new RegExp(convertRegExp(lastVarSyntx) + '$'), '');

                        //过滤器语法调整
                        lastVarSyntx = $filterVar + '["' + handleInfo.name + '"](' + function () {
                                if (handleInfo.arrayAnalytic) {
                                    //替换过滤器中的$变量占位符
                                    lastVarSyntx = handleInfo.arrayAnalytic.evalSyntx.replace(new RegExp(convertRegExp($assignVar + '.$.$model') /*+ '(,|$)'*/), lastVarSyntx);
                                }
                                return lastVarSyntx;
                            }() + ')';

                        //语法组合
                        evalSyntx += lastVarSyntx;
                        //添加到监听数据中
                        handleInfo.arrayAnalytic && handleInfo.arrayAnalytic.listenDatas.forEach(function (value) {
                            value !== '$' && listenDatas.push(value);
                        });

                        break;
                }
                break;
            //分割节点 ，
            case 'split':
                switch (type) {
                    case 'split':
                        evalSyntx += content;
                        lastVarSyntx = '';
                        break;
                }
                break;
        }
    }

    //组合好后语法字符写入语法树
    behaviorTree.evalSyntx = evalSyntx;

    //监听的数据
    behaviorTree.listenDatas = listenDatas;

    //对象销毁
    convertRegExp=listenDatas = $pageAssign = $pageModel = syntaxTree = queue = state=type=content=handleInfo=syntxNode= qi =  ql = lastVarSyntx =evalSyntx = $assignVar =$filterVar =null;

    return behaviorTree
}
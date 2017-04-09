/**
 * Created by xiyuan on 16-7-14.
 */

//用于字符匹配
var lowerCase = 'abcdefghijklmnopqrstuvwxyz',
    upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    allLetter = lowerCase + upperCase,
    operator = '+-*/%<=>?:;|()',
    numberString = '1234567890',
    variableString = lowerCase + upperCase + numberString + '_$';

/**
 * 数组语法树
 * @param behaviorTree
 * @returns {arrayAnalytic}
 */
function arrayTree(behaviorTree) {
    return new arrayAnalytic(behaviorTree.$pageAssign,function () {
        this.assignVar = behaviorTree.assignVar;
        this.filterVar = behaviorTree.filterVar;
    });
}

/**
 * 括号代码块语法树
 * @param behaviorTree
 * @returns {arrayAnalytic}
 */
function blockTree(behaviorTree) {
    return new arrayAnalytic(behaviorTree.$pageAssign,function () {
        this.assignVar = behaviorTree.assignVar;
        this.filterVar = behaviorTree.filterVar;

        //规则重写
        this.rule.start = [
            {
                v: ['('],
                type:'start'
            }
        ];

        this.rule.end = [
            {
                v: [')'],
                type:'end'
            }
        ];
    });
}

/**
 * 语法行为树
 * @param str
 * @constructor
 */
function behaviorTree($pageAssign,rule, order, starName, endName) {
    //参数方法
    var configFn = typeof rule === "function" && rule;

    this.$pageAssign=$pageAssign;

    //起始规则名称
    this.starName = starName || 'start';

    //结束规则名称
    this.endName = endName || 'end';

    //重置当前语法状态
    this.reset();

    //当前语法节点是否结束 [success || handle | fail  ]
    this.resState = 'fail';

    //语法树
    this.syntaxTree = new syntaxTree();

    //当前语法类型节点
    this.syntaxNode = null;

    //定义的变量上下文字符(用于生成最终可以运算的表达式)
    this.assignVar = '$pageModel';

    //过滤器上下文字符(用于生成最终可以运算的表达式)
    this.filterVar = '$pageFilter';

    //等待匹配的行为
    this.handleBehaviors=[];

    //数据监听回调
    this.watchCallBacks=[];

    //行为顺序
    this.order = order || {
            //进入语法解析状态
            start: [
                'selfAssignment',
                'decorate',
                'variable',
                'end'
            ],
            //自赋值/自运算
            selfAssignment: [
                'variable',
                'arithmetic',
                'deviation',
                'end'
            ],
            //修饰符号
            decorate: [
                'variable',
                'selfAssignment',
                'decorate'
            ],
            //变量 数据
            variable: [
                'end',
                'selfAssignment',
                'arithmetic',
                'deviation',
                'end'
            ],
            //运算 (常规 加减乘除 与或非 ~ 三元运算 以及 数据过滤)
            arithmetic: [
                'decorate',
                'variable'
            ],
            //变异的运算
            deviation: [
                'deviation',
                'arithmetic',
                'end'
            ],
            end: [
                'start'
            ]
        };

    //行为规则
    this.rule = configFn !== rule && rule || {
            //进入语法解析状态
            start: [
                {
                    v: ['{', '{'],
                    type: 'start'
                }
            ],
            //赋值运算
            assignment: [
                {
                    v: ['='],
                    type: '='
                }
            ],
            //自赋值运算(如 前后加加 与前后减减 )
            selfAssignment: [
                {
                    v: function (str, syntxNode, nextStr) {
                        //检查字符串是否符合要求
                        if (str !== '-')return false;
                        //检查语法节点初次是通过
                        if (syntxNode.handleInfo) {
                            var prevNode = syntxNode.prev();
                            syntxNode.end = true;

                            /*检查是否前置还是后置*/

                            //判断上一个语法节点是否是变量
                            if (prevNode.state === "variable" && prevNode.type === "object") {
                                if (prevNode.isSourceVal)return false;
                                //后置
                                syntxNode.handleInfo.loaction = 'next';

                                //检查下一个字符是否属于运算符号 或 结束符号 否则语法错误
                                if ((operator + '}').indexOf(nextStr) === -1) {
                                    //对象销毁
                                    prevNode=null;
                                    return false;
                                }
                            }
                            //检查下一个字符来判断是否为变量
                            else if ((allLetter + '$_').indexOf(nextStr) !== -1) {
                                //前置
                                syntxNode.handleInfo.loaction = 'prev';
                            } else {
                                //对象销毁
                                prevNode=null;
                                return false;
                            }

                        } else {
                            //符合要求初次进入并初始化
                            syntxNode.handleInfo = {}
                        }

                        //对象销毁
                        prevNode=null;
                        return true;
                    },
                    type: '--'
                },
                {
                    v: function (str, syntxNode, nextStr) {
                        //检查字符串是否符合要求
                        if (str !== '+')return false;
                        //检查语法节点初次是通过
                        if (syntxNode.handleInfo) {
                            var prevNode = syntxNode.prev();
                            syntxNode.end = true;

                            /*检查是否前置还是后置*/

                            //判断上一个语法节点是否是变量
                            if (prevNode.state === "variable" && prevNode.type === "object") {
                                if (prevNode.isSourceVal)return false;
                                //后置
                                syntxNode.handleInfo.loaction = 'next';

                                //检查下一个字符是否属于运算符号 或 结束符号 否则语法错误
                                if ((operator + '}').indexOf(nextStr) === -1) {

                                    //对象销毁
                                    prevNode=null;
                                    return false;
                                }
                            }
                            //检查下一个字符来判断是否为变量
                            else if ((allLetter + '$_').indexOf(nextStr) !== -1) {
                                //前置
                                syntxNode.handleInfo.loaction = 'prev';
                            } else {

                                //对象销毁
                                prevNode=null;
                                return false;
                            }
                            //对象销毁
                            prevNode=null;

                        } else {
                            //符合要求初次进入并初始化
                            syntxNode.handleInfo = {}
                        }

                        return true;
                    },
                    type: '++'
                }
            ],
            //修饰符号
            decorate: [
                {
                    v: ['!'],
                    type: '!'
                },
                {
                    v: ['~'],
                    type: '~'
                },
                {
                    v: ['-'],
                    type: '-'
                },
                {
                    v: ['+'],
                    type: '+'
                }
            ],
            //变量 数据
            variable: [
                {
                    //字符串
                    v: function (str, syntxNode) {
                        var pass = true,
                            handleInfo = syntxNode.handleInfo;
                        //检查当前状态
                        if (handleInfo && typeof handleInfo.firstLetter !== "undefined") {
                            //检查是否符合字符串闭合  并设置当前值为源值
                            handleInfo.firstLetter === str && (syntxNode.isSourceVal = syntxNode.end = true);
                        }
                        //检查是否是字符串
                        else if ('"\''.indexOf(str) !== -1) {
                            syntxNode.handleInfo = {
                                firstLetter: str
                            };
                        } else {
                            pass = false
                        }
                        //对象销毁
                        handleInfo=null;
                        return pass;
                    },
                    type: 'string'
                },
                {
                    //数字 Number 类型
                    v: function (str, syntxNode, nextStr) {
                        var pass = true;
                        //检查当前状态
                        if (numberString.indexOf(str) !== -1) {
                            //设置当前语法节点为源值
                            numberString.indexOf(nextStr) === -1 && (syntxNode.isSourceVal = syntxNode.end = true);
                        } else {
                            pass = false
                        }

                        return pass;
                    },
                    type: 'number'
                },
                {
                    //变量及多层级对象及function执行
                    v: function (str, syntxNode, nextStr) {
                        var pass = true,
                            handleInfo = syntxNode.handleInfo,
                            level = handleInfo && handleInfo.level,
                            nowLevel = level && handleInfo.nowLevel;
                        if (level) {

                            //变量表达式
                            handleInfo.expression = handleInfo.expression + str;

                            //判断当前解析模式
                            if (handleInfo.mode === 'block') {

                                //检查子语法返回的语法状态
                                switch (level[nowLevel].handle(str, nextStr)) {
                                    case 'success':
                                        //检查接下来的字符是否符合此次语法节点结束
                                        if (('.[').indexOf(nextStr) === -1) {
                                            syntxNode.end = true;
                                        } else {
                                            //进入下一级
                                            //如发现有子级则进入子级状态
                                            nowLevel = ++handleInfo.nowLevel;
                                            handleInfo.mode = 'key';
                                            handleInfo.level[nowLevel] = '';
                                            //检查是否进入下级代码块
                                            if (nextStr === '[') {
                                                //进入数组解析
                                                handleInfo.level[nowLevel] = arrayTree(this);
                                                handleInfo.level[nowLevel].mode  = handleInfo.mode = 'block';
                                            }else if(nextStr === '('){
                                                //进入方法运算
                                                handleInfo.level[nowLevel] = blockTree(this);
                                                handleInfo.level[nowLevel].mode = handleInfo.mode = 'blockFn';
                                            };
                                        }

                                        break;
                                    case 'fail':

                                        //对象销毁
                                        handleInfo = level = nowLevel = null;
                                        return false;
                                        break;
                                    default:

                                }

                                //对象销毁
                                handleInfo = level = nowLevel = null;
                                return true;
                            }else if(handleInfo.mode === 'blockVal' || handleInfo.mode === 'blockFn' ){
                                //检查子语法返回的语法状态
                                switch (level[nowLevel].handle(str, nextStr)) {
                                    case 'success':
                                        //检查接下来的字符是否符合此次语法节点结束
                                        if (('.[(').indexOf(nextStr) === -1) {
                                            syntxNode.end = true;
                                        } else {
                                            //进入下一级
                                            //如发现有子级则进入子级状态
                                            nowLevel = ++handleInfo.nowLevel;
                                            handleInfo.mode = 'key';
                                            handleInfo.level[nowLevel] = '';
                                            //检查是否进入下级代码块
                                            if (nextStr === '[') {
                                                //进入数组解析
                                                handleInfo.level[nowLevel] = arrayTree(this);
                                                handleInfo.level[nowLevel].mode=handleInfo.mode = 'block';
                                            }else if(nextStr === '('){
                                                //进入方法运算
                                                handleInfo.level[nowLevel] = blockTree(this);
                                                handleInfo.level[nowLevel].mode = handleInfo.mode = 'blockFn';
                                            };
                                        }

                                        break;
                                    case 'fail':

                                        //对象销毁
                                        handleInfo = level = nowLevel = null;
                                        return false;
                                        break;
                                    default:
                                }

                                //对象销毁
                                handleInfo = level = nowLevel = null;
                                return true;
                            }

                            //判断当前是否进入对象子级
                            if (str === '.') {
                                //检查下一个字符串来判断当前语法是否正确 (检测接下来的字符是否符合下级变量名)
                                if ((lowerCase + upperCase + '_$[(').indexOf(nextStr) === -1)return false;
                            } else {
                                //组合属性名称
                                level[nowLevel] += str;
                            }

                            //检查下一步是否进入子级状态
                            if ('.[('.indexOf(nextStr) !== -1) {

                                //如发现有子级则进入子级状态
                                nowLevel = ++handleInfo.nowLevel;
                                handleInfo.mode = 'key';
                                handleInfo.level[nowLevel] = '';
                                //检查是否进入下级代码块
                                if (nextStr === '[') {
                                    //进入数组解析
                                    handleInfo.level[nowLevel] = arrayTree(this);
                                    handleInfo.level[nowLevel].mode = handleInfo.mode = 'block';
                                }else if(nextStr === '('){
                                    //进入方法运算
                                    handleInfo.level[nowLevel] = blockTree(this);
                                    handleInfo.level[nowLevel].mode = handleInfo.mode = 'blockFn';
                                };

                                //对象销毁
                                handleInfo = level = nowLevel = null;
                                return true;
                            }
                            //检查接下来的字符是否符合此次语法节点结束
                            if ((variableString + '[].').indexOf(nextStr) === -1) {
                                //如其他字符则直接结束 并且检查其中 [ ] 括号是否关闭
                                if (handleInfo.arrayTaskCount) {
                                    //对象销毁
                                    handleInfo = level = nowLevel = null;
                                    return false
                                }
                                syntxNode.end = true;
                            }
                            //检查下一个字符串是否 ]
                            else if (!handleInfo.arrayTaskCount && nextStr === ']') {
                                syntxNode.end = true;
                            }

                        }
                        //检查是合法变量开头
                        else if ((lowerCase + upperCase + '_$(').indexOf(str) !== -1) {
                            handleInfo = syntxNode.handleInfo = {
                                //语法表达式
                                expression: str,
                                //数组个数记录
                                arrayTaskCount: 0,
                                //子级模式 [ key | block | blockVal | null]
                                mode: null,
                                //当前层级
                                nowLevel: 0,
                                //用于存储对象层级数据
                                level: []
                            };

                            //记录顶层数据
                            handleInfo.level[0] = str;

                            //检查是否代码块
                            if(str === '('){
                                //进入代码块解析
                                handleInfo.level[0] = blockTree(this);
                                handleInfo.level[0].handle(str, nextStr);
                                handleInfo.level[0].mode=handleInfo.mode = 'blockVal';

                            //检查下个字符串是否在有效字符串内
                            }else if ((variableString + '[.(').indexOf(nextStr) === -1) {
                                //如其他字符则直接结束
                                syntxNode.end = true
                            } else if ('.[('.indexOf(nextStr) !== -1) {
                                //如发现有子级则进入子级状态
                                handleInfo.nowLevel = 1;
                                handleInfo.mode = 'key';
                                handleInfo.level[nowLevel] = '';
                                //检查是否进入下级代码块
                                if (nextStr === '[') {
                                    //进入数组解析
                                    handleInfo.level[1] = arrayTree(this);
                                    handleInfo.level[1].mode = handleInfo.mode = 'block';
                                }else if(nextStr === '('){
                                    //进入方法运算
                                    handleInfo.level[1] = blockTree(this);
                                    handleInfo.level[1].mode = handleInfo.mode = 'blockFn';
                                };
                            }

                        } else {
                            pass = false;
                        }

                        //对象销毁
                        handleInfo = level = nowLevel = null;
                        return pass;
                    },
                    type: 'object'
                }
            ],
            //运算 (常规 加减乘除 与或非 ~ 三元运算  ,比较运算符)
            arithmetic: [
                //加
                {
                    v: ['+'],
                    type: 'add'
                },
                //减
                {
                    v: ['-'],
                    type: 'minus'
                },
                //乘
                {
                    v: ['*'],
                    type: 'multiply'
                },
                //除
                {
                    v: ['/'],
                    type: 'division'
                },
                // % 取模
                {
                    v: ['%'],
                    type: 'modulo'
                },
                //与
                {
                    v: ['&', '&'],
                    type: 'and'
                },
                //或
                {
                    v: ['|', '|'],
                    type: 'or'
                },
                //三元运算
                {
                    v: [function () {

                    }],
                    type: 'ternary'
                },
                /*位运算*/
                {
                    v: ['<<'],           //位左移
                    type: 'leftShift'
                },
                {
                    v: ['>>'],           //位右移
                    type: 'rightShift'
                },
                //比较运算
                {
                    v: ['<'],
                    type: '<'
                },
                {
                    v: ['>'],
                    type: '>'
                },
                {
                    v: ['=', '='],
                    type: '=='
                },
                {
                    v: ['=', '=', '='],
                    type: '==='
                },
                {
                    v: ['>', '='],
                    type: '>='
                },
                {
                    v: ['<', '='],
                    type: '<='
                },
                {
                    v: ['!','='],
                    type: '!='
                },
                {
                    v: ['!','=','='],
                    type: '!=='
                }
            ],
            //变异的运算 (如数据过滤解析)
            deviation: [
                //数据过滤解析
                {
                    v: function (str, syntxNode, nextStr) {
                        var pass = true,
                            handleInfo = syntxNode.handleInfo;

                        //检查当前状态
                        if (handleInfo && typeof handleInfo.name !== "undefined") {
                            var arrayResolve = handleInfo.arrayAnalytic;
                            //检查是否有数组参数
                            if (arrayResolve) {

                                switch (arrayResolve.handle(str, nextStr)) {
                                    case 'success':
                                        //此次语法节点结束
                                        syntxNode.end = true;
                                        break;
                                    case 'fail':

                                        break;
                                    default:

                                }

                            }

                            //检查过滤器名称
                            else if (variableString.indexOf(str) !== -1) {
                                //检查变量名称第一个字符串不能为数字
                                if (handleInfo.name.length === 0 && numberString.indexOf(str) !== -1) {
                                    return false;
                                }

                                //组合名称
                                handleInfo.name = handleInfo.name + str;
                                //检查是否当前过滤是否结束(根据判断下一个字符)
                                if ((variableString + ':').indexOf(nextStr) === -1) {
                                    syntxNode.end = true
                                }

                                //检查是否带用参数
                            } else if (handleInfo.name.length > 0 && str === ':') {
                                //进入数组解析
                                handleInfo.arrayAnalytic = arrayTree(this);
                                //添加区别标识
                                handleInfo.arrayAnalytic.distinction = 'filterArg';
                            } else {
                                pass = false
                            }

                        }
                        else if (str === '|') {
                            //检查是否是字符串
                            syntxNode.handleInfo = {
                                name: ''
                            };
                        } else {
                            //不匹配
                            pass = false
                        }
                        //对像销毁
                        handleInfo=null;
                        return pass;
                    },
                    type: 'filter'
                }
            ],
            //语句完整结束
            end: [
                {
                    v: ['}', '}'],
                    type: 'end'
                }
            ]
        };

    //回调配置
    configFn && configFn.bind(this)(this);
}

/**
 * 状态ID生成
 * @returns {sid}
 */

behaviorTree.prototype.makeId = function () {
    return this.sid = (this.sid || 0) + 1;
};

/**
 * 行为处理
 */
behaviorTree.prototype.handle = function (str, nextStr) {

    var state = this.state,
        rule = this.rule;

    //行为状态检测
    state in rule
        ? handleSpeed.bind(this)( rule, str, nextStr)
        : handleEntry.bind(this)( rule, str, nextStr);

    //返回语法树状态
    return this.resState;
};

/**
 * 检测是否符合进入语法解析
 * @param rule
 * @param str
 * @param nextStr
 * @returns {boolean}
 */
function handleEntry( rule, str, nextStr) {
    //过滤掉空字符串
    if (str == ' ' && this.resState === 'handle') {
        return true
    }

    //检查状态列队中是否存在状态
    if(!this.handleStates.length){
        return this.reset();
    }

    //获取下一个
    var state=this.state=this.handleStates.shift(),
    //状态下的行为规则
        behaviors=this.handleBehaviors=this.rule[state].concat([]),
    //创建节点
        syntaxNode= this.syntaxNode = this.syntaxTree.add(state),
        behavior,
        index=~0;

    //遍历当前状态下的行为规则
    while (behavior=behaviors.shift()){
        index++;
        if (this.match(str, typeof behavior.v === "function" ? behavior.v : behavior.v[0], nextStr)) {
            this.state = state;
            this.action = index;
            this.speed = 1;

            //内容添加到当前语法节点内容中
            syntaxNode.type = behavior.type;
            syntaxNode.action = this.speed;

            //检查当前语法节点是否匹配完毕(标识节点匹配结束)
            typeof behavior.v !== "function" && this.speed === behavior.v.length && (this.syntaxNode.end = true);

            //检查最后状态是否结束状态,并标识语法匹配结束
            if (this.syntaxNode.end && this.endName === state) {
                this.resState = 'success';
                this.success();
            }

            return true;
        }
    }

    //如果以上没有匹配成功则移除之前创建的语法节点
    this.syntaxTree.pop();

    //继续往下匹配  (待处理的状态)
    if(this.handleStates.length && handleEntry.apply(this,arguments)){
        return true;
    }else{
        return this.reset();
    }
}

/**
 * 行为步骤处理
 * @param rule
 * @param str
 * @param nextStr
 * @returns {*}
 */
function handleSpeed( rule, str, nextStr) {
    //操作值
    var i = ~0,
        state=this.state,
        speed = this.speed,
        action = this.action,
        order = this.order[state],
        actionValue = rule[state][action].v,
        l = typeof actionValue === "function" ? actionValue : null,
        actionLength = l || actionValue.length;

    //检查当前节点数据匹配是否结束
    if (this.syntaxNode.end) {
        this.handleStates=order.concat([]);

        //匹对顺序的下一步
        if (handleEntry.apply( this,arguments))return true;
        //不符合进入语法解析,重置状态
        return this.reset();
    }

    //检查是否函数处理
    if (l) {
        //匹对失败,重新进入下一个状态匹配
        this.match(str, l, nextStr) || againHandle.apply(this,arguments) ;
    }

    /*检测当前状态是否已完成*/
    //继续匹对
    else if (actionLength > speed) {
        //检测是否匹配
        if (this.match(str, actionValue[speed], nextStr)) {
            //内容添加到当前语法节点内容中
            this.speed = speed + 1;
            //检查当前语法节点是否匹配完毕(标识节点匹配结束)
            this.speed === actionLength && (this.syntaxNode.end = true) && this.endName === state && (this.resState = 'success') && this.success();
        } else {
            againHandle.apply(this,arguments)
        }

    }
}

/**
 * 重新匹配当前状态下的语法(用于匹配失败再次匹配)
 * @param rule
 * @param str
 * @param nextStr
 * @returns {boolean|*}
 */
function againHandle(rule, str, nextStr){
    //需要重新检测的字符
    var nowStr=this.syntaxNode.content+ str+ nextStr,
    //表达式字符长度
        slen = nowStr.length-1,
        i = 0;

    //如果以上没有匹配成功则移除之前创建的语法节点
    this.syntaxTree.pop();

    //重新进入语法匹配
    handleEntry.apply(this,[ rule, nowStr.charAt(0), nowStr.charAt(1)]);

    //数据重新匹配
    while (++i < slen) {
        str = nowStr.charAt(i);
        nextStr = nowStr.charAt(i + 1);
        //语法解析 ,并检查当前的状态
        if (this.handle(str, nextStr) === 'fail' ) return this.reset();
    }
}

/**
 * 重置状态 (让解析器重新解析后续代码)
 * @returns {boolean}
 */
behaviorTree.prototype.reset = function () {
    //行为状态
    this.state = null;

    //操作类型
    this.action = 0;

    //状态进度
    this.speed = 0;

    this.resState = 'fail';

    //等待匹配的状态
    this.handleStates=[this.starName];

    return false;
};

/**
 * 匹配失败错误抛出
 * @param msg
 * @param str
 * @returns {Error}
 */
behaviorTree.prototype.throw = function (msg, str) {
    this.reset();
    return new Error(msg);
};

/**
 * 规则匹对
 * @param src
 * @param expression
 * @returns {boolean}
 */
behaviorTree.prototype.match = function (src, expression, nextStr) {

    var passed = false,
        content = this.syntaxNode.content;

    //内容添加到当前语法节点内容中
    this.syntaxNode.content = content + src;
    switch (typeof expression) {
        case 'string':
            passed = src === expression;
            break;
        case 'function':
            passed = expression.bind(this)(src, this.syntaxNode, nextStr);
            break;
    }
    //匹配不通过则恢复原来的内容
    return passed && (this.resState = 'handle') || (this.syntaxNode.content = content, false);
};

/**
 * 成功解析完毕
 */
behaviorTree.prototype.success = function () {
    treeConvert(this);
};


behaviorTree.prototype.watch =function(callback){
    typeof callback === 'function' && this.watchCallBacks.push(callback);
};

behaviorTree.prototype.exec =function(toggle){
    // this.isTreeConvert||(treeConvert(this,$pageAssign),this.isTreeConvert=true);
    watchSyntaxData(this,toggle);
};


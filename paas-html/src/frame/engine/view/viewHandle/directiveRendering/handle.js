/**
 * Created by xiyuan on 16-7-25.
 */

/**
 * 渲染处理
 * @param element 指令绑定的元素
 * @param instance 指令实例
 * @param directiveName 指令名称
 * @param innerElement 指令内部元素
 * @param attrInfo 属性类型指令相关信息
 * @returns {boolean} 是否需要停止此元素上的后续指令渲染
 */
function handle(element, instance, directiveName, innerElement, attrInfo, directiveAll, elementInfo) {
    var confData = instance.confData,
        $tools,
        terminal,
        arg = Array.prototype.slice.call(arguments, 0);

    //获取工具
    if (confData.tools) {
        $FRAME.$packages(confData.tools, function () {
            $tools = Array.prototype.slice.call(arguments, 0);
            arg.push($tools);
            handleInit.apply(this, arg);
        }.bind(this));
    } else {
        handleInit.apply(this, arg);
    }

    terminal=confData.terminal ? false : true;
    //手动销毁对象
    $tools=confData=element= instance= directiveName= innerElement= attrInfo= directiveAll= elementInfo=null;
    //检查是否后续渲染
    return terminal;
}

/**
 * 初始化处理
 * @param element
 * @param instance
 * @param directiveName
 * @param innerElement
 * @param attrInfo
 * @param tools
 * @returns {boolean}
 */
function handleInit(element, instance, directiveName, innerElement, attrInfo, directiveAll, elementInfo, tools) {

    //获取指令的注册配置
    var confData = instance.confData,
        //指令模板数据
        template = confData.template,
        //视图文档
        viewDoc,
        //指令作用域
        $scope = {},
        //指令分配的值
        $pageAssign = this.$pageAssign,
        //表达式解析实例
        expressionInstance,
        //指令引用的工具
        $tools = tools || [],
        //数据模型检测
        isModelInterface = false,
        //创建文档片段
        elementContainer = document.createDocumentFragment(),
        //指令注册接口(提供给注册配置内部相关函数)
        directiveRegisterApi = new directiveRegisterInterface(element, instance, directiveName, innerElement, attrInfo, $pageAssign);

    //当前元素所有指令
    directiveRegisterApi.directiveAll = directiveAll;

    //当前元素的所有属性
    directiveRegisterApi.attrs = elementInfo.attrs;

    //处理是否显示指令表达式 (移除指令元素上的指令属性)
    if (!confData.directiveShow && attrInfo) {
        element.removeAttribute(attrInfo.attrName);
    }

    //处理初始绑定
    if (typeof confData.handle === 'function') {
        confData.handle.apply(directiveRegisterApi, $tools);
    }

    //元素转移
    while (innerElement.firstChild) {
        elementContainer.appendChild(innerElement.firstChild);
    }

    //检查是否取清除内部html(不进行渲染)
    if (!confData.cleanHtml) {
        //检查是否自己生成HTML
        if (directiveRegisterApi.outHTML) {
            viewDoc = viewVm(directiveRegisterApi.outHTML, $pageAssign).DOM;
            //把渲染好的内容放入原来的位置
            element.parentNode.replaceChild(viewDoc, element);
        } else {
            viewDoc = viewVm(elementContainer, $pageAssign).DOM;
            element.appendChild(viewDoc);
        }

    }

    //手动销毁对象
    confData =  template = viewDoc= $scope = $pageAssign = expressionInstance=$tools = isModelInterface = elementContainer = directiveRegisterApi=viewDoc=tools=element= instance= directiveName= innerElement= attrInfo= directiveAll= elementInfo=null;
}

/**
 * 指令注册接口(提供给指令注册内部方法使用)
 */
function directiveRegisterInterface(element, instance, directiveName, innerElement, attrInfo, $pageAssign) {

    var modifiers = {},
        //修饰符字符串
        modifierStr,
        //指令类型
        directiveType = '',
        //修饰符分解
        decorate = attrInfo ? attrInfo.decorateName.match(/^([^\.]+)(?:\.([\s\S]+))?/) : null,
        //指令实例数据配置
        confData = instance.confData;

    //修饰字符解析成功,则继续分解成修饰码与指令类型
    if (decorate) {
        directiveType = decorate[1];
        modifierStr = decorate[2];
        //指令修饰码
        modifierStr && modifierStr.split('.').forEach(function (val) {
            typeof val === 'string' && !val || (modifiers[val.trim()] = true);
        });
    }

    //移除元素中的指令属性
    attrInfo && innerElement.removeAttribute(attrInfo.attrName);

    //页面数据分配
    this.$pageAssign = $pageAssign;

    //指令作用域
    this.$scope = $pageAssign.$pageModel;

    //指令属性信息
    this.attrInfo = attrInfo;

    //指令值表达式
    this.$expression = attrInfo && attrInfo.expression;

    //指令修饰
    this.modifiers = modifiers;

    //指令类型(参数)
    this.type = directiveType;

    //指令元素集
    this.elements = [element];

    //指令元素
    this.$element = element;

    //元素副本
    this.elementCopy = innerElement.cloneNode(true);

    //内部元素
    this.innerHtmlContainer = innerElement;

    //元素html
    this.elementHTML = innerElement.outerHTML;

    //内部私有的标识
    this.__private__ = {
        isWatch: false,
        attrWatch: {}
    }

    //对象销毁
    element= instance= directiveName= innerElement= attrInfo= $pageAssign=modifiers = modifierStr=directiveType = decorate = confData = null;

}

/**
 * 语法表达处理
 */
directiveRegisterInterface.prototype.syntax = function (expressionString) {
    return $expression(this.$pageAssign || {
            $pageModel: $FRAME.$pageAssign,
            $pageFilter: $FRAME.$pageFilter
        }, expressionString || '');
};

/**
 * 指令视图数据渲染
 */
directiveRegisterInterface.prototype.viewVM = function (elementContainer, newPageAssign,newPageFilter) {
    var pageModel = {},
        pageFilter={},
        isVM=directiveRegisterInterface.prototype.isVM,
        $pageAssign = this.$pageAssign||{},
        $pageFilter=$pageAssign.$pageFilter || $FRAME.$pageFilter||{},
        $pageModel = $pageAssign.$pageModel || $FRAME.$pageAssign||{};

    Object.keys($pageFilter).forEach(function (val) {
        pageFilter[val] = $pageFilter[val];
    });

    Object.keys($pageModel).forEach(function (val) {
        pageModel[val] = $pageModel[val];
    });

    //拼装传递来的数据
    typeof newPageFilter === 'object' && Object.keys(newPageFilter).forEach(function (key) {
        pageFilter[key] = newPageFilter[key];
    }.bind(this));

    //拼装传递来的数据
    typeof newPageAssign === 'object' && Object.keys(newPageAssign).forEach(function (key) {
        pageModel[key] = newPageAssign[key];
    }.bind(this));

    var vm = viewVm(elementContainer, {
        $pageFilter: pageFilter,
        $pageModel: pageModel
    }).DOM;

    //改变传递过来的assign数据 (为进行数据双向传递)
    typeof newPageAssign === 'object' && Object.keys(pageModel).forEach(function (key) {
        //监听
        Object.defineProperty(newPageAssign, key, {
            enumerable: true,
            configurable: true,
            set: function (newVal) {
                if(isVM(pageModel[key])){
                    pageModel[key].$model=newVal;
                }else{
                    pageModel[key]=newVal;
                }
            }.bind(this),
            get: function () {
                return isVM(pageModel[key])?pageModel[key].$model:pageModel[key];
            }
        });

    }.bind(this));

    this.elements && this.elements.push(vm.childNodes[0]);

    //对象销毁
    pageFilter=$pageAssign = $pageFilter=$pageModel =elementContainer=newPageAssign=newPageFilter =null;

    return vm;
};

/**
 * 检查是否数据模型
 * @param srcVm
 * @returns {boolean}
 */
directiveRegisterInterface.prototype.isVM = directiveRegisterInterface.prototype.isModel = function (srcVm) {
    return srcVm instanceof $modelInterface
};

/**
 * 数据模型
 */
directiveRegisterInterface.prototype.model = directiveRegisterInterface.prototype.$MODEL = $MODEL;


/**
 * 指令相关数据监听
 */
directiveRegisterInterface.prototype.watch = function (Fn) {
    var expressionInstance = this.__private__.expressionInstance;
    //检查是否被挂载解析监听
    if (!this.__private__.isWatch) {
        this.__private__.isWatch = true;
        expressionInstance = this.__private__.expressionInstance = this.syntax(this.$expression);
        //监听语法结果
        expressionInstance.watch(Fn);
        //语法实例执行处理
        expressionInstance.state === "fail" || expressionInstance.exec();
    } else {
        //监听语法结果
        expressionInstance.watch(Fn);
    }
    return expressionInstance=null;
};

/**
 * 监听属性上的表达式数据
 */
directiveRegisterInterface.prototype.watchAttrData = function (attrName, Fn) {

    var expressionInstance = this.__private__.attrWatch[attrName];
    //检查是否被挂载解析监听
    if (!expressionInstance) {
        //解析属性中的语法
        expressionInstance = this.__private__.attrWatch[attrName] = this.syntax(this.attrs[attrName] || '');
        //监听语法结果
        expressionInstance.watch(Fn);
        //语法实例执行处理
        expressionInstance.state === "fail" || expressionInstance.exec();
    } else {
        //监听语法结果
        expressionInstance.watch(Fn);
    }
    return expressionInstance=null;
};


/**
 * 监听自定义的表达式数据
 */
directiveRegisterInterface.prototype.watchSyntaxData = function (syntax, Fn) {
    //解析属性中的语法
    var expressionInstance = this.syntax(syntax || '');
    //监听语法结果
    expressionInstance.watch(Fn);
    //语法实例执行处理
    expressionInstance.state === "fail" || expressionInstance.exec();
    return expressionInstance=null;
};


/**
 * 转换表达式为数据模型
 */
directiveRegisterInterface.prototype.expressionToVM = function (expression) {
    //防止空表达式
    var expReg = (expression||(Date.now()+'_null')).match(/^\s*([^\.\[\(]+)([\s\S]*)$/),
        modelName = expReg[1],
        watchKey = expReg[2],
        $VM = this.$scope[modelName] = (this.$scope[modelName] || this.$MODEL());

    //检查是否Model数据(转换常规数据为model类型)
    if (!this.isVM($VM)) {
        //创建一个空的绑定型数据(model)
        $VM = this.$MODEL();
        //往数据model中写入相关数据
        $VM.write(watchKey, this.$scope[modelName]);
        //改变环境变量中的数据
        this.$scope[modelName] = $VM;
    }

    //对象销毁
    expReg =  null;
    return {
        //数据读取
        readData:function (fn) {
            $VM.readData(function () {
                fn($VM.get(watchKey));
            });
            return $VM;
        },
        //往表达式数据中写入数据
        write: function (key,data) {
            arguments.length == 1 && (data=key,key=watchKey);
            return $VM.write(key, data);
        },
        //获取表达式中的数据
        get: function (key) {
            return $VM.get(watchKey+(key?'.'+key:''));
        },
        //监听表达式的数据
        watch: function (fn) {
            typeof this.get() !== 'undefined' && this.readData(fn);
            return $VM.watch(watchKey, fn);
        },
        //移除表达式数据监听
        removeWatch: function () {
            return $VM.removeWatch(watchKey, fn);
        },
        //停止表达式数据监听
        stopWatch: function (fn) {
            return $VM.stopWatch(watchKey, fn);
        },
        //启动表达式数据监听
        startWatch: function (fn) {
            return $VM.stopWatch(watchKey, fn);
        },
        //数据模型
        $VM: $VM,
        //表达式中model名称
        modelName: modelName,
        //表达式key
        watchKey: watchKey

    };
};

/**
 * 属性为数据模型
 */
directiveRegisterInterface.prototype.attrToVM = function (attrName) {
    return this.expressionToVM(this.attrs[attrName]);
};


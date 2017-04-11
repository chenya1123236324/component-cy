/**
 * Created by xiyuan on 16-8-15.
 */
valid(function ($app, $appConfig) {

    //监听页面渲染(用于关闭hint,以备页面渲染移除)
    $FRAME.$event.$watch('page:render', function () {
        $HINT && $HINT('', 'valid', true);
    });

    //规则表
    var ruleMaps = {
            //必填
            required: function (ruleVal, eleVal, method) {
                if (!ruleVal) {
                    if (eleVal === '') {
                        method.stop();
                    }
                    return true;
                } else {
                    return eleVal.match(/[\s\S]+/)
                }
            },
            //最小长度
            minlen: function (ruleVal, eleVal) {
                return eleVal.length >= ruleVal
            },
            //最大长度
            maxlen: function (ruleVal, eleVal) {
                return eleVal.length <= ruleVal
            },
            //自定义的正则
            regExp: function (ruleVal, eleVal) {
                // console.log(new RegExp(ruleVal),eleVal,ruleVal,!!eleVal.match(new RegExp(ruleVal)));
                return !!eleVal.match(new RegExp(ruleVal));
            },
            //远程请求
            remote: function (ruleVal, eleVal, Interface) {
                switch (typeof ruleVal) {
                    case 'function':
                        ruleVal = ruleVal(eleVal);
                    case 'string':
                        if (typeof ruleVal === 'string') {
                            ruleVal = {
                                url: ruleVal,
                                data: {
                                    value: eleVal
                                }
                            };
                        }
                    case 'object':
                        //设置请求类型
                        ruleVal.type = ruleVal.type || 'post';
                        //请求回调的结果
                        ruleVal.complete = function (res, state) {
                            //检查是否有数据处理
                            state=typeof ruleVal.handle === "function" ?ruleVal.handle(state?res:state,eleVal):state;
                            state = typeof state === "string" ?state !== 'false':state;
                            Interface[state ? 'setSuccess' : 'setFail']('remote');
                        };
                        //网络请求
                        $FRAME.lib.$net.ajax(ruleVal);
                        break;
                }
                return false;
            },
            //异步处理
            asyn:function (ruleVal, eleVal, Interface) {
                switch (typeof ruleVal) {
                    case 'function':
                        ruleVal = ruleVal(eleVal);
                    case 'string':
                        if (typeof ruleVal === 'string') {
                            ruleVal = {
                                handle:function () {

                                }
                            };
                        }
                    case 'object':
                        typeof ruleVal.handle === 'function' && ruleVal.handle(function (state) {
                            Interface[state ? 'setSuccess' : 'setFail']('asyn');
                        });
                        break;
                }
                return false;
            }
        },
        //规则消息
        ruleMessages = {
            required: '内容必填',
            minlen: '内容最少{{value}}字符',
            maxlen: '内容最长{{value}}字符',
            regExp: '个性化规则不匹配',
            remote: '远程匹配不成功',
            asyn: '异步匹配不成功'
        },
        //规则排序
        sort = [
            'required'
        ],
        //异步校验
        asynRule=[
            'remote',
            'asyn'
        ],
        $HINT;

    /**
     * 消息提取处理
     * @param message
     * @param value
     */
    function messageExtract(message, value) {
        return message.replace(/\{\{([^\}]+)\}\}/, function () {
            try {
                value = eval(value);
                value = typeof value === undefined ? '' : value;
            }
            catch (e) {
                value = '';
            }
            return value;
        })
    }

    /**
     * 验证事件处理
     */
    function validEventFn(ruleData, tools) {

        return function (event) {

            //检查校验是否关闭
            if (!tools.toggle) {
                return false;
            }

            var eleClassList = this.classList,
                ruledata,
                validInfo = validHandle(ruleData, this,tools);

            //检查是否 异步校验 并且不是 valid 事件触发
            if(!validInfo.state && asynRule.in(validInfo.ruleType) !== -1 && event.type !== 'valid'){
                //设置校验标识
                this.dataset['validresult'] = 'false';

            //过滤掉valid事件的异步校验(防止表单校验不通过)
            }else if(event.type === 'valid' && asynRule.in(validInfo.ruleType) !== -1 && this.dataset['validresult'] !== 'fales'){

            }
            else
            //检查校验是否通过
            if (validInfo.state) {
                eleClassList.remove('err');
                //标记校验结果
                tools.validRes = true;
                //写入验证结果
                this.dataset['validresult'] = 'true';
                //成功处理
                Object.keys(ruleData).forEach(function (key) {
                    ruledata = ruleData[key];
                    typeof ruledata.successHandle === "function" && ruledata.successHandle.call(this, ruledata, validInfo.message);
                }.bind(this))


            } else if (tools.validRes || event.type === "blur" || event.type === "valid") {
                //获取规则组中对应的规则配置
                ruledata = ruleData[validInfo.ruleType];
                //添加错误样式
                eleClassList.add('err');
                //标记校验结果
                tools.validRes = false;
                //写入验证结果(验证提示,并加提示id,以备页面渲染移除)
                tools.$hint(validInfo.message, 'valid');
                //设置校验标识
                this.dataset['validresult'] = 'false';
                //错误处理
                typeof ruledata.errorHandle === "function" && ruledata.errorHandle.call(this, ruledata, validInfo.message);
                //定位元素(获取焦点)
                event.type === "blur" || event.type === 'keyup' ||  this.focus();
            }
        }
    }

    /**
     * 绑定校验
     * @param ruleData
     * @param ele
     */
    function bindValid(ruleData, ele, tools) {
        //绑定修改事件
        ele.addEventListener('change', validEventFn(ruleData, tools), false);
        ele.addEventListener('blur', validEventFn(ruleData, tools), false);
        ele.addEventListener('keyup', validEventFn(ruleData, tools), false);
        //自定义事件(用于外部主动触发)
        ele.addEventListener('valid', validEventFn(ruleData, tools), false);
        //定义校验开关
        ele.addEventListener('validclose', function () {
            tools.toggle = false;
            //移除错误样式
            ele.classList.remove('err');
        }, false);
        ele.addEventListener('validopen', function () {
            tools.toggle = true;
        }, false);

    }

    /**
     * 规则处理
     * @param ruleData
     * @param ele
     */
    function validHandle(ruleData, ele,tools) {

        //规则
        var rule,
            //规则值
            ruleVal,
            ruleConf,
            //规则消息
            ruleMessage,
            //表单元素值
            inputVal = ele.value,
            //规则key列表
            ruleKeys = Object.keys(ruleData),
            //规则长度
            ruleLen = ruleKeys.length,
            //规则类型
            ruleKey,
            //规则排序
            sortMap = [],
            sortArray = [],
            //其他规则
            otherArray = [],
            optionIndex,
            ruleIndex = ~0,
            isStop = false,
            eleClassList = ele.classList,
            //验证方法
            validMethod = {
                stop: function (ruleType) {
                    isStop = true;
                },
                setFail: function (ruleType) {

                    if(!(ruleType in ruleData))return;

                    //获取规则组中对应的规则配置
                    var ruledata= ruleData[ruleType],
                        validInfo = {
                            message:ruledata.message || ruleMessages[ruleType]
                        };

                    //添加错误样式
                    eleClassList.add('err');
                    //标记校验结果
                    tools.validRes = false;
                    //写入验证结果(验证提示,并加提示id,以备页面渲染移除)
                    tools.$hint(validInfo.message, 'valid');
                    //设置校验标识
                    ele.dataset['validresult'] = 'false';
                    //错误处理
                    typeof ruledata.errorHandle === "function" && ruledata.errorHandle.call(ele, ruledata, validInfo.message);
                    //定位元素(获取焦点)
                    // ele.focus();

                },
                setSuccess: function (ruleType) {
                    if(!(ruleType in ruleData))return;
                    var _routeData=tools.$object.extend({},ruleData);
                    delete _routeData[ruleType];
                    //成功处理
                    validEventFn(_routeData, tools).call(ele,{type:'valid'})
                }
            };

        //主要进行数据提取排序
        while (++ruleIndex < ruleLen) {
            ruleKey = ruleKeys[ruleIndex];
            //检查是否在排序中
            if ((optionIndex = sort.in(ruleKey)) !== -1) {
                sortMap.push(optionIndex);
            } else {
                otherArray.push(ruleKey);
            }
        }

        //排序
        sortMap = sortMap.sort(function (a, b) {
            return a - b;
        });

        //转换成key
        sortMap.forEach(function (index) {
            sortArray.push(sort[index]);
        });

        ruleKeys = sortArray.concat(otherArray);
        ruleIndex = ~0;

        while (++ruleIndex < ruleLen) {
            ruleKey = ruleKeys[ruleIndex];
            //规则值
            ruleConf = ruleData[ruleKey];
            //规则校验
            rule = ruleMaps[ruleKey];

            //检查配置
            ruleVal = typeof ruleConf === 'object' ? ruleConf.value : ruleConf;

            //检查规则类型
            switch (typeof rule) {
                case 'object':
                case 'string':
                    inputVal.match(rule) || (ruleMessage = messageExtract(ruleConf.message || ruleMessages[ruleKey], ruleVal));
                    break;
                case 'function':
                    rule(ruleVal, inputVal, validMethod) || (ruleMessage = messageExtract(ruleConf.message || ruleMessages[ruleKey], ruleVal));
                    break;
            }

            //检查是否停止校验
            if (isStop)break;

            if (ruleMessage) {
                return {
                    ruleType: ruleKey,
                    state: false,
                    message: ruleMessage
                }
            }
        }
        return {
            state: true
        };
    }

    /**
     * 用于表单校验处理
     */
    $app.directiveRegister('$Valid', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [
            'json',
            'object',
            '{PLUGINS}/shade/message-hint'
        ],
        //是否显示指令代码
        directiveShow: false,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($json,$object, $hint) {

            var formElement = this.$element,
                validData,
                tools = {$hint: $hint, validRes: true, toggle: true,$object:$object};
            $HINT = $hint;

            switch (formElement.nodeName) {
                case 'INPUT':
                case 'TEXTAREA':
                case 'SELECT':
                    switch (typeof (validData = $json.toObject(this.$expression))) {
                        case 'string':
                            var expressionInstance = this.syntax(this.$expression);
                            //数据监控(初始化)
                            expressionInstance.watch(function (validData) {
                                bindValid(validData, formElement, tools);
                            });
                            //初次执行挂载监控
                            expressionInstance.state === "success" && expressionInstance.exec();
                            break;
                        case 'object':
                            bindValid(validData, formElement, tools);
                            break;
                    }

                    break;
            }

        }
    });
})
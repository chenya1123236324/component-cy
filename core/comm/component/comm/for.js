/**
 * Created by xiyuan on 16-11-3.
 */
For(function ($app, $appConfig) {

    function getType(data) {
        return {}.toString.call(data).match(/object\s+(\w*)/)[1]
    }

    function handleElement(elementDoc, keyString, valString, comp) {
        //组件内部作用域
        this.$comp = comp;
        //遍历的key,与val
        this.$keyName = keyString;
        this.$valName = valString;
        //元素文档
        this.$elementDoc = elementDoc;
        //数据记录
        this.recordInfo = {};
        elementDoc=keyString= valString= comp=null;
    }

    /**
     * 监听的数据被修改
     * 数据对比
     */
    handleElement.prototype.differ = function (data, changeInfo) {

        changeInfo = changeInfo || {};
        var $comp = this.$comp,
            keyName = this.$keyName,
            valName = this.$valName,
            recordInfo = this.recordInfo,
            $elementDoc,

            //数据与元素处理专用
            eleDoc = document.createDocumentFragment(),
            elements = {},
            elementArray = [],
            scopes = {},
            $data,

            ele,
            prevEle = this.$elementDoc;

        switch (getType(data)) {
            case 'Object':
                var keys = Object.keys(data);

                //检查数据类型差异
                if (recordInfo.type === 'Object' && changeInfo.removeDatas) {

                    //删除不存在的数据对应的元素
                    changeInfo.removeDatas.forEach(function (removeInfo) {
                        ele = recordInfo.elementArray[removeInfo.index];

                        if ((ele && ele[0]) === prevEle) {
                            prevEle = document.createTextNode('');
                            ele.parentNode.replaceChild(prevEle, ele);
                        } else {
                            ele.parentNode.removeChild(ele);
                        }

                    });

                    //遍历并处理新数据信息
                    keys.forEach(function (key, index) {

                        $data = data[key];
                        ele = recordInfo.elements[key];
                        //数据检查
                        if (!changeInfo.oldData.hasOwnProperty(key)) {
                            //新增的属性
                            //作用域
                            var scope = {};

                            keyName && (scope[keyName] = key);
                            valName && (scope[valName] = data[key]);

                            //作用域保存
                            scopes[key] = scope;

                            //元素渲染
                            ele = $comp.viewVM($comp.elementCopy.innerHTML, scope,$comp.$pageAssign.$pageFilter).firstChild;

                            $elementDoc=[].slice.call(ele.childNodes);

                            if (!index) {
                                if (prevEle.nodeType === 3) {
                                    prevEle.parentNode.replaceChild(ele, prevEle);
                                } else {
                                    prevEle.parentNode.insertBefore(ele, prevEle);
                                }
                                prevEle = ele;
                            } else {
                                prevEle.nextSibling ?
                                    prevEle.parentNode.insertBefore(ele, prevEle.nextSibling) :
                                    prevEle.parentNode.appendChild(ele);

                            }

                        } else {
                            prevEle = ele;
                            scopes[key] = recordInfo.scopes[key];
                            //检查两次数据是否一致
                            if (changeInfo.oldData[key] !== $data) {
                                //更改值
                                recordInfo.scopes[tmpIndex][valName]=$data;
                            }
                        }

                        elements[key] = $elementDoc;
                        elementArray.push($elementDoc);
                    });

                    //元素占位符
                    $elementDoc = elementArray[0] || prevEle;

                } else {

                    //数据遍历
                    keys.forEach(function (key) {
                        //作用域
                        var scope = {};

                        keyName && (scope[keyName] = key);
                        valName && (scope[valName] = data[key]);

                        //作用域保存
                        scopes[key] = scope;

                        //元素渲染
                        var liEle = $comp.viewVM($comp.elementCopy.innerHTML, scope,$comp.$pageAssign.$pageFilter);

                        //元素节点提取
                        elements[key] = $elementDoc = liEle.firstChild;
                        elementArray.push($elementDoc);
                        eleDoc.appendChild($elementDoc);

                    });

                    //避免内部无数据
                    $elementDoc = elementArray[0] || document.createTextNode('');

                    //元素更新
                    this.$elementDoc.parentNode.replaceChild(elementArray[0]?eleDoc:$elementDoc, this.$elementDoc);

                    //删除之前的元素
                    recordInfo.elementArray && recordInfo.elementArray.forEach(function (ele) {
                        ele.parentNode && ele.parentNode.removeChild(ele);
                    });
                }

                //重新设置文档起点
                this.$elementDoc = $elementDoc;

                //数据信息记录
                recordInfo.keys = keys;
                recordInfo.type = 'Object';
                recordInfo.scopes = scopes;
                recordInfo.elements = elements;
                recordInfo.elementArray = elementArray;

                break;
            case 'Array':

                //检查之前数据和新数据是否同一个对象
                if (changeInfo.sourceData === data) {
                    var tmpIndex;

                    $elementDoc = this.$elementDoc;

                    data.forEach(function (val, key) {
                        //检查数据在之前的位置
                        if ((tmpIndex = changeInfo.oldData.in(val)) === -1) {
                            //作用域
                            var scope = {};

                            keyName && (scope[keyName] = key);
                            valName && (scope[valName] = $data);

                            //作用域保存
                            scopes[key] = scope;

                            //元素渲染
                            ele = $comp.viewVM($comp.elementCopy.innerHTML, scope,$comp.$pageAssign.$pageFilter);

                        } else {
                            ele = recordInfo.elementArray[tmpIndex];

                            scopes[key] = recordInfo.scopes[tmpIndex];

                            //更改key
                            recordInfo.scopes[tmpIndex][keyName]=key;

                            //解决元素占位问题
                            if ((ele && ele[0]) === prevEle) {
                                prevEle = document.createTextNode('');
                                ele.parentNode.replaceChild(prevEle, ele[0]);
                            }
                        }

                        elements[key] = [].slice.call(ele.childNodes);;
                        elementArray.push(elements[key]);
                        eleDoc.appendChild(ele);

                    });

                    //避免内部无数据
                    $elementDoc = (elementArray[0] && elementArray[0][0]) || document.createTextNode('');

                    //对元素进行dom排序
                    prevEle.parentNode.replaceChild(elementArray[0] ? eleDoc : $elementDoc , prevEle);

                    //删除不存在的数据对应的元素
                    changeInfo.removeDatas.forEach(function (removeInfo) {
                        ele = recordInfo.elementArray[removeInfo.index];

                        ele instanceof Array && eles.forEach(function (ele) {
                            ele.parentNode && ele.parentNode.removeChild(ele);
                            ele=null;
                        });
                        ele=null;
                    });

                } else if (recordInfo.type === 'Array' && changeInfo.oldData) {
                    var oldLen = changeInfo.oldData.length;

                    //删除不存在的数据对应的元素
                    changeInfo.removeDatas.forEach(function (removeInfo) {
                        ele = recordInfo.elementArray[removeInfo.index];
                        if ((ele && ele[0]) === prevEle) {
                            prevEle = document.createTextNode('');
                            ele.parentNode.replaceChild(prevEle, ele[0]);
                        } else {
                            ele instanceof Array && eles.forEach(function (ele) {
                                ele.parentNode && ele.parentNode.removeChild(ele);
                                ele=null;
                            });
                            ele=null;
                        }
                    });

                    //数据遍历
                    data.forEach(function (val, key) {
                        $data = data[key];
                        ele = recordInfo.elementArray[key];

                        //检查是否存在(利用数据长度)
                        if (key < oldLen) {
                            prevEle = ele;
                            scopes[key] = recordInfo.scopes[key];

                            //检查两次数据是否一致
                            if (changeInfo.oldData[key] !== $data) {
                                //修改数据模型
                                recordInfo.scopes[key][valName] = $data;
                            }

                        } else {

                            //作用域
                            var scope = {};

                            keyName && (scope[keyName] = key);
                            valName && (scope[valName] = $data);

                            //作用域保存
                            scopes[key] = scope;

                            //元素渲染
                            var ele = $comp.viewVM($comp.elementCopy.innerHTML, scope,$comp.$pageAssign.$pageFilter).firstChild;
                            $elementDoc=[].slice.call(ele.childNodes);

                            if (!key) {
                                if (prevEle.nodeType === 3) {
                                    prevEle.parentNode.replaceChild(ele, prevEle);
                                } else {
                                    prevEle.parentNode.insertBefore(ele, prevEle);
                                }
                                prevEle = ele;
                            } else {
                                prevEle.nextSibling ?
                                    prevEle.parentNode.insertBefore(ele, prevEle.nextSibling) :
                                    prevEle.parentNode.appendChild(ele);

                            }

                            //保持数据监听
                            sourceModel.watch('[' + key + ']', function (newData) {
                                $data.write(newData);
                            });

                        }

                        elements[key] = $elementDoc;
                        elementArray.push($elementDoc);

                    });

                    //元素占位符
                    $elementDoc = elementArray[0] || prevEle;

                } else {

                    //数据遍历
                    data.forEach(function (val, key) {
                        //作用域
                        var scope = {};

                        keyName && (scope[keyName] = key);
                        valName && (scope[valName] = val);

                        //作用域保存
                        scopes[key] = scope;

                        //元素渲染
                        var liEle =$comp.viewVM($comp.elementCopy.innerHTML, scope,$comp.$pageAssign.$pageFilter);

                        //元素节点提取
                        elements[key] = $elementDoc=[].slice.call(liEle.childNodes);
                        elementArray=elementArray.concat($elementDoc);
                        eleDoc.appendChild(liEle);
                        liEle=scope=null;

                    });

                    //避免内部无数据
                    $elementDoc = elementArray[0] || document.createTextNode('');

                    //元素更新
                    this.$elementDoc.parentNode.replaceChild(elementArray[0] ? eleDoc : $elementDoc, this.$elementDoc);

                    //删除之前的元素
                    recordInfo.elementArray && recordInfo.elementArray.forEach(function (eles) {
                        eles instanceof Array && eles.forEach(function (ele) {
                            ele.parentNode && ele.parentNode.removeChild(ele);
                            ele=null;
                        });
                        eles=null;
                    });

                }

                //重新设置文档起点
                this.$elementDoc = $elementDoc;

                //数据信息记录
                recordInfo.keys = keys;
                recordInfo.type = 'Array';
                recordInfo.scopes = scopes;
                recordInfo.elements = elements;
                recordInfo.elementArray = elementArray;
                break;
            case 'Null':
            case 'Undefined':
                recordInfo.elementArray && recordInfo.elementArray.forEach(function (eles) {
                    eles instanceof Array && eles.forEach(function (ele) {
                        ele.parentNode && ele.parentNode.removeChild(ele);
                        ele=null;
                    });
                    eles=null;
                });

                break;
        }

        //对象手动销毁
        $elementDoc=$comp = keyName = valName =recordInfo = $elementDoc=eleDoc = elements = elementArray = scopes = $data=ele=prevEle = null;
    };

    $app.componentRegister('for', {
        priority: 9999,
        //是否显示指令代码
        // directiveShow: true,
        //是否阻止后续指令的执行
        terminal:true,
        //是否清除内部元素(不进行渲染)/清除内部html(不会插入内部html到此组件中,除非手动处理)
        cleanHtml:true,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var cmdElement=this.$element,
                container=document.createTextNode(''),
                reg = /^\s*(?:(?:\(\s*([a-z\$_]+[\w\$]*)\s*(?:\,\s*([a-z\$_]+[\w\$]*))?\s*\))|([a-z\$_]+[\w\.\$]*))\s*in\s+([a-z\$_]+.*)\s*$/i,
                matchRes = this.attrs.config.match(reg);

            cmdElement.parentNode.replaceChild(container,cmdElement);

            if (!matchRes)return;

            //匹配的值
            var block_val = matchRes[1],
                block_key = matchRes[2],
                alone_val = matchRes[3],
                source_obj = matchRes[4],
                keyString,
                valString;

            //检查是否有key/index
            if (block_key) {
                keyString = block_val;
                valString = block_key;
            } else {
                valString = block_val || alone_val;
            }

            //元素处理类
            var elementObj = new handleElement(container, keyString, valString, this);

            this.$expression=source_obj;
            this.watch(function (data,changeInfo) {
                elementObj.differ(data, changeInfo);
            });

            //对象销毁
            reg=block_val =block_key = alone_val = source_obj = keyString=valString=matchRes=null;

        }
    });

});
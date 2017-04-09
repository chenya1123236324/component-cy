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
    handleElement.prototype.differ = function (data, changeInfo,oldData) {

        changeInfo = changeInfo || {};
        var $comp = this.$comp,
            keyName = this.$keyName,
            valName = this.$valName,
            recordInfo = this.recordInfo,
            $elementDoc,

            //数据与元素处理专用
            eleDoc = document.createDocumentFragment(),
            elements = [],
            elementArray = recordInfo.elementArray=recordInfo.elementArray|| [],
            scopes = recordInfo.scopes||{},
            $data,

            ele,
            prevEle = this.prevEle||this.$elementDoc,
            containerEle=prevEle.parentNode;

        switch (getType(data)) {
            case 'Object':
                console.log('yes object')
                var keys = Object.keys(data);

                //检查数据类型差异
                if (recordInfo.type === 'Object' && changeInfo.removeDatas) {

                    //删除不存在的数据对应的元素
                    changeInfo.removeDatas.forEach(function (removeInfo) {
                        ele = recordInfo.elementArray[removeInfo.index];

                        if (ele === prevEle) {
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
                            ele = $comp.viewVM($comp.elementHTML, scope).firstChild;

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

                        elements[key] = ele;
                        elementArray.push(ele);
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
                        var liEle = $comp.viewVM($comp.elementHTML, scope);

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

                oldData = oldData === undefined ?[]:oldData;
                if(data.length === 0 && oldData.length === 0)return

                if(data instanceof Array && oldData instanceof Array){
                    var startNI=0,
                        startOI=0,
                        indexOf,
                        endNL=data.length-1,
                        endOL=oldData.length-1;

                    $elementDoc = this.$elementDoc;
                    // console.log(startNI <= endNL && startOI <= endOL,'-----------',startNI ,endNL , startOI , endOL)


                    while (startNI <= endNL && startOI <= endOL){

                        //避免元素移位丢失
                        if (oldData[startOI] === null) {
                            startOI++;
                        } else if (oldData[endOL] === null) {
                            endOL--;
                        } else if (data[startNI] === null) {
                            startNI++;
                        } else if (oldData[endNL]  === null) {
                            endNL--;
                            //检查数据是否相等
                        } else if(data[startNI] === oldData[startOI]){
                            startNI++;
                            startOI++;
                            //尾尾是否相等
                        } else if(data[endNL] === oldData[endOL]){
                            endNL--;
                            endOL--;
                            //首尾是否相等
                        }else if(data[startNI] === oldData[endOL]){
                            startNI++;
                            endOL--;
                            //尾首是否相等
                        }else if(data[endNL] === oldData[startOI]){
                            endNL--;
                            startOI++;
                        }else if((indexOf=oldData.indexOf(data[startNI])) !== -1){
                            startNI++;
                            startOI++;
                        }else{
                            scopes[startNI][keyName]=startNI;
                            scopes[startNI][valName]=data[startNI];

                            startNI++;
                            startOI++;
                        }

                    }


                    if (startOI > endOL) {
                        //新增的数据
                        while (++endOL <= endNL){

                            (function (This) {
                                //作用域
                                var scope = {};

                                keyName && (scope[keyName] = endOL);
                                valName && (scope[valName] = data[endOL]);

                                //作用域保存
                                scopes[endOL] = scope;

                                //元素渲染
                                ele = $comp.viewVM($comp.elementHTML, scope).firstChild;
                                elements[endOL] = ele;

                                elementArray.push(ele);
                                eleDoc.appendChild(This.prevEle=ele);
                            })(this)
                        }

                        prevEle.parentNode.insertBefore(eleDoc, prevEle.nextSibling);

                    }else if (startNI > endNL) {
                        //多余的旧数据
                        while (startNI >= ++endNL){
                            scopes[startNI] =undefined;
                            prevEle.parentNode.removeChild(elementArray[endNL]);
                            elementArray.splice(endNL,1);
                        }

                        this.prevEle=elementArray[elementArray.length-1];

                    }

                    //数据信息记录
                    recordInfo.keys = keys;
                    recordInfo.type = 'Array';
                    recordInfo.scopes = scopes;
                    recordInfo.elements = elements;

                    return
                }else{
                    console.log('err for',data,oldData)
                }

                break;
            case 'Null':
            case 'Undefined':
                recordInfo.elementArray && recordInfo.elementArray.forEach(function (ele) {
                    ele.parentNode.removeChild(ele);
                    ele=null;
                });

                break;
        }

        //对象手动销毁
        $elementDoc=$comp = keyName = valName =recordInfo = $elementDoc=eleDoc = elements = elementArray = scopes = $data=ele=prevEle = null;
    };

    //浅克隆
    function clone(obj) {
        var res;
        switch (true){
            case obj instanceof Array:
                res=[];
                break;
            case obj instanceof Object:
                res={};
                break;
        }

        if(res){
            Object.keys(obj).forEach(function (key) {
                res[key]=obj[key];
            })
            return res;
        }
        return obj;
    }

    $app.directiveRegister('$For', {
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
                matchRes = this.$expression.match(reg);

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


            var oldData=undefined;
            this.watch(function (data,changeInfo) {
                elementObj.differ(data, changeInfo,oldData);
                oldData=clone(data);
            });

            //对象销毁
            reg=block_val =block_key = alone_val = source_obj = keyString=valString=matchRes=null;

        }
    });

});
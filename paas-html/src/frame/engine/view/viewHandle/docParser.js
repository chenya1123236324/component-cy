/**
 * Created by xiyuan on 16-7-6.
 */

/**
 * 文档解析
 * @param doc
 */
function docParser(doc,$pageAssign){
    var directiveStorage=$directiveManage.__Storage__,
        instance,
        $elements=directiveStorage.ele,
        $attrs=directiveStorage.attr,
        directiveRecord=[];

    //指令提取
    (function contrast(doc){
        var nodes=doc.childNodes,
            node,
            newNode,
            newNodeLen,
            nodeName,
            attr,
            attrName,
            attrs,
            allAttr,
            priority,
            directiveName,
            decorateName,
            expression,
            attrInfo,
            directiveAll,
            i=~0,l=nodes.length,
            x=~0, n,
            directives,
            elementContainer,
            isDirective=false;

        //遍历所有元素
        while (++i<l){
            node=nodes[i];
            isDirective=false;
            switch(node.nodeType){
                //元素节点
                case 1:
                    nodeName=node.nodeName.toLowerCase();
                    attrs=node.attributes;
                    x=~0;
                    n=attrs.length;
                    directives={};
                    allAttr={};
                    directiveAll={};

                    //匹配标签名称(提取元素名称标识组件)
                    if( nodeName in $elements){
                        //对应指令插件
                        instance=$elements[nodeName];

                        //标识此元素所属指令
                        isDirective=true;

                        //指令优先级
                        priority=instance.confData.priority;

                        //记录当前元素的指令
                        (directives[priority]=directives[priority]||[]).push({
                            //指令实例
                            instance:instance,
                            //指令名称
                            directiveName:nodeName
                        });
                    }

                    //对比属性(提取属性标识组件)
                    while (++x<n){
                        //元素属性集
                        attr=attrs[x];
                        //属性名称
                        attrName=attr.name;
                        //提取属性信息
                        attrInfo=attrName.match(/([^\s]+?)(?:$|:([^\s]*))/);
                        //指令名称
                        directiveName=attrInfo[1];
                        //修饰
                        decorateName=attrInfo[2]||'';
                        //属性值的表达式
                        expression=attr.value;
                        //所有属性
                        allAttr[attrName]=attr.value;

                        //对比组件名称与标签名称
                        if( directiveName in $attrs){
                            isDirective=true;
                            instance=$attrs[directiveName];

                            //指令优先级
                            priority=instance.confData.priority;

                            //记录当前元素的指令
                            (directives[priority]=directives[priority]||[]).push(directiveAll[directiveName]={
                                //指令实例
                                instance:instance,
                                //指令名称
                                directiveName:directiveName,
                                //属性信息
                                attrInfo:{
                                    //当前指令完整的属性名称
                                    attrName:attrName,
                                    //修饰指令
                                    decorateName:decorateName,
                                    //指令值表达式
                                    expression:expression
                                }
                            });

                        }

                    }

                    //记录视图组件
                    if(isDirective !== false ){
                        //指令元素容器
                        elementContainer=node.cloneNode();
                        //转移实际元素中的元素到容器中
                        while (node.firstChild){
                            elementContainer.appendChild(node.firstChild);
                        }

                        //添加到指令记录中
                        directiveRecord.push({
                            parentNode:node.parentNode,
                            element:node,
                            attrs:allAttr,
                            directives:directives,
                            directiveAll:directiveAll,
                            innerElement:elementContainer
                        })
                    }else{
                        //非组件,则继续往下提取
                        contrast(node);
                    }

                    break;
                //文本节点
                case 3:
                    newNode=textParser(node.cloneNode(),$pageAssign);
                    newNodeLen=newNode.childNodes.length;

                    //补全元素个数(新元素容器中可能有多个新的文本节点)
                    i+=newNodeLen-1;
                    l+=newNodeLen-1;

                    //文本解析,并替换
                    node.parentNode.replaceChild(newNode,node);
                    break;
            }
        }
        //手动对象销毁
        doc=nodes=node=newNode=newNodeLen=nodeName=attr=attrName=attrs=allAttr=priority=directiveName=decorateName=expression=attrInfo=directiveAll=i=l=x=n=directives=elementContainer=isDirective=null;
    })(doc);

    //指令渲染
    directiveRendering(directiveRecord,$pageAssign);

    //手动销毁对象
    doc=$pageAssign=directiveStorage=instance=$elements=$attrs=directiveRecord=null;
}

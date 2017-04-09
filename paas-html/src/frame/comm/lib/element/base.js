/**
 * Created by xiyuan on 15-12-4.
 */

var $element=function(node){
    if (node instanceof $) {
        return node;
    }
    if($type.isElement(node)){
        return new $([node]);
    }
};

//元素element nodeType
var NODE_TYPES={};

var ELEMENT_NODE = $element.ELEMENT_NODE = 1;
NODE_TYPES[ELEMENT_NODE]=ELEMENT_NODE;

//属性attr
var ATTRIBUTE_NODE = $element.ATTRIBUTE_NODE = 2;
NODE_TYPES[ATTRIBUTE_NODE]=ATTRIBUTE_NODE;

//文本text
var TEXT_NODE = $element.TEXT_NODE = 3;
NODE_TYPES[TEXT_NODE]=TEXT_NODE;

//注释comments
var COMMENT_NODE = $element.COMMENT_NODE = 8;
NODE_TYPES[COMMENT_NODE]=COMMENT_NODE;

//文档document
var DOCUMENT_NODE = $element.DOCUMENT_NODE = 9;
NODE_TYPES[DOCUMENT_NODE]=DOCUMENT_NODE;

//文档片段
var DOCUMENT_FRAGMENT_NODE = $element.DOCUMENT_FRAGMENT_NODE = 11;
NODE_TYPES[DOCUMENT_FRAGMENT_NODE]=DOCUMENT_FRAGMENT_NODE;



/*元素处理对象（类似jquery）*/
var $=function(nodes){
    this.__self__=nodes[0];
    var i=~0,l=this.length=nodes.length;
    while (++i,i<l){
        this[i]=nodes[i];
    }
};

/*获取节点名称*/
$element.nodeName=function(element,nodeName){
    var _nodeName=element.nodeName.toLocaleLowerCase();
    return typeof nodeName === 'string' ? _nodeName === nodeName.toLocaleLowerCase():_nodeName;
};

$.prototype.nodeName=function(nodeName){
    return $element.nodeName(this.__self__,nodeName);
};

/*子节点获取*/
$element.children=function(element){
    var arg=arguments,len=arg.length,a= 0,each,type;
    while (++a,a<len){
        switch ($type.getType(arg[a])){
            case 'function':
                each=arg[a];
                break;
            default:
                type=arg[a];
        }
    }

    if(type === '*')return element.childNodes;
    var TYPES={},children=[],nodeType,childrenList;
    switch ($type.getType(type)){
        case 'array':
            var i=~0,len=type.length,_type;
            while (++i,i<len){
                _type=Number(type[i]);
                nodeType=_type in NODE_TYPES;
                nodeType && (TYPES[_type]=_type);
            }
            break;
        case 'string':
            type=Number(type);
            nodeType=type in NODE_TYPES;
            nodeType && (TYPES[type]=type);
            break;
        case 'number':
            TYPES[type]=type;
            break;
        default:
            TYPES[1]=1;
    }

    //检查是否有类型判断
    childrenList=type?element.childNodes:element.children||element.childNodes;

    var len=childrenList.length,i=~0,_node;
    while (++i,i<len){
        _node=childrenList.item(i);
        if(_node.nodeType in TYPES ){
            children.push(_node);
            each && each(_node);
        }
    }

    return children;
};

$.prototype.children=function(type,fn){
    return $element.children(this.__self__,type,fn);
};

/*获取父元素*/
$element.parent= function(element) {
    var parent = element.parentNode;
    return parent && parent.nodeType !== DOCUMENT_FRAGMENT_NODE ? parent : null;
};

$.prototype.parent=function(){
    return $element.parent(this.__self__);
};

/*查看节点是否是另一个节点的子元素（一直往下找）*/
$element.isChildrens=function(childNode,parentNode){
    var cType=$type.getType(childNode),
        pType=$type.getType(parentNode);

    if(cType === 'element' || pType === 'element'){
        var swt=function(type,childNode,parentNode){
            switch (type){
                case 'element':
                    var parent=$element.parent(childNode);
                    switch (parent){
                        case parentNode:
                            return parentNode;
                            break;
                        case window.document:
                            return false;
                            break;
                        default:
                            return swt(type,parent,parentNode);
                    }
                    break;
                case 'array':

                    break;
                case 'string':



            }
        };

        switch (cType){
            case 'element':
                return swt(pType,childNode,parentNode);
                break;
        }

    }
    return false;
};

$.prototype.isChildrens=function(parentNode){
    return $element.isChildrens(this.__self__,parentNode);
};

/*查看节点是否是另一个节点的父元素（一直往上找）*/
$element.isParents=function(parentNode,childNode){
    return $element.isChildrens(childNode,parentNode);
};

$.prototype.isParents=function(childNode){
    return $element.isParents(this.__self__,childNode);
};

/*获取元素本身或修改属性*/
$element.prop=function(element, name, value) {
    if ($type.isDefined(value)) {
        element[name] = value;
    } else {
        return element[name];
    }
};

$.prototype.prop=function(name, value){
    return $element.prop(this.__self__, name, value);
};

/*获取元素或修改属性*/
$element.attr=function(element,attrName,value){
    return value?(element.setAttribute(attrName,value),value):element.getAttribute(attrName);
};

$.prototype.attr=function(name, value){
    return $element.attr(this.__self__, name, value);
};
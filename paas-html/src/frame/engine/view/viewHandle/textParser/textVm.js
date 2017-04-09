/**
 * 文本节点视图与数据的绑定处理
 * @param textNode
 * @param stringTextMap
 * @returns {DocumentFragment}
 */
function textVm(stringTextMap) {
    //文档片段
    var container = document.createDocumentFragment();

    //遍历并解析字符串中的语法节点与字符节点
    stringTextMap.forEach(function (textMapVal) {
        var textNode = document.createTextNode('');

        switch (typeof textMapVal) {
            case 'string':
                //文本节点
                textNode.nodeValue=textMapVal;
                break;
            case 'object':
                //语法节点,并进行数据绑定
                textMapVal.watch(function(res){
                    textNode.nodeValue=res;
                });
                textMapVal.exec();
                break;

        }
        //节点写入
        container.appendChild(textNode);
    });

    return container;
}

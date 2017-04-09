/**
 * Created by xiyuan on 16-7-6.
 */

/**
 * 文本解析
 * @param textNode
 * @param $pageAssign
 * @returns {DocumentFragment}
 */
function textParser(textNode,$pageAssign) {
    //文本字符串
    var srcStr = textNode.nodeValue,
    //文本分段
        stringTextMap = [''],
    //当前文本块
        nowTextBlock = '',
    //当前层级
        nowLevel = 0,
    //文本语法行为树
        textTree = new behaviorTree($pageAssign),
    //目标字符串长度
        slen = srcStr.length,
        i = ~0,
        str,
        nextStr;

    while (++i < slen) {
        str = srcStr.charAt(i);
        nextStr = srcStr.charAt(i + 1);

        //检查上次状态是否成功,成功则重新创建语法节点
        if (textTree.resState === 'success') {
            textTree = new behaviorTree($pageAssign);
            nowTextBlock = '';
            nowLevel++;
            stringTextMap[nowLevel] = '';
        }

        //语法解析 ,并检查当前的状态
        switch (textTree.handle(str, nextStr)) {
            case 'fail':
                stringTextMap[nowLevel] += nowTextBlock + str;
                nowTextBlock = '';
                break;
            case 'success':
                //检查是否第一层第一个字符匹配成功
                stringTextMap[stringTextMap[nowLevel] ? ++nowLevel : nowLevel] = textTree;
                break;
            case 'handle':
                nowTextBlock += str;
                break;
        }
    }

    return textVm(stringTextMap);
}



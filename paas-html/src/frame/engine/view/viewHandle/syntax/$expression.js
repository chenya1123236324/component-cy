/**
 * Created by xiyuan on 16-7-26.
 */
/**
 * 语法解析对外提供的方法
 * @param expressionString
 * @param dataObject
 * @returns {expressionInterface}
 */
function $expression($pageAssign,expressionString) {
    return new expressionInterface($pageAssign,expressionString);
};

/**
 * 语法解析接口
 */
function expressionInterface($pageAssign,expressionString) {

    this.isValue=false;

    expressionString='{{'+expressionString+'}}';
    //表达式行为树 / 表达式解析
    var expressionTree = this.expressionTree = new behaviorTree($pageAssign,function () {
        /*this.assignVar = '$directiveData';
         this.filterVar = '$directiveFilter';*/
    }),
    //表达式字符长度
        slen = expressionString.length,
        i = ~0,
        str,
        nextStr;

    expression:
        while (++i < slen) {
            str = expressionString.charAt(i);
            nextStr = expressionString.charAt(i + 1);

            //语法解析 ,并检查当前的状态
            switch (expressionTree.handle(str, nextStr)) {
                case 'fail':
                    this.state='fail';
                    return false;
                case 'success':
                    //状态
                    this.state=expressionTree.resState;
                    //检查是匹配成功
                    break expression;
                case 'handle':
                    //正常匹配中
                    break;
            }
        }

    //对象销毁
    expressionTree =slen = i =str=nextStr=null;
}

/**
 * 表达式执行,并在回调方法中返回运行后的值
 * @param fn
 */
expressionInterface.prototype.watch = function (fn) {
    this.expressionTree.watch(function (data) {
        if(typeof data === 'undefined' && !this.isValue && (this.isValue=true))return;
        fn.apply(this,arguments);
    }.bind(this))

};

expressionInterface.prototype.exec = function (toggle) {
    this.expressionTree.exec(toggle)
};
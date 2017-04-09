/**
 * Created by xiyuan on 16-7-8.
 */

/**
 * 语法树
 * @param parentNode
 * @param location
 */
function syntaxTree(parentNode,location){
    //父节点
    this.parentNode=parentNode;
    //父节点中的位置
    this.location=location;
    //语法节点队列
    this.queue=[];
    //语法状态
    this.state=0;
    //语法类型
    this.type=null;
    //语法动作
    this.action=null;
    //当前语法类型节点
    this.syntaxNode=null;
    //当前节点内容
    this.content='';
    //判断当前语法节点是否结束
    this.end=null;
    //节点处理信息(通常提供给函数处理)
    this.handleInfo=null;
    //标记是否是源值 如运算后的值与字符串
    this.isSourceVal=false;
};

//语法处理
syntaxTree.prototype.handle=function(){

};

//语法处理进度
syntaxTree.prototype.speed=function(str){

};

//添加语法节点
syntaxTree.prototype.add=function(state,type,action){
    var syntaxNode=new syntaxTree(this,this.queue.length);
    this.queue.push(syntaxNode);
    //赋值
    state && (syntaxNode.state=state) && (syntaxNode.type=type) && (syntaxNode.action=action);
    return syntaxNode;
};

//获取上一个语法节点
syntaxTree.prototype.prev=function(){
    return this.parentNode.queue[this.location -1 ];
};

//删除最后一个语法节点
syntaxTree.prototype.pop=function(){
    return this.queue.pop();
};


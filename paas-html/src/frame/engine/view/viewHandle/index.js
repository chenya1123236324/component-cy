/**
 * Created by xiyuan on 16-7-6.
 */
//@make : start

//文档解析与数据提取 (指令与文本)
Include('docParser.js');

//指令渲染
Include('directiveRendering/index.js');

//文档中文本解析(提取里边的数据操作,如 变量运算 及 过滤器)
Include('./textParser/textParser.js');

//文本数据绑定解析
Include('./textParser/textVm.js');

//行为树(常规解析 )
Include('./syntax/behaviorTree.js');

//语法树转换与提取
Include('./syntax/watchSyntaxData.js');

//行为树(数组解析 [])
Include('./syntax/arrayAnalytic.js');

//语法树
Include('./syntax/syntaxTree.js');

//语法树转换与提取
Include('./syntax/treeConvert.js');

//语法解析(公用方法)
Include('./syntax/$expression.js');


//@make : end
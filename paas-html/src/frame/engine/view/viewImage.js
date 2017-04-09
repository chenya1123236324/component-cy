/**
 * Created by xiyuan on 16-6-13.
 */


/**
 * 视图镜像(视图的实现)
 * @param viewSource
 * @returns {viewImage}
 */
function viewImage(viewSource,pageAssign){
    //视图渲染数据存储
    this._stroage={
        //存储视图分配的数据

    };
    this.$pageAssign=pageAssign;
    //解析视图
    this.DOM=this.parser(viewSource);
    //手动销毁对象
    viewSource=pageAssign=null;
}

/**
 * 视图解析
 * @param viewSource
 * @returns {*}
 */

viewImage.prototype.parser=function(viewSource){
    var newDoc=$type.isElement(viewSource)?viewSource:$HTMLtoDOM(viewSource);
    this.extract(newDoc);
    //手动销毁对象
    viewSource=null;
    return newDoc;
};

/**
 * 视图中组件提取
 * @param doc
 */
viewImage.prototype.extract=function(doc){
    //文档解析
    docParser(doc,this.$pageAssign);
    //手动销毁对象
    doc=null;
};
/**
 * Created by xiyuan on 16-7-25.
 */
//@make : start

//渲染处理
Include('handle.js');

function directiveRendering(directiveRecords, $pageAssign) {

    //遍历当前代码DOM文档中包含指令的元素
    directiveRecords.forEach(function (directiveRecord) {

        //组件初步渲染
        var j, n, v, len,
            directive,
            attrInfo,
            instance,
            directiveName;


        //优先级key(用于循环当前元素的优先级)
        var key = ~0,
            //父节点
            parentNode= directiveRecord.parentNode,
            //指令集合
            directiveAll = directiveRecord.directiveAll,
            //绑定的指令
            directives = directiveRecord.directives,
            //元素内部元素
            innerElement = directiveRecord.innerElement,
            //当前元素
            element = directiveRecord.element,
            //当前元素所有属性
            attrs = directiveRecord.attrs,
            //优先级数据
            priorityData = Object.keys(directives);

        //排序优先级
        priorityData = priorityData.sort(function (a, b) {
            return b - a;
        });

        //当前元素绑定的指令优先级类别个数
        len = priorityData.length;

        //label 跳转标记
        terminal:

            //循环优先级
            while (++key < len) {
                //按照组件优先级渲染
                v = directives[priorityData[key]];
                j = ~0;
                n = v.length;
                //遍历优先级分类中的指令
                while (++j < n) {
                    //获取指令资源
                    directive = v[j];
                    //获取指令实例
                    instance = directive.instance;
                    //获取指令名称
                    directiveName = directive.directiveName;
                    //获取元素信息
                    attrInfo = directive.attrInfo;

                    //指令处理,并检查是否需要停止此元素上的后续组件渲染
                    if (!handle.bind({$pageAssign: $pageAssign})(element, instance, directiveName, innerElement, attrInfo, directiveAll, {attrs: attrs}))break terminal;

                }
            }

        //手动销毁对象
        directiveRecord=j=n=v=len=directive=attrInfo=instance=directiveName=key =parentNode= directiveAll = directives = innerElement = element = attrs = priorityData = null;
    });
    //手动销毁对象
    directiveRecords= $pageAssign=null;
}


//@make : end
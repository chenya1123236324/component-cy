/**
 * Created by chenya on 2016/12/28.
 */
//后台接口返回tree数据转换
define([], function () {

    return function (data) {
        var treeData = [];

        //节点容器
        var treeStorage = {},
        //记录
            recordKeys = {},
            useKey = {};

        data.forEach(function (nodeInfo) {
            recordKeys[nodeInfo.id] = false;
            delete useKey[nodeInfo.id];
            recordKeys[nodeInfo.parentId] = recordKeys[nodeInfo.parentId] === false ? false : useKey[nodeInfo.parentId] = treeStorage[nodeInfo.parentId], true;
            ((treeStorage[nodeInfo.parentId] = treeStorage[nodeInfo.parentId] || {children: []}).children || (treeStorage[nodeInfo.parentId].children = [])).push(treeStorage[nodeInfo.id] = treeStorage[nodeInfo.id] ? treeStorage[nodeInfo.id].extend({name: nodeInfo.menuName}, nodeInfo) : {}.extend(nodeInfo, {name: nodeInfo.menuName}))
        });
        treeStorage = recordKeys = null;
        treeData = useKey[0].children;
         //console.log('treeData',JSON.stringify(treeData));
        return treeData;
    }
});

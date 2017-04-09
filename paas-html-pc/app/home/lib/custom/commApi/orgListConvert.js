/**
 * Created by xiyuan on 17-1-10.
 */
define(function () {

    return function (data) {
        var treeData ,
            //节点容器
            treeStorage = {},
            //记录
            recordKeys = {},
            useKey = {};

        data.forEach(function (nodeInfo) {
            recordKeys[nodeInfo.orgCode] = false;
            delete useKey[nodeInfo.orgCode];
            recordKeys[nodeInfo.orgParentCode] = recordKeys[nodeInfo.orgParentCode] === false ? false : useKey[nodeInfo.orgParentCode] = treeStorage[nodeInfo.orgParentCode], true;
            ((treeStorage[nodeInfo.orgParentCode] = treeStorage[nodeInfo.orgParentCode] || {children: []}).children || (treeStorage[nodeInfo.orgParentCode].children = [])).push(treeStorage[nodeInfo.orgCode] = treeStorage[nodeInfo.orgCode] ? treeStorage[nodeInfo.orgCode].extend({name: nodeInfo.orgName}, nodeInfo) : {}.extend(nodeInfo, {name: nodeInfo.orgName}))
        });
        treeData = (treeStorage[0]||useKey[0]).children;
        useKey=treeStorage = recordKeys = null;


        return treeData
    }
});
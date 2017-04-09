/**
 * Created by 贝贝 on 2016/12/21.
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
            recordKeys[nodeInfo.ID] = false;
            delete useKey[nodeInfo.ID];
            recordKeys[nodeInfo.PID] = recordKeys[nodeInfo.PID] === false ? false : useKey[nodeInfo.PID] = treeStorage[nodeInfo.PID], true;
            ((treeStorage[nodeInfo.PID] = treeStorage[nodeInfo.PID] || {children: []}).children || (treeStorage[nodeInfo.PID].children = [])).push(treeStorage[nodeInfo.ID] = treeStorage[nodeInfo.ID] ? treeStorage[nodeInfo.ID].extend({name: nodeInfo.CNAME}, nodeInfo) : {}.extend(nodeInfo, {name: nodeInfo.CNAME}))
        });
        treeStorage = recordKeys = null;
        treeData = useKey[0].children;
        // console.log('treeData',treeData);
        return treeData;
    }
});
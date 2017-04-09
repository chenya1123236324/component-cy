/**
 * Created by 贝贝 on 2017/1/11.
 */
//组织架构树---带有部门用户  数据处理
define(function () {

    return function (orgData,usersData) {
        var treeData = [];

        //节点容器---存放有值的节点(有值的节点包含它的children)
        var treeStorage = {},
            //记录--有值为true,没有为false
            recordKeys = {},
            useKey = {},
            //用户数据map
            usersMap = {};

        //遍历用户数据,把用户数据写成map形式,orgCode作为key
        usersData.forEach(function (userInfo) {
            (usersMap[userInfo.orgCode]=usersMap[userInfo.orgCode]||[]).push({}.extend({name: userInfo.realName}, userInfo));
        });

        //遍历组织机构数据
        orgData.forEach(function (orgNodeInfo) {

            recordKeys[orgNodeInfo.orgCode] = false;//recordKeys{ orgNodeInfo.orgCode : false }
            delete useKey[orgNodeInfo.orgCode];

            recordKeys[orgNodeInfo.orgParentCode] = recordKeys[orgNodeInfo.orgParentCode] === false ? false : useKey[orgNodeInfo.orgParentCode] = treeStorage[orgNodeInfo.orgParentCode], true;
            ((treeStorage[orgNodeInfo.orgParentCode] = treeStorage[orgNodeInfo.orgParentCode] || {children: []}).children || (treeStorage[orgNodeInfo.orgParentCode].children = [])).push(treeStorage[orgNodeInfo.orgCode] = treeStorage[orgNodeInfo.orgCode] ? treeStorage[orgNodeInfo.orgCode].extend({name: orgNodeInfo.orgName}, orgNodeInfo) : {}.extend(orgNodeInfo, {name: orgNodeInfo.orgName}))


            //抽取用户数据到子节点
            if(usersMap[orgNodeInfo.orgCode] && treeStorage[orgNodeInfo.orgCode]){
                treeStorage[orgNodeInfo.orgCode].children = (treeStorage[orgNodeInfo.orgCode].children || []).concat(usersMap[orgNodeInfo.orgCode])
            }

        });

        treeStorage = recordKeys = null;
        treeData = useKey[0].children;
        return treeData;
    }
});
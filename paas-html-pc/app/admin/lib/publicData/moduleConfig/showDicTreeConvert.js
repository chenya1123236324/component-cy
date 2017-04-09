/**
 * Created by chenya on 2017/3/28.
 */

//点击字典
define(function () {
    //参数:
    // 1、isFindAll       是否查询全部
    // 2、type            类型
    // 3、callback        回调函数
    return function (isFindAll, type, callback) {
        var targetViewModel = $FRAME.$model(function () {
            //选择模块
            this.server({
                serverType: 'api',
                method: 'POST',
                url: 'dictionaryList'
            }).receive(function (res) {
                var moduleList = {
                    actions: {
                        click: function () {
                            console.log(arguments)
                        },
                        select: function () {
                            // console.log(arguments,'select')
                        },
                        unselect: function () {
                            // console.log(arguments,'unselect')
                        },
                        selectChange: function () {
                            // console.log(arguments,'change')
                        }
                    },
                    list: treeConvert(res.data),
                };

                function treeConvert(data) {
                    var treeData = [];
                    //节点容器
                    var treeStorage = {},
                    //记录
                        recordKeys = {},
                        useKey = {};
                    data.forEach(function (nodeInfo) {
                        recordKeys[nodeInfo.id] = false;
                        delete useKey[nodeInfo.id];
                        recordKeys[nodeInfo.pid] = recordKeys[nodeInfo.pid] === false ? false : useKey[nodeInfo.pid] = treeStorage[nodeInfo.pid], true;
                        ((treeStorage[nodeInfo.pid] = treeStorage[nodeInfo.pid] || {children: []}).children || (treeStorage[nodeInfo.pid].children = [])).push(treeStorage[nodeInfo.id] = treeStorage[nodeInfo.id] ? treeStorage[nodeInfo.id].extend({name: nodeInfo.dictName}, nodeInfo) : {}.extend(nodeInfo, {name: nodeInfo.dictName}))
                    });
                    treeStorage = recordKeys = null;
                    treeData = useKey[0].children;
                    // console.log('treeData',treeData);
                    return treeData;
                }

                typeof callback === 'function' && callback(moduleList);
            }.bind(this)).send({
                isFindAll:1,
                dictType:"",
                dictIdList:"",
                ownParentFlag:"",
                condition:""
            });
        });
        return targetViewModel;
    }
});
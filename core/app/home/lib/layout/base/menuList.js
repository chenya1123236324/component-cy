/**
 * Created by xiyuan on 16-12-28.
 */
define(function () {

    //转换数据接口中的数据
    function menuListConversion(listData) {
        var resList=[],
            tmpMap={},
            order=[],
            parentMap={};
        listData.forEach(function (menuInfo) {
            (tmpMap[menuInfo.parentId]=tmpMap[menuInfo.parentId]|| (order.push(menuInfo.parentId),[])).push({
                id:menuInfo.id,
                viewId:menuInfo.viewId,
                icon:menuInfo.iconClass,
                iconColor:menuInfo.iconColor,
                name:menuInfo.menuName,
                // href:menuInfo.menuUrl
                href:'home/custom/list?viewId='+menuInfo.viewId+'&pageName='+menuInfo.menuName,
            });

        });

        (tmpMap[0]||[]).forEach(function (menuInfo) {
            parentMap[menuInfo.id]={
                name:menuInfo.name,
                viewId:menuInfo.viewId
            }
        });

        delete tmpMap[0];
        tmpMap.forEach(function (menuList,parentId) {
            parentMap[parentId] && (parentMap[parentId].list=menuList);
        });

        order.forEach(function (parentId) {
            parentMap[parentId] && resList.push(parentMap[parentId])
        });

        tmpMap=order=parentMap=null;
        return resList.length?resList:[{
                name:'暂无数据'
            }];
    }

    return $FRAME.model(function () {
        /**
         * "parentId": "父级菜单id，可为空"
         * "sourceType": "菜单分类  PC端： 0（不填 默认） 1、移动端"
         * "roleIdList": "角色id集合，为空，则默认当前用户"
         */
        this.server({
            serverType:'api',
            method:'post',
            url:'menuList'
        }).fail(function (errMsg) {
            this.$model=[
                {
                    name:errMsg
                }
            ];
        }.bind(this)).success(function (res) {
            this.$model=menuListConversion(res);
        }.bind(this)).send({
            sourceType:0
        })


    })

});
/**
 * Created by 贝贝 on 2017/1/6.
 */
//角色权限 --  设置权限右侧列表数据处理
define(function () {
    /*参数:
    * 1.data被选中的权限
    * 2.moduleData左侧单层菜单(模块)数据
    * 3.allPerData右侧所有权限*/
    return function (data,moduleData,allPerData) {

        var maps = [],
            roleBizType = '';

        //把所有模块的id和name保存下来
        moduleData.forEach(function (module) {
            maps.push({
                moduleId:module.id,
                moduleName:module.label,
                menuList:[],//网页版菜单
                mobileMenuList:[],//移动端菜单
                operationList:[],//网页版操作
                mobileOperationList:[]//移动端操作
            });
        });

        //遍历数据
        /*data.forEach(function (per) {
            maps.forEach(function (module) {
                //首先判断相同模块
                if(module.moduleId==per.moduleId){
                    //再判断权限类型
                    switch (per.bizType){
                        //如果是网页菜单,把名字放入该模块对象的网页菜单数组
                        case 'MENU':
                            module.menuList.push({
                                menuName:per.permName,
                                menuId:per.id,
                                checked:true//选中状态
                            });
                            break;
                        //移动端菜单
                        case 'MOBILEMENU':
                            module.mobileMenuList.push({
                                menuName:per.permName,
                                menuId:per.id,
                                checked:true
                            });
                            break;
                        //网页版操作
                        case 'OPERATION':
                            module.operationList.push({
                                operationName:per.permName,
                                operationId:per.id,
                                checked:true
                            });
                            break;
                        //移动端操作
                        case 'MOBILEOPERATION':
                            module.mobileOperationList.push({
                                operationName:per.permName,
                                operationId:per.id,
                                checked:true
                            })
                    }
                }
            });

        });*/

        //判断某个权限是否被选中(根据moduleId和bizType进行匹配)
        function matches(moduleId,bizType,id) {
            var bizT = false;
            data.forEach(function (per) {
                //首先判断相同模块
                if(per.moduleId==moduleId && per.bizType==bizType && per.id==id){
                    bizT = true;
                }
            });
            return bizT;
        }


        //遍历模块和全部权限,把权限赋给相应模块的相应类型数组,标记是否选中状态
        maps.forEach(function (module) {
            allPerData.forEach(function (allPer) {
                //如果权限和模块匹配,判断其类型
                if(allPer.moduleId==module.moduleId){

                    //去遍历被选中权限数组,判断该条权限是否被选中
                    roleBizType = matches(allPer.moduleId,allPer.bizType,allPer.id);

                    switch (allPer.bizType){
                        //如果是网页菜单,把名字放入该模块对象的网页菜单数组
                        case 'MENU':
                            module.menuList.push({
                                menuName:allPer.permName,
                                menuId:allPer.id,
                                checked:roleBizType//选中状态
                            });
                            break;
                        //移动端菜单
                        case 'MOBILEMENU':
                            module.mobileMenuList.push({
                                menuName:allPer.permName,
                                menuId:allPer.id,
                                checked:roleBizType
                            });
                            break;
                        //网页版操作
                        case 'OPERATION':
                            module.operationList.push({
                                operationName:allPer.permName,
                                operationId:allPer.id,
                                checked:roleBizType
                            });
                            break;
                        //移动端操作
                        case 'MOBILEOPERATION':
                            module.mobileOperationList.push({
                                operationName:allPer.permName,
                                operationId:allPer.id,
                                checked:roleBizType
                            })
                    }

                }


            });
        });

        return maps;

    }
})
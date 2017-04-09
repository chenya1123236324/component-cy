/**
 * Created by 贝贝 on 2017/1/4.
 */
//组织架构树---的model
define(['../orgTreeConvert'],function ($orgTreeConvert) {
    return function () {
        var orgTreeConfListModel = $FRAME.$model(function () {
            //组织架构树
            this.server({
                serverType:'api',
                method:'POST',
                url:'orgTreeList'//组织架构树
            }).receive(function (res) {
                this.$model = {
                    actions:{
                        click:function () {
                            /*if(arguments[1].orgCode!=0){
                                //调用用户列表的获取用户方法,把当前部门的id和模块的id传过去
                                authGridConfModel.method('getAuth',arguments[1],scope);

                                //grid数据刷新===============================
                                scope.authGridApi.update && scope.authGridApi.update();
                            }*/
                            return arguments[1];
                        },
                        select:function () {
                            console.log('选择的',arguments[1])
                            return arguments[1];
                        },
                        unselect:function () {

                        },
                        selectChange:function () {

                        }
                    },
                    list:$orgTreeConvert(res.data.organzationList)
                }

            }.bind(this)).send({})
        });
        return orgTreeConfListModel;

    }
})
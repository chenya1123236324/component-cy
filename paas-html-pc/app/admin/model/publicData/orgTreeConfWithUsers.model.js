/**
 * Created by 贝贝 on 2017/1/11.
 */
//组织架构树---带有部门用户  model
model('orgTreeConf',['$:@lib/orgTreeConvertWithUsers'],function ($orgTreeConvertWithUsers) {
    var This = this,
        orgTreeServer = this.server({
        serverType:'api',
        method:'POST',
        url:'orgTreeList'//组织架构树
    }),
        orgUserServer = this.server({
            serverType:'api',
            method:'POST',
            url:'userList'//查询用户集合
        });
    orgTreeServer.receive(function (orgRes) {
        orgUserServer.receive(function (userRes) {
            this.$model = {
                checkbox:true,
                actions:{
                    click:function () {
                    },
                    select:function () {

                    },
                    unselect:function () {

                    },
                    selectChange:function () {

                    }
                },
                list:$orgTreeConvertWithUsers(orgRes.data.organzationList,userRes.data.record)
            }

        }.bind(this)).send();
    }.bind(this)).send({})
})
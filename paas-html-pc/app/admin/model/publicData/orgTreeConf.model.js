/**
 * Created by 贝贝 on 2017/1/10.
 */
//组织架构树--model 
model('orgTreeConf',['$:@lib/orgTreeConvert'],function ($orgTreeConvert) {
    //组织架构树

    this.method('treeData',function (checkboxState) {
        this.server({
            serverType:'api',
            method:'POST',
            url:'orgTreeList'//组织架构树
        }).receive(function (res) {
            this.$model = {
                checkbox:checkboxState,
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
                list:$orgTreeConvert(res.data.organzationList)
            }

        }.bind(this)).send({})
    });

})
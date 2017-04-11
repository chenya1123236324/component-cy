/**
 * Created by lei on 2017/2/16.
 */
model('indexPage',['$:@lib/custom/homepage/pageList'],function(pageList){

    var This = this;


    var homePageList=this.server({
        serverType:'api',
        method:'post',
        url:'homePageSearch'
    });

    this.method('homeListConf',function (){
        homePageList.success(function (res){
            this.$model = pageList(res);
            console.log('在这呢',pageList(res))
        }.bind(this)).fail(function (msg){
            console.log(msg)
        }).send({})
    })

})


//列表的数据
model('gridConf', ['$:@lib/custom/homepage/homeDataConf'],function (homeDataConf) {
    var This = this
    
    var gridStructureSever=this.server({
        serverType:'api',
        method:'post',
        url:'viewRenderConditions'
    });

    this.method('getConf',function(viewId,gridApi,id){
        // console.log(viewId,'>>>>>>')
        // return

        gridStructureSever.success(function(res){

            //获取方法转译后的数据
            this.$model = homeDataConf(viewId,res,gridApi,id);

        }.bind(this)).fail(function(msg){
            console.log(msg)
        }).send({
            viewId:viewId
        })
    })
// console.log(this)
});
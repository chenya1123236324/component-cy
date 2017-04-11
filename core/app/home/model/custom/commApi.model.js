/**
 * Created by xiyuan on 17-1-9.
 */

//查询字典集合
model('queryMaps',function () {

    var M = this,
        queryMapsServer = this.server({
            serverType: 'api',
            url: 'queryMaps'
        });

    this.method('getData', function (dictType,sendData) {
        queryMapsServer.success(function (res) {

            var dataList= [];

            res.forEach(function (info) {
                dataList.push({
                    content:info.dictName,
                    value:info.dictCode
                })
            });

            M.$model=dataList;

        }).fail(function (msg) {
            console.log(msg)
        }).send({dictType:dictType}.extend(sendData||{}));
    })

});

//组织架构集合 [tree的数据结构]
model('orgList',['$:@lib/custom/commApi/orgListConvert'],function ($orgListConvert) {
    var M = this,
        orgListServer = this.server({
            serverType: 'api',
            url: 'orgList'
        });

    this.method('getData', function (orgParentCode) {
        orgListServer.success(function (res) {
            M.$model={
                list:$orgListConvert(res.organzationList)
            };
        }).fail(function (msg) {
            console.log(msg)
        }).send({orgParentCode:orgParentCode||0});
    })
});

//查询用户集合服务  [数组结构 ,tree专用]
model('userInfoList',['$:@lib/custom/commApi/orgListConvert'],function ($orgListConvert) {
    var M = this,
        userInfoListServer = this.server({
            serverType: 'api',
            url: 'userInfoList'
        });

    this.method('getData', function (orgCode) {
        userInfoListServer.onceSuccess(function (res) {
            M.$model=res;
        }).onceFail(function (msg) {
            console.log(msg)
        }).send({orgCode:orgCode||0});
    })
});

//唯一校验
model('unique',function () {
    var M = this,
        uniqueServer = this.server({
            serverType: 'api',
            url: 'unique'
        });

    this.method('valid', function (sendData,callbck) {
        uniqueServer.onceSuccess(function (res) {
            callbck(M.$model=res);
        }).onceFail(function (msg) {
            callbck(false);
        }).send(sendData);
    })
});
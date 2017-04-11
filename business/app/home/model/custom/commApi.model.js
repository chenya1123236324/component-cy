
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
    var M = this;
        //orgListServer = this.server({
        //    serverType: 'api',
        //    url: 'orgList'
        //});

    this.method('getData', function (orgParentCode) {
        //orgListServer.success(function (res) {
        //    M.$model={
        //        list:$orgListConvert(res.organzationList)
        //    };
        //}).fail(function (msg) {
        //    console.log(msg)
        //}).send({orgParentCode:orgParentCode||0});

        var res={
            "tradeName": "查询组织机构树形数据格式集合",
            "data": {
                "organzationList": [
                    {
                        "orgName": "集团管理层",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1469677084000,
                        "orgCode": "011",
                        "uUserCode": "ME_0001",
                        "operationType": "INSERT",
                        "id": 69,
                        "cUserCode": "ME_0001",
                        "orgDesc": "",
                        "orgParentCode": "0",
                        "groupCode": null,
                        "lastUpdateTime": 1469677084000
                    },
                    {
                        "orgName": "董事会",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1469677144000,
                        "orgCode": "012",
                        "uUserCode": "ME_0001",
                        "operationType": "INSERT",
                        "id": 70,
                        "cUserCode": "ME_0001",
                        "orgDesc": "",
                        "orgParentCode": "0",
                        "groupCode": null,
                        "lastUpdateTime": 1469677144000
                    },
                    {
                        "orgName": "财务管理中心",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1469677210000,
                        "orgCode": "014",
                        "uUserCode": "US000000137",
                        "operationType": "UPDATE",
                        "id": 72,
                        "cUserCode": "ME_0001",
                        "orgDesc": "测试",
                        "orgParentCode": "0",
                        "groupCode": null,
                        "lastUpdateTime": 1476153077000
                    },
                    {
                        "orgName": "IT管理部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1469677688000,
                        "orgCode": "019",
                        "uUserCode": "US000000137",
                        "operationType": "UPDATE",
                        "id": 77,
                        "cUserCode": "ME_0001",
                        "orgDesc": "IT管理部",
                        "orgParentCode": "0",
                        "groupCode": null,
                        "lastUpdateTime": 1476153199000
                    },
                    {
                        "orgName": "业务管理部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1470114556000,
                        "orgCode": "021",
                        "uUserCode": "US000000137",
                        "operationType": "UPDATE",
                        "id": 81,
                        "cUserCode": "ME_0001",
                        "orgDesc": "业务管理部",
                        "orgParentCode": "0",
                        "groupCode": null,
                        "lastUpdateTime": 1476153342000
                    },
                    {
                        "orgName": "SOHO直营",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1470114604000,
                        "orgCode": "023",
                        "uUserCode": "US000000137",
                        "operationType": "UPDATE",
                        "id": 83,
                        "cUserCode": "ME_0001",
                        "orgDesc": "SOHO直营",
                        "orgParentCode": "0",
                        "groupCode": null,
                        "lastUpdateTime": 1476154809000
                    },
                    {
                        "orgName": "机构渠道部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1470114617000,
                        "orgCode": "024",
                        "uUserCode": "ME_0001",
                        "operationType": "INSERT",
                        "id": 84,
                        "cUserCode": "ME_0001",
                        "orgDesc": "",
                        "orgParentCode": "0",
                        "groupCode": null,
                        "lastUpdateTime": 1470114617000
                    },
                    {
                        "orgName": "机构一部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1476151883000,
                        "orgCode": "024001",
                        "uUserCode": "US000000137",
                        "operationType": "INSERT",
                        "id": 86,
                        "cUserCode": "US000000137",
                        "orgDesc": "",
                        "orgParentCode": "024",
                        "groupCode": null,
                        "lastUpdateTime": 1476151883000
                    },
                    {
                        "orgName": "机构二部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1476151900000,
                        "orgCode": "024002",
                        "uUserCode": "US000000137",
                        "operationType": "INSERT",
                        "id": 87,
                        "cUserCode": "US000000137",
                        "orgDesc": "",
                        "orgParentCode": "024",
                        "groupCode": null,
                        "lastUpdateTime": 1476151900000
                    },
                    {
                        "orgName": "财务部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1476152944000,
                        "orgCode": "014001",
                        "uUserCode": "US000000137",
                        "operationType": "INSERT",
                        "id": 88,
                        "cUserCode": "US000000137",
                        "orgDesc": "",
                        "orgParentCode": "014",
                        "groupCode": null,
                        "lastUpdateTime": 1476152944000
                    },
                    {
                        "orgName": "风控部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1476152957000,
                        "orgCode": "014002",
                        "uUserCode": "US000000137",
                        "operationType": "INSERT",
                        "id": 89,
                        "cUserCode": "US000000137",
                        "orgDesc": "",
                        "orgParentCode": "014",
                        "groupCode": null,
                        "lastUpdateTime": 1476152957000
                    },
                    {
                        "orgName": "法务部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1476152968000,
                        "orgCode": "014003",
                        "uUserCode": "US000000137",
                        "operationType": "INSERT",
                        "id": 90,
                        "cUserCode": "US000000137",
                        "orgDesc": "",
                        "orgParentCode": "014",
                        "groupCode": null,
                        "lastUpdateTime": 1476152968000
                    },
                    {
                        "orgName": "品牌公关中心",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1476941816000,
                        "orgCode": "025",
                        "uUserCode": "ME_0001",
                        "operationType": "INSERT",
                        "id": 91,
                        "cUserCode": "ME_0001",
                        "orgDesc": "品牌公关中心",
                        "orgParentCode": "0",
                        "groupCode": null,
                        "lastUpdateTime": 1476941816000
                    },
                    {
                        "orgName": "品牌部",
                        "isDelete": 0,
                        "groupId": null,
                        "extCode": null,
                        "extParentCode": null,
                        "entCode": "TJ",
                        "createTime": 1476941836000,
                        "orgCode": "025001",
                        "uUserCode": "ME_0001",
                        "operationType": "INSERT",
                        "id": 92,
                        "cUserCode": "ME_0001",
                        "orgDesc": "品牌部",
                        "orgParentCode": "025",
                        "groupCode": null,
                        "lastUpdateTime": 1476941836000
                    },
                ]
            },
            "logFileName": "G1_org_O02006_64.log",
            "message": "操作成功",
            "uuid": "C86070C83B934E9DA1A386A6BC230359",
            "status": 200,
            "errorParams": null
        }

        M.$model={
            list:$orgListConvert(res.data.organzationList)
        };

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
            url: 'realUnique'
        });

    this.method('valid', function (sendData,callbck) {
        uniqueServer.success(function (res) {
            callbck(M.$model=res);
        }).fail(function (msg) {
            callbck(false);
        }).send(sendData);
    })
});

//列表视图渲染
model('gridStruct',['$:@lib/custom/commApi/gridStruct'],function (gridStruct) {
    var M = this,
        gridServer = this.server({
            serverType: 'api',
            url: 'viewRenderConditions'
        });

    this.method('getData',function (fieldInfo) {
        var viewId=fieldInfo.selectViewId;
        gridServer.success(function (res) {
            M.$model=gridStruct(res,fieldInfo);
        }).fail(function () {
            M.$model=null;
        }).send({
            viewId:viewId
        })
    })

});
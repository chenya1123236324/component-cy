
/**
 * Created by lei on 17-3-1.
 */

//检索按钮
model('search',function(){

    var This = this;
    This.method('searchBtn',function(gridApi){


        //页面左侧的‘消息信息’ 和 ‘通知公告’的点击事件
        var showHandle = {
            //点击消息,让ul消息通知显示
            click:function () {
                var ul = document.querySelector('.news-message');
                ul.style.backgroundColor="white";

                var $gridApi=gridApi.get();
                console.log($gridApi,'111111111111')

                $gridApi.sendData({
                    "readStatus": 'NOREAD',
                    "messageType": 'ALL',
                    "create_time1":"946684800000",
                    "create_time2":String(Date.now()),
                },false);

                $gridApi.update();
            }
        };
        
      
        This.$model= {
            hiddenFlag:true,
            infoType:{
                name:'infoType',
                search:true,
                // multiple:true,
                style:{
                    width:'160px',
                    'margin-left':'6px'
                },
                events:{
                    change:function () {
                        // console.log(this,'yes')
                    },
                    click:function () {
                        // console.log('click')
                    }
                },
                dataList:[
                    {
                        isGroup:false,
                        content:'全部',
                        value:'ALL',
                        selected:true
                    },
                    {
                        isGroup:false,
                        content:'系统',
                        value:'SYSTEM',
                    },
                    {
                        isGroup:false,
                        content:'私信',
                        value:'PRIVATE',
                    },
                    {
                        isGroup:false,
                        content:'一般消息',
                        value:'NORML',
                    },
                ]
            },
            dataType:{
                name:'dataType',
                search:true,
                // multiple:true,
                style:{
                    width:'160px',
                    'margin-left':'6px'
                },
                events:{
                    change:function () {
                        if(this.value==='CUSTOM'){
                            This.$model.hiddenFlag=false;
                        }else{
                            This.$model.hiddenFlag = true;
                        }
                    },
                    click:function () {
                        // console.log('click')
                    }
                },
                dataList:[
                    {
                        isGroup:false,
                        content:'全部',
                        value:'ALL',
                        selected:true
                    },
                    {
                        isGroup:false,
                        content:'今天',
                        value:'CURDAY',
                    },
                    {
                        isGroup:false,
                        content:'一周',
                        value:'WEEK',
                    },
                    {
                        isGroup:false,
                        content:'一月',
                        value:'MONTH',
                    },
                    {
                        isGroup:false,
                        content:'自定义',
                        value:'CUSTOM',
                    },
                ]
            },
            readyType:{
                name:'readyType',
                search:true,
                // multiple:true,
                style:{
                    width:'160px',
                    'margin-left':'6px'
                },
                events:{
                    change:function () {
                        // console.log(this,'yes')
                    },
                    click:function () {
                        // console.log('click')
                    }
                },
                dataList:[
                    {
                        isGroup:false,
                        content:'全部',
                        value:'ALL',
                    },
                    {
                        isGroup:false,
                        content:'已读',
                        value:'READ',
                    },
                    {
                        isGroup:false,
                        content:'未读',
                        value:'NOREAD',
                        selected:true
                    }
                ]
            },
            searchBut:[{
                isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
                spacing:'20px',//【非必填项】两个按钮之间的间距
                eventIdentifierName:'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
                style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                    // padding:'50px'
                },
                list:[
                    {
                        class:'btn btn-teal',//按钮样式
                        icon:'iconfont icon-search', //图标
                        label:'查询', //按钮文字
                        align:'right', //文字居左
                        padding:'4px 26px',//按钮内边距，可以控制按钮大小
                        events:{
                            click:function (event,searchFormSource) {
                                var $gridApi=gridApi.get();
                                var searchConditions = searchFormSource.getData(),
                                    sendData={
                                        "readStatus": searchConditions.readyType,
                                        "messageType": searchConditions.infoType,
                                        "create_time1":"",
                                        "create_time2":""
                                    },
                                    startTime,endTime;

                                var d = new Date(),
                                    nowDayOfWeek = d.getDay(),//今天本周的第几天
                                    nowDay = d.getDate(),//当前日
                                    nowMonth = d.getMonth(),//当前月
                                    nowYear = d.getFullYear();//当前年

                                switch (searchConditions.dataType){
                                    case "ALL":
                                        startTime = "946684800000";
                                        endTime = Date.now();
                                        sendData.create_time1 = String(startTime);
                                        sendData.create_time2 = String(endTime);
                                        break;
                                    case "CURDAY":
                                        startTime = new Date(nowYear,nowMonth,nowDay).getTime();
                                        endTime = Date.now();
                                        sendData.create_time1 = String(startTime);
                                        sendData.create_time2 = String(endTime);
                                        break;
                                    case 'WEEK':
                                        startTime = new Date(nowYear,nowMonth,nowDay-nowDayOfWeek).getTime();
                                        endTime = Date.now();
                                        sendData.create_time1 = String(startTime);
                                        sendData.create_time2 = String(endTime);
                                        console.log(startTime,sendData)
                                        break;
                                    case 'MONTH':
                                        startTime = new Date(nowYear,nowMonth,1).getTime();
                                        endTime = Date.now();
                                        sendData.create_time1 = String(startTime);
                                        sendData.create_time2 = String(endTime);
                                        break;
                                    case 'CUSTOM':
                                        console.log(searchConditions)
                                        startTime = new Date(searchConditions.startTime.replace(/\-/g,'/')).getTime();//转成时间戳
                                        endTime = new Date(searchConditions.endTime.replace(/\-/g,'/')).getTime();//转成时间戳
                                        sendData.create_time1 = String(startTime);
                                        sendData.create_time2 = String(endTime);
                                        break;
                                };

console.log(searchConditions)
                                $gridApi.sendData(sendData,false);

                                $gridApi.update();

                                //得到消息列表的消息总数
                                var moduleListModel = $FRAME.$model(function () {
                                    
                                    var totalMessage = this.server({
                                        serverType: 'api',
                                        method: 'post',
                                        url: 'totalMessage'   //查询消息总数

                                    }).success(function (res) {

                                        document.querySelector('.news-list .newsList-top .totalNews').innerHTML = '消息共'+res.count+'条';

                                    }.bind(this)).fail(function (msg) {
                                        console.log(msg)
                                    }).send({
                                        "readStatus": searchConditions.readyType,
                                        "messageType": searchConditions.infoType,
                                    })
                                });

                                setTimeout(function(){
                                    //当没有数据时，显示的页数“共NaN页”和数据总数改成“共0页”和“共0条”
                                    var showBox = document.querySelector('.grid-empty');
                                    if(showBox){
                                        document.querySelector('.footer-left .toPage strong').innerHTML = '0';
                                        document.querySelector('.footer-right strong').innerHTML = '0';
                                    }
                                },100)

                            }



                        }
                    }
                ]
            }],
            showHandle:showHandle
        }
    })

});

//消息按钮 删除和已读
model('messageButton',function(){

    this.method('getMessageBut',function(gridApi) {
        this.$model = [{
            isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
            spacing: '20px',//【非必填项】两个按钮之间的间距
            eventIdentifierName: 'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
            style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                // padding:'50px'
            },
            list: [
                {
                    class: 'btn btn-teal-outline',//按钮样式
                    icon: '', //图标
                    label: '删除',//按钮文字
                    align: 'center',//文字居中
                    padding: '5px 19px',//按钮内边距，可以控制按钮大小
                    events: {
                        click: function (event) {
                            var deletList = gridApi.getInnerApi().developScope.checkedListData,
                                ids = [];
                            deletList.forEach(function(eachData){
                                ids.push(eachData.id)
                            })

                            console.log(ids)
                            //得到消息列表的消息总数
                            var moduleListModel = $FRAME.$model(function () {

                                var totalMessage = this.server({
                                    serverType: 'api',
                                    method: 'post',
                                    url: 'deleteMessages'   //删除消息服务2

                                }).success(function (res) {

                                    var $gridApi=gridApi.get();

                                    var newsType = document.querySelectorAll('.select-document select')[0],
                                        newsTypeTwo = document.querySelectorAll('.select-document select')[2],
                                        index =newsType.selectedIndex,
                                        indexTwo =newsTypeTwo.selectedIndex,
                                        dataVal = newsType.options[index].value,
                                        dataValTwo = newsTypeTwo.options[indexTwo].value;


                                    $gridApi.sendData({
                                        "readStatus": dataValTwo,
                                        "messageType": dataVal,
                                    },false);

                                    $gridApi.update();


                                }.bind(this)).fail(function (msg) {
                                    console.log(msg)
                                }).send({
                                    "id":ids
                                })
                            })
                        }
                    }
                }, {
                    class: 'btn btn-teal-outline',//按钮样式
                    icon: '', //图标
                    label: '标记已读', //按钮文字
                    align: 'right', //文字居右
                    padding: '5px 8px',//按钮内边距，可以控制按钮大小
                    events: {
                        click: function (event) {
                            var deletList = gridApi.getInnerApi().developScope.checkedListData,
                                ids = [],
                                local = true;

                            deletList.forEach(function(eachData){
                                ids.push(eachData.id);
                                if(eachData.isRead === 1){
                                    local = false;
                                }
                            })
                            console.log(deletList)

                            if(!local){
                                $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                    dialog({
                                        title:'操作提示',
                                        maxmin:true,
                                        content:'<h3>{{title}}</h3>',
                                        scope:{
                                            title:'亲爱的用户！您所选的消息中包含已读信息！'
                                        },
                                        filter:{},
                                        height:'200px',
                                        width:'400px',
                                        btns:[
                                            {
                                                name:'确认',
                                                trigger:function (eve,interface) {
                                                    interface.close();
                                                }
                                            }
                                        ]
                                    })
                                })
                            }else{
                                //得到消息列表的消息总数
                                var moduleListModel = $FRAME.$model(function () {

                                    var totalMessage = this.server({
                                        serverType: 'api',
                                        method: 'post',
                                        url: 'readMessage'   //标记消息已读

                                    }).success(function (res) { console.log(res,'标记已读')

                                        var $gridApi=gridApi.get();

                                        $gridApi.sendData({
                                            "readStatus": 'NOREAD',
                                            "messageType": 'ALL',
                                        },false);

                                        $gridApi.update();


                                    }.bind(this)).fail(function (msg) {
                                        console.log(msg)
                                    }).send({
                                        "id":ids   //应该可以多选，为上面ids
                                    })
                                })
                            }

                        }
                    },
                    iconEvents: {
                        click: function (event) {
                            //停止事件冒泡
                            event.stopPropagation();
                            console.log(this, this.innerHTML, event)
                            alert(this);
                        }
                    }
                }
            ]
        }]
    })
});

//消息列表
model('newsList',['$:@lib/custom/array.remove'],function($remove){


    var ListMessage=this.server({
        serverType:'api',
        method:'post',
        url:'messageList'   //查询消息列表
    });

    this.method('getMessageConf',function(){

        ListMessage.success(function(res){
            var count;
            if(res.length === undefined){
                count = 0
            }else{
                count = res.length
            }
            //获取方法转译后的数据
            this.$model = {
                newsListConf:{
                    //数据接口 ,没有则不请求网络数据,需自行在数据过滤函数中返回
                    // "url": "http://paas.mecrmcrm.com/gateway/message/M01005",
                    //网络请求的类型 如: POST | GET
                    "method": "POST",
                    //页面数据展示的条数
                    "pageSize": 20,
                    //页面可选展示的条数
                    "pageSizeList": [10, 20, 30],
                    //数据默认排序 [ asc | desc ]
                    order: "asc",
                    //排序的字段
                    "orderField": "id",
                    //数据请求时候发送的附带数据
                    "sendData": {
                    },
                    //列表左边操作
                    "leftColsModel": [
                        {
                            titleConfig: function () {
                                //开发者专用作用域
                                var developScope = this.developScope;
                                //检查并设置初始值
                                developScope.isAllChecked = false;
                                developScope.masterChange = false;
                                developScope.allChecked = false;
                                //主选择框选择时间标识
                                developScope.allCheckedTime = Date.now();
                                developScope.allCheckedCount === undefined && (developScope.allCheckedCount = 0);

                                //用于存储选中的数据
                                developScope.checkedListData = []

                                return {
                                    template: '<input type="checkbox" $-on:change="onChange" $-checked:false="developScope.allChecked">',
                                    scope: {
                                        developScope: developScope,
                                        onChange: function () {
                                            if (this.checked) {
                                                developScope.isAllChecked = true;
                                                developScope.allChecked = true;
                                                developScope.allCheckedCount = developScope.gridListData.dataList.length;
                                            } else {
                                                developScope.isAllChecked = false;
                                                developScope.allChecked = false;
                                                developScope.allCheckedCount = 0
                                            }
                                            developScope.masterChange = true;
                                            developScope.allCheckedTime = Date.now()
                                        }
                                    },
                                    filter: {
                                        checkedHandle: function (isAllChecked) {
                                            developScope.masterChange = true;
                                            return isAllChecked
                                        }
                                    }
                                }
                            },
                            listConfig: function (data, rowData, index, gridListData) {
                                var developScope = this.developScope,
                                    dataLen = gridListData.length,
                                    isSelf = false,
                                    scope = {
                                        developScope: developScope,
                                        onChange: function () {
                                            isSelf = true;

                                            developScope.allCheckedCount = this.checked ? developScope.allCheckedCount + 1 : developScope.allCheckedCount - 1;

                                            if (dataLen === developScope.allCheckedCount) {
                                                developScope.allChecked = true;
                                            } else {
                                                developScope.allChecked = false;
                                            }

                                            if(this.checked){
                                                developScope.checkedListData.push(rowData)
                                            }else{
                                                $remove(developScope.checkedListData,rowData)
                                            }
                                        },
                                        onClick:function (e) {
                                            e.stopPropagation();
                                        }
                                    };

                                return {
                                    template: '<input $-on:change="onChange" $-on:click="onClick" $-model="$isChecked" type="checkbox" $-checked:false="developScope.isAllChecked|checkedHandle:[$,developScope.allCheckedTime]">',
                                    scope: scope,
                                    filter: {
                                        checkedHandle: function (isAllChecked) {

                                            var isChecked = false;

                                            if (!isSelf || developScope.masterChange) {
                                                isChecked = isAllChecked
                                            } else if (isSelf && isAllChecked) {
                                                isChecked = true;
                                            }

                                            isSelf = false;
                                            developScope.masterChange = false;

                                            return isChecked;

                                        }
                                    }
                                }
                            }
                        },
                        {
                            //列表序号
                            name: '序号',
                            listConfig: function (data, rowData, index) {
                                return {
                                    content: index + 1
                                }
                            }
                        }
                    ],
                    //字段模型
                    "colsModel": [
                        {
                            //字段标题
                            name: "标题内容",
                            //字段key
                            field: "title",
                            //是否需要开启排序
                            order: true,
                            //字体 对齐方式
                            align: "center",
                            //列表数据配置
                            listConfig: function (data, rowData, index) {
                                return {
                                    template: '<p $-parses-bind:style="index|colorHandel">{{content}}</p>',
                                    scope: {
                                        content: data
                                    },
                                    filter:{
                                        colorHandel:function (index) {
                                            return "color:{{color}}"
                                        }
                                    },
                                    content: '',
                                    events: {}
                                }
                            }
                        },
                        {
                            name: "消息类型",
                            field: "messageType",
                            order: false,
                            align: "center",
                            listConfig: function (data, rowData, index) {
                                if(data === "NORML"){
                                    data = '一般消息'
                                }else if(data === "SYSTEM"){
                                    data = '系统消息'
                                }else{
                                    data = '私信'
                                }

                                return {
                                    template: '<p $-parses-bind:style="index|colorHandel">{{content}}</p>',
                                    scope: {
                                        content: data
                                    },
                                    filter:{
                                        colorHandel:function (index) {
                                            return "color:{{color}}"
                                        }
                                    },
                                    content: '',
                                    events: {}
                                }
                            }
                        },
                        {
                            name: "创建时间",
                            field: "createTime",
                            order: false,
                            align: "center",
                            listConfig: function (data, rowData, index) {
                                return {
                                    template: '<p>{{content|Date:[$,"yy-mm-dd"]}}</p>',
                                    scope: {
                                        content: data
                                    }
                                }
                            }
                        }
                    ],
                    //行事件处理
                    events: {
                        click: function (e,index,data) {
                            $FRAME.redirect('home/custom/messageDetail?newsId='+data.id)
                        },
                        hover: function () {

                        },
                        unHover: function () {

                        },
                        /*select: function () {

                         },
                         unSelect: function () {

                         }*/
                    },
                    /**
                     * 数据过滤
                     * @param data
                     * @param [callback]
                     */
                    filtration: function (data, callback) { console.log(data,'////')
                        $FRAME.server({
                            serverType:'api',
                            method: 'POST',
                            url: 'messageList'    //查询消息列表
                        }).fail(function (res) {
                            callback({});
                        }).success(function (resData) {
                            callback({
                                //获取的数据总条数
                                "dataCount": resData.length,
                                //获取的数据列表
                                "dataList":resData
                            })
                        }).send({
                            "readStatus": data.readStatus || "NOREAD",
                            "messageType": data.messageType || "ALL",
                            "create_time1":data.create_time1 || "946684800000",
                            "create_time2":data.create_time2 || String(Date.now()),
                        });

                    },
                    /**
                     * 数据初始化配置
                     * @param resData
                     * @param $interface
                     */
                    dataInitConf: function (gridListData, $interface) {
                        //往开发作用域中存储列表数据
                        $interface.developScope.gridListData = gridListData;
                    }

                },
                count:count
            }

        }.bind(this)).fail(function(msg){
            console.log(msg)
        }).send({
            "readStatus": "NOREAD",
            "messageType": "ALL",
            "create_time1":"946684800000",
            "create_time2":String(Date.now())
        })
    })
   
})

//查询单个消息详情
model('singleNews',function(){
    var newsId = $_GET['newsId']

    var singleMessage=this.server({
        serverType:'api',
        method:'post',
        url:'singleNewsDetail'   //查询单个消息详情
    });

    this.method('getConf',function(){


        singleMessage.success(function(res){

            //获取方法转译后的数据
            this.$model = res;

        }.bind(this)).fail(function(msg){
            console.log(msg)
        }).send({
            'id':newsId
        })
    })
})

//返回上级按钮
model('goBackButton',function(){
    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            // padding:'50px'
        },
        list:[
            {
                class:'btn btn-teal-outline',//按钮样式
                icon:'iconfont icon-fanhui', //图标
                label:'返回消息列表',//按钮文字
                align:'right',//文字居中
                padding:'5px 19px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        $FRAME.redirect('home/custom/message')
                    }
                }
            }
        ]
    }]
});


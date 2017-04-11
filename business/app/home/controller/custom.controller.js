/**
 * Created by lei .
 */

//首页
controller('index',function () {

    var dashboardLayout = this.model('@custom/index:indexPage');
    dashboardLayout.method('homeListConf');
    this.assign('dashboardLayout',dashboardLayout);console.log('dashboardLayout',dashboardLayout)

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});


//消息
controller('message',function () {

    var gridApi=this.model();

    this.assign('gridApi',gridApi);

    var messageButton = this.model('@custom/message:messageButton');        //消息按钮 删除和已读
    messageButton.method('getMessageBut',gridApi)
    var newsList = this.model('@custom/message:newsList');        //消息列表和未读的列表
    newsList.method('getMessageConf')
    var search = this.model('@custom/message:search');        //查询按钮
    search.method('searchBtn',gridApi)
    //传给指令的参数
    var hiddenHandle={
        isPull:true,
        //点击消息,让ul消息通知显示
        click:function () {
            var ul = document.querySelector('.news-menu-down');

            if(!hiddenHandle.isPull){
                ul.style.webkitTransform="scale(1,1)";
            }else{
                ul.style.webkitTransform="scale(1,0)";
            }
            hiddenHandle.isPull=!hiddenHandle.isPull;
        }
    };


    this.assign('hiddenHandle',hiddenHandle);
    this.assign('messageButton',messageButton);
    this.assign('newsList',newsList);
    this.assign('search',search);


    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});


//消息详情
controller('messageDetail',function(){
    var singleNews = this.model('@custom/message:singleNews');        //查询单个消息详情
    var goBackButton = this.model('@custom/message:goBackButton');     //返回上级按钮
    singleNews.method('getConf')
    var newsList = this.model('@custom/message:newsList');        //消息列表和未读的列表
    newsList.method('getMessageConf')
    //传给指令的参数
    var hiddenHandle={
        isPull:false,
        //点击消息,让ul消息通知显示
        click:function () {
            var ul = document.querySelector('.news-menu-down');

            if(!hiddenHandle.isPull){
                ul.style.webkitTransform="scale(1,1)";
            }else{
                ul.style.webkitTransform="scale(1,0)";
            }
            hiddenHandle.isPull=!hiddenHandle.isPull;
        }
    };

    this.assign('hiddenHandle',hiddenHandle);
    this.assign('singleNews',singleNews);
    this.assign('goBackButton',goBackButton);
    this.assign('newsList',newsList);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});

//详情页面
controller('detail',function () {
    this.title('详情页面');

    var gridApi=this.model();

    this.assign('gridApi',gridApi);

    var formLayout = this.model('@custom/detail:detailBasicInfo');
    formLayout.method('detailConf',$_GET['viewId'],gridApi)
    this.assign('formLayout',formLayout);

    var tabRightNavModel = this.model({
        style:{
            // position:'absolute',
            // right:'50px',
            // top:'50px'
        },
        isGroup:true,
        label:'列表',
        list:[
            {
                label:"基本信息1",
                className:"active",
                events:{
                    mouseover:function () {
                        console.log('啦啦啦');
                    },
                }
            },
            {
                label:"基本信息2",
                className:"",
                events:{

                }
            },
            {
                label:"基本信息3",
                className:"",
                events:{

                }
            }
        ]
    });
    this.assign('tabRightNavModel',tabRightNavModel)
    this.assign('layoutBaseConf',this.model('@layout:base'));
    this.layout('@layout:base','tpl').display();

});


//自定义列表
controller('list',function () {
    var gridApi=this.model();

    this.assign('gridApi',gridApi);

    //清空
    var btnEmpty = this.model('@custom/list:btnEmpty');
    btnEmpty.method('emptyBtn',gridApi)
    this.assign('btnEmpty',btnEmpty);

    //<-------------当前位置组件------------->
    var currentLocation = this.model('@custom/list:currentLocation')
    this.assign('currentLocation',currentLocation)

    // <--------------------------//高级检索组件  advanced-search------------------------------->


    //高级搜索
    var advancedQuery = this.model('@custom/list:advancedQuery');
    advancedQuery.method('gridList',gridApi,$_GET['viewId'])
    this.assign('advancedQuery',advancedQuery);

    //列表组件
    var gridConfModel=this.model('@custom/list:gridConf');

    gridConfModel.method('getConf',$_GET['viewId'],gridApi);
    this.assign('gridConf',gridConfModel);


    this.title('列表页面--['+$_GET['pageName']+']');

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});

//自定新增页面
controller('add',function () {
    var viewId=$_GET['viewId'] !== 'undefined' && $_GET['viewId'] ? $_GET['viewId']:1215,
        addApi=this.model('@custom/add:add'),
        viewStructConf=this.model('@custom/add:viewStructConf');

    this.title('新增页面');

    this.assign('viewStructConf',viewStructConf);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();

    this.assign('submit', function (batchForms, masterForms,viewInfo) {
        return function () {
            var isPass = true,
                formData = {
                    viewId: viewId,
                    columnMap: {},
                    batchColumn: {}
                };

            masterForms.forEach(function (masterForm) {
                var batchData = [];
                if (!masterForm.form.valid()) isPass = false;
                masterForm.form.getData().forEach(function (vals, name) {
                    formData.columnMap[name]=vals;
                });
            })

            //检查数据校验是否通过
            if (!isPass)return;

            batchForms.forEach(function (formInfo) {
                var batchData = [];
                if (!formInfo.form.valid()) isPass = false;
                formInfo.form.getData().forEach(function (vals, name) {
                    typeof vals === "object" ? vals.forEach(function (val, index) {
                            batchData[index] = batchData[index] || {};
                            batchData[index][name] = val;
                        }) : batchData[0] = batchData[0] || {}, batchData[0][name] = vals;
                });
                formData.batchColumn['obj'+formInfo.id] = batchData;
            });

            //检查数据校验是否通过
            if (!isPass)return;

            addApi.method('sendData', formData, function (state) {
                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                    if(state){
                        $message('新增成功','success');
                        $FRAME.redirect('home/custom/list?viewId='+$_GET['viewId']+'&moduleId='+viewInfo.moduleId);
                        return
                    }
                    $message('新增失败','danger');
                })
            });
        }
    });

    //表单数据结构获取 1185 1132
    viewStructConf.method('getConf',viewId,true);
});

//自定编辑页面
controller('edit',function () {
    var viewId=$_GET['viewId'] !== 'undefined' && $_GET['viewId'] ? $_GET['viewId']:1233,
        recordId=$_GET['recordId'] !== 'undefined' && $_GET['recordId'] ? $_GET['recordId']:18,
        updateApi=this.model('@custom/edit:update'),
        viewStructConf=this.model('@custom/edit:viewStructConf');

    this.title('编辑页面');

    this.assign('viewStructConf',viewStructConf);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();

    this.assign('submit', function (batchForms, masterForms,viewInfo) {
        return function () {
            var isPass = true,
                formData = {
                    viewId: viewId,
                    columnMap: {},
                    batchColumn: {}
                };

            masterForms.forEach(function (masterForm) {
                var batchData = [];
                if (!masterForm.form.valid()) isPass = false;
                masterForm.form.getData().forEach(function (vals, name) {
                    formData.columnMap[name]=vals;
                });
            })
            formData.columnMap['obj.ID']=recordId;
            //检查数据校验是否通过
            if (!isPass)return;

            batchForms.forEach(function (formInfo) {
                var batchData = [];
                if (!formInfo.form.valid()) isPass = false;
                formInfo.form.getData().forEach(function (vals, name) {
                    typeof vals === "object" ? vals.forEach(function (val, index) {
                            batchData[index] = batchData[index] || {};
                            batchData[index][name] = val;
                        }) : batchData[0] = batchData[0] || {}, batchData[0][name] = vals;
                });
                formData.batchColumn['obj'+formInfo.id] = batchData;
            });

            //检查数据校验是否通过
            if (!isPass)return;

            updateApi.method('sendData', formData, function (state) {
                $packages('{PLUGINS}/hint/hint-message',function ($message) {
                    if(state){
                        $message('修改成功','success');
                        $FRAME.redirect('home/custom/list?viewId='+$_GET['viewId']+'&moduleId='+viewInfo.moduleId);
                        return
                    }
                    $message('修改失败','danger');
                })
            });
            // console.log(batchForms, masterForms, formData)
        }
    });

    //表单数据结构获取
    viewStructConf.method('getConf',{
        viewId: viewId, recordId: recordId
    },true);
});
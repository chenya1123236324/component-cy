
/**
 * Created by lei on 17-2-16.
 */
define(['listDataExtract'],function (listDataExtract){
    

    return function(res){
        var This = this;
         var index = 0;

        var homeList = {
            dashboardLayoutData:{
                style:{   //自定义样式
                    height:'320px',//【必填】dashboardLayout高度
                    margin:'8px',//【必填】dashboardLayout间距
                },
                list:[]
            }
        };
        res.forEach(function (data,key) {
             index++;
             var viewId = data.viewId,
                 viewType = data.viewType,
                 createTime = data.createTime,
                 titleId = data.titleColId;

            // if(viewType == 'NOTIFY'){               //视图类型：CUSTOMVIEW关联视图、NOTIFY 消息通知
            //
            // }else if(viewType == 'CUSTOMVIEW'){


                //tab配置容器
                var resModel = $FRAME.model(),
                batchModel = $FRAME.model('HOME@custom/index:gridConf');
                batchModel.method('getConf',viewId,createTime,titleId);

                //列表数据
                batchModel.readData(function (batchInfo) {  
                    // listMap.content.scope.listhomepagea = batchInfo.fieldArr;

                    resModel.write({
                        icon:'icon-shuju',         //【必填项】图标
                        iconColor:'#00a79d',       //【非必填项】图标颜色，默认颜色为#505050
                        layout:'50%',              //【必填项】布局百分比
                        order:index,
                        name:data.name,
                        link:'/home/custom/list.html?viewId='+data.viewId,
                        showHead:true,             //【非必填项】是否显示头部，默认显示
                        content:{                  //【必填项】填充内容
                            template: '<list-home-page config="listhomepagea"></list-home-page>',
                            scope: {
                                listhomepagea: batchInfo.fieldArr
                            },
                        },
                        events:{
                            click:function (event) { //【必填项】事件
                                $packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
                                    dialog({
                                        title:'确认删除',
                                        maxmin:true,
                                        content:'<h3>{{title}}</h3>',
                                        scope:{
                                            title:'确认删除?'
                                        },
                                        filter:{},
                                        height:'200px',
                                        width:'400px',
                                        btns:[
                                            {
                                                name:'确认',
                                                trigger:function (eve,interface) {

                                                    var viewDetail = $FRAME.$model(function () {
                                                        //选择模块
                                                        var $moduleListServer = this.server({
                                                            serverType:'api',
                                                            method:'POST',
                                                            url:''
                                                        }).receive(function (data) {

                                                            if (data.state == 0) {
                                                                console.log(data.message);
                                                            } else {

                                                            }
                                                        }.bind(this)).send({

                                                            "viewId": view.id,
                                                            "recordIds":[rowData.ID]
                                                        });
                                                    })
                                                    interface.close();
                                                }

                                            },
                                            {
                                                name:'取消',
                                                theme:"warning", //[ primary , success , info , warning , danger ]
                                                trigger:function (eve,interface) {
                                                    interface.close();
                                                }
                                            }
                                        ]
                                    })
                                })
                            }
                        }
                    })
                })

            // }
            if(resModel) {
                homeList.dashboardLayoutData.list[key] = resModel;
            }

        });
        

        return homeList;
    }
})
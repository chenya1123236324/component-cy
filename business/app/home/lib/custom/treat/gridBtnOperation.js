


/**
 * Created by lei on 17-1-12.
 */
 //此方法是根据列表顶部按钮的类型不同来做不同的事件处理
 define(function(){

 		// var inputIds = document.querySelector("input[name=ids]").val;  //页面中未显示标签作传值用

 		function btnOperation(rowData,showCols,operationConditions,btndata,view,gridApi) {
 			var eventsList ={
	 			// content: '<span $-on:click="events.click">{{operationName}}</span>',
                //由于详情页面会关联多个列表，那么gridApi不能用同一个
	 			content: '<span $-on:click="gridApi|click:[$,events.click]">{{operationName}}</span>',
                scope:{
                    operationName:btndata.operationName                
                },
                filter:{

                },
                events:{
                    click:function (gridApi,click) {
                        return function (e) {
                            click.call(this,e,gridApi);
                        }
                    }
                }
	 		}

 			if (btndata.type == "2"){                 //编辑
 				eventsList.events = function (btndata) {
 					return {
 						click : function (events) {
 							// console.log(rowData)
 							var recordId = rowData.ID;
 							var cp = document.querySelector(".focus").querySelector(".focus span").innerHTML;
 							if (btndata.forwardVid != null) {
	 							var operationDetail = $FRAME.$model(function () {

						            var $moduleListServer = this.server({
						                serverType:'api',
						                method:'POST',
						                url:'viewSearchDetail'       //根据Id查询视图详情
						            }).receive(function (viewDt) {
						            	// console.log(viewDt,"\\\\\\\\\\\\\\\\\\\\")
						            	if (viewDt.state == '0') {
                                           console.log("数据异常！");
                                        } else {
                                        	var view = viewDt.data; console.log(view,'-----------------')
                                        	if (view.viewType == 5) {          //自定义

                                                if (view.viewUrl.indexOf('?') > 0) {
                                                    $FRAME.redirect(view.viewUrl + "&recordId=" + recordId + '&cp=' + cp);
                                                } else {
                                                    $FRAME.redirect(view.viewUrl + "?meViewId=" + btndata.forwardVid + "&recordId=" + recordId + '&cp=' + cp);
                                                }


                                            } else if (view.viewType == 3) {    //修改
                                                // $FRAME.redirect();            /******************/
                                                $FRAME.redirect('home/custom/edit?viewId='+btndata.forwardVid)
                                            } else if (view.viewType == 8) {    //修改【含批量新增明细】
                                                $FRAME.redirect('home/custom/edit?viewId='+btndata.forwardVid);
                                            }
                                        }
						            }.bind(this)).send({
						            	"id":btndata.forwardVid
						            });
	 							})
	 					    }
	 					}
 					}
 				}(btndata)

 			}else if (btndata.type == "3") {              //删除
                eventsList.events = function (btndata) {
                    return {
                        click : function (events) {
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
                                                        url:'viewOperationDelete'
                                                    }).receive(function (data) {

                                                        if (data.state == 0) {
                                                            console.log(data.message);
                                                        } else {
                                                            if (btndata.flushType == "REDIRECT" && btndata.forwardVid != null && btndata.forwardVid != undefined && btndata.forwardVid != "") {
                                                                var $moduleListServer = this.server({
                                                                    serverType:'api',
                                                                    method:'POST',
                                                                    url:'viewSearchDetail'  //根据Id查询视图详情
                                                                }).receive(function (viewDt) {

                                                                    if (viewDt.state == '0') {
                                                                        console.log("数据异常！");
                                                                    } else {
                                                                        var view = viewDt.data;
                                                                        if (view.viewType == 5) {          //自定义
                                                                            $FRAME.redirect(view.viewUrl);
                                                                        } else if (view.viewType == 1) {    //列表
                                                                            console.log('原来你在这！！！！',gridApi)

                                                                            gridApi.update();
                                                                            // $FRAME.redirect('home/custom/list?viewId='+view.id);            /******************/
                                                                        } else if (view.viewType == 2) {    //新增
                                                                            $FRAME.redirect();
                                                                        }
                                                                    }
                                                                }.bind(this)).send({
                                                                    "id":btndata.forwardVid
                                                                });
                                                            } else if (btndata.flushType == "GOBACK") {
                                                                window.history.back();
                                                            } else if (btndata.flushType == "CURRENT") {
                                                                // ME.page.refreshto();
                                                            } else if (btndata.flushType == "FLUSHLIST") {

                                                                gridApi.update();
                                                            }
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
                }(btndata)
            }

	 		return eventsList;
 		}

 	return 	btnOperation;
 })
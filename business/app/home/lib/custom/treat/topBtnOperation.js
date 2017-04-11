

/**
 * Created by lei on 17-1-11.
 */
 //此方法是根据列表顶部按钮的类型不同来做不同的事件处理
 define(function () {

 		// var inputIds = document.querySelector("input[name=ids]").val;  //页面中未显示标签作传值用

 		function btnOperation(operation,gridApi) {

 			var eventsList ={
	 			click:function(event){
					var inputIds = document.querySelector('input[name=ids]').value;
	 				if (operation.type == '0') {            		//提交，以下是提交类型的判断
			 			  var submiturl = "";
                        if (operation.submitType == 0) {            //新增提交
							// submiturl = '这里是新增提交接口'

                        } else if (operation.submitType == 1) {     //修改提交
							// submiturl =  '这里是修改提交接口'

                        } else if (operation.submitType == 2 && operation.submitUrl != null && operation.submitUrl != "") {  //自定义提交
                            submiturl = operation.submitUrl;

                        } else if (operation.submitUrl == null ||operation.submitUrl == undefined || operation.submitUrl == ""){

                        	if(operation.flushType=="REDIRECT"){   //页面跳转
								if (operation.forwardVid != null) {
									var viewDetail = $FRAME.$model(function () {
										//请求接口视图详情
										var $moduleListServer = this.server({
											serverType:'api',
											method:'POST',
											url:'viewSearchDetail'     //根据Id查询视图详情
										}).receive(function (res) {
											// console.log(res,"\\\\\\\\\\\\\\\\\\\\")
											if( res.status == 0 ) {
												console.log("数据异常!")
											} else {

												var view = res.data;

												//判断视图类型
												if (view.viewType == 1) {      //列表

													if(operation.followType=="FOLLOW"){
														$FRAME.redirect('home/custom/list.html?viewId=' + view.id );
													}else{
														if(operation.flushType=="ALL"){
															$FRAME.redirect('home/custom/list.html?viewId=' + view.id);
														}else if(operation.flushType=="CURRENT"){
															$FRAME.refresh()
														}
													}
												} else if (view.viewType == 2) {   //新增
													$FRAME.redirect('home/custom/add?viewId=' + view.id + '&moduleId=' + view.moduleId );
												} else if (view.viewType == 3) {      //编辑
													$FRAME.redirect('home/custom/edit?viewId=' + view.id + '&moduleId=' + view.moduleId );
												} else if (view.viewType == 5) {
													var params = {
														//meViewId: view.id,
														meModuleId: view.moduleId,
														ids: inputIds
													}
													if(view.viewUrl.indexOf('?')>=0){
														$FRAME.redirect(view.viewUrl+'&viewId=' + view.id + '&moduleId=' + view.moduleId );
													}else{
														$FRAME.redirect(view.viewUrl+'?viewId=' + view.id + '&moduleId=' + view.moduleId );
													}
												}
											}
										}.bind(this)).send({
											"id":operation.forwardVid
										});

									});
								}
								
                            }else if(operation.flushType=="GOBACK"){   //返回上一步
								$FRAME.goBack()
                            }else if(operation.flushType=="CURRENT"){   //刷新当前页
								$FRAME.refresh()
                            }else if(operation.flushType=="NO"){   
                                //ME.page.refreshto();
                            }else if(operation.flushType=="FLUSHLIST"){  //刷新当前列表
								$FRAME.refresh()
                            }
                        }
			 		}  else if (operation.type == '1') {      //新增 ( 主要 ：跳转 )
			 			if (operation.forwardVid != null) {
	                        //
	                        var viewDetail = $FRAME.$model(function () {
					            //请求接口视图详情
					            var $moduleListServer = this.server({
					                serverType:'api',
					                method:'POST',
					                url:'viewSearchDetail'     //根据Id查询视图详情
					            }).receive(function (res) {
					                console.log(res,"\\\\\\\\\\\\\\\\\\\\")
					                if( res.status == 0 ) {
					                	console.log("新增页面数据异常!")
					                } else {

					                	var view = res.data;

					                	if (view.viewType == 5)	{    		//viewType == 5 表示‘自定义新增’
					                		var params = {
                                                    ids: inputIds,
                                                    meModuleId: view.moduleId
                                                }
                                            if(view.viewUrl.indexOf('?')>=0){
                                                $FRAME.redirect(view.viewUrl+ "&meModuleId=" + params.meModuleId);
                                            }else{
                                                $FRAME.redirect(view.viewUrl+ "&meModuleId=" + params.meModuleId);
                                            }
					                	} else if (view.viewType == 7) {    //viewType == 7 表示‘批量新增’

											$FRAME.redirect("home/custom/add?viewId="+operation.forwardVid);

					                	} else {

					                		if (operation.followType=="FOLLOW") {
					                			$FRAME.redirect("home/custom/add?viewId="+operation.forwardVid)
					                		}else if(operation.followType=="DIALOG"){
					                			$dialog({
                                                    // title: view.viewName,
                                                    // width:1100,
                                                    // height:400,
                                                    // content:'<form id="form" name="form" enctype="multipart/form-data"><div id="dialog"></div><div id="button"></div></form>',
                                                    // init:function(){
                                                    //     ME.getModel("custom:viewrender/add",operation.forwardVid,1)(function(data){
                                                    //         ME.GUI.runGui({
                                                    //             name: "form-layout-two",
                                                    //             config: data.layoutList[0],
                                                    //             element: document.querySelector('#dialog')
                                                    //         });
                                                    //         ME.GUI.runGui({
                                                    //             name: "btn-group-me",
                                                    //             config: ME.getModel("comm:button/groupForData","custom:common/viewconfig/getViewOperation",operation.forwardVid),
                                                    //             element: document.querySelector('#button')
                                                    //         });
                                                    //     });
                                                    // }
                                                })
					                		}
					                	}	 			                
					                }
					            }.bind(this)).send({
					            	"id":operation.forwardVid
					            });

					        });

	                    }
			 		}  else if (operation.type == '5') {	  //流程提交
						if (operation.forwardVid != null) {
							//
							var viewDetail = $FRAME.$model(function () {
								//请求接口视图详情
								var $moduleListServer = this.server({
									serverType:'api',
									method:'POST',
									url:'viewSearchDetail'     //根据Id查询视图详情
								}).receive(function (res) {
									console.log(res,"\\\\\\\\\\\\\\\\\\\\")
									if( res.status == 0 ) {
										console.log("新增页面数据异常!")
									} else {
										var view = res.data;

										$FRAME.redirect(view.viewUrl.replace(':','/')+ "&viewId="+operation.forwardVid+ "&meModuleId=" + view.moduleId);
									}
								}.bind(this)).send({
									"id":operation.forwardVid
								});

							});

						}
			 		}  else if (operation.type == '9') {      //提交确认
			 				//在新增页面或修改页面顶部已写死
			 		}  else if (operation.type == '10') {      //数据导出
			 				alert("数据导出")
			 		}  else if (operation.type == '7') {	  //批量操作

						if ((operation.submitDataType != null && operation.submitDataType == "ALL") || (operation.entCode == "JX" && (operation.id == 468 || operation.id == 469 || operation.id == 500))) {
							
						}

						if (inputIds == null || inputIds == "" || inputIds.replace(/,/g,'') == "") {
							$packages('{PLUGINS}/hint/hint-message',function ($message) {
								$message('请选择要批量操作的数据！');
							})
						} else {
							if (operation.batchType == 'DELETE') { //如果是批量删除
								$packages('{PLUGINS}/modal/modal-dialog',function (dialog) {
									dialog({
										title:'确认删除',
										maxmin:true,
										content:'<h3>{{title}}</h3>',
										scope:{
											title:'确认对选中的'+inputIds.replace(/^,/,'').split(",").length+'条数据进行批量删除？'
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
															url:'viewOperationDelete'      //删除真实数据，custom/C12003
														}).receive(function (data) {

															if (data.state == 0) {
																$packages('{PLUGINS}/hint/hint-message',function ($message) {
																	$message(data.message);
																})
															} else {
																if(operation.flushType=="REDIRECT"){   //页面跳转
																	if (operation.forwardVid != null) {
																		var $moduleListServer = this.server({
																			serverType:'api',
																			method:'POST',
																			url:'viewSearchDetail'  //根据Id查询视图详情 custom/C11002
																		}).receive(function (viewDt) {

																			if (viewDt.state == '0') {
																				$packages('{PLUGINS}/hint/hint-message',function ($message) {
																					$message("数据异常！");
																				})
																			} else {
																				var view = viewDt.data;
																				if (view.viewType == 1) {				//列表
																					$FRAME.redirect("home/custom/list?viewId="+view.id + '&moduleId' + view.moduleId);
																				} else if (view.viewType == 2) {   //新增
																					ME.page.redirect('custom:viewrender/add?meViewId=' + view.id + '&meModuleId=' + view.moduleId );

																				} else if (view.viewType == 3) {      //编辑
																					ME.page.redirect('custom:viewrender/edit?meViewId=' + view.id + '&meModuleId=' + view.moduleId );

																				} else if (view.viewType == 5) { 	  //自定义
																					var params = {
																						ids: inputIds,
																						meModuleId: view.moduleId
																					}
																					if(view.viewUrl.indexOf('?')>=0){
																						ME.page.redirect(view.viewUrl+'&'+ME.plugins.$.param(params),params);
																					}else{
																						ME.page.redirect(view.viewUrl+'?'+ME.plugins.$.param(params),params);
																					}
																				}
																			}
																		}.bind(this)).send({
																			"id":operation.forwardVid
																		});
																	}
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
							}else{

							}
						}
					}
	 			}
	 		}
 			
	 		return eventsList;
 		}
 		
 	return 	btnOperation;
 })
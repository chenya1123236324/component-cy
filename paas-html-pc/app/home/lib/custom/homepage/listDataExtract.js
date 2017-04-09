/**
 *Created by lei on 17-2-20.
 *　　┏┓　　　┏┓+ +
 *　┏┛┻━━━┛┻┓ + +
 *　┃　　　　　　　┃ 　
 *　┃　　　━　　　┃ ++ + + +
 * ████━████ ┃+
 *　┃　　　　　　　┃ +
 *　┃　　　┻　　　┃
 *　┃　　　　　　　┃ + +
 *　┗━┓　　　┏━┛
 *　　　┃　　　┃　　　　　　　　　　　
 *　　　┃　　　┃ + + + +
 *　　　┃　　　┃
 *　　　┃　　　┃ +  神兽保佑
 *　　　┃　　　┃    代码无bug　　
 *　　　┃　　　┃　　+　　　　　　　　　
 *　　　┃　 　　┗━━━┓ + +
 *　　　┃ 　　　　　　　┣┓
 *　　　┃ 　　　　　　　┏┛
 *　　　┗┓┓┏━┳┓┏┛ + + + +
 *　　　　┃┫┫　┃┫┫
 *　　　　┗┻┛　┗┻┛+ + + +
 */

//根据首页中的titleColId到C12002中提取数据
define(['../treat/timeToString'],function (timeToString) {
    //参数:
    // 1、callback    回调函数
    return function (viewId,fieldName,gridApiConf,createTime,callback) {

        var btnSystem = $FRAME.$model(function () {


            var $idServer = this.server({
                serverType:'api',
                method:'POST',
                url:'gridStructure'
            }).receive(function (data) {

                var colList = gridApiConf.columnList;                  //所有字段列表
                var showCols = gridApiConf.showColumnList;                 //显示字段列表
                var btnList = gridApiConf.operationList;                  //按钮列表
                var relatedModule = gridApiConf.moduleRelatedMap;            //外键关系信息
                var operationConditions = gridApiConf.operationRuleList;      //操作条件
                var specialShowdata = gridApiConf.viewSpcShowList             //特殊显示条件
                var orderData = gridApiConf.sidx;                //:列表排序信息


                var configList = [];

                if(data && data.status === 200){
                    var dataArr = data.data.record;

                    dataArr.forEach(function(dataInfo){
                        if(!dataInfo.CUSTOMER_CREATE_TIME){
                            dataInfo.CUSTOMER_CREATE_TIME = createTime;
                        }
                        var newDate = new Date();
                        newDate.setTime(dataInfo.CUSTOMER_CREATE_TIME);
                        var data = newDate.format('yyyy-MM-dd'),
                            recordId = dataInfo.ID;


                        var listField = {
                            title:dataInfo[fieldName],
                            time:data,
                            events:{
                                click:function (event) { //【必填项】事件
                                    // console.log(This);
                                }
                            }
                        }

                        // 行点击显示详情
                        if (operationConditions != null && operationConditions != "") {
                            listField.events.click = function (){

                                event.stopPropagation();
                                // console.log(data, rowData, index)
                                var recordId = rowData.ID;
                                var cp = 1;
                                var strs = "";         //条件的字段名
                                var rowBtnForwardId_0 = "", count = 0;  //跳转页面的ID值
                                for (var k in operationConditions) {
                                    var operationConditionsChosen = operationConditions[k];
                                    var affectOperationId = operationConditionsChosen.affectOperationId;
                                    var meOperationRuleConditionList = operationConditionsChosen.meOperationRuleConditionList;
                                    var ruleCondFlag = false;               //用于判断当前条件是否有满足条件
                                    for(var key in meOperationRuleConditionList){
                                        var meOperationRuleCondition = meOperationRuleConditionList[key];
                                        var sourceColumnId = meOperationRuleCondition.sourceColumnId;
                                        var conditionType = meOperationRuleCondition.conditionType;
                                        var conditionValue = meOperationRuleCondition.conditionValue;
                                        strs="";
                                        //循环字段 用于取条件的字段名
                                        for (var colkey in colList) {
                                            var coldata = colList[colkey];
                                            if (sourceColumnId == coldata.id) {
                                                strs = coldata.moduleCode.toUpperCase() + "_" + coldata.phyColumnName;
                                                break;
                                            }
                                        }
                                        for (var btnkey in btnList) {
                                            var btndata = btnList[btnkey];
                                            if (btndata.type == '4' && affectOperationId == btndata.id) {        //判断当前操作是否属于当前影响数据的条件
                                                if (!showResult(rowData[strs], conditionValue, conditionType)) {    //不满足条件时执行
                                                    rowBtnForwardId_0=btndata.forwardVid;                        //定义跳转页面的id值
                                                    count = count+1;
                                                }else{
                                                    ruleCondFlag = true;
                                                    count = 0;
                                                    break;
                                                }
                                            }
                                        }
                                        if (ruleCondFlag) {
                                            rowBtnForwardId_0 = "";
                                            break;
                                        }
                                    }
                                    if (!ruleCondFlag&&count>0) {
                                        break;
                                    }
                                }
                                if (rowBtnForwardId_0==null||rowBtnForwardId_0=="") {
                                    for (var btnkey in btnList) {
                                        var btndata = btnList[btnkey];
                                        if (btndata.type == '4') {    //判断当前操作是否属于详情按钮
                                            var iflag = false;
                                            for (var k in operationConditions) {
                                                var affectOperationId = operationConditionsChosen.affectOperationId;
                                                if(affectOperationId==btndata.id){
                                                    iflag = true;
                                                    break;
                                                }
                                            }
                                            if(!iflag){
                                                rowBtnForwardId_0 = btndata.forwardVid;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (rowBtnForwardId_0 !=null || rowBtnForwardId_0 != "") {
                                    var viewDetail = $FRAME.$model(function () {
                                        var $moduleListServer = this.server({
                                            serverType:'api',
                                            method:'POST',
                                            url:'viewSearchDetail'
                                        }).receive(function (viewDt) {
                                            if (viewDt.state == 0) {
                                                console.log("数据异常！");
                                            } else {
                                                var view = viewDt.data;
                                                if (view.viewType == 5) {               //自定义
                                                    if (view.viewUrl.indexOf('?') > 0) {
                                                        $FRAME.redirect(view.viewUrl + "&recordId=" + recordId + '&cp=' + cp);
                                                    } else {
                                                        $FRAME.redirect(view.viewUrl + "?meViewId=" + rowBtnForwardId_0 + "&recordId=" + recordId + '&cp=' + cp);
                                                    }
                                                } else if (view.viewType == 4) {        //详情
                                                    $FRAME.redirect('home/custom/detail?viewId=' + rowBtnForwardId_0 + "&recordId=" + recordId + '&cp=' + cp);
                                                }
                                            }
                                        }.bind(this)).send({
                                            "id":rowBtnForwardId_0
                                        });
                                    })
                                }
                            }
                        } else {
                            var rowBtnForwardId_0 = "", count = 0;
                            for (var key in btnList) {
                                var btndata = btnList[key];
                                if (btndata.type == '4') {
                                    rowBtnForwardId_0 = btndata.forwardVid;
                                    break;
                                }
                            }
                            listField.events.click = function () {
                                event.stopPropagation();
                                // console.log(data, index,rowData)
                                if (rowBtnForwardId_0 == null || rowBtnForwardId_0 == undefined||rowBtnForwardId_0=="") {
                                } else {
                                    var recordId = dataInfo.ID;
                                    var cp = 1;
                                    var viewDetail = $FRAME.$model(function () {
                                        var $moduleListServer = this.server({
                                            serverType:'api',
                                            method:'POST',
                                            url:'viewSearchDetail'
                                        }).receive(function (viewDt) {
                                            if (viewDt.state == 0) {
                                                console.log("数据异常！");
                                            } else {
                                                var view = viewDt.data;
                                                if (view.viewType == 5) {               //自定义
                                                    if (view.viewUrl.indexOf('?') > 0) {
                                                        $FRAME.redirect(view.viewUrl + "&recordId=" + recordId + '&cp=' + cp);
                                                    } else {
                                                        $FRAME.redirect(view.viewUrl + "?meViewId=" + rowBtnForwardId_0 + "&recordId=" + recordId + '&cp=' + cp);
                                                    }
                                                } else if (view.viewType == 4) {        //详情
                                                    $FRAME.redirect('home/custom/detail?viewId=' + rowBtnForwardId_0 + "&recordId=" + recordId + '&cp=' + cp);
                                                }
                                            }
                                        }.bind(this)).send({
                                            "id":rowBtnForwardId_0
                                        });
                                    })
                                }


                                //ME.page.redirect('custom:viewrender/detail?flag=1&meViewId=' + rowBtnForwardId_0 + '&recordId=' + data.ID + '&cp=' + cp);
                            };
                        }


                        configList.push(listField)
                    })
                }
                configList = configList.slice(0,5);

                typeof callback === 'function' && callback(configList);
            }.bind(this)).send({
                "viewId":viewId,
                "currentPage":1,
                "pageSize":20,
                "sidx":"id",
                "order":"desc"
            });
        });
        return btnSystem
    }
});


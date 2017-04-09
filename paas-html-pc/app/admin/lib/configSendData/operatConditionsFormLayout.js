/**
 * Created by 贝贝 on 2016/12/26.
 */
//视图条件formLayout数据发送前处理
define(function () {
    return function sendConf(ID,val,formData) {

        var sendData = {
            // ID:val,//id或视图id
            "ruleName": formData.ruleName,//条件名称
            "sort": 1,//执行顺序 (----操作条件的formLayout页面没有该字段----)
            "ruleType": formData.ruleType,//条件类型(取value)
            "affectOperationId": parseInt(formData.affectOperations),//影响操作集合(id)
            // "isLinkage": formData.isLinkage,//是否级联
            "operationRuleCondList": []
        };
        if(ID=="viewId") sendData.viewId = parseInt(val);
        if(ID=="id") sendData.id = parseInt(val);

        if($FRAME.lib.$type.getType(formData.conditionType) === 'array'){
            //条件
            formData.conditionType.forEach(function (conditionType) {
                sendData.operationRuleCondList.push({
                    "conditionType":conditionType
                })
            });
            //条件值
            formData.conditionValue.forEach(function (conditionValue,ii) {
                sendData.operationRuleCondList[ii].conditionValue = conditionValue;
            });
            //字段
            formData.sourceColumnIds.forEach(function (sourceColumnId,index) {
                // console.log('lalal',sourceColumnId,index);
                sendData.operationRuleCondList[index].sourceColumnId = parseInt(sourceColumnId);
            });
        }else{
            sendData.operationRuleCondList.push({
                "sourceColumnId":formData.sourceColumnIds,
                "conditionType":formData.conditionType,
                "conditionValue":formData.conditionValue
            })
        }

        return sendData;
    }
});
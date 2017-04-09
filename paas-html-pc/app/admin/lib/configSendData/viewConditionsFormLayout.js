/**
 * Created by 贝贝 on 2016/12/26.
 */
//视图条件formLayout数据发送前处理
define(function () {
    /*参数:
    *   1.字符串: 如果是新增则传"viewId" , 如果是修改传"id"
    *   2.id值: 如果是新增则传来的是视图id,如果是修改则传视图条件的id
    *   3.表单数据*/
    return function sendConf(ID,val,formData) {
        // console.log('formData',formData);
        //影响字段,多选处理
        if($FRAME.lib.$type.getType(formData.affectColumns)==='array'){
            formData.affectColumns = formData.affectColumns.join(',');
        }
        var sendData = {
            // ID:val,//id或视图id
            "ruleName": formData.ruleName,//条件名称
            "sort": parseInt(formData.sort),//执行顺序
            "ruleType": formData.ruleType,//条件类型(取value)
            "affectColumns": formData.affectColumns,//影响字段集合(id)
            "isLinkage": parseInt(formData.isLinkage),//是否级联
            "viewRuleConditions": []
        };
        if(ID=="viewId") sendData.viewId = val;
        if(ID=="id") sendData.id = val;

        //如果条件类型是字段筛选
        if(formData.ruleType==='columnFilter'){
            if($FRAME.lib.$type.getType(formData.customVal) === "array"){

                formData.customVal.forEach(function (customVal) {
                    sendData.viewRuleConditions.push({
                        "customVal":customVal
                    })
                });
                formData.conditionType.forEach(function (conditionType,index) {
                    sendData.viewRuleConditions[index].conditionType = parseInt(conditionType);
                });
                formData.conditionValue.forEach(function (conditionValue,index) {
                    sendData.viewRuleConditions[index].conditionValue = conditionValue;
                });
            }else{

                sendData.viewRuleConditions.push({
                    "customVal":parseInt(formData.customVal),
                    "conditionType":parseInt(formData.conditionType),
                    "conditionValue":formData.conditionValue
                })
            }
        }else{
            //条件类型非字段筛选
            if($FRAME.lib.$type.getType(formData.sourceColumnId) === "array"){

                formData.sourceColumnId.forEach(function (sourceColumnId) {
                    sendData.viewRuleConditions.push({
                        "sourceColumnId":sourceColumnId
                    })
                });
                formData.conditionType.forEach(function (conditionType,index) {
                    sendData.viewRuleConditions[index].conditionType = parseInt(conditionType);
                });
                formData.conditionValue.forEach(function (conditionValue,index) {
                    sendData.viewRuleConditions[index].conditionValue = conditionValue;
                });
            }else{

                sendData.viewRuleConditions.push({
                    "sourceColumnId":parseInt(formData.sourceColumnId),
                    "conditionType":parseInt(formData.conditionType),
                    "conditionValue":formData.conditionValue
                })
            }
        }

        // console.log('sendData',sendData);
        return sendData;
    }
});

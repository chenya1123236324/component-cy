/**
 * Created by chenya on 2017/1/3.
 */
//字段表单验证信息
fieldValid({
    columnName: {
        require: {
            value: true,
            message: '字段名称必填'
        },
        minlen: {
            value: 1,
            message: '字段名称必填'
        },
        maxlen:20
    },
    columnCode: {
        require: {
            value: true,
            message: '字段编码必填'
        },
        //asyn:{
        //    value:function (value) {
        //        return {
        //            handle:function (callback) {
        //                var uniqueModel = $FRAME.model('ADMIN@uniqueCheckout/commApi:columnCodeUnique');
        //                uniqueModel.method('columnCodeUniqueValid',{
        //                    "columnCode":value,
        //                    "moduleId":null
        //                },function (state) {
        //                    callback(state);
        //                });
        //            }
        //        }
        //    },
        //    message:'字段编码已存在'
        //},
        minlen: {
            value: 1,
            message: '字段编码必填'
        },
        maxlen:15
    },
    maxLen: {
        require: {
            value: true,
            message: '可输入最大长度必填'
        },
        regExp:{
            value:'^\\d+$',
            message:'只能输入数字'
        },
        minlen: {
            value: 1,
            message: '可输入最大长度必填'
        },
        maxlen:11
    },
    minLen: {
        require: {
            value: true,
            message: '可输入最小长度必填'
        },
        regExp:{
            value:'^\\d+$',
            message:'只能输入数字'
        },
        minlen: {
            value: 1,
            message: '可输入最小长度必填'
        },
        maxlen:11
    },
    viewId:{
        require: {
            value: true,
            message: '选择视图必填'
        },
        minlen: {
            value: 1,
            message: '选择视图必填'
        },
    },
    showDic:{
        require: {
            value: true,
            message: '点击选择字典必填'
        }
    },
    ruleCode:{
        require: {
            value: true,
            message: '编码格式必填'
        },
        minlen: {
            value: 1,
            message: '编码格式必填'
        },
    },

})
















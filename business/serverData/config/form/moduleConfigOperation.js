/**
 * Created by chenya on 2016/12/30.
 */
//模块配置管理-操作验证信息
moduleConfigOperation({
    operationName: {
        require: {
            value: true,
            message: '操作名称必填'
        },
        minlen: {
            value: 1,
            message: '操作名称必填'
        },
        maxlen:15
    },
    sort: {
        require: {
            value: true,
            message: '排序必填'
        },
        minlen: {
            value: 1,
            message: '排序必填'
        },
        maxlen:4
    },
    forwardVid:{
        require: {
            value: true,
            message: '目标页面必填'
        },
        minlen: {
            value: 1,
            message: '目标页面必填'
        },
    },
    batchUpdateViewId:{
        require: {
            value: true,
            message: '批量操作视图必填'
        },
        minlen: {
            value: 1,
            message: '批量操作视图必填'
        },
    },
    submitUrl:{
        require: {
            value: true,
            message: '提交地址必填'
        }
    },
    minlen: {
        value: 1,
        message: '提交地址必填'
    },
    regExp: {
        value: '^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+',
        message: '提交地址格式不正确'
    }

})























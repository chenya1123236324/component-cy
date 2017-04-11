/**
 * Created by chenya on 2016/12/27.
 */
//模块配置管理-视图验证信息
moduleConfigView({
    viewName: {
        require: {
            value: true,
            message: '视图名称必填'
        },
        minlen: {
            value: 1,
            message: '视图名称必填'
        },
        maxlen:15
    },
    viewType: {
        require: {
            value: true,
            message: '视图类型必填'
        }
    },
    viewUrl: {
        regExp: {
            value: '^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+',
            message: '自定义URL格式不正确'
        }
    },
})

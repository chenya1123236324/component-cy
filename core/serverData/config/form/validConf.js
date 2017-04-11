validConf({
    viewName: {
        require: {
            value: true,
            message: '视图名称必填'
        },
        minlen: {
            value: 1,
            message: '视图名称必填'
        },
        maxlen: 50
    },
    viewType: {
        require: {
            value: true,
            message: '视图类型必填'
        },
        minlen: {
            value: 3,
            message: '视图类型最短{{value}}字符'
        },
        regExp: {
            value: '^\\w+$',
            message: '只能输入数字字母'
        }
    }
})
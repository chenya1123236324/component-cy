/**
 * Created by xiyuan on 16-12-7.
 */
validConf({
    viewName: {
        require: {
            value: true,
            message: '视图名称必填'
        },
        minlen: {
            value: 2,
            message: '视图名称最少{{value}}字符'
        },
        maxlen: 50
    },
    viewType:{
        require:{
            value:true,
            message:'视图类型必填'
        },
        minlen:{
            value:3,
            message:'视图类型最短{{value}}字符'
        },
        regExp:{
            value:'^\\w+$',
            message:'只能输入数字字母'
        }
    }
})
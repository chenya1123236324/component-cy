/**
 * Created by chenya on 2016/12/14.
 */

//首页标签表单验证信息
homeMarkValid({
    name: {
        require: {
            value:true,
            message: '标签名称必填'
        },
        maxlen: 20,
        minlen: {
        value: 1,
        message: '标签名称必填'
        },
    },
})

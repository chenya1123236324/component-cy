/**
 * Created by chenya on 2017/1/13.
 */
modifyPassword({
    oldPwd: {
        require: {
            value: true,
            message: '旧密码必填'
        },
        maxlen: 15,
        minlen: {
            value: 1,
            message: '旧密码必填'
        },
        regExp:{
            value:'^\\w{6,}$',
            message:'旧密码格式只能是数字或者字母或者下划线且至少为6位'
        },
    },
    newPwd: {
        require: {
            value: true,
            message: '新密码必填'
        },
        maxlen: 15,
        minlen: {
            value: 1,
            message: '新密码必填'
        },
        regExp:{
            value:'^\\w{6,}$',
            message:'新密码格式只能是数字或者字母或者下划线且至少为6位'
        },
    },
    confirmPassword: {
        require: {
            value: true,
            message: '确认密码必填'
        },
        maxlen: 15,
        minlen: {
            value: 1,
            message: '确认密码必填'
        },
        regExp:{
            value:'^\\w{6,}$',
            message:'确认密码格式只能是数字或者字母或者下划线且至少为6位'
        },
    },
    isConfirmPassword: {
    require: {
        value: true,
        message: '两次输入密码不一致'
    },
        minlen: {
            value: 1,
            message: '两次输入密码不一致'
        },
},
})
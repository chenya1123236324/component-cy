/**
 * Created by chenya on 2017/2/9.
 */

enterpriseInformation({
    entName: {
        require: {
            value: true,
            message: '企业名称必填'
        },
        maxlen: 30,
        minlen: {
            value: 1,
            message: '企业名称必填'
        },
    },

    entAccount: {//企业账号
        regExp: {
            value: '^\\w{3,}$',
            message: '企业账号格式不正确'
        }
    },

    email: { //邮箱
        regExp: {
            value: '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
            message: '邮箱格式不正确'
        }
    },

    emailPwd: {//企业邮箱密码
        regExp: {
            value: '^\\w+$',
            message: '企业邮箱密码格式不正确'
        }
    },

    fax: {//传真
        regExp: {
            value: '[0-9-()（）]{9}$',
            message: '传真格式不正确'
        },
        maxlen: 12
    },

    mobile: {//手机
        regExp: {
            value: '0?(13|14|15|18)[0-9]{9}$',
            message: '手机号格式不正确'
        }
    },
    telephone: {//固定电话
        regExp: {
            value: '([0-9]{3,4}-)?[0-9]{7,8}$',
            message: '固定电话格式不正确'
        },
        maxlen: 12
    },
    extCode: { //分机号
        regExp: {
            value: '[1-9]\d*$',
            message: '分机号格式不正确'
        }
    },
    website: { //企业站点
        regExp: {
            value: '^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+',
            message: '企业站点格式不正确'
        }
    },
})

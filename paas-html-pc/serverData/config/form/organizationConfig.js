/**
 * Created by chenya on 2016/12/19.
 */
organizationValid({
    realName1: {
        require: {
            value: true,
            message: '真实姓名必填'
        },
        minlen: {
            value: 1,
            message: '真实姓名必填'
        },
    },
    realName: {
        require: {
            value: true,
            message: '真实姓名必填'
        },
        minlen: {
            value: 1,
            message: '真实姓名必填'
        },
    },
    accountId: {
        require: {
            value: true,
            message: '用户账号必填'
        },
        regExp:{
            value:'^\\w{5,}$',
            message:'用户账号格式不正确'
        },
        maxlen: 18,
        asyn:{
            value:function (value) {
                return {
                    handle:function (callback) {
                        var uniqueModel = $FRAME.model('ADMIN@uniqueCheckout/commApi:accountIdUnique');
                        uniqueModel.method('accountIdUniqueValid',{
                            "accountId":value,
                            "id":null
                        },function (state) {
                            callback(state);
                        });
                    }
                }
            },
            message:'用户账号已存在'
        }
    },
    accountPwd: {
        require: {
            value: true,
            message: '用户密码必填'
        }
    },
    sex: {
        require: {
            value: true,
            message: '性别必填'
        }
    },
    roleIds: {
        require: {
            value: true,
            message: '角色必填'
        }
    },
    organizationName: {
        require: {
            value: true,
            message: '组织名称必填'
        }
    },
    orgName: {
        require: {
            value: true,
            message: '组织名称必填'
        },
        minlen: {
            value: 1,
            message: '组织名称必填'
        },
        maxlen:25
    },

    mobile: {//手机
        regExp:{
            value: '0?(13|14|15|18)[0-9]{9}$',
            message:'手机号格式不正确'
        }
    },
    telephone: {//固定电话
        regExp:{
            value: '([0-9]{3,4}-)?[0-9]{7,8}$',
            message:'固定电话格式不正确'
        },
        maxlen: 12
    },
    extCode: { //分机号
        regExp:{
            value:'[1-9]\d*$',
            message:'分机号格式不正确'
        },
        maxlen: 5
    },
    email: { //邮箱
        regExp:{
            value:'^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
            message:'邮箱格式不正确'
        }
    },
    qqId: { //QQ
        regExp:{
            value:'^[1-9][0-9]{4,9}$',
            message:'QQ格式不正确'
        },
        maxlen: 12
    },
    wechatId: { //微信
        regExp:{
            value:'^\\w{5,}$',
            message:'微信格式不正确'
        },
        maxlen: 18
    },
    weiboId: { //微博
        regExp:{
            value:'[A-Za-z0-9_\-\u4e00-\u9fa5]+$',
            message:'微博格式不正确'
        },
        maxlen: 18
    },
    superiorLeader: {
        require: {
            value: true,
            message: '上级领导必填'
        },
        minlen: {
            value: 1,
            message: '上级领导必填'
        },
    },
    orgCode: {
        require: {
            value: true,
            message: '组织名称必填'
        },
        minlen: {
            value: 1,
            message: '组织名称必填'
        },
    },
})
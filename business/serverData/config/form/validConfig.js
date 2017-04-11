
//模块新增的表单验证信息
moduleValid({
    //模块名称
    moduleName: {
        require: {
            value: true,
            message: '模块名称必填'
        },
        minlen: {
            value: 2,
            message: '模块名称最少{{value}}字符'
        },
        maxlen: 50
    },
    //模块编码
    moduleCode:{
        require:{
            value:true,
            message:'模块编码必填'
        },
        minlen:{
            value:1,
            message:'模块编码最短{{value}}字符'
        },
        maxlen:9,
        regExp:{
            value:'^[a-zA-Z][a-zA-Z0-9_]{0,8}$',
            message:'模块编码由字母、数字、下划线组成,且只能以字母开头'
        },
        asyn:{
            value:function (value) {
                return {
                    handle:function (callback) {

                        var uniqueModel = $FRAME.model('ADMIN@uniqueCheckout/commApi:moduleCodeUnique');
                        uniqueModel.method('valid',{
                            "moduleCode":value
                        },function (state) {
                            callback(state);
                        })
                    }
                }
            },
            message:'编码已存在'
        }
    },
    //模块配置方式
    validConf:{
        require:{
            value:true,
            message:'请选择模块配置方式'
        }
    },
    //目标字段下拉框
    target:{
        require: {
            value: true,
            message: '目标字段必填'
        },
        minlen: {
            value: 1,
            message: '目标字段最少{{value}}字符'
        },
        maxlen: 50
    },
    //公式内容
    content:{
        require: {
            value: true,
            message: '公式内容必填'
        },
        minlen: {
            value: 1,
            message: '公式内容最少{{value}}字符'
        },
        maxlen: 50
    },
    //字典名称
    dictName:{
        require: {
            value: true,
            message: '字典名称必填'
        },
        minlen: {
            value: 1,
            message: '字典名称最少{{value}}字符'
        },
        maxlen: 50
    },
    //字典编码
    dictCode:{
        require: {
            value: true,
            message: '字典编码必填'
        },
        minlen: {
            value: 1,
            message: '字典编码最少{{value}}字符'
        },
        maxlen: 20,
        /*regExp:{
            value:'^[a-zA-Z][a-zA-Z0-9_]{0,20}$',
            message:'字典编码由字母、数字、下划线组成,且只能以字母开头'
        },*/
        asyn:{
            value:function (value) {
                return {
                    handle:function (callback) {

                        var uniqueModel = $FRAME.model('ADMIN@uniqueCheckout/commApi:dictCodeUnique');
                        uniqueModel.method('valid',{
                            "dict_code":value
                        },function (state) {
                            callback(state);
                        })
                    }
                }
            },
            message:'编码已存在'
        }

    },
    //条件名称
    ruleName:{
        require: {
            value: true,
            message: '条件名称必填'
        },
        minlen: {
            value: 1,
            message: '条件名称最少{{value}}字符'
        },
        maxlen: 50
    },
    //条件类型
    ruleType:{
        require: {
            value: true,
            message: '条件类型必填'
        },
        minlen: {
            value: 1,
            message: '条件类型最少{{value}}字符'
        },
        maxlen: 50
    },
    //权限名称
    permissionName:{
        require: {
            value: true,
            message: '权限名称必填'
        },
        minlen: {
            value: 1,
            message: '权限名称最少{{value}}字符'
        },
        maxlen: 50
    },
    //公告标题
    notifyTitle:{
        require: {
            value: true,
            message: '标题名称必填'
        },
        minlen: {
            value: 1,
            message: '标题名称最少{{value}}字符'
        },
        maxlen: 50
    },
    //消息类别
    notifyType:{
        require: {
            value: true,
            message: '消息类别必填'
        },
        minlen: {
            value: 1,
            message: '消息类别最少{{value}}字符'
        },
        maxlen: 50
    },
    //接收类别
    notifyRecevType:{
        require: {
            value: true,
            message: '接收类别必填'
        },
        minlen: {
            value: 1,
            message: '接收类别最少{{value}}字符'
        },
        maxlen: 50
    },
    //公告内容
    notifyContent:{
        //消息类别
        require: {
            value: true,
            message: '消息内容必填'
        },
        minlen: {
            value: 1,
            message: '消息内容最少{{value}}字符'
        },
        maxlen: 50
    },
    //角色名称
    roleName:{
        require: {
            value: true,
            message: '角色名称必填'
        },
        minlen: {
            value: 1,
            message: '角色名称最少{{value}}字符'
        },
        maxlen: 50
    },
    //角色
    role:{
        require: {
            value: true,
            message: '角色必填'
        },
        minlen: {
            value: 1,
            message: '角色最少{{value}}字符'
        },
        maxlen: 50
    },
    //授权用户
    authUsers:{
        require: {
            value: true,
            message: '授权用户必填'
        },
        minlen: {
            value: 1,
            message: '授权用户最少{{value}}字符'
        },
        maxlen: 50
    },
    //消息模板名称
    templateName: {
        require: {
            value: true,
            message: '模板名称必填'
        },
        minlen: {
            value: 2,
            message: '模板名称最少{{value}}字符'
        },
        maxlen: 50
    },
    //消息标题
    messageTitle: {
        require: {
            value: true,
            message: '消息标题必填'
        },
        minlen: {
            value: 2,
            message: '消息标题最少{{value}}字符'
        },
        maxlen: 50
    },
    //发送人
    msgSender: {
        require: {
            value: true,
            message: '发送人必填'
        },
        minlen: {
            value: 2,
            message: '发送人最少{{value}}字符'
        },
        maxlen: 50
    },
    //消息类型
    msgType: {
        require: {
            value: true,
            message: '消息类型必填'
        },
        minlen: {
            value: 2,
            message: '消息类型最少{{value}}字符'
        },
        maxlen: 50
    },
    //接收类型
    msgRecevType: {
        require: {
            value: true,
            message: '接收类型必填'
        },
        minlen: {
            value: 2,
            message: '接收类型最少{{value}}字符'
        },
        maxlen: 50
    },
    //消息内容
    messageContent: {
        require: {
            value: true,
            message: '消息内容必填'
        },
        minlen: {
            value: 2,
            message: '消息内容最少{{value}}字符'
        },
        maxlen: 50
    },





});
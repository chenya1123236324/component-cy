

//个人信息列表
model('personalInformation',['$:@lib/publicData/getRoleDetailsByID'], function (getRoleDetailsByID) {
    //var id = $_GET['id'];  //从URL中获取id
    var id = 14; //TODO:后面登录页面中做好后，需要从URL中获取
    var This = this;
    var personalInformationServer = this.server({
        serverType: 'api',//如果是访问接口,这里是api,其他的则是http
        method: 'POST',
        url: 'getOrganization'
    });
    personalInformationServer.receive(function (res, xhr) {
        var userDesc = (res.data.userDesc == "null") ? "" : res.data.userDesc;
        console.log(res, 666);
        //数据校验
        var validConfServer = This.server({
            serverType: 'jsonp',
            method: 'organizationValid',
            url: './serverData/config/form/organizationConfig.js'
        });
        //根据角色Id获取角色详情
        getRoleDetailsByID(res.data.roleIds ,function(data){
            validConfServer.receive(function (resValid) {
                This.$model = {
                    scope: {},
                    filter: {},
                    list: [
                        {
                            title: '真实姓名',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="hidden" name="id" $-bind:value="id"><input type="text" name="realName" $-bind:value="name" $-valid="realName" >',
                                scope: {
                                    id: id, //从session中获取到的id
                                    realName: resValid.realName,//表单验证
                                    name: res.data.realName || "",  //从后台获取
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '用户账号',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="accountId" $-bind:value="account" disabled $-valid="accountId">',
                                scope: {
                                    //accountId: resValid.accountId,//表单验证
                                    account: res.data.accountId || "",  //从后台获取
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '性别',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="radio" name="sex" value="1" $-checked="sex == \'1\'">男<input type="radio" name="sex" value="0" $-checked="sex == \'0\'" style="margin-left: 15px">女',
                                scope: {
                                    sex: res.data.sex,  //从后台获取
                                }
                            }
                        },
                        {
                            title: '手机号',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="mobile" $-bind:value="mobile" $-valid="mobileNumber" />',
                                scope: {
                                    mobileNumber: resValid.mobile,//表单验证
                                    mobile: res.data.mobile || "",  //从后台获取
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '固定电话',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="telephone" $-bind:value="telephone" $-valid="telephoneNumber"/>',
                                scope: {
                                    telephoneNumber: resValid.telephone,//表单验证
                                    telephone: res.data.telephone || "",  //从后台获取
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '分机号',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="extCode" $-bind:value="extCode" $-valid="extCodeNum" />',
                                scope: {
                                    extCodeNum: resValid.extCode,//表单验证
                                    extCode: res.data.extCode || "",
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '地址',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="address" $-bind:value="address"  />',
                                scope: {
                                    address: res.data.address || "",
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '邮箱',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="email" $-bind:value="email" $-valid="emailValid" />',
                                scope: {
                                    emailValid: resValid.email,//表单验证
                                    email: res.data.email || "",
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: 'QQ',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="qqId" $-bind:value="qqId" $-valid="qq" />',
                                scope: {
                                    qq: resValid.qqId,//表单验证
                                    qqId: res.data.qqId || "",
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '微信',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="wechatId" $-bind:value="wechatId" $-valid="wechat" />',
                                scope: {
                                    wechat: resValid.wechatId,//表单验证
                                    wechatId: res.data.wechatId || "",
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '微博',
                            required: true,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="weiboId"  $-bind:value="weiboId" $-valid="weibo"/>',
                                scope: {
                                    weibo: resValid.weiboId,//表单验证
                                    weiboId: res.data.weiboId || "",
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '角色',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<input  type="hidden" name="roleIds" $-bind:value="roleIds"> <input type="text" name="roleIdsName" $-bind:value="roleIdsName" disabled>',
                                scope: {
                                    roleIdsName:data.data.authRole.roleName,
                                    roleIds: res.data.roleIds || "",  //从后台获取
                                },
                            }
                        },
                        {
                            title: '组织名称',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="entName"  $-bind:value="entName" disabled>',
                                scope: {
                                    entName: res.data.entName,  //从后台获取
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '上级领导',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<input type="text" name="superiorLeader" $-bind:value="superiorLeader" disabled />',
                                scope: {
                                    superiorLeader: res.data.superiorLeader || "",  //从后台获取
                                },
                                //需要给元素添加的指令
                                cmd: {
                                    "$-bind:name": '',
                                    "$-value": '',
                                    "$-model": 'value'
                                }
                            },
                            //当前行需要添加的指令
                            cmd: {
                                "$-if": true
                            },
                            //当前行的作用域
                            scope: {
                                value: ''
                            },
                            //当前行的过滤器
                            filter: {}
                        },
                        {
                            title: '用户描述',
                            required: false,
                            config: {
                                type: 'custom',
                                template: '<input type="hidden" name="orgId" $-bind:value="orgId"  /> <input type="hidden" name="orgCode"  $-bind:value="orgCode"  /> <textarea name="userDesc" cols="30" rows="20">' + userDesc + '</textarea>',
                                scope: {
                                    orgId: res.data.orgId,  //从后台获取部门id
                                    orgCode: res.data.orgCode || "", //从后台获取部门编码
                                }
                            }
                        },

                        //{//部门id
                        //    title: '',
                        //    required: false,
                        //    config: {
                        //        type: 'custom',
                        //        template: '<input type="hidden" name="orgId" $-bind:value="orgId"  />',
                        //        scope: {
                        //            orgId: res.data.orgId,  //从后台获取
                        //
                        //        },
                        //        //需要给元素添加的指令
                        //        cmd: {
                        //            "$-bind:name": '',
                        //            "$-value": '',
                        //            "$-model": 'value'
                        //        }
                        //    },
                        //    //当前行需要添加的指令
                        //    cmd: {
                        //        "$-if": true
                        //    },
                        //    //当前行的作用域
                        //    scope: {
                        //        value: ''
                        //    },
                        //    //当前行的过滤器
                        //    filter: {}
                        //},
                        //{//部门编码
                        //    title: '',
                        //    required: false,
                        //    config: {
                        //        type: 'custom',
                        //        template: '<input type="hidden" name="orgCode"  $-bind:value="orgCode"  />',
                        //        scope: {
                        //            orgCode: res.data.orgCode || "",
                        //        },
                        //        //需要给元素添加的指令
                        //        cmd: {
                        //            "$-bind:name": '',
                        //            "$-value": '',
                        //            "$-model": 'value'
                        //        }
                        //    },
                        //    //当前行需要添加的指令
                        //    cmd: {
                        //        "$-if": true
                        //    },
                        //    //当前行的作用域
                        //    scope: {
                        //        value: ''
                        //    },
                        //    //当前行的过滤器
                        //    filter: {}
                        //},
                    ]

                }
            }.bind(this)).send();
        });

    }.bind(this)).send({
        "userId": id
    });
});

//2、保存按钮
model('personalInformationSave', [], function () {
    var This = this;
    this.$model = [{
        isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing: '20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName: 'enterpriseInformationSave',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            'margin-right': '30px',
        },
        list: [
            {
                class: 'btn btn-teal', //【必填项】按钮样式
                icon: '', //【非必填项】图标
                label: '保存',//【必填项】按钮文字
                align: 'center',//【必填项】文字居中
                padding: '6px 24px', //【必填项】按钮内边距，可以控制按钮大小
                events: {
                    click: function (e, receiveData) { //【必填项】按钮事件
                        console.log(receiveData.getData(), "=========");
                        if(receiveData.valid()){
                            //得到表单提交的数据
                            var EditFormData = receiveData.getData(),
                                saveFormServer = This.server({
                                    serverType: 'api',
                                    method: 'POST',
                                    url: 'editOrganization'
                                });
                            saveFormServer.receive(function (res) {
                                console.log('修改结果', res);
                                if (res.status == 200) {
                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                        $message('保存成功！');
                                        setTimeout(function(){
                                            //刷新当前页面
                                            location.reload();
                                            },3000);
                                    });
                                } else {
                                    $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                        $message('保存失败！');
                                    });
                                }
                            }.bind(this)).send({
                                "id": EditFormData.id || null,//14用户id,
                                "orgId": EditFormData.orgId || null,//"1"[部门id，必填],
                                "orgCode": EditFormData.orgCode || null,//"001"[部门编码，必填],
                                "email": EditFormData.email || null,//"***@163.com"[邮箱地址，选填],
                                "address": EditFormData.address || null,//"shanghai"[地址，选填],
                                "sex": EditFormData.sex || null,//"1"[性别，选填],
                                "mobile": EditFormData.mobile || null,// "13145678935"[手机号，选填],
                                "telephone": EditFormData.telephone || null,// null[电话号码，选填],
                                "userDesc": EditFormData.userDesc || null,//"aaaassssdddfffgghhjjkk"[用户描述，选填],
                                "isAdmin": EditFormData.isAdmin || 0,//"0"[是否为管理员,必填],
                                "qqId": EditFormData.qqId || null,//"888888888"[qq账号，选填],
                                "headPhoto": EditFormData.headPhoto || null,//null[用户头像id，选填],
                                "realName": EditFormData.realName || null,//"mingyang"[真实名称,必填],
                                "roleIds": EditFormData.roleIds || null,//"1,2"[角色id，必填],
                                "extCode": EditFormData.extCode || null,//"657"[分机号，选填],
                                "shdEnable": EditFormData.shdEnable || null,//null[查看隐藏数据，选填],
                                "weiboId": EditFormData.weiboId || null,//null[微博账号],
                                "wechatId": EditFormData.wechatId || null, //null[微信账号id],
                                "job": EditFormData.job || null,//null[岗位，选填],
                                "superiorLeader": EditFormData.superiorLeader || "1",//35 [上级领导，选填],
                                "status": EditFormData.status || 1,//1[启用状态，必填]
                            });
                        }else{
                           return false;
                        }
                    }
                }
            },
        ]
    }]
});



/**
 * Created by chenya on 2017/1/12.
 */
//修改密码列表
model('modifyPassword', function () {
    //var id = $_GET['id'];  //从URL中获取id
    var id = 207; //TODO:后面登录页面中做好后，需要从URL中获取
    var This = this;
    //数据校验
    var validConfServer = This.server({
        serverType: 'jsonp',
        method: 'modifyPassword',
        url: './serverData/config/form/modifyPassword.js'
    });
    validConfServer.receive(function (resValid) {
        This.$model = {
            scope: {},
            filter: {},
            list: [
                {
                    title: '旧密码',
                    required: true,
                    class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<input type="hidden" name="id" $-bind:value="id"><input type="password" name="oldPwd"  $-valid="oldPwd" >',
                        scope: {
                            id: id, //从session中获取到的id
                            oldPwd: resValid.oldPwd,//表单验证
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
                    title: '新密码',
                    required: true,
                    class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<input type="password" name="newPwd"  $-valid="newPwd">',
                        scope: {
                            newPwd: resValid.newPwd,//表单验证
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
                    title: '确认密码',
                    required: true,
                    class: 'clos-all',
                    config: {
                        type: 'custom',
                        template: '<input type="hidden" name="isConfirmPassword"  $-valid="isConfirmPassword"><input type="password" name="confirmPassword" $-valid="confirmPassword"/>',
                        scope: {
                            confirmPassword: resValid.confirmPassword,//表单验证
                            isConfirmPassword: resValid.isConfirmPassword,//表单验证
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
            ]
        }
    }.bind(this)).send();
});

//2、保存按钮
model('modifyPasswordSave', ['$:{PLUGINS}/modal/modal-confirm'], function ($confirm) {
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
                        //得到表单提交的数据
                        var EditFormData = receiveData.getData();
                        //console.log(EditFormData.newPwd,"----EditFormData.newPwd----");
                        //console.log(EditFormData.confirmPassword,"----EditFormData.confirmPassword----");
                        if (EditFormData.newPwd != EditFormData.confirmPassword) {
                            receiveData.valid();
                            $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                $message('两次输入密码不一致！');
                            });
                            return false;
                        } else {
                            if (EditFormData.oldPwd == "" || EditFormData.newPwd == "" || EditFormData.confirmPassword == "") {
                                receiveData.valid();
                                return false;
                            } else {
                                var saveFormServer = This.server({
                                    serverType: 'api',
                                    method: 'POST',
                                    url: 'editPassword'
                                });
                                saveFormServer.receive(function (res) {
                                    if (res.status == 200) {
                                        if (res.data == "U00002") {
                                            $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                $message('旧密码输入有误！');
                                            });
                                        } else {
                                            $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                                $message('保存成功!');
                                            });
                                              //页面跳转
                                             //window.location.href='login.mecrmcrm.com/login#';
                                            //$FRAME.redirect('login.mecrmcrm.com/login#');
                                           //window.open('login.mecrmcrm.com/login#');
                                            setTimeout("window.location.href='login.mecrmcrm.com/login#';", 2000 );
                                        }
                                    } else {
                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                            $message('保存失败！');
                                        });
                                    }
                                }.bind(this)).send({
                                    "userId": EditFormData.id,// || null, 要修改密码的用户的id[用户id，不填则默认当前登录用户],
                                    "oldPwd": $FRAME.lib.$safety.MD5(EditFormData.oldPwd),//[原始密码,必填],
                                    "newPwd": $FRAME.lib.$safety.MD5(EditFormData.newPwd),//[新密码,必填]
                                });
                            }
                        }
                    }
                }
            },
        ]
    }]
});



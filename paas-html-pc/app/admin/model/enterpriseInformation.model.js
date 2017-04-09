/**
 * Created by chenya on 2016/12/12.
 */

//1、企业信息列表
model('enterpriseInformation',function () {
    var This = this;
    var id=1;//TODO:暂时为1，后期会动态获取
    var enterpriseInformationServer=this.server({
        serverType:'api',//如果是访问接口,这里是api,其他的则是http
        method:'POST',
        url:'getEnterpriseInformationData',
    });
    enterpriseInformationServer.receive(function (res,xhr) {
        console.log(JSON.stringify(res));

        //数据校验
        var validConfServer = This.server({
            serverType: 'jsonp',
            method: 'enterpriseInformation',
            url: './serverData/config/form/enterpriseInformation.js'
        });

        validConfServer.receive(function (resValid) {
        This.$model={
            scope:{
            },
            filter:{
            },
            list:[
                {
                    title:'企业名称',
                    required:true,
                    class:'clos-all',
                    config:{
                        type:'custom',
                        template:'<input type="text" name="entName" $-bind:value="entName" $-valid="entNameValid"/>',
                        scope:{
                            entNameValid: resValid.entName,//表单验证
                            entName:res.data.entName,
                        },
                        placeholder:'',
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    }
                },
                {
                    title:'企业账号',
                    required:true,
                    class:'clos-all',
                    config:{
                        type:'custom',
                        value:res.data.entAccount,
                        name:'entAccount',
                        placeholder:'',
                        template:'<input type="text" name="entAccount" readonly $-bind:value="entAccount" disabled/>',
                        scope:{
                            entAccount:res.data.entAccount
                        },
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                },
                {
                    title:'企业地址',
                    class:'clos-all',
                    required:false,
                    config:{
                        type:'text',
                        value:res.data.address,
                        name:'address',
                        placeholder:'',
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                },
                {
                    title:'企业邮箱',
                    class:'clos-all',
                    required:true,
                    config:{
                        type: 'custom',
                        placeholder:'',
                        template:'<input type="text" name="email"  $-bind:value="email" $-valid="emailValid" />',
                        scope:{
                            emailValid:resValid.email,//表单验证
                            email:res.data.email
                        },
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                },
                //{
                //    title:'企业邮箱密码',
                //    class:'clos-all',
                //    required:false,
                //    config:{
                //        //type:'text',
                //        //value:res.data.emailPwd,
                //        //name:'emailPwd',
                //        //placeholder:'',
                //        type: 'custom',
                //        placeholder:'',
                //        template:'<input type="text" name="emailPwd"  $-bind:value="emailPwd" $-valid="emailPwdValid" />',
                //        scope:{
                //            emailPwdValid:resValid.emailPwd,//表单验证
                //            emailPwd:res.data.emailPwd
                //        },
                //        //需要给元素添加的指令
                //        cmd:{
                //            "$-bind:name":'',
                //            "$-value":'',
                //            "$-model":'value'
                //        }
                //    },
                //},
                //{
                //    title:'SMTP服务地址',
                //    class:'clos-all',
                //    required:false,
                //    config:{
                //        type:'text',
                //        value:res.data.emailHost,
                //        name:'emailHost',
                //        placeholder:'',
                //        //需要给元素添加的指令
                //        cmd:{
                //            "$-bind:name":'',
                //            "$-value":'',
                //            "$-model":'value'
                //        }
                //    },
                //},
                //{
                //    title:'SMTP服务端口',
                //    class:'clos-all',
                //    required:false,
                //    config:{
                //        type:'text',
                //        value:res.data.emailHostPort,
                //        name:'emailHostPort',
                //        placeholder:'',
                //        //需要给元素添加的指令
                //        cmd:{
                //            "$-bind:name":'',
                //            "$-value":'',
                //            "$-model":'value'
                //        }
                //    },
                //},
                //{
                //    title:'加密方式',
                //    required:false,
                //    class:'clos-all',
                //    config:{
                //        type:'custom',
                //        name:'emailEncryption',
                //        template:'<input type="radio" name="emailEncryption" value="SSL" $-checked="emailEncryption == \'SSL\'"><span style="margin-left:8px;">SSL</span><input type="radio" name="emailEncryption" value="TLS" $-checked="emailEncryption == \'TLS\'" style="margin-left: 15px"><span style="margin-left:8px;">TLS</span>',
                //        scope:{
                //            emailEncryption :res.data.emailEncryption
                //        }
                //    }
                //},
                {
                    title:'传真',
                    class:'clos-all',
                    required:true,
                    config:{
                        type: 'custom',
                        placeholder:'',
                        template:'<input type="text" name="fax"  $-bind:value="fax" $-valid="faxValid" />',
                        scope:{
                            faxValid:resValid.fax,//表单验证
                            fax:res.data.fax
                        },
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                },
                {
                    title:'手机号码',
                    class:'clos-all',
                    required:true,
                    config:{
                        type: 'custom',
                        placeholder:'',
                        template:'<input type="text" name="mobile"  $-bind:value="mobile" $-valid="mobileValid" />',
                        scope:{
                            mobileValid:resValid.mobile,//表单验证
                            mobile:res.data.mobile
                        },
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                },
                {
                    title:'企业站点',
                    class:'clos-all',
                    required:true,
                    config:{
                        type: 'custom',
                        placeholder:'',
                        template:'<input type="text" name="website"  $-bind:value="website" $-valid="websiteValid" />',
                        scope:{
                            websiteValid:resValid.website,//表单验证
                            website:res.data.website
                        },
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                },
                {
                    title:'企业电话',
                    class:'clos-all',
                    required:true,
                    config:{
                        type: 'custom',
                        placeholder:'',
                        template:'<input type="text" name="telephone"  $-bind:value="telephone" $-valid="telephoneValid" />',
                        scope:{
                            telephoneValid:resValid.telephone,//表单验证
                            telephone:res.data.telephone
                        },
                        //需要给元素添加的指令
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                            "$-model":'value'
                        }
                    },
                },
                {
                    title:'企业LOGO',
                    class:'clos-all',
                    required:false,
                    config:{
                        type:'custom',
                        name:'logoAttcId',
                        template:'<input type="text" style="display:none"  name="id" $-bind:value="id"><input type="file" name="logoAttcId" style="width:100%;"/>',
                        scope:{
                            id:id
                        }
                    },
                    show:true
                },
                //{
                //    title:'',
                //    required:false,
                //    class:'clos-all',
                //    config:{
                //        type:'custom',
                //        template:'<input type="text" style="display:none"  name="id" $-bind:value="id">',
                //        scope:{
                //            id:id
                //        },
                //        placeholder:'',
                //        //需要给元素添加的指令
                //        cmd:{
                //            "$-bind:name":'',
                //            "$-value":'',
                //            "$-model":'value'
                //        }
                //    }
                //},
            ]
        };
        }.bind(this)).send();

    }.bind(this)).send({
        "id" : id
    });
});


//2、保存按钮
model('enterpriseInformationSave',[],function(){
    var This=this;
    this.$model=[{
            isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
            spacing:'20px',//【非必填项】两个按钮之间的间距
            eventIdentifierName:'enterpriseInformationSave',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
            style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                'margin-right':'30px',
            },
            list:[
                {
                    class:'btn btn-teal', //【必填项】按钮样式
                    icon:'', //【非必填项】图标
                    label:'保存',//【必填项】按钮文字
                    align:'center',//【必填项】文字居中
                    padding:'6px 24px', //【必填项】按钮内边距，可以控制按钮大小
                    events:{
                        click:function (e,receiveData) { //【必填项】按钮事件
                            console.log(receiveData.getData(),"=========");
                            if(receiveData.valid()){
                                //得到表单提交的数据
                                var getFormData=receiveData.getData(),
                                    saveFormServer = This.server({
                                        serverType:'api',
                                        method:'POST',
                                        url:'editEnterpriseInformation'
                                    });
                                console.log(getFormData.emailEncryption);
                                saveFormServer.receive(function (res) {
                                    console.log('修改结果',res);
                                    if(res.status==200){

                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                            $message('保存成功！');
                                            setTimeout(function(){
                                                //刷新当前页面
                                                location.reload();
                                            },3000);
                                        });

                                    }else{
                                        $packages('{PLUGINS}/hint/hint-message',function ($message) {
                                            $message('保存失败！');
                                        });
                                    }
                                }.bind(this)).send({
                                    "id":parseInt(getFormData.id)||1,
                                    "entName": getFormData.entName||null,
                                    "address": getFormData.address||null,
                                    "contact": getFormData.contact||null,
                                    "corporate": getFormData.corporate||null,
                                    "email": getFormData.email||null,
                                    "emailPwd": getFormData.emailPwd||null,
                                    "emailHost": getFormData.emailHost||null,
                                    "emailEncryption": getFormData.emailEncryption||null,
                                    "emailHostPort": getFormData.emailHostPort||null,
                                    "fax": getFormData.fax||null,
                                    "mobile": getFormData.mobile||null,
                                    "website": getFormData.website||null,
                                    "telephone": getFormData.telephone||null,
                                    "logoAttcId": getFormData.logoAttcId ||null
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








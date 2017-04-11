/**
 * Created by xiyuan on 16-9-27.
 */
model('login',function(){

    var loginServer=this.server({
        type:'http',
        url:'login'
    });

    //页面菜单数据
    var pageMenuData={
        list:[
            {
                title:'客户',
                isGroup:true,
                rows:[
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    },
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    },
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    }
                ]
            },
            {
                title:'跟进',
                isGroup:true,
                rows:[
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    },
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    },
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    }
                ]
            },
            {
                title:'宣传材料',
                isGroup:true,
                rows:[
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    },
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    },
                    {
                        name:'公海客户',
                        events:{
                            click:function () {

                            }
                        }
                    }
                ]
            }
        ]
    };

    this.method('getData',function (time) {

        setTimeout(function () {

            loginServer.receive(function(){

                this.$model={
                    pageTitle:'登录页面',
                    formData:{
                        list:[
                            {
                                title:'用户名'
                            }
                        ]
                    },
                    pageMenuData:pageMenuData
                }

            }.bind(this)).send({
                user:'zhangsan'
            });

        }.bind(this),time)


    }.bind(this))




});
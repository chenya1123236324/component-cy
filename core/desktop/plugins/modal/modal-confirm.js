/**
 * Created by xiyuan on 17-2-13.
 */
define(['modal-dialog'],function ($dialog) {

    return function exports(option) {
        option={
            title:'提示',
            content:'消息提示确认！',
            pass:function () {

            },
            cancel:function () {
                
            }
        }.extend(option||{});
        $dialog({
            title:option.title,
            content:'<div class="dialog-message">{{content}}</div>',
            scope:{
                content:option.content,
            },
            filter:{},
            height:'200px',
            width:'400px',
            btns:[
                {
                    name:'确认',
                    trigger:function (eve,interface) {
                        option.pass();
                        interface.close();
                    }
                },
                {
                    name:'取消',
                    theme:"warning", //[ primary , success , info , warning , danger ]
                    trigger:function (eve,interface) {
                        option.cancel();
                        interface.close();
                    }
                }
            ]

        })
    };

});
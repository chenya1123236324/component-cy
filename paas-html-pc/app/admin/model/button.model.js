//button 组件
model('btnGroupMe',function(){

    this.$model=[{
        isGroup:true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing:'20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName:'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            padding:'50px',
            'margin-bottom':'30px'
        },
        list:[
            {
                class: 'btn btn-sapphire-blue', //【必填项】按钮样式
                icon:'', //【非必填项】图标
                label:'保存',//【必填项】按钮文字
                align:'center',//【必填项】文字居中
                padding: '5px 40px', //【必填项】按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) { //【必填项】按钮事件
                        $packages('{PLUGINS}/hint/hint-message', function ($message) {
                            $message('您点击了【保存】');
                        });
                    }
                }
            },{
                class:'btn btn-teal-outline',//按钮样式
                icon:'', //图标
                label:'取消',//按钮文字
                align:'center',//文字居中
                padding: '5px 40px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        $packages('{PLUGINS}/hint/hint-message', function ($message) {
                            $message('您点击了【取消】');
                        });
                    }
                }
            },{
                class: 'btn btn-darkviolet',//按钮样式
                icon:'iconfont icon-jiahao', //图标
                label:'新增', //按钮文字
                align:'left', //文字居左
                padding: '5px 14px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        $packages('{PLUGINS}/hint/hint-message', function ($message) {
                            $message('您点击了【新增】');
                        });
                    }
                },
                iconEvents:{
                    click:function (event) {
                        //停止事件冒泡
                        event.stopPropagation();
                        $packages('{PLUGINS}/hint/hint-message', function ($message) {
                            $message('您点击了【新增】按钮的图标');
                        });
                    }
                }
            },{
                class: 'btn btn-indian-red',//按钮样式
                icon:'iconfont icon-shanchu', //图标
                label:'删除', //按钮文字
                align:'right', //文字居右
                padding: '5px 14px',//按钮内边距，可以控制按钮大小
                events:{
                    click:function (event) {
                        $packages('{PLUGINS}/hint/hint-message', function ($message) {
                            $message('您点击了【删除】');
                        });
                    }
                },
                iconEvents:{
                    click:function (event) {
                        //停止事件冒泡
                        event.stopPropagation();
                        $packages('{PLUGINS}/hint/hint-message', function ($message) {
                            $message('您点击了【删除】按钮的图标');
                        });
                    }
                }
            }
        ]
    }]
});
model('confirm', ['$:{PLUGINS}/modal/modal-confirm'], function ($confirm) {
    this.$model = [{
        isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
        spacing: '20px',//【非必填项】两个按钮之间的间距
        eventIdentifierName: '',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
        style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
            'margin-right': '30px',
        },
        list: [
            {
                class: 'btn btn-teal', //【必填项】按钮样式
                icon: '', //【非必填项】图标
                label: '点击删除',//【必填项】按钮文字
                align: 'center',//【必填项】文字居中
                padding: '6px 24px', //【必填项】按钮内边距，可以控制按钮大小
                events: {
                    click: function (event) { //【必填项】按钮事件
                        $confirm({
                            title: '消息',
                            content: '确定删除此条数据？',
                            pass: function () {
                                $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                    $message('删除成功！');
                                });
                            },
                            cancel: function () {
                                $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                    $message('删除失败！');
                                });
                            }
                        })
                    }
                }
            },
        ]
    }]
});
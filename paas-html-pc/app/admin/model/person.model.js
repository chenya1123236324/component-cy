model('person', function () {
    this.$model = {
        scope: {},
        filter: {},
        list: [
            {
                title: '人员选择',
                required: true,
                config: {
                    type: 'organisation',
                    name: 'person',
                    $config: {
                        orgCode: 0,
                        select: function (info, write, dialog) {
                            write(info.userInfo.realName, info.userInfo.superiorLeader);
                            dialog.close();
                        }
                    },
                },
                hidden: false
            },
        ]
    };
})
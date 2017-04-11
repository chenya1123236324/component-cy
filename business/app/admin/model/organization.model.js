model('organization', function () {
    //组织架构树
    var orgListModel = $FRAME.model('HOME@custom/commApi:orgList');
    orgListModel.method('getData', '0');
    this.$model = {
        scope: {},
        filter: {},
        list: [
            {
                title: '组织名称',
                required: true,
                config: {
                    type: 'tree',
                    name: 'orgCode',
                    $config: {
                        treeConf: orgListModel,
                        select: function (info, write) {
                            info = info || {orgName: '', orgCode: ''};
                            write(info.orgName, info.orgCode);
                        }
                    },
                },
                hidden: false
            },
        ]
    };
})
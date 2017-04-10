model('tab', function () {
    this.$model = {
        style: {},
        isGroup: true,
        label: '',
        tabType: 'flip',
        list: [
            {
                label: "字段",
                className: "active",
                events: {}
            },
            {
                label: "视图",
                className: "",
                events: {}
            },
            {
                label: "操作",
                className: "",
                events: {}
            }
        ]
    }
});
model('date', function () {
    //获取当前时间，格式YYYY-MM-DD
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    this.$model = {
        scope: {},
        filter: {},
        list: [
            {
                title: '日期组件',
                require: true,
                config: {
                    type: 'date',
                    value: getNowFormatDate(),
                    placeholder: '请选择日期',
                    cmd: {
                        $value: '',
                        $model: ''
                    }
                },
            },
        ]
    };
})









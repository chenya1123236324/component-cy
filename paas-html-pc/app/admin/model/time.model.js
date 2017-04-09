model('time', function () {
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }

    this.$model = {
        scope: {},
        filter: {},
        list: [
            {
                title: '选择时间',
                require: true,
                config: {
                    type: 'time',
                    value: getNowFormatDate(),
                    placeholder: '请选择时间',
                    cmd: {
                        "$-value": '',
                        "$-model": ''
                    }
                }
            },
        ]
    };
})









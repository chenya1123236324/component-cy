//当前位置组件
model('currentLocation', function () {
    this.$model = [{
        leftColor: '#00a79d',  //左侧内容背景颜色
        rightColor: '#26b7ae', //右侧内容背景颜色
        activeColor: '#21c3b9', //右侧内容鼠标悬浮背景颜色
        verticalLine: '1px solid #5abfb9',//右侧内容竖线颜色
        list: [
            {
                isLocation: true,//是否是当前位置
                locationName: '公海客户',//左侧当前位置名称
                href: '/admin/currentLocation/currentLocation.html',
                events: {
                    click: function (event) {
                        console.log(this, this.innerHTML, event)
                    }
                }
            }, {
                isLocation: false,//是否是当前位置
                locationName: '区域公海',//右侧位置名称
                href: '/admin/currentLocation/currentLocation.html',
                events: {
                    click: function (event) {
                        console.log(this, this.innerHTML, event)
                    }
                }
            }, {
                isLocation: false,//是否是当前位置
                locationName: '重点客户',//右侧位置名称
                href: '/admin/currentLocation/currentLocation.html',
                events: {
                    click: function (event) {
                        console.log(this, this.innerHTML, event)
                    }
                }
            }, {
                isLocation: false,//是否是当前位置
                locationName: '潜在客户',//右侧位置名称
                href: '/admin/currentLocation/currentLocation.html',
                events: {
                    click: function (event) {
                        console.log(this, this.innerHTML, event)
                    }
                }
            },
        ]
    }]
});
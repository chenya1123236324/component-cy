model('iconColor', function () {
    this.$model = {
        scope: {},
        filter: {},
        list: [
            {
                title: "图标与颜色",
                config: {
                    type: 'custom',
                    template: '<input config="iconConf" value="naozhong" type="icons"">' +
                    '<input value="#ff00ff" type="color" $-on:input="iconConf|colorChange" style="margin-left:10px;">',
                    scope: {
                        iconConf: {
                            color: '#ff00ff'
                        }
                    },
                    filter: {
                        colorChange: function (iconConf) {
                            return function () {
                                iconConf.color = this.value;
                            }
                        }
                    }
                }
            }
        ]
    };
})









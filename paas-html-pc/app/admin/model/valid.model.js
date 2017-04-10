model('valid', function () {

    var validConfServer = this.server({
        serverType: 'jsonp',
        method: 'validConf',
        url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/form/validConf.js'
    });

    validConfServer.receive(function (res) {
        this.$model = res;
    }.bind(this)).send();

});

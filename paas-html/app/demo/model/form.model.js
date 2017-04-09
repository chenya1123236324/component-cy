/**
 * Created by xiyuan on 16-12-2.
 */
model('layout', function () {

    var formLayoutServer = this.server({
        serverType: 'jsonp',
        method: 'formLayout',
        url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/form/formLayout.js'
    });

    formLayoutServer.receive(function (res) {
        this.$model = res;
    }.bind(this)).send();

});

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

model('selectConfig',function () {
    var selectConfigServer = this.server({
        serverType: 'jsonp',
        method: 'selectConf',
        url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/form/selectConf.js'
    });

    selectConfigServer.receive(function (res) {
        window.ds=this.$model = res;
    }.bind(this)).send();

});

model('layoutEdit', function () {

    var formLayoutServer = this.server({
        serverType: 'jsonp',
        method: 'formLayout',
        url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/form/formLayoutEdit.js'
    });

    formLayoutServer.receive(function (res) {
        this.$model = res;
    }.bind(this)).send();

});
/**
 * Created by xiyuan on 16-12-28.
 */
define(function () {

    return $FRAME.model(function () {

        var appNavServer = this.server({
            serverType: 'jsonp',
            method: 'appNavConf',
            url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/app/appNavConf.js'
        });

        appNavServer.receive(function (res) {
            this.$model = res;
        }.bind(this)).send();

    })

});
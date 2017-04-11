/**
 * Created by xiyuan on 16-12-28.
 */
define(function (dialog) {

    return $FRAME.model(function () {

        this.server({
            serverType: 'http',
            method: 'get',
            url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/data/app/menuList.data'
        }).receive(function (res) {
            this.$model = res;
        }.bind(this)).send();


    })

});
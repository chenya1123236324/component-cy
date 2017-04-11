/**
 * Created by xiyuan on 16-11-21.
 */
model('menuList', function () {

    var menuListServer =this.server({
        serverType:'http',
        method:'get',
        url:$FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/data/index/menuList.data'
    });

    menuListServer.receive(function (res) {
        this.$model=res;
    }.bind(this)).send({
        id:'test'
    });


});
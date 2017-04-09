/**
 * Created by xiyuan on 16-11-21.
 */
model('gridConf', function () {

    var gridConfServer = this.server({
        serverType: 'jsonp',
        method: 'gridConf',
        url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/list/gridConf.js'
    });

    gridConfServer.receive(function (res) {
        this.$model = res;
    }.bind(this)).send();

});

model('treeConf',function () {
    var treeConfServer = this.server({
        serverType: 'jsonp',
        method: 'treeConf',
        url: $FRAME.getConfig('PATH.FRAME_ROOT')+'/serverData/config/list/treeConf.js'
    });

    treeConfServer.receive(function (res) {
        this.$model = res;
    }.bind(this)).send();
});
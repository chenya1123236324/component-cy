/**
 * Created by xiyuan on 16-12-29.
 */
model('gridConf',function () {

    var gridConfServer = this.server({
        serverType: 'api',
        method: 'post',
        url: 'gridStructure'
    });

    gridConfServer.success(function () {

    }).fail(function () {

    });

    this.method('getConf',function (viewId) {
        gridConfServer.send({view:viewId})
    })
});
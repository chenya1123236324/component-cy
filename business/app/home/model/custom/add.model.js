/**
 * Created by xiyuan on 17-1-4.
 */
model('viewStructConf','$:@lib/custom/formStructConvert', function (formStructConvert) {
    var M = this,
        formStructServer = this.server({
            serverType: 'api',
            url: 'addFormStruct'
        });

    this.method('getConf', function (viewId,getType) {
        viewId=Number(viewId);
        formStructServer.success(function (res) {
            M.$model = formStructConvert(res,getType,viewId);
        }).fail(function (msg) {
            console.log(msg)
        }).send({viewId: viewId});
    })

});

model('add',function () {
    var realApi = this.server({
            serverType: 'api',
            url: 'realAdd'
        });

    this.method('sendData', function (sendData,callback) {
        realApi.success(function (res) {
            callback(res);
        }).fail(function (msg) {
            callback(null);
        }).send(sendData);
    })
});
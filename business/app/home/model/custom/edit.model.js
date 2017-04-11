/**
 * Created by xiyuan on 17-1-4.
 */
model('viewStructConf','$:@lib/custom/formStructConvert', function (formStructConvert) {
    var M = this,
        formStructServer = this.server({
            mthod: 'post',
            serverType: 'api',
            url: 'editFormStruct'
        });

    this.method('getConf', function (sendData,getType) {
        formStructServer.success(function (res) {
            M.$model = formStructConvert(res,getType);
        }).fail(function (msg) {
            console.log(msg)
        }).send({isPreview: 1}.extend(sendData));
    })

});

model('update',function () {

    var updateApi=this.server({
        serverType:'api',
        url:'realUpdate'
    });

    this.method('sendData',function (sendData,callback) {
        updateApi.success(function (res) {
            callback(res)
        }).fail(function () {
            callback(null)
        }).send(sendData)
    })
});
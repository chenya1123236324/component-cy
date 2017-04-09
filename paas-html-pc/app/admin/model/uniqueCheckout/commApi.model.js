/**
 * Created by 贝贝 on 2017/2/17.
 */
//唯一性校验
//模块编码
model('moduleCodeUnique',function () {
    var This = this,
        uniqueServer = this.server({
            serverType:'api',
            url:'moduleCodeCheckout'
        });
    this.method('valid',function (sendData,callback) {
        uniqueServer.success(function (res) {
            callback(This.$model = res);
        }).fail(function (msg) {
            callback(false);
        }).send(sendData);
    });
});

//用户账号
model('accountIdUnique',function () {
    var This = this,
        uniqueServer = this.server({
            serverType:'api',
            url:'accountIdUnique'
        });
    this.method('accountIdUniqueValid',function (sendData,callback) {
        uniqueServer.success(function (res) {
            callback(This.$model = res);
        }).fail(function (msg) {
            callback(false);
        }).send(sendData);
    });
});

//字段编码
model('columnCodeUnique',function () {
    var This = this,
        uniqueServer = this.server({
            serverType:'api',
            url:'fieldIsUnique'
        });
    this.method('columnCodeUniqueValid',function (sendData,callback) {
        uniqueServer.success(function (res) {
            callback(This.$model = res);
        }).fail(function (msg) {
            callback(false);
        }).send(sendData);
    });
});

//字典编码
model('dictCodeUnique',function () {
    var This = this,
        uniqueServer = this.server({
            serverType:'api',
            url:'dictCodeCheckout'
        });
    this.method('valid',function (sendData,callback) {
        uniqueServer.success(function (res) {
            callback(This.$model = res);
        }).fail(function (msg) {
            callback(false);
        }).send(sendData);
    });
});
/**
 * Created by xiyuan on 15-11-30.
 */
(function (exports){
    var log=new exports.$$LogInterface();

    /*错误日志*/
    log.addLogType('error',function(msg,err){
        var errFile=err.stack.match(/at[\s]+([\S\s]+?)at/),
            errFile=errFile?errFile[1]:'',
            errName=err.name,
            errMsg=err.message;
        console.error('错误类型:'+errName +'\r\n错误信息:'+errMsg+'\r\n错误文件:'+errFile);
        return msg;
    });

    /*警告日志*/
    log.addLogType('warning',function(msg){
        console.warn('警告:',msg)
        return msg;
    });

    /*控制台输出日志*/
    log.addLogType('console',function(){
        console.log('console')
    });

    exports.$log=log;

})(this);

var $log=this.$log;


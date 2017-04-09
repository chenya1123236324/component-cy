/**
 * Created by xiyuan on 16-12-5.
 */
/*get方法*/
net.get=function(url,data,callback){
    net.ajax({
        url:url,
        data:data||{},
        complete:callback||function () {

        }
    })
};
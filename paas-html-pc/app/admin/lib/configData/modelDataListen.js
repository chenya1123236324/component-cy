/**
 * Created by 贝贝 on 2017/3/22.
 */
//处理视图条件修改时请求两model以及使用model数据的异步问题
define(function () {
    return function (models) {
        var index=0,
            count=0,
            resData,
            resCallBack;

        if(models instanceof Array){
            count=models.length;
            resData=new Array(count);

            models.forEach(function (model,index) {
                model.readData(function (data) {
                    resData[index]=data;
                    if(!--count ){
                        resCallBack.apply(this,resData);
                    }
                })
            })

        }

        return function (callback) {
            !count?callback.apply(this,resData):(resCallBack=callback)
        };
    }
});
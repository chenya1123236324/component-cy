/**
 * Created by xiyuan on 16-3-11.
 */

//zip路径解析 例如：http://test.com/html5_frame-v2/test/home/app/fsdjsonp/@zip{jsonp}/index'
function zipPathParse(path,PathSource){
    var pathSource=PathSource||[],
        res=path.match(/(?:^|\/)@zip\{([\w]+)\}\//);
    if(res){
        var index=res.index,
            name=res[1],
            beforeUrl=path.slice(0,index+1);
        if(index){
            pathSource.push({
                type:'url',
                value:beforeUrl
            })
        }
        pathSource.push({
            isFirst: true,
            type:'zip',
            value:name
        });
        zipPathParse(path.slice(index+res[0].length),pathSource);
    }else{
        path && pathSource.push({
            type:'url',
            value:path
        })
    }
    return pathSource;
}
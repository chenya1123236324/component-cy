/**
 * Created by xiyuan on 16-1-19.
 */

//路径解析
function pathParse(url,type) {
    url = url.replace(/^\/*/, '');
    var index,afterUrl,slice,module,modulePath,afterPath,moduleUrl,
        isZip=false,
        zipAfterUrl,
        pathResource = [],
        zipRegexp = /@zip\{\s*([^\}\s]+)\s*\}/;
    if(modulePath=url.match(/\@(?!zip)/)){
        modulePath=url.substr(0,modulePath.index);
    }

    //格式化路径
    if (url.match(zipRegexp)) {
        isZip=true;
        $pathManage.zipPathParse(url,pathResource);
        url=pathResource.pop().value;
    }

    //检查当前模式
    switch (type){
        case 'controller':
        case 'view':
        case 'model':
            //检查是否应用模块引用
            if((index=url.match('@')) && (index=index.index)){
                afterPath=afterUrl=url.slice(index+1);
                moduleUrl=url=url.substr(0,index);
                //分离
                afterUrl=afterUrl.replace(/([\w-]+):([\w-]+)/,function(str,$1,$2){
                    //获取配置中的文件后缀配置
                    type=_systemConfig.fileSuffix[type];
                    slice=$2;
                    return $1+(type?'.'+type:'');
                });

                //添加到文件路径中
                afterUrl && (module={
                    type:'url',
                    value:(type+'/'+afterUrl).replace(/[\/\\]+/g,'/')
                });
            }else{
                //分离
                /*if((slice=url.match(/([\w-]+):([\w-]+)/)) && (url=slice[1],slice=slice[2])){
                    //获取配置中的文件后缀配置
                    type=_systemConfig.fileSuffix[type];
                    url=url+(type?'.'+type:'');

                    console.log(url)
                }*/
                afterUrl=true;
            }
            break;
    }

    if(!isZip){
        var pathList = $configStroage.pathList,
            pMaps = pathList.maps,
            pPaths = pathList.paths,
            $i, $l, $v, $$i, $$l, $$v,
            zPath, targetPath;

        //第一步 path替换
        var pSort = pPaths.sort,
            pList = pPaths.list;

        $i = ~0;
        $l = pSort.length;

        pathLoop:
            while (++$i < $l) {
                $v = pList[pSort[$i]];
                $$i = ~0;
                $$l = $v.length;
                while (++$$i < $$l) {
                    $$v = $v[$$i];
                    //匹配path
                    if (url.match($$v.regexp)) {
                        //替换path
                        pathResource = $$v.source.concat([]);
                        targetPath = pathResource.pop();
                        if ($$v.innerZip) {
                            url=url.replace($$v.regexp, '');
                            pathResource=pathResource.concat([targetPath]);

                            //去掉空路径
                            url && pathResource.push( {
                                type: "url",
                                value: url.replace($$v.regexp, '')
                            });

                        } else {
                            pathResource.push({
                                type: "url",
                                value: targetPath.value.replace(/\/+$/, '') + '/' + url.replace($$v.regexp, '').replace(/^\/+/, '')
                            });
                        }

                        break pathLoop;
                    }
                }


            }

        //防止path没匹配到
        pathResource.length || pathResource.push({
            type: 'url',
            value: url
        });

        //第二步 zip替换与提取(目前不需要)

        //第三步 map映射替换

        pSort = pMaps.sort;
        pList = pMaps.list;
        $i = ~0;
        $l = pSort.length;

        if ((targetPath = pathResource[0]) && targetPath.type === 'url' && (zPath = targetPath.value)) {
            mapLoop:
                while (++$i < $l) {
                    $v = pList[pSort[$i]];
                    $$i = ~0;
                    $$l = $v.length;
                    while (++$$i < $$l) {
                        $$v = $v[$$i];

                        //匹配map
                        if (zPath.match($$v.regexp) && ((zPath=zPath.replace($$v.regexp,'')) === '' || zPath.match(/^\//))) {
                            pathResource.shift();
                            if(zPath !== '/' && zPath !==''){
                                pathResource = $$v.source.concat([{
                                    type: "url",
                                    value: zPath
                                }],pathResource);
                            }else{
                                pathResource = $$v.source.concat(pathResource);
                            }

                            break mapLoop;

                        }

                    }
                }
        }

        //解析路径中

        //合并类型后缀
        if(!module && afterUrl){
            url=pathResource.pop().value;
            //分离
            if((slice=url.match(/([\s\S]+):([\w-]+)/)) && (url=slice[1],slice=slice[2])){
                //获取配置中的文件后缀配置
                type=_systemConfig.fileSuffix[type];
                url=url+(type?'.'+type:'');
            }
            module={
                type:'url',
                value:url
            }
        }
    }else{
        pathResource.push({
            type:'url',
            value:url
        });
    }
    module && pathResource.push(module);

    return {
        slice:slice,
        source:pathResource,
        afterPath:afterPath,
        modulePath:modulePath,
        moduleUrl:moduleUrl
    };
}

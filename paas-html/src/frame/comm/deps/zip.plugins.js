/**
 * Created by xiyuan on 16-2-26.
 */
(function ($packagesPlugins) {

    //支持zip文件读取
    $packagesPlugins.register({
        name:'zip',
        pathHandle:function(PackageUrl, masterUrl,master){
            //检查是否启用zip加载
            return /@zip\{[\w]+\}\//i.test(PackageUrl) && PackageUrl;
        },
        sourceHandle:function(path,callbackFn,packageObj,master){
            var deps=[],
                sourceType='zip',
                fileSource='yes';

            $sourceManage.sourceGet($pathManage.zipPathParse(path), {
                callbackName: 'define',
                sourceType: 'define'
            }, function (source, sourceType) {
                // path：资源路径  fileSource：文件资源 deps：资源依赖包 sourceType：资源类型（必须写）
                callbackFn(path,source,deps,sourceType);
            });
        }
    });


})(this.$packagesPlugins);

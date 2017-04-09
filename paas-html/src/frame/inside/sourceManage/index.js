//@make : start

/*资源管理对象*/
var $sourceManage={
    sourceGet:sourceGet,
    getViewSource:getViewSource,
    getLayoutSource:getLayoutSource,
    getModelSource:getModelSource,
    getControllerSource:getControllerSource
};

/**
 * 规范化资源路径
 * @param modelPath
 * @param __info__
 * @returns {*}
 */
function sourcePathNormal(modelPath,__info__) {
        var afterPath = __info__.afterPath,
        modulePath = __info__.modulePath;

    //检查是否绝对/相对地址   @user:list user:list  :list  @user   user
    //相对地址 (检查以@开头 或不包含斜杠 并检测是否基于模块)
    if ((modelPath.indexOf('@') === 0 || !modelPath.match(/[\/\\]/) ) && modulePath) {

        //检测是否 切片
        if (modelPath.indexOf(':') === 0) {
            modelPath = afterPath.replace(/:[^:]*$/, '') + modelPath;
        } else if (modelPath.indexOf('@') === -1) {
            modelPath = afterPath.replace(/[\\\/]*[^\/\\]+[\\\/]*$/, '') + '/' + modelPath;
        }

        if(modelPath.indexOf('@') <= 0){
            modelPath = modulePath + '@' + modelPath.replace(/^[\\\/]+/, '').replace('@', '/');
        }
    }

    return modelPath;
}

/*资源路径解析*/
//Include('sourceParse.js');

/*资源获取*/
Include('sourceGet.js');

/*视图相关资源管理*/
Include('view/index.js');

/*控制器相关资源管理*/
Include('controller/index.js');

/*控制器相关资源管理*/
Include('model/index.js');


//@make : end
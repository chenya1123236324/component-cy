/**
 * Created by xiyuan on 16-1-19.
 */
//@make : start

/*路由管理对象*/
var $pathManage={
    pathParse:pathParse,
    zipPathParse:zipPathParse
};

/*路径解析*/
Include('pathParse.js');

/*zip路径解析*/
Include('zipPathParse.js');

//@make : end
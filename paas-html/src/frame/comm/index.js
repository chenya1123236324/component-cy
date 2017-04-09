/**
 * Created by xiyuan on 15-11-30.
 */
//@make : start

/*日志类*/
Include('log/log.js');

/*框架日志管理*/
Include('log/frameLog.js');

/*包依赖类*/
Include('deps/deps.js');

/*zip资源支持插件*/
Include('deps/zip.plugins.js');

/*包管理器，功能类似如requirejs*/
Include('deps/$packages.js');

/*基础工具*/
Include('lib/index.js');

/*兼容包*/
Include('shim/RequestAnimationFrame.js');

//@make : end

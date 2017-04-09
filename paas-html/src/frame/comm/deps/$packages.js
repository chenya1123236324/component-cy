/**
 * Created by xiyuan on 15-11-30.
 */

/*基础包模块管理器定义*/
!function (exports,window) {
    var $$PackagesInterface=exports.$$PackagesInterface;

    /*创建包管理器*/
    var $$Packages = new $$PackagesInterface();

    /*包定义*/
    window.define = function () {
        var res = $$PackagesInterface.prototype.resolveDefineArg(arguments);
        //添加包到存储器中
        new $$PackagesInterface.prototype.PackageStruct(res.alias, $$Packages.stroage, {
            deps: res.deps,
            exports: res.exports,
            alias: null
        });
    };

    window.define.amd = 'amd';

    //包管理任务执行处理
    window.$packages=exports.$packages = function () {
        return [$$Packages.initTask.apply($$Packages, arguments), $$Packages];
    };
}(this,window);

var $packages=$FRAME.$packages=this.$packages;
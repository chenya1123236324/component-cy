/**
 * Created by xiyuan on 16-8-18.
 */

//数据model
$FRAME.$model=$FRAME.model=$MODEL;

//页面重定向
$FRAME.redirect=$routeManage.redirect;

//返回上一页
$FRAME.goBack=$routeManage.back;

//刷新当前页面
$FRAME.refresh=$routeManage.refresh;

//视图渲染
$FRAME.viewVM=function () {
    return directiveRegisterInterface.prototype.viewVM.apply(this,arguments);
};

//检查是否数据模型
$FRAME.isVM=function () {
    return directiveRegisterInterface.prototype.isVM.apply(this,arguments);
};

//语法解析
$FRAME.syntax=function () {
    return directiveRegisterInterface.prototype.syntax.apply({
        $pageModel:$FRAME.$pageAssign,
        $pageFilter:$FRAME.$pageFilter
    },arguments);
};

//model双向数据解除销毁
$FRAME.destroyVM=function (data) {
    //检查是否监听数据
    if(typeof data === 'object' && data.__dep__){

    }
}
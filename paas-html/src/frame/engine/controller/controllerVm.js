/**
 * Created by xiyuan on 16-5-17.
 */
function controllerVm(controllerSource,parameter,info){
    var controllerObj=new controllerImage(parameter,info);

    controllerSource.apply(controllerObj,parameter||[]);
    return controllerObj;
}

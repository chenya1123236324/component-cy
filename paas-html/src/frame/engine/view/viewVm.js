/**
 * Created by xiyuan on 16-6-13.
 */
function viewVm(viewSource,pageAssign){
    var viewObj=new viewImage(viewSource,pageAssign);
    viewSource=pageAssign=null;
    return viewObj;
}
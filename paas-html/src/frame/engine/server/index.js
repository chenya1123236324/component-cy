/**
 * Created by xiyuan on 16-5-19.
 */

//@make : start

//服务的管理
Include('serverManage.js');

//服务的实现
Include('serverVm.js');

//服务
Include('serverImage.js');

//服务接口
Include('serverInterface.js');

//http
Include('serverRegister/http.js');

//socket
Include('serverRegister/socket.js');

//jsonp
Include('serverRegister/jsonp.js');

//服务注册配置解析
Include('serverParset.js');

//@make : end

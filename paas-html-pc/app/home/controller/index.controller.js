/**
 * Created by xiyuan on 16-9-26.
 */
controller('index',function(){
    this.title('演示');
    this.assign('scopeTest','yes');

    var loginModel=this.model('@data:login');

    loginModel.readData(function (data) {

        this.assign('pageTitle',data.pageTitle)

    }.bind(this));

    loginModel.method('getData',100);


    this.assign('loginModel',loginModel);


    this.display();
});

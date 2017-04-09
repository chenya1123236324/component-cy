/**
 * Created by xiyuan on 16-9-29.
 */
//下拉框select
controller('form-select',function () {
    var modelData=this.model('@form:form-select');
    this.assign('modelData',modelData);
    this.display();
});

//日期组件
controller('form-date',function () {

    var count=0;
    /*setInterval(function () {
        this.assign('selectData',++count)
    }.bind(this),1000);*/

    this.assign('fn',function (number) {
        return number%2;
    });
    
    this.assign('inputData',{
        event:{
            click:function (event,receive) {
                receive && receive.update();
                console.log('click')
            },
            change:function (event,receive) {
                receive && receive.update(this.value);
                console.log('change')
            }
        }
    })


    this.display();
});

//input
controller('form-input',function(){
    this.display();
})

//tip
controller('tip',function(){
    var stage={
        clickEvent:function(){
        }
    }
    this.assign('stage',stage);
    this.display();
});

//图标选择组件
controller('icons-select',function () {
    var iconsModelData = this.model("@form:icons-select");
    this.assign('iconsModelData',iconsModelData);
    this.display();
})

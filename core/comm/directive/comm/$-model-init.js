/**
 * Created by xiyuan on 16-8-10.
 */
modelInit(function ($app,$appConfig) {

    /**
     * 用于创建空model
     */
    $app.directiveRegister('$ModelInit', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //引入的工具类
        // tools:['object'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var expReg=this.$expression.match(/^\s*([^\.\[\(]+)([\s\S]*)$/),
                modelName=expReg[1],
                watchKey=expReg[2],
                $VM=this.$scope[modelName]=(this.$scope[modelName]  || this.$MODEL());

            //检查是否Model数据(转换常规数据为model类型)
            if(!this.isVM($VM)){
                //创建一个空的绑定型数据(model)
                $VM=this.$MODEL();
                //往数据model中写入相关数据
                $VM.write(watchKey,this.$scope[modelName]);
                //改变环境变量中的数据
                this.$scope[modelName]=$VM;
            }

            $VM.get(watchKey) || $VM.write(watchKey,'2');

            console.log($VM)

        }
    });



});
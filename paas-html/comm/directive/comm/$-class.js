/**
 * Created by xiyuan on 16-8-15.
 */
$class(function ($app, $appConfig) {

    /**
     * 用于表单校验处理
     */
    $app.directiveRegister('$Class', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [
        ],
        //是否显示指令代码
        directiveShow: false,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($json, $hint) {

            var targetElementClassList = this.$element.classList,
                classString;

            //检查是否json格式数据
            if(classString=this.$expression.match(/^\s*\{(.*)\}\s*$/)){
                //提取大括号中的内容
                classString=classString[1];

                //分解json数据
                classString.split(',').forEach(function (str) {
                    var classInfo=str.match(/^\s*(.*?)\s*:\s*(.*?)\s*$/);

                    //提取key与value
                    if(classInfo){
                        var key=classInfo[1],
                            value=classInfo[2];

                        //检查是否字符串
                        if(value.match(/^(['"])[\S]*\1$/)){
                            if(value){
                                targetElementClassList.add(key)
                            }else{
                                targetElementClassList.remove(key)
                            }
                        }else{

                            switch (value){
                                case 'true':
                                    targetElementClassList.add(key);
                                    break;
                                case 'false':
                                    targetElementClassList.remove(key);
                                    break;
                                default:

                                    var expressionInstance = this.syntax(value);
                                    //数据监控(初始化)
                                    expressionInstance.watch(function (classData) {
                                        if(classData){
                                            targetElementClassList.add(key)
                                        }else{
                                            targetElementClassList.remove(key)
                                        }
                                    });
                                    //初次执行挂载监控
                                    expressionInstance.state === "success" && expressionInstance.exec();

                            }

                        }

                    }
                }.bind(this));

            }else{
                //数据监听
                this.watch(function (classData) {

                    //数据转换
                    var classModel=this.$MODEL(classData);

                    //遍历数据
                    classData && Object.keys(classData).forEach(function (classKey) {
                        if(classData[classKey]){
                            targetElementClassList.add(classKey)
                        }else{
                            targetElementClassList.remove(classKey)
                        }

                        //监听class数据
                        classModel.watch(classKey,function (classValue) {
                            if(classValue){
                                targetElementClassList.add(classKey)
                            }else{
                                targetElementClassList.remove(classKey)
                            }
                        })
                    }.bind(this));
                    
                }.bind(this))
            }

        }
    });
})
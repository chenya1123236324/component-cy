/**
 * Created by xiyuan on 16-8-10.
 */
model(function ($app,$appConfig) {

    /**
     * 用于输入框内容双向绑定
     */
    $app.directiveRegister('$Model', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //引入的工具类
        // tools:['object'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            //创建事件
            var modelEvent = document.createEvent('HTMLEvents'/*Event*/);
            modelEvent.initEvent("change", true, true);
            modelEvent.eventType = 'change';


            var comp=this,
                inputElement=this.$element,
                isRewrite=false,
                isModelEvent=false,
                inputVal=inputElement.value,
                expReg=this.$expression.match(/^\s*([^\.\[\(]+)([\s\S]*)$/),
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

            //元素检查
            switch (inputElement.nodeName){
                case 'INPUT':
                    switch ( inputElement.type){
                        case 'radio':
                        case 'checkbox':
                            inputVal=inputElement.checked;
                            break;
                        default:
                    }
                    break;
                default:


            }

            //检查文本框是否有值,并赋值给$-model
            inputElement.value && $VM.write(watchKey,Number(inputVal)||inputVal);

            //初始化赋值给VM
            $VM.get(watchKey) && (inputElement.value=$VM.get(watchKey));
            // $VM.write(watchKey,inputElement.value);

            //键盘事件监听
            /*inputElement.addEventListener('keyup',function () {
                isRewrite=true;
                //更改数据模型值
                $VM.write(watchKey,this.value);
                isRewrite=false;
            });

            inputElement.addEventListener('keydown',function () {
                isRewrite=true;
                //更改数据模型值
                $VM.write(watchKey,this.value);
                isRewrite=false;
            });*/

            inputElement.addEventListener('input',function () {
                isRewrite=true;
                //更改数据模型值
                $VM.write(watchKey,Number(this.value)||this.value);
                isRewrite=false;
            });

            inputElement.addEventListener('change',function () {

                if(!isModelEvent){
                    var val=this.value;
                    isRewrite=true;

                    //元素检查
                    switch (this.nodeName){
                        case 'INPUT':
                            switch ( this.type){
                                case 'radio':
                                case 'checkbox':
                                    val=this.checked;
                                    break;
                            }
                            break;

                    }

                    //更改数据模型值
                    $VM.write(watchKey,Number(val)||val);
                    isRewrite=false;
                }
            });

            //监控数据
            $VM.watch(watchKey,function (val) {

                if([undefined,null].in(val) !== -1){
                    return;
                }
                if(!isRewrite){
                    isModelEvent=true;
                    //元素检查
                    switch (this.nodeName){
                        case 'INPUT':
                            switch ( this.type){
                                case 'radio':
                                case 'checkbox':
                                    inputElement.value=this.checked;
                                    break;
                                default:
                                    inputElement.value=Number(val)||val;
                            }
                            break;
                        default:
                            inputElement.value=Number(val)||val;

                    }

                    //FORME节点分派一个合成事件
                    inputElement.dispatchEvent(modelEvent);
                    isModelEvent=false;
                }
            }.bind(this));

        }
    });



});
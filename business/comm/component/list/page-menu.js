/**
 * Created by xiyuan on 16-9-27.
 */

pageMenu(function ($app, $appConfig) {

    //input组件注册
    $app.componentRegister('pageMenu', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            var oldElement = this.$element;

            //第一种,解析data属性内容 (用于语法解析)
            var expressionInstance = this.syntax(this.attrs.data);

            oldElement.innerHTML = '+++++++++';

            //解析的语法数据监控(初始化)
            expressionInstance.watch(function (menuData) {
                console.log(menuData, 'yes')
            });

            //初次执行挂载监控
            expressionInstance.state === "success" && expressionInstance.exec();


            //第二种改变语法表达式 (只能对当前的语法进行监听)
            this.$expression=this.attrs.data;
            this.watch(function (data) {
                console.log('watch:',data)
            });

            //第三种 (只可以监控数据)
            this.watchAttrData('data',function (s) {
                console.log(s)
            });

            //第四种(可以监控数据并且可以改写数据)
            var dataVM=this.attrToVM('data');

            dataVM.watch(function (data) {
                console.log(data,'>>>')
            });



            //对外提供接口
            if (typeof this.attrs.api === 'string') {
                var expReg = this.attrs.api.match(/^\s*([^\.\[\(]+)([\s\S]*)$/),
                    modelName = expReg[1],
                    watchKey = expReg[2],
                    $VM = this.$scope[modelName] = (this.$scope[modelName] || this.$MODEL()),
                    interface = {
                        update: function () {
                            console.log('update+++++')
                        },
                        show: function () {
                            oldElement.style.display = 'block';
                        },
                        hidden: function () {
                            oldElement.style.display = 'none';
                        }
                    };


                $VM.write(watchKey, interface);


            }


        }
    });


    //input组件注册
    $app.componentRegister('test', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            var oldElement = this.$element,
                //解析data属性内容
                expressionInstance = this.syntax(this.attrs.data);

            oldElement.innerHTML = 'test';

            //解析的语法数据监控(初始化)
            expressionInstance.watch(function (data) {

                var count = 0;

                oldElement.addEventListener('click', function () {

                    ++count % 2 ? data.hidden() : data.show();

                    console.log('----', count % 2)
                }, false);

            });


            //初次执行挂载监控
            expressionInstance.state === "success" && expressionInstance.exec();


        }
    });


});
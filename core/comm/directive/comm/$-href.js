/**
 * Created by xiyuan on 16-8-31.
 */
href(function ($app, $appConfig) {
    $app.directiveRegister('$Href', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //关闭表达式的运算
        computations: false,
        //引入的工具类
        tools:['object'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($obj) {
            var element=this.$element,
                hrefArray=[],
                watchStroage={},
                href=this.$expression,
                tmpIndex=0,
                regExp=/\{\{([^\{][^(\}\})]*)\}\}/g;

            //提取字符中的监听变量
            href.replace(regExp,function (str,watchVal,index) {
                //提取字符串中的前部分路径
                hrefArray.push(href.substring(tmpIndex,index));

                //提取的字符添加入监控中
                watchStroage[watchVal]={
                    watch:watchVal,
                    value:null
                };

                //获取数据相关信息
                var expReg=watchVal.match(/^\s*([^\.\[\(]+)([\s\S]*)$/),
                    modelName=expReg[1],
                    watchKey=expReg[2],
                    //数据源
                    $VM=this.$scope[modelName];

                //检查是否普通数据
                if($VM && !$VM.__isModel__){
                    watchStroage[watchVal].value=$obj.get($VM,watchKey);
                }else if(typeof $VM === "undefined" || $VM.get){
                    //创建一个空的数据模型
                    $VM= $VM||this.$MODEL();

                    //初始化赋值给VM
                    watchStroage[watchVal].value=$VM.get(watchKey)|| null;

                    //监控数据
                    $VM.watch(watchKey,function (val) {
                        watchStroage[watchVal].value=val;
                        getHref();
                    }.bind(this));
                }

                tmpIndex=index+str.length;

                hrefArray.push(watchStroage[watchVal]);

                return str;
            }.bind(this));

            hrefArray.push(href.substring(tmpIndex));

            //href路径运算
            function getHref() {
                var i=~0,
                    val,
                    path='',
                    len= hrefArray.length;
                while (++i<len){
                    if(typeof (val=hrefArray[i]) === 'object'){
                        if(val.value === null){
                            return ;
                        }
                        path+=val.value;
                    }else{
                        path+=val;
                    }
                }
                element.href=path;
            };
            getHref();

        }
    })

});
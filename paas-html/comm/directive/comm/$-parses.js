/**
 * Created by xiyuan on 16-8-31.
 */
parses(function ($app, $appConfig) {
    $app.directiveRegister('$Parses', {
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
                attrName=this.type.toLowerCase(),
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

                this.watchSyntaxData(watchVal,function (data) {
                    watchStroage[watchVal].value=data;
                    getHref();
                });

                tmpIndex=index+str.length;

                hrefArray.push(watchStroage[watchVal]);

                return str;
            }.bind(this));

            hrefArray.push(href.substring(tmpIndex));

            //路径运算
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
                switch (attrName){
                    default:
                        element.setAttribute(attrName,path)
                }
            }
            getHref();

        }
    })

});
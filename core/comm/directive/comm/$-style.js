/**
 * Created by xiyuan on 17-1-12.
 */
style(function ($app, $appConfig) {

    function renderStyle(styles,ele) {
        var style=ele.style;
        styles.forEach(function (styleVal,styleName) {
            style[styleName]=styleVal;
        })
    }

    $app.directiveRegister('$Style', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($obj) {
            var ele=this.$element;

            this.watch(function (styles) {
                console.log(styles,'yes')
                renderStyle(styles,ele);
            })

        }
    })

});
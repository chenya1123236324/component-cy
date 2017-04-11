/**
 * Created by xiyuan on 17-1-5.
 */
loadingLineScalePulseOut(function ($app, $appConfig) {

    var template='<div class="loading-line-scale-pulse-out">' +
        '<div></div><div></div><div></div><div></div><div></div>' +
        '<div>{{text}}</div>' +
        '</div>';

    //loading-line-scale-pulse-out组件注册
    $app.componentRegister('loadingLineScalePulseOut', {
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var oldElement=this.$element;

            oldElement.parentNode.replaceChild(this.viewVM(template,{text:this.attrs['config']||'加载中...'}),oldElement);
        }
    });

});
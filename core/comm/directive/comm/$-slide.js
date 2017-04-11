/**
 * Created by xiyuan on 16-12-12.
 */
slide(function ($app, $appConfig) {
    //raf动画帧率回调
    function reqAnimationFrame(handleFn) {
        return (window['requestAnimationFrame'] || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        })(handleFn);
    }

    //用于展示或隐藏元素
    $app.directiveRegister('$Slide', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var element=this.$element,
                offsetHeight,
                isOpen,
                classList=element.classList;

            classList.add('c-slide');

            element.addEventListener('transitionend',function (event) {
                event.stopPropagation();
                if(isOpen && event.propertyName === "height"){
                    element.style.height='auto';
                }
            },false);

            this.watch(function (showData) {
                if(showData){
                    isOpen=true;
                    element.style.height=offsetHeight?offsetHeight+'px':'auto';
                    if(!offsetHeight){
                        setTimeout(function () {
                            offsetHeight=element.offsetHeight;
                        },50);
                    }

                }else{
                    offsetHeight=element.offsetHeight;
                    isOpen=false;
                    if(!offsetHeight){
                        setTimeout(function () {
                            offsetHeight=element.offsetHeight;
                            reqAnimationFrame(function () {
                                element.style.height='0px';
                            });
                        },50);
                    }else{
                        element.style.height=element.offsetHeight+'px';
                        reqAnimationFrame(function () {
                            element.style.height='0px';
                        });
                    }
                }
            });
        }
    })

});
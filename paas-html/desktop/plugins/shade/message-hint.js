define(function () {
    var idFlag=null,
        //数据加载 动画容器
        shadeElement=document.createElement('div');

    shadeElement.className='shade-message-hint';
    shadeElement.innerHTML='<div class="message-Text">加载中...</div>';

    var textElement=shadeElement.querySelector('.message-Text'),

    //事件兼容
    isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined,
    transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';


    //raf动画帧率回调
    function reqAnimationFrame(handleFn) {
        return (window['requestAnimationFrame'] || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        })(handleFn);
    }

    //动画关闭事件
    function transitionEnd() {
        if(!this.classList.contains('open')){
            this.parentNode.removeChild(this);
            this.removeEventListener(transitionEndEvent, transitionEnd, false);
        }
    }

    /**
     * text 用于提示文本
     * flg  标识提示ID (可选)
     * isClose 用于触发是否关闭(可选)
     */
    return function(text,flgId,isClose){
        if(isClose && idFlag === flgId && typeof flgId !== 'undefined'){
            shadeElement.parentNode && shadeElement.parentNode.removeChild(shadeElement);
            idFlag=null;
            return;
        }else if(flgId && isClose){
            return;
        }else if(flgId !== 'undefined'){
            idFlag = flgId
        }

        textElement.innerHTML=text||'消息提示';
        shadeElement.addEventListener(transitionEndEvent,transitionEnd,false);
        document.querySelector('body>div').appendChild(shadeElement);

        reqAnimationFrame(function () {
            reqAnimationFrame(function () {
                shadeElement.classList.add('open');
            })
        });

        setTimeout(function(){
            shadeElement.classList.remove('open');
        },1000)
    }
});
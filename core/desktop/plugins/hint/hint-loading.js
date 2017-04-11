/**
 * Created by xiyuan on 17-2-13.
 */
define(function () {

    var _messageEle=document.createElement('div');
    _messageEle.className='hint-loading';
    _messageEle.innerHTML='<div class="message-main"></div>';
    
    function transitionEnd() {
        if(!this.classList.contains('open')){
            this.parentNode.removeChild(this);
            this.removeEventListener(transitionEndEvent, transitionEnd, false);
        }
    }

    return function exports(string) {

        //元素构建
        var messageEle=_messageEle.clone(true),
            $interface={
                state:false,
                open:function () {
                    document.body.appendChild(messageEle);
                    messageEle.addEventListener(transitionEndEvent,transitionEnd,false);

                    requestAnimationFrame(function () {
                        requestAnimationFrame(function () {
                            messageEle.classList.add('open');
                            $interface.state=true;
                        })
                    });
                },
                close:function () {
                    messageEle.classList.remove('open');
                    $interface.state=false;
                }
            };

        messageEle.querySelector('.message-main').innerHTML='<span class="loading-spinners dots"></span>'+(string||'加载中')+'<span class="loading-spinners"></span>';

        return $interface
    }
});
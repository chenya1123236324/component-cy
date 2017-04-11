/**
 * Created by xiyuan on 17-2-13.
 */
define(function () {

    var _messageEle=document.createElement('div');
    _messageEle.className='hint-message';
    _messageEle.innerHTML='<div class="message-main"></div>';
    
    function transitionEnd() {
        if(!this.classList.contains('open')){
            this.parentNode.removeChild(this);
            this.removeEventListener(transitionEndEvent, transitionEnd, false);
        }
    }

    return function exports(string,type,time) {

        //元素构建
        var messageEle=_messageEle.clone(true);
        messageEle.classList.add(type||'success');
        messageEle.querySelector('.message-main').innerHTML=string||'';
        document.body.appendChild(messageEle);

        messageEle.addEventListener(transitionEndEvent,transitionEnd,false);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                messageEle.classList.add('open');
                setTimeout(function(){
                    messageEle.classList.remove('open');
                },parseInt(time)?parseInt(time):3000)
            })
        });

    }
});
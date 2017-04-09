/**
 * Created by xiyuan on 16-9-26.
 */
pageToggleRegister(function($app){

    //页面切换注册
    $app.pageToggleRegister('crm-pc', {
        layout: '',
        init:function () {

        },
        animate: {
            default: function () {

                var appBody = document.querySelector('body');

                return {
                    back: function (pageContainerElement) {
                        appBody.innerHTML='';
                        appBody.appendChild(pageContainerElement);

                        // var tmp=document.createElement('body');
                        // tmp.appendChild(pageContainerElement);
                        //
                        // document.querySelector('body').parentNode.replaceChild(tmp,document.querySelector('body'));

                    },
                    make: function (pageContainerElement) {

                        //页面内容分配
                        appBody.innerHTML = '';
                        appBody.appendChild(pageContainerElement);

                        // var tmp=document.createElement('body');
                        // tmp.appendChild(pageContainerElement);
                        //
                        // document.querySelector('body').parentNode.replaceChild(tmp,document.querySelector('body'));

                    }
                }

            }
        }
    });


});
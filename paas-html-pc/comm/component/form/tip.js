/**
 * Created by 贝贝 on 2016/11/1.
 */
tip(function($app, $appConfig){
    //拼接html
    function renderTip(type,copyElement){
        var tipHtml = '';
        if(type=='error'|| type =='success'){
            tipHtml = '<div class="tip tip-'+type+'">'+copyElement.innerHTML+'</div>';
        }else if(type=='notice'){
            tipHtml ='<div class="tip tip-notice">' +
                '<i class="iconfont icon-jinggaofull"></i> ' +
                '<span>'+copyElement.innerHTML+'</span>' +
                '<span class="close" $-on:click="action.closeTip"><i class="iconfont icon-chenghao"></i></span></div>';
        }
        return tipHtml;
    }

    //tip组件注册
    $app.componentRegister('tip',{
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools:[

        ],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var oldElement = this.$element,
                copyElement = this.elementCopy,
                tip='',
                type = oldElement.getAttribute('type');

            switch(type){
                case 'error':
                    tip = renderTip('error',copyElement);
                    break;
                case 'success':
                    tip = renderTip('success',copyElement);
                    break;
                case 'notice':
                    tip = renderTip('notice',copyElement);
            }

            var scope = {
                action:{
                    //点击notice的x隐藏提示
                    closeTip:function(){
                        var notice = this.parentNode.parentNode.parentNode.querySelector('.tip-notice');
                        notice.style.display = 'none';
                    }
                }
            }

            //向外部提供的接口(样式里tip的透明度改为0,这里向外提供接口)
            var interface={
                show:function(){
                    console.log('api',this)
                    this.style.opacity = 1;
                    var i = 0;
                    if(this.getAttribute('type')!='notice') {
                        this.classList.add('fadeOut');
                        while(this.style.opacity<=i){
                            this.classList.remove('fadeOut');
                        }
                    }
                }
            }


            oldElement.parentNode.replaceChild(this.viewVM(tip,scope),oldElement);

        }
    })
})
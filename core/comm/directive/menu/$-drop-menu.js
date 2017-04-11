/**
 * Created by xiyuan on 16-12-5.
 */
dropMenu(function ($app, $appConfig) {

    function render(cmd,menuData) {
        var showFlag=false,
            filter={
                templateHandle:function (menu) {

                    return {
                        template:menu.template||menu.content,
                        scope:menu.scope,
                        filter:menu.filter,
                    }
                }
            },
            template='<div class="drop-menu-container" $-class="{right:config.position == \'right\',left:config.position == \'left\',top:config.position == \'top\',bottom:config.position == \'bottom\'}"><ul><li $-for="menu in list" $-events="menu.events"><template config="menu|templateHandle"></template></li></ul></div>',
            menuContainer=cmd.viewVM(template,menuData,filter).firstChild,
            eventMange={
                mouseover:function (event) {
                    showFlag=true;
                    event.stopPropagation()
                },
                mouseout:function (event) {
                    showFlag=false;
                    setTimeout(function () {
                        showFlag || removeEvent();
                    },10);
                }
            },
            bindEvent=function () {
                menuContainer.addEventListener('mouseover',eventMange.mouseover,false);
                menuContainer.addEventListener('mouseout',eventMange.mouseout,false);
            },
            removeEvent=function () {
                menuContainer.removeEventListener('mouseover',eventMange.mouseover,false);
                menuContainer.removeEventListener('mouseout',eventMange.mouseout,false);
                document.body.contains(menuContainer) && document.body.removeChild(menuContainer)
            };

        cmd.$element.addEventListener('mouseover',function (e) {
            bindEvent();
            showFlag=true;
            //获取组件距离视窗的相关数据
            var boundingClientRect=this.getBoundingClientRect();

            switch (menuData.config && menuData.config.position){
                case 'right':
                    menuContainer.style.top=( document.body.scrollTop + boundingClientRect.top + boundingClientRect.height - cmd.$element.offsetHeight )+'px';
                    menuContainer.style.left=(document.body.scrollLeft + boundingClientRect.left + cmd.$element.offsetWidth)+'px';
                    break;
                default:
                    menuContainer.style.top=( document.body.scrollTop + boundingClientRect.top + boundingClientRect.height - cmd.$element.offsetHeight/2)+'px';
                    menuContainer.style.left=(document.body.scrollLeft + boundingClientRect.left)+'px';
                    menuContainer.style.paddingTop=(cmd.$element.offsetHeight/2 + 3)+'px';
            }

            document.body.appendChild(menuContainer);

        },false);

        cmd.$element.addEventListener('mouseout',function (e) {
            showFlag=false;
            setTimeout(function () {
                showFlag || removeEvent();
            },10);
        },false)
    }

    $app.directiveRegister('$DropMenu', {
        //指令优先级 降序执行
        priority: 0,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            this.$element.classList.add('drop-menu');

            this.watch(function (conf) {
                render(this,conf);
            }.bind(this));
        }
    });
});
/**
 * Created by xiyuan on 16-12-28.
 */
appMenu(function ($app, $appConfig) {

    function getStyle(el, styleName) {
        return el.style[styleName] ? el.style[styleName] : el.currentStyle ? el.currentStyle[styleName] : window.getComputedStyle(el, null)[styleName];
    }

    var template='<ul class="app-menu-content" $-bind:style="menuList|styleHandle:[$,innerConf]" $-class="{loading:!innerConf.isInit}"><div $-if="!innerConf.isInit"><span class="loading-spinners dots"></span><p>加载中<span class="loading-spinners"></span></p></div><li $-for="menuInfo in menuList"><a $-bind:href="menuInfo.href"><span>{{menuInfo.name}}</span></a><template config="menuInfo.list|menuGroupHandle"></template></li></ul>',
        filter={
            styleHandle:function (menuList,innerConf) {
                var rowLen=0,
                    rowNumber;
                innerConf.isInit=true;

                menuList.forEach(function (info) {
                    rowLen++;
                    info.list && info.list.forEach(function () {
                        rowLen++;
                    })
                });

                rowNumber= Math.max(Math.min(Math.ceil(rowLen/12),5),2);

                rowNumber =rowLen>15 && rowNumber === 2 ? 3 :rowNumber;
                rowNumber =rowLen === 1 ? 1 :rowNumber;

                return 'column-count:'+rowNumber+';-moz-column-count:'+rowNumber+';-webkit-column-count:'+rowNumber+';'
            },
            menuGroupHandle:function (list) {
                return list && list.length ?{
                        template:'<ul class="app-menu-group-content"><li $-for="info in list"><a $-bind:href="info.href"><i $-parses:style="color:{{info.iconColor}};" $-parses:class="iconfont icon-{{info.icon}}"></i><span>{{info.name}}</span></a></li></ul>',
                        scope:{
                            list:list
                        }
                    }:{}
            }
        };

    $app.directiveRegister('$AppMenu', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var menu = this.$element,
                menuContent;
            menu.classList.add('app-menu');
            ['relative','absolute'].in(getStyle(menu, 'position')) === -1 && (menu.style.position='relative');

            this.watch(function (menuList) {
                var _menuContent=this.viewVM(template,{
                    menuList:menuList,
                    innerConf:{
                        isInit:false
                    }
                },filter).firstChild;

                menuContent ? menu.replaceChild(_menuContent,menuContent):menu.appendChild(_menuContent);
                menuContent=_menuContent;
                _menuContent=null;

            }.bind(this))

        }
    });
});
/**
 * Created by xiyuan on 16-10-8.
 */

menuMaster(function ($app, $appConfig) {


    /**
     * 菜单组件解析渲染
     * @param data
     */
    function renderMenu(data,storageData){
        //文档片段(用于存储元素)
        var masterMenu='<ul>';

        //检查
        if(data instanceof Array){
            data.forEach(function (menuData) {
                masterMenu+=createMenu(menuData,storageData);
            })
        }

        return masterMenu+'</ul>';
    }

    /**
     * 创建菜单元素
     * @param menuData
     */
    function createMenu(menuData,storageData) {
        var assign=storageData.assign,
            eventsDirective='',
            directiveKey='';

        //事件检查
        if(typeof menuData.events === 'object'){
            Object.keys(menuData.events).forEach(function (eventName) {
                directiveKey='event'+(++storageData.uid);
                assign[directiveKey]=menuData.events[eventName];
                eventsDirective+=' $-on:'+eventName+'="'+directiveKey+'"';
            })
        }

        console.log(assign,directiveKey,eventsDirective);

        var menuElement='<li'+eventsDirective+'>{{count}}<div class="menu-container">';

        //检查是否有图标
        if(menuData.icon){
            menuElement+='<i class="iconfont icon-'+menuData.icon+'"></i>'
        }

        if(menuData.label){
            menuElement+='<span>'+menuData.label+'</span>'
        }

        //检查是否是菜单组
        if(menuData.isGroup){
            menuElement+=renderMenu(menuData.list,storageData);
        }



        return menuElement+'</div></li>';
    }


    //input组件注册
    $app.componentRegister('menuMaster', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            //组件原有的标签
            var oldElement=this.$element,
                //数据存储器
                storageData={
                    uid:0,
                    assign:{
                        count:'88'
                    }
                };

                window.storageData=storageData;

            //监听获取属性中的数据
            this.watchAttrData('data',function (data) {
                var newMenu=document.createElement('div'),
                    menuHtml=renderMenu(data,storageData)+'<input type="text" $-model="count">';

                newMenu.className="menu-master";

                newMenu.appendChild(this.viewVM(menuHtml,storageData.assign));
                //元素替换
                oldElement.parentNode.replaceChild(newMenu,oldElement);
            }.bind(this))


        }
    })

});
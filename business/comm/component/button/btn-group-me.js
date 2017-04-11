/**
 * Created by chenya on 2016/10/12.
 */
//注册按钮组件
btnGroupMe(function ($app, $appConfig) {
    /**
     * 按钮组件解析渲染
     * @param data
     */
    function renderbtnGroupMe(data, storageData) {
        //文档片段(用于存储元素)
        //检查data是否是object
        if (typeof data === "object") {
            //拼接按钮组件html
            var mosaicBtnGroupMe = '';
            //检查data是否是数组
            if (data instanceof Array) {
                data.forEach(function (btnGroupMeData) {
                    mosaicBtnGroupMe += createBtnGroupMe(btnGroupMeData, storageData);
                })
            }
            return mosaicBtnGroupMe
        }
    }
    /**
     * 创建按钮元素
     * @param btnGroupMeData
     */
    function createBtnGroupMe(btnGroupMeData, storageData) {
        var assign = storageData.assign,
            eventsDirective = '',
            directiveKey = '',
            iconEventsDirective = '',
            iconDirectiveKey = '';
        //遍历时每个list对象下的值
        var listData = '';
        //按钮节点
        var buttonElement = '';
        //遍历list
        btnGroupMeData.list.forEach(function (listObject) {
            //获取得到事件标识名称
            var eventIdentifierName = btnGroupMeData.eventIdentifierName;
            //如果model层没有设置eventIdentifierName属性或者为空，则默认事件标识名称为btnGroupMeEvent
            if (eventIdentifierName == "" || eventIdentifierName == undefined) {
                eventIdentifierName = "btnGroupMeEvent";
            }
            //普通事件检查
            if (typeof listObject.events === 'object') {
                Object.keys(listObject.events).forEach(function (eventName) {
                    directiveKey = eventIdentifierName + (++storageData.uid);
                    assign[directiveKey] = function (e) {
                        listObject.events[eventName].call(this, e, storageData.receiveData.get())
                    };
                    eventsDirective = ' $-on:' + eventName + '="' + directiveKey + '"';
                })
            }
            //图标事件检查
            if (typeof listObject.iconEvents === 'object') {
                Object.keys(listObject.iconEvents).forEach(function (iconEventName) {
                    iconDirectiveKey = "icon" + eventIdentifierName + (++storageData.uid);
                    assign[iconDirectiveKey] = listObject.iconEvents[iconEventName];
                    iconEventsDirective = ' $-on:' + iconEventName + '="' + iconDirectiveKey + '"';
                })
            }
            //检查是否有class
            if (listObject.class) {
                if (btnGroupMeData.isGroup) { //如果是按钮组，需要添加两个按钮之间的间距
                    //给按钮添加绑定事件和class和按钮之间的间距
                    btnGroupMeData.spacing = btnGroupMeData.spacing || 0;
                    buttonElement += '<button ' + eventsDirective + ' class="' + listObject.class + '" style="margin-left:' + btnGroupMeData.spacing + ';padding:' + listObject.padding + ';" type="button">';
                } else {
                    //给按钮添加绑定事件和class
                    buttonElement += '<button ' + eventsDirective + ' class="' + listObject.class + ';padding:' + listObject.padding + ';" type="button">';
                }
            }
            //检查是否有图标
            if (listObject.icon) { //有图标
                if (listObject.align == "left") { //文字居左
                    //检查是否有按钮文字
                    if (listObject.label) {
                        buttonElement += listObject.label || "";
                    }
                    buttonElement += '<i ' + iconEventsDirective + '  class="iconfont icon-' + listObject.icon + '" style="padding-left:4px"></i>'
                } else if (listObject.align == "right") { //文字居右
                    buttonElement += '<i ' + iconEventsDirective + '  class="iconfont icon-' + listObject.icon + '" style="padding-right:4px"></i>'
                    //检查是否有按钮文字
                    if (listObject.label) {
                        buttonElement += listObject.label || "";
                    }
                }
            } else {
                //检查是否有按钮文字
                if (listObject.label) {
                    buttonElement += listObject.label || "";
                }
            }
            buttonElement + '</button>';
        })
        //返回拼接后创建按钮元素
        return buttonElement;
    }
    //btn-group-me组件注册
    $app.componentRegister('btnGroupMe', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {

            //组件原有的标签
            var oldElement = this.$element,
                This=this,
            //数据存储器
                storageData = {
                    uid: 0,
                    assign: {},
                    //接收数据
                    receiveData: this.attrToVM('receive')
                };
            //监听获取属性中的数据
            this.watchAttrData('data', function (data) {
                var newElement, btnGroupMeHtml;
                var style = "";
                //遍历data
                data.forEach(function (dataObject) {
                    //创建一个新的div标签
                    newElement = document.createElement('div');
                    //给这个新的div标签添加一个class
                    newElement.className = "btn-group-me";
                    //获取得到css样式
                    var styleDate = dataObject.style;
                    //遍历拼接css样式
                    for (var key in styleDate) {
                        style += key + ':' + styleDate[key] + ';';
                    }
                    //设置最外层div的css样式，便于外部自定义
                    newElement.setAttribute('style', style);
                    //按钮组件解析渲染
                    btnGroupMeHtml = renderbtnGroupMe(data, storageData);
                })
                //数据转换
                newElement.appendChild(This.viewVM(btnGroupMeHtml, storageData.assign));
                //元素替换
                oldElement.parentNode.replaceChild(newElement, oldElement);
            }.bind(this))
        }
    })
});
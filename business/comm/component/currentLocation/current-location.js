/**
 * Created by chenya on 2016/10/19.
 */
//注册当前位置组件
currentLocation(function ($app, $appConfig) {
    /**
     * 当前位置解析渲染
     * @param data
     */
    function renderCurrentLocation(data,storageData){
        //文档片段(用于存储元素)
        //拼接当前位置组件html
        var mosaicCurrentLocation = '';
        //检查data是否是数组
        if (data instanceof Array) {
            data.forEach(function (currentLocationData) {
                mosaicCurrentLocation += createCurrentLocation(currentLocationData, storageData);
            })
        }
        return mosaicCurrentLocation
    }

    /**
     * 创建当前位置元素
     * @param currentLocationData
     */
    function createCurrentLocation(currentLocationData,storageData) {
        var assign=storageData.assign,
            eventsDirective='',
            directiveKey='';

        //遍历时每个list对象下的值
        var listData='';
        //当前位置节点
        var currentLocationElement='';
        //console.log("-------------Model返还回来的数据------------------");
        //Model返还回来的数据
        //console.log(JSON.stringify(currentLocationData));
        //console.log("-------------Model返还回来的数据------------------");

        currentLocationElement += '<div class="locationLeft" style="background:' + currentLocationData.leftColor + ';border-right:' + currentLocationData.leftColor + '">';
        //遍历list绑定事件
        currentLocationData.list.forEach(function (listObject) {
            //事件检查
            if (typeof listObject.events === 'object') {
                Object.keys(listObject.events).forEach(function (eventName) {
                    directiveKey = 'currentLocationEvent' + (++storageData.uid);
                    assign[directiveKey] = listObject.events[eventName];
                    eventsDirective = ' $-on:' + eventName + '="' + directiveKey + '"';
                })
            }

            //检查是否是当前位置
            if (listObject.isLocation) {
                //左侧内容
                //currentLocationElement+='<span><a id="currentLocationName" href="'+listObject.href+'">'+listObject.locationName+'</a></span>';
                currentLocationElement += '<span><a id="currentLocationName" $-href={{locationHref}}>{{locationName}}</a></span>';

                //左侧内容图标
                currentLocationElement += '<i class="iconfont icon-sjiantou04-copy  arrow-icon" $-on:click="assign.iconChanges"></i>';
                currentLocationElement += '</div>';
                currentLocationElement += '<div class="locationRight slidingToRight" style="background:' + currentLocationData.rightColor + ';"  >';
            }
            //else{
            currentLocationElement += '<div class="locationFloat" style=""  >';
            currentLocationElement += '<span style="border-right:' + currentLocationData.verticalLine + ';"><a href="' + listObject.href + '" $-on:click="assign.isHideClick">' + listObject.locationName + '</a></span>';
            currentLocationElement += '</div>';
            //}
        })

        currentLocationElement+='</div>';
        currentLocationElement += '</div>';
        //返回拼接后创建按钮元素
        return currentLocationElement;
    }

    //current-location组件注册
    $app.componentRegister('currentLocation', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var attrs = this.attrs;
            //组件原有的标签
            var oldElement=this.$element;

            //window.storageData=storageData;
            //监听获取属性中的数据
            this.watchAttrData('data',function (data) {
                var newElement,currentLocationHtml;

                //数据存储器
                storageData={
                    uid:0,
                    locationName: "公海客户",
                    locationHref: "#1",
                    assign:{
                        //点击显示隐藏右侧内容
                        isHideClick:function(){
                            console.log(this.innerHTML);
                            console.log(this.getAttribute("href"));
                            document.querySelector("#currentLocationName").href = this.getAttribute("href");
                            document.querySelector("#currentLocationName").innerHTML = this.innerHTML;
                            storageData.locationName=this.innerHTML;
                            storageData.locationHref=this.getAttribute("href");
                            //得到按钮图标
                            var arrowIcon=document.querySelector(".arrow-icon");
                            //右侧当前位置内容
                            var  locationRight= document.querySelector(".locationRight");
                            //箭头图标变换
                            arrowIcon.classList.toggle("icon-sjiantou04-copy");
                            arrowIcon.classList.toggle("icon-sjiantou02");
                            //右侧当前位置内容展开收缩
                            locationRight.classList.toggle("slidingToLeft");
                            locationRight.classList.toggle("slidingToRight");
                        },
                        //左侧图标点击时候的变化
                        iconChanges:function(){
                            //得到按钮图标
                            var arrowIcon=document.querySelector(".arrow-icon");
                            //右侧当前位置内容
                            var  locationRight= document.querySelector(".locationRight");
                            //箭头图标变换
                            arrowIcon.classList.toggle("icon-sjiantou04-copy");
                            arrowIcon.classList.toggle("icon-sjiantou02");
                            //右侧当前位置内容展开收缩
                            locationRight.classList.toggle("slidingToLeft");
                            locationRight.classList.toggle("slidingToRight");
                        }
                    }
                };

                //创建一个新的div标签
                newElement=document.createElement('div');
                //给这个新的div标签添加一个class
                newElement.className="currentLocation";

                //当前位置组件解析渲染
                currentLocationHtml=renderCurrentLocation(data,storageData);

                //数据转换
                newElement.appendChild(this.viewVM(currentLocationHtml,storageData));
                //元素替换
                oldElement.parentNode.replaceChild(newElement,oldElement);

            }.bind(this))
        }
    })
});
/**
 * Created by chenya on 2016/11/21.
 */

//注册dashboard组件
dashboard(function ($app,$appConfig) {
    /**
     * dashboard组件解析渲染
     * @param data
     */
    function renderDashboard(data,scope){
        //文档片段(用于存储元素)
        //拼接dashboard组件html
        var mosaicDashboard='';
        mosaicDashboard=createDashboard(data,scope);
        return mosaicDashboard
    }

    /**
     * 创建dashboard元素
     * @param data
     * @param scope
     */
    function createDashboard(data,scope) {

        //console.log("-------------dashboardModel返还回来的数据------------------");
        ////dashboardModel返还回来的数据
        //console.log(JSON.stringify(data.dashboardData.list));
        //console.log(scope);
        //console.log("-------------dashboardModel返还回来的数据------------------");

        //dashboard用户自定义样式
        var style=data.dashboardData.style;
        //dashboard数据列表
        var list=data.dashboardData.list;
        var assign=scope.assign,
            eventsDirective='',
            dashboardKey='';
        //dashboard节点
        var dashboardElement='';
        //dashboard自定义样式
        var styleData="";
        //dashboard高度
        var dashboardHeight=style.height ||"320px";
        //内容区高度
        var contentHeight=(parseInt(dashboardHeight)-100)+"px";
        //dashboard自定义样式
        if( style!=undefined ){
            Object.keys(style).forEach(function(key){
                styleData+=key+':'+style[key]+';';
            });
        }

        dashboardElement+='<div class="dashboard-content">';
                //遍历dashboard数据列表
                Object.keys(list).forEach(function(key){
                    //图标颜色
                    var iconColor=list[key].iconColor ||"#505050";
                    //dashboard事件绑定
                    Object.keys(list[key].events).forEach(function(eventName){
                        dashboardKey= "dashboard"+(++scope.uid);
                        assign[dashboardKey]=list[key].events[eventName];
                        eventsDirective=' $-on:'+eventName+'="'+dashboardKey+'"';
                    });

                    dashboardElement+='<div class="dashboard-ibox" data-order="'+list[key].order+'" style="width:'+list[key].layout+';">' +
                        '<div class="dashboard-ibox-content" style="'+styleData+'">';

                            if(!list[key].showHead){
                                 <!--内容-->
                                dashboardElement+= '<div class="ibox-content">' +
                                    '<div class="ibox-content-data" style="height:'+(parseInt(dashboardHeight)-40)+"px"+';">' +
                                    '</div>' +//ibox-content-data
                                    '</div>';//ibox-content

                            }else{
                                <!--头部标题-->
                                dashboardElement+='<div class="ibox-title">' +
                                    <!--名称-->
                                '<div class="ibox-name">' +
                                '<span style="color:'+iconColor+';"><i class="iconfont '+list[key].icon+'"></i></span>' +
                                '<span>'+list[key].name+'</span>' +
                                '<span><a href="'+list[key].link+'"><i class="iconfont icon-right"></i></a></span>' +
                                '</div>' +//ibox-name
                                    <!--工具-->
                                '<div class="ibox-tools">' +
                                '<i class="iconfont  icon-chenghao" '+eventsDirective+'></i>' +
                                '</div>' +//ibox-tools
                                '</div>' +//ibox-title
                                    <!--内容-->
                                '<div class="ibox-content">' +
                                '<div class="ibox-content-data" style="height:'+contentHeight+';">' +
                                '</div>' +//ibox-content-data
                                '</div>';//ibox-content
                            }
                    dashboardElement+='</div>' +//dashboard-ibox-content
                        '</div>';//dashboard-ibox
                });
        dashboardElement+='</div>';//dashboard-content
        //返回拼接后创建dashboard元素
        return dashboardElement;
    }
    //dashboard组件注册
    $app.componentRegister('dashboard', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //组件原有的标签
            var oldElement=this.$element;
            var That =this;
            //监听获取属性中的数据
            this.watchAttrData('data',function (data) {
                var newElement,dashboardHtml;
                //数据存储器
                var scope={
                    uid:0,
                    assign:{
                    }
                };
                //创建一个新的div标签
                newElement=document.createElement('div');
                //给这个新的div标签添加一个class
                newElement.className="dashboard";
                //dashboard组件解析渲染
                dashboardHtml=renderDashboard(data,scope);
                //数据转换
                // tpl里组件的属性,指令,必须用viewVM渲染才可用
                newElement.appendChild(That.viewVM(dashboardHtml,scope.assign));
                //元素替换
                oldElement.parentNode.replaceChild(newElement,oldElement);
            }.bind(this));
        }
    });
});

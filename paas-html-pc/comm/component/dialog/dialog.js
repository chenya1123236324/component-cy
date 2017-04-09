///**
// * Created by chenya on 2016/10/26.
// */
//
////注册dialog组件
//dialog1(function ($app, $appConfig) {
//    /**
//     * dialog组件解析渲染
//     * @param data
//     */
//    function renderDialog(data,scope){
//        //文档片段(用于存储元素)
//        //拼接按钮组件html
//        var mosaicDialog='';
//        mosaicDialog=createDialog(data,scope);
//        return mosaicDialog
//    }
//    /**
//     * 创建dialog元素
//     * @param dialogData
//     */
//    function createDialog(dialogData,scope) {
//        //dialog节点
//        var dialogElement='';
//        //dialog初始化宽度
//        var dialogInitWidth=dialogData.dialogData.style.width;
//        //dialog初始化高度
//        var dialogInitHeight=dialogData.dialogData.style.height;
//        //dialog头部标题
//        var dialogTitle=dialogData.dialogData.title;
//        //modal-body dialog中间内容高度，设置这个的原因是当内容超出的时候出现滚动条
//        var dialogBodyHeight=(parseInt(dialogData.dialogData.style.height)-110)+"px";
//        //判断model中是否传宽高
//        if(dialogInitWidth==undefined||dialogInitWidth==''){
//            //如果初始化宽度不存在，默认设置为640px
//            dialogInitWidth="640px";
//        }else if(dialogInitHeight==undefined||dialogInitHeight==''){
//            //如果初始化高度不存在，默认设置为430px
//            dialogInitHeight="430px";
//        }
//
//
//        //console.log("-------------dialogModel返还回来的数据------------------");
//        ////dialogModel返还回来的数据
//        //console.log(JSON.stringify(dialogData));
//        //console.log("-------------dialogModel返还回来的数据------------------");
//
//
//        <!--遮罩层-->
//        dialogElement+='<div class="modal-backdrop"></div>';
//        <!--dialog暂存区-->
//        dialogElement+='<div class="modal-storage" style="width:'+dialogInitWidth+';height:'+dialogInitHeight+';"></div>';
//        <!--dialog主体内容部分-->
//        dialogElement+='' +
//            '<div class="modal" style="width:'+dialogInitWidth+';height:'+dialogInitHeight+';">' +
//            '<div class="modal-dialog"> ' +
//            '<div class="modal-content">' +
//                <!--dialog头部内容-->
//            '<div class="modal-header">' +
//                <!--dialog头部标题-->
//            '<span class="modal-title">'+dialogTitle+'</span>' +
//                <!--dialog头部图标-->
//            ' <span class="modal-close"><i class="iconfont  space icon-group12" $-on:click="action.dialogZoom"></i><i class="iconfont icon-chenghao" $-on:click="action.dialogClose"></i></span>' +
//            '</div>' +
//                <!--dialog中间内容-->
//            '<div class="modal-body" style="height:'+dialogBodyHeight+';" >' +
//            '<div class="modal-body-content">';
//
//              //dialog模板内容开始
//          var bodyContent=document.querySelector(".modal-body-content");
//             //检查list是否是数组
//            if(dialogData.dialogData.list instanceof Array){
//                dialogData.dialogData.list.forEach(function (templateData) {
//                    if (typeof templateData.template !== "undefined") {
//                        dialogElement+=templateData.template;
//                    }
//             })
//          }
//             //dialog模板内容结束
//
//            dialogElement+='</div>' +
//            '</div>' +
//                     <!--dialog底部内容-->
//            '<div class="modal-footer"> ' +
//                    <!--dialog底部按钮-->
//            '<btn-group-me data="dialogButton"></btn-group-me>' +
//            '</div> ' +
//            '</div>' +
//            '</div> ' +
//            '</div>';
//        //返回拼接后创建dialog元素
//        return dialogElement;
//    }
//
//
//    //dialog组件注册
//    $app.componentRegister('dialog', {
//        //指令优先级 降序执行
//        priority: 0,
//        //引入的工具类
//        tools: [],
//        //只调用一次，在指令第一次绑定到元素上时调用。
//        handle: function () {
//            //组件原有的标签
//            var oldElement=this.$element;
//            //监听获取属性中的数据
//            this.watchAttrData('data',function (data) {
//                var newElement,dialogHtml,This=this;
//                oldElement.innerHTML='';
//                //oldElement.appendChild(this.viewVM(data.template||'',data.scope||{}));
//
//                //创建一个新的div标签
//                newElement=document.createElement('div');
//                //给这个新的div标签添加一个class
//                newElement.className="dialog";
//                //给这个新的div标签添加一个id
//                newElement.id=data.dialogData.dialogID;
//                //dialog 组件唯一标识
//                var dialogID="#"+data.dialogData.dialogID+" ";
//                //组件视图需要的变量
//                var scope={
//
//                        action:{
//                            //dialog最大化最小化操作
//                            dialogZoom:function () {
//                                var querySelectorModel =document.querySelector(dialogID+".modal");
//                                //从dialog暂存区中可以获取到dialog初始化话时的width,height
//                                var querySelectorStorage =document.querySelector(dialogID+".modal-storage");
//                                //获取dialog初始化时的宽度
//                                var dialogInitWidth =querySelectorStorage.style.width;
//                                //获取dialog初始化时的高度
//                                var dialogInitHeight =querySelectorStorage.style.height;
//                                //选择到modal-body节点
//                                var querySelectorModalBody=document.querySelector(dialogID+".modal-body");
//                                ////modal-body dialog中间内容初始化高度
//                                var dialogBodyInitHeight=(parseInt(data.dialogData.style.height)-110)+"px";
//
//                                //如果存在dialogZoom说明是已经最大化了
//                                if(querySelectorModel.classList.contains("dialogZoom")){
//                                    querySelectorModel.classList.remove("dialogZoom");
//                                    //dialog宽度恢复为初始值
//                                    querySelectorModel.style.width=dialogInitWidth;
//                                    //dialog高度恢复为初始值
//                                    querySelectorModel.style.height=dialogInitHeight;
//                                    //dialog中间内容高度恢复为初始值
//                                    querySelectorModalBody.style.height=dialogBodyInitHeight;
//                                }else{ //dialog最大化操作
//                                    querySelectorModel.classList.add("dialogZoom");
//                                    //dialog宽度最大化
//                                    querySelectorModel.style.width="100%";
//                                    //dialog高度最大化
//                                    querySelectorModel.style.height="100%";
//                                    //dialog中间内容高度为页面可视区域的高度减去dialog的头部高度(50px)减去dialog的底部高度(60px)
//                                    querySelectorModalBody.style.height=(parseInt(document.body.clientHeight)-110)+"px";
//                                }
//                            },
//                            //dialog关闭操作
//                            dialogClose:function(){
//                                //关闭dialog框
//                                document.querySelector(dialogID+".modal").style.display="none";
//                                //关闭dialog遮罩层
//                                document.querySelector(dialogID+".modal-backdrop").style.display="none";
//                            }
//                        }
//                    },
//                    //获取dialog数据
//                    dialogHtml=renderDialog(data,scope);
//                //数据转换
//                newElement.appendChild(This.viewVM(dialogHtml,scope));
//                //元素替换
//                oldElement.parentNode.replaceChild(newElement,oldElement);
//            }.bind(this))
//        }
//    })
//});
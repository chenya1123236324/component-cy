/**
 * Created by chenya on 2016/11/24.
 */
//注册模糊查询组件
fuzzyQuery(function ($app, $appConfig) {
    var fuzzyQueryHTML='<div class="fuzzy-query">' +
        ' <div class="fuzzy-query-group">' +
        '<div class="fuzzy-query-box" $-parses-bind:style="fuzzyQueryConfig.fuzzyQueryData.style|styleHandle">' +
        '<input type="text" id="fuzzy-query-input" class="fuzzy-query-input" plugins="true"   $-events="fuzzyQueryConfig.fuzzyQueryData.keyDownEvents" $-on:input="assign.entering"   $-parses-bind:placeholder="fuzzyQueryConfig.fuzzyQueryData.placeholder"/>' +
        '<ul class="hidden-list" style="display:none">' +
        '<li   $-for="eleConf in fuzzyQueryConfig.fuzzyQueryData.list"  $-events="fuzzyQueryConfig.fuzzyQueryData.events" $-parses-bind:id="eleConf.value|valueHandle"><span>{{eleConf.name}}</span></li>' +
        '</ul>' +//hidden-list
        '</div>' +//fuzzy-query-box
        '<div class="fuzzy-query-list">' +
        '<div class="select-list">' +
        '<ul class="option-list" $-parses-bind:id="fuzzyQueryConfig.fuzzyQueryData.id|fuzzyQueryID"></ul>' +
        '</div>' +//select-list
        '</div>' +//fuzzy-query-list
        '</div>' +//fuzzy-query-group
        '</div>';//fuzzy-query
    var filter={
        //内容样式
        styleHandle:function (styles) {
            var style='';
            styles && typeof styles === 'object' && styles.forEach(function (val,key) {
                style+=key+':{{fuzzyQueryConfig.fuzzyQueryData.style["'+key+'"]}};'
            });
            return style;
        },
        //绑定ID值
        valueHandle:function (value) {
            return value.toString();
        },

        //组件ID
        fuzzyQueryID:function (id) {
            if(id==""){
              id="fuzzyQueryID"
            }
            return id.toString();
        },
    };
    //模糊查询组件注册
    $app.componentRegister('fuzzyQuery', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //组件原有的标签
            var scope,
                newElement,
                oldElement=this.$element,
                That=this;
            //监听获取属性中的数据
            this.watchAttrData('data',function (fuzzyQueryConfig) {
                if(fuzzyQueryConfig && typeof fuzzyQueryConfig === 'object'){
                    scope={
                        fuzzyQueryConfig:fuzzyQueryConfig,
                        assign:{
                            //用户输入
                            entering:function (e) {
                                //得到用户输入的值
                                var val=this.value;
                                //得到隐藏数据节点
                                var nodes = this.nextSibling.childNodes;
                                var newLi = "";
                                var id=fuzzyQueryConfig.fuzzyQueryData.id =="" ?"fuzzyQueryID":fuzzyQueryConfig.fuzzyQueryData.id;
                                var optionList=document.querySelector("#"+id);
                                var arr = [];
                                //数组去重
                                Array.prototype.duplicateRemoval = function () {
                                    var n = [];
                                    for (var i = 0; i < this.length; i++)
                                    {
                                        if (n.indexOf(this[i]) == -1) n.push(this[i]);
                                    }
                                    return n;
                                };
                                //得到数据并填充到数组中
                                for (var i = 0;i < nodes.length;i++){
                                    arr.push(nodes[i].innerText);
                                }
                                if(val != "") {
                                    arr.duplicateRemoval().forEach(function(value){
                                        var txt=value;
                                        if(txt != undefined){
                                            //是否包含
                                            var index = txt.indexOf(val);
                                            //输入文字标红处理
                                            var replaceTxt=txt.replace(val,"<strong style='color:#e13333;'>"+val+"</strong>");
                                            if(index>-1){
                                                newLi+= "<li  $-events='fuzzyQueryConfig.fuzzyQueryData.events' >" + replaceTxt + "</li>";
                                            }
                                        }
                                    });
                                    optionList.innerHTML="";
                                    optionList.appendChild(That.viewVM(newLi,scope));
                                }else {
                                    optionList.innerHTML = "";
                                }
                            },
                        }
                    };
                    newElement=this.viewVM(fuzzyQueryHTML,scope,filter).firstChild;
                    oldElement.parentNode.replaceChild(newElement,oldElement);
                    oldElement=newElement;
                    newElement=null;
                }
            }.bind(this));
        }
    });
});
/**
 * Created by chenya on 2016/11/1.
 */

//查询条件组件
queryCriteria(function ($app, $appConfig) {
    /**
     * 查询条件组件解析渲染
     * @param data
     */
    function renderQueryCriteria(data,scope){
        //文档片段(用于存储元素)
        //拼接按钮组件html
        var mosaicQueryCriteria='';
        //检查data是否是数组
        if(data instanceof Object){
            mosaicQueryCriteria=createQueryCriteria(data,scope);
        }
        return mosaicQueryCriteria;

    }

    /**
     * 创建查询条件组件元素
     * @param queryCriteriaData
     */
    function createQueryCriteria(queryCriteriaData,scope) {
        //console.log("--------------------------------------");
        //console.log(JSON.stringify(queryCriteriaData));
        //console.log(queryCriteriaData);
        //console.log("--------------------------------------");

        //设置查询条件组件的css样式，便于外部自定义
        var style="";
        //遍历queryCriteriaData
        queryCriteriaData.forEach(function(dataObject){
            //获取得到css样式
            var styleData= dataObject.style;
            //遍历拼接css样式
            for (var key in styleData){
                style +=key+':'+styleData[key]+';';
            }
        });
        //查询条件标签
        var queryCriteriaElement='';
        queryCriteriaElement+='<div class="queryCriteria" style="'+style+'">' +
            '<div class="queryCondition">' +
            '<span class="queryConditionLeft">配置查询条件</span>' +
            '<span class="queryConditionRight"></span>' +
            '</div>' +
            '<div class="queryForm">' +
            '<span>标签名称:</span>' +
            '<input type="test" class="tagName" name="tagName"/>' +
            '</div>' +
            '<div class="queryForm">' +
            '<span>查询字段:</span>' +
            '<select data="queryCriteriaSelect.queryField" name="queryField" class="queryField"  $-on:change="queryCriteria.selectChange"></select>' +
            '<span class="tagQueryCondition">查询条件:</span>' +
            '<select data="queryCriteriaSelect.queryCondition" name="queryCondition" class="queryCondition"  $-on:change="queryCriteria.selectChange"></select>' +
            '<input type="test" class="searchText" name="searchText"/>' +
            '<i $-on:click="assign.queryCriteriaAdd" class="iconfont icon-jiahao"></i>' +
            '<i $-on:click="assign.queryCriteriaReduce" class="iconfont icon-jianhao"></i>' +
            '</div>' +
            '<div class="addQueryConditionBox" id="addQueryConditionBox"></div>' +
            '<btn-group-me data="queryCriteriaSave"></btn-group-me>';
            queryCriteriaElement+='</div>';
        //返回拼接后创建高级检索元素
        return queryCriteriaElement;
    }

    //query-criteria查询条件组件注册
    $app.componentRegister('queryCriteria', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //组件原有的标签
            var oldElement=this.$element;
            var That=this;
            //监听获取属性中的数据
            this.watchAttrData('data',function (data) {
                var newElement,queryCriteriaHtml;
                //创建一个新的div标签
                newElement=document.createElement('div');
                //给这个新的div标签添加一个class
                newElement.className="query-criteria";
                //新增一条查询条件
                function addSearch() {
                    //创建一个新的div标签
                    var addSearchNode = document.createElement("div");
                    //给这个新的div标签添加一个class
                    addSearchNode.className="addSearchNode";
                    var search=
                        '<span>查询字段:</span>' +
                        '<select data="queryCriteriaSelect.queryField" name="queryField" class="queryField"  $-on:change="queryCriteria.selectChange"></select>' +
                        '<span class="tagQueryCondition">查询条件:</span>' +
                        '<select data="queryCriteriaSelect.queryCondition" name="queryCondition" class="queryCondition"  $-on:change="queryCriteria.selectChange"></select>' +
                        '<input type="test" class="searchText" name="searchText"/>';
                    addSearchNode.innerHTML=search;
                    document.querySelector(".addQueryConditionBox").appendChild(That.viewVM(addSearchNode));
                }

                //数据存储器
                var scope={
                    assign:{
                        //动态添加表单
                        queryCriteriaAdd:function(){
                            //新增一条查询条件
                            addSearch();
                        },
                        //动态减少表单
                        queryCriteriaReduce:function(){
                            //得到新增表单的列表，返回的是一个伪数组，需要转换成数组才可以操作，否则会报异常
                            var addSearchNodes = document.getElementsByClassName('addSearchNode');
                            var addSearchBox = document.getElementById('addQueryConditionBox');
                            var hasDiv = addSearchBox.getElementsByTagName('div')[0];
                            //将伪数组转换成真数组并循环遍历
                            [].forEach.call(addSearchNodes, function(value,key) {
                                //当遍历的数组是最后一个节点时，移除掉
                                if(key==addSearchNodes.length-1){
                                    //移除最后一个节点
                                    addSearchNodes[addSearchNodes.length-1].parentNode.removeChild(addSearchNodes[addSearchNodes.length-1]);
                                }
                            });
                            if(hasDiv==undefined){
                                //TODO【此处提示需要后期做好提示组件后进行修改】
                                alert("至少保留一行条件");
                            }
                        }
                    }
                };

                //高级搜索组件解析渲染
                queryCriteriaHtml=renderQueryCriteria(data,scope);
                //数据转换  【tpl里组件的属性,指令,必须用viewVM渲染才可用】
                newElement.appendChild(That.viewVM(queryCriteriaHtml,scope));
                //元素替换
                oldElement.parentNode.replaceChild(newElement,oldElement);

            }.bind(this));
        }
    });
});

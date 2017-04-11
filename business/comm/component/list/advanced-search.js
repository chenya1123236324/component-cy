/**
 * Created by chenya on 2016/10/21.
 */
//advanced-search
//高级搜索组件
advancedSearch(function ($app, $appConfig) {
    /**
     * 高级搜索组件解析渲染
     * @param data
     */
    function renderAdvancedSearch(data,storageData){
             //文档片段(用于存储元素)
            //拼接按钮组件html
            var mosaicAdvancedSearch='';
            //检查data是否是数组
            if(data instanceof Array){
                //data.forEach(function (btnGroupMeData) {
                //    mosaicBtnGroupMe+=createBtnGroupMe(btnGroupMeData,storageData);
                //})
                mosaicAdvancedSearch=createAdvancedSearch(data,storageData);
            }
            return mosaicAdvancedSearch

    }

    /**
     * 创建高级搜索组件元素
     * @param btnGroupMeData
     */
    function createAdvancedSearch(advancedSearchData,storageData) {
        var assign=storageData.assign,
            eventsDirective='',
            directiveKey='';

        //高级检索标签
        var advancedSearchElement='';
        advancedSearchElement+='<div class="advancedSearch">' +
            '<div class="searchGroup">' +
            //得到高级检索中新增的标签
            '<div class="searchGroupLeft"><btn-group-me data="newAddQueryTag"></btn-group-me></div>' +
            '<div class="searchGroupRight"><btn-group-me data="defaultQueryTag"></btn-group-me></div>' +
            '</div>' +
            '</div>' +
            //高级搜索按钮
            '<div class="searchFormGroup">' +
            '<div class="searchTab searchTabBefore" $-on:click="isHideClick">高级搜索<i class="iconfont icon-down"></i>' +
            '</div>' +
            //检索内容
            '<div class="searchBox isSearchBoxHide">' +
            '<div class="searchForm">' +
            //检索类目   searchCategories
            '<select data="searchSelect.searchCategories" name="searchCategories" class="searchCategories"  $-on:change="searchSelect.selectChange"></select>' +
            //检索规则  searchRule
            '<select data="searchSelect.searchRule" name="searchRule" class="searchRule"  $-on:change="searchSelect.selectChange"></select>' +
            //搜索框
            '<input type="test" class="searchText"/>' +
            '<i $-on:click="advancedSearchAdd" class="iconfont icon-jiahao"></i>' +
            '<i $-on:click="advancedSearchReduce" class="iconfont icon-jianhao"></i>' +
            '</div>' +
            '<div class="addSearchBox" id="addSearchBox">' +
            '</div>' +
            '<btn-group-me data="advancedSearchSave"></btn-group-me>' +
            '</div>' +
            '</div>';
        //返回拼接后创建高级检索元素
        return advancedSearchElement;
    }

    //advanced-search组件注册
    $app.componentRegister('advancedSearch', {
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
                var newElement,advancedSearchHtml;
                    //创建一个新的div标签
                    newElement=document.createElement('div');
                    //给这个新的div标签添加一个class
                    newElement.className="advanced-search";
                    //新增一条查询条件
                    function addSearch() {
                        //创建一个新的div标签
                        var addSearchNode = document.createElement("div");
                        //给这个新的div标签添加一个class
                        addSearchNode.className="addSearchNode";
                        var search=//检索类目   searchCategories
                            '<select data="searchSelect.searchCategories" name="searchCategories" class="searchCategories"  $-on:change="searchSelect.selectChange"></select>' +
                                //检索规则  searchRule
                            '<select data="searchSelect.searchRule" name="searchRule" class="searchRule"  $-on:change="searchSelect.selectChange"></select>' +
                                //搜索框
                            '<input type="test" class="searchText"/>';
                        addSearchNode.innerHTML=search;
                        document.querySelector(".addSearchBox").appendChild(That.viewVM(addSearchNode));
                    }

                //数据存储器
               var  storageData={
                    uid:0,
                    assign:{
                        //点击显示隐藏表单框
                        isHideClick:function(){
                            //高级搜索表单填写内容显示与隐藏
                            var  isSearchBoxHide= document.querySelector(".searchBox");
                            isSearchBoxHide.classList.toggle("isSearchBoxHide");
                            //高级搜索按钮样式
                            var searchTab= document.querySelector(".searchTab");
                            //点击高级搜索按钮之前
                            searchTab.classList.toggle("searchTabBefore");
                            //点击高级搜索按钮之后
                            searchTab.classList.toggle("searchTabAfter");
                        },
                        //动态添加表单
                        advancedSearchAdd:function(){
                            //新增一条查询条件
                            addSearch();
                        },
                        //动态减少表单
                        advancedSearchReduce:function(){
                            //得到新增表单的列表，返回的是一个伪数组，需要转换成数组才可以操作，否则会报异常
                       var addSearchNodes = document.getElementsByClassName('addSearchNode');
                            var addSearchBox = document.getElementById('addSearchBox');
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
                               alert("至少保留一行条件");
                            }
                        }
                    }
                };

                //高级搜索组件解析渲染
                advancedSearchHtml=renderAdvancedSearch(data,storageData);
                //数据转换
                newElement.appendChild(this.viewVM(advancedSearchHtml,storageData.assign));
                //元素替换
                oldElement.parentNode.replaceChild(newElement,oldElement);

            }.bind(this))
        }
    })
});
listGrid(function ($app,$appConfig) {

    /**
     * grid列表类
     */
    function gridComp(tools,$interface) {
        //grid需要的工具
        this.tools=tools;
        //元素构造
        this.structure();

        //数据接口功能定义
        $interface.write({
            //数据请求
            update:function () {
                this.dataRequest()
            }.bind(this),
            sendData:function (data,isMerge) {
                data=typeof data === "object"?data:{};
                this.$gridConf.sendData=isMerge?this.$gridConf.sendData.extend(data):data;
            }.bind(this),
            getInnerApi:function () {
                return this.interface;
            }.bind(this)

        })
    }

    /**
     * 数据配置处理
     */
    gridComp.prototype.confHandle=function () {

        var This=this,
            //工具集合
            tools=this.tools,
            //作用域
            scope=this.scope={
                loading:true
            },
            //过滤器
            filter=this.filter={
                setContainer:function(eles,attr){
                    return function (ele){
                        eles[attr]=ele;
                    }
                },
                //页码跳转
                toPage:function (pageNumber,pageCount) {
                    return function () {
                        if(String(pageNumber).match(/(^\d+$)|(^$)/) && (parseInt(pageCount)<= parseInt(pageCount)&& parseInt(pageCount) != 0)){
                            scope.eventManage.pageTurn(pageNumber)();
                        }
                    }
                },

                //搜索框校验
                searchValid:function (pageCount) {

                    var rule=pageCount>0?'(^\\d+$)|(^$)':'^$';
                    return {
                        regExp:{
                            value:rule,
                            message:'请输入有效的页码'
                        },
                        asyn:{
                            value:function (value) {
                                return {
                                    handle:function (callbck) {
                                        callbck(value=="" || (parseInt(value)<= parseInt(pageCount)&& parseInt(value) != 0));
                                    }
                                }
                            },
                            message:'你输入的页码超出范围!'
                        }
                    }
                },
                rowsEmpty:function (dataList,loading) {
                    return !(dataList||[]).length && !loading;
                }
            },
            //组件接口
            $interface=this.interface={},
            //列表外部配置
            $gridConf=this.$gridConf,
            //列表内部配置
            gridConf={
                //默认排序方式
                order:typeof $gridConf.order === 'string' && ['asc','desc'].in($gridConf.order=$gridConf.order.toLowerCase()) !== -1 ? $gridConf.order:'asc',
                //默认排序字段
                orderField:$gridConf.orderField||'id',
                //默认当前页面的页码
                pageNumber:1,
                //页面信息条数
                pageSize:$gridConf.pageSize||($gridConf.pageSizeList=$gridConf.pageSizeList||[])[0] || 20,
                //标识排序的索引
                orderIndex:0,
                //数据行悬停标识
                rowHoverIndex:'null'
            };

        //分页列表
        gridConf.pageSizeList = $gridConf.pageSizeList;

        //左边操作类型的标题数据
        gridConf.leftColsModel = $gridConf.leftColsModel;

        //提取colsModel 生成 header配置
        $gridConf.colsModel.forEach(function (colConf) {
            colConf.order=colConf.order?$gridConf.order||'asc':false;
        });

        //组件作用域拼装
        gridConf.colsModel = $gridConf.colsModel;

        //grid事件管理
        scope.eventManage={
            ///定义标题部分li的事件
            headerClick:function (colKey,colModel) {
                return function () {
                    //更改排序索引标识
                    gridConf.orderIndex=colKey;
                    //检查是否开启排序
                    if(colModel.order){

                        gridConf.order=colModel.order=colModel.order === 'asc'?'desc':'asc';
                        gridConf.orderField=colModel.field;
                        //数据请求
                        This.dataRequest();
                    }
                }
            },
            //数据行的hover事件
            rowHover:function (rowKey,rowData) {
                return function () {
                    gridConf.rowHoverIndex=rowKey;
                    This.$gridConf.events.hover && This.$gridConf.events.hover.apply(this,[].slice.call(arguments).concat(rowKey,rowData));
                }
            },
            rowClick:function (rowKey,rowData) {
                return function () {
                    This.$gridConf.events.click && This.$gridConf.events.click.apply(this,[].slice.call(arguments).concat(rowKey,rowData));
                }
            },
            //鼠标移出列表事件
            bodyMouseout:function () {
                gridConf.rowHoverIndex='null';
            },
            //翻页
            pageTurn:function (pageNumber) {
                return function () {
                    gridConf.pageNumber=pageNumber;
                    //数据请求
                    This.dataRequest();
                }
            },
            //页面数据条数
            pageSize:function (pageSize) {
                return function () {
                    gridConf.pageSize=pageSize;
                    //数据请求
                    This.dataRequest();
                }
            },
            //页面渲染
            render:function (rowKey,colKey,rowDataLength,colModelLength) {
                return function () {
                    if(rowKey+1 === scope.gridListData.length && colKey +1 === $gridConf.colsModel.length){
                        // console.log(Date.now() - This.time)
                    }
                }
            }
        };

        //模板作用域
        scope.gridConf = gridConf;
        //列表数据
        scope.gridListData=[];
        scope.pagingListTag=[];
        scope.pageCount=0;
        scope.dataCount=0;

        //用于元素记录容器
        scope.eles={
            leftContainer:null,
            rightContainer:null
        };

        //预留给开发者一个全局的作用域
        $interface.developScope=scope.developScope={};

        //视图过滤器

        //获取数据类型
        filter['getType']=function (val) {
            return tools.$type.getType(val);
        };

        //分页select数据处理
        filter['pageSizeListHandle']=function (list) {
            var selectData=[];
            return selectData;
        };

        //处理标题数据
        filter['colHeaderHandle']=function (titleConfig,titleName) {
            var config;

            switch (tools.$type.getType(titleConfig)){
                case 'function':
                    config=titleConfig.bind($interface)();
                    break;
                case 'object':
                    config=titleConfig;
                    break;
            }

            if(tools.$type.getType(config) !== 'object' || config.template === null || config.template === undefined){
                config={
                    template:'<p>{{content}}</p>',
                    scope:{
                        content:((config && config.content !== undefined && config.content !== null ) ? config.content :titleName ||'')
                    }
                }
            }
            return config
        };

        //处理列表数据
        filter['colDataHandle']=function (listConfig,rowData,rowKey,field,gridListData,eles) {
            var config,
                colData=['string','number'].in(typeof field) !== -1 ? rowData[field]:undefined;
            switch (tools.$type.getType(listConfig)){
                case 'function':
                    config=listConfig.bind($interface)(colData,rowData,rowKey,gridListData,eles)
                    break;
                case 'object':
                    config=listConfig;
                    break;
            }

            if(tools.$type.getType(config) !== 'object' || config.template === null || config.template === undefined){
                config={
                    template:'<span>{{content}}</span>',
                    scope:{
                        content:((config && config.content !== undefined && config.content !== null ) ? config.content :colData ||'')
                    }
                }
            }
            return config
        };

        var gridConfModel=tools.comp.model(gridConf);

        //翻页数据监听
        gridConfModel.watch('pageNumber',function (pageNumber) {
            var index=pageNumber - 3 > 0?(pageNumber - 3+5 > scope.pageCount ? scope.pageCount-5 : pageNumber - 3):0,
                len=index+5 > scope.pageCount?scope.pageCount:index+5,
                pagingListTag=[];

            while (++index <=len){
                pagingListTag.push(index);
            }

            //翻页按钮处理
            scope.pagingListTag=pagingListTag;
        });

        gridConfModel=null;

        return {
            filter:filter,
            scope:scope
        };
    };

    /**
     * grid组件构造
     */
    gridComp.prototype.structure=function () {
        //创建grid容器
        this.container=document.createElement('div');
        //容器样式类
        this.container.className='list-grid';
        //内部加载样式元素
        // this.container.innerHTML='<div class="grid-loading"><span class="loading-spinners dots"></span><p>加载中<span class="loading-spinners"></span></p></div>'

        //grid模板
        this.bodyTemplate='<div class="grid-table">' +
            '<div class="grid-table-left-wrap">' +
                '<div class="grid-table-left">' +
                    '<div class="grid-header-group">' +
                        '<ul class="grid-header-row">' +
                            '<li $-for=" actionData in gridConf.leftColsModel">' +
                                '<template config="actionData.titleConfig|colHeaderHandle:[$,actionData.name]"></template>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="grid-row-group" $-on:mouseout="eventManage.bodyMouseout" $-render="eles|setContainer:[$,\'leftContainer\']">' +
                        '<ul class="grid-body-row" $-for="(rowKey ,rowData ) in gridListData" $-on:click="eventManage.rowClick(rowKey,rowData)" $-on:mouseover="eventManage.rowHover(rowKey,rowData)" $-class="{row-hover:gridConf.rowHoverIndex == rowKey }">' +
                            '<li $-for="(actionKey , actionData) in gridConf.leftColsModel">' +
                                '<template config="actionData.listConfig|colDataHandle:[$,rowData,rowKey,actionData.field,gridListData,eles]"></template>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="grid-table-right-wrap">' +
                '<div class="grid-table-right">' +
                    '<div class="grid-header-group">' +
                        '<ul class="grid-header-row">' +
                            '<li class="content-center" $-class="{desc:colModel.order == \'desc\',asc:colModel.order == \'asc\'}" $-on:click="eventManage.headerClick(colKey,colModel)" $-for=" ( colKey , colModel ) in gridConf.colsModel">' +
                                '<strong $-if="!colModel.titleConfig.template">{{colModel.titleConfig.content || colModel.name ||  "" }}</strong><template config="colModel.titleConfig"></template>' +
                                '<span $-if="colModel.order" $-show="gridConf.orderIndex == colKey "><i class="iconfont icon-down-copy-asc"></i><i class="iconfont icon-down-copy-desc"></i></span>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="grid-row-group" $-on:mouseout="eventManage.bodyMouseout" $-render="eles|setContainer:[$,\'rightContainer\']">' +
                        '<ul class="grid-body-row" $-for="(rowKey , rowData) in gridListData" $-on:click="eventManage.rowClick(rowKey,rowData)" $-on:mouseover="eventManage.rowHover(rowKey,rowData)" $-class="{row-hover:gridConf.rowHoverIndex == rowKey }">' +
                            '<li $-for=" ( colKey , colModel ) in gridConf.colsModel"  $-render="eventManage.render(rowKey,colKey)">' +
                                '<template config="colModel.listConfig|colDataHandle:[$,rowData,rowKey,colModel.field,gridListData,eles]"></template>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        //空数据容器
        '<div class="grid-empty" $-if="gridListData|rowsEmpty:[$,loading]"><h3><i class="iconfont icon-tttt"></i>暂无数据</h3></div>' +
        '<div class="grid-loading" $-class="{}" $-if="!!loading"><p><span class="loading-spinners dots"></span><p>加载中<span class="loading-spinners"></span></p></div>' +
        '<div class="grid-footer">' +
            '<ul>' +
                '<li class="footer-left">' +
                    '<ul class="grid-paging-left">' +
                        '<li $-on:click="eventManage.pageTurn(1)" $-class="{disabled:gridConf.pageNumber == 1}">首页</li>' +
                    '</ul>' +
                    '<ul class="grid-paging-center">' +
                        '<li $-on:click="eventManage.pageTurn(gridConf.pageNumber-1)" $-class="{disabled:gridConf.pageNumber == 1}"><i class="iconfont icon-left"></i></li>' +
                        '<li $-on:click="eventManage.pageTurn(pagingTag)" $-class="{focus:gridConf.pageNumber == pagingTag}" $-for="pagingTag in pagingListTag"><span>{{pagingTag}}</span></li>' +
                        '<li $-on:click="eventManage.pageTurn(gridConf.pageNumber+1)" $-class="{disabled:gridConf.pageNumber == pageCount}"><i class="iconfont icon-right"></i></li>' +
                    '</ul>' +
                    '<ul class="grid-paging-right">' +
                        '<li $-on:click="eventManage.pageTurn(pageCount)" $-class="{disabled:gridConf.pageNumber == pageCount}">尾页</li>' +
                    '</ul>' +
                    '<div class=toPage>第<input type="text" $-model="searchVal" $-valid="pageCount|searchValid" name="pageNumber">页<button $-on:click="searchVal|toPage:[$,pageCount]" class="page-search">确定</button>共<strong>{{pageCount}}</strong>页</div>' +
                '</li>' +
                '<li class="footer-right">' +//<select config="gridConf.pageSizeList|pageSizeListHandle" ></select>条
                    '<span class="split">每页</span><ul><li $-for="size in gridConf.pageSizeList"><button $-on:click="eventManage.pageSize(size)" $-class="{focus:gridConf.pageSize == size}">{{size}}条</button></li></ul>' +
                    '<span>共<strong>{{dataCount}}</strong>条</span>' +
                '</li>' +
            '</ul>' +
        '</div>';
    };

    /**
     * 数据请求
     */
    gridComp.prototype.dataRequest=function () {
        var This=this,
            $gridConf=this.$gridConf,
            gridConf=this.scope.gridConf,
            sendData={
                order:gridConf.order,
                orderField:gridConf.orderField,
                pageNow:gridConf.pageNumber,
                pageSize:gridConf.pageSize
            }.extend($gridConf.sendData||{});
        This.scope.loading=true;
        //数据加载遮层
        this.time=Date.now();

        //重置列表
        this.scope.gridListData=[];
        //检查是否网络请求
        if($gridConf.url){
            //网络数据请求
            this.tools.$net.ajax({
                url:$gridConf.url,
                data:sendData,
                type:$gridConf.method||$gridConf.type,
                complete:function (res,state) {
                    //数据处理
                    This.dataListHandle(res,state,sendData);
                    //对象销毁
                    This=$gridConf=gridConf=sendData=null;
                }
            });
        }else{
            This.dataListHandle(sendData,undefined,sendData);
            //对象销毁
            This=$gridConf=gridConf=sendData=null;

        }
    };

    /**
     * 列表数据处理
     * @param resData
     */
    gridComp.prototype.dataListHandle=function (resData,state,sendData) {
        var $gridConf=this.$gridConf,
            //用于数据内部初始化处理
            dataInit=function (resData) {
                var index=0,
                    pagingListTag=[],
                    dataCount=resData.dataCount,
                    pageCount=Math.ceil(dataCount/sendData.pageSize);

                //检查并执行数据初始化回调
                typeof $gridConf.dataInitConf === 'function' && $gridConf.dataInitConf(resData,this.interface);

                //写入列表数据到作用域中
                this.scope.gridListData=resData.dataList;

                //写入分页中
                while (++index <= pageCount && index<= 5){
                    pagingListTag.push(index);
                }
                this.scope.pagingListTag=pagingListTag;

                //写入列表的页数与条数
                this.scope.pageCount=pageCount;
                this.scope.dataCount=dataCount;

                this.scope.loading=false;

                //对象销毁
                $gridConf=callback=index=pagingListTag=dataCount=pageCount=null;

            }.bind(this),
            callback=function (resData) {
                //通过回调获取数据
                dataInit(resData);
                dataInit=null;
            }.bind(this);

        //检查是否有过滤函数
        if(typeof $gridConf.filtration === 'function'){

            if($gridConf.url){
                var res=$gridConf.filtration(state && resData,callback);
                //检查是否有直接返回的值
                ({}.toString.call(res) === "[object Object]") &&  dataInit(res);
            }else{
                $gridConf.filtration.call($gridConf,resData,callback);
            }
            res=null;
            //检查数据及状态
        }else if(state && ({}.toString.call(resData) === "[object Object]")){
            dataInit(resData);
        }

    };

    /**
     * grid 渲染
     * @param gridConf
     */
    gridComp.prototype.render=function (gridConf,$interface) {
        //存储原始配置
        this.$gridConf=gridConf;
        gridConf.events=gridConf.events||{};

        //grid模板渲染
        var conf=this.confHandle(),
            gridContainer=this.tools.comp.viewVM(this.bodyTemplate,conf.scope,conf.filter);

        //插入到grid的元素容器中
        this.container.appendChild(gridContainer);

        //数据请求
        this.dataRequest();

        //对象销毁
        conf=gridContainer=null;

    };

    //listGrid组件注册
    $app.componentRegister('listGrid', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: ['object','type','net'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($object,$type,$net) {
            var oldContainer=this.$element,
                //grid API
                $interface= this.attrToVM('api'),
                $gridComp=new gridComp({comp:this,$object:$object,$type:$type,$net:$net},$interface);

            //组件标签替换成grid的元素
            oldContainer.parentNode.replaceChild($gridComp.container,oldContainer);

            //grid配置监听
            this.watchAttrData('config',function (gridConf) {
                //grid渲染
                $gridComp.render(gridConf);
            });

        }
    });
});


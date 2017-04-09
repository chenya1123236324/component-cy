/**
 * Created by xiyuan on 16-5-17.
 */
//@make : start

//视图页面需要的数据模型(提供之后的视图数据绑定)
var $pageModel={},
    layoutCache={};

/**
 * 框架渲染引擎
 * @param routeInfo
 */
function $Engine(routeInfo){
    new engineInterface(routeInfo)
};

/**
 * 引擎接口
 * @param routeInfo
 */
function engineInterface(routeInfo){

    var engineObj=this,

        //分析路由配置
        routeConfig = routeInfo.routeConfig,
        controller = routeConfig.controller,
        view = routeConfig.view,
        parameter = routeInfo.parameter,
        viewTemplate = routeConfig.viewTemplate,

        //创建一个监听对象
        promise=$listen();

    promise.init(function(handleObjAttr){
        var viewEnabled=view?true:false,
            controllerEnabled=controller?true:false;

        //定义监听处理器中需要用到的属性参数
        handleObjAttr({
            view:viewEnabled,
            controller:controllerEnabled,
            passView:false,
            passController:false,
            viewData:null,
            controllerData:null,
            counter:(controller?1:0)+(view?1:0)
        });

    });

    //监听数据处理
    promise.handle(function(source, sourceType,info){
        var passName;
        switch (sourceType){
            case 'controller':
            case 'view':
                passName='pass'+sourceType.replace(/^[\w]/,function(s){return s.toUpperCase()});
                if(!this[passName]){
                    this[passName]=true;
                    this[sourceType+'Data']={
                        info:info,
                        source:source
                    };
                    this.counter=this.counter-1;
                }
                break;
        }

        //检查数据是否全部加载完毕
        if(!this.counter){
            return this;
        }

    });

    //数据接收
    promise.receive(function(data){
        //调用渲染引擎处理
        engineObj.init(data);
    });

    if (controller) {

        $sourceManage.getControllerSource(controller,function(source, sourceType){
            ///触法控制器
            promise.trigger(source, sourceType,this);
        },parameter);
    }

    //解析视图
    if (view) {
        $sourceManage.getViewSource(view,function(source, sourceType){
            //触法视图
            promise.trigger(source, sourceType,this);
        },parameter);
    }

    //读取视图模板
    if (viewTemplate) {

    }

}

/**
 * 引擎初始化
 * @param data
 */
engineInterface.prototype.init=function(data){

    var controllerData=data.controllerData,
        viewData=data.viewData,
        controllerSource,
        viewSource,
        controllerInfo,
        viewInfo,
        controllerAction,
        controllerActionFn;

    //检查是否调用控制器
    if(controllerData){
        controllerInfo=controllerData.info;
        controllerAction=controllerInfo.pathSlice;
        //检查控制器资源是否存在
        if(controllerSource=controllerData.source){
            //检查对应的控制器操作是否存在
            if(!((controllerActionFn=controllerSource[controllerAction]) && (controllerActionFn=controllerActionFn[1]))){
                controllerActionFn=null;
                $log.warning('[控制器]未找到对应的'+controllerAction+'操作');
            }
        }
    }

    //渲染此次页面
    if(viewData || controllerActionFn){
        this.rendering({
            source:controllerSource,
            actionName:controllerAction,
            actionFn:controllerActionFn,
            info:controllerInfo
        },viewData);
    }

};

// pageToggle ---> layout ---> animate ---> assign ---> display ---> end

/**
 * 页面渲染
 * @param controllerData
 * @param viewData
 */
engineInterface.prototype.rendering=function(controllerData,viewData){
    var viewSource=viewData?viewData.source:viewData,
        layoutSource=null,
        isRunController=false,
        eleStorage=null;
    //布局渲染
    function layoutRender(layoutSource) {
        var layoutView,
            cacheEleContainer=[],
            cacheBlockContainer=[],
            cacheMainContainer=[],
            cacheMainCleans=[],
            tmpContainer=document.createDocumentFragment(),
            placeholder=document.createTextNode(''),
            parentNode=eleStorage.tpls[0].parentNode,
            layoutDom,
            tmpEle;

        //检查两个页面布局是否相同
        if(layoutCache.layoutSource === layoutSource){
            layoutDom=layoutCache.layoutView.DOM;

            //布局页面元素组合
            layoutCache.cacheEleContainer.forEach(function (ele) {
                layoutDom.appendChild(ele);
            });

            //重新组合main内容
            layoutCache.cacheMainContainer.forEach(function (info) {
                info.innerEles.forEach(function (el) {
                    info.real.appendChild(el);
                });

                var parentNode=info.double.parentNode;
                parentNode.innerHTML='';
                parentNode.appendChild(info.real);
                info.real.parentNode.insertBefore(info.double,info.real);
            });

            //重新组合block内容
            layoutCache.cacheBlockContainer.forEach(function (info) {
                while(info.startNode.nextSibling !== info.endNode){
                    info.real.appendChild(info.startNode.nextSibling);
                }
                info.startNode.parentNode.replaceChild(info.real,info.startNode);
                info.real.parentNode.insertBefore(info.startNode,info.real);
            });

            //清除之前页面的元素
            layoutCache.cacheMainCleans.forEach(function (ele) {
                ele.parentNode && ele.parentNode.removeChild(ele);
            });
        }else{

            layoutCache.layoutView=layoutView=viewVm(layoutSource,{$pageModel:$FRAME.$pageAssign,$pageFilter:$FRAME.$pageFilter});
            layoutDom=layoutView.DOM;

            //记录layout中所有元素
            layoutDom.childNodes.forEach(function (ele) {
                cacheEleContainer.push(ele);
            });

            // block占位
            layoutDom.querySelectorAll('layout-block').forEach(function (ele) {
                var startNode=document.createTextNode(''),
                    endNode=document.createTextNode('');

                ele.parentNode.insertBefore(startNode,ele);
                ele.nextSibling?
                    ele.nextSibling.parentNode.insertBefore(endNode,ele.nextSibling):
                    ele.parentNode.appendChild(endNode);

                cacheBlockContainer.push({
                    real:ele,
                    startNode:startNode,
                    endNode:endNode
                });
                startNode=endNode=null;
            });

            //main占位
            layoutDom.querySelectorAll('layout-main').forEach(function (ele) {
                var innerEles=[],
                    tmpNode=document.createTextNode('');
                ele.parentNode.insertBefore(tmpNode,ele);

                ele.childNodes.forEach(function (el) {
                    innerEles.push(el)
                });

                cacheMainContainer.push({
                    double:tmpNode,
                    real:ele,
                    innerEles:innerEles
                });
                tmpNode=innerEles=null;
            });

            layoutCache.cacheEleContainer=cacheEleContainer;
            layoutCache.cacheMainContainer=cacheMainContainer;
            layoutCache.cacheBlockContainer=cacheBlockContainer;
        }

        layoutCache.layoutSource=layoutSource;

        //建立占位元素
        parentNode.appendChild(placeholder);

        //移除当前页面中的元素
        eleStorage.tpls.forEach(function (ele) {
            parentNode.removeChild(ele);
        });

        //布局相关元素提取
        layoutDom.querySelectorAll('layout-block').forEach(function (ele) {
            var viewBlock=eleStorage.blocks[ele.getAttribute('location')];
            (function (ele) {
                while (ele.firstChild){
                    tmpContainer.appendChild(ele.firstChild)
                }
            })(viewBlock||ele);

            ele.parentNode.replaceChild(tmpContainer,ele);
        });

        //处理main主体内容
        layoutDom.querySelectorAll('layout-main').forEach(function (ele) {
            while (tmpEle=eleStorage.tpls.shift()){
                tmpContainer.appendChild(tmpEle)
            }

            tmpContainer.childNodes.forEach(function (ele) {
                cacheMainCleans.push(ele);
            });
            layoutCache.cacheMainCleans=cacheMainCleans;

            ele.parentNode.replaceChild(tmpContainer,ele);
        });

        parentNode.replaceChild(layoutDom,placeholder);

        //销毁变量
        layoutView,cacheEleContainer,cacheBlockContainer,cacheMainContainer,cacheMainCleans,tmpContainer,placeholder,parentNode,layoutDom,tmpEle=null;
    }

    //视图展示
    function displayFn(__storage__) {
        var controllerAssign=__storage__.assign;
        var controllerFilter=__storage__.filter;
        if(viewSource){

            //创建页面传递的数据监控对象 $modelInterface   并且合并配置路径
            var $pageModel=$FRAME.$pageAssign=(controllerAssign||{}).extend($configStroage.pathList.src.paths),
                //连接全局过滤器与控制器中的过滤器
                $pageFilter=$FRAME.$pageFilter=$object.concat($configStroage.$filter,controllerFilter);

            //渲染视图
            var viewObje=viewVm(viewSource,{$pageModel:$pageModel,$pageFilter:$pageFilter}),
                pageElement=viewObje.DOM,
                animate=$configStroage.pageToggle.animate,
                animateType='default',
                placeholder=document.createTextNode(''),
                toggleAction=$routeManage.history.isBack?'back':'make';

            //页面布局元素提取
            if(__storage__.layout ){
                eleStorage=__storage__.eleStorage;
                pageElement.querySelectorAll('layout-block').forEach(function (ele) {
                    eleStorage.blocks[ele.getAttribute('location')]=ele;
                    pageElement.removeChild(ele)
                });

                pageElement.childNodes.length || pageElement.appendChild(placeholder);
                pageElement.childNodes.forEach(function (ele) {
                    eleStorage.tpls.push(ele);
                });

                if(layoutSource){
                    layoutRender(layoutSource)
                }else{
                    isRunController=true
                }
            }

            //恢复初始跳转状态
            $routeManage.history.isBack=null;

            //页面渲染事件触发
            $eventManage.$apply('page:render',{
                now:pageElement,
                old:window.document.body
            });

            //动画类型
            animate=animate[animateType];
            switch(typeof animate){
                case 'function':
                    animate=animate(pageElement);
                case 'object':
                    animate[toggleAction](pageElement);
                    break;
            }

            //消除物理点击和移动浏览器上的点击事件的触发之间的300ms延迟
            new $extend.FastClick(document.body);
        }
    }

    //运行控制器
    if(controllerData.actionFn){

        //注入布局渲染方法
        controllerData.info.layoutRender=function (__storage__,_layoutSource) {
            layoutSource=_layoutSource;
            isRunController && layoutRender(layoutSource)
        };

        //注入视图展示回调
        controllerData.info.displayFn=function (__storage__) {
            displayFn(__storage__);
        };

        //控制代码执行
        controllerData=controllerVm(controllerData.actionFn,{},controllerData.info);

    }else{
        displayFn({});
    }

};


//控制器解析
Include('controller/index.js');

//视图解析
Include('view/index.js');

//数据模型解析
Include('model/index.js');

//请求服务解析
Include('server/index.js');

//@make : end
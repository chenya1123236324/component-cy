/**
 * Created by xiyuan on 16-5-17.
 */

/**
 * 控制器镜像(控制器的实现)
 * @param parameter
 * @param info
 */
function controllerImage(parameter, info) {

    //视图渲染数据存储
    def(this, '__storage__');
    this.__storage__ = {
        //存储视图分配的数据
        assign: {},
        filter:{},
        layout: null,
        animate: null,
        viewPath: null,
        display: true,
        layoutSource:null,
        eleStorage:{
            tpls:[],
            blocks:{}
        },
        displayFn: function (__storage__) {
            info.displayFn(__storage__);
        },
        __info__: info
    };

}

/**
 * 页面标题设置
 * @param title
 * @returns {String}
 */
controllerImage.prototype.title = function (title) {
    if (title) {
        this.__storage__.title = title;
        window.document.title = title;
    }
    return this;
};

/**
 * 视图数据分配
 * @param varName
 * @param varData
 * @returns {modelData}
 */
controllerImage.prototype.assign = function (varName, varData) {
    //检查是否model(为数据创建绑定)
    this.__storage__.assign[varName] instanceof $modelInterface ?
        this.__storage__.assign[varName].$model =varData://(varData instanceof $modelInterface?varData.$model:varData ):
        this.__storage__.assign[varName]=varData;

    return this;
};

/**
 * 过滤器
 * @param filterName
 * @param fn
 * @returns {*}
 */
controllerImage.prototype.filter = function (filterName, fn) {
    this.__storage__.filter[filterName] = fn;
    return this;
};

/**
 * 控制器继承 第一个参数是控制器路径  之后参数都是需要传递的参数
 * @param controller
 * @returns {controllerImage}
 */
controllerImage.prototype.extend = function (controller) {
    var args = arguments, i = 0, l = args.length,
        parameter = [];

    while (++i < l) {
        parameter.push(args[i]);
    }

    //控制器资源获取
    $sourceManage.getControllerSource(controller, function () {

    });

    return this;
};

/**
 * 页面布局
 * @param layoutPath
 * @returns {controllerImage}
 */
controllerImage.prototype.layout = function (layoutPath,layoutController,layoutSuffix) {
    if(!layoutPath || typeof layoutPath !== 'string')return this;
    this.__storage__.layout =layoutPath=sourcePathNormal(layoutPath,this.__storage__.__info__);

    layoutSuffix = typeof layoutController === 'string' && layoutController;

    $sourceManage.getViewSource(layoutPath,function(source, sourceType){
        this.__storage__.__info__.layoutRender(this.__storage__,this.__storage__.layoutSource =source);
    }.bind(this),{},layoutSuffix);
    return this;
};

/**
 * 页面跳换动画模式
 * @param animate
 * @returns {controllerImage}
 */
controllerImage.prototype.animate = function (animate) {
    this.__storage__.animate = animate;
    return this;
};

/**
 * 页面展示
 * @param viewPath
 * @returns {controllerImage}
 */
controllerImage.prototype.display = function (viewPath) {
    if (viewPath === false) {
        this.__storage__.display = false;
    } else {
        this.__storage__.viewPath = viewPath || null;
    }
    //调用展示回调
    this.__storage__.displayFn(this.__storage__);
    return this;
};

/**
 * 页面重定向
 * @param pagePath
 * @returns {controllerImage}
 */
controllerImage.prototype.redirect = $routeManage.redirect;

/**
 * 数据模型调用
 * @param modelPath
 * @returns {$modelInterface}
 */
var $MODEL = $FRAME.$model=$FRAME.model=controllerImage.prototype.model = function (modelPath) {

    if(modelPath instanceof  $modelInterface){
        return modelPath;
    }
    var args = arguments,
        i = ~0,
        arg,
        l = args.length,
        modelCode,
        $modelData,
        modelUrl,
        includeModel = [];

        while (++i < l) {
            switch (getType(arg = args[i])) {
                case 'Function':
                    modelCode = arg;
                    break ;
                case 'Array':
                    $modelData = arg;
                    includeModel = includeModel.concat(arg);
                    break;
                case 'String':
                    modelUrl = arg;
                    includeModel.push(arg);
                    break;
                default:
                    $modelData = arg;
            }
        }

    if (!l) {
        modelPath = {
            modelCode: function () {},
            includeModel: includeModel
        };
    }
    //检查是否内建model
    else if(modelCode) {
        modelPath = {
            modelCode: modelCode,
            includeModel: includeModel
        };

        //检查是否引入外部model
    } else if (modelUrl) {
        modelPath = modelUrl;

        //检查当前环境是内部还是外部
        if(this instanceof controllerImage || this instanceof modelImage){
            modelPath= sourcePathNormal(modelPath,this.__storage__.__info__);
        }

        //纯数据模型
    } else {
        modelPath = {
            data: $modelData
        }
    }

    return new $modelInterface(modelPath, this instanceof controllerImage || this instanceof modelImage ? this : undefined);
};






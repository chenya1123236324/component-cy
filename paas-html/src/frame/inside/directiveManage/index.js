/**
 * Created by xiyuan on 16-6-14.
 */
//@make : start

//指令管理
var $directiveManage = {
    /**
     * 组件注册
     * @param name
     * @param conf
     * @param type
     */
    register: function (name, conf,type) {
        var __directiveTypes__=this.__directiveTypes__,
            instance=new directiveInterface(name, conf),
            confData=instance.confData,
            cid=instance.cid;

        this.__Storage__[type?'ele':'attr'][instance.name]=instance;
    },
    //组件库
    __Storage__:{
        ele:{

        },
        attr:{

        }
    }
};

/**
 * 组件接口
 * @param name
 * @param conf
 * @returns {directiveInterface}
 */
function directiveInterface(name, conf) {
    //存储原始name
    this.$name=name;

    //转化name   如转换 listGrid   <list-grid></list-grid>
    this.name = name.replace(/^[A-Z]/, function (s) {
        return s.toLowerCase();
    }).replace(/[A-Z]/g, function (s) {
        return '-' + s.toLowerCase();
    });

    //生成指令ID
    this.cid = $commFn.makeId();

    //配置初始化
    this.confData=this.confInit(name, conf);

    return this;
};

/**
 * 组件配置初始化
 * @param name
 * @param conf
 * @returns {*}
 */
directiveInterface.prototype.confInit = function (name, conf) {

    if(conf){
        var confData;
        switch ($type.getType(conf) ){
            case 'object':
                confData=conf;
            case 'function':
                confData || ((confData={}).update=conf);
                typeof confData.priority  === "undefined" && (confData.priority=1);
                return confData;

        }
    }

    $log.warning('[指令] ' + name + ' 注册配置错误！');
    return {priority:1};
};

/**
 * 组件绘制
 * @param element
 * @param attrs
 */
directiveInterface.prototype.drawing=function(element,attrs){

};


//@make : end

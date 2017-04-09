/**
 * Created by xiyuan on 16-11-21.
 */
template(function ($app, $appConfig) {

    /**
     * 模板渲染
     * @param templateConf
     * @param renderConf
     */
    function render(templateConf, renderConf) {

        if (!renderConf.container.parentNode)return;

        var container,
            templateView = this.viewVM(templateConf.template, templateConf.scope || {},templateConf.filter||{});

        if (templateView.firstChild) {

            //删除之前容器中的元素
            renderConf.eleStroage.forEach(function (ele) {
                ele.parentNode && ele.parentNode.removeChild(ele);
            });

            //元素存储
            renderConf.eleStroage = [].slice.call(templateView.childNodes);
            container = renderConf.eleStroage.shift();

            //渲染后的元素替换
            renderConf.container.parentNode.replaceChild(templateView, renderConf.container);

            //重置模板容器
            renderConf.container = container;
        }
        //对象手动销毁
        container=templateView=templateConf= renderConf=null;
    }

    $app.componentRegister('template', {
        //指令优先级 降序执行
        priority: 10000,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var renderConf = {
                    comp: this,
                    eleStroage: [],
                    container: this.$element
                },
                //替补元素(空文本节点)
                substitute = document.createTextNode('');

            //检查是否拥有父元素
            if (this.$element.parentNode) {
                this.$element.parentNode.replaceChild(substitute, this.$element);
                renderConf.container = substitute;
            }

            this.watchAttrData('config', function (templateConf) {
                //检查数据是否有效
                if (templateConf && typeof templateConf.template !== 'undefined' && templateConf.template !== null) {

                    //转换数据为监听对象
                    var confModel = this.model(templateConf);

                    //监听模板变量
                    confModel.watch('template', function () {
                        //模板渲染
                        render.call(this, templateConf, renderConf)
                    }.bind(this));

                    //模板渲染
                    render.call(this, templateConf, renderConf)

                    confModel=null;

                }else{

                    //删除之前容器中的元素
                    renderConf.eleStroage.forEach(function (ele) {
                        ele.parentNode && ele.parentNode.removeChild(ele);
                        ele=null;
                    });

                    //清空元素容器
                    renderConf.eleStroage=[];

                    //移除之前容器元素为空文本节点
                    renderConf.container.parentNode.replaceChild(substitute,renderConf.container);
                    //重置模板容器
                    renderConf.container = substitute;
                }

            }.bind(this))


        }
    });
});
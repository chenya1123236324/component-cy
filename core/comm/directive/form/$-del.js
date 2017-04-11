/**
 * Created by xiyuan on 16-8-10.
 */
del(function ($app, $appConfig) {

    /**
     * 用于输入框内有内容则显示删除图标
     */
    $app.directiveRegister('$Del', {
        //指令优先级 降序执行
        priority: 0,
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            //创建事件
            var delEvent = document.createEvent('HTMLEvents');
            delEvent.initEvent("change", true, true);
            delEvent.eventType = 'change';

            var delElement = this.delElement = document.createElement('div'),
                inputElement = this.$element,
                hover = false,
                inputModelDirective,
                inputModelExpression,
                nextSibling = inputElement.nextSibling;

            //在 bind 之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值。
            function update() {
                if (inputElement.value.length) {
                    delElement.classList.add('on');
                } else {
                    delElement.classList.remove('on');
                }
            }

            delElement.classList.add('input-del');
            delElement.innerHTML = '<span></span>';

            nextSibling ? inputElement.parentNode.insertBefore(delElement,nextSibling) : inputElement.parentNode.appendChild(delElement)

            //内容改变事件
            inputElement.addEventListener('change', function () {
                hover || update();
            }.bind(this), false);

            //按键按下
            inputElement.addEventListener('keydown', function () {
                hover = false;
                update();
            }.bind(this), false);

            //按键松开
            inputElement.addEventListener('keyup', function () {
                hover = false;
                update();
            }.bind(this), false);

            //获取焦点
            inputElement.addEventListener('focus', function () {
                hover = false;
                update();
            }.bind(this), false);

            //失去焦点
            inputElement.addEventListener('blur', function () {
                hover || delElement.classList.remove('on');
            }, false);

            //删除表单值
            delElement.addEventListener('click', function () {
                hover = false;
                inputElement.value = '';
                delElement.classList.remove('on');
                //文本框节点分派一个合成事件
                inputElement.dispatchEvent(delEvent);
                //修改VM中的数据
                this.ModelDirectiveVM && (this.ModelDirectiveVM.write(this.ModelDirectiveKey, ''));
            }.bind(this), false);

            //删除按钮 移上
            delElement.addEventListener('mouseover', function () {
                hover = true;
            }, false);

            //删除按钮 移开
            delElement.addEventListener('mouseout', function () {
                hover = false;
            }, false);

            //检测是否绑定数据模型
            if ((inputModelDirective = this.directiveAll['$-model']) && (inputModelExpression = inputModelDirective.attrInfo.expression)) {

                var expReg = inputModelExpression.match(/([^\.\[\(]+)([\s\S]*)$/),
                    modelName = expReg[1],
                    watchKey = expReg[2],
                    $VM=this.$scope[modelName];

                //检查是否Model数据
                if(!this.isVM($VM)) {
                    this.$scope[modelName] = $VM = this.$MODEL($VM);
                }

                this.ModelDirectiveKey = watchKey;
                this.ModelDirectiveVM = $VM || this.$MODEL();
            }

        }
    });


});
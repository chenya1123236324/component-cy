/**
 * Created by xiyuan on 16-12-12.
 */
select(function ($app, $appConfig) {

    //获取元素样式
    function getStyle(el, styleName) {
        return el.style[styleName] ? el.style[styleName] : el.currentStyle ? el.currentStyle[styleName] : window.getComputedStyle(el, null)[styleName];
    }

    //获取滚动容器
    function getOverflow(e) {
        if (e.nodeName === "#document-fragment") {
            return e;
        } else if (['auto', 'scroll'].in(getStyle(e, 'overflowY')) !== -1) {
            return e
        } else if (e === document.body) {
            return e;
        } else {
            return getOverflow(e.parentNode)
        }
    }

    //选择框框体模板
    var template = '<div class="select-document" $-class="{multiple:selectConfig.multiple}" $-on:mouseover="selectInfo|mouseover" $-on:mouseout="selectInfo|mouseout" $-parses-bind:style="selectConfig.style|styleHandle" $-render="selectConfig.multiple|multipleWatch:[$,selectElement]">' +
            '<div class="select-content" $-on:click="selectInfo|open_click:[$,selectElement]">' +
            '<div $-if="!selectConfig.multiple" class="select-input" $-render="selectConfig.name|setName:[$,selectElement]">' +
            '<span>{{selectInfo.content}}</span>' +
            '<i class="iconfont icon-xiala"></i>' +
            '</div>' +
            '<div class="select-multiple-container" $-if="selectConfig.multiple">' +
            '<template config="selectInfo.selectOption|multipleNodeHandle:[selectInfo]"></template>' +
            '</div>' +
            '</div>' +
            '</div>',
        //选择框列表数据模板
        mainTemplate = '<div class="select-list-document" $-class="{search:selectConfig.search}" $-on:mouseover="selectInfo|mouseover" $-on:mouseout="selectInfo|mouseout" $-render="selectInfo.isOpen|showHandle:[$,selectInfo]" tabindex="0" $-on:blur="selectInfo|hidden_blur">' +
            '<div class="select-search" $-if="selectConfig.search">' +
            '<input $-on:blur="selectInfo|hidden_blur" $-model="selectInfo.searchText" type="text" class="select-search-main">' +
            '</div>' +
            '<ul class="select-main">' +
            '<li $-render="option|initRender:[$,selectInfo,gIndex,0,selectConfig]" $-bind:class="option|optionClass" $-for="(gIndex , option) in selectConfig.dataList" $-class="selectInfo.selectOption|selectState:[selectInfo,gIndex,0,option]" $-show="selectInfo.searchText|rowSearchHandle:[$,option,gIndex,selectInfo.showRow]">' +
            '<label $-on:click="option|selectValue:[$,selectInfo,gIndex,0,selectElement,selectConfig]" $-bind:title="option.label||option.content||option.value">{{option.label||option.content||option.value}}</label>' +
            '<ul $-if="option.isGroup">' +
            '<li $-render="optionInfo|initRender:[$,selectInfo,gIndex,oIndex,selectConfig.dataList,option.list]" class="option" $-for="(oIndex,optionInfo) in option.list" $-class="selectInfo.selectOption|selectState:[selectInfo,gIndex,oIndex,optionInfo]" $-show="selectInfo.showRow[gIndex+\'_\'+oIndex]">' +
            '<label $-on:click="optionInfo|selectValue:[$,selectInfo,gIndex,oIndex,selectElement,selectConfig]" $-bind:title="optionInfo.content||optionInfo.value">{{optionInfo.content||optionInfo.value}}</label>' +
            '</li>' +
            '</ul>' +
            '</li>' +
            '</ul>' +
            '</div>',
        nativeTemplate = '<for config="(gIndex , option) in selectConfig.dataList"><template config="option|nativeRender:[$,gIndex]"></template></for>',
        filter = {
            //初始化渲染
            initRender: function (option, selectInfo, gIndex, oIndex, selectConfig) {
                return function () {
                    var option_key = '_' + gIndex + '_' + oIndex;

                    //存放option显示的值
                    !(option.isGroup || option.list) && (selectInfo.optionVals[option_key] = option.content || option.value);

                    //默认设置第一个option为选中状态 检查option是否配置选中状态
                    if ((!selectInfo.selectOption.length || option.selected) && !(option.isGroup || option.list) && !option.disabled) {
                        //检查是否单选
                        if (!selectConfig.multiple) {
                            selectInfo.selectOption = [];
                        }
                        selectInfo.value = option.value || option.content;
                        selectInfo.content = option.content || option.value;
                        selectInfo.selectOption.in(option_key) !== -1 || selectInfo.selectOption.push(option_key);
                    }
                }
            },
            //name设置
            setName: function (name, selectElement) {
                selectElement.name = name || selectElement.name;
                selectElement.setAttribute('name', name || selectElement.name);
            },
            //样式渲染绑定
            styleHandle: function (styles) {
                var style = '';
                styles && typeof styles === 'object' && styles.forEach(function (val, key) {
                    style += key + ':{{selectConfig.style["' + key + '"]}};'
                });
                return style;
            },
            //列表数据展示处理
            showHandle: function (isOpen, selectInfo) {
                return function (ele) {
                    if (isOpen) {

                        //获取组件距离视窗的相关数据
                        var scrollEle = getOverflow(selectInfo.selectInputEle),
                            scrollTop=0,
                            scrollLeft=0,
                            scrollOffsetInfo = scrollEle.getBoundingClientRect(),
                            thisOffsetInfo = selectInfo.selectInputEle.getBoundingClientRect(),
                            //检查按钮的定位类型
                            displayStyle = getStyle(scrollEle, 'position');

                        'relative absolute'.indexOf(displayStyle) === -1 && (scrollEle.style.position = 'relative');

                        if(scrollEle.tagName !== 'BODY'){
                            scrollTop=scrollEle.scrollTop;
                            scrollLeft=scrollEle.scrollLeft;
                        }

                        ele.style.width = selectInfo.selectInputEle.offsetWidth + 'px';
                        ele.style.top = (scrollTop + thisOffsetInfo.top) - scrollOffsetInfo.top + selectInfo.selectInputEle.offsetHeight + 'px';
                        ele.style.left = (scrollLeft + thisOffsetInfo.left) - scrollOffsetInfo.left + 'px';
                        scrollEle.appendChild(ele);

                        (ele.querySelector('input') || ele).focus();
                    } else {
                        ele.parentNode && ele.parentNode.removeChild(ele)
                    }
                }
            },
            //值选择处理
            selectValue: function (option, selectInfo, gIndex, oIndex, selectElement, selectConfig) {
                return function () {
                    var option_key = '_' + gIndex + '_' + oIndex;
                    //检查是否单选
                    if (!selectConfig.multiple) {
                        selectInfo.selectOption = [];
                    }

                    if (selectInfo.selectOption.in(option_key) === -1) {
                        selectInfo.value = option.value || option.content;
                        selectInfo.content = option.content || option.value;
                        selectInfo.selectOption.push(option_key);
                        //事件代理
                        selectElement.dispatchEvent(new Event('change'));
                    }
                    selectInfo.isOpen = false;
                }
            },
            //状态选择处理
            selectState: function (selectInfo, gIndex, oIndex, optionInfo) {
                return {
                    'disabled': optionInfo.disabled,
                    'select-option': selectInfo.selectOption.in('_' + gIndex + '_' + oIndex) !== -1
                }
            },
            //处理数据选项类型
            optionClass: function (option) {
                return option.isGroup || option.list && (option.isGroup = true) ? 'optgroup' : 'option';
            },
            //框体点击打开处理
            open_click: function (selectInfo, selectElement) {
                return function () {
                    //事件代理
                    selectElement.dispatchEvent(new Event('click'));
                    selectInfo.isOpen = !selectInfo.isOpen;
                }
            },
            //内容体焦点失去事件处理(辅助专用)
            hidden_blur: function (selectInfo) {
                return function () {
                    selectInfo.isHover || (selectInfo.isOpen = false);
                }
            },
            //鼠标移出事件处理(辅助专用)
            mouseout: function (selectInfo) {
                return function () {
                    selectInfo.isHover = false;
                }
            },
            //鼠标移入事件处理(辅助专用)
            mouseover: function (selectInfo) {
                return function () {
                    selectInfo.isHover = true;
                }
            },
            //原生select渲染处理
            nativeRender: function (option, gIndex) {
                return {
                    scope: {
                        gIndex: gIndex
                    },
                    template: option.isGroup || option.list && (option.isGroup = true) ?
                        '<optgroup $-bind:label="option.label||option.content"><option $-for="(oIndex,optionInfo) in option.list" $-bind:value="optionInfo.value||optionInfo.content" $-bind:selected="selectInfo.selectOption|nativeSelectState:[selectInfo,gIndex,oIndex,\'selected\']" $-bind:disabled="optionInfo.disabled" >{{optionInfo.content||optionInfo.value}}</option></optgroup>' :
                        '<option $-bind:value="option.value||option.content" $-bind:disabled="option.disabled" $-bind:selected="selectInfo.selectOption|nativeSelectState:[selectInfo,gIndex,0,\'selected\']">{{option.content||option.value}}</option>'
                }
            },
            nativeSelectState: function (selectInfo, gIndex, oIndex, state) {
                return selectInfo.selectOption.in('_' + gIndex + '_' + oIndex) !== -1 ? state : false;
            },
            //搜索处理
            rowSearchHandle: function (searchText, option, gIndex, showRow) {
                return option.isGroup || option.list ? function () {
                        var isShow = false;
                        (option.list || []).forEach(function (option, oIndex) {
                            showRow[gIndex + '_' + oIndex] = (option.content || option.value).indexOf(searchText) !== -1 && (isShow = true)
                        });
                        return isShow;
                    }() : (option.content || option.value).indexOf(searchText) !== -1;
            },
            //多选节点处理
            multipleNodeHandle: function (selectInfo) {
                return {
                    template: '<ul><li $-for="node in selectInfo.selectOption"><span>{{selectInfo.optionVals[node]}}<i class="iconfont icon-chenghao" $-on:click="node|removeMultipleNodeHandle:[$,selectInfo]"></i></span></li></ul>'
                }
            },
            //多选节点删除
            removeMultipleNodeHandle: function (nodeKey, selectInfo) {
                return function (e) {
                    selectInfo.selectOption.splice(selectInfo.selectOption.in(nodeKey), 1);
                    e.stopPropagation();
                }
            },
            //多选监听
            multipleWatch: function (multiple, selectElement) {
                return function () {
                    //修改原生select多选属性
                    selectElement.multiple = multiple;
                }
            }
        };

    //select组件注册
    $app.componentRegister('select', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var selectDocument,
                selectBodyDocument,
                container = this.$element,
                selectElement = this.$element,
                events = {},
                //选择框作用域
                scope = {
                    selectElement: selectElement,
                    selectConfig:null,
                    selectInfo: {
                        selectOption: [],
                        optionVals: {},
                        isOpen: false,
                        isHover: false,
                        searchText: '',
                        showRow: {},
                        content:'加载中...'
                    }
                };

            //渲染选择框 框体部分
            scope.selectInfo.selectInputEle = selectDocument = this.viewVM(template, scope, filter).firstChild;

            container.parentNode.replaceChild(selectDocument, container);
            selectDocument.appendChild(selectElement);

            this.watchAttrData('config', function (selectConfig) {

                //设置初始化的值
                if(selectConfig.value){
                    selectConfig.dataList.forEach(function (groupInfo) {
                        groupInfo.isGroup ? groupInfo.list.forEach(function (optionInfo) {
                            optionInfo.value == selectConfig.value && (optionInfo.selected=true)
                        }):(groupInfo.value == selectConfig.value && (groupInfo.selected=true))
                    })
                }

                scope.selectConfig=selectConfig;

                //初始化设置是否多选
                scope.multiple=selectElement.multiple = selectConfig.multiple = selectConfig.multiple || selectElement.multiple;

                $FRAME.$model(selectConfig).watch('events',function ($events) {
                    //事件解绑
                    events.forEach(function (fn, eventName) {
                        selectElement.removeEventListener(eventName, fn, false);
                    });

                    //事件绑定
                    (events = $events || {}).forEach(function (fn, eventName) {
                        selectElement.addEventListener(eventName, fn, false);
                    });
                });

                //事件解绑
                events.forEach(function (fn, eventName) {
                    selectElement.removeEventListener(eventName, fn, false);
                });

                //事件绑定
                (events = selectConfig.events || {}).forEach(function (fn, eventName) {
                    selectElement.addEventListener(eventName, fn, false);
                });

                //渲染选择框 内部列表部分
                selectBodyDocument = this.viewVM(mainTemplate, scope, filter).firstChild;

                //渲染原生对象
                selectElement.innerHTML = '';
                selectElement.appendChild(this.viewVM(nativeTemplate, scope, filter));

            }.bind(this));
        }
    });
});
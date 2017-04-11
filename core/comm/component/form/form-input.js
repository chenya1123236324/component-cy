/**
 * Created by xiyuan on 16-11-30.
 */
input(function ($app, $appConfig) {

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

    //日期组件渲染
    function renderDate(tools, inputConf) {
        var comp = tools.comp,
            $date = tools.$date,
            showFlag = false,
            modelList = [],
            dateLayout = (inputConf.layout || 'yy-mm-dd hh:ii:ss').toLowerCase(),
            dateContainer = document.createElement('div'),
            events = {
                blur: function () {
                    showFlag = false;
                    events.destroyEvent();
                    dateContainer.parentNode && dateContainer.parentNode.removeChild(dateContainer);
                },
                mouseout: function () {
                    showFlag = false;
                },
                mouseover: function () {
                    showFlag = true;
                },
                destroyEvent: function () {

                    dateContainer.removeEventListener('mouseover', events.mouseover);

                    dateContainer.removeEventListener('mouseout', events.mouseout);

                    dateContainer.removeEventListener('blur', events.blur);
                },
                bindEvent: function () {

                    dateContainer.addEventListener('mouseover', events.mouseover);

                    dateContainer.addEventListener('mouseout', events.mouseout);

                    dateContainer.addEventListener('blur', events.blur);
                }
            };

        comp.$element.value && (comp.$element.value = $date.convert(comp.$element.value, dateLayout));
        //设置元素属性
        comp.$element.setAttribute('type', 'text');
        comp.$element.setAttribute('readOnly', '');
        dateContainer.className = 'input-date-main';
        dateContainer.setAttribute('tabindex', '0');

        //把容器定位
        comp.$element.addEventListener('focus', function () {
            //获取组件距离视窗的相关数据
            var scrollEle = getOverflow(comp.$element),
                scrollTop = 0,
                scrollLeft = 0,
                scrollOffsetInfo = scrollEle.getBoundingClientRect(),
                thisOffsetInfo = comp.$element.getBoundingClientRect(),
                //检查按钮的定位类型
                displayStyle = getStyle(scrollEle, 'position');

            'relative absolute'.indexOf(displayStyle) === -1 && (scrollEle.style.position = 'relative');

            if (scrollEle.tagName !== 'BODY') {
                scrollTop = scrollEle.scrollTop;
                scrollLeft = scrollEle.scrollLeft;
            }

            dateContainer.style.top = (scrollTop + thisOffsetInfo.top) - scrollOffsetInfo.top + this.offsetHeight + 'px';
            dateContainer.style.left = (scrollLeft + thisOffsetInfo.left) - scrollOffsetInfo.left + 'px';
            scrollEle.appendChild(dateContainer);

            events.bindEvent();
        });

        comp.$element.addEventListener('blur', function () {
            if (showFlag)return;
            dateContainer.parentNode && dateContainer.parentNode.removeChild(dateContainer);
            events.destroyEvent();
        });


        'year month date hours minutes seconds'.split(' ').forEach(function (model) {
            switch (model) {
                case 'year':
                    dateLayout.indexOf('y') !== -1 && modelList.push('year');
                    break;
                case 'month':
                    dateLayout.indexOf('m') !== -1 && modelList.push('month');
                    break;
                case 'date':
                    dateLayout.indexOf('d') !== -1 && modelList.push('date');
                    break;
                case 'hours':
                    dateLayout.indexOf('h') !== -1 && modelList.push('hours');
                    break;
                case 'minutes':
                    dateLayout.indexOf('i') !== -1 && modelList.push('minutes');
                    break;
                case 'seconds':
                    dateLayout.indexOf('s') !== -1 && modelList.push('seconds');
                    break;
            }
        });

        var template = '<div class="date-main">' +
                '<div class="date-header">' +
                '<span $-on:click="eventManage.prev" $-class="{disabled:config.prevDisabled}">' +
                '<i class="iconfont icon-left"></i>' +
                '</span>' +
                '<ul>' +
                '<li $-if="config.modelList.in(\'year\') != -1 " $-on:click="eventManage.setType(\'year\')" $-class="{focus:config.nowType == \'year\'}">{{dateData.nowYear}}年</li>' +
                '<li $-if="config.modelList.in(\'month\') != -1 " $-on:click="eventManage.setType(\'month\')" $-class="{focus:config.nowType == \'month\'}">{{dateData.nowMonth}}月</li>' +
                '<li $-if="config.modelList.in(\'date\') != -1 " $-on:click="eventManage.setType(\'date\')" $-class="{focus:config.nowType == \'date\'}">{{dateData.nowDate}}日</li>' +
                '<li class="header-title" $-if="config.modelList.in(\'year\') == -1 && config.modelList.in(\'month\') == -1 && config.modelList.in(\'date\') == -1 ">日期选择</li>' +
                '</ul>' +
                '<span $-on:click="eventManage.next" $-class="{disabled:config.nextDisabled}">' +
                '<i class="iconfont icon-right"></i>' +
                '</span>' +
                '</div>' +
                '<div class="date-body">' +
                '<div class="date-body-container">' +
                '<div class="year-container" $-class="{focus:config.nowType == \'year\'}">' +
                '<ul $-render="dateData|yearUpdate:[$,config.nowType,config.turning]">' +
                '<li $-for="data in config.yearList" $-class="{focus:data.value == dateData.nowYear}" $-on:click="eventManage.selectDate(data.value,\'nowYear\')">{{data.value}}</li>' +
                '</ul>' +
                '</div>' +
                '<div class="month-container" $-class="{focus:config.nowType == \'month\'}">' +
                '<ul $-render="dateData|monthUpdate:[$,config.nowType,config.turning]">' +
                '<li $-for="data in config.monthList" $-class="{focus:data.value == dateData.nowMonth}" $-on:click="eventManage.selectDate(data.value,\'nowMonth\')">{{data.content}}月</li>' +
                '</ul>' +
                '</div>' +
                '<div class="date-container" $-class="{focus:config.nowType == \'date\'}">' +
                '<ul class="date_list_week" $-render="dateData.nowMonth|changeDate:[$,dateData.nowYear]">' +
                '<li $-for="week in config.weekList">{{week}}</li>' +
                '</ul>' +
                '<ul $-render="dateData|dateUpdate:[$,config.nowType,config.turning,dateData.nowMonth]">' +
                '<li $-for="data in config.dateList" $-bind:class="data.type" $-class="{focus:data.value == dateData.nowDate}" $-on:click="eventManage.selectDate(data.value,\'nowDate\')">{{data.value}}</li>' +
                '</ul>' +
                '</div>' +
                '<div class="hours-container" $-class="{focus:config.nowType == \'hours\'}">' +
                '<ul $-render="dateData|hoursUpdate:[$,config.nowType,config.turning]">' +
                '<li $-for="data in config.hoursList" $-class="{focus:data.value == dateData.nowHours}" $-on:click="eventManage.selectDate(data.value,\'nowHours\')">{{data.value}}</li>' +
                '</ul>' +
                '</div>' +
                '<div class="minutes-container" $-class="{focus:config.nowType == \'minutes\'}">' +
                '<ul $-class="{next:config.nowType == \'minutes\' && config.turning == \'next\' }" $-render="dateData|minutesUpdate:[$,config.nowType,config.turning]">' +
                '<li $-for="data in config.minutesList" $-class="{focus:data.value == dateData.nowMinutes}" $-on:click="eventManage.selectDate(data.value,\'nowMinutes\')">{{data.value}}</li>' +
                '</ul>' +
                '</div>' +
                '<div class="seconds-container" $-class="{focus:config.nowType == \'seconds\'}">' +
                '<ul $-class="{next:config.nowType == \'seconds\' && config.turning == \'next\' }" $-render="dateData|secondsUpdate:[$,config.nowType,config.turning]">' +
                '<li $-for="data in config.secondsList" $-class="{focus:data.value == dateData.nowSeconds}" $-on:click="eventManage.selectDate(data.value,\'nowSeconds\')">{{data.value}}</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="date-footer">' +
                '<strong $-if="config.modelList.in(\'hours\') != -1 || config.modelList.in(\'minutes\') != -1 || config.modelList.in(\'seconds\') != -1">时间:</strong>' +
                '<ul>' +
                '<li $-if="config.modelList.in(\'hours\') != -1 " $-on:click="eventManage.setType(\'hours\')" $-class="{focus:config.nowType == \'hours\'}">{{dateData.nowHours}}时</li>' +
                '<li $-if="config.modelList.in(\'minutes\') != -1 " $-on:click="eventManage.setType(\'minutes\')" $-class="{focus:config.nowType == \'minutes\'}">{{dateData.nowMinutes}}分</li>' +
                '<li $-if="config.modelList.in(\'seconds\') != -1 " $-on:click="eventManage.setType(\'seconds\')" $-class="{focus:config.nowType == \'seconds\'}">{{dateData.nowSeconds}}秒</li>' +
                '</ul>' +
                '<span $-on:click="eventManage.selectEnd">确定</span>' +
                '</div>' +
                '</div>',
            nowData = $date.convert(inputConf.value),
            scope = {
                config: {
                    layout: dateLayout,
                    turning: '',
                    //当前的类型 [year month date hours minutes seconds]
                    nowType: modelList.in('date') !== -1 ? 'date' : modelList[0],
                    prevDisabled: false,
                    nextDisabled: false,
                    weekList: '一二三四五六日'.split(''),
                    months: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
                    yearList: [],
                    monthList: [],
                    dateList: [],
                    hoursList: [],
                    minutesList: [],
                    secondsList: [],
                    modelList: modelList
                },
                dateData: {
                    nowYear: nowData.getFullYear(),                   //现在的年份
                    nowMonth: nowData.getMonth() + 1,                   //现在的月份
                    nowDate: nowData.getDate(),                       //现在的日期
                    nowHours: nowData.getHours(),                     //现在的小时
                    nowMinutes: nowData.getMinutes(),                 //现在的分钟
                    nowSeconds: nowData.getSeconds(),                 //现在的秒钟
                    pastYear: nowData.getFullYear()
                },
                eventManage: {
                    prev: function () {
                        scope.config.turning = 'prev';
                        switch (scope.config.nowType) {
                            case 'minutes':
                            case 'seconds':
                                scope.config.prevDisabled = true;
                                scope.config.nextDisabled = false;
                                break;
                        }
                    },
                    next: function () {
                        scope.config.turning = 'next';
                        switch (scope.config.nowType) {
                            case 'minutes':
                            case 'seconds':
                                scope.config.prevDisabled = false;
                                scope.config.nextDisabled = true;
                                break;
                        }
                    },
                    setType: function (type) {
                        return function () {
                            scope.config.nowType = type;
                            scope.config.turning = '';
                            switch (type) {
                                case 'month':
                                case 'hours':
                                    scope.config.prevDisabled = scope.config.nextDisabled = true;
                                    break;
                                case 'minutes':
                                case 'seconds':
                                    scope.config.turning = '';
                                    scope.config.prevDisabled = true;
                                    scope.config.nextDisabled = false;
                                    break;
                                default:
                                    scope.config.prevDisabled = scope.config.nextDisabled = false;
                            }
                        }
                    },
                    selectDate: function (val, keyType) {
                        return function () {
                            scope.dateData[keyType] = val;

                            //翻页处理
                            var modelList = scope.config.modelList,
                                modelType = modelList[modelList.in(scope.config.nowType) + 1];
                            modelType && (scope.config.nowType = modelType) && scope.eventManage.setType(modelType)();
                        }
                    },
                    selectEnd: function () {
                        var dateData = scope.dateData;
                        comp.$element.value = $date.convert(new Date(dateData.nowYear + '-' + dateData.nowMonth + '-' + dateData.nowDate + ' ' + dateData.nowHours + ':' + dateData.nowMinutes + ':' + dateData.nowSeconds), scope.config.layout);
                        dateContainer.dispatchEvent(new Event('blur'));
                        comp.$element.dispatchEvent(new Event('change'));
                    }
                }
            },
            filter = {
                //year更新
                yearUpdate: function (dateData, nowType, turning) {
                    if (nowType !== 'year')return;
                    switch (turning) {
                        case 'prev':
                            dateData.pastYear = dateData.pastYear - 18;
                            break;
                        case 'next':
                            dateData.pastYear = dateData.pastYear + 18;
                            break;
                        default:
                            dateData.pastYear = dateData.nowYear
                    }

                    var index = ~0,
                        yearList = [],
                        year = dateData.pastYear - (18 / 2);

                    while (++index < 18) {
                        yearList.push({
                            value: year + index,
                            focus: (year + index) == dateData.nowYear
                        })
                    }

                    scope.config.turning = '';
                    scope.config.yearList = yearList;
                },
                monthUpdate: function (dateData, nowType, turning) {
                    if (nowType !== 'month' || scope.config.monthList.length > 0)return;

                    var monthList = [];
                    scope.config.months.forEach(function (val, index) {
                        monthList.push({
                            value: index + 1,
                            content: val
                        })
                    });

                    scope.config.turning = '';
                    scope.config.monthList = monthList;
                },
                //date更新
                dateUpdate: function (dateData, nowType, turning) {
                    if (nowType !== 'date')return;
                    switch (turning) {
                        case 'prev':
                            dateData.nowMonth = dateData.nowMonth - 1;
                            dateData.nowMonth == 0 && (dateData.nowMonth = 12, dateData.nowYear = dateData.nowYear - 1);
                            break;
                        case 'next':
                            dateData.nowMonth = dateData.nowMonth + 1;
                            dateData.nowMonth == 13 && (dateData.nowMonth = 1, dateData.nowYear = dateData.nowYear + 1);
                            break;
                    }

                    var dateList = [],
                        dateData = scope.dateData,
                        nowDateCount = new Date(dateData.nowYear, dateData.nowMonth, 0).getDate(),  //当前的月份天数
                        nowStartWeek = new Date(dateData.nowYear, dateData.nowMonth - 1, 1).getDay() || 7,            //当前月份一号是星期几
                        prevDateCount = new Date(dateData.nowYear, dateData.nowMonth - 1, 0).getDate();             //前一个月份天数

                    /*上一个月的填补*/
                    var i = prevDateCount - (nowStartWeek || 7) + 1;
                    for (i; i <= prevDateCount; i++) {
                        dateList.push({
                            type: 'prev',
                            value: i
                        });
                    }

                    /*本月的列表*/
                    for (var i = 1; i <= nowDateCount; i++) {
                        dateList.push({
                            type: 'now',
                            value: i
                        });
                    }

                    /*下月的列表*/
                    i = 42 - nowDateCount - (nowStartWeek || 7);
                    for (var j = 1; j <= i; j++) {
                        dateList.push({
                            type: 'next',
                            value: j
                        });
                    }

                    scope.config.turning = '';
                    scope.config.dateList = dateList;
                },
                hoursUpdate: function (dateData, nowType, turning) {
                    if (nowType !== 'hours' || scope.config.hoursList.length > 0)return;

                    var index = 0,
                        hoursList = [];
                    while (++index <= 24) {
                        hoursList.push({
                            type: 'next',
                            value: index == 24 ? 0 : index
                        });
                    }

                    scope.config.turning = '';
                    scope.config.hoursList = hoursList;
                },
                minutesUpdate: function (dateData, nowType, turning) {
                    if (nowType !== 'minutes' || scope.config.minutesList.length > 0)return;

                    var index = ~0,
                        minutesList = [];
                    while (++index < 60) {
                        minutesList.push({
                            type: 'next',
                            value: index
                        });
                    }

                    scope.config.minutesList = minutesList;
                },
                secondsUpdate: function (dateData, nowType, turning) {
                    if (nowType !== 'seconds' || scope.config.secondsList.length > 0)return;

                    var index = ~0,
                        secondsList = [];
                    while (++index < 60) {
                        secondsList.push({
                            type: 'next',
                            value: index
                        });
                    }

                    scope.config.secondsList = secondsList;
                },
                //监听防止月份里不包含最大的那个日期
                changeDate: function (nowMonth, nowYear) {
                    var dateData = scope.dateData,
                        nowDateCount = new Date(dateData.nowYear, dateData.nowMonth, 0).getDate()  //当前的月份天数
                    //检查当前月份里是否有当前的日期
                    dateData.nowDate > nowDateCount && (dateData.nowDate = nowDateCount);
                }
            };

        dateContainer.appendChild(comp.viewVM(template, scope, filter));

        scope.eventManage.setType(scope.config.nowType)()

    }

    //图标组件渲染
    function iconsRender(comp, tools) {
        var $element = comp.$element,
            scope = {
                innerConf: {}
            },
            showEle = comp.viewVM('<div class="input-icon"><div class="icon-container"><i $-parses:style="color:{{innerConf.color}}" class="default"></i></div></div>', scope).firstChild;

        var iEle = showEle.querySelector('i');
        $element.type = 'hidden';

        $element.value && (iEle.className = "iconfont icon-" + $element.value);

        $element.parentNode.replaceChild(showEle, $element);
        showEle.appendChild($element);

        //设置展示的文本框只读
        $element.setAttribute('readOnly', '');

        showEle.addEventListener('click', function () {
            var iconName = $element.value;
            tools.$dialog({
                title: '图标选择',
                maxmin: true,
                content: '<list-icon config="iconConfig"></list-icon>',
                scope: {
                    iconConfig: {
                        select: function (_iconName) {
                            iconName = _iconName;
                        }
                    }
                },
                filter: {},
                height: '360px',
                width: '600px',
                btns: [
                    {
                        name: '确定',
                        trigger: function (eve, interface) {
                            $element.value = iconName;
                            $element.dispatchEvent(new Event('change'));
                            iEle.className = "iconfont icon-" + iconName;
                            iconName && (iEle.innerHTML = "");
                            interface.close();
                        }
                    },
                    {
                        name: '取消',
                        theme: "warning", //[ primary , success , info , warning , danger ]
                        trigger: function (eve, interface) {
                            interface.close();
                        }
                    }
                ]
            })
        });

        //配置监听
        comp.watchAttrData('config', function (iconConf) {
            scope.innerConf = iconConf
        })

    }

    //树形菜单渲染
    function treeRender(tools, inputConf) {

        var comp = tools.comp,
            $element = comp.$element,
            showElement = document.createElement('input'),
            isClose = true,
            scope = {
                treeApi: null,
                inputConf: null
            },
            filter = {
                confirm: function (treeApi) {
                    return function () {
                        targetEle.parentNode.removeChild(targetEle);
                        //选择的值回现到input中
                        scope.inputConf.select && scope.inputConf.select(treeApi.focusData, function write(showVal, realVal) {
                            showElement.value = showVal;
                            $element.value = realVal;
                            $element.dispatchEvent(new Event('change'));
                        })
                    }
                },
                cancel: function (treeApi) {
                    return function () {
                        targetEle.parentNode.removeChild(targetEle)
                    }
                }
            },
            template = '<div class="input-tree" tabindex="0">' +
                '<list-tree config="inputConf.treeConf" api="treeApi"></list-tree>' +
                '<div class="action-main">' +
                '<button class="confirm" type="button" $-on:click="treeApi|confirm">确定</button>' +
                '<button class="cancel" type="button" $-on:click="treeApi|cancel">取消</button>' +
                '</div>' +
                '</div>',
            targetEle = comp.viewVM(template, scope, filter).firstChild;

        $element.type = "hidden";
        showElement.type = "text";
        showElement.placeholder = $element.placeholder;

        //设置展示的文本框只读
        showElement.setAttribute('readOnly', '');

        //目标文本框替换成展示文本框
        $element.parentNode.insertBefore(showElement, $element);

        //把容器定位
        showElement.addEventListener('focus', function () {
            //获取组件距离视窗的相关数据
            var scrollEle = getOverflow(showElement),
                scrollTop = 0,
                scrollLeft = 0,
                scrollOffsetInfo = scrollEle.getBoundingClientRect(),
                thisOffsetInfo = showElement.getBoundingClientRect(),
                //检查按钮的定位类型
                displayStyle = getStyle(scrollEle, 'position');

            'relative absolute'.indexOf(displayStyle) === -1 && (scrollEle.style.position = 'relative');

            if (scrollEle.tagName !== 'BODY') {
                scrollTop = scrollEle.scrollTop;
                scrollLeft = scrollEle.scrollLeft;
            }

            targetEle.style.minWidth = showElement.offsetWidth + 'px';
            targetEle.style.top = (scrollTop + thisOffsetInfo.top) - scrollOffsetInfo.top + this.offsetHeight + 'px';
            targetEle.style.left = (scrollLeft + thisOffsetInfo.left) - scrollOffsetInfo.left + 'px';

            scrollEle.appendChild(targetEle);

        });

        //以下事件监听处理浮层的关闭处理
        showElement.addEventListener('blur', function () {
            isClose && targetEle.parentNode.removeChild(targetEle);
        });

        showElement.addEventListener('focus', function () {
            isClose = true;
        });

        targetEle.addEventListener('mouseover', function (e) {
            isClose = false;
        });

        targetEle.addEventListener('mouseout', function (e) {
            isClose = true;
        }, true);

        targetEle.addEventListener('blur', function (e) {
            isClose && targetEle.parentNode.removeChild(targetEle);
        }, true);

        //监听占位符
        comp.watchAttrData('$-bind:placeholder', function (placeholder) {
            showElement.placeholder = placeholder;
        });

        //配置监听
        comp.watchAttrData('config', function ($inputConf) {
            scope.inputConf = $inputConf;
            showElement.name = $inputConf.showName || '';
            showElement.value = $inputConf.showValue || '';
        })

    }

    //树形菜单联动LIST
    function organisationRender(tools, inputConf) {

        var orgApi = $FRAME.model(),
            $element = tools.comp.$element,
            showElement = document.createElement('input'),
            selectFn = function () {

            },
            scope = {
                title: '标题',
                orgConf: {
                    orgCode: null
                },
                orgApi: orgApi
            };

        $element.type = "hidden";
        showElement.type = "text";
        showElement.placeholder = $element.placeholder;

        //设置展示的文本框只读
        showElement.setAttribute('readOnly', '');

        //目标文本框替换成展示文本框
        $element.parentNode.insertBefore(showElement, $element);

        //监听占位符
        tools.comp.watchAttrData('$-bind:placeholder', function (placeholder) {
            showElement.placeholder = placeholder;
        });

        //监听数据配置
        tools.comp.watchAttrData('config', function (config) {
            scope.orgConf.orgCode = config.orgCode;
            selectFn = config.select;
            showElement.name = config.showName || '';
            showElement.value = config.showValue || '';
        });

        //监听input文本框点击事件 触发弹出框
        showElement.addEventListener('click', function () {
            tools.$dialog({
                title: this.placeholder,
                maxmin: true,
                content: '<app-organisation config="orgConf" api="orgApi"></app-organisation>',
                // zoom:'max',
                // offset:'center',
                scope: scope,
                filter: {},
                height: '500px',
                width: '700px',
                btns: [
                    {
                        name: '提交',
                        trigger: function (eve, interface) {
                            selectFn(orgApi.get('getSelectData')(), function write(showVal, realVal) {
                                showElement.value = showVal;
                                $element.value = realVal;
                                $element.dispatchEvent(new Event('change'));
                            }, interface);
                            // interface.close();

                        }
                    },
                    {
                        name: '取消',
                        theme: "warning", //[ primary , success , info , warning , danger ]
                        trigger: function (eve, interface) {
                            interface.close();
                        }
                    }
                ]

            });

        });

    }

    //radios / checkboxs 渲染
    function radiosRender(tools, type) {
        var comp = tools.comp,
            scope = {
                config: null
            },
            filter = {},
            template = '<div class="input-radios"><label $-for="info in config.dataList"><input $-on:change="info.change" $-bind:checked="info.checked" $-bind:value="info.value" $-bind:name="config.name" type="' + (type || 'radio') + '"><span>{{info.content}}</span></label></div>',
            radiosEle = comp.viewVM(template, scope, filter).firstChild;

        comp.watchAttrData('config', function (config) {
            scope.config = config;
        });

        comp.$element.parentNode.replaceChild(radiosEle, comp.$element);

    }

    //文件上传
    function fileRender(tools) {
        var comp = tools.comp,
            inputEle = comp.$element,
            fileContainer = document.createElement('div');

        fileContainer.innerHTML = '<span >请上传文件</span>'
        fileContainer.classList.add('input-file');
        inputEle.parentNode.replaceChild(fileContainer, inputEle);
        fileContainer.appendChild(inputEle);
    }

    //grid列表
    function girdRender(comp, tools) {
        var typeHandleFlag,
            select=function () {},
            $element = comp.$element,
            gridConf = comp.model(),
            gridApi = comp.model(),
            showElement = document.createElement('input'),
            dialogConf = {
                title: $element.placeholder,
                maxmin: true,
                content: '<list-grid config="gridConf" api="gridApi"></list-grid>',
                scope: {
                    gridConf: gridConf,
                    gridApi:gridApi
                },
                filter: {},
                height: '430px',
                width: '900px',
                btns: [
                    {
                        name: '确定',
                        trigger: function (eve, interface) {
                            select(gridApi.getInnerApi().developScope.selectData,function (showVal, realVal) {
                                showElement.value = showVal;
                                $element.value = realVal;
                                $element.dispatchEvent(new Event('change'));
                            });
                            interface.close();
                        }
                    },
                    {
                        name: '取消',
                        theme: "warning", //[ primary , success , info , warning , danger ]
                        trigger: function (eve, interface) {
                            interface.close();
                        }
                    }
                ]
            };

        function setType(gridConf, type) {
            var conf;
            if(typeHandleFlag)return gridConf;
            typeHandleFlag=true;

            switch (type) {
                case 'radio':

                    if(gridConf.leftColsModel[0] && gridConf.leftColsModel[0].name === '选择') return gridConf;


                    conf = {
                        name:'选择',
                        listConfig: function (data, rowData, index, gridListData) {
                            var developScope = this.developScope,
                                scope = {
                                    index:index,
                                    developScope: developScope,
                                    onChange: function () {
                                        developScope.selectData=rowData;
                                        developScope.checkIndex = index;
                                    },
                                    onClick: function (e) {
                                        e.stopPropagation();
                                    }
                                };

                            return {
                                template: '<input $-on:change="onChange" $-on:click="onClick" type="radio" $-checked:false="developScope.checkIndex|checkedHandle:[$,index]">',
                                scope: scope,
                                filter: {
                                    checkedHandle: function (checkIndex,nowIndex) {
                                        return checkIndex == nowIndex;
                                    }
                                }
                            }
                        }
                    };
                    break;
                case 'checkbox':

                    conf = {
                        titleConfig: function () {
                            //开发者专用作用域
                            var developScope = this.developScope;
                            //检查并设置初始值
                            developScope.isAllChecked = false;
                            developScope.masterChange = false;
                            developScope.allChecked = false;
                            //主选择框选择时间标识
                            developScope.allCheckedTime = Date.now();
                            developScope.allCheckedCount === undefined && (developScope.allCheckedCount = 0);

                            return {
                                template: '<input type="checkbox" $-on:change="onChange" $-checked:false="developScope.allChecked">',
                                scope: {
                                    developScope: developScope,
                                    onChange: function () {
                                        if (this.checked) {
                                            developScope.isAllChecked = true;
                                            developScope.allChecked = true;
                                            developScope.allCheckedCount = developScope.gridListData.dataList.length;
                                        } else {
                                            developScope.isAllChecked = false;
                                            developScope.allChecked = false;
                                            developScope.allCheckedCount = 0
                                        }
                                        developScope.masterChange = true;
                                        developScope.allCheckedTime = Date.now()
                                    }
                                },
                                filter: {
                                    checkedHandle: function (isAllChecked) {
                                        developScope.masterChange = true;
                                        return isAllChecked
                                    }
                                }
                            }
                        },
                        listConfig: function (data, rowData, index, gridListData) {
                            var developScope = this.developScope,
                                dataLen = gridListData.length,
                                isSelf = false,
                                scope = {
                                    developScope: developScope,
                                    onChange: function () {
                                        var selectData=developScope.selectData= developScope.selectData||[];
                                        isSelf = true;

                                        developScope.allCheckedCount = this.checked ? developScope.allCheckedCount + 1 : developScope.allCheckedCount - 1;

                                        if (dataLen === developScope.allCheckedCount) {
                                            developScope.allChecked = true;
                                        } else {
                                            developScope.allChecked = false;
                                        }
                                        this.checked?selectData.push(rowData):selectData.splice(selectData.indexOf(rowData),1);
                                    },
                                    onClick: function (e) {
                                        e.stopPropagation();
                                    }
                                };

                            return {
                                template: '<input $-on:change="onChange" $-on:click="onClick" $-model="$isChecked" type="checkbox" $-checked:false="developScope.isAllChecked|checkedHandle:[$,developScope.allCheckedTime]">',
                                scope: scope,
                                filter: {
                                    checkedHandle: function (isAllChecked) {

                                        var selectData=developScope.selectData= developScope.selectData||[];
                                        var isChecked = false;

                                        if (!isSelf || developScope.masterChange) {
                                            isChecked = isAllChecked
                                        } else if (isSelf && isAllChecked) {
                                            isChecked = true;
                                        }

                                        isChecked?selectData.push(rowData):selectData.splice(selectData.indexOf(rowData),1);

                                        isSelf = false;
                                        developScope.masterChange = false;

                                        return isChecked;

                                    }
                                }
                            }
                        }
                    };
                    break;
            }
            conf && gridConf.leftColsModel.unshift(conf);

            return gridConf;
        }

        $element.type = "hidden";
        showElement.type = "text";
        showElement.placeholder = $element.placeholder;

        //设置展示的文本框只读
        showElement.setAttribute('readOnly', '');

        //目标文本框替换成展示文本框
        $element.parentNode.insertBefore(showElement, $element);

        var masterConf,
            type;
        comp.watchAttrData('config', function (config) {
            type=config.type;
            select=typeof config.select === "function" ? config.select:function () {};
            masterConf = config.gridConf;
            showElement.name = config.showName || '';
            showElement.value = config.showValue || '';

            config.placeholder && ( showElement.placeholder = config.placeholder);
            masterConf.readData && masterConf.readData(function (gridConfig) {
                dialogConf.scope.gridConf.write(setType(gridConfig, type));
            })
        });

        showElement.addEventListener('click', function () {
            gridApi.getInnerApi && (gridApi.getInnerApi().developScope.selectData=null);
            tools.$dialog(dialogConf);
            setTimeout(function () {
                var gridConfig=$FRAME.isVM(masterConf)? masterConf.get():masterConf;
                type=gridConfig.type;
                dialogConf.scope.gridConf.write(setType(gridConfig, type))
            },300);
        })
    }

    //input组件注册
    $app.componentRegister('input', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: ['date', '{PLUGINS}/modal/modal-dialog'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($date, $dialog) {
            var layout,
                attrs = this.attrs;

            //判断当前元素是否被渲染
            if (typeof attrs.plugins === 'undefined') {
                this.$element.setAttribute('plugins', 'true');
                switch (attrs.type.toLowerCase()) {
                    //日期
                    case 'date':
                        layout = "yy-mm-dd";
                    case 'time':
                        layout || (layout = "hh:ii:ss");
                    case 'datetime':
                        layout || (layout = "yy-mm-dd hh:ii:ss");
                        renderDate({comp: this, $date: $date}, {value: this.$element.value, layout: layout});
                        this.$element.classList.add('input-date');
                        break;
                    //多个单选框
                    case 'radios':
                        radiosRender({comp: this});
                        break;
                    //多个复选框
                    case 'checkboxs':
                        radiosRender({comp: this}, 'checkbox');
                        break;
                    //图标选择
                    case 'icons':
                        iconsRender(this, {$dialog: $dialog});
                        break;
                    //数据列表
                    case 'grid':
                        girdRender(this, {$dialog: $dialog});
                        break;
                    //树形菜单
                    case 'tree':
                        treeRender({comp: this}, {ele: this.$element})
                        break;
                    //组织机构人员选择 （树形菜单联动列表）
                    case 'organisation':
                        organisationRender({comp: this, $dialog: $dialog}, {ele: this.$element})
                        break;
                    //文件上传
                    case 'file':
                        fileRender({comp: this});
                        break;
                    //富文本
                    case 'editor':

                        break;

                }
            }
        }
    })
});
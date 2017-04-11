/**
 * Created by xiyuan on 17-2-16.
 */
drag(function ($app, $config) {

    //获取元素相关样式
    function getStyle(el, styleName) {
        return el.style[styleName] ? el.style[styleName] : el.currentStyle ? el.currentStyle[styleName] : window.getComputedStyle(el, null)[styleName];
    }

    //获取元素偏移量
    function winOffset(ele) {
        var offset = {
            top: 0,
            left: 0
        };

        (function g(ele) {
            if (ele) {
                offset.top += ele.offsetTop;
                offset.left += ele.offsetLeft;

                if(ele.parentNode === ele.offsetParent){
                    g(ele.offsetParent);
                }
            }
        })(ele);

        return offset;
    }

    //元素位置交集匹对
    function matchInfoHandle(info, $moveInfo, adoptInfos) {
        //位置标识
        var flag = '',
            i = ~0,
            matchInfo = null,
            width, height,
            matchings = ['rt', 'rb', 'lt', 'lb'];

        //检查 左起始点
        if (info.left < $moveInfo.left && info.right > $moveInfo.left) {
            flag += 'l'
        }

        //检查 右起始点
        if (info.left < $moveInfo.right && info.right > $moveInfo.right) {
            flag += 'r'
        }

        //检查 顶部起始点
        if (info.top < $moveInfo.top && info.bottom > $moveInfo.top) {
            flag += 't'
        }

        //检查 底部起始点
        if (info.top < $moveInfo.bottom && info.bottom > $moveInfo.bottom) {
            flag += 'b'
        }

        //标识检查 包含这四种 [rt,rb,lt,lb]
        while (++i < 4) {

            //进行匹配
            if (flag.indexOf(matchings[i]) !== -1) {

                //计算位置交集
                width = Math.min(info.right, $moveInfo.right) - Math.max(info.left, $moveInfo.left);
                height = Math.min(info.bottom, $moveInfo.bottom) - Math.max(info.top, $moveInfo.top)

                adoptInfos.push(matchInfo = {
                    intersection: {
                        width: width,
                        height: height,
                        area: width * height
                    },
                    locationFlag: flag
                }.extend(info));
                break
            }
        }
        return matchInfo;
    }

    //容器处理
    function containerHandle($moveInfo, conf, containerInfo, innerConf) {

        var adoptInfos = [];

        //遍历获取容器相关数据
        containerInfo.length || conf.container.forEach(function (info) {
            var ele=info.element;

            switch ($FRAME.lib.$type.getType(info.element)){
                case 'element':
                    ele=info.element;
                    break;
                case 'function':
                    ele=info.element();
                    break;
                case 'string':
                    ele=document.querySelector(info.element);
                    break;
            }

            //获取拖动元素相对窗口的相关参数
            var BCR = winOffset(ele),
                innerhandle = info.innerhandle || {},
                childEle = [],
                childEleInfos = [];

            //获取容器子元素
            switch ($FRAME.lib.$type.getType(innerhandle.elements)) {
                case 'array':
                    innerhandle.elements.forEach(function (e) {
                        switch ($FRAME.lib.$type.getType(e)) {
                            case 'string':
                                childEle = childEle.concat([].slice.call(ele.querySelectorAll(e)));
                                break;
                            case 'element':
                                childEle.push(e);
                                break;
                        }
                    });
                    break;
                case 'string':
                    childEle = childEle.concat([].slice.call(ele.querySelectorAll(innerhandle.elements)));
                    break;
            }

            //提取子元素相关数据
            childEle.forEach(function (ele) {
                var BCR = winOffset(ele);
                childEleInfos.push({
                    ele: ele,
                    top: BCR.top,
                    left: BCR.left,
                    right: BCR.left + ele.offsetWidth,
                    bottom: BCR.top + ele.offsetHeight,
                    width: ele.offsetWidth,
                    height: ele.offsetHeight,
                    state: null
                })
            });

            // console.log(childEleInfos)

            //容器信息收集
            containerInfo.push({}.extend(info, {
                ele: ele,
                top: BCR.top,
                left: BCR.left,
                right: BCR.left + ele.offsetWidth,
                bottom: BCR.top + ele.offsetHeight,
                width: ele.offsetWidth,
                height: ele.offsetHeight,
                childEleInfos: childEleInfos,
                state: null
            }))

        });

        //遍历匹配各个容器位置
        containerInfo.forEach(function (info) {

            var matchInfo = matchInfoHandle(info, $moveInfo, adoptInfos);

            if (!matchInfo) {
                //离开主容器后的事件触发
                info.state && typeof info.end === "function" && info.end(info);
                info.state = null;

                //检查状态
            } else if (!info.state) {
                info.state = 'start';
            }

        });

        //进行倒序排序（用于计算出面积交集最大的容器）
        adoptInfos = adoptInfos.sort(function (befor, after) {
            return after.intersection.area - befor.intersection.area;
        });

        //触发相关方法
        adoptInfos.forEach(function (matchInfo, key) {

            //主容器标识
            if (matchInfo.isMaster = !key) {

                var innerhandle,
                    adoptContainer=innerConf.adoptContainer||{};

                //检测是否离开之前的主容器
                if(adoptContainer.ele !== matchInfo.ele){
                    innerhandle = adoptContainer.innerhandle || {};
                    //触发内部子元素 out 事件
                    typeof innerhandle.out === "function" && innerConf.adoptEle && innerhandle.out.call({
                        data:conf.data,
                        target:innerConf.adoptEle
                    });

                    innerConf.adoptEle=null;
                }


                var c_matchInfo = null,
                    c_adoptInfos = [];
                //容器子元素位置交集监听
                matchInfo.childEleInfos.forEach(function (info) {
                    matchInfoHandle(info, $moveInfo, c_adoptInfos);
                });

                if (c_adoptInfos.length) {
                    //进行倒序排序（用于计算出面积交集最大的容器）
                    c_matchInfo = c_adoptInfos.sort(function (befor, after) {
                        return after.intersection.area - befor.intersection.area;
                    })[0];

                    innerhandle = matchInfo.innerhandle || {};

                    //调用触发in 与 out
                    if (innerConf.adoptEle !== c_matchInfo.ele) {
                        if (innerConf.adoptEle) {
                            typeof innerhandle.out === "function" && innerhandle.out.call({
                                data:conf.data,
                                target:innerConf.adoptEle
                            });
                        }
                        innerConf.adoptInfo=c_matchInfo;
                        innerConf.adoptEle = c_matchInfo.ele;
                        typeof innerhandle.in === "function" && innerhandle.in.call({
                            data:conf.data,
                            target:innerConf.adoptEle
                        });
                    }

                    //通过后续拖拽结束调用
                    matchInfo.eveData={
                        data:conf.data,
                        target:innerConf.adoptEle
                    }

                }else{
                    //没有符合的元素则清空存储的数据
                    matchInfo.eveData=null;
                }


                //记录占位的主容器
                innerConf.adoptContainer=conf.matchInfo=matchInfo;
            }

            //容器事件调用
            if (matchInfo.state) {
                matchInfo.state = 'move';
                typeof matchInfo.move === "function" && matchInfo.move.call({
                    data:conf.data,
                    target:innerConf.adoptEle
                },matchInfo);
            } else {
                matchInfo.state = 'start';
                typeof matchInfo.start === "function" && matchInfo.start.call({
                    data:conf.data,
                    target:innerConf.adoptEle
                },matchInfo);
            }

        });

    }

    //配置中的事件处理
    function confEventHandle(conf, eventName, innerConf) {
        var fn = (conf.event || {})[eventName];

        typeof fn === "function" && fn.call({},innerConf.dragInfo,innerConf.adoptContainer,innerConf.adoptInfo,{
            to:function (caback) {
                // var $moveEle=innerConf.adoptEle||innerConf.dragInfo.ele;
                var $moveEle=innerConf.dragInfo.ele;
                switch ($FRAME.lib.$type.getType(caback)){
                    case 'object':
                        caback.forEach(function (val,key) {
                            $moveEle.style[key]=val
                        });
                        break;
                    case 'function':
                        caback($moveEle);
                        break;
                }
            },
            reset:function () {
                var $element=innerConf.dragInfo.$element,
                    BCR = winOffset($element),
                    $moveEle=innerConf.dragInfo.ele;

                //元素定位重置
                $moveEle.style.top = BCR.top + 'px';
                $moveEle.style.left = BCR.left + 'px';
            }
        });
    }

    $app.directiveRegister('$Drag', {
        //指令优先级 降序执行
        priority: 0,
        //是否显示指令代码
        directiveShow: false,
        tools: ['{TOOLS}/sys/drag'],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function ($drag) {

            var BCR,
                offsets,
                innerConf = null,
                containerInfo = [],
                $element = this.$element,
                $moveEle = $element.clone(true),
                dragObj = new $drag($moveEle),
                bodyClassList = document.body.classList,
                isNoSelect = bodyClassList.contains('no-select-text'),
                displayStyle = getStyle($element, 'position');

            //给元素添加鼠标手势
            $element.classList.add('pointer');
            $moveEle.classList.add('drag-ele', 'pointer');

            //检查定位类型（为兼容获取视图位置偏移）
            'relative absolute'.indexOf(displayStyle) === -1 && ($element.style.position = 'relative');


            var triggleTime;

            this.watch(function (conf) {

                conf.matchInfo={};
                $element.addEventListener('mousedown', function (eve) {
                    BCR = winOffset($element);

                    $moveEle.innerHTML = $element.innerHTML;

                    //width 、 height
                    $moveEle.style.width = $element.offsetWidth + 'px';
                    $moveEle.style.height = $element.offsetHeight + 'px';

                    //元素定位
                    $moveEle.style.top = BCR.top + 'px';
                    $moveEle.style.left = BCR.left + 'px';

                    document.body.classList.add('no-select-text');
                    triggleTime=setTimeout(function () {
                        $element.parentNode.appendChild($moveEle);
                        dragObj.dragStartFn(eve);
                    },200)

                });


                $element.addEventListener('mouseup', function (eve) {
                    clearTimeout(triggleTime);
                    document.body.classList.remove('no-select-text');
                }, false);

                $moveEle.addEventListener(transitionEndEvent, function (eve) {
                    if (eve.propertyName === "opacity" && this.classList.contains('drag-transition')) {
                        this.parentNode.removeChild(this);
                    }
                }, false);


                //拖拽开始监听
                dragObj.on('start', function (eve, eveData) {
                    var top, left, dragInfo;

                    //设置body文本不能选中（避免拖动时候被动选择文字）
                    isNoSelect || bodyClassList.add('no-select-text');

                    //添加拖动样式
                    $moveEle.classList.remove('drag-transition');
                    $moveEle.classList.add('drag-ele', 'drag-move', 'drag');

                    //获取拖动元素相对窗口的相关参数
                    BCR = winOffset($element);
                    offsets = {
                        left: BCR.left - eveData.nowPageX,
                        top: BCR.top - eveData.nowPageY
                    };

                    //元素定位
                    $moveEle.style.top = (top = eveData.nowPageY + offsets.top) + 'px';
                    $moveEle.style.left = (left = eveData.nowPageX + offsets.left) + 'px';

                    containerHandle(dragInfo = {
                        ele:eve.target,
                        top: top,
                        left: left,
                        right: left + $moveEle.offsetWidth,
                        bottom: top + $moveEle.offsetHeight,
                        width: $moveEle.offsetWidth,
                        height: $moveEle.offsetHeight,
                        $element:$element
                    }, conf, containerInfo, innerConf = {});

                    confEventHandle(conf, 'start', dragInfo);
                });

                //拖拽移动监听
                dragObj.on('move', function (eve, eveData) {
                    var top, left;
                    //元素定位
                    $moveEle.style.top = (top = eveData.nowPageY + offsets.top) + 'px';
                    $moveEle.style.left = (left = eveData.nowPageX + offsets.left) + 'px';
                    containerHandle(innerConf.dragInfo = {
                        ele:eve.target,
                        top: top,
                        left: left,
                        right: left + $moveEle.offsetWidth,
                        bottom: top + $moveEle.offsetHeight,
                        width: $moveEle.offsetWidth,
                        height: $moveEle.offsetHeight,
                        $element:$element
                    }, conf, containerInfo, innerConf);

                    confEventHandle(conf, 'move', innerConf);
                });

                //拖拽结束监听
                dragObj.on('end', function (eve, eveData) {
                    //恢复元素最初的定位方式
                    $element.style.position = displayStyle;

                    $moveEle.classList.add('drag-transition');

                    //移除body 内部文字不可选状态
                    isNoSelect || bodyClassList.remove('no-select-text');

                    //结束后的事件回调
                    confEventHandle(conf, 'end',innerConf);

                    $moveEle.classList.add('drag-end');

                    if(conf.matchInfo.eveData){
                        conf.matchInfo.innerhandle.end && conf.matchInfo.innerhandle.end.call(conf.matchInfo.eveData,eve,$element)
                    }

                    //移除拖动样式
                    $moveEle.classList.remove('drag-move', 'drag');

                });
            })


        }
    })
});
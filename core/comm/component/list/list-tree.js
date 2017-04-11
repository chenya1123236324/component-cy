//tree组件注册
listTree(function ($app, $appConfig) {

    //递归改变子元素的选择状态
    function checkedRecursive(childrenTreeInfo, checked) {
        (childrenTreeInfo.children || childrenTreeInfo.list) ?
            (childrenTreeInfo.children || childrenTreeInfo.list || []).forEach(function (childrenTreeInfo) {
                checkedRecursive(childrenTreeInfo,checked);
            }) : childrenTreeInfo.checked = checked;
    }

    //tree数据检索
    function searchVal(srcList,searchValue) {
        //list数据克隆
        var newList=srcList.clone();
        //搜索处理
        function serch(info) {
            if(info.name.indexOf(searchValue) !== -1){
                return {
                    result:info,
                    state:'201'
                }
            }else if({}.toString.call(info.children).match(/object\s+(\w*)/)[1] === 'Array'){
                return {
                    result:info.children,
                    state:'301'
                }
            }else{
                return {
                    result:info,
                    state:'401'
                };
            }
        }

        //匹对处理
        (function getMatch(list){
            list=list||[];
            var state=null,
                info=null,
                res=null,
                rmKey=0,
                key=~0,
                len=list.length;
            while(++key<len){
                len-=rmKey;
                key-=rmKey;
                rmKey=0;
                info=list[key];
                res=serch(info);
                switch (res.state){
                    //匹对成功
                    case '201':
                        state=true;
                        getMatch(info.children);
                        break;
                    //继续匹对
                    case '301':
                        //查询子节点数据
                        if(!getMatch(info.children)){
                            //字节点未匹配成功则移除此节点
                            list.splice(list.in(info),1);
                            //当前节点位置偏移
                            rmKey++;
                        }
                        break;
                    //匹对失败
                    case '401':
                        //删除匹配不上的数据
                        list.splice(list.in(info),1);
                        state =state ||false;
                        rmKey++;
                        break;
                }
            }
            return (state === null || state) ? true : false;
        })(newList);
        return newList;
    }

    var template = '<ul class="tree-parent" $-class="{tree-root:!treeInfo.name}" $-slide="treeInfo.isOpen">' +
            '<li class="tree-node" $-for="(index,childrenTreeInfo) in treeInfo.list|| treeInfo.children" $-class="{tree-isOpen:childrenTreeInfo.isOpen}">' +
            '<div class="tree-info"><aside $-on:click="childrenTreeInfo|shrink" $-class="{parent-icon:childrenTreeInfo.children|isParentNodeHandle:[$]}"><i class="tree-switch-icon"></i><b></b></aside>' +
            '<input $-on:change="childrenTreeInfo|inputChangeHandle" type="checkbox" name="treeVals" $-bind:value="nowKey|keyConcat:[$,index]" $-bind:checked="childrenTreeInfo.checked|checkedHandle:[$,childrenTreeInfo,treeInnerInfo,nowKey,index,masterInfo]" $-watch="treeInnerInfo.selectedRecord[nowKey+\'_\'+index]|inputWatch:[$,childrenTreeInfo]" $-render="childrenTreeInfo|checkedInitHandle:[$,treeInnerInfo,nowKey]">' +
            '<span $-events="childrenTreeInfo|eventsHandle:[$,masterInfo,treeInnerInfo,nowKey,index,actions,$interface]" class="tree-text" $-class="{focus:nowKey+\'_\'+index == treeInnerInfo.nowSelectKey}">{{childrenTreeInfo.name}}</span>' +
            '<ul class="tree-actions"><li $-for="btnInfo in masterInfo.btns"><template config="btnInfo|btnHandle:[$,childrenTreeInfo,treeInnerInfo]"></template></li></ul>' +
            '</div><template config="childrenTreeInfo|templateHandle:[$,nowKey,index,treeInnerInfo,childrenTreeInfo.list]"></template>' +
            '</li>' +
            '</ul>',

        filter = {
            //接口处理
            interfaceHandle: function ($interface, treeInnerInfo,masterInfo) {
                var srcList=masterInfo.list,
                    innerInfoModel = $FRAME.model(treeInnerInfo);

                //获取选择的值
                $interface.write('getSelect', function () {
                    return innerInfoModel.get('selectDatas');
                });

                //选中的数据
                $interface.write('selectDatas', treeInnerInfo.selectDatas);

                //点击选中的数据
                $interface.write('getFocus',function () {
                    return treeInnerInfo.focusData;
                });

                $interface.write('focusData',treeInnerInfo.focusData);

                //对外提供tree搜索
                $interface.write('search',function (searchValue) {
                    masterInfo.list=searchVal(srcList,searchValue);
                });

            },
            shrink: function (treeInfo) {
                return function () {
                    treeInfo.isOpen = !treeInfo.isOpen;
                }
            },
            templateHandle: function (treeInfo, nowKey, index, treeInnerInfo) {
                treeInfo.isOpen || (treeInfo.isOpen = false);
                treeInnerInfo.keyMapData[nowKey + '_' + index] = treeInfo;
                return treeInfo.list || treeInfo.children ? {
                    template: template,
                    scope: {
                        nowKey: nowKey + '_' + index,
                        treeInfo: treeInfo
                    }
                } : null;
            },
            keyConcat: function (nowKey, index) {
                return nowKey + '_' + index
            },
            inputChangeHandle: function (childrenTreeInfo) {
                return function () {
                    checkedRecursive(childrenTreeInfo,this.checked);
                }
            },
            //选择初始化
            checkedInitHandle: function (childrenTreeInfo, treeInnerInfo, nowKey) {
                var selectedRecord = treeInnerInfo.selectedRecord;
                childrenTreeInfo.checked = !!childrenTreeInfo.checked;
                selectedRecord[nowKey] = (selectedRecord[nowKey] || 0) - ((childrenTreeInfo.checked = !!childrenTreeInfo.checked ) ? 1 : 0);
            },
            checkedHandle: function (checked, childrenTreeInfo, treeInnerInfo, nowKey,index,masterInfo) {
                if(checked === undefined )return;
                var selectDatas = treeInnerInfo.selectDatas,
                    selectedRecord = treeInnerInfo.selectedRecord,
                    actions=masterInfo.actions||{},
                    key=nowKey + '_' + index;

                selectedRecord[nowKey] = (selectedRecord[nowKey] || 0) - (checked ? -1 : 1);

                var location = selectDatas.in(childrenTreeInfo);

                if (checked) {
                    location === -1 && selectDatas.push(childrenTreeInfo);
                    treeInnerInfo.keyMapData[key] && typeof actions.select === "function" && actions.select(checked,childrenTreeInfo)
                } else {
                    location !== -1 && selectDatas.splice(location, 1);
                    treeInnerInfo.keyMapData[key] && typeof actions.unselect === "function" && actions.unselect(checked,childrenTreeInfo)
                }
                //事件触发
                treeInnerInfo.keyMapData[key] && typeof actions.selectChange === "function" && actions.selectChange(checked,childrenTreeInfo)

                return checked;
            },
            inputWatch: function (selectLen, childrenTreeInfo) {
                selectLen === undefined || (childrenTreeInfo.checked = selectLen === 0);
            },
            eventsHandle:function (childrenTreeInfo,masterInfo,treeInnerInfo,nowKey,index,actions,$interface) {
                var events={};
                ({}.extend(childrenTreeInfo.events||{},masterInfo.actions||{},actions)).forEach(function ( fn, eventName) {
                    if(typeof fn === "function"){
                        events[eventName]=function (e) {
                            //事件检查
                            switch (eventName){
                                case 'click':
                                    treeInnerInfo.focusData=childrenTreeInfo;
                                    treeInnerInfo.nowSelectKey=nowKey+'_'+index;
                                    $interface.write('focusData',childrenTreeInfo);
                                    break;
                            }

                            //事件代理
                            typeof actions[eventName] === "function" && actions[eventName].call(this,e,childrenTreeInfo);
                            typeof (childrenTreeInfo.events||{})[eventName] === "function" && childrenTreeInfo.events[eventName].call(this,e,childrenTreeInfo);
                            typeof (masterInfo.actions||{})[eventName] === "function" && masterInfo.actions[eventName].call(this,e,childrenTreeInfo);
                        };
                    }
                });
                return events;
            },
            //
            isParentNodeHandle:function (list) {
                return  list && list.length;
            },
            //按钮解析处理
            btnHandle:function (btnInfo,nodeInfo,treeInnerInfo) {
                switch ({}.toString.call(btnInfo).match(/object\s+(\w*)/)[1]){
                    case 'Function':
                        btnInfo=btnInfo(nodeInfo);
                    case 'Object':
                        return btnInfo?{
                            scope:{
                                btnEvents:btnInfo.events||{}
                            },
                            filter:{
                                eventsHandle:function (btnEvents,childrenTreeInfo,treeInfo,index) {
                                    var events={};
                                    btnEvents.forEach(function (evenFn,eventName) {
                                        events[eventName]=function (eve) {
                                            evenFn.call(this,eve,childrenTreeInfo,treeInfo,{
                                                remove:function () {
                                                    (treeInfo.children||treeInfo.list).splice(index,1);
                                                    //删除selectDatas
                                                    var _i=treeInnerInfo.selectDatas.in(childrenTreeInfo);
                                                    _i !== -1 && treeInnerInfo.selectDatas.splice(_i,1);
                                                },
                                                add:function (nodeConf) {

                                                    (childrenTreeInfo.children=childrenTreeInfo.list=childrenTreeInfo.children||childrenTreeInfo.list||[]).push(nodeConf)
                                                }
                                            })
                                        }
                                    });

                                    return events;
                                }
                            },
                            template:'<div title="'+(btnInfo.name||'')+'" $-events="btnEvents|eventsHandle:[$,childrenTreeInfo,treeInfo,index]">'+(btnInfo.content||'')+'</div>'
                        }:null;
                }

            }
        };

    $app.componentRegister('listTree', {
        //指令优先级 降序执行
        priority: 0,
        //引入的工具类
        tools: [],
        //只调用一次，在指令第一次绑定到元素上时调用。
        handle: function () {
            var treeContainer,
                container = this.$element,
                //tree API
                $interface =this.attrToVM('api');

            this.watchAttrData('config', function (treeInfo) {
                treeContainer = this.viewVM('<div class="list-tree" $-class="{checkbox:masterInfo.checkbox}" $-render="$interface|interfaceHandle:[$,treeInnerInfo,masterInfo]">' + template + '</div>',{
                    treeInfo: treeInfo,
                    masterInfo:treeInfo,
                    $interface: $interface,
                    nowKey: '',
                    treeInnerInfo: {
                        nowSelectKey:'',
                        selectDatas: [],
                        keyMapData: {},
                        selectedRecord: {}
                    },
                    actions:{
                        click:function () {}
                    }
                }, filter).firstChild;
                container.parentNode.replaceChild(treeContainer, container);
                container = treeContainer;
            }.bind(this))
        }
    })
});
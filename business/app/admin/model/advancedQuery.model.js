//高级搜索advanced-query组件
model('advancedQuery', function () {
    this.$model = {
        style: {
            "background": "#fcfdff",
            "height": "60px",
        },
        list: [
            //form-layout
            {
                type: 'formLayoutQueryTag',  //【组件判断标识，不可改】
                config: {
                    template: '<form-layout config="advancedQuery"></form-layout>',
                    scope: {
                        advancedQuery: {
                            scope: {},
                            filter: {},
                            list: [
                                {
                                    title: '',
                                    require: false,
                                    config: {
                                        type: 'custom',
                                        template: '<batch-condition config="batchCondition"></batch-condition>',
                                        scope: {
                                            batchCondition: {
                                                style: {
                                                    "margin-left": "0",
                                                    "margin-top": "20px",
                                                },
                                                list: [
                                                    {
                                                        title: '',
                                                        require: false,
                                                        config: {
                                                            template: '<select  config="queryField"></select> ',
                                                            scope: {
                                                                queryField: {
                                                                    name: 'queryField',
                                                                    style: {
                                                                        width: '160px',
                                                                    },
                                                                    dataList: [
                                                                        {
                                                                            content: '名称',
                                                                            value: '1',
                                                                            selected: true
                                                                        },
                                                                        {
                                                                            content: '创建时间',
                                                                            value: '2',
                                                                        },
                                                                        {
                                                                            content: '创建人',
                                                                            value: '3',
                                                                        },
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        title: '',
                                                        require: false,
                                                        config: {
                                                            template: '<select  config="queryCondition"></select> ',
                                                            scope: {
                                                                queryCondition: {
                                                                    name: 'queryCondition',
                                                                    style: {
                                                                        width: '160px',
                                                                    },
                                                                    dataList: [
                                                                        {
                                                                            content: '大于',
                                                                            value: '1',
                                                                            selected: true
                                                                        },
                                                                        {
                                                                            content: '小于',
                                                                            value: '2',
                                                                        },
                                                                        {
                                                                            content: '等于',
                                                                            value: '3',
                                                                        },
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        title: '',
                                                        require: false,
                                                        config: {
                                                            template: '<input name="contentText"  type="text" style="height:30px;line-height:30px;" class="contentText"/>',
                                                            scope: {}
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        //需要给元素添加的指令
                                        cmd: {
                                            "$-bind:name": '',
                                            "$-value": '',
                                            "$-model": 'value'
                                        }
                                    },
                                    //当前行需要添加的指令
                                    cmd: {
                                        "$-if": true
                                    },
                                    //当前行的作用域
                                    scope: {
                                        value: ''
                                    },
                                    //当前行的过滤器
                                    filter: {}
                                },
                                {
                                    title: '',
                                    require: false,
                                    class: 'clos-all',
                                    config: {
                                        type: 'custom',
                                        template: '<btn-group-me data="advancedSearchSave" receive="getFormData"></btn-group-me>',
                                        scope: {
                                            advancedSearchSave: [{
                                                isGroup: true, //【必填项】isGroup如果是true的话，说明是按钮组，下面的spacing是两个按钮之间的间距
                                                spacing: '20px',//【非必填项】两个按钮之间的间距
                                                eventIdentifierName: 'eventIdentifier',//【若是多个按钮组，则为必填项】事件标识名称，如果不填写，默认是btnGroupMeEvent
                                                style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                                                    display: "inline-block",
                                                    margin: "30px 4px",
                                                },
                                                list: [
                                                    {
                                                        class: 'btn btn-blue', //【必填项】按钮样式
                                                        icon: '', //【非必填项】图标
                                                        label: '保存',//【必填项】按钮文字
                                                        align: 'center',//【必填项】文字居中
                                                        padding: '6px 40px', //【必填项】按钮内边距，可以控制按钮大小
                                                        events: {
                                                            click: function (event, receiveData) { //【必填项】按钮事件
                                                                var formData = receiveData.getData();
                                                                //新增弹框
                                                                $packages('{PLUGINS}/modal/modal-dialog', function (dialog) {
                                                                    var a;
                                                                    dialog(a = {
                                                                        title: '新增查询名称',//【必填项】dialog标题
                                                                        content: '<div class="queryNameLayout" style="margin:30px;"><form-layout config="queryName"></form-layout></form></div>', //【必填项】dialog填充内容，需要与scope配合使用
                                                                        scope: {
                                                                            queryName: {
                                                                                scope: {},
                                                                                filter: {},
                                                                                list: [
                                                                                    {
                                                                                        title: '名称',
                                                                                        required: false,
                                                                                        config: {
                                                                                            type: 'custom',
                                                                                            template: '<input type="text" name="queryName">',
                                                                                            scope: {},
                                                                                            //需要给元素添加的指令
                                                                                            cmd: {
                                                                                                "$-bind:name": '',
                                                                                                "$-value": '',
                                                                                                "$-model": 'value'
                                                                                            }
                                                                                        },
                                                                                        //当前行需要添加的指令
                                                                                        cmd: {
                                                                                            "$-if": true
                                                                                        },
                                                                                        //当前行的作用域
                                                                                        scope: {
                                                                                            value: ''
                                                                                        },
                                                                                        //当前行的过滤器
                                                                                        filter: {}
                                                                                    },
                                                                                ]

                                                                            }
                                                                        },
                                                                        maxmin: false,
                                                                        zoom: 'min',
                                                                        filter: {},
                                                                        width: '460px',//【非必填项】dialog宽，不填默认为640px
                                                                        height: '200px;',//【非必填项】dialog高，不填默认为430px
                                                                        btns: [
                                                                            {
                                                                                name: '保存',
                                                                                trigger: function (eve, interface) { //【必填项】dialog通过需要进行的操作
                                                                                    //当保存成功数据过后
                                                                                    //1、批量清空新增的搜索条件
                                                                                    document.getElementById("addBatchConditionBox").innerHTML = "";
                                                                                    // 2、关闭ul
                                                                                    //是否显示ul
                                                                                    var isShowUL = document.querySelector(".isShowUL");
                                                                                    //点击高级搜索按钮之前
                                                                                    isShowUL.classList.toggle("clickTabBefore");
                                                                                    //点击高级搜索按钮之后
                                                                                    isShowUL.classList.toggle("clickTabAfter");
                                                                                    interface.close();
                                                                                },
                                                                            },
                                                                            {
                                                                                name: '取消',
                                                                                trigger: function (eve, interface) {
                                                                                    interface.close();
                                                                                }
                                                                            },
                                                                        ],

                                                                    })
                                                                });
                                                            }
                                                        }
                                                    }, {
                                                        class: 'btn btn-blue-outline',//按钮样式
                                                        icon: '', //图标
                                                        label: '取消',//按钮文字
                                                        align: 'center',//文字居中
                                                        padding: '6px 40px',//按钮内边距，可以控制按钮大小
                                                        events: {
                                                            click: function (event) {
                                                                console.log(this, this.innerHTML, event);
                                                                //批量清空新增的搜索条件
                                                                document.getElementById("addBatchConditionBox").innerHTML = "";
                                                            }
                                                        }
                                                    },
                                                ]
                                            }]
                                        },

                                        //需要给元素添加的指令
                                        cmd: {
                                            "$-bind:name": '',
                                            "$-value": '',
                                            "$-model": 'value'
                                        }
                                    },
                                    //当前行需要添加的指令
                                    cmd: {
                                        "$-if": true
                                    },
                                    //当前行的作用域
                                    scope: {
                                        value: ''
                                    },
                                    //当前行的过滤器
                                    filter: {}
                                },
                            ]
                        }
                    }
                }
            },
            //默认查询标签获取数据
            {
                type: 'defaultQueryTag', //【组件判断标识，不可改】
                config: {
                    template: '<button-group config="defaultQueryTag"></button-group>',
                    scope: {
                        defaultQueryTag: {
                            style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                                display: "inline-block",
                                'margin-top': "3px",
                            },
                            btnStyle: {  //【必填项】按钮内边距，可以控制按钮大小
                                padding: '5px 14px',
                                'margin-left': '10px'
                            },
                            list: [
                                {
                                    class: 'btn btn-sapphire-blue', //【必填项】按钮样式   宝蓝色
                                    icon: '', //【非必填项】图标
                                    label: '潜在客户',//【必填项】按钮文字
                                    align: 'center',//【必填项】文字居中
                                    events: {
                                        click: function (event) { //【必填项】按钮事件
                                            $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                                $message('潜在客户');
                                            });
                                        }
                                    }
                                }, {
                                    class: 'btn btn-indian-red',//按钮样式  印第安红
                                    icon: '', //图标
                                    label: '意向客户',//按钮文字
                                    align: 'center',//文字居中
                                    events: {
                                        click: function (event) {
                                            $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                                $message('意向客户');
                                            });
                                        }
                                    }
                                }, {
                                    class: 'btn btn-darkviolet',//按钮样式
                                    icon: '', //图标
                                    label: '高级客户', //按钮文字
                                    align: 'center', //文字居左
                                    events: {
                                        click: function (event) {
                                            $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                                $message('高级客户');
                                            });
                                        }
                                    }
                                }, {
                                    class: 'btn btn-golden',//按钮样式
                                    icon: '', //图标
                                    label: 'VIP客户', //按钮文字
                                    align: 'center', //文字居右
                                    events: {
                                        click: function (event) {
                                            $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                                $message('VIP客户');
                                            });
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            //得到高级检索中新增的标签
            {
                type: 'newAddQueryTag', //【组件判断标识，不可改】
                config: {
                    template: '<button-group config="newAddQueryTag"></button-group>',
                    scope: {
                        newAddQueryTag: {
                            style: {   //【非必填项】设置最外层div的css样式，如果要写类似于margin-top的样式，需要这样写 'margin-top':'100px'
                                display: "inline-block",
                                float: "right",
                                'margin-top': "3px",
                            },
                            btnStyle: {  //【必填项】按钮内边距，可以控制按钮大小
                                padding: '4px 5px',
                                'margin-left': '10px',
                                'border-radius': "4px",
                            },
                            list: [
                                {
                                    class: 'btn btn-azurite', //【必填项】按钮样式   宝蓝色
                                    icon: 'iconfont icon-chenghao', //【非必填项】图标
                                    label: '全部高级客户',//【必填项】按钮文字
                                    align: 'right',//【必填项】图标居右
                                    events: {
                                        click: function (event) { //【必填项】按钮事件
                                            $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                                $message('全部高级客户');
                                            });
                                        }
                                    },
                                    iconEvents: {
                                        click: function (event) {
                                            //停止事件冒泡
                                            event.stopPropagation();
                                            $packages('{PLUGINS}/hint/hint-message', function ($message) {
                                                $message('您确定要删除这条信息吗?');
                                            });
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },


        ]
    }
});
/**
 * Created by chenya on 2017/3/11.
 */
//1、保存布局
model('viewSaveLayout', [], function () {
    this.$model =     {
        scope:{

        },
        filter:{

        },
        list:[
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'日期组件',
                require:true,
                config:{
                    type:'date',
                    value:'text 2',
                    placeholder:'请选择日期',
                    cmd:{
                        $value:'',
                        $model:''
                    }
                },
                //hidden:true
            },
            {
                title:'时间选项',
                require:true,
                config:{
                    type:'time',
                    value:'text 3',
                    placeholder:'请选择时间',
                    cmd:{
                        "$-value":'',
                        "$-model":''
                    }
                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'单选组',
                require:true,
                config:{
                    type:'radios',
                    $config:{
                        name:'class',
                        dataList:[
                            {
                                content:'数学',
                                value:'1',
                                checked:true
                            },
                            {
                                content:'语文',
                                value:'2'
                            },
                        ]
                    }
                }
            },
            {
                title:"图标与颜色",
                config:{
                    type:'custom',
                    template:'<input config="iconConf" type="icons""><input type="color" $-on:input="iconConf|colorChange" style="margin-left:10px;">',
                    scope:{
                        iconConf:{
                            color:''
                        }
                    },
                    filter:{
                        colorChange:function(iconConf){
                            return function(){
                                iconConf.color=this.value;
                            }
                        }
                    }
                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'单选组',
                require:true,
                config:{
                    type:'radios',
                    $config:{
                        name:'class',
                        dataList:[
                            {
                                content:'数学',
                                value:'1',
                                checked:true
                            },
                            {
                                content:'语文',
                                value:'2'
                            },
                        ]
                    }
                }
            },
            {
                title:"图标与颜色",
                config:{
                    type:'custom',
                    template:'<input config="iconConf" type="icons""><input type="color" $-on:input="iconConf|colorChange" style="margin-left:10px;">',
                    scope:{
                        iconConf:{
                            color:''
                        }
                    },
                    filter:{
                        colorChange:function(iconConf){
                            return function(){
                                iconConf.color=this.value;
                            }
                        }
                    }
                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
            {
                title:'视图名称',
                required:true,
                config:{
                    type:'text',
                    value:'text 1',
                    name:'text-name',
                    placeholder:'',
                    //需要给元素添加的指令
                    cmd:{
                        "$-bind:name":'',
                        "$-value":'',
                        "$-model":'value'
                    }
                },
                //当前行需要添加的指令
                cmd:{
                    "$-if":true
                },
                //当前行的作用域
                scope:{
                    value:''
                },
                //当前行的过滤器
                filter:{

                }
            },
        ]
    };
});

model('drag',function () {
    this.$model={
        data:{

        },
        event: {
            start: function () {
                // console.log('start')
            },
            move: function () {
                // console.log('move')
            },
            end: function (dragInfo,adoptContainer,adoptInfo,interface) {
                // interface.reset();
                adoptInfo=adoptInfo||dragInfo;
                adoptInfo && interface.to({
                    top:adoptInfo.top+'px',
                    left:adoptInfo.left+'px',
                    width:adoptInfo.width+'px',
                    height:adoptInfo.height+'px'
                });
                adoptInfo.ele.classList.remove('in');
            }
        },
        container: [
            {
                note: '表单布局(注释、备注)',
                element: '.form-layout-edit',
                innerhandle: {
                    elements: 'ul>li',
                    in: function (e) {
                        this.target.classList.add('in');
                    },
                    out: function (e) {
                        this.target.classList.remove('in');
                    }
                },
                //进入/开始
                start: function (info) {
                    // console.log('start',info)
                },
                //移动
                move: function (info) {
                    // console.log('move',info)
                },
                //离开/结束
                end: function (info) {
                    // console.log('end',info)
                }
            },
            {
                element: '.edit-field ul',
                //进入/开始
                start: function () {

                    // console.log('field_start')
                },
                //移动
                move: function () {

                    // console.log('field_move')
                },
                //离开/结束
                end: function () {

                    // console.log('field_end')
                }
            }
        ]
    }
});


model('formInfoData',['$:@lib/moduleConfig/viewLayout'],function (viewLayout) {

    var This=this;
    //查询模块字段及其关联模块字段的集合
    var moduleFieldList=this.server({
        serverType:'api',
        url:'queryModuleField'
    });

    //布局保存接口
    var moduleSave=this.server({
        serverType:'api',
        url:'viewLayoutSave'
    })

    var formViewStruct=this.server({
        serverType:'api',
        url:'viewSearchDetail'
    }).success(function (viewInfo) {
        moduleFieldList.success(function (fieldMapInfo) {
            var formLayoutInfo=viewLayout(viewInfo,fieldMapInfo);

            formLayoutInfo.formInfo.formConf.forEach(function (formConf) {
                formConf.list.forEach(function (fileConf) {
                    fileConf.dragConf={
                        data:{

                        },
                        event: {
                            start: function () {
                                // console.log('start')
                            },
                            move: function () {
                                // console.log('move')
                            },
                            end: function (dragInfo,adoptContainer,adoptInfo,interface) {
                                adoptInfo && adoptInfo.ele.classList.remove('in');
                                interface.reset();
                            }
                        },
                        container: [
                            {
                                note: '表单布局(注释、备注)',
                                element: '.form-layout-edit',
                                innerhandle: {
                                    elements: 'ul>li',
                                    in: function (e) {
                                        this.target.classList.add('in');
                                    },
                                    out: function (e) {
                                        this.target.classList.remove('in');
                                    }
                                },
                                //进入/开始
                                start: function (info) {
                                    // console.log('start',info)
                                },
                                //移动
                                move: function (info) {
                                    // console.log('move',info)
                                },
                                //离开/结束
                                end: function (info) {
                                    // console.log('end',info)
                                }
                            }
                        ]
                    }
                })
            })

            This.$model=formLayoutInfo
        }).fail(function () {

        }).send({
            moduleId:viewInfo.moduleId
        })
    }).fail(function () {

    })


    this.method('getData',function (viewId) {
        formViewStruct.send({id:viewId});
    })

    this.method('submit',function (sendData,callback) {

        moduleSave.success(function () {
            callback();
        }).fail(function () {

        }).send(sendData)
    })



});
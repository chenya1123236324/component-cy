formLayout({
    scope:{

    },
    filter:{

    },
    list:[
        {
            title:'文本框{{value}}',
            require:true,
            config:{
                type:'text',
                value:'text 1',
                name:'text-name',
                placeholder:'请输入文本',
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

            },
            actions:[
                {
                    icon:'icon-hidden',
                    color:'#59abff',
                    name:'隐藏字段',
                    trigger:function (e,data,rowEle) {

                        var showName='显示字段',
                            hiddenName='隐藏字段',
                            showIcon='icon-show',
                            hiddenIcon='icon-hidden';

                        var name=showName,
                            icon=showIcon;

                        if(this.icon === showIcon){
                            icon=hiddenIcon
                            name=hiddenName
                        }

                        data.rowData.hidden=!data.rowData.hidden;
                        this.icon=icon;
                        this.name=name;
                    }
                },
                {
                    icon:'icon-shezhi',
                    color:'#59abff',
                    name:'设置',
                    trigger:function () {

                    }
                },
                {
                    icon:'icon-shanchu',
                    color:'#ff7e7e',
                    name:'移除',
                    trigger:function (e,data) {
                        data.layoutConfig.list.splice(data.index,1);

                    }
                }
            ]
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
            title:'自定义内容',
            require:true,
            config:{
                type:'custom',
                template:'<input type="datetime">'
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
                        {
                            content:'化学',
                            value:'3'
                        },
                        {
                            content:'英语',
                            value:'4'
                        },
                        {
                            content:'几何',
                            value:'5'
                        },
                        {
                            content:'生物',
                            value:'6'
                        },
                        {
                            content:'生物1',
                            value:'61'
                        }
                    ]
                }
            }
        },
        {
            title:'图标选择',
            config:{
                type:'icons',
                name:'icon'
            }
        },
        {
            title:'颜色选择',
            config:{
                type:'color',
                name:'icon',
                value:'red'
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
        }
    ]
});
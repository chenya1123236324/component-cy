/**
 * Created by 贝贝 on 2016/12/26.
 */
//视图条件修改额formLayout
define(function () {
    //参数:1.data:修改formLayout的数据
    // 2.affectOperations:影响字段,
    // 3.batchConditionList:字段下拉框数据
    // 4.dataModel--数据源model
    // 5.formSelecteData--下拉框渲染需要的参数(这里传过来的值是: {viewId:rowData.viewId,moduleId:moduleId} )
    return function (data,affectColumns,batchConditionList,conditionValueList,dataModel,formSelectData) {
        var submitModel = $FRAME.$model(function () {

            var $submitServer = this.server({
                serverType:'jsonp',
                method:'moduleValid'
            });
            //数据发送
            this.method('GET',function (url,callback) {
                //服务请求
                $submitServer.url(url).receive(function (res) {
                    typeof callback === 'function' && callback(res);
                }.bind(this)).send({});

            }.bind(this));

        });

        submitModel.method('GET','./serverData/config/form/validConfig.js',function (res) {

            var hiddenList = {
                0:false,
                1:data.ruleType === 'columnFilter',
                2:false,
                3:false,
                4:false,
                5:false
            },
                sort,
                selectField,
                fieldFilterCustomData;

            var list=[
                    {
                        title:'条件名称',
                        required:true,
                        // class:'clos-all',
                        // "$-show":showList[0],
                        config:{
                            type:'custom',
                            template:'<input type="text" name="ruleName" $-valid="validRuleName" $-bind:value="data.ruleName">',
                            scope:{
                                validRuleName:res.ruleName,
                                data:data
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[0]
                    },
                    sort={
                        title:'执行顺序',
                        required:false,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<input type="text" name="sort" $-bind:value="data.sort">',
                            scope:{
                                data:data
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[1]
                    },
                    /*{
                        title:'条件类型',
                        required:true,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<select config="ruleTypeModel" ></select>',
                            scope:{
                                validRuleType:res.ruleType,
                                ruleTypeModel:{
                                    name:'ruleType',
                                    style:{
                                        // width:'100%',
                                    },
                                    dataList:[
                                        {
                                            content:'隐藏',
                                            value:'hidden',
                                            selected:data.ruleType=='hidden'
                                        },
                                        {
                                            content:'显示',
                                            value:'show',
                                            selected:data.ruleType=='show'
                                        },
                                        {
                                            content:'只读',
                                            value:'readOnly',
                                            selected:data.ruleType=='readOnly'
                                        },
                                        {
                                            content:'字段筛选',
                                            value:'columnFilter',
                                            selected:data.ruleType=='columnFilter'
                                        },
                                    ]
                                }
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[2]
                    },*/
                    {
                        title:'条件类型',
                        required:false,
                        config:{
                            type:'custom',
                            template:'<input type="text" name="ruleType" readonly $-bind:value="content">',
                            scope:{
                                content:data.ruleType==='show'?'显示':data.ruleType==='hidden'?'隐藏':data.ruleType==='readOnly'?'只读':'字段筛选',
                            }
                        }
                    },
                    {
                        title:'影响字段',
                        required:true,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<select config="affectColumnsModel" $-valid="validAffectColumns" $-bind:selected="data.affectColumns"></select>',
                            scope:{
                                validAffectColumns:res.target,
                                affectColumnsModel:affectColumns,

                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        },
                        hidden:hiddenList[3]
                    },
                    {
                        title:'是否联动',
                        required:false,
                        config:{
                            type:'radios',
                            $config:{
                                name:'isLinkage',
                                dataList:[
                                    {
                                        content:'否',
                                        value:'0',
                                        checked:data.isLinkage===0
                                    },
                                    {
                                        content:'是',
                                        value:'1',
                                        checked:data.isLinkage===1
                                    }
                                ]
                            }
                        },
                        hidden:hiddenList[4]
                    },
                ];

            //条件类型非字段筛选
            if(conditionValueList==''){
                data.viewRuleConditions.forEach(function (rule) {

                    rule.conditionValue= rule.conditionValue || "";

                    //处理每个条件的字段的下拉列表
                    var sourceColumn = batchConditionList.clone();

                    sourceColumn.dataList.forEach(function (column) {
                        if(column.value==rule.sourceColumnId){
                            column.selected = true;
                        }
                    });

                    list.push({
                        title:'',
                        class:'clos-all batchConditChange',
                        config:{
                            type:'custom',
                            template:'<batch-condition config="batchCondition"></batch-condition>',
                            scope:{
                                batchCondition:{
                                    style:{
                                        "margin-left":'-88px'
                                        // width:"100%",
                                    },
                                    list:[
                                        {
                                            title:'字段',
                                            required:true,
                                            config:{
                                                template:'<select config="sourceColumnIdModel" $-valid="validsourceColumn"></select>',
                                                scope:{
                                                    validsourceColumn:res.target,
                                                    sourceColumnIdModel:sourceColumn
                                                }
                                            }
                                        },
                                        {
                                            title:'条件',
                                            required:true,
                                            config:{
                                                template:'<select config="conditionTypeModel"  name="conditionType" $-valid="validconditionType"></select>',
                                                scope:{
                                                    validconditionType:res.target,
                                                    conditionTypeModel:{
                                                        name:'conditionType',
                                                        style:{
                                                            // width:'100%'
                                                        },
                                                        dataList:[
                                                            {
                                                                content:'大于',
                                                                value:1,
                                                                selected:rule.conditionType==1
                                                            },
                                                            {
                                                                content:'小于',
                                                                value:2,
                                                                selected:rule.conditionType==2
                                                            },
                                                            {
                                                                content:'等于',
                                                                value:3,
                                                                selected:rule.conditionType==3
                                                            },
                                                            {
                                                                content:'大于等于',
                                                                value:4,
                                                                selected:rule.conditionType==4
                                                            },
                                                            {
                                                                content:'小于等于',
                                                                value:5,
                                                                selected:rule.conditionType==5
                                                            },
                                                            {
                                                                content:'包含',
                                                                value:6,
                                                                selected:rule.conditionType==6
                                                            },
                                                            {
                                                                content:'不等于',
                                                                value:7,
                                                                selected:rule.conditionType==7
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            title:'',
                                            // required:true,
                                            config:{
                                                template:'<input type="text" name="conditionValue" $-valid="validconditionValue" $-bind:value="rule.conditionValue">',
                                                scope:{
                                                    validconditionValue:res.content,
                                                    rule:rule
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        }
                    });

                });
            }else{
                //条件类型为字段筛选
                data.viewRuleConditions.forEach(function (rule) {

                    rule.conditionValue= rule.conditionValue || "";

                    var batchConditions;
                    //处理每个条件的字段的下拉列表
                    var sourceColumn = batchConditionList.clone();
                    //处理每个条件的条件值的下拉列表
                    var conditionValueColumn = conditionValueList.clone();

                    sourceColumn.dataList.forEach(function (column) {
                        if(column.value==rule.customVal){
                            column.selected = true;
                        }
                    });
                    // conditionValueColumn.name='conditionValue';
                    /*conditionValueColumn.dataList.forEach(function (conditionValue) {
                        if(conditionValue.value==rule.conditionValue) {
                            conditionValue.selected = true;
                        }
                    });*/
                    list.push(batchConditions={
                        title:'',
                        class:'clos-all batchConditChange',
                        config:{
                            type:'custom',
                            template:'<batch-condition config="batchCondition"></batch-condition>',
                            scope:{
                                batchCondition:{
                                    style:{
                                        "margin-left":'-88px'
                                        // width:"100%",
                                    },
                                    list:[
                                        {
                                            title:'字段',
                                            required:true,
                                            config:{
                                                template:'<select config="sourceColumnIdModel" $-valid="validsourceColumn"></select>',
                                                scope:{
                                                    validsourceColumn:res.target,
                                                    sourceColumnIdModel:sourceColumn
                                                }
                                            }
                                        },
                                        {
                                            title:'条件',
                                            required:true,
                                            config:{
                                                template:'<select config="conditionTypeModel"  name="conditionType" $-valid="validconditionType"></select>',
                                                scope:{
                                                    validconditionType:res.target,
                                                    conditionTypeModel:{
                                                        name:'conditionType',
                                                        style:{
                                                            // width:'100%'
                                                        },
                                                        dataList:[
                                                            {
                                                                content:'大于',
                                                                value:1,
                                                                selected:rule.conditionType==1
                                                            },
                                                            {
                                                                content:'小于',
                                                                value:2,
                                                                selected:rule.conditionType==2
                                                            },
                                                            {
                                                                content:'等于',
                                                                value:3,
                                                                selected:rule.conditionType==3
                                                            },
                                                            {
                                                                content:'大于等于',
                                                                value:4,
                                                                selected:rule.conditionType==4
                                                            },
                                                            {
                                                                content:'小于等于',
                                                                value:5,
                                                                selected:rule.conditionType==5
                                                            },
                                                            {
                                                                content:'包含',
                                                                value:6,
                                                                selected:rule.conditionType==6
                                                            },
                                                            {
                                                                content:'不等于',
                                                                value:7,
                                                                selected:rule.conditionType==7
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            title:'',
                                            required:false,
                                            config:{
                                                template:'<select config="conditionValueModel"></select>',
                                                scope:{
                                                    conditionValueModel:conditionValueColumn
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        }
                    });

                });

                //影响字段的change事件
                //影响字段的change事件-->字段筛选

                fieldFilterChangeEvents={
                    change:function () {
                        //改变字段的数据
                        selectField = this.value;
                        batchConditionList.method('getNewListData',selectField,"",function(dataList){
                            fieldFilterCustomData = dataList;
                            //获取条件数据
                            var rules = list.slice(5);
                            rules.forEach(function (rule) {
                                rule.config.scope.batchCondition.list[0].config.scope.sourceColumnIdModel.dataList = fieldFilterCustomData;
                            });
                        });
                    }
                };

                affectColumns.events = fieldFilterChangeEvents;

            }

            submitModel.$model={
                list:list
            }

        });

        return submitModel;
    }
});
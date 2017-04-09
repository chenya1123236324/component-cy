/**
 * Created by 贝贝 on 2016/12/22.
 */
//视图条件新增的formLayout
define(function () {
    //参数:1.影响字段,2.源字段下拉框数据
    return function (affectOperations,batchConditionList,dataModel) {
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

            dataModel.$model={
                list:[
                    {
                        title:'条件名称',
                        required:false,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<input type="text" name="ruleName">',
                            scope:{
                                // validRuleName:res.ruleName
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        }
                    },
                    /*{
                        title:'执行顺序',
                        required:false,
                        class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<input type="text" name="sort">',
                            scope:{
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        }
                    },*/
                    {
                        title:'条件类型',
                        required:false,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<select config="ruleTypeModel"  name="ruleType"></select>',
                            scope:{
                                // validRuleType:res.ruleType,
                                ruleTypeModel:{
                                    name:'ruleType',
                                    style:{
                                        // width:'100%',
                                    },
                                    dataList:[
                                        {
                                            content:'隐藏',
                                            value:'hidden'
                                        },
                                        /*{
                                            content:'显示',
                                            value:'show'
                                        },
                                        {
                                            content:'只读',
                                            value:'readOnly'
                                        },
                                        {
                                            content:'字段筛选',
                                            value:'columnFilter'
                                        },*/
                                    ]
                                }
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        }
                    },
                    {
                        title:'影响操作',
                        required:false,
                        // class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<select config="affectOperationsModel"  name="affectOperationId"<!-- $-valid="validAffectColumns"-->></select>',
                            scope:{
                                // validAffectColumns:res.target,
                                affectOperationsModel:affectOperations,
                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        }
                    },
                    /*{
                        title:'是否联动',
                        required:false,
                        class:'clos-all',
                        config:{
                            type:'custom',
                            template:'<input type="radio" name="isLinkage" value="0">否<input type="radio" name="isLinkage" value="1" style="margin-left: 15px">是',
                            scope:{

                            },
                            cmd:{
                                "$-bind:name":'',
                                "$-value":'',
                            }
                        }

                    },*/
                    {
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
                                            required:false,
                                            config:{
                                                template:'<select config="sourceColumnIdModel"  name="sourceColumnId"></select>',
                                                scope:{
                                                    // validsourceColumn:res.target,
                                                    sourceColumnIdModel:batchConditionList
                                                }
                                            }
                                        },
                                        {
                                            title:'条件',
                                            required:false,
                                            config:{
                                                template:'<select config="conditionTypeModel"  name="conditionType"<!-- $-valid="validconditionType"-->></select>',
                                                scope:{
                                                    // validconditionType:res.target,
                                                    conditionTypeModel:{
                                                        name:'conditionType',
                                                        style:{
                                                            // width:'100%'
                                                        },
                                                        dataList:[
                                                            {
                                                                content:'大于',
                                                                value:1
                                                            },
                                                            {
                                                                content:'小于',
                                                                value:2
                                                            },
                                                            {
                                                                content:'大于',
                                                                value:1
                                                            },
                                                            {
                                                                content:'等于',
                                                                value:3
                                                            },
                                                            {
                                                                content:'大于等于',
                                                                value:4
                                                            },
                                                            {
                                                                content:'小于等于',
                                                                value:5
                                                            },
                                                            {
                                                                content:'包含',
                                                                value:6
                                                            },
                                                            {
                                                                content:'不等于',
                                                                value:7
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
                                                template:'<input type="text" name="conditionValue">',
                                                scope:{
                                                    // validconditionValue:res.content
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

                    },
                ]
            }

        });

        return submitModel;
    }
});
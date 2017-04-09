/**
 * Created by 贝贝 on 2016/12/26.
 */
//视图条件编辑额formLayout
define(function () {
    //参数:1.data:编辑formLayout的数据
    // 2.affectOperations:影响字段,
    // 3.batchConditionList:源字段下拉框数据
    // 4.dataModel--数据源model
    // 5.formSelecteData--下拉框渲染需要的参数(这里传过来的值是: {viewId:rowData.viewId,moduleId:moduleId} )
    return function (data,affectOperations,batchConditionList,dataModel,formSelectData) {

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

            var list=[
                {
                    title:'条件名称',
                    // required:true,
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
                    }
                },
                /*{
                    title:'执行顺序',
                    required:false,
                    class:'clos-all',
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
                    }
                },*/
                /*{
                    title:'条件类型',
                    // required:true,
                    // class:'clos-all',
                    config:{
                        type:'custom',
                        template:'<select config="ruleTypeModel"  name="ruleType" $-valid="validRuleType"></select>',
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
                                    /!*{
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
                                    },*!/
                                ]
                            }
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
                    config:{
                        type:'custom',
                        template:'<input type="text" name="ruleType" readonly $-bind:value="content">',
                        scope:{
                            content:data.ruleType==='show'?'显示':data.ruleType==='hidden'?'隐藏':data.ruleType==='readOnly'?'只读':'字段筛选',
                        }
                    }
                },
                {
                    title:'影响操作',
                    // required:true,
                    // class:'clos-all',
                    config:{
                        type:'custom',
                        template:'<select config="affectOperationModel"  name="affectOperationId" $-valid="validAffectOperations"></select>',
                        scope:{
                            validAffectOperations:res.target,
                            affectOperationModel:affectOperations,
                            data:data
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
                        template:'<input type="radio" name="isLinkage" value="0" $-checked="data.isLinkage==0">否<input type="radio" name="isLinkage" value="1" style="margin-left: 15px" $-checked="data.isLinkage==1">是',
                        scope:{
                            data:data
                        },
                        cmd:{
                            "$-bind:name":'',
                            "$-value":'',
                        }
                    }

                },*/
            ];
            data.operationRuleCondList.forEach(function (rule) {

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
                                    "margin-left":'-88px',
                                },
                                list:[
                                    {
                                        title:'字段',
                                        // required:true,
                                        config:{
                                            template:'<select config="sourceColumnIdModel"  name="sourceColumnId" $-valid="validsourceColumn"></select>',
                                            scope:{
                                                validsourceColumn:res.target,
                                                sourceColumnIdModel:sourceColumn
                                            }
                                        }
                                    },
                                    {
                                        title:'条件',
                                        // required:true,
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

            submitModel.$model={
                list:list
            }
        });

        return submitModel;
    }
});
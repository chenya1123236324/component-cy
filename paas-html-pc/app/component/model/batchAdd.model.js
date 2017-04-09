/**
 * Created by chenya on 2016/11/15.
 */

//批量新增batch-add组件
model('batchAdd',function(){
    this.$model ={
        style:{
            "margin-left":"50px",
        },
        list:[
            {
                title:'查询字段',
                require:true,
                config:{
                    template:'<select  config="queryField"></select> ',
                    scope:{
                        queryField:{
                            name:'queryField',
                            style:{
                                width:'160px',
                                border:'solid 1px #E5EBF4'
                            },
                            dataList:[
                                {
                                    content:'名称',
                                    value:'1',
                                    selected:true
                                },
                                {
                                    content:'创建时间',
                                    value:'2',
                                },
                                {
                                    content:'创建人',
                                    value:'3',
                                },
                            ]
                        }
                    }
                }
            },
            {
                title:'查询条件',
                require:true,
                config:{
                    template:'<select  config="queryCondition"></select> ',
                    scope:{
                        queryCondition:{
                            name:'queryCondition',
                            style:{
                                width:'160px',
                                border:'solid 1px #E5EBF4'
                            },
                            dataList:[
                                {
                                    content:'大于',
                                    value:'1',
                                    selected:true
                                },
                                {
                                    content:'小于',
                                    value:'2',
                                },
                                {
                                    content:'等于',
                                    value:'3',
                                },
                            ]
                        }
                    }
                }
            },
            {
                title:'',
                require:true,
                config:{
                    template:'<input name="contentText"  type="text" style="height:30px;line-height:30px;" class="contentText"/>',
                    scope:{
                    }
                }
            }
        ]
    }
});








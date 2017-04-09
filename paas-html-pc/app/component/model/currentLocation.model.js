/**
 * Created by chenya on 2016/10/19.
 */
//当前位置组件
model('currentLocation',function(){
    this.$model=[{
        superiorName:"首页",
        locationNameOne:"公海客户",
        locationHref:"#1",
        leftColor:'#fff',  //左侧内容背景颜色
        rightColor:'#fff', //右侧内容背景颜色
        activeColor:'#21c3b9', //右侧内容鼠标悬浮背景颜色
        verticalLine:'1px solid #A3B0CC;',//右侧内容竖线颜色
        list:[
            {
                isLocation:true,//是否是当前位置
                locationName:'公海客户',//左侧当前位置名称
                href:'www.baidu.com',
                events:{
                    click:function (event) {
                        event.stopPropagation()
                        console.log(this,this.innerHTML,event,'11')
                    }
                }
            }, {
                isLocation:false,//是否是当前位置
                locationName:'区域公海',//右侧位置名称
                href:'www.baidu.com',
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            }, {
                isLocation:false,//是否是当前位置
                locationName:'重点客户',//右侧位置名称
                href:'#',
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            }, {
                isLocation:false,//是否是当前位置
                locationName:'潜在客户',//右侧位置名称
                href:'#',
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            }, {
                isLocation:false,//是否是当前位置
                locationName:'正式客户',//右侧位置名称
                href:'#',
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            }, {
                isLocation:false,//是否是当前位置
                locationName:'联系人',//右侧位置名称
                href:'#',
                events:{
                    click:function (event) {
                        console.log(this,this.innerHTML,event)
                    }
                }
            }
        ]
    }]
});
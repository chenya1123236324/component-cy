/**
 * Created by xiyuan on 17-1-12.
 */
dialog({
    title:'dialog演示',
    maxmin:true,
    content:'<h3>{{title}}</h3>',
    // zoom:'max',
    // offset:'center',
    scope:{
        title:'标题'
    },
    filter:{},
    height:'200px',
    width:'500px',
    btns:[
        {
            name:'提交',
            trigger:function (eve,interface) {
                this.name= this.name == 'ok' ? '提交':'ok';
                // interface.close();
            }
        },
        {
            name:'取消',
            theme:"warning", //[ primary , success , info , warning , danger ]
            trigger:function (eve,interface) {
                interface.close();
            }
        },
        {
            name:'放大',
            theme:"danger", //[ primary , success , info , warning , danger ]
            trigger:function (eve,interface) {
                interface.zoomToggle();
                console.log(interface)
            }
        }
    ]

});
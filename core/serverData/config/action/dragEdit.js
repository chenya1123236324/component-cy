/**
 * Created by xiyuan on 17-2-26.
 */
drag({
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
            interface.to({
                top:adoptInfo.top+'px',
                left:adoptInfo.left+'px',
                width:adoptInfo.width+'px',
                height:adoptInfo.height+'px'
            });
            adoptInfo.ele.classList.remove('in');
            // console.log('end',arguments)
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

                    console.log([].indexOf.call(this.target.parentNode.childNodes,this.target),this)
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
});
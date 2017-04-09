/**
 * Created by xiyuan on 17-1-10.
 */
controller('dialog',function () {

    this.assign('openDialog',this.model(['$:{PLUGINS}/modal/modal-dialog'],function ($dialog) {
        this.server({
            serverType:'jsonp',
            method:'dialog',
            url: $FRAME.lib.$path.cwd+'serverData/config/plugins/modal/dialog.js'
        }).receive(function (res) {
            this.$model=function () {
                console.log(res)
                $dialog(res)
            }
        }.bind(this)).send();


    }));


    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});

controller('confirm',function () {

    this.assign('openConfirm',this.model(['$:{PLUGINS}/modal/modal-confirm'],function ($confirm) {
        this.$model=function () {
            $confirm({
                title:'消息',
                content:'确定删除此条数据？',
                pass:function () {
                },
                cancel:function () {
                }
            })
        }


    }));


    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});
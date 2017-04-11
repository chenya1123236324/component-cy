/**
 * Created by xiyuan on 17-1-10.
 */

controller('message',function () {

    this.assign('sendMessage',function () {
        $packages('{PLUGINS}/hint/hint-message',function ($message) {
            $message('这是一条提示消息！');
        })
    });


    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});

controller('loading',function () {
    var CT=this,
        loadingMessage='点击我触发加载提示！',
        loadingPlugins=null;

    this.assign('toggleLoading',function () {
        $packages('{PLUGINS}/hint/hint-loading',function ($loading) {
            loadingPlugins=loadingPlugins||$loading('数据加载中');
            if(loadingPlugins.state){
                loadingPlugins.close();
                CT.assign('message',loadingMessage)
            }else{
                loadingPlugins.open();
                CT.assign('message','点击我关闭加载提示！')
            }
        })
    });

    this.assign('message',loadingMessage);

    this.assign('layoutBaseConf',this.model('@layout:base'));

    this.layout('@layout:base','tpl').display();
});
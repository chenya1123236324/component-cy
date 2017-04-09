//时间组件
controller('time', function () {
    this.title('时间组件');
    var time = this.model('time:time');
    this.assign('time', time);
    this.assign('layoutBaseConf', this.model('@layout:base'));
    this.layout('@layout:base', 'tpl').display();
});

//日期时间组件
controller('datetime', function () {
    this.title('日期时间组件');
    var datetime = this.model('datetime:datetime');
    this.assign('datetime', datetime);
    this.assign('layoutBaseConf', this.model('@layout:base'));
    this.layout('@layout:base', 'tpl').display();
});
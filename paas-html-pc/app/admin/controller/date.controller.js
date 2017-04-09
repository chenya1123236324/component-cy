//日期组件
controller('date', function () {
    this.title('日期组件');
    var date = this.model('date:date');
    this.assign('date', date);
    this.assign('layoutBaseConf', this.model('@layout:base'));
    this.layout('@layout:base', 'tpl').display();
});

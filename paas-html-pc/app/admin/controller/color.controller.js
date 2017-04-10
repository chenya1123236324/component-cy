//颜色组件
controller('color', function () {
    this.title('颜色组件');
    var color = this.model('color:color');
    this.assign('color', color);
    this.assign('layoutBaseConf', this.model('@layout:base'));
    this.layout('@layout:base', 'tpl').display();
});

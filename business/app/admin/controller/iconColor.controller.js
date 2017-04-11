//图标颜色组件
controller('iconColor', function () {
    this.title('图标颜色组件');
    var iconColor = this.model('iconColor:iconColor');
    this.assign('iconColor', iconColor);
    this.assign('layoutBaseConf', this.model('@layout:base'));
    this.layout('@layout:base', 'tpl').display();
});

//图标组件
controller('icons', function () {
    this.title('图标组件');
    var icons = this.model('icons:icons');
    this.assign('icons', icons);
    this.assign('layoutBaseConf', this.model('@layout:base'));
    this.layout('@layout:base', 'tpl').display();
});

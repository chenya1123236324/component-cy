//当前位置组件
controller('currentLocation', function () {
    this.title('当前位置组件');
    var currentLocation = this.model('@currentLocation:currentLocation');
    this.assign('currentLocation', currentLocation);
    this.assign('layoutBaseConf', this.model('@layout:base'));
    this.layout('@layout:base', 'tpl').display();
});
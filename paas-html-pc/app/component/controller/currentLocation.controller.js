/**
 * Created by chenya on 2016/10/19.
 */

//当前位置组件
controller('current-location',function () {
    var currentLocation = this.model('@currentLocation:currentLocation');
    this.assign('currentLocation',currentLocation);
    this.display();
});
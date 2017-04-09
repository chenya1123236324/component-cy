/**
 * Created by 贝贝 on 2017/2/21.
 */
//删除数组指定元素的方法

define(function () {
   return function (array,deleteVal) {
       //获取元素下标方法
       Array.prototype.indexOf = function(val) {
           for (var i = 0; i < this.length; i++) {
               if (this[i] == val) return i;
           }
           return -1;
       };

       //删除数组元素
       Array.prototype.remove = function(val) {
           var index = this.indexOf(val);
           if (index > -1) {
               this.splice(index, 1);
           }
       };

       array.remove(deleteVal);
   }
});
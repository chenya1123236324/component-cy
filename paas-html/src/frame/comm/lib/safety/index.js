/**
 @package { safety }
 @description { 数据安全 }
 @return { Object }
 */

//@MAKE:start 编译开始

(function(factory){
   if (typeof define === "function" && define.amd) {

      define('safety', factory);

   } else if (typeof define === "function" && define.cmd) {

      define('safety', [], function (require) {
         return factory();
      });

   } else {
      window.safety = factory();
   }

})(function(){

   return new function(){
      Include('base64.js');
      Include('utf8.js');
      Include('md5.js');
      Include('sha1.js');
      // Include('cryptico.js');
   };
});

//@MAKE:end 编译结束

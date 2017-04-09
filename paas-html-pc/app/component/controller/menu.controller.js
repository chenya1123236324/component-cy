
controller('page-front-menu',function () {
   var pageMenuModel = this.model('@menu:pageMenuModel');

   this.assign('pageMenuData',pageMenuModel);
   this.display();
});

//后台设置菜单(write by yaobeibei)
controller('page-back-menu',function(){
   var confMenuModel = this.model('@menu:page-back-menu');
   // confMenuModel.readData(function(data){
   //    this.assign('pageBackMenu',data);
   // }.bind(this));

   this.assign('pageBackMenu',confMenuModel);

   this.display();
});

//个人中心菜单(修改个人信息)(write by yaobeibei)
controller('page-person-menu',function(){
   var personMenuModel = this.model('@menu:page-person-menu');
   this.assign('pagePersonCenter',personMenuModel);
   this.display();
});

//消息中心(消息,通知)(write by yaobeibei)
controller('page-news-menu',function(){
   var newsMenuModel = this.model('@menu:page-news-menu');
   var newsCenterList = this.model('@list:news-center-list');

   //传给指令的参数
   var hiddenHandle={
      isPull:false,
      //点击消息,让ul消息通知显示
      click:function () {
         var ul = document.querySelector('.news-menu-down');

         if(!hiddenHandle.isPull){
            ul.style.webkitTransform="scale(1,1)";
         }else{
            ul.style.webkitTransform="scale(1,0)";
         }
         hiddenHandle.isPull=!hiddenHandle.isPull;
      }
   };

   this.assign('hiddenHandle',hiddenHandle)

   this.assign('newsCenterMenu',newsMenuModel);
   this.assign('newsCenterList',newsCenterList);

   this.display();
});

//单层菜单
controller('single-menu',function () {
   var singleMenuModel = this.model('@menu:single-menu');
   this.assign('singleMenuData',singleMenuModel);
   this.display();
})

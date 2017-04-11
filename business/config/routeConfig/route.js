//路由配置
route(function ($app,$appConfig) {

    $app.route(function($route){

        //HOME模块自动路由
        $route.when('home',function($route){
            //自动路由
            $route.autoRoute('HOME');
        });

        //component模块自动路由
        $route.when('comp',function($route){
            //自动路由
            $route.autoRoute('COMPONENT');
        });

        //admin模块自动路由
        $route.when('admin',function($route){
            //自动路由
            $route.autoRoute('ADMIN');
        });

		//DEMO模块自动路由
        $route.when('demo',function($route){
            //自动路由
            $route.autoRoute('DEMO');
        });

        /*$route.when('home',{
            controller: 'HOME@index',
            view: 'HOME@index'
        },function($route){

            //自动路由
            $route.autoRoute('HOME');

        })
            .when('home/sys/login',{
            controller: 'HOME@sys:login',
            view: 'HOME@sys:login'
        })*/


    })




});

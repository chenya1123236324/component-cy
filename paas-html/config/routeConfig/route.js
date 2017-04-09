//路由配置
route(function ($app,$appConfig) {

    $app.route(function($route){

        //DEMO模块自动路由
        $route.when('demo',function($route){
            //自动路由
            $route.autoRoute('DEMO');
        });


    })




});

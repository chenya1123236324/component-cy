filterPackage(function ($app, $appConfig) {

    $app.filterRegister('MD5',function (val) {
        var MD5;
        $packages('safety',function ($safety) {
            MD5=$safety.MD5;
        });
        return val?MD5(val):'';
    });

    $app.filterRegister('Date',function (val,layout) {
        var convert;
        $packages('date',function ($date) {
            convert=$date.convert;
        });
        return val?convert(val,layout||'yy-mm-dd'):'';
    });

    /*$app.filterRegister('getType',function (val) {
        var $type;
        $packages('type',function (type) {
            $type=type;
        });
        return $type.getType(val);
    });*/
});
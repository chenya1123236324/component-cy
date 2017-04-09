/**
 * Created by xiyuan on 16-10-24.
 */
!function(factory){
    if (typeof define === "function" && define.amd) {

        define('deviceDrive',['jsonp','IC'], factory);

    } else if (typeof define === "function" && define.cmd) {

        define('deviceDrive', [], function (require) {
            return factory();
        });

    } else {
        window.deviceDrive = factory();
    }
}(function ($jsonp,$IC) {
    var deviceDrive={};

    /**
     * 地理定位
     */
    deviceDrive.geolocation=function (callback) {
        callback=typeof callback === "function"?callback:function () {};

        //经纬度转换成实际地址 接口
        var toAddrUrl='http://api.map.baidu.com/geocoder/v2/',
            //key
            ak='0Dba7a35f35b540c7125443d1c2d5421';

        //百度定位
        if(window.baidu_location){
            //激活定位
            navigator.geolocation.getCurrentPosition(function () {},function () {});

            window.baidu_location.getCurrentPosition(function (position) {
                position=position.split('\n');
                var positionMap={};
                position.forEach(function (val) {
                    var res=val.split(':');
                    positionMap[res[0].trim()]=res[1].trim();

                });

                //转实际地址
                $jsonp({
                    url:toAddrUrl,
                    data:{
                        ak:ak,
                        pois:1,
                        output:'json',
                        location:positionMap.latitude+','+positionMap.lontitude
                    },
                    callbackName: 'callback',   //jsonp发送的参数名称
                    jsonpCallback: 'renderReverse', //jsonp回调成功执行的方法名
                    complete:function (res) {
                        callback(res||positionMap.latitude+','+positionMap.lontitude)
                    }
                });

            }, function (err) {
                callback(null,err)
            });

        }else{
            navigator.geolocation.getCurrentPosition(function (position) {
                //转实际地址
                $jsonp({
                    url:toAddrUrl,
                    data:{
                        ak:ak,
                        pois:1,
                        output:'json',
                        coordtype:'wgs84ll',    //经度  //纬度
                        location:position.coords.latitude+','+position.coords.longitude
                    },
                    callbackName: 'callback',   //jsonp发送的参数名称
                    jsonpCallback: 'renderReverse', //jsonp回调成功执行的方法名
                    complete:function (res) {
                        callback(res||position.coords.latitude+','+position.coords.longitude)
                    }
                });

            },function (err) {
                callback(null,err)
            })
        }
    };

    /**
     * 根据经纬度获取实际地址
     * @param locations
     */
    deviceDrive.getLocationAddr=function (locations,callback,coordtype) {
        //经纬度转换成实际地址 接口
        var toAddrUrl='http://api.map.baidu.com/geocoder/v2/',
            //key
            ak='0Dba7a35f35b540c7125443d1c2d5421';

        function getAddr(location,callback,coordtype) {
            $jsonp({
                url:toAddrUrl,
                data:{
                    ak:ak,
                    pois:1,
                    output:'json',
                    coordtype:coordtype||'wgs84ll',    //经度  //纬度
                    location:location
                },
                callbackName: 'callback',   //jsonp发送的参数名称
                jsonpCallback: 'renderReverse', //jsonp回调成功执行的方法名
                complete:function (res) {
                    callback(res||location)
                }
            });
        }

        switch (typeof locations){
            case 'object':
                var locationValues=[],
                    getCount=0;
                locations.forEach(function (location,index) {
                    var _callback=function (res) {
                        locationValues[index]=res;
                        ++getCount === locations.length && callback(locationValues)
                    };
                    getAddr(locations,_callback,coordtype);
                });
                break;
            case 'string':
                getAddr(locations,callback,coordtype);
                break
        }
    };

    /**
     * 拍照
     */
    deviceDrive.camera=function (callback,handle) {
        if(!navigator.camera){
            handle();
            alert('此设备不支持拍照');
            callback();
            return
        }
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 25,
            correctOrientation:true,
            encodingType:Camera.EncodingType.PNG,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var base64Data = 'data:image/png;base64,' + imageData;
            typeof handle === "function" && handle(base64Data);
            //图片压缩
            $IC(base64Data, {
                height: 400,
                quality: 0.5
            })
            .then(function (rst) {
                callback(rst);
                return rst;
            })
            .catch(function (err) {
                alert(err);
            });
        }

        function onFail(message) {
            callback(null,message);
            if(message.match('selected')){
                alert('您已取消图片选择!');
            }else{
                alert('拍照失败!')
            }
        }

    };

    return deviceDrive;
});
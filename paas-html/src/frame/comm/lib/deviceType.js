/**
 * Created by xiyuan on 14-8-22.
 */
!function(factory,root){
    if (typeof define === "function" && define.amd) {

        define('deviceType', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('deviceType', [], function (require) {
            return factory();
        });

    } else {
        window.deviceType = factory();
    }
}(function () {
    var device={},
        version;

    device.navigator = window.navigator;
    device.userAgent = window.navigator.userAgent.toLowerCase();

    /*检查当前设备类型*/
    device._find = function (feature) {
        return device.userAgent.indexOf(feature) !== -1;
    };

    /*匹配当前设备的类型，并执行其回调函数*/
    device._isDevice=function(deviceName){
        var deviceName='is'+deviceName.replace(/(^|\s+)\w/g,function(s){
            return s.toUpperCase();
        });
        return function (callBack) {
            return eval("device."+deviceName)?(typeof callBack == "function"?callBack():true):false;
        }
    };

    /*苹果设备*/
    device.isIphone = device._find('iphone');
    device.iphone = device._isDevice('iphone');

    device.isIpod = device._find('ipod');
    device.ipod = device._isDevice('ipod');

    device.isIpad = device._find('ipad');
    device.ipad = device._isDevice('ipad');

    device.isIos = device.isIphone || device.isIpod || device.isIpad;
    device.ios=device._isDevice('ios');

    device.isMacPc = device._find('mac') && !device.isIphone && !device.isIpod && !device.isIpad
    device.macPc=device._isDevice('MacPc')

    device.isMac = device._find('mac')
    device.mac=device._isDevice('mac')

    /*安卓设备*/
    device.isAndroid = device._find('android')
    device.android = device._isDevice('android')

    device.isAndroidPhone = device.isAndroid && device._find('mobile')
    device.androidPhone = device._isDevice('androidPhone')

    device.isAndroidPad = device.isAndroid && !device._find('mobile')
    device.androidPad=device._isDevice('androidPad')

    /*黑莓设备*/
    device.isBlackberry = device._find('blackberry') || device._find('bb10') || device._find('rim')
    device.blackberry = device._isDevice('blackberry')

    device.isBlackberryPhone = device.isBlackberry && !device._find('tablet')
    device.blackberryPhone = device._isDevice('blackberryPhone')

    device.isBlackberryPad = device.isBlackberry && device._find('tablet')
    device.blackberryPad = device._isDevice('blackberryPad')

    /*windows设备*/
    device.isWindows = device._find('windows')
    device.windows  = device._isDevice('windows')

    device.isWindowsPhone = device.isWindows && device._find('phone')
    device.windowsPhone = device._isDevice('windowsPhone')

    device.isWindowsPad = device.isWindows && (device._find('touch') && !device.isWindowsPhone)
    device.windowsPad = device._isDevice('windowsPad')

    device.isWindowsPc =device.isWindows && !device.isWindowsPad && !device.isWindowsPhone
    device.windowsPc = device._isDevice('windowsPc')

    /*火狐设备*/
    device.isFxos = (device._find('(mobile;') || device._find('(tablet;')) && device._find('; rv:')
    device.fxos = device._isDevice('fxos')

    device.isFxosPhone = device.isFxos && device._find('mobile')
    device.fxosPhone = device._isDevice('fxosPhone')

    device.isFxosPad = device.isFxos && device._find('tablet')
    device.fxosPad = device._isDevice('fxosPad')

    /*诺基亚设备*/
    device.isMeego = device._find('meego')
    device.meego = device._isDevice('meego')

    /*以PhoneGap为核心的应用*/
    device.isCordova = (window.cordova && location.protocol === 'file:')
    device.cordova = device._isDevice('cordova')

    /*以node 和 webkit 构成的应用*/
    device.isNodeWebkit = typeof window.process === 'object'
    device.nodeWebkit = device._isDevice('nodeWebkit')

    /*手机设备*/
    device.isPhone = device.isAndroidPhone || device.isIphone || device.isIpod || device.isWindowsPhone || device.isBlackberryPhone || device.isFxosPhone || device.isMeego
    device.phone = device._isDevice('phone')

    /*pad设备*/
    device.isPad = device.isIpad || device.isAndroidPad || device.isBlackberryPad || device.isWindowsPad || device.isFxosPad
    device.pad = device._isDevice('pad')

    /*桌面设备*/
    device.isDesktop = !device.isPhone && !device.isPad
    device.desktop = device._isDevice('desktop')

    /*浏览器识别*/
    var browser={
        version:'未知版本',
        cname:'未知浏览器',
        name:'未知浏览器',
        engine:'未知引擎',
        core:'未知内核'
    }

    /*IE 5-10版本浏览器识别*/
    if(window.navigator.appName == "Microsoft Internet Explorer"){
        (new RegExp("MSIE (\\d+\\.\\d+);")).test(window.navigator.userAgent);
        browser.version=window.navigator.userAgent.match(/MSIE ([0-9\.]+)/i)[1];
        browser.name='IE';
        browser.cname=browser.name+browser.version;
        browser.engine='Trident';
        browser.core='IE';

    /*IE 11*/
    }else if(version= window.navigator.userAgent.match(/NET/) && window.navigator.userAgent.match(/rv:(\d+.\d+)/)){
        browser.version=version[1];
        browser.name='IE';
        browser.cname=browser.name+browser.version;
        browser.engine='Trident';
        browser.core='IE';

    /*遨游浏览器*/
    }else if(window.navigator.userAgent.match(/Maxthon/i)){
        browser.version=window.navigator.userAgent.match(/Maxthon[ |\/]([0-9\.]+)/i)[1]
        browser.name='Maxthon';
        browser.cname='世界之窗';
        browser.engine='Webkit';
        browser.core='Chrome';

    /*世界之窗浏览器*/
    }else if(window.navigator.userAgent.match(/TheWorld/i)){
        browser.version=window.navigator.userAgent.match(/TheWorld[ |\/]([0-9\.]+)/i)[1]
        browser.name='TheWorld';
        browser.cname='世界之窗';
        browser.engine='Webkit';
        browser.core='Chrome';

    /*小米览器*/
    }else if(window.navigator.userAgent.match(/MiuiBrowser/i)){
        browser.version= window.navigator.userAgent.match(/MiuiBrowser[ |\/]([0-9\.]+)/i)[1]
        browser.name='MiuiBrowser';
        browser.cname='小米浏览器';
        browser.engine='Webkit';
        browser.core='Chrome';

    /*谷歌浏览器*/
    }else if(window.navigator.userAgent.match(/chrome/i) && window.navigator.vendor.match(/Google/i)){
        browser.version=window.navigator.userAgent.match(/chrome[ |\/]([0-9\.]+)/i)[1]
        browser.name='Chrome';
        browser.cname='谷歌';
        browser.engine='Webkit';
        browser.core='Chrome';

    /*Safari 浏览器*/
    }else if(window.navigator.userAgent.match(/Safari/i) && window.navigator.vendor.match(/Apple/i)){
        browser.version=window.navigator.userAgent.match(/Version[ |\/]([0-9\.]+)/i)[1]
        browser.name='Safari';
        browser.cname='苹果';
        browser.engine='Webkit';
        browser.core='Safari';

    /*Firefox 浏览器*/
    }else if(window.navigator.userAgent.match(/Firefox/i)){
        browser.version=window.navigator.userAgent.match(/Firefox[ |\/]([0-9\.]+)/i)[1]
        browser.name='Firefox';
        browser.cname='火狐';
        browser.engine='Gecko';
        browser.core='Firefox';

    /*Opera 浏览器*/
    }else if(window.navigator.userAgent.match(/OPR/i) && window.navigator.vendor.match(/Opera/i)){
        browser.version=window.navigator.userAgent.match(/OPR[ |\/]([0-9\.]+)/i)[1]
        browser.name='Opera';
        browser.cname='欧朋';
        browser.engine='Webkit';
        browser.core='Opera';

    }else if(window.navigator.userAgent.match(/chrome/i) || window.navigator.vendor.match(/Google/i)){
        browser.version= ((version= window.navigator.userAgent.match(/chrome[ |\/]([0-9\.]+)/i) )?version[1]:false) || window.navigator.userAgent.match(/Version[ |\/]([0-9\.]+)/i)[1]
        browser.name='Chrome';
        browser.cname='谷歌';
        browser.engine='Webkit';
        browser.core='Chrome';
    }
    device.browser=browser;

    /*操作系统识别*/
    device.isWin8 = device._find("nt 6.3")
    device.isWin7 = device._find("nt 6.1")
    device.isVista = device._find("nt 6.0")
    device.isWin2003 = device._find("nt 5.2")
    device.isWinXp = device._find("nt 5.1")
    device.isWin2000 = device._find("nt 5.0")
    device.isWindows = (device._find("windows") || device._find("win32") )
    device.isMac = (device._find("macintosh") || device._find("mac os x"))
    device.isAir = device._find("adobeair")
    device.isAndroid = device._find("android")
    device.isLinux = device._find("linux")

    if(device.isWin8){
        device.OS = "Windows 8";
    }else if(device.isWin7){
        device.OS = "Windows 7";
    }else if(device.isVista){
        device.OS = "Vista";
    }else if(device.isWinXp){
        device.OS = "Windows xp";
    }else if(device.isWin2003){
        device.OS = "Windows 2003";
    }else if(device.isWin2000){
        device.OS = "Windows 2000";
    }else if(device.isWindows){
        device.OS = "Windows";
    }else if(device.isMac){
        device.OS = "Mac";
    }else if(device.isAir){
        device.OS = "Adobeair";
    }else if(device.isAndroid){
        device.OS = "Android";
    }else if(device.isLinux){
        device.OS = "Linux";
    }else{
        device.OS = "Unknow";
    }

    var platform=device.navigator.platform.toLocaleLowerCase();

    switch(true){
        case platform.indexOf('win') !== -1:
            device.platform='win';
            break;
        case platform.indexOf('linux') !== -1:
            device.platform='linux';
            break;
        case platform.indexOf('mac') !== -1:
            device.platform='mac';
            break;
    }

    if(device.isWindows){
        if(device._find("win64")>=0||device._find("wow64")>=0){
            device.OS=device.OS +" For x64";
            device.Cpu='x64';
        }else{
//            device.OS=device.OS +' For '+ navigator.cpuClass;
//            device.Cpu=navigator.cpuClass;
            device.OS=device.OS +" For x32";
            device.Cpu='x32';
        }
    }

    function checkVideo() {
        if (!!document.createElement('video').canPlayType) {
            var vidTest = document.createElement("video");
            var oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
            if (!oggTest) {
                h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                if (!h264Test) {
                    alert("不支持HTML5，推荐你下载个chrome或者IE9版本之上的浏览器，要不就回家洗洗睡吧");
                    stopDOM();
                }
                else {
                    if (h264Test == "probably") {
                        alert("支持HTML5，不错嘛。精彩内容，马上呈现！");
                    }
                    else {
                        alert("唉，支持一部分html5，不给你显示了，换个浏览器吧，比如Chrome，IE9+。");
                        stopDOM();
                    }
                }
            }else {
                if (oggTest == "probably") {
                    alert("支持HTML5，不错嘛。精彩内容，马上呈现！");
                }
                else {
                    alert("唉，支持一部分html5，不给你显示了，换个浏览器吧，比如Chrome，IE9+。");
                    stopDOM();
                }
            }
        }
        else {
            alert("不支持HTML5，推荐你下载个chrome或者IE9版本之上的浏览器，要不就回家洗洗睡吧");
            stopDOM();
        }
        function stopDOM() {
            if (window.stop)
                window.stop();
            else
                document.execCommand("Stop");
        }
    }

    // window && window.document.querySelector('HTML').setAttribute('device-platform',device.platform);
    return device;
},this);

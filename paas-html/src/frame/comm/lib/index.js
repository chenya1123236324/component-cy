/**
 * Created by xiyuan on 15-11-30.
 */
//@make : start

/*数据类型*/
Include('type.js');

/*字符串对象*/
Include('string.js');

/*数据对象*/
Include('object.js');

/*链接处理*/
Include('url.js');

/*路径处理*/
Include('path.js');

/*json*/
Include('json.js');

/*jsonp*/
Include('jsonp.js');

/*socket*/
Include('socket.js');

/*网络包*/
Include('net/index.js');

/*时间/日期处理包*/
Include('date.js');

/*图片压缩包*/
Include('lrz.all.bundle.js');

/*平台检查包*/
Include('platform.js');

/*设备检查包*/
// Include('deviceType.js');

/*设备驱动包*/
Include('deviceDrive.js');

/*HTMLtoDOM html文本转Document*/
Include('htmlparser.js');

/*页面元素*/
Include('element/index.js');

/*数据安全*/
Include('safety/index.js');

/*二进制、缓存转换*/
Include('buffer.js');

/*zip压缩包*/
Include('zip/jszip.js');

/*事件管理*/
Include('eventManageInterface.js');

/*日志*/
Include('log.js');

/*触摸*/
Include('touch.js');

/*公共方法*/
Include('commFn.js');

var $LIB = {};
(function (exports, inner) {
    //挂载基础包
    inner.$packages(
        'type',
        'string',
        'object',
        'url',
        'path',
        'json',
        'jsonp',
        'net',
        'date',
        'IC',
        'platform',
        'deviceDrive',
        // 'deviceType',
        'HTMLtoDOM',
        'element',
        'safety',
        'buffer',
        'zip',
        'log',
        'touch',
        'eventManageInterface',
        'commFn',
        function (type,
                  string,
                  object,
                  url,
                  path,
                  json,
                  jsonp,
                  net,
                  date,
                  IC,
                  platform,
                  deviceDrive,
                  // deviceType,
                  HTMLtoDOM,
                  element,
                  safety,
                  buffer,
                  zip,
                  log,
                  touch,
                  eventManageInterface,
                  commFn) {
            exports.$type = type;
            exports.$string = string;
            exports.$object = object;
            exports.$url = url;
            exports.$path = path;
            exports.$json = json;
            exports.$jsonp = jsonp;
            exports.$net = net;
            exports.$date = date;
            exports.$IC = IC;
            exports.$platform = platform;
            exports.$deviceDrive = deviceDrive;
            // exports.$deviceType = deviceType;
            exports.$element = element;
            exports.$HTMLtoDOM = HTMLtoDOM;
            exports.$safety = safety;
            exports.$buffer = buffer;
            exports.$zip = zip;
            exports.$log = log;
            exports.$touch = touch;
            exports.$eventManageInterface = eventManageInterface;
            exports.$commFn = commFn;
            //不让修改类库方法和属性
            //Object.freeze(exports);
        }
    )
})($LIB, this);

var $type = $LIB.$type,
    $object = $LIB.$object,
    $url = $LIB.$url,
    $path = $LIB.$path,
    $json = $LIB.$json,
    $jsonp = $LIB.$jsonp,
    $net = $LIB.$net,
    $date = $LIB.$date,
    $IC = $LIB.$IC,
    $platform = $LIB.$platform,
    $deviceDrive = $LIB.$deviceDrive,
    // $deviceType = $LIB.$deviceType,
    $element = $LIB.$element,
    $HTMLtoDOM = $LIB.$HTMLtoDOM,
    $safety = $LIB.$safety,
    $buffer = $LIB.$buffer,
    $zip = $LIB.$zip,
    $eventManageInterface = $LIB.$eventManageInterface,
    $commFn = $LIB.$commFn;

//@make : end

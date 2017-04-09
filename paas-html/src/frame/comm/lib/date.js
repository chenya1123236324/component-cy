(function(factory){
    if (typeof define === "function" && define.amd) {

        define('date', factory);

    } else if (typeof define === "function" && define.cmd) {

        define('date', [], function (require) {
            return factory();
        });

    } else {
        window.date = factory();
    }
})(function () {

    function getType(value) {
        var type = typeof (value);
        if (type == 'object') {
            type = Object.prototype.toString.call(value).match(/Object\s+([a-z0-9_]*)/i)[1].toLocaleLowerCase()
        }
        return type;
    }

    var date = {},

    //获取当前时间戳
    nowTimestamp=date.nowTimestamp = function () {
        return new Date().getTime();
    },

    /*时间转换*/
    convert = date.convert = function () {
        var date = arguments[0];

        if((date =Number(date)?Number(date):date) || typeof date === 'string'){
            date = new Date(date);
            date = date.toString().indexOf('Invalid') >= 0 ? new Date() : date;
        }else if({}.toString.call(date) === '[object Date]' ){
        } else{
            date = new Date();
        }

        if (typeof arguments[1] === "string") {
            date = getJavaTime(date, arguments[1])
        }
        return date;
    },

    //获取年份
    getYear=date.getYear = date.getFullYear = function (data) {
        return convert(data).getFullYear();
    },

    //获取月份
    getMonth=date.getMonth = function (data) {
        return convert(data).getMonth() + 1
    },

    //获取日
    getDate=date.getDate = function (data) {
        return convert(data).getDate();
    },

    //获取时
    getHours=date.getHours = function (data) {
        return convert(data).getHours();
    },

    //获取分
    getMinutes=date.getMinutes = function (data) {
        return convert(data).getMinutes();
    },

    //获取秒
    getSeconds=date.getSeconds = function (data) {
        return convert(data).getSeconds();
    },

    /*java时间戳转换*/
    getJavaTime=date.getJavaTime = function (data, layout) {
        var time = convert(data);
        var year = time.getFullYear()
        var month = time.getMonth() + 1
        var date = time.getDate()
        var hours = time.getHours()
        var minutes = time.getMinutes() >= 10 ? time.getMinutes() : time.getMinutes();
        var seconds = time.getSeconds()
        if (typeof(layout) !== "string") {
            layout = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
        } else {
            layout = layout.replace(/yy/i, year)
            layout = layout.replace(/y/i, String(year).slice(-2))
            layout = layout.replace(/mm/i, month > 9 ? month : '0' + month)
            layout = layout.replace(/m/i, month)
            layout = layout.replace(/dd/i, date > 9 ? date : '0' + date)
            layout = layout.replace(/d/i, date)
            layout = layout.replace(/hh/i, hours > 9 ? hours : '0' + hours)
            layout = layout.replace(/h/i, hours)
            layout = layout.replace(/ii/i, minutes > 9 ? minutes : '0' + minutes)
            layout = layout.replace(/i/i, minutes)
            layout = layout.replace(/ss/i, seconds > 9 ? seconds : '0' + seconds)
            layout = layout.replace(/s/i, seconds)
        }
        return layout;
    },

    /*PHP时间戳转换*/
    getPhpTime=date.getPhpTime = function (nS, layout) {
        return date.getJavaTime(nS * 1000, layout);
    },

    /*添加秒*/
    addDateMinutes=date.addDateMinutes=function (date, minutes) {
        date=convert(date);
        date = new Date(date.getTime());
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    };

    /*获取当前月份有多少天*/
    date.getMonthCountDate=function (date) {
        date = date ? (getType(date) === 'date' ? date : new Date(Number(date))):new Date();
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date.getDate();
    };

    /*获取第几周*/
    date.getNowWeek=function (nowDate){
        nowDate=convert(nowDate);
        var startDate=new Date(nowDate.getTime());
        startDate.setMonth(0);
        startDate.setDate(1);
        startDate.setHours(0,0,0,0);

        var countDay=(nowDate.getTime() - startDate.getTime())/1000/60/60/24+ 1,
            tmpDay=countDay - (8- startDate.getDay());

        return (tmpDay>0?Math.ceil(tmpDay/7):0)+1;
    };

    return date;
});

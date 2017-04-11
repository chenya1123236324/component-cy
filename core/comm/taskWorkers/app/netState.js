/**
 * Created by xiyuan on 16-12-6.
 */

var SOCKET = function () {

    //连接状态储存
    var wsStroageState = {};

    function WS(url) {
        this.url = url;
        this.init();
    }

    WS.prototype = {
        init: function () {
            if (wsStroageState[this.url]) {
                return;
            }

            this.__onopens__ = [];
            this.__onoerrors__ = [];
            this.__oncloses__ = [];
            this.__onmessages__ = [];
            this.__sendData__ = [];

            wsStroageState[this.url] = this;
        },
        request: function () {
            wsStroageState[this.url] = this;

            var __onopens__ = this.__onopens__,
                __onoerrors__ = this.__onoerrors__,
                __oncloses__ = this.__oncloses__,
                __onmessages__ = this.__onmessages__,
                link = this.link = new WebSocket(this.url);

            //监听连接成功事件
            link.addEventListener('open', function () {
                this.isOpen = true;
                var i = ~0, l = __onopens__.length;
                while (++i < l) {
                    __onopens__[i].apply(this, arguments);
                }

                //发送数据
                this.__sendData__.forEach(function (data) {
                    this.send(data);
                }.bind(this))
            }.bind(this));

            //监听连接失败事件
            link.addEventListener('error', function () {
                delete wsStroageState[this.url];
                var i = ~0, l = __onoerrors__.length;
                while (++i < l) {
                    __onoerrors__[i].apply(this, arguments);
                }
            }.bind(this));

            //监听连接关闭事件
            link.addEventListener('close', function () {
                delete wsStroageState[this.url];
                var i = ~0, l = __oncloses__.length;
                while (++i < l) {
                    __oncloses__[i].apply(this, arguments);
                }
            }.bind(this));


            link.addEventListener('message', function () {
                var i = ~0, l = __onmessages__.length;
                while (++i < l) {
                    __onmessages__[i].apply(this, arguments);
                }
            }.bind(this));


        },
        open: function (fn) {
            typeof fn === "function" && this.__onopens__.push(fn);
            return this;
        },
        error: function (fn) {
            typeof fn === "function" && this.__onoerrors__.push(fn);
            return this;
        },
        close: function (fn) {
            typeof fn === "function" && this.__oncloses__.push(fn);
            return this;
        },
        message: function (fn) {
            typeof fn === "function" && this.__onmessages__.push(fn);
            return this;
        },
        send: function (data) {
            if (wsStroageState[this.url]) {
                //检查链接是否打开
                if (this.link.readyState) {
                    this.link.send(data);
                } else {
                    this.__sendData__.push(data)
                }
            } else {
                console.warn('socket连接已关闭!');
            }
            return this;
        },
        destroy: function () {
            if (wsStroageState[this.url] && this.link.readyState) {
                this.link.close();
            }
            return this;
        }
    };

    return function (option) {
        var ws,
            url = option.url,
            protocol = location.protocol === "https:" ? 'wss' : 'ws';

        if (url) {
            url = protocol + '://' + url.replace(/^\S+:\/\//, '');
        } else {
            console.warn('socket 连接地址未填！')
        }

        url = url + (option.sendData || option.data ? ('?' + url.objectToUrl(option.sendData || option.data)) : '');

        if (!(ws = wsStroageState[url])) {
            ws = new WS(url);
        }
        url = protocol = null;
        return ws;
    }
}();

//应用网络状态监听
var netState,
    //超时毫秒数
    timeOut = 1000,
    //连接标识
    connect,
    //是否连接
    isConnect=false,
    //在线处理
    onlineHandle = function () {
        if(!isConnect){
            isConnect=true;
            postMessage({state:isConnect});
        }
    },
    //离线处理
    offlineHandle = function () {

        switch (netState.link.readyState){
            case 2:
                //销毁上次连接,并重新请求
                netState.destroy().request();
                break;
            case 3:
                //销毁上次连接,并重新请求
                netState.request();
                break;
        }

        if(isConnect ){
            isConnect=false;
            postMessage({state:isConnect});
        }
    };

onmessage = function (event) {
    var receiveData = event.data;
    switch (receiveData.type) {
        case 'start':
            netState = SOCKET({
                url: receiveData.url
            });

            netState
                .open(function (event) {
                    netState.send('ping');
                })
                .message(function (event) {
                    setTimeout(function () {
                        netState.send('ping');
                    },200);
                    //在线
                    onlineHandle();
                    //取消之前的定时标识
                    clearTimeout(connect);
                    //定时
                    connect = setTimeout(offlineHandle, timeOut);

                })
                .close(function (event) {
                    offlineHandle();
                    clearTimeout(connect);
                })
                .error(function (event) {
                    clearTimeout(connect);
                })
                .request();

            break;
    }

};

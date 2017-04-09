/**
 * Created by xiyuan on 17-2-14.
 * http://www.iconfont.cn/ 图标数据提取
 * use : # node getIcon
 */
var http=require('http'),
    fs=require('fs'),
    iconMap={},
    contentStr='',
    //回调名称
    jsonpName='icon',
    //文件保存名称
    savefile='./icon.jsonp.js';

http.get({
    hostname: 'at.alicdn.com',
    port: 80,
    //文件路径
    path: '/t/font_1horxjqb9vuw61or.css',
    method: "GET"
}, (res) => {
    // 对响应进行处理

    //设置编码
    res.setEncoding('utf8');

    //监听内容数据
    res.on('data',(chunk)=> {
        contentStr+=chunk;
    }).on('end', (e)=> {

        //正则匹配 icon内容
        contentStr.replace(/\.icon-([\w\-]+):before\s*\{\s*content:\s*"\\([\w\-]+)";\s*\}/g,function(string,name,value){
            iconMap[name]=value;
            return ''
        });

        //资源写入文件
        fs.writeFile(savefile,jsonpName+'('+JSON.stringify(iconMap)+')',function(err){
            err ?
                console.log('icon内容写入失败!'):
                console.log('<-------内容写入成功--------->\r\n');
        });

        // console.log(JSON.stringify(iconMap))

    });

}).on('error', (e)=> {
    console.log('图标资源请求错误信息: ' + e.message);
}).end();
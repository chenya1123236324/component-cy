/**
 * Created by xiyuan on 16-5-17.
 */
//@make : start

//自定义配置 读取与设置
Include('conf.js');

//读取与设置缓存数据
Include('stroage.js');

//渲染引擎接口
Include('engine.js');

//框架外部事件
Include('event.js');

//类库
$FRAME.lib=$LIB;

//websql
$FRAME.DB=function (dbName,version,description,dbSize) {
    return new $DB(dbName,version,description,dbSize);
};

//indexedDB
$FRAME.noSql=function (dbName,version) {
    return new noSql(dbName,version);
};

//@make : end
/**
 * Created by xiyuan on 16-10-20.
 */

/**
 * 数据库类
 * @param dbName
 * @param version
 * @param description
 * @param dbSize
 */
function $DB(dbName,version,description,dbSize) {
    if(!dbName){
        console.warn("未选择数据库名");
        return;
    }
    this.dbName=dbName;
    //创建数据库/打开数据库
    this.db=openDatabase(dbName, version||"1.0", description|| dbName+" DB", dbSize|| 5*1024*1024);
}

/**
 * 创建表
 * @param tableName
 * @param fieldMap
 */
$DB.prototype.create=function (tableName,fieldMap) {

    if(!tableName|| !fieldMap){
        console.warn("参数数据错误");
        return
    }

    var sqlString='',
        fieldInfo=[],
        fieldString=[];

    //检查字段数据类型
    switch (getType(fieldMap)){
        case 'Object':
            Object.keys(fieldMap).forEach(function (key) {
                fieldInfo.push({
                    field:key,
                    type:fieldMap[key]
                })
            });
            break;
        case 'Array':
            fieldMap.forEach(function (key) {
                fieldInfo.push({
                    field:key
                });
            });
            break;
        case 'String':
            fieldMap.split(',').forEach(function (key) {
                fieldInfo.push({
                    field:key
                });
            });
            break;
        default:
            console.warn("表字段数据错误");
            return;

    }

    //字段遍历处理
    fieldInfo.forEach(function (info) {
        fieldString.push(info.field+(info.type?' '+info.type:''));
    });

    //创建表的SQL语句
    sqlString='CREATE TABLE IF NOT EXISTS '+tableName+'('+fieldString.join(',')+')';

    //创建执行
    this.db.transaction(function(tx) {
        tx.executeSql(sqlString);
    },function (tx,e) {
        console.warn("创建数据表出现错误: " ,tx);
    });

    return this;
};

/**
 * 数据表选择
 * @param tableName
 * @returns {$dbTable}
 */
$DB.prototype.table=function (tableName) {
    return new $dbTable(this.db,tableName,this);
};

/**
 * 删除数据表
 * @param tableName
 * @param onRes
 * @returns {$DB}
 */
$DB.prototype.dropTable=function (tableName,onRes) {

    //删除表的SQL语句
    var sqlString='DROP TABLE IF EXISTS '+tableName;

    //sql语句处理
    this.db.transaction(function(tx) {
        tx.executeSql(sqlString,[], function (t, dataRows) {
            typeof onRes === "function" && onRes(dataRows,t)
        }, function (t, e) {
            typeof onRes === "function" && onRes(null,t,e)
        });
    },function (tx,e) {
        console.warn("删除数据表出现错误: " ,tx,e.message);
    });

    return this;
};

/**
 * 删除数据库
 * @param dbName
 * @param onRes
 */
$DB.prototype.dropDb=function (dbName,onRes) {

    return this;
};

/**
 * 自定义SQL语句执行
 * @param sql
 * @param pre
 * @param onRes
 * @returns {$DB}
 */
$DB.prototype.exec=function (sql,pre,onRes) {

    //检查参数
    if(arguments.length < 3){
        switch (getType(pre)){
            case 'Array':
                onRes=function () {};
                break;
            case 'Function':
                onRes=pre;
                pre=[];
                break;
        }
    }

    //sql语句处理
    this.db.transaction(function(tx) {
        tx.executeSql(sql,pre, function (t, dataRows) {
            typeof onRes === "function" && onRes(dataRows,t)
        }, function (t, e) {
            console.warn("自定义SQL语句出错!" ,tx,e.message);
            typeof onRes === "function" && onRes(null,t,e)
        });
    });

    return this;
};




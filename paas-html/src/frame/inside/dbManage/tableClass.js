/**
 * Created by xiyuan on 16-10-20.
 */

/**
 * 连接拼接数据
 * @param stroage
 * @param data
 */
function dataConcat(stroage, data) {
    switch (getType(data)) {
        case 'String':
            data.split(',').forEach(function (val) {
                stroage.push(val);
            });
            break;
        case 'Array':
            data.forEach(function (val) {
                stroage.push(val);
            });
            break;
        default:
    }
}

/**
 * where 条件处理
 * @param condition
 * @param preVal
 * @param relations
 * @returns {*}
 */
function whereHandle(condition, preVal, relations) {
    //检查有多少个预运算值
    var preMatch = condition.match(/\?/g),
        isPre = false;

    //检查是否存在预运算
    if (preMatch) {
        switch (getType(preVal)) {
            case 'Array':
                preVal = preVal;
                break;
            default:
                preVal = [preVal]

        }
        if (preMatch.length > preVal.length) {
            console.warn("where 语句的预运算值个数不对!");
            return null;
        }
        isPre=true;
        preVal = preVal.slice(0, preMatch.length);
    }

    relations=relations || String(preVal)||'and';

    relations=relations.toLocaleLowerCase() === 'or'? relations: 'and';

    return {
        isPre:isPre,
        preVal:preVal,
        relations:relations,
        condition:condition
    }
}

/**
 * 数据新增的处理方法
 * @param data
 * @param perHandle
 */
function addHandle(data, perHandle, tableName) {
    if (getType(data) === 'Object') {
        var preVal = [],
            sqlString,
            fieldKey = [],
            fieldVal = [];

        //组装新增的数据
        Object.keys(data).forEach(function (fieldName) {
            fieldKey.push(fieldName);
            fieldVal.push(data[fieldName]);
        });

        //预运算符号
        fieldVal.forEach(function () {
            preVal.push('?');
        });
        preVal = preVal.join(',');

        //sql语句拼接
        sqlString = 'INSERT INTO ' + tableName + '(' + fieldKey.join(',') + ') VALUES (' + preVal + ')';

        perHandle.push({
            sql: sqlString,
            preVal: fieldVal
        })
    }
}

/**
 * 数据库表
 * @param DB 数据库
 * @param tableName 数据库名称
 */
function $dbTable(DB, tableName,DBInstance) {
    //数据库
    this.$DB = DB;
    //数据库实例
    this.DBInstance=DBInstance;
    //数据库名称
    var dbName=this.dbName=DBInstance.dbName;
    //表名称
    this.$tableName = tableName;
    //数据初始化
    this.init();

    DB.transaction(function(tx) {
        tx.executeSql('select * from '+tableName+' limit 1',[], function () {}, function (t, e) {
            console.warn('数据库"'+dbName+'"中数据表"'+tableName+'"不存在! ');
        });
    });
}

/**
 * 初始化当前的查询数据
 */
$dbTable.prototype.init=function () {
    //预备数据
    this.prep = {
        //重复标识
        distinct:'',
        //字段
        Field: [],
        //包含
        In: [],
        //条件
        Where: [],
        //与查询值
        WherePreValue:[],
        //排序
        Order: 'asc',
        //排序字段
        OrderField:[],
        //数据限制
        Limit: ''
    }
};

/**
 * 除去查询中的重复数据
 */
$dbTable.prototype.distinct=function () {
    this.prep.distinct=' DISTINCT ';
    return this;
};

/**
 * 需要的字段
 * @param field
 * @returns {$dbTable}
 */
$dbTable.prototype.field = function (field) {
    dataConcat(this.prep.Field, field);
    return this;
};

/**
 * 操作条件
 * @param condition 条件
 * @param preVal 预运算值
 * @param relations 关系 [and | or ]
 * @returns {$dbTable}
 */
$dbTable.prototype.where = function (condition, preVal, relations) {
    var whereSql,
        whereInfo,
        prep=this.prep;

    //检查是否多条where条件
    switch( getType(condition)){
        case 'Array':
            whereSql='(';
            var preVals=[],
                wheres=[];
            condition.forEach(function (info) {
                //条件处理
                if(whereInfo=whereHandle.apply(this,info)){

                    //检查是否第一个条件
                    whereSql+=wheres.length?whereInfo.relations+' ':' ';

                    //检查是否存在预运算
                    whereInfo.isPre && (preVals=preVals.concat(whereInfo.preVal));

                    whereSql+=whereInfo.condition;

                    wheres.push(whereSql);
                }
            });

            whereSql+=')';

            //与查询数据存储
            preVals.length && (prep.WherePreValue=prep.WherePreValue.concat(preVals));

            //where语句存储
            prep.Where.push(whereSql);

            break;
        case 'String':
            //条件处理
            if(whereInfo=whereHandle.apply(this,arguments)){

                //检查是否第一个条件
                whereSql=prep.Where.length?whereInfo.relations+' ':' ';

                //检查是否存在预运算
                whereInfo.isPre && (prep.WherePreValue=prep.WherePreValue.concat(whereInfo.preVal));

                whereSql+=whereInfo.condition;

                prep.Where.push(whereSql);
            }

    }
    return this;
};

/**
 * 条数限制
 * @param start
 * @param end
 * @returns {$dbTable}
 */
$dbTable.prototype.limit = function (start, end) {
    if (arguments.length > 0) {
        if (arguments.length === 1) {
            this.prep.Limit = start;
        } else {
            this.prep.Limit = start + ',' + end;
        }
    }
    return this;
};

/**
 * 正序或降序
 * @param order
 * @returns {$dbTable}
 */
$dbTable.prototype.order = function (fieldName,order) {
    this.prep.OrderField=getType(fieldName) === 'Array'?fieldName:fieldName.split(',');
    order.toLocaleLowerCase() === 'desc' && (this.prep.Order = 'desc');
    return this;
};

/**
 * 数据新增
 * @param data
 * @param onRes
 */
$dbTable.prototype.add = function (data, onRes) {
    var tableName=this.$tableName,
        perHandle = [];
    switch (getType(data)) {
        case 'Object':
            addHandle(data, perHandle, tableName);
            break;
        case 'Array':
            data.forEach(function (val) {
                addHandle(val, perHandle, tableName);
            });
            break;
    }

    //数据新增入表中(原生写法)
    this.$DB.transaction(function (t) {
        perHandle.forEach(function (handleInfo) {
            t.executeSql(handleInfo.sql, handleInfo.preVal);
        });
    }, function (t, e) {
       typeof onRes === 'function' && onRes(null,t,e);
        console.warn("数据新增出现错误: ", t,e);
    },function (t) {
        typeof onRes === 'function' && onRes(true,t);
    });
    //数据初始化
    this.init();

    return this;
};

/**
 * 数据读取
 * @param onRes
 */
$dbTable.prototype.read = function (onRes) {
    var fieldStr,
        whereStr,
        limitStr,
        orderStr,
        prep=this.prep,
        tableName=this.$tableName,
        WherePreValue=prep.WherePreValue;

    //获取字段字符
    fieldStr=prep.Field.length ? prep.Field.join(','):'*';

    //获取条件字符
    whereStr=prep.Where.length ?'where '+prep.Where.join(' '):'';

    //限制条数的字符
    limitStr=prep.Limit?'limit '+prep.Limit:'';

    //数据排序
    orderStr=prep.OrderField.length?'order by '+prep.OrderField.join(' '+prep.Order+',')+' '+prep.Order:'';

    //sql语句拼接
    var sqlString='SELECT '+prep.distinct+fieldStr+' FROM '+tableName+' '+whereStr+' '+orderStr+' '+limitStr ;

    //sql语句执行
    this.$DB.readTransaction(function (t) {
        t.executeSql(sqlString, WherePreValue, function (t, dataRows) {
            var rows=dataRows.rows,
                i=~0;
            dataRows=[];

            while (++i<rows.length){
                dataRows.push(rows.item(i))
            }

            typeof onRes === "function" && onRes(dataRows,t)
        }, function (t, e) {
            typeof onRes === "function"  && onRes(null,t,e)
        });
    });

    //数据初始化
    this.init();

    return this;
};

/**
 * 获取数据总条数
 * @param field
 * @param onRes
 */
$dbTable.prototype.count = function (field,onRes) {

    var fieldStr,
        whereStr,
        limitStr,
        prep=this.prep,
        tableName=this.$tableName,
        WherePreValue=prep.WherePreValue,
        callback=typeof (onRes||field) === "function"?onRes||field:function () {};

    //获取字段字符
    fieldStr='COUNT('+(typeof field === 'string'?field:'*')+') as count';

    //获取条件字符
    whereStr=prep.Where.length ?' where '+prep.Where.join(' '):'';

    //限制条数的字符
    limitStr=prep.Limit?'limit '+prep.Limit:'';

    //sql语句拼接
    var sqlString='SELECT '+fieldStr+' FROM '+tableName+' '+whereStr+limitStr ;

    //sql语句执行
    this.$DB.readTransaction(function (t) {
        t.executeSql(sqlString, WherePreValue, function (t, dataRows) {
            callback(dataRows.rows[0]?dataRows.rows[0].count:0,t)
        }, function (t, e) {
            callback(null,t,e)
        });
    });

    //数据初始化
    this.init();

    return this;
};

/**
 * 数据更新
 * @param data
 * @param onRes
 */
$dbTable.prototype.update = function (data, onRes) {

    //检查数据格式
    if(getType(data) !== 'Object'){
        console.warn("需要更新的数据格式错误!");
        return;
    }

    var sqlString,
        updatePre=[],
        updateStr=[],
        prep=this.prep,
        tableName=this.$tableName,
        WherePreValue=prep.WherePreValue,
        //获取条件字符
        whereStr=prep.Where.length ?' where '+prep.Where.join(' '):'';

    //遍历需要更新的数据
    Object.keys(data).forEach(function (fieldName) {
        updatePre.push(data[fieldName]);
        updateStr.push(fieldName+'=? ');
    });

    //预运算数据对接
    WherePreValue=updatePre.concat(WherePreValue);

    //sql语句拼接
    sqlString='UPDATE '+tableName+' SET '+ updateStr.join(',')+' '+whereStr;

    //sql语句执行
    this.$DB.transaction(function (t) {
        t.executeSql(sqlString, WherePreValue, function (t, dataRows) {
            typeof onRes === "function" && onRes(dataRows,t)
        }, function (t, e) {
            typeof onRes === "function" && onRes(null,t,e)
        });
    });

    //数据初始化
    this.init();

    return this;

};

/**
 * 数据删除
 * @param onRes
 */
$dbTable.prototype.delete = function (onRes) {

    var sqlString,
        prep=this.prep,
        tableName=this.$tableName,
        WherePreValue=prep.WherePreValue,
        //获取条件字符
        whereStr=prep.Where.length ?' where '+prep.Where.join(' '):'';

    //sql语句拼接
    sqlString='DELETE FROM '+tableName+whereStr;

    //sql语句执行
    this.$DB.transaction(function (t) {
        t.executeSql(sqlString, WherePreValue, function (t, dataRows) {
            typeof onRes === "function" && onRes(dataRows,t)
        }, function (t, e) {
            typeof onRes === "function" && onRes(null,t,e)
        });
    });

    //数据初始化
    this.init();

    return this;
};

/**
 * 自定义SQL语句执行
 * @param sql
 * @param pre
 * @param onRes
 * @returns {$DB}
 */
$dbTable.prototype.exec=function () {
    this.DBInstance.exec.apply(this.DBInstance,arguments);
    return this;
};

/**
 * 清除数据表内容
 * @param onRes
 */
$dbTable.prototype.clean=function (onRes) {
    var tableName=this.$tableName;
    //sql语句执行
    this.$DB.transaction(function (t) {
        t.executeSql('DELETE FROM '+tableName , [], function (t, dataRows) {
            typeof onRes === "function" && onRes(dataRows,t)
        }, function (t, e) {
            typeof onRes === "function" && onRes(null,t,e)
        });
    });
};
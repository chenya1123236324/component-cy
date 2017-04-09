/**
 * Created by xiyuan on 16-12-7.
 */

window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction||{};
var dbVersion = 1;

//indexedDB ORM 任务处理器
function noSqlProcessor(noSqlInstance) {
    var taskInfo=noSqlInstance.taskQueue.taskStroage[0];
    taskInfo && noSqlTaskExec(taskInfo,noSqlInstance,function () {
        noSqlInstance.taskQueue.shift();
        noSqlProcessor(noSqlInstance);
    });
}

//任务执行器
function noSqlTaskExec(taskInfo,noSqlInstance,callback) {
    switch (taskInfo.type){
        case 'open':
            taskInfo.action(callback);
            break;
        case 'create':
        case 'table':
            taskInfo.action(callback,noSqlInstance.requestDB,noSqlInstance.transactionType);
            break;
        case 'dropTable':
        case 'exec':
            taskInfo.action(noSqlInstance.requestDB);
            break;
        case 'where':
            taskInfo.action(callback,noSqlInstance.objectStore);
            break;
        case 'read':
            taskInfo.action(noSqlInstance.objectStore,noSqlInstance.result);
            break;
        case 'add':
        case 'update':
        case 'delete':
            taskInfo.action(noSqlInstance.objectStore);
            break;

    }
}

//任务队列类
function noSqlTaskQueue(noSqlInstance) {
    this.taskStroage=[];
    this.noSqlInstance=noSqlInstance;
}

noSqlTaskQueue.prototype={
    push:function (taskInfo) {
        if(this.taskStroage.length ){
            this.taskStroage.push(taskInfo)
        }else{
            this.taskStroage.push(taskInfo);
            noSqlProcessor(this.noSqlInstance);
        }
    },
    shift:function () {
        return this.taskStroage.shift();
    }
};

//打开indexedDB
function noSql(dbName,version){
    //任务队列
    this.taskQueue=new noSqlTaskQueue(this);
    this.dbName=dbName;
    this.requestDB=null;
    this.objectStore=null;
    this.init();
    this.taskQueue.push({
        type:'open',
        action:function (callback) {
            var load=false;
            indexedDB.open(dbName, version||dbVersion).onupgradeneeded=function () {
                load=true;
                this.requestDB=event.target.result;
                typeof callback === "function" && callback(this.requestDB);
            }.bind(this);

            indexedDB.open(dbName, version||dbVersion).onsuccess = function (event) {
                if(load)return;
                this.requestDB=event.target.result;
                typeof callback === "function" && callback(this.requestDB);
            }.bind(this);

        }.bind(this)
    });
}

noSql.prototype.init=function () {
    this.result=null;
    this.transactionType=IDBTransaction.READ_WRITE || "readwrite";
};


//创建一个对象存储空间
noSql.prototype.create=function (tableName,fieldMap) {

    this.taskQueue.push({
        type:'create',
        action:function (callback,requestDB) {
            if(!tableName|| !fieldMap){
                console.warn("参数数据错误");
                return
            }

            if(!requestDB.objectStoreNames.contains(tableName)){
                var idKey,
                    keyPath,
                    indexInfo,
                    fieldInfo=[];

                //检查字段数据类型
                switch (getType(fieldMap)){
                    case 'Object':
                        Object.keys(fieldMap).forEach(function (key) {
                            fieldInfo.push({
                                field:key,
                                type:(fieldMap[key]||'').toLowerCase()
                            });
                            key === 'id' && (idKey=key);
                            fieldMap[key].indexOf('key') !== -1 && (keyPath=key)
                        });
                        break;
                    case 'Array':
                        fieldMap.forEach(function (key) {
                            fieldInfo.push({
                                field:key,
                                type:''
                            });
                            key === 'id' && (idKey=key);
                        });
                        break;
                    case 'String':
                        fieldMap.split(',').forEach(function (key) {
                            fieldInfo.push({
                                field:key,
                                type:''
                            });
                            key === 'id' && (idKey=key);
                        });
                        break;
                    default:
                        console.warn("表字段数据错误");
                        return;

                }

                // 创建一个对象存储空间来存储相关数据信息。
                // 我们将使用 keyPath 作为我们的 key path 因为它保证是唯一的。
                var objectStore = requestDB.createObjectStore(tableName, { keyPath: keyPath=keyPath||idKey|| fieldInfo[0].field});

                //字段遍历创建索引
                fieldInfo.forEach(function (info) {
                    if(indexInfo=info.type.indexOf('index') !== -1?(info.type.indexOf('unique')?{unique: true}:{unique: false}):null){
                        objectStore.createIndex(info.field, info.field, indexInfo);
                    }
                });

                this.objectStore=objectStore;
            }else{
                this.objectStore=requestDB.transaction([tableName],  this.transactionType|| IDBTransaction.READ_WRITE || "readwrite").objectStore(tableName);
            }

            typeof callback === "function" && callback();

        }.bind(this)
    });
    return this;
};

//数据表选择
noSql.prototype.table=function (tableName) {

    this.taskQueue.push({
        type:'table',
        action:function (callback,requestDB,actionType) {
            this.objectStore=requestDB.transaction([tableName],  actionType|| IDBTransaction.READ_WRITE || "readwrite").objectStore(tableName);
            typeof callback === "function" && callback();
        }.bind(this)
    });

    return this;
};

//数据表的删除
noSql.prototype.dropTable=function (tableName) {
    this.taskQueue.push({
        type:'dropTable',
        action:function (requestDB) {
            requestDB.deleteObjectStore(tableName);
        }
    });
};

//自定义执行
noSql.prototype.exec=function (execFn) {
    this.taskQueue.push({
        type:'exec',
        action:function (requestDB) {
            execFn(requestDB);
        }
    });
};






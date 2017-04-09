/**
 * Created by xiyuan on 16-12-8.
 */

//数据新增
noSql.prototype.add=function (data, onRes) {
    this.transactionType=IDBTransaction.READ_WRITE || "readwrite";

    this.taskQueue.push({
        type:'add',
        action:function (objectStore) {
            switch (getType(data)) {
                case 'Object':
                    objectStore.add(data);
                    break;
                case 'Array':
                    data.forEach(function (val) {
                        objectStore.add(val);
                    });
                    break;
            }

            this.init();

        }.bind(this)
    });

};

//数据删除
noSql.prototype.delete=function (onRes) {
    this.transactionType=IDBTransaction.READ_WRITE || "readwrite";

    this.taskQueue.push({
        type:'delete',
        action:function (objectStore) {
            this.result && objectStore.delete(this.result[objectStore.keyPath]);
            this.init();
        }.bind(this)
    });
};

//数据修改
noSql.prototype.update=function (newData,onRes) {
    this.transactionType=IDBTransaction.READ_WRITE || "readwrite";
    this.taskQueue.push({
        type:'update',
        action:function (objectStore) {
            objectStore.put(newData)
            this.init();
        }.bind(this)
    });
};

//数据读取
noSql.prototype.read=function (onRes) {
    this.transactionType=IDBTransaction.READ_ONLY||"readonly";
    this.taskQueue.push({
        type:'read',
        action:function (objectStore,result) {
            typeof onRes === 'function' && onRes(result);
            this.init();
        }.bind(this)
    });
};

//查询条件
noSql.prototype.where=function (fieldName,searchVal) {
    this.taskQueue.push({
        type:'where',
        action:function (callback,objectStore) {
            switch ((objectStore.keyPath === fieldName && 'keyPath')||(objectStore.indexNames.contains(fieldName) && 'index')){
                case 'keyPath':
                    objectStore.get(searchVal).onsuccess=function(event) {
                        this.result=event.target.result;
                        typeof callback === "function" && callback()
                    }.bind(this);
                    break;
                case 'index':
                    objectStore.index(fieldName).get(searchVal).onsuccess = function(event) {
                        this.result=event.target.result;
                        typeof callback === "function" && callback()
                    }.bind(this);
                    break;
                default:
            }

        }.bind(this)
    });
    return this;
};
/**
 * Created by xiyuan on 16-10-20.
 */

//@make : start

//本地websql管理
var $dbManage={

};

function getType(data) {
    var type={}.toString.call(data).match(/object\s+(\w*)/);
    return type?type[1]:null;
}

/*数据库类*/
Include('dbClass.js');

/*数据表*/
Include('tableClass.js');

/*indexedDB noSql*/
Include('indexedDB.js');
Include('indexedTable.js');


//@make : end
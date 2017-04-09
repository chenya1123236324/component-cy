/**
 * Created by xiyuan on 16-5-18.
 */
//@make : start

//监听异步数据
Include('$listen.js');

//检查是否是原型属性
function hasOwnPrototype(obj, name) {
    return !obj.hasOwnProperty(name) && (name in obj);
}

//@make : end
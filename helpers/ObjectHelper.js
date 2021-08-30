/**
 * Object助手类
 */
export default class ObjectHelper {
    /**
     * 获取对象的属性值
     * 可使用可选链操作符替代
     * @param {object} object 待处理的对象
     * @param {string} key 键名，可通过英文句号 . 指定多级字段
     * @param {*} defaultValue 找不到值时的返回值
     * @returns {undefined}
     */
    static getValue(object, key, defaultValue = undefined) {
        let items = key.split('.')
        let temp = object
        for(let name of items) {
            temp = temp[name]
            if(typeof temp !== 'object') {
                break
            }
        }
        return temp || defaultValue
    }

    /**
     * 遍历
     * @param {object} object 待遍历的对象
     * @param {function} callback 回调函数，每一次遍历到一个属性，都会回调该方法，方法拥有两个参数，分别是属性的键值、属性的键名
     */
    static forEach(object, callback) {
        for (let key in object) {
            object[key] = callback(object[key], key)
        }
        return object
    }

    /**
     * 过滤
     * @param {object} object 待过滤的对象
     * @param {function} callback 回调函数，每一次遍历到一个属性，都会回调该方法，方法拥有两个参数，分别是属性的键值、属性的键名，当方法返回 false 时将过滤该属性
     * @return {object} 返回一个过滤后的对象
     */
    static filter(object, callback) {
        let keys = Object.keys(object)
        for (let key of keys) {
            if( callback(object[key], key) === false ) {
                delete object[key]
            }
        }
        return object
    }
}
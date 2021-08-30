
export default class StorageHelper {
    /**
     * 保存一个数据
     * @param {string} name
     * @param {string|object} value
     */
    static set(name, value) {
        value = {
            format: typeof value,
            value,
        }
        window.localStorage.setItem(name, JSON.stringify(value))
    }

    /**
     * 根据名称取值
     * @param {string} name
     * @returns {string|object}
     */
    static get(name) {
        let value = window.localStorage.getItem(name)
        return JSON.parse(value).value
    }

    /**
     * 根据名称判断有没有该值
     * 注意，如果保存的值是null，也会返回 false
     * @param {string} name
     * @returns {boolean}
     */
    static has(name) {
        return window.localStorage.getItem(name) !== null
    }

    /**
     * 根据名称删除值
     * @param {string} name
     */
    static remove(name) {
        window.localStorage.removeItem(name)
    }

    /**
     * 清空整个本地存储
     */
    static clear() {
        window.localStorage.clear()
    }
}
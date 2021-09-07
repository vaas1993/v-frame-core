
export default class StorageHelper {
    /**
     * 保存一个数据
     * @param {string} name 键名
     * @param {string|object} value 需要保存的值
     * @param {int} expires 有效期，单位秒，小于等于0时代表不过期
     */
    static set(name, value, expires = 0) {
        value = {
            format: typeof value,
            value,
            timestamp: (new Date()).getTime(),
            expires: expires > 0 ? expires * 1000 : undefined,
        }
        window.localStorage.setItem(name, JSON.stringify(value))
    }

    /**
     * 根据名称取值，不存在值时返回 null
     * @param {string} name 键名
     * @returns {string|object|null}
     */
    static get(name) {
        let store = window.localStorage.getItem(name)

        if( !store ) {
            return null
        }

        store = JSON.parse(store)

        if( store.expires !== undefined ) {
            let currentTime = (new Date()).getTime()
            if( currentTime > store.timestamp + store.expires ) {
                this.remove(name)
                return null
            }
        }

        return store.value
    }

    /**
     * 根据名称判断有没有该值
     * 注意，如果保存的值是null，也会返回 false
     * @param {string} name 键名
     * @returns {boolean}
     */
    static has(name) {
        return this.get(name) === null
    }

    /**
     * 根据名称删除值
     * @param {string} name 键名
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
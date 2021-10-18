
export default class CookieHelper {
    /**
     * 保存一个数据
     * @param {string} name 键名
     * @param {string|object} value 需要保存的值
     * @param {int} expires 有效期，单位秒，小于等于0时代表不过期
     */
    static set(name, value, expires = 0) {
        this.remove(name)
        let date = new Date()
        date.setTime( date.getTime() + ( expires * 1000 ) )
        document.cookie = name + '=' + value + ';' + date.toUTCString()
    }

    /**
     * 根据名称取值，不存在值时返回 null
     * @param {string} name 键名
     * @returns {string|object|null}
     */
    static get(name) {
        let values = document.cookie.split(';')
        for (let str of values) {
            str = str.split('=')
            if( str[0] === name ) {
                return str[1]
            }
        }
        return null
    }

    /**
     * 根据名称判断有没有该值
     * 注意，如果保存的值是null，也会返回 false
     * @param {string} name 键名
     * @returns {boolean}
     */
    static has(name) {
        return this.get(name) !== null
    }

    /**
     * 根据名称删除值
     * @param {string} name 键名
     */
    static remove(name) {
        this.set(name, '')
    }

    /**
     * 清空全部Cookie
     */
    static clear() {
        let values = document.cookie.split(';')
        for (let str of values) {
            str = str.split('=')
            this.set(str[0], '')
        }
    }
}
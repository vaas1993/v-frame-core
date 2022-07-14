export default class EventHandler {
    /**
     * 监听中的事件列表
     * @type {object}
     */
    $events = {}

    /**
     * 添加事件监听器
     * @param {string} eventName 事件名称
     * @param {function} callback 事件处理函数
     * @param {boolean} once 是否只响应一次
     */
    $on(eventName, callback, once = false) {
        this.$events[eventName] = this.$events[eventName] || []
        this.$events[eventName].push({
            once,
            callback
        })
    }

    /**
     * 移除某个事件
     * @param {string} eventName 事件名称
     * @param {function} callback 事件处理函数
     */
    $off(eventName, callback) {
        let list = (this.$events[eventName] || []).map(item => item.callback)
        let index = list.indexOf(callback)
        if( index !== -1 ) {
            this.$events[eventName].splice(index, 1)
        }
    }

    /**
     * 触发事件
     * @param {string} eventName 事件名称
     * @param {*} params 事件参数
     */
    $emit(eventName, params) {
        (this.$events[eventName] || []).map(item => {
            item.callback(params)
            if( item.once ) {
                this.$off(eventName, item.callback)
            }
        })
    }

    /**
     * 清空某个事件
     * @param {string} eventName 事件名称
     */
    $clear(eventName) {
        if( this.$events[eventName] ) {
            delete this.$events[eventName]
        }
    }
}
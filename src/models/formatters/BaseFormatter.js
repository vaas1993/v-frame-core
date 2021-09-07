/**
 * 数据格式化基类
 */
export default class BaseFormatter {
    constructor(value, model, options, field) {
        this.value = value
        this.options = options
        this.model = model
        this.field = field
    }

    getValue() {
        return this.value
    }
}
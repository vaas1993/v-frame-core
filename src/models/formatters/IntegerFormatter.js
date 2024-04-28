import BaseFormatter from "./BaseFormatter"

/**
 * 整型处理类
 * 这个类会自动将传入的数据格式化成整型，当转为整型后值为 NaN 时，返回 null
 * 通过 options.before 指定一个字符串前缀
 * 通过 options.after 指定一个字符串后缀
 */
export default class IntegerFormatter extends BaseFormatter {
    getValue() {
        let value = parseInt(this.value)
        if( isNaN(value) ) {
            return null
        }
        if( this.options.before ) {
            value = this.options.before + value.toString()
        }
        if( this.options.after ) {
            value = value.toString() + this.options.after
        }
        return value
    }
}
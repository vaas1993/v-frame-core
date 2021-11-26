import BaseFormatter from "./BaseFormatter"

/**
 * 浮点型处理类
 * 这个类会自动将传入的数据格式化成浮点型，当转为浮点型后值为 NaN 时，返回 null
 * 通过 options.toFixed 指定需要保留的小数位，指定后仍然返回浮点型
 * 通过 options.before 指定一个字符串前缀
 * 通过 options.after 指定一个字符串后缀
 */
export default class FloatFormatter extends BaseFormatter {
    getValue() {
        let value = parseFloat(this.value)
        if( isNaN(value) ) {
            return null
        }
        if( typeof this.options.toFixed === 'number' ) {
            value = parseFloat( value.toFixed(this.options.toFixed) )
        }
        if( this.options.after ) {
            value = value.toString() + this.options.after
        }
        if( this.options.before ) {
            value = this.options.before + value.toString()
        }
        return value
    }
}
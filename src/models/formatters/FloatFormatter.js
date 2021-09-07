import BaseFormatter from "./BaseFormatter"

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
            value += this.options.after
        }
        if( this.options.before ) {
            value = this.options.before + value
        }
        return value
    }
}
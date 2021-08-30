import BaseFormatter from "./BaseFormatter";

export default class IntegerFormatter extends BaseFormatter {
    getValue() {
        let value = parseInt(this.value)
        if( isNaN(value) ) {
            return null
        }
        if( this.options.before ) {
            value += this.options.before
        }
        if( this.options.after ) {
            value = value + this.options.after
        }
        return value
    }
}
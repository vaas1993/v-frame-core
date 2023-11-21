import ObjectHelper from "../../helpers/ObjectHelper"
import EventHandler from "../../helpers/EventHandler"
import VFrame from "../../VFrame"

export default class BaseModel extends EventHandler{
    /**
     * 模型实例的唯一ID
     * 注意，每一次实例化都会生成一次唯一值，每次都是不同的值，尽管是同一组数据重复实例化也会得到两个不同的唯一ID
     * @type {string}
     */
    $unique = undefined

    /**
     * VFrame实例
     * @type {VFrame}
     */
    $vf = VFrame.getInstance()

    /**
     * 校验规则配置
     * @type {object}
     */
    $rules = {}

    /**
     * 错误信息
     * @type {array<object>}
     */
    $errors = []

    /**
     * 主键属性
     * @type {string}
     */
    $primaryKey = 'id'

    /**
     * 属性格式化配置
     * @type {object}
     */
    $formatConfig = {}

    /**
     * 属性映射的标签名
     * @type {object}
     */
    $fieldLabels = {}

    /**
     * 后缀属性指定的后缀名
     * 在 getValue 中，获取一个属性的展示值时，如果没有其它配置，会自动获取 属性名 + 后缀 组成的新属性的值
     * @type {string}
     */
    $fieldSuffix = '_view'

    constructor(sources = {}) {
        super()
        this.$unique = (((1+Math.random())*0x1000000)|0).toString(16)

        if( typeof sources === 'object' ) {
            this.setSources(sources)
        }
    }

    /**
     * 获取主键属性的值
     * @returns {string}
     */
    getPrimary() {
        return this[this.$primaryKey]
    }

    /**
     * 设置主键属性的值
     * @param {string} value
     */
    setPrimary(value) {
        this[this.$primaryKey] = value
    }

    /**
     * 获取指定属性是否必填
     * 需要在 rules 中配置属性必填
     * @param {string} field
     * @returns {boolean}
     */
    getIsRequired(field) {
        for (let rule of this.$rules[field] || []) {
            if (rule.required === true) {
                return true
            }
        }
        return false
    }

    /**
     * 获取当前实例是否存在错误信息
     * @returns {boolean}
     */
    getHasErrors() {
        return this.$errors.length !== 0
    }

    /**
     * 清空当前实例的错误信息
     */
    clearErrors() {
        this.$errors = []
    }

    /**
     * 为指定属性添加一个错误信息
     * @param {string} field
     * @param {string} message
     */
    addError(field, message) {
        this.$errors.push({
            field,
            message
        })
    }

    /**
     * 批量添加错误信息
     * @param {array<{field: string, message: string}>} errors
     */
    addErrors(errors) {
        for (let item of errors) {
            this.addError(item.field, item.message)
        }
    }

    /**
     * 获取第一条错误信息
     * @param {string} field
     * @returns {null|string}
     */
    shiftErrorMessage(field = undefined) {
        for (let error of this.$errors) {
            if (field === undefined || error.field === field) {
                return error.message
            }
        }
        return null
    }

    /**
     * shiftErrorMessage的别名
     * @param {string} field
     * @returns {string|null}
     */
    getOneErrorMessage(field = undefined) {
        return this.shiftErrorMessage(field)
    }

    /**
     * 传入一个属性名，以一个数组的形式返回其所有的错误信息
     * @param {string} field
     * @returns {array<string>}
     */
    getErrors(field) {
        return this.$errors.map(error => {
            return error.field === field ? error.message : null
        }).filter(v=>!!v)
    }

    /**
     * 获取指定属性的标签
     * 需要在 $fieldLabels 配置，否则返回属性名本身
     * @param {string} field
     * @returns {string}
     */
    getLabel(field) {
        if( this.$fieldLabels[field] ) {
            return this.$fieldLabels[field]
        }
        return field.split('_')
            .filter(v=>!!v)
            .map(word => {
                return word.substring(0, 1).toUpperCase() + word.substring(1)
            })
            .join(' ')
    }

    /**
     * 获取指定属性的展示值
     * 该方法支持将原始值格式化成展示值，这些格式化的机制包括：
     * 1. 如果$formatConfig 配置了 formatter，则实例化配置好的格式化处理类，并返回处理类格式化后的值
     * 2. $formatConfig 配置了 value 为一个 object 的键值对，该函数会将原始作为键，并返回对应的值作为展示值，如果找不到则则返回原始的值
     * 3. $formatConfig 配置了 value 为一个 function，该函数会自动调用该函数，并将返回值作为展示值
     * 4. 如果同一个模型实例，存在一个 字段名 等于 当前获取的字段名 + this.$fieldSuffix 组成的字段，则返回该后缀字段的值作为展示值
     * 以上几个机制同时存在时只会触发一个，它们的优先级为： formatter > value.function = value.object > 后缀字段
     * @param {string} field 属性名
     * @param {*} source 指定一个特定的值进行格式化，该值指定后，返回的展示值会使用这个值作为原始值进行处理，但不会修改实例对应属性的值
     * @returns {*}
     */
    getValue(field, source = undefined) {
        let format = this.$formatConfig[field] || {}
        source = source === undefined ? this[field] : source

        // 助手翻译
        if (format['formatter']) {
            let formatter = new format['formatter']['class'](source, this, format['formatter'].options || {}, field)
            return formatter.getValue()
        }

        // 字典翻译
        if (typeof format.value === 'object') {
            return format.value[source] || source
        }

        // 函数翻译
        if (typeof format.value === 'function') {
            return format.value({
                model: this,
                field,
                source,
            })
        }
        // 后缀翻译
        if (this[field + this.$fieldSuffix]) {
            return this[field + this.$fieldSuffix]
        }

        // 如果以上机制都没有匹配到，则直接返回原始值
        return source
    }

    /**
     * 传入一个字符串，返回该字符串是不是当前实例的属性名
     * 判断逻辑：
     * 1. 不是模型自带的属性，比如 $primaryKey，$errors 这些
     * 2. 当前实例存在该属性 或 在 $formatConfig 中配置了该属性 或 在 $fieldLabels 中配置了该属性
     * @param {string} field
     * @returns {boolean}
     */
    getIsField(field) {
        return field.substring(0, 1) !== '$' && (
            Object.prototype.hasOwnProperty.call(this, field)
            || this.$formatConfig[field]
            || this.$fieldLabels[field]
        ) && (field.indexOf(this.$fieldSuffix) === -1 || this.getIsField(field.replace(this.$fieldSuffix, '')))
    }

    /**
     * 返回当前实例所有的属性名列表
     * @returns {array<string>}
     */
    getFields() {
        let result = []
        for (let field of Object.keys(this)) {
            if (this.getIsField(field)) {
                result.push(field)
            }
        }
        return result
    }

    /**
     * 传入一个属性名列表，返回属性对应的展示值
     * 不传属性名列表时，将返回所有属性对应的展示值
     * 使用该方法时注意与 getSources 方法的区别
     * @param {array<string>} fields
     * @returns {object}
     */
    getValues(fields = []) {
        let values = {}
        fields = fields.length ? fields : this.getFields()
        for (let field of fields) {
            if (this.getIsField(field)) {
                values[field] = this.getValue(field)
            }
        }
        return values
    }

    /**
     * 获取模型的属性值
     * @param {string} field 对于属性是一个对象的，支持使用 . 号分隔符进行多级获取
     * @returns {*}
     */
    getSource(field) {
        return ObjectHelper.getValue(this, field)
    }

    /**
     * 传入一个属性名列表，返回属性对应的原始值
     * 不传属性名列表时，将返回所有属性对应的原始值
     * 使用该方法时注意与 getValues 方法的区别
     * @param {array<string>} fields
     * @returns {object}
     */
    getSources(fields = []) {
        let values = {}
        fields = fields.length ? fields : this.getFields()
        for (let field of fields) {
            if (this.getIsField(field)) {
                values[field] = this.getSource(field)
            }
        }
        return values
    }

    /**
     * 批量设置属性对应的原始值
     * @param {object} sources
     */
    setSources(sources) {
        for (let field in sources) {
            this.setSource(field, sources[field])
        }
    }

    /**
     * 设置属性对应的原始值
     * @param {string} field
     * @param {*} value
     */
    setSource(field, value) {
        this[field] = value
    }

    /**
     * 传入用于构建多个模型实例的属性列表，返回当前模型实例列表
     * @static
     * @param {array<object>} list
     * @returns {*}
     */
    static instanceList(list) {
        return list.map(data => {
            let model = new this()
            model.setSources(data)
            return model
        })
    }

    /**
     * 传入一个类，将当前实例的数据通过 setSources 转移到另一个类实例中
     * @param {function} ModelClass
     * @returns {BaseModel}
     */
    getInstanceTo(ModelClass) {
        let model = new ModelClass()
        model.setSources(ObjectHelper.copy(this.getSources()))
        return model
    }
}
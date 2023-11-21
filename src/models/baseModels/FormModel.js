import ApiModel from "./ApiModel"

export default class FormModel extends ApiModel {
    /**
     * 获取一个用于渲染表单的配置
     * 对于不同的页面实现，可以有不同的格式
     * @return {object}
     */
    getFormConfig() {
        return {}
    }

    /**
     * 获取一个用于渲染表单操作按钮的配置
     * 按钮可以配置一个 type 字段，最终点击这个按钮的时候会自动调用模型的 onForm + Type 的方法，比如 onFormCancel() 代表了 type = cancel
     * @returns {object[]}
     */
    getFormActionList() {
        return [
            {
                name: '取消',
                type: 'cancel',
                submit: false,
                options: {
                    class: 'float-left',
                    type: 'info',
                    plain: ''
                }
            },
            {
                name: '确认',
                type: 'submit',
                submit: true,
                options: {
                    class: 'float-right',
                    type: 'primary'
                }
            },
        ]
    }

    /**
     * 表单取消按钮点击事件
     * 默认处理的是关闭模态框逻辑，有其他逻辑可在子类重写该方法
     * @param {function} submitHandle 该方法用于将表单组件的数据同步到当前实例中，若在按钮中已经配置了 submit: true 则将自动完成这个步骤
     */
    onFormCancel(submitHandle) {
        this.$vf.hideModal()
    }

    /**
     * 表单提交按钮点击事件
     * @param {function} submitHandle 该方法用于将表单组件的数据同步到当前实例中，若在按钮中已经配置了 submit: true 则将自动完成这个步骤
     * @returns {Promise<boolean>}
     */
    onFormSubmit(submitHandle) {
        return this.action()
    }

    /**
     * 获取表单配置中的字段列表
     * @returns {array<string>}
     */
    getFormFields() {
        return Object.keys(this.getFormConfig())
    }

    /**
     * 判断属性的值是否为空
     * 空数组、无状态空对象、空字符串、null和undefined都视为空
     * @param {string} field
     * @param {boolean} fromFormatConfig 判断是否为空时，是否包括 $formatConfig 配置里的值
     * @returns {boolean}
     */
    getIsEmpty(field, fromFormatConfig = true) {
        let value = this.getSource(field)
        if( this.$formatConfig[field] === undefined || fromFormatConfig === false ) {
            if (Array.isArray(value)) {
                return value.length === 0
            }
            if (typeof value === 'object' && value) {
                return Object.keys(value).length === 0
            }
        } else {
            value = this.getValue(field)
        }

        return ['', null, undefined].indexOf(value) !== -1
    }

    /**
     * 将指定属性的值设置为空
     * 当属性的值为数组时，会设置为空数组
     * 当属性的值为对象时，会设置为空对象
     * 其它情况下设置为null
     * @param {string} field
     */
    setEmpty(field) {
        let value = this[field]
        if (Array.isArray(value)) {
            this[field] = []
        }
        if (typeof value === 'object') {
            this[field] = {}
        }
        this[field] = null
        if( this.$fieldSuffix && this.getIsField(field + this.$fieldSuffix) ) {
            this[field + this.$fieldSuffix] = this[field]
        }
    }
}
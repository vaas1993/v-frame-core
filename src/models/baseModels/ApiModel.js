import BaseModel from "./BaseModel"
import ObjectHelper from "../../helpers/ObjectHelper"
import Schema from "async-validator"
import VFrame from "../../VFrame"

export default class ApiModel extends BaseModel {
    /**
     * @type {ApiResponse}
     */
    response

    /**
     * 详情信息对应的接口名
     * 需要在 /config/apiConfigs 中配置
     * @type {string}
     */
    static DetailApi = undefined

    /**
     * 获取明细信息操作
     * 当获取成功时，将使用接口数据为当前实例对应属性赋值
     * @param {object} params 请求参数
     * @returns {boolean}
     */
    async detail(params = {}) {
        if( this.getPrimary() ) {
            params[this.primaryKey] = this.getPrimary()
        }
        this.response = await VFrame.getInstance().get('api').getInstance()
            .setApiName(this.constructor.DetailApi)
            .setGetParams(params)
            .get()
        if (this.response.getIsSuccess()) {
            this.setSources(this.response.getSources())
        }
        return this.response.getIsSuccess()
    }

    /**
     * 列表信息对应的接口名
     * 需要在 /config/apiConfigs 中配置
     * @static
     * @type {string}
     */
    static ListApi = undefined

    /**
     * 获取list接口需要用的URL参数
     * @returns {object}
     */
    getListQueryParams() {
        return this.getSources()
    }

    /**
     * 传入参数，根据参数获取列表信息
     * 当获取成功时，将使用接口数据实例化一个模型列表，可使用 response.getModels() 获取
     * @static
     * @returns {Promise<boolean>}
     */
    async list(params = {}, model) {
        params = Object.assign(params, this.getListQueryParams())
        this.response = await VFrame.getInstance().get('api').getInstance()
            .setGetParams(params)
            .setApiName(this.constructor.ListApi)
            .get()

        if (this.response.getIsSuccess()) {
            this.response.queryParams = params
            this.response.models = (model || this.constructor).instanceList(this.response.getItems() || [])
        }
        return this.response.getIsSuccess()
    }

    /**
     * 根据一个数据列表，实例化一个模型列表
     * @param {array<object>} list
     * @returns {array}
     */
    static instanceList(list) {
        return list.map(data => {
            let model = new this()
            model.setSources(data)
            return model
        })
    }

    /**
     * 指定操作对应的接口名
     * 需要在 /configs/apiConfigs 中配置
     * @type {string}
     */
    static ActionApi = undefined

    /**
     * 获取action接口需要使用的参数
     * @returns {object}
     */
    getActionRequestParams() {
        let formConfig = this.getFormConfig()
        let result = {}
        ObjectHelper.forEach(formConfig, (value, key) => {
            result[key] = this[key] === undefined ? null : this[key]
        })
        return result
    }

    /**
     * 获取action接口需要使用的URL参数
     * @returns {object}
     */
    getActionQueryParams() {
        let params = {}
        params[this.primaryKey] = this.getPrimary()
        return params
    }

    /**
     * 校验属性
     * 根据需要配置好的 rules，该方法将根据 rules 的返回值进行校验
     * 校验通过时返回 true，不通过时返回 false，并通过 this.errors 暴露错误信息
     * @param {boolean} isClearErrors 执行校验前是否清空错误信息
     * @param {array} fields 指定需要校验的属性，不指定时将校验所有属性
     * @returns {boolean}
     */
    async validate(fields = [], isClearErrors = true) {
        isClearErrors ? this.clearErrors() : ''
        Schema.warning = () => {
        }
        let rules = this.rules
        // 根据fields，过滤掉不需要校验的字段
        if( fields.length !== 0 ) {
            for (let field in rules) {
                if( fields.indexOf(field) === -1 ) {
                    delete rules[field]
                }
            }
        }

        let validator = new Schema(rules)
        let messages = {
            default: '验证错误 %s',
            required: '%s 不能为空',
            enum: '%s 取值范围必须是 %s',
            whitespace: '%s 不能为空或空格',
            date: {
                format: '%s 格式是错误的',
                parse: '%s 格式是错误的',
                invalid: '%s 格式是错误的'
            },
            types: {
                string: '%s 必须是文本格式',
                method: '%s 必须是函数格式',
                array: '%s 必须是数组',
                object: '%s 必须是对象',
                number: '%s 必须是数字',
                date: '%s 必须是日期',
                boolean: '%s 必须是逻辑值',
                integer: '%s 必须是整数',
                float: '%s 必须是浮点数',
                regexp: '%s 必须是正确的正则表达式',
                email: '%s 必须是正确的邮箱格式',
                url: '%s 必须是正确的链接',
                hex: '%s 必须是正确的哈希'
            },
            string: {
                len: '%s 长度必须是 %s',
                min: '%s 长度不可小于 %s',
                max: '%s 长度不可大于 %s',
                range: '%s 长度必须在 %s 和 %s 之间'
            },
            number: {
                len: '%s 必须等于 %s',
                min: '%s 不可小于 %s',
                max: '%s 不可大于 %s',
                range: '%s 必须在 %s 和 %s之间'
            },
            array: {
                len: '%s 长度必须是 %s',
                min: '%s 长度不可小于 %s',
                max: '%s 长度不可大于 %s',
                range: '%s 长度必须在 %s 和 %s之间'
            },
            pattern: {
                mismatch: '%s 格式是错误的'
            },
            clone: function clone() {
                let cloned = JSON.parse(JSON.stringify(this));
                cloned.clone = this.clone;
                return cloned;
            }
        }
        validator.messages(messages)
        try {
            await validator.validate(this.getSources(fields))
            return true
        } catch ({errors}) {
            (errors || []).map(({message, field}) => {
                this.addError(field, message.replace(field, this.getLabel(field)))
            })
            return false
        }
    }


    /**
     * 执行自定义远程操作的方法
     * 模型只封装了 删除、详情 和 列表 三个远程操作，这肯定是不够的
     * 现在可以通过创建一个特定的处理类，并继承对应的模型类，然后通过配置这个值就可以用来执行各种自定义的操作了
     * 通过重写 getActionRequest 方法来返回执行该操作需要的 post 数据
     * 使用方法和 删除、详情 和 列表 接口的方式相同
     * 当调用不成功并且ApiResponse可以解析出 field 时，会自动将错误信息通过 addError 写入当前模型
     * @param {boolean} runValidator 调用接口前是否先调用数据校验，当校验不通过时该方法将返回 null
     * @param {boolean} isClearErrors 是否需要在调用数据校验前，清空错误信息
     * @param {string} method 请求方式，可以是 post 和 raw，默认是raw
     * @returns {boolean}
     */
    async action(runValidator = true, isClearErrors = true, method = 'raw') {
        if( isClearErrors ) {
            this.clearErrors()
        }
        if( runValidator && !await this.validate([], false) ) {
            return false
        }

        if( !this.beforeAction() ) {
            return false
        }

        this.response = await VFrame.getInstance().get('api').getInstance()
            .setGetParams(this.getActionQueryParams())
            .setPostParams(this.getActionRequestParams())
            .setApiName(this.constructor.ActionApi)[method.toLowerCase()]()
        if (this.response.getIsSuccess()) {
            this.setSources(this.response.getSources())
        } else {
            if( this.response.getField() ) {
                this.addError(this.response.getField(), this.response.getMessage())
            }
        }

        this.afterAction(this.response.getIsSuccess())
        return this.response.getIsSuccess()
    }

    /**
     * 执行 action 之前的钩子
     * 返回 false 时将不执行 action 的逻辑
     * @returns {boolean}
     */
    beforeAction() {
        return true
    }

    /**
     * 执行 action 之后的钩子
     * @param {boolean} isSuccess 操作是否成功
     */
    afterAction(isSuccess) {

    }
}
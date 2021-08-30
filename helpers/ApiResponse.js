/**
 * 接口格式化后的数据类
 */
import VFrame from "../VFrame";

export default class ApiResponse {
    /**
     * 成功的接口分类
     * @type {string}
     */
    static SUCCESS_TYPE = 'success'

    /**
     * 失败时的接口分类
     * @type {string}
     */
    static FAIL_TYPE = 'fail'

    /**
     * 未知的接口分类
     * @type {string}
     */
    static UNKNOWN = 'unknown'

    /**
     * 通过接口规则解析的接口类型
     * 接口类型用来判断 成功、失败 的大分类
     * vf会根据不同的类型来做不同的响应
     * @type {string}
     */
    type

    /**
     * 原始的返回报文
     * @type {object}
     */
    response

    /**
     * 通过接口规则解析的模型列表
     * 对于列表接口，正确配置了规则后可通过该属性直接获取实例化后的模型列表
     * @type {array<AppModel>}
     */
    models = []

    /**
     * 通过接口规则解析的数据列表
     * 对于列表接口，正确配置了规则后可通过该属性直接获取数据列表
     * @type {array<object>}
     */
    items = []

    /**
     * 通过接口规则解析的接口返回说明信息
     * 正确配置规则后，可通过该属性直接获取接口的返回文本内容
     * @type {string}
     */
    message

    /**
     * 通过接口规则解析的属性名
     * 正确配置规则后，可通过该属性获取当前接口针对的是那个属性
     * 比如一个 update 操作，触发了一个不能为空的错误信息，通过 message 返回用于显示的文本，通过 field 返回对应的模型属性名
     * @type {string}
     */
    field

    /**
     * 通过接口规则解析的明细数据
     * 正确配置规则后，可通过该属性获取当前接口返回的详细信息
     * 主要是在调用详情接口使用，vf会自动将解析到的这个字段的值赋值给当前模型
     * @type {object}
     */
    sources = {}

    /**
     * 列表元数据
     * @type {{}}
     */
    listMeta = {}

    constructor(type, data = {}, response = {}) {
        this.type = type
        this.response = response
        for(let name in data) {
            this[name] = data[name]
        }
    }

    getField() {
        return this.field
    }

    getType() {
        return this.type
    }

    getItems() {
        return this.items
    }

    getIsSuccess() {
        return ApiResponse.SUCCESS_TYPE === this.type
    }

    getMessage() {
        return this.message || this.response.errMsg
    }

    getSources() {
        return this.sources
    }

    getModels() {
        return this.models
    }

    getListMeta() {
        return this.listMeta
    }
}
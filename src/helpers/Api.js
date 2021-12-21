import ApiResponse from "./ApiResponse"
import ObjectHelper from "./ObjectHelper"
import VFrame from "../VFrame"

/**
 * 接口调用
 */
export default class Api {
    /**
     * 接口名称
     * 需要在 apiList 中配置
     * @type {string}
     */
    apiName = ''

    /**
     * 请求头信息
     * @type {object}
     */
    headers = {}

    /**
     * POST 数据体
     * @type {object}
     */
    postParams = {}

    /**
     * 请求链接参数
     * @type {object}
     */
    getParams = {}

    /**
     * 配置信息
     * @type {object}
     */
    apiList = {}

    /**
     * 接口过滤器配置
     * @type {object}
     */
    apiFilter = {}

    /**
     * 接口驱动
     * @type {object|function}
     */
    driver = undefined

    constructor() {
        this.initConfigs()
    }

    /**
     * 初始化配置
     */
    initConfigs() {
        let vf = VFrame.getInstance()
        let mainConfig = vf.mainConfig

        if( mainConfig.api === undefined ) {
            console.error('请在配置文件中设置 api 字段')
            return
        }

        let apiConfig = mainConfig.api

        this.apiList = apiConfig.list
        this.apiFilter = apiConfig.filter
        this.driver = apiConfig.driver

        if( typeof apiConfig.defaultHeaders === 'function' ) {
            this.headers = Object.assign(this.headers, apiConfig.defaultHeaders(vf))
        }
    }

    /**
     * 实例化，替代 new Api()以实现简洁的链式写法
     * @static
     * @returns {Api}
     */
    static getInstance() {
        return new this()
    }

    /**
     * 设置接口名称
     * 需要在 apiList 中配置
     * 支持链式写法，比如 user.login 代表登录接口
     * @param {string} apiName
     * @return {Api}
     */
    setApiName(apiName) {
        this.apiName = apiName
        return this
    }

    /**
     * 设置请求头信息
     * 注意，该操作会覆盖现有的请求头
     * @param {object} headers
     * @return {Api}
     */
    setHeaders(headers) {
        this.headers = headers
        return this
    }

    /**
     * 单独追加一个请求头
     * @param {string} name 请求头字段名
     * @param {string|number} value 请求头字段值
     * @return {Api}
     */
    setHeader(name, value) {
        this.headers[name] = value
        return this
    }

    /**
     * 设置POST请求参数
     * @param {object} postParams
     */
    setPostParams(postParams) {
        this.postParams = postParams
        return this
    }

    /**
     * 设置GET请求参数
     * @param {object} getParams
     */
    setGetParams(getParams) {
        this.getParams = {}
        ObjectHelper.forEach(getParams, (value, key) => {
            if (value !== undefined) {
                this.getParams[key] = value
            }
        })
        return this
    }

    /**
     * 获取请求接口配置信息
     * @returns {object}
     */
    getApiList() {
        if (!this.apiName) {
            let error = new Error()
            error.message = '请先调用 setApiName 方法设置接口名'
            error.name = '未设置接口名'
            throw error
        }
        let config = ObjectHelper.getValue(this.apiList, this.apiName)
        if (!config) {
            let error = new Error()
            error.message = '接口名称不存在，请确认 ' + this.apiName + ' 是否在 apiList 中配置'
            error.name = '找不到对应的接口'
            throw error
        }
        return config
    }

    /**
     * 格式化返回信息
     * @param {object} config
     * @param {object} response
     */
    formatResponse(config, response) {
        // 如果接口配置没有指定 filter 规则，则使用全局默认
        let filters = config.filter || this.apiFilter || {}
        let result = undefined

        for ( let item of filters ) {
            if( item.validate(response) ) {
                result = new ApiResponse(item.type, item.data(response), response)
                break;
            }
        }

        return result || new ApiResponse(ApiResponse.UNKNOWN, {}, response)
    }

    /**
     * 发起 get 请求
     * @returns {ApiResponse}
     */
    get() {
        return this.send('GET')
    }

    /**
     * 发起 post 请求
     * @returns {ApiResponse}
     */
    post() {
        this.headers = Object.assign({
            'Content-Type': 'application/x-www-form-urlencoded'
        }, this.headers)
        return this.send('POST')
    }

    /**
     * 发起带有 application/json 请求头的 post请求
     * @returns {ApiResponse}
     */
    raw() {
        this.headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.headers)
        return this.send('POST')
    }

    /**
     * 获取请求头
     * @returns {Object}
     */
    getHeaders() {
        return this.headers
    }

    /**
     * 执行请求发起的操作
     * @param {string} method 方法名
     * @returns {Promise<ApiResponse>|ApiResponse}
     */
    async send(method) {
        let config = this.getApiList()
        let response = {}
        try {
            this.onBeforeSend({
                getParams: this.getParams,
                postParams: this.postParams,
                headers: this.getHeaders()
            })
            response = await this.driver({
                url: config.url,
                method,
                headers: this.getHeaders(),
                params: this.getParams,
                data: this.postParams,
            })
        } catch(e) {
            response = {
                status: e.message.split('code ').pop() || 500,
                statusText: e.name,
                errMsg: e.message,
                headers: e.headers || {},
                data: {}
            }
        }
        response = this.formatResponse(config, response)
        this.onAfterSend(response)
        return response
    }

    onBeforeSend(request) {
        let apiConfig = VFrame.getInstance().mainConfig.api
        if(apiConfig.onBeforeSend === 'function') {
            apiConfig.onBeforeSend(this, request)
        }
    }
    onAfterSend(response) {
        let apiConfig = VFrame.getInstance().mainConfig.api
        if(apiConfig.onAfterSend === 'function') {
            apiConfig.onAfterSend(this, response)
        }
    }
}
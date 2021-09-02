import VFrame from "../VFrame"
import ObjectHelper from "../helpers/ObjectHelper"

export default class AppList {
    /**
     * 搜索模型实例
     * 这个模型需要配置好搜索表单和ListApi
     * 通过 list 方法读取到数据后将实例化成模型列表并赋值给 modelList
     * @param {AppModel}
     */
    searchModel

    /**
     * 展示模型实例
     * 用于列表中展示时获取 label 或者其他格式化配置
     * 不配置时会使用 searchModel 覆盖
     */
    showModel

    /**
     * 用于展示的表单模型实例列表
     * @type {array<AppModel>}
     */
    modelList = []

    /**
     * 页面管理
     * 用来存储目前的页码、总数 和 单页项数
     * @type {{total: number, pagination: number, size: number}}
     */
    pager = {
        pagination: 1,
        size: 20,
        total: 0
    }

    /**
     * 是否展示搜索框
     * @type {boolean}
     */
    isSearchShow = true

    /**
     * 是否展示导出按钮
     * @type {boolean}
     */
    isExportShow = true

    /**
     * 是否展示分页器
     * @type {boolean}
     */
    isPagerShow = true

    /**
     * 操作按钮列表
     * @type {[{text: string, type: string}]}
     */
    actionList = [
        {
            text: '新建',
            type: 'create'
        },
    ]

    /**
     * 列表展示字段的配置
     * @type {object<object>}
     */
    bodyConfig = {}

    /**
     * 设置搜索模型的数据
     * @param {object} sources
     */
    setSearchSources(sources = {}) {
        if( this.searchModel ) {
            this.searchModel.setSources(sources)
        }
    }

    /**
     * 设置分页器
     * 未设置的项将使用原有的值替代
     * @param {object<total, pagination, size>} pager
     */
    setPager(pager) {
        this.pager = Object.assign({}, this.pager, pager)
    }

    /**
     * 获取操作按钮列表
     * @returns {{text: string, type: string}[]}
     */
    getActionList() {
        return this.actionList.filter(item => {
            return VFrame.getInstance().getHasPermission(item.permission) && item.isShow !== false
        })
    }

    /**
     * 获取列表内容配置
     * @returns {Object}
     */
    getBodyConfig() {
        this.showModel = this.showModel || this.searchModel
        let model = this.showModel
        return ObjectHelper.forEach(ObjectHelper.filter(this.bodyConfig, item => {
            return VFrame.getInstance().getHasPermission(item.permission)
        }), (item, field) => {
            item.name = item.name ? item.name : model.getLabel(field)
            return item
        })
    }

    /**
     * 列表搜索
     * @param {int} pagination 指定页码，不传递时时候原页码+1
     * @param {boolean} clearList 调用接口前是否要清空原列表内容，默认清空
     * @returns {Promise<boolean>}
     */
    async onLoad(pagination, clearList = true) {
        this.showModel = this.showModel || this.searchModel

        this.pager.pagination = pagination || this.pager.pagination++
        if( clearList ) {
            this.modelList = []
        }
        if(await this.searchModel.list({ page: this.pager.pagination, page_size: this.pager.size }, this.showModel.constructor)) {
            this.modelList = this.modelList.concat(this.searchModel.response.models)
            this.setPager(this.searchModel.response.listMeta)
        }
        return true
    }
}
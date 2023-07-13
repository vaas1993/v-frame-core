import FormModel from "./baseModels/FormModel"

export default class AppModel extends FormModel {
    /**
     * 获取某个属性值，并转成 integer 格式
     * 注意：某个格式可能无法被成功转换，请自行处理异常情况
     * @param {string} field
     * @returns {number}
     */
    getInteger(field) {
        return parseInt(this.getString(field))
    }

    /**
     * 获取某个属性值，并转成 string 格式
     * 注意：某个格式可能无法被成功转换，请自行处理异常情况
     * @param {string} field
     * @returns {string}
     */
    getString(field) {
        return this.getSource(field).toString()
    }
}
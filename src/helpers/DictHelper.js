import AppModel from "../models/AppModel"
import VFrame from "../VFrame"

export default class DictHelper extends AppModel {
    /**
     * 获取一组数据词典
     * @param {string} groupName 组名
     * @param {array} ignoreList 需要忽略的组成员值列表，默认不忽略任何值
     * @returns {array<object<name, value>>}
     */
    static getGroup(groupName, ignoreList = []) {
        return (VFrame.getInstance().dictList[groupName] || [])
            .filter(dict => {
                return ignoreList.indexOf(dict.value) === -1
            })
    }

    /**
     * 获取词典值
     * @param {string} groupName 组名
     * @param {string} name 词典名
     * @returns {string}
     */
    static getValue(groupName, name) {
        name = name || ''
        let group = this.getGroup(groupName)
        for (let dict of group) {
            if( dict.name === name ) {
                return dict.value
            }
        }
    }

    /**
     * 获取词典名
     * @param {string} groupName 组名
     * @param {string} value 词典值
     * @returns {string}
     */
    static getName(groupName, value) {
        value = value || ''
        let group = this.getGroup(groupName)
        for (let dict of group) {
            if( dict.value.toString() === value.toString() ) {
                return dict.name
            }
        }
    }
}
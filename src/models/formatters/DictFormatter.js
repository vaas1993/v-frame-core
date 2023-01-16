import BaseFormatter from "./BaseFormatter"
import DictHelper from "../../helpers/DictHelper"

/**
 * 数据辞典的格式化类
 * 需要通过 options.groupName 参数指定一个词典组，这个类会自动从数据辞典中获取对应的标签名
 * 还可以通过 options.ignore 配置一个数组，用于略过某些特定的数据辞典项
 */
export default class DictFormatter extends BaseFormatter {
    getValue() {
        return DictHelper.getName(this.options.groupName, this.value, this.options.ignore || [])
    }
}
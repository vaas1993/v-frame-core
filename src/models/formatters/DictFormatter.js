import BaseFormatter from "./BaseFormatter"
import DictHelper from "../../helpers/DictHelper";

export default class DictFormatter extends BaseFormatter {
    getValue() {
        return DictHelper.getName(this.options.groupName, this.value, this.options.ignore || [])
    }
}
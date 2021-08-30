import AppModel from "../models/AppModel"
import VFrame from "../VFrame"

export default class DictHelper extends AppModel {
    static getGroup(groupName, ignore = []) {
        return (VFrame.getInstance().dictList[groupName] || [])
            .filter(dict => {
                return ignore.indexOf(dict.value) === -1
            })
    }

    static getValue(groupName, name) {
        name = name || ''
        let group = this.getGroup(groupName)
        for (let dict of group) {
            if( dict.name === name ) {
                return dict.value
            }
        }
    }

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
import StorageHelper from "../helpers/StorageHelper"
import CookieHelper from "../helpers/CookieHelper"

export default {
    name: 'VFrame',
    storage: {
        class: StorageHelper
    },
    cookie: {
        class: CookieHelper
    }
}
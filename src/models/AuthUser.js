import AppModel from "./AppModel"
import StorageHelper from "../helpers/StorageHelper"
import ObjectHelper from "../helpers/ObjectHelper"
import VFrame from "../VFrame"
export default class AuthUser extends AppModel {
    static ACCESS_TOKEN_NAME = 'ACCESS_TOKEN_NAME'
    accessToken

    /**
     * 设置授权令牌
     * 当设置为undefined时会清空Token
     * @param {string|undefined} token
     */
    setAccessToken(token) {
        this.accessToken = token
        if( token === undefined ) {
            StorageHelper.remove(AuthUser.ACCESS_TOKEN_NAME)
        } else {
            StorageHelper.set(AuthUser.ACCESS_TOKEN_NAME, token)
        }
    }

    /**
     * 获取登录授权令牌
     * @returns {*}
     */
    getAccessToken() {
        return this.accessToken
    }

    /**
     * 获取当前账号是否登录
     * @returns {boolean}
     */
    getIsLogin() {
        return this.accessToken !== undefined
    }

    /**
     * 登录成功后的回调
     */
    afterLogin() {
        return new Promise(next => {
            next(true)
        })
    }

    /**
     * 登录
     * @returns {Promise<boolean>}
     */
    async login() {
        if( await this.action() ) {
            let user = VFrame.getInstance().user
            user.setSources(this.response.sources)
            user.setAccessToken(this.response.accessToken)
            await this.afterLogin()
            return true
        }
        return false
    }

    /**
     * 退出登录
     * @returns {Promise<boolean>}
     */
    async logout() {
        this.setAccessToken(undefined)
        this.setSources(ObjectHelper.forEach(this.getSources(), () => {
            return undefined
        }))
        return true
    }
}
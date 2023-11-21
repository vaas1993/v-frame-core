import AppModel from "./AppModel"
export default class AuthUser extends AppModel {
    static ACCESS_TOKEN_NAME = 'ACCESS_TOKEN_NAME'
    accessToken

    /**
     * 获取某个变量是不是属姓
     * @param field
     * @returns {boolean}
     */
    getIsField(field) {
        return super.getIsField(field) && field !== 'accessToken'
    }

    /**
     * 从存储器中加载授权令牌
     */
    loadAccessToken() {
        this.setAccessToken(this.$vf.get('storage').get(this.constructor.ACCESS_TOKEN_NAME) || undefined)
    }

    /**
     * 设置授权令牌
     * 当设置为undefined时会清空Token
     * @param {string|undefined} token
     */
    setAccessToken(token) {
        this.accessToken = token
        if( token === undefined ) {
            this.$vf.get('storage').remove(this.constructor.ACCESS_TOKEN_NAME)
        } else {
            this.$vf.get('storage').set(this.constructor.ACCESS_TOKEN_NAME, token)
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
     * @returns {Promise<boolean>}
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
            let user = this.$vf.user
            user.setSources(this.$response.getSources())
            user.setAccessToken(this.$response['accessToken'] ?? undefined)
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
        for (let field of this.getFields()) {
            this.setEmpty(field)
        }
        return true
    }
}
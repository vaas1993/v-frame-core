import User from "@/models/dataModels/User"

export default class UserLoginForm extends User {
    static ActionApi = 'user.login'

    getActionRequestParams() {
        return this.getSources(['username', 'password'])
    }
}
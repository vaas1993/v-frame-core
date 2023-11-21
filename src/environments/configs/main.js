import Api from '@vshen/v-frame-core/src/helpers/Api'
import User from '@/models/dataModels/User'
import axios from 'axios'
import apis from '@vshen/v-frame-core/src/environments/configs/apis'

export default {
    api: {
        class: Api,
        driver: axios,
        list: apis
    },
    user: {
        class: User
    }
}
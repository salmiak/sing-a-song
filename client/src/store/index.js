import Vue from 'vue'
import Vuex from 'vuex'

import { authentication } from './authentication.module';
import { users } from './users.module';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        alert,
        authentication,
        users
    }
})

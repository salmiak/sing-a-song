import Vue from 'vue'
import Vuex from 'vuex'

import { authentication } from './authentication.module';
import { users } from './users.module';
import { profiles } from './profiles.module';
import { media } from './media.module';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        authentication,
        users,
        profiles,
        media
    }
})

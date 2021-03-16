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
    },
    state: {
      loading: []
    },
    mutations: {
      pushLoading(state) {
        state.loading.push(1)
      },
      popLoading(state) {
        if(state.loading.length)
          state.loading.pop(1)
      }
    }
})

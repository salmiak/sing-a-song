import { services } from '../_services';

export const profiles = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            services.profileService.getAll()
                .then(
                    users => commit('getAllSuccess', users),
                    error => commit('getAllFailure', error)
                );
        },
        update(a, payload) {
          return new Promise((resolve, reject) => {
            services.profileService.update(payload)
            .then(
              response => {
                resolve(response)
              },
              error => {
                console.error({error})
                reject(error)
              }
            );
          })
        },
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, profiles) {
            state.all = { items: profiles };
        },
        getAllFailure(state, error) {
            state.all = { error };
        },
        addMedia(state, media) {
          state.all.items.find(profile => profile.id === media.profileId).media.unshift(media)
        },
        deleteMedia(state, media) {
          const profile = state.all.items.find(profile => profile.id === media.profileId)
          const indexToDelete = profile.media.findIndex(m => m.id === media.id)
          profile.media.splice(indexToDelete, 1)
        }
    }
}

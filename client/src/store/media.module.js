import { services } from '../_services';

export const media = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            services.mediaService.getAll()
                .then(
                    users => commit('getAllSuccess', users),
                    error => commit('getAllFailure', error)
                );
        },
        update(a, payload) {
          return new Promise((resolve, reject) => {
            services.mediaService.update(payload)
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
        getAllSuccess(state, media) {
            state.all = { items: media };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}

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
        getAllSuccess(state, users) {
            state.all = { items: users };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}

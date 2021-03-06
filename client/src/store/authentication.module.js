import { services } from '../_services';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit, rootState }, { email, password }) {
          return new Promise((resolve, reject) => {
            commit('loginRequest', { email });
            rootState.loading.push(1)

            services.userService.login(email, password)
              .then(response => {
                rootState.loading.pop()
                commit('loginSuccess', response);
                resolve(response)
              }, error => {
                rootState.loading.pop()
                commit('loginFailure', error);
                reject(error)
              })
          });
        },
        forgotPassword({ rootState }, { email }) {
          return new Promise((resolve, reject) => {
            rootState.loading.push(1)
            services.userService.forgotPassword(email)
              .then(response => {
                rootState.loading.pop()
                resolve(response)
              }, error => {
                rootState.loading.pop()
                reject(error)
              })
          });
        },
        validateResetToken({ rootState }, { token }) {
          return new Promise((resolve, reject) => {
            rootState.loading.push(1)
            services.userService.validateResetToken(token)
              .then(response => {
                rootState.loading.pop()
                resolve(response)
              }, error => {
                rootState.loading.pop()
                reject(error)
              })
          });
        },
        resetPassword({ rootState }, payload) {
          return new Promise((resolve, reject) => {
            rootState.loading.push(1)
            services.userService.resetPassword(payload)
              .then(response => {
                rootState.loading.pop()
                resolve(response)
              }, error => {
                rootState.loading.pop()
                reject(error)
              })
          });
        },
        logout({ commit }) {
            services.userService.logout();
            commit('logout');
        },
        register({ rootState }, payload) {
          return new Promise((resolve, reject) => {
            rootState.loading.push(1)
            services.userService.register(payload)
            .then(
              response => {
                rootState.loading.pop()
                resolve(response)
              },
              error => {
                rootState.loading.pop()
                console.error({error})
                reject(error)
              }
            );
          })
        },
        update({ rootState }, payload) {
          return new Promise((resolve, reject) => {
            rootState.loading.push(1)
            services.userService.update(payload)
            .then(
              response => {
                rootState.loading.pop()
                resolve(response)
              },
              error => {
                rootState.loading.pop()
                console.error({error})
                reject(error)
              }
            );
          })
        },
        _delete({ dispatch }, id) {
          services.userService._delete(id)
          .then(
            () => {
              dispatch('authentication/logout')
            },
            error => {
              console.error({error})
            }
          );
        },
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}

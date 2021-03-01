import { services } from '../_services';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, { email, password }) {
          return new Promise((resolve, reject) => {
            commit('loginRequest', { email });

            services.userService.login(email, password)
              .then(response => {
                commit('loginSuccess', response);
                resolve(response)
              }, error => {
                commit('loginFailure', error);
                reject(error)
              })
          });
        },
        forgotPassword(a, { email }) {
          return new Promise((resolve, reject) => {
            services.userService.forgotPassword(email)
              .then(response => {
                resolve(response)
              }, error => {
                reject(error)
              })
          });
        },
        validateResetToken(a, { token }) {
          return new Promise((resolve, reject) => {
            services.userService.validateResetToken(token)
              .then(response => {
                resolve(response)
              }, error => {
                reject(error)
              })
          });
        },
        resetPassword(a, payload) {
          return new Promise((resolve, reject) => {
            services.userService.resetPassword(payload)
              .then(response => {
                resolve(response)
              }, error => {
                reject(error)
              })
          });
        },
        logout({ commit }) {
            services.userService.logout();
            commit('logout');
        },
        register(a, payload) {
          return new Promise((resolve, reject) => {
            services.userService.register(payload)
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
        update(a, payload) {
          return new Promise((resolve, reject) => {
            services.userService.update(payload)
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

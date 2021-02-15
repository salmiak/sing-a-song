import { services } from '../_services';
import router from '../router'

console.log(router) // eslint-disable-line no-console

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { email, password }) {
            commit('loginRequest', { email });

            services.userService.login(email, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        console.log('nu') // eslint-disable-line no-console
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
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
                localStorage({error})
                reject()
              }
            );
          })
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

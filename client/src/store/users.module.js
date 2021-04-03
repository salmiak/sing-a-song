import { services } from "../_services";

export const users = {
  namespaced: true,
  state: {
    all: {},
  },
  actions: {
    getAll({ commit, rootState }) {
      commit("getAllRequest");
      rootState.loading.push(1);

      services.userService.getAll().then(
        users => {
          rootState.loading.pop();
          commit("getAllSuccess", users);
        },
        error => {
          rootState.loading.pop();
          commit("getAllFailure", error);
        }
      );
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
    },
  },
};

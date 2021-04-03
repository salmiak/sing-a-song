import { services } from "../_services";

export const profiles = {
  namespaced: true,
  state: {
    all: {},
  },
  actions: {
    getAll({ commit, rootState }) {
      commit("getAllRequest");
      rootState.loading.push(1);

      services.profileService.getAll().then(
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
    update({ rootState }, payload) {
      return new Promise((resolve, reject) => {
        rootState.loading.push(1);
        services.profileService.update(payload).then(
          response => {
            rootState.loading.pop();
            resolve(response);
          },
          error => {
            rootState.loading.pop();
            console.error({ error });
            reject(error);
          }
        );
      });
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
      state.all.items
        .find(profile => profile.id === media.profileId)
        .media.unshift(media);
    },
    update(state, payload) {
      const profileIndex = state.all.items.findIndex(
        profile => profile.id === payload.id
      );
      state.all.items.splice(profileIndex, 1, payload);
    },
    deleteMedia(state, media) {
      const profile = state.all.items.find(
        profile => profile.id === media.profileId
      );
      const indexToDelete = profile.media.findIndex(m => m.id === media.id);
      profile.media.splice(indexToDelete, 1);
    },
  },
};

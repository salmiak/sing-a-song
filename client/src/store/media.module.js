import { services } from "../_services";

import spotifyUri from "spotify-uri";
import urlParser from "js-video-url-parser";

export const media = {
  namespaced: true,
  state: {
    all: {},
  },
  actions: {
    getAll({ commit, rootState }) {
      commit("getAllRequest");
      rootState.loading.push(1);

      services.mediaService.getAll().then(
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
    add({ rootState }, { newMediaURL, profileId }) {
      let payload = {};

      if (newMediaURL.search("mp3") !== -1) {
        payload = {
          provider: "mp3",
          url: newMediaURL,
          type: "mp3",
          id: newMediaURL,
        };
      } else if (newMediaURL.search("spotify") !== -1) {
        payload = Object.assign(spotifyUri.parse(newMediaURL), {
          provider: "spotify",
          url: newMediaURL,
        });
      } else if (newMediaURL.search("soundcloud") !== -1) {
        payload = {
          type: "sc",
          id: newMediaURL,
          provider: "soundcloud",
          url: newMediaURL,
        };
      } else {
        payload = Object.assign(urlParser.parse(newMediaURL), {
          url: newMediaURL,
        });
        payload.type = payload.mediaType;
      }

      payload.value = payload.id;
      payload.profileId = profileId;

      return new Promise((resolve, reject) => {
        rootState.loading.push(1);
        services.mediaService.create(payload).then(
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
    update({ rootState }, payload) {
      return new Promise((resolve, reject) => {
        rootState.loading.push(1);
        services.mediaService.update(payload).then(
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
    remove({ rootState }, payload) {
      return new Promise((resolve, reject) => {
        rootState.loading.push(1);
        services.mediaService.remove(payload).then(
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
    getAllSuccess(state, media) {
      state.all = { items: media };
    },
    getAllFailure(state, error) {
      state.all = { error };
    },
  },
};

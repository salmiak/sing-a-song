import { services } from '../_services';

import spotifyUri from 'spotify-uri'
import urlParser from "js-video-url-parser"

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
        add(a, {newMediaURL,profileId}) {

          let payload = {}

          if (newMediaURL.search('spotify') !== -1) {
            payload =  Object.assign(spotifyUri.parse(newMediaURL), {
              provider: 'spotify',
              url: newMediaURL
            })
          } else {
            payload =  Object.assign(urlParser.parse(newMediaURL), {
              url: newMediaURL
            })
            payload.type = payload.mediaType
          }

          payload.value = payload.id
          payload.profileId = profileId

          return new Promise((resolve, reject) => {
            services.mediaService.create(payload)
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
        remove(a, payload) {
          return new Promise((resolve, reject) => {
            services.mediaService.remove(payload)
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
        }
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

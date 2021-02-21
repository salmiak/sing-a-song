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
            profiles.forEach(profile => {
              profile.media = [
                {
                  id: 1,
                  profileId: 4,
                  type: 'youtube',
                  value: 'IvUU8joBb1Q',
                  uri: 'https://www.youtube.com/watch?v=IvUU8joBb1Q&ab_channel=AndersFlanderzOneManBand'
                },
                {
                  id: 9,
                  profileId: 4,
                  type: 'spotify',
                  value: 'track/3kBPnItITm3Od2IVhuJPxf',
                  uri: 'spotify:track:3kBPnItITm3Od2IVhuJPxf'
                },
                {
                  id: 10,
                  profileId: 4,
                  type: 'spotify',
                  value: 'album/7e8Iiag5t3Z3CNSQbT7M8B',
                  uri: 'spotify:album:7e8Iiag5t3Z3CNSQbT7M8B'
                },
                {
                  id: 2,
                  profileId: 4,
                  type: 'youtube',
                  value: 'ASqS1do7SWk',
                  uri: 'https://www.youtube.com/watch?v=ASqS1do7SWk&ab_channel=AndersFlanderzOneManBand'
                },
                {
                  id: 3,
                  profileId: 4,
                  type: 'youtube',
                  value: 'XQqbNElwLVE',
                  uri: 'https://www.youtube.com/watch?v=XQqbNElwLVE&ab_channel=AndersFlanderzOneManBand'
                },
                {
                  id: 4,
                  profileId: 4,
                  type: 'youtube',
                  value: 'RT8NVDHe9-k',
                  uri: 'https://www.youtube.com/watch?v=RT8NVDHe9-k&ab_channel=AndersFlanderzOneManBand'
                },
                {
                  id: 5,
                  profileId: 4,
                  type: 'youtube',
                  value: 'FDE0JuAlktc',
                  uri: 'https://www.youtube.com/watch?v=FDE0JuAlktc&ab_channel=AndersFlanderzOneManBand'
                },
                {
                  id: 6,
                  profileId: 4,
                  type: 'youtube',
                  value: '6HsLrDvfloo',
                  uri: 'https://www.youtube.com/watch?v=6HsLrDvfloo&ab_channel=AndersFlanderzOneManBand'
                },
                {
                  id: 7,
                  profileId: 4,
                  type: 'youtube',
                  value: 'yo0kya_XUkA',
                  uri: 'https://www.youtube.com/watch?v=yo0kya_XUkA&ab_channel=AndersFlanderzOneManBand'
                },
                {
                  id: 8,
                  profileId: 4,
                  type: 'youtube',
                  value: 'OAEJ3c9pSsE',
                  uri: 'https://www.youtube.com/watch?v=OAEJ3c9pSsE&ab_channel=AndersFlanderzOneManBand'
                }
              ]
            })
            state.all = { items: profiles };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}

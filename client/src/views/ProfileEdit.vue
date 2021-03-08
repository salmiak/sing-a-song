<template lang="html">
  <div>
    <server-comunication-indicator />
    <template v-if="profile">
      <!-- Profile Cover -->
      <v-parallax
        height="320"
        :src="profile.coverURL"
        class="secondary darken-3"
      >
        <v-toolbar
          flat
          color="transparent"
          dark
          class="flex-grow-0"
        >
          <v-btn
            to="/"
            icon
          >
            <svg
              class="appbar-logo"
              version="1.1"
              id="Lager_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
            >
              <g>
                <path class="st0" d="M268.4,403.8c-31.5,1.9-62.4-2.7-93.2-8.9c-6.4-1.3-11-0.1-16.1,3.7c-22.8,16.7-44.9,34.1-65,54.1 c-2.6,2.6-5.6,5.3-8.8,6.9c-7.6,3.7-14.3-0.7-14.5-9.1c-0.1-6.3,0.9-12.8,3.9-18.1c11-19.2,10.5-39.8,8.4-60.6 c-0.7-7.4-4.8-12-11.8-16.1c-19.7-11.2-38.4-24.1-51.7-43.1c-4.7-6.7-7.6-15-9.8-22.3c-4.1-13.3-8.2-26.9-9.5-41.2 c-1.5-16.7,1.6-32.2,5.5-48.1c6-24.2,21.1-42.3,38-59.3c5.8-5.9,11.5-12.1,17.2-18c7.9-8.2,17.4-15.1,26.8-21.7 c10.4-7.3,21.3-13.9,32.4-20.2c22.9-13,47.7-20.5,73.6-25.3c48.9-9.1,97.2-6.6,145.1,5.4c27.6,6.9,54.3,16.6,79.9,29.2 c29.1,14.3,50.5,36.1,65.9,64.2c8.2,15,15.5,30.3,22,46.1c1.6,3.8,2.5,8,3.1,12.1c5.1,32.2,0.7,63.7-12,93.2 c-14.7,34.1-42,55.3-76.1,69.6c-38.1,16.1-77.9,22.8-118.4,27.3C291.9,404.9,280.1,403.8,268.4,403.8z M298.8,199.6 c0-22.5,0.3-45-0.1-67.5c-0.2-10.2-4-12.7-14.6-12.3c-9,0.3-10.2,1.9-10.4,12.8c0,3.7,0,7.5,0.1,11.2c1.5,35.8-0.9,71.6-0.9,107.5 c0,9.2-0.6,9.7-9,7.3c-18.6-5.2-35.6-1.8-50.9,9.5c-20.5,15-18.6,30.5-2.1,45.3c1.8,1.6,4.1,2.8,6.3,4.1 c16.3,9.6,33.4,8.5,50.8,4.2c18.3-4.5,26.1-19.4,30.3-35c3.4-12.6,4.1-26.4,2.9-39.7C299.8,231.2,300.6,215.4,298.8,199.6z"/>
              </g>
            </svg>
          </v-btn>
          <v-toolbar-title>
            <router-link
              to="/"
              class="secondary--text text-decoration-none"
            >Sing a song</router-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <top-navigation />
        </v-toolbar>

        <v-container
          class="flex-grow-1 px-0 d-flex"
        >
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-center align-center pb-12"
            >
              <v-sheet
                color="white"
                elevation="3"
                rounded
                class="px-7 pt-7"
              >
                <v-file-input
                  class="mb-0"
                  v-model="coverFile"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  outlined
                  placeholder="Ladda upp ny omslagsbild"
                  dense
                >

                  <v-btn
                    slot="append-outer"
                    style="top: -7px;"
                    v-if="profile.coverURL"
                    dark
                    color="accent"
                    @click="removeImg('cover')"
                  >
                    <v-icon dark left>
                      mdi-delete
                    </v-icon>
                    Ta bort omslagsbild
                  </v-btn>
                </v-file-input>
              </v-sheet>

            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </template>

    <v-container
      class="pb-16"
    >

        <!-- Profile details -->
      <template v-if="profile">
        <v-row
          justify="center"
        >
          <v-col
            class="text-center"
          >
            <v-avatar
              :size="profile.avatarURL ? 128 : 64"
              class="elevation-5"
              :class="{
                'mt-n13': !!profile.coverURL,
                'mt-4': !profile.coverURL
                }"
              color="accent darken-1"
            >
              <img
                v-if="profile.avatarURL"
                :src="profile.avatarURL"
                :alt="profile.stageName || userName"
              >
              <span
                v-else
                class="white--text text-h5"
              >
                {{ profile.stageName ? profile.stageName.slice(0,2) : profile.user.firstName[0] + profile.user.lastName[0] }}
              </span>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row
          justify="center"
        >
          <v-col
            class="col-12 col-md-6 text-center"
          >
            <v-file-input
              class="mb-0"
              v-model="avatarFile"
              accept="image/*"
              prepend-icon="mdi-camera"
              outlined
              placeholder="Ladda upp ny profilbild"
              dense
            >
              <v-btn
                slot="append-outer"
                style="top: -7px;"
                v-if="profile.coverURL"
                dark
                color="accent"
                @click="removeImg('avatar')"
              >
                <v-icon dark left>
                  mdi-delete
                </v-icon>
                Ta bort profilbild
              </v-btn>
            </v-file-input>
          </v-col>
        </v-row>
        <v-row
          justify="center"
        >
          <v-col
            class="text-center col-12 col-sm-8"
          >

            <v-expand-transition>
              <v-alert
                v-if="validation.message"
                :type="validation.type"
                dense
                class="text-left"
              >
                {{validation.message}}
              </v-alert>
            </v-expand-transition>

            <inline-edit
              :model="profileName"
              @save="saveProfileName"
              label="Artistnamn"
            >
              <h1 class="text-h3 mb-4">{{profileName}}</h1>
            </inline-edit>

            <inline-edit
              :model="profile.description"
              @save="saveProfileDescription"
              label="Beskrivning"
              type="textarea"
            >
              <p>{{profile.description}}</p>
            </inline-edit>

            <p class="text-caption mb-0">Vilka regioner kan du uppträda i?</p>
            <p>
              <span>
                <v-chip
                  v-for="area in profile.geoReach"
                  :key="area"
                  class="ma-1"
                  color="accent"
                  close
                  close-icon="mdi-delete"
                  @click:close="removeArea(area)"
                >
                  {{area}}
                </v-chip>
              </span>

              <v-menu
                max-height="256"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    class="ma-1"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                  >
                    <v-icon left>
                      mdi-plus
                    </v-icon>
                    Lägg till område
                  </v-chip>
                </template>
                <v-list>
                  <v-list-item-group
                    color="primary"
                  >
                    <v-list-item
                      v-for="area in notSelectedAreas"
                      :key="area"
                      @click="addArea(area)"
                    >
                      <v-list-item-title>{{ area }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </p>

            <inline-edit
              :model="profile.contactDetails"
              @save="saveProfileContactDetails"
              label="Kontaktuppgifter"
              type="textarea"
            >
              <p><strong class="accent--text">Kontakt:</strong> {{profile.contactDetails || 'Inga kontaktuppgifter finns'}}</p>
            </inline-edit>

          </v-col>
        </v-row>

        <!-- Media -->
        <v-row>
          <v-col>
            <v-text-field
              label="Lägg till media"
              hint="Klistra in länken till din media här"
              :color="newMediaValidation?'success':'primary'"
              outlined
              v-model="newMediaURL">
              <template v-slot:append>
                <v-btn
                  :disabled="!newMediaValidation"
                  color="primary"
                  @click="addNewMedia"
                  style="top: -7px;"
                >
                  <v-icon left>mdi-plus</v-icon>
                  Lägg till
                </v-btn>
              </template>
            </v-text-field>

            <v-alert
              v-if="newMediaValidation"
              type="success"
              transition="scale-transition"
              outlined
              text
              class="mt-2"
            >
              Länken är en <strong>{{newMediaValidation.provider}}
                {{newMediaValidation.mediaType||newMediaValidation.type}}</strong>.
            </v-alert>

          </v-col>
        </v-row>

        <v-row
          dense
        >
          <v-col
            v-for="media in profile.media"
            :key="media.id"
            class="d-flex child-flex col-12 col-sm-6 col-md-4"
            style="position: relative"
          >
            <v-btn
              elevation="2"
              fab
              dark
              color="primary"
              absolute
              small
              style="top: 0px; right: 0px;"
              @click="deleteMedia(media)"
              >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <media-card :media="media" />
          </v-col>
        </v-row>

        <!--  / Media -->

      </template>

      <v-row v-else>
        <v-col>
          <p class="text-center text-h4 mt-16">Laddar…</p>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import spotifyUri from 'spotify-uri'
import urlParser from "js-video-url-parser"
import helpers from '@/_helpers'
import allAreas from '@/_helpers/areas.js'
import MediaCard from '@/components/MediaCard'
import InlineEdit from '@/components/InlineEdit'

export default {
  name: 'Profile',
  title() {
    return `Redigera ${this.profileName} | Sing a Song`
  },
  components: {
    MediaCard,
    InlineEdit
  },
  data() {
    return {
      newMediaURL: undefined,
      coverFile: undefined,
      avatarFile: undefined,
      validation: {}
    }
  },
  created() {
    this.$store.dispatch('profiles/getAll');
  },
  watch: {
    avatarFile(file) {
      if (!file)
        return false
      this.updateImage(file, 'avatar')
    },
    coverFile(file) {
      if (!file)
        return false
      this.updateImage(file, 'cover')
    },
    validation() {
      if(this.validation.message) {
        setTimeout(() => {
          this.validation = {}
        }, 10000)
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    profile() {
      if (!this.$store.state.profiles.all.items)
        return undefined
      return this.$store.state.profiles.all.items.find(p => p.id == this.id)
    },
    profileName() {
      if (!this.$store.state.profiles.all.items)
        return undefined
      return this.profile.stageName || this.userName
    },
    profileSlug() {
      return helpers.slugify(this.profileName)
    },
    userName() {
      return this.profile.user.firstName + " " + this.profile.user.lastName
    },
    notSelectedAreas() {
      return allAreas.filter(area => this.profile.geoReach.indexOf(area) === -1)
    },
    newMediaValidation() {
      if (!this.newMediaURL) {
        return undefined
      } else if (this.newMediaURL.search('spotify') !== -1) {
        return Object.assign(spotifyUri.parse(this.newMediaURL), {
          provider: 'spotify'
        })
      } else {
        return urlParser.parse(this.newMediaURL)
      }
    },
    soundcloudValue() {
      if (this.newMediaValidation.provider !== 'soundcloud')
        return undefined

      let output = this.newMediaURL.split('src')[1].split('"')[1]
      return output
    }
  },
  methods: {
    saveProfileName(newVal) {
      this.profile.stageName = newVal
      this.updateProfile()
    },
    saveProfileDescription(newVal) {
      this.profile.description = newVal
      this.updateProfile()
    },
    saveProfileContactDetails(newVal) {
      this.profile.contactDetails = newVal
      this.updateProfile()
    },
    addArea(area) {
      this.profile.geoReach.push(area)
      this.profile.geoReach.sort()
      this.updateProfile()
    },
    removeArea(area) {
      this.profile.geoReach = this.profile.geoReach.filter(a => a !== area)
      this.profile.geoReach.sort()
      this.updateProfile()
    },
    updateProfile() {
      this.validation = {}
      this.submitted = true
      this.$store.dispatch('profiles/update', this.profile)
        .then(() => {
          this.validation = {
            message: 'Din profil uppdaterades',
            type: 'success'
          }
          this.submitted = false
        }, error => {
          this.validation = {
            message: error,
            type: 'error'
          }
          this.submitted = false
        })
    },
    updateImage(file, target) {
      const that = this
      const currentUser = this.$store.state.authentication.user

      function uploadFile(file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
            if(xhr.status === 200){

              const payload = {
                id: that.profile.id,
                userId: currentUser.id
              }
              if (target === 'avatar') {
                payload.avatarURL = url
              } else if (target === 'cover') {
                payload.coverURL = url
              } else {
                console.error('missing target')
              }

              that.$store.dispatch('profiles/update', payload)
              .then(response => {
                that.$store.commit('profiles/update', response)
              })
            }
            else{
              console.error('Could not upload file.');
            }
          }
        };
        xhr.send(file);
      }

      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${helpers.apiUrl}/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.setRequestHeader('Authorization', helpers.authHeader().Authorization);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url);
          }
          else{
            console.error('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    },
    removeImg(target) {
      console.log('removeImg: ' + target) // eslint-disable-line no-console
      const payload = {
        id: this.profile.id,
        userId: this.$store.state.authentication.user.id
      }
      if (target === 'avatar') {
        payload.avatarURL = ''
        this.profile.avatarURL = ''
      } else if (target === 'cover') {
        payload.coverURL = ''
        this.profile.coverURL = ''
      } else {
        console.error('missing target')
      }

      this.$store.dispatch('profiles/update', payload)
      .then(response => {
        this.$store.commit('profiles/update', response)
      })
    },
    addNewMedia() {
      if (!this.newMediaValidation) {
        return false
      }
      this.mediaValidationError = undefined
      this.submitted = true

      this.$store.dispatch('media/add', {
        newMediaURL: this.soundcloudValue||this.newMediaURL,
        profileId: this.profile.id
      })
        .then(media => {
          this.validation = {
            target: 'media',
            message: 'Media tillagt',
            type: 'success'
          }
          this.submitted = false
          this.newMediaURL = ''
          this.$store.commit('profiles/addMedia', media)
        }, error => {
          this.validation = {
            target: 'media',
            message: error,
            type: 'error'
          }
          this.mediaValidationError = error
        })
    },
    deleteMedia(media) {
      this.$store.dispatch('media/remove', media)
        .then(() => {
          this.$store.commit('profiles/deleteMedia', media)
        }, error => {
          console.log(error) // eslint-disable-line no-console
        })
    }
  }
}
</script>

<style lang="css">
.appbar-logo {
  width: 32px;
  height: 32px;
}
.st0 {
  fill:var(--v-primary-base);
}
.theme--dark .st0 {
  fill: #FFF;
}
</style>

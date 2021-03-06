<template lang="html">
  <v-container>
    <v-row>
      <v-col>
        <v-tabs
          color="primary"
          class="mb-16"
        >
          <v-tab to="/account/account">Ditt konto</v-tab>
          <v-tab to="/account/profile">Din profil</v-tab>
          <v-tab to="/account/media">Din media</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items
      v-model="$route.params.tab"
    >

      <v-tab-item value="account">
        <v-row>
          <v-col class="col-6 pb-4">
            <h2 class="text-h2">Ditt konto</h2>
            <p class="mt-4 text--disabled text-body-2">Gick med {{user.created}}</p>

            <h3 class="text-h3 mt-8">Kontoinformation</h3>
            <v-form @submit.prevent="updateAccount">
              <v-text-field
                v-model="user.firstName"
                label="Förnamn" ></v-text-field>
              <v-text-field
                v-model="user.lastName"
                label="Efternamn" ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                type="email"></v-text-field>

              <v-btn
                @click="updateAccount"
                :disabled="submitted">Uppdatera konto</v-btn>

              <v-alert
                v-if="validation && validation.target === 'account'"
                :type="validation.type"
                text
                class="mt-2"
                transition="scale-transition"
              >{{validation.message}}</v-alert>
            </v-form>

            <h3 class="text-h3 mt-8">Ändra lösenord</h3>
            <v-form>
              <v-text-field
                v-model="password"
                label="Lösenord"
                :type="showPassword?'text':'password'"
              >
                <v-icon
                  slot="append"
                  @click="showPassword = !showPassword"
                  tabindex="-1"
                >
                  {{showPassword?'mdi-eye-off':'mdi-eye'}}
                </v-icon>
              </v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Lösenord igen"
                :type="showPassword?'text':'password'"
              >
              </v-text-field>

              <v-btn
                @click="updatePassword"
                :disabled="submitted">Uppdatera lösenord</v-btn>

              <v-alert
                v-if="validation && validation.target === 'password'"
                :type="validation.type"
                text
                class="mt-2"
                transition="scale-transition"
              >{{validation.message}}</v-alert>
            </v-form>

            <h3 class="text-h3 mt-8 mb-4">Farliga grejer</h3>
            <v-form>
              <v-btn
                v-if="askToDeleteUser"
                @click="deleteUser"
                color="error"
              >
                <v-icon left>mdi-delete</v-icon>
                Är du helt säker? Det går inte att ångra
              </v-btn>
              <v-btn
                v-else
                @click="askToDeleteUser = true"
                color="error"
                outlined
              >
                <v-icon left>mdi-delete</v-icon>
                Radera konto
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item value="profile">

        <!-- Profile Cover -->
        <v-row v-if="profile.coverURL">
          <v-col class="pa-0">
            <v-parallax
              height="250"
              :src="profile.coverURL"
              class="ma-1 mt-4 rounded"
            >
              <v-row
                align="start"
                justify="end"
              >
                <v-col
                  class="pt-7"
                  cols="12"
                >
                  <v-btn
                    color="primary"
                    to="/account/profile"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-parallax>
          </v-col>
        </v-row>

        <!-- Profile details -->
        <v-row
          justify="center"
        >
          <v-col
            class="col-3 text-center"
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
                :alt="profile.stageName"
              >
              <span
                v-else
                class="white--text text-h5"
              >
                {{ profile.stageName ? profile.stageName.slice(0,2) : user.firstName[0] + user.lastName[0] }}
              </span>
            </v-avatar>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="col-8 pb-4">
            <h2 class="text-h2">Din profil</h2>
            <template v-if="profile">

              <v-file-input
                v-model="avatarFile"
                show-size
                truncate-length="15"
                label="Ladda upp ny profilbild"
                accept="image/*"
              ></v-file-input>

              <v-file-input
                v-model="coverFile"
                show-size
                truncate-length="15"
                label="Ladda upp ny omslagsbild"
                accept="image/*"
              ></v-file-input>

              <v-text-field
                v-model="profile.stageName"
                label="Artistnamn" ></v-text-field>

              <v-textarea
                label="Beskrivning"
                v-model="profile.description"
                hint="Visas på din profil"
                auto-grow
                rows="3"
              ></v-textarea>

              <v-combobox
                v-model="profile.geoReach"
                :items="areas"
                label="Vilka regioner kan du uppträda i?"
                multiple
                chips
              ></v-combobox>

              <v-textarea
                label="Kontaktuppgifter"
                v-model="profile.contactDetails"
                hint="E-postadresser kommer förvandlas till länkar."
                auto-grow
                rows="3"
              ></v-textarea>

              <v-btn
                @click="updateProfile"
                :disabled="submitted"
                class="mb-4"
              >Uppdatera konto</v-btn>

              <v-alert
                v-if="validation && validation.target === 'profile'"
                :type="validation.type"
                text
                class="mt-2"
                transition="scale-transition"
              >{{validation.message}}</v-alert>

              <p><router-link :to="`/profile/${profile.id}`">Besök din profil</router-link></p>

            </template>
            <template v-else>
              <p>Laddar profil...</p>
            </template>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item value="media">
        <v-row>
          <v-col>
              <h2 class="text-h2 mb-4">Din media</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card
              class="pa-4 elevation-4"
            >
              <v-text-field
                label="Lägg till media"
                hint="Klistra in länken till din media här"
                color="success"
                v-model="newMediaURL" />
              <v-btn
                :disabled="!newMediaValidation"
                color="primary"
                @click="addNewMedia"
              >
                <v-icon left>mdi-plus</v-icon>
                Lägg till
              </v-btn>
              <v-alert
                v-if="newMediaValidation"
                type="success"
                transition="scale-transition"
                outlined
                class="mt-2"
              >
                Länken är en <strong>{{newMediaValidation.provider}}
                  {{newMediaValidation.mediaType||newMediaValidation.type}}</strong>.
              </v-alert>

              <v-alert
                v-if="validation && validation.target === 'media'"
                :type="validation.type"
                text
                class="mt-2"
                transition="scale-transition"
              >{{validation.message}}</v-alert>

            </v-card>
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

      </v-tab-item>

    </v-tabs-items>
  </v-container>
</template>

<script>
import helpers from '../_helpers'
import areas from '@/_helpers/areas'
import spotifyUri from 'spotify-uri'
import urlParser from "js-video-url-parser"
import MediaCard from '@/components/MediaCard'

export default {
  name:'Account',
  title: 'Ditt konto | Sing a Song',
  components: {
    MediaCard
  },
  data() {
    return {
      submitted: false,
      areas,
      password: '',
      confirmPassword: '',
      validation: {},
      newMediaURL: undefined,
      avatarFile: undefined,
      coverFile: undefined,
      askToDeleteUser: false,
      showPassword: false
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.authentication.user
      },
      set() {

      }
    },
    profile() {
      if (this.$store.state.profiles.all.items)
        return this.$store.state.profiles.all.items.find(i => i.userId === this.user.id)
      return false
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
  created () {
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
    askToDeleteUser() {
      if(this.askToDeleteUser)
        setTimeout(()=> {
          this.askToDeleteUser = false
        }, 5000)
    },
    validation() {
      if(this.validation.target) {
        setTimeout(() => {
          this.validation = {}
        }, 10000)
      }
    }
  },
  methods: {
    updateAccount () {
      this.validation = {}
      this.submitted = true
      this.$store.dispatch('authentication/update', this.user)
        .then(() => {
          this.validation = {
            target: 'account',
            message: 'Ditt konto sparades',
            type: 'success'
          }
          this.submitted = false
        }, error => {
          this.validation = {
            target: 'account',
            message: error,
            type: 'error'
          }
          this.submitted = false
        })
    },
    updatePassword() {
      this.validation = {}
      this.submitted = true
      this.$store.dispatch('authentication/update', {
        id: this.user.id,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
        .then(() => {
          this.validation = {
            target: 'password',
            message: 'Ditt lösenord uppdaterades',
            type: 'success'
          }
          this.submitted = false
        }, error => {
          this.validation = {
            target: 'password',
            message: error,
            type: 'error'
          }
          this.submitted = false
        })
    },
    deleteUser() {
      console.log('delete user:' + this.user.id) // eslint-disable-line no-console
      this.$store.dispatch('authentication/_delete', this.user.id)
    },

    updateProfile() {
      this.validation = {}
      this.submitted = true
      this.$store.dispatch('profiles/update', this.profile)
        .then(() => {
          this.validation = {
            target: 'profile',
            message: 'Din profil uppdaterades',
            type: 'success'
          }
          this.submitted = false
        }, error => {
          this.validation = {
            target: 'profile',
            message: error,
            type: 'error'
          }
          this.submitted = false
        })
    },
    updateImage(file, target) {
      const that = this

      function uploadFile(file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
            if(xhr.status === 200){

              const payload = {
                id: that.profile.id,
                userId: that.user.id
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

<style>
.theme--light.v-tabs-items {
  background: transparent
}
</style>

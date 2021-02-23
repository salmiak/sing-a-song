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

    <v-tabs-items v-model="$route.params.tab">

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
                label="Email" ></v-text-field>

                <v-alert
                  type="error"
                  :value="!!accountValidationError"
                  transition="scale-transition"
                  class="elevation-2"
                >{{accountValidationError}}</v-alert>

              <v-btn
                @click="updateAccount"
                :disabled="submitted">Uppdatera konto</v-btn>
            </v-form>

            <h3 class="text-h3 mt-8">Ändra lösenord</h3>
            <v-form>
              <v-text-field
                v-model="password"
                label="Lösenord"
                type="password" ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Lösenord igen"
                type="password" ></v-text-field>

              <v-alert
                type="error"
                :value="!!passwordValidationError"
                transition="scale-transition"
                class="elevation-2"
              >{{passwordValidationError}}</v-alert>

              <v-btn
                @click="updatePassword"
                :disabled="submitted">Uppdatera lösenord</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item value="profile">
        <v-row>
          <v-col class="col-8 pb-4">
            <h2 class="text-h2">Din profil</h2>
            <template v-if="profile">

              <img :src="newAvatarURL" v-if="newAvatarURL" />

              <v-file-input
                v-model="avatarFile"
                show-size
                truncate-length="15"
                label="Profilbild"
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

              <v-alert
                type="error"
                :value="!!profileValidationError"
                transition="scale-transition"
                class="elevation-2"
              >{{profileValidationError}}</v-alert>

              <v-btn
                @click="updateProfile"
                :disabled="submitted"
                class="mb-4"
              >Uppdatera konto</v-btn>

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
                type="error"
                :value="!!mediaValidationError"
                transition="scale-transition"
                class="elevation-2"
              >
                {{mediaValidationError}}
              </v-alert>
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
import helpers from '../_helpers';
import spotifyUri from 'spotify-uri'
import urlParser from "js-video-url-parser"
import MediaCard from '@/components/MediaCard'

export default {
  name:'Account',
  components: {
    MediaCard
  },
  data() {
    return {
      submitted: false,
      areas: [
        'Götaland',
        'Svealand',
        'Södra Norrland',
        'Norra Norrland'
      ],
      password: '',
      confirmPassword: '',
      passwordValidationError: null,
      accountValidationError: null,
      profileValidationError: null,
      mediaValidationError: null,
      newMediaURL: undefined,
      avatarFile: undefined,
      newAvatarURL: undefined
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
    }
  },
  created () {
      this.$store.dispatch('profiles/getAll');
  },
  watch: {
    avatarFile(file) {
      const that = this
      if (!file)
        return false

      function uploadFile(file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              // ToDo: Update the profile with new avatar URL.
              console.log('Update the profile with the new URL: ' + url) // eslint-disable-line no-console
              that.newAvatarURL = url
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
    }
  },
  methods: {
    updateAccount () {
      this.accountValidationError = null
      this.submitted = true
      this.$store.dispatch('authentication/update', this.user)
        .then(() => {
          this.submitted = false
        }, error => {
          this.accountValidationError = error
          this.submitted = false
        })
    },
    updatePassword() {
      this.passwordValidationError = null
      this.submitted = true
      this.$store.dispatch('authentication/update', {
        id: this.user.id,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
        .then(() => {
          this.submitted = false
        }, error => {
          this.passwordValidationError = error
          this.submitted = false
        })
    },
    updateProfile() {
      this.profileValidationError = null
      this.submitted = true
      this.$store.dispatch('profiles/update', this.profile)
        .then(() => {
          this.submitted = false
        }, error => {
          this.profileValidationError = error
          this.submitted = false
        })
    },
    addNewMedia() {
      if (!this.newMediaValidation) {
        return false
      }
      this.mediaValidationError = undefined
      this.submitted = true

      this.$store.dispatch('media/add', {
        newMediaURL: this.newMediaURL,
        profileId: this.profile.id
      })
        .then(media => {
          this.submitted = false
          this.newMediaURL = ''
          this.$store.commit('profiles/addMedia', media)
        }, error => {
          this.submitted = false
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

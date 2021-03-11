<template lang="html">
  <div>
    <server-comunication-indicator />
    <template v-if="profile">
      <!-- Profile Cover -->
      <v-parallax
        v-if="profile.coverURL"
        height="320"
        :src="profile.coverURL"
      >
        <v-toolbar
          flat
          color="transparent"
          dark
          class="flex-grow-1"
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

      </v-parallax>
      <v-toolbar
        v-if="!profile.coverURL"
        flat
        color="transparent"
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
            class="text-decoration-none"
          >Sing a song</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <top-navigation />
      </v-toolbar>

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
            class="text-center col-12 col-sm-8"
          >
            <p
              v-if="showEdit"
            >
              <v-btn
                :to="`/profile/${profile.id}/edit`"
                small
                color="primary"
                outlined
              >
                <v-icon left>
                  mdi-pen
                </v-icon>
                Redigera din profil
              </v-btn>
            </p>
            <h1 class="text-h3 mb-4">{{profileName}}</h1>
            <p>{{profile.description}}</p>
            <p>
              <v-chip
                v-for="area in profile.geoReach"
                :key="area"
                class="ma-1"
                color="accent"
              >
                {{area}}
              </v-chip>
            <p><strong class="accent--text">Kontakt:</strong> {{profile.contactDetails || 'Inga kontaktuppgifter finns'}}</p>
          </v-col>
        </v-row>

        <!--  Media -->
        <v-row>
          <v-col
            v-for="media in profile.media"
            :key="media.id"
            class="d-flex child-flex pa-1 col-12 col-sm-6 col-md-4"
          >
            <media-card :media="media" />
          </v-col>
        </v-row>
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
import helpers from '@/_helpers'
import MediaCard from '@/components/MediaCard'

export default {
  name: 'Profile',
  title() {
    return `${this.profileName} | Sing a Song`
  },
  components: {
    MediaCard
  },
  data() {
    return {
      coverFile: undefined,
      avatarFile: undefined
    }
  },
  created() {
    this.$store.dispatch('profiles/getAll');
  },
  watch: {
    profileSlug() {
      if (!this.$route.params.slug !== this.profileSlug) {
        this.$router.push(`/profile/${this.id}/${this.profileSlug}`)
      }
    },
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
      return this.profile.stageName || this.profile.user.firstName + " " + this.profile.user.lastName
    },
    profileSlug() {
      return helpers.slugify(this.profileName)
    },
    userName() {
      return this.profile.user.firstName + " " + this.profile.user.lastName
    },
    showEdit() {
      if (!this.$store.state.authentication.user)
        return false

      return this.profile.userId === this.$store.state.authentication.user.id
    }
  },
  methods: {
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
      } else if (target === 'cover') {
        payload.coverURL = ''
      } else {
        console.error('missing target')
      }

      this.$store.dispatch('profiles/update', payload)
      .then(response => {
        this.$store.commit('profiles/update', response)
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

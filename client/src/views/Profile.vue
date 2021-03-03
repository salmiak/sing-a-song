<template lang="html">
  <div>
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
          class="flex-grow-0"
        >
          <v-toolbar-title>
            <router-link
              to="/"
              class="secondary--text text-decoration-none"
            >Sing a song</router-link>
          </v-toolbar-title>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <top-navigation />
        </v-toolbar>

        <v-container
          class="flex-grow-1 px-0"
        >
          <v-row
            v-if="showEdit"
            align="start"
            justify="end"
          >
            <v-col
              cols="12"
            >
              <v-btn
                color="primary"
                to="/account/profile"
              >
                <v-icon left>mdi-pen</v-icon> Redigera profil
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
      <v-toolbar
        v-else
        flat
        color="transparent"
      >
        <v-toolbar-title>
          <router-link
            to="/"
            class="text-decoration-none"
          >Sing a song</router-link>
        </v-toolbar-title>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
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
            <h1 class="text-h3 mb-4">{{profileName}}</h1>
            <p>{{profile.description}}</p>
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
          <h1 class="text-h1 mt-16">Laddar</h1>
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
  }
}
</script>

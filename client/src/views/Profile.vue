<template lang="html">

    <v-container
      class="pb-16"
    >
      <template v-if="profile">
        <!-- Profile Cover -->
        <v-row v-if="profile.coverURL">
          <v-col class="pa-0">
            <v-parallax
              height="250"
              :src="profile.coverURL"
              class="ma-1 mt-4 rounded"
            >
              <v-row
                v-if="showEdit"
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
                    <v-icon left>mdi-pen</v-icon> Redigera profil
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
                :alt="profile.stageName || userName"
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
        <v-row
          justify="center"
        >
          <v-col
            class="text-center col-8"
          >
            <h1 class="text-h3 mb-4">{{profile.stageName || userName}}</h1>
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
</template>

<script>
import MediaCard from '@/components/MediaCard'

export default {
  name: 'Profile',
  components: {
    MediaCard
  },
  data() {
    return {
      profileMock: {
        name: 'Salty Beans',
        regions: [
          'Götaland',
          'Svealand'
        ]
      }
    }
  },
  created() {
    this.$store.dispatch('profiles/getAll');
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

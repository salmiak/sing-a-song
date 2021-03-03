<template>
  <div>

    <v-parallax
      :src="require('../assets/frontpage-hero.jpg')"
      class="px-3"
    >
      <v-toolbar
        flat
        color="transparent"
        dark
        class="flex-grow-0"
      >
        <v-spacer></v-spacer>
        <top-navigation />
      </v-toolbar>

      <v-content
        class="d-flex align-center flex-grow-1"
      >
        <v-row
          justify="center mb-8"
        >
          <v-col
            class="col-12 col-sm-10 col-md-8 col-lg-6 pb-12 text-center"
          >
            <h1 class="text-h4 text-sm-h1 mb-6">Sing-a-song</h1>
            <v-text-field
              placeholder="Sök vissångare"
              type="search"
              solo
              clearable
              prepend-inner-icon="mdi-magnify"
              class="mb-0"
            />
            <v-chip
              v-for="area in areas"
              :key="area"
              color="white"
              class="elevation-1 ma-1"
              filter
              :input-value="area === selectedArea"
              @click="filterOnArea(area)"
            >
              {{area}}
            </v-chip>
          </v-col>
        </v-row>
      </v-content>
    </v-parallax>

    <v-container
      class="pb-16"
    >

      <v-row
        v-if="profiles.loading || profiles.error"
        class="text-center"
      >
        <v-col>
          <em v-if="profiles.loading">Laddar profiler...</em>
          <v-alert
            type="error"
            v-if="profiles.error"
          >
            ERROR: {{profiles.error}}
          </v-alert>
        </v-col>
      </v-row>

      <template
        v-if="profiles.items"
      >
        <v-row>
          <v-col>
            <p class="py-2 px-2 ma-0">Senast tillagt</p>
          </v-col>
        </v-row>

        <v-row
          v-for="profile in profiles.items"
          :key="`profile-${profile.id}`"
          dense
          class="mb-2"
        >
          <v-col
            class="col-12 col-sm-6 col-md-3"
          >
            <v-card
              color="accent darken-1 rounded"
              dark
              :to="`/profile/${profile.id}`"
            >
              <v-img
                :aspect-ratio="4/3"
                :src="profile.coverURL"
                class="rounded" />

              <v-overlay
                absolute
                z-index="0"
              >
                <v-card-text
                  class="text-center"
                >
                  <v-avatar
                    :size="64"
                    class="elevation-3"
                    color="accent darken-1"
                  >
                    <img
                      v-if="profile.avatarURL"
                      :src="profile.avatarURL"
                      :alt="profile.stageName || profile.user.firstName + ' ' + profile.user.lastName"
                    >
                    <span
                      v-else
                      class="white--text text-h5"
                    >
                      {{ profile.stageName ? profile.stageName.slice(0,2) : profile.user.firstName[0] + profile.user.lastName[0] }}
                    </span>
                  </v-avatar>
                  <h3
                    class="text-h5 mt-4"
                  >
                    {{profile.stageName || profile.user.firstName + ' ' + profile.user.lastName}}
                  </h3>
                  <p class="text-overline text-decoration-underline mb-0">Visa mer</p>
                </v-card-text>
              </v-overlay>
            </v-card>
          </v-col>
          <v-col
            v-for="media in profile.media.slice(0,3)"
            :key="media.id"
            class="col-12 col-sm-6 col-md-3"
          >
            <media-card :media="media" />
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import MediaCard from '@/components/MediaCard'

export default {
  name: 'Home',
  title: 'Sing a Song',
  components: {
    MediaCard
  },
  data() {
    return {
      areas: [
        'Stockholm',
        'Göteborg',
        'Malmö',
        'Uppsala'
      ],
      selectedArea: false
    }
  },
  computed: {
    profiles () {
        return this.$store.state.profiles.all;
    }
  },
  created () {
    this.$store.dispatch('profiles/getAll');
  },
  methods: {
    filterOnArea(area) {
      if (this.selectedArea === area) {
        this.selectedArea = undefined
      } else {
        this.selectedArea = area
      }
      console.log({area}) // eslint-disable-line no-console
    }
  }
}
</script>

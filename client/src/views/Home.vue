<template>
  <div>
    <server-comunication-indicator />
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
        <v-spacer></v-spacer>
        <top-navigation />
      </v-toolbar>

      <v-container
        class="d-flex align-center flex-grow-1"
      >
        <v-row
          justify="center"
          class="mb-8"
        >
          <v-col
            class="col-12 col-sm-10 col-md-8 col-lg-6 pb-12 text-center"
          >
            <h1 class="text-h4 text-sm-h1 mb-6">Sing a song</h1>
            <v-text-field
              placeholder="Sök vissångare"
              type="search"
              solo
              prepend-inner-icon="mdi-magnify"
              class="mb-0"
              v-model="search"
            >
              <v-icon
                slot="append"
                @click="search = ''"
                v-if="search"
                color="primary"
              >mdi-close</v-icon>
            </v-text-field>

            <vue-fuse
              :fuse-opts="searchOptions"
              :list="profilesList"
              :defaultAll="true"
              :search="search"
              placeholder="Sök artist"
              @fuse-results="handleResults"
              class="d-none"
            />

            <v-chip
              v-for="area in areaChips"
              :key="area"
              color="white"
              class="elevation-1 ma-1"
              filter
              :input-value="area === selectedArea"
              @click="filterOnArea(area)"
            >
              {{area}}
            </v-chip>

            <v-expand-x-transition>
              <v-chip
                v-if="selectedArea && areaChips.indexOf(selectedArea) === -1"
                color="white"
                class="elevation-1 ma-1"
                filter
                :input-value="true"
                @click="filterOnArea(selectedArea)"
              >
                {{selectedArea}}
              </v-chip>
            </v-expand-x-transition>



            <v-menu
              max-height="256"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  color="white"
                  class="elevation-1 ma-1"
                  v-bind="attrs"
                  v-on="on"
                >
                  Fler områden
                </v-chip>
              </template>
              <v-list>
                <v-list-item-group
                  v-model="selectedArea"
                  color="primary"
                >
                  <v-list-item
                    v-for="area in areas"
                    :key="area"
                    :value="area"
                  >
                    <v-list-item-title>{{ area }}</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>

          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <v-container
      class="pb-16"
    >

      <v-row
        v-if="profiles.loading || profiles.error"
        class="text-center"
      >
        <v-col>
          <p
            v-if="profiles.loading"
            class="text-center text-h4 mt-16"
          >Laddar profiler…</p>
          <v-alert
            type="error"
            v-if="profiles.error"
          >
            ERROR: {{profiles.error}}
          </v-alert>
        </v-col>
      </v-row>

      <template
        v-if="resultsList && resultsList.length"
      >
        <v-row>
          <v-col>
            <p class="text-overline py-2 px-2 ma-0">
              {{search?`Resultat för "${search}"`:'Senast tillagt'}}{{selectedArea?` i ${selectedArea}`:''}}:
            </p>
          </v-col>
        </v-row>

        <v-row
          v-for="profile in resultsList"
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
      <p
        v-if="(!profilesList || profilesList.length === 0) && !profiles.loading"
        class="ma-12 text-center font-italic text--secondary"
      >
        Inga träffar {{selectedArea?`i ${selectedArea}`:''}}
      </p>
    </v-container>
  </div>
</template>

<script>
import VueFuse from 'vue-fuse'
import MediaCard from '@/components/MediaCard'
import areas from '@/_helpers/areas.js'

export default {
  name: 'Home',
  title: 'Sing a Song',
  components: {
    VueFuse,
    MediaCard
  },
  data() {
    return {
      resultsList: [],
      search: '',
      searchOptions: {
        keys: [
          'stageName',
          {
            name:'description',
            weight: 0.5
          },
          'user.firstName',
          'user.lastName'
        ]
      },
      areas,
      areaChips: [
        "Stockholm",
        "Göteborg",
        "Malmö"
      ],
      selectedArea: false
    }
  },
  computed: {
    profiles () {
      return this.$store.state.profiles.all
    },
    profilesList () {
      if (!this.profiles || !this.profiles.items) {
        return undefined
      } else if (this.selectedArea) {
        return this.profiles.items.filter(profile => {
          const geoArray = profile.geoReach || []
          return geoArray.indexOf(this.selectedArea) !== -1
        })
      } else {
        return this.profiles.items;
      }
    }
  },
  created () {
    this.$store.dispatch('profiles/getAll');
  },
  methods: {
    handleResults(a) {
      this.resultsList = a.map(r => r.item)
    },
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

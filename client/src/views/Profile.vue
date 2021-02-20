<template lang="html">

    <v-container
      class="pb-16"
    >
      <template v-if="profile">
        <!-- Profile Cover -->
        <v-row>
          <v-col class="pa-0">
            <v-parallax
              height="250"
              src="https://source.unsplash.com/collection/4927557/"
              class="ma-1 mt-4 rounded"
            >
              <v-row
                v-if="profile.userId === $store.state.authentication.user.id"
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
              size="128"
              class="elevation-14 mt-n16"
            >
              <img
                src="https://source.unsplash.com/collection/66520309/256x256"
                alt="John"
              >
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
      const profile = this.$store.state.profiles.all.items.find(p => p.id == this.id)
      profile.media = [
        {
          id: 1,
          type: 'youtube',
          value: 'IvUU8joBb1Q'
        },
        {
          id: 9,
          type: 'spotify',
          value: 'track/3kBPnItITm3Od2IVhuJPxf'
        },
        {
          id: 10,
          type: 'spotify',
          value: 'album/7e8Iiag5t3Z3CNSQbT7M8B'
        },
        {
          id: 2,
          type: 'youtube',
          value: 'ASqS1do7SWk'
        },
        {
          id: 3,
          type: 'youtube',
          value: 'XQqbNElwLVE'
        },
        {
          id: 4,
          type: 'youtube',
          value: 'RT8NVDHe9-k'
        },
        {
          id: 5,
          type: 'youtube',
          value: 'FDE0JuAlktc'
        },
        {
          id: 6,
          type: 'youtube',
          value: '6HsLrDvfloo'
        },
        {
          id: 7,
          type: 'youtube',
          value: 'yo0kya_XUkA'
        },
        {
          id: 8,
          type: 'youtube',
          value: 'OAEJ3c9pSsE'
        }
      ]
      return profile
    },
    userName() {
      return this.profile.user.firstName + " " + this.profile.user.lastName
    }
  }
}
</script>

<template lang="html">

    <v-container>
      <template v-if="profile">
        <v-row>
          <v-col class="pa-0">
            <v-parallax
              height="250"
              src="https://source.unsplash.com/collection/4927557/"
              class="ma-1 mt-4 rounded"
            >
            </v-parallax>
          </v-col>
        </v-row>
        <v-row
          justify = "center"
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
        <v-row>
          <v-col
            class="text-center"
          >
            <h1 class="text-h3 mb-4">{{userName}}</h1>
            <p>{{profile.description}}</p>
          </v-col>
        </v-row>
        <v-row
          v-for="i in 5"
          :key="i"
          class=""
        >
          <v-col
            v-for="img in 3"
            :key="'img' + img"
            class="col-4 pa-1"
          >
            <v-img
              :aspect-ratio="4/3"
              max-height="480"
              max-width="640"
              :src="`https://source.unsplash.com/640x640/?music,${img}${i}`"
              class="rounded"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0 brown darken-3"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="red lighten-3"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
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
export default {
  name: 'Profile',
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
    }
  }
}
</script>

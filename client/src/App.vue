<template>
  <v-app
    app
  >
    <v-app-bar
      app
      color="primary"
      dark
      inverted-scroll
      scroll-threshold="256"
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

    </v-app-bar>


    <v-content>
      <v-main>
          <router-view/>
      </v-main>
    </v-content>
  </v-app>
</template>

<script>
import TopNavigation from '@/components/TopNavigation'
export default {
  components: {
    TopNavigation
  },
  data() {
    return {
    }
  }
}

</script>

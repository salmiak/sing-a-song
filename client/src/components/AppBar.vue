<template lang="html">
  <v-app-bar
    app
    color="primary"
    dark
    :inverted-scroll="isHidden"
    scroll-threshold="0"
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
</template>

<script>
export default {
  name:"AppBar",
  data() {
    return {
      hiddenOn: [
        'Home',
        'Profile'
      ]
    }
  },
  computed: {
    isHidden() {
      return this.hiddenOn.indexOf(this.$route.name) !== -1
    }
  }
}
</script>

<style lang="css" scoped>
</style>

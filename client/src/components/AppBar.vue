<template lang="html">
  <v-app-bar
    app
    color="primary"
    dark
    :inverted-scroll="isHidden"
    scroll-threshold="0"
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
  created() {
    console.log(this.$vuetify.breakpoint) // eslint-disable-line no-console
  },
  computed: {
    isHidden() {
      return this.hiddenOn.indexOf(this.$route.name) !== -1
    }
  }
}
</script>

<style lang="css" scoped>
.appbar-logo {
  width: 32px;
  height: 32px;
}
.st0 {
  fill:var(--v-secondary-base);
}
</style>

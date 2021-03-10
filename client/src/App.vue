<template>
  <v-app
    app
  >
    <app-bar />
    <v-main>
      <router-view/>
    </v-main>
    <v-container
      class="text-center mb-8 text-body-2"
    >
      <footer>Singasong.nu drivs av Riksförbundet Visan i Sverige. <router-link to="/about">Läs mer om oss här.</router-link></footer>
    </v-container>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'

export default {
  name: "App",
  components: {
    AppBar
  }
}

</script>

<template>
  <v-app app>
    <server-comunication-indicator />
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
    <v-container class="text-center mb-8 text-body-2">
      <footer>
        Singasong.nu drivs av Riksförbundet Visan i Sverige.
        <router-link to="/about">Läs mer om oss här</router-link> |
        <router-link to="/tos">Användarvillkor</router-link> |
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScqmyKOihgnDy50mbP905EvWg7cxTcToAl9DLQNfuA-Nr5xlA/viewform?usp=sf_link"
          target="_blank"
          >Lämna feedback</a
        >
      </footer>
    </v-container>
  </v-app>
</template>

<script>
  import ServerComunicationIndicator from "@/components/ServerComunicationIndicator";
  import AppBar from "@/components/AppBar";

  export default {
    name: "App",
    components: {
      AppBar,
      ServerComunicationIndicator,
    },
  };
</script>

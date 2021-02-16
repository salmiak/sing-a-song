<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
      elevate-on-scroll
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Sing-a-song</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        to="/"
        icon
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <!--<v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>-->

      <v-menu
        v-if="$store.state.authentication.user"
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/account">
            <v-list-item-title>
              Ditt konto
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/login">
            <v-list-item-title>
              Logga ut {{$store.state.authentication.user.firstName}}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-else>
        <v-btn plain to="/login">Logga in</v-btn>
        <v-btn
          outlined
          to="/register">Skapa konto</v-btn>
      </template>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}

</script>

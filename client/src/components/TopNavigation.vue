<template lang="html">
  <div>
    <v-menu v-if="$store.state.authentication.status.loggedIn" left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item :to="`/profile/${profileId}/edit`">
          <v-list-item-title>
            Redigera din profil
          </v-list-item-title>
        </v-list-item>

        <v-list-item to="/account">
          <v-list-item-title>
            Ditt konto
          </v-list-item-title>
        </v-list-item>

        <v-list-item to="/login">
          <v-list-item-title>
            Logga ut {{ $store.state.authentication.user.firstName }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <template v-else>
      <v-menu v-if="$vuetify.breakpoint.xs" left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/login">
            <v-list-item-title>
              Logga in
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/register">
            <v-list-item-title>
              Skapa konto
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-else>
        <v-btn plain to="/login">Logga in</v-btn>
        <v-btn outlined to="/register">Skapa konto</v-btn>
      </template>
    </template>
  </div>
</template>

<script>
  export default {
    computed: {
      profile() {
        const userId = this.$store.state.authentication.user.id;
        if (this.$store.state.profiles.all.items) {
          return this.$store.state.profiles.all.items.find(
            p => p.userId === userId
          );
        } else {
          return undefined;
        }
      },
      profileId() {
        return this.profile ? this.profile.id : undefined;
      },
    },
  };
</script>

<style lang="css" scoped></style>

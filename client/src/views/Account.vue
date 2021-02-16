<template lang="html">
  <v-container>
    <v-row>
      <v-col>
        <h1>Hej {{user.firstName}}!</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Ditt konto</h2>
        <p>Gick med {{user.created}}</p>
      </v-col>
      <v-col>
        <h2>Din profil</h2>
        <p>Beskrivning: {{profile.description}}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name:'Account',
  computed: {
    user() {
      return this.$store.state.authentication.user
    },
    profile() {
      return this.$store.state.profiles.all.items.find(i => i.userId === this.user.id)
    }
  }
}
</script>

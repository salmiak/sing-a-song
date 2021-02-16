<template lang="html">
  <div class="account">
    <h1>Hej {{user.firstName}}!</h1>
    <h2>Ditt konto</h2>
    <p>Gick med {{user.created}}</p>
    <h2>Din profil</h2>
    <p>Beskrivning: {{profile.description}}</p>
  </div>
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

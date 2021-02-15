<template>
  <div>
      <h1>Sing-a-song</h1>
      <em v-if="profiles.loading">Laddar profiler...</em>
      <span v-if="profiles.error" class="text-danger">ERROR: {{profiles.error}}</span>
      <template v-if="profiles.items">
          <p v-for="profile in profiles.items" :key="profile.id">
              <strong>{{profile.user.firstName}} {{profile.user.lastName}}:</strong><br/>
              {{profile.description}}
          </p>
      </template>
  </div>
</template>

<script>

export default {
  name: 'Home',
  computed: {
    profiles () {
        return this.$store.state.profiles.all;
    }
  },
  created () {
      this.$store.dispatch('profiles/getAll');
  }
}
</script>

<template>
  <div>
      <h1>Sing-a-song</h1>
      <em v-if="profiles.loading">Laddar profiler...</em>
      <span v-if="profiles.error" class="text-danger">ERROR: {{profiles.error}}</span>
      <ul v-if="profiles.items">
          <li v-for="profile in profiles.items" :key="profile.id">
              {{profile.description}}
          </li>
      </ul>
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

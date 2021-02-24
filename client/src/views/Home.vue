<template>
  <v-container
    class="mb-16"
  >
    <v-row>
      <v-col>
        <h1 class="text-h1 mt-16 mb-10">Sing-a-song</h1>
        <em v-if="profiles.loading">Laddar profiler...</em>
        <span v-if="profiles.error" class="text-danger">ERROR: {{profiles.error}}</span>
      </v-col>
    </v-row>

    <template
    v-if="profiles.items"
    >
      <v-row
        v-for="profile in profiles.items"
        :key="`profile-${profile.id}`"
        dense
        class="mb-10"
      >
        <v-col>
          <v-card
            color="accent darken-1 rounded"
            dark
            :to="`/profile/${profile.id}`"
          >
            <v-img
              :aspect-ratio="1"
              :src="profile.coverURL"
              class="rounded" />

            <v-overlay
              absolute
            >
              <v-card-text
                class="text-center"
              >
                <v-avatar
                  :size="64"
                  class="elevation-3"
                  color="accent darken-1"
                >
                  <img
                    v-if="profile.avatarURL"
                    :src="profile.avatarURL"
                    :alt="profile.stageName || profile.user.firstName + ' ' + profile.user.lastName"
                  >
                  <span
                    v-else
                    class="white--text text-h5"
                  >
                    {{ profile.stageName ? profile.stageName.slice(0,2) : profile.user.firstName[0] + profile.user.lastName[0] }}
                  </span>
                </v-avatar>
                <h3
                  class="text-h5 mt-4"
                >
                  {{profile.stageName || profile.user.firstName + ' ' + profile.user.lastName}}
                </h3>
                <p class="text-overline text-decoration-underline mb-0">Visa mer</p>
              </v-card-text>
            </v-overlay>
          </v-card>
        </v-col>
        <v-col
          v-for="media in profile.media.slice(0,3)"
          :key="media.id"
        >
          <media-card :media="media" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
  import MediaCard from '@/components/MediaCard'

export default {
  name: 'Home',
  components: {
    MediaCard
  },
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

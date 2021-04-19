<template lang="html">
  <v-card class="mediaCardWithFooter" color="secondary lighten-4">
    <v-responsive
      :aspect-ratio="4 / 3"
      color="grey darken-3"
      :content-class="
        media.provider === 'mp3' ? 'align-center d-flex justify-center' : ''
      "
    >
      <iframe
        v-if="media.provider === 'youtube'"
        width="480"
        height="480"
        :src="`https://www.youtube.com/embed/${media.value}?color=white`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <iframe
        v-if="media.provider === 'spotify'"
        :src="`https://open.spotify.com/embed/${media.type}/${media.value}`"
        width="480"
        height="480"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>

      <iframe
        v-if="media.provider === 'vimeo'"
        :src="
          `https://player.vimeo.com/video/${media.value}?color=ff9933&byline=0&portrait=0`
        "
        style="position:absolute;top:0;left:0;width:100%;height:100%;"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>

      <iframe
        v-if="media.provider === 'soundcloud'"
        width="100%"
        height="450"
        scrolling="no"
        rameborder="no"
        allow="autoplay"
        :src="media.value"
      ></iframe>

      <div class="pa-2" style="width:100%;" v-if="media.provider === 'mp3'">
        <audio controls class="d-block" style="width:100%;">
          <source :src="media.value" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </v-responsive>

    <v-card-actions class="pa-0">
      <v-list-item class="px-2" :to="`/profile/${profile.id}`">
        <v-list-item-avatar
          :color="profile.avatarURL ? 'grey  darken-2' : 'accent darken-1'"
          class="justify-center"
        >
          <v-img
            v-if="profile.avatarURL"
            class="elevation-6"
            alt=""
            :src="profile.avatarURL"
          ></v-img>
          <div v-else class="white--text text-h6">
            {{
              profile.stageName
                ? profile.stageName.slice(0, 2)
                : profile.user.firstName[0].toUpperCase() +
                  profile.user.lastName[0].toUpperCase()
            }}
          </div>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ profile.stageName }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "mediaCardWithFooter",
    props: ["media"],
    computed: {
      profile() {
        if (!this.$store.state.profiles.all.items) return undefined;
        return this.$store.state.profiles.all.items.find(
          p => p.id == this.media.profileId
        );
      },
    },
  };
</script>

<style scoped>
  .mediaCardWithFooter iframe {
    width: 100%;
    height: 100%;
  }
</style>

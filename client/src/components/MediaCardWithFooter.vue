<template lang="html">
  <v-card
    class="mediaCardWithFooter"
    color="secondary lighten-4">

    <v-responsive :aspect-ratio="4/3">

      <iframe
        v-if="media.provider === 'youtube'"
        width="480"
        height="480"
        :src="`https://www.youtube.com/embed/${media.value}?color=white`" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>

      <iframe
        v-if="media.provider === 'spotify'"
        :src="`https://open.spotify.com/embed/${media.type}/${media.value}`"
        width="480"
        height="480"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"></iframe>

      <iframe
        v-if="media.provider === 'vimeo'"
        :src="`https://player.vimeo.com/video/${media.value}?color=ff9933&byline=0&portrait=0`"
        style="position:absolute;top:0;left:0;width:100%;height:100%;"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen></iframe>

      <iframe
        v-if="media.provider === 'soundcloud'"
        width="100%"
        height="450"
        scrolling="no"
        rameborder="no"
        allow="autoplay"
        :src="media.value"
      ></iframe>

    </v-responsive>

    <v-card-actions>
    <v-list-item
      class="px-2"
    >
       <v-list-item-avatar color="grey darken-3">
         <v-img
           class="elevation-6"
           alt=""
           :src="profile.avatarURL"
         ></v-img>
       </v-list-item-avatar>

       <v-list-item-content>
         <v-list-item-title>{{profile.stageName}}</v-list-item-title>
       </v-list-item-content>

     </v-list-item>
   </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: 'mediaCardWithFooter',
  props: ['media'],
  computed: {
    profile() {
      if (!this.$store.state.profiles.all.items)
        return undefined
      return this.$store.state.profiles.all.items.find(p => p.id == this.media.profileId)
    },
  }
}
</script>

<style scoped>
.mediaCardWithFooter iframe {
  width: 100%;
  height: 100%;
}
</style>

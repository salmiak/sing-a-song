<template lang="html">
  <v-card
    class="mediaCard">

    <v-responsive :aspect-ratio="1/1">

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
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"></iframe>

    </v-responsive>
  </v-card>
</template>

<script>
export default {
  name: 'MediaCard',
  props: ['media']
}
</script>

<style>
.mediaCard iframe {
  width: 100%;
  height: 100%;
}
</style>

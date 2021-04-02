<template lang="html">
  <v-card class="mediaCard" color="secondary darken-4">
    <v-responsive :aspect-ratio="4 / 3">
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
        width="300"
        height="380"
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
    </v-responsive>
  </v-card>
</template>

<script>
  export default {
    name: "MediaCard",
    props: ["media"],
  };
</script>

<style>
  .mediaCard iframe {
    width: 100%;
    height: 100%;
  }
</style>

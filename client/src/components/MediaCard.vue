<template lang="html">
  <v-card class="mediaCard" color="grey darken-3">
    <v-responsive
      :aspect-ratio="4 / 3"
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

      <div class="pa-2" style="width:100%;" v-if="media.provider === 'mp3'">
        <audio controls class="d-block" style="width:100%;">
          <source :src="media.value" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
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

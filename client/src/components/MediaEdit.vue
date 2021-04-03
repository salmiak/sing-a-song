<template lang="html">
  <v-card class="mediaEdit mb-4 pa-4">
    <v-select :items="typeItems" v-model="media.type" label="Typ"></v-select>
    <v-text-field label="Länk" v-model="media.value"></v-text-field>
  </v-card>
</template>

<script>
  export default {
    name: "MediaEdit",
    props: ["media"],
    data() {
      return {
        typeItems: [
          {
            text: "Spotify",
            value: "spotify",
          },
          {
            text: "YouTube",
            value: "youtube",
          },
        ],
      };
    },
  };
</script>

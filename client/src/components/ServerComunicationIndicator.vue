<template lang="html">
  <div
    class="ServerComunicationIndicator"
    v-if="$store.state.loading.length"
  >
    <v-progress-linear
      indeterminate
      color="accent"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  name:"ServerComunicationIndicator"
}
</script>

<style lang="css" scoped>
.ServerComunicationIndicator {
  position:absolute;
  top: 0;
  left: 0;
  right:0;
  z-index: 900;
}
</style>

<template lang="html">
  <v-container class="formView">
    <v-alert v-if="alert" :type="alert.type">
      {{ alert.message }}
    </v-alert>

    <v-row class="mt-12" justify="center">
      <v-col class="col-12 col-sm-5 col-md-4 col-lg-3 text-center">
        <h1 class="mb-10">{{ title }}</h1>
        <v-form @submit.prevent="$emit('submitted')">
          <slot />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: ["alert", "title"],
  };
</script>

<style lang="css" scoped></style>

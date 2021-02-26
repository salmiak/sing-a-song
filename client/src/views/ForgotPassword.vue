<template>
  <v-container class="login">
    <v-row>
      <v-col>
        <h1>Glömt lösen</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-6">
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="email"
            label="Email"
            outlined
          ></v-text-field>
          <v-btn
            :disabled="submitted"
            @click="handleSubmit"
          >Skicka nytt lösenord</v-btn>
        </v-form>
        <v-alert
          v-if="success || error"
          :color="success ? 'success': 'error'"
          class="mt-4"
        >{{success || error}}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data () {
      return {
          submitted: false,
          email: '',
          success: false,
          error: false
      }
  },
  methods: {
      handleSubmit () {
          this.submitted = true;
          const { email } = this;
          const { dispatch } = this.$store;
          if (email) {
            dispatch('authentication/forgotPassword', { email })
            .then(r => {
              this.success = r.message
              this.email = ''
              this.submitted = false
            },
            error => {
              this.error = error
              this.submitted = false
            });
          }
      }
  }
}
</script>

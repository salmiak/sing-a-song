<template>
  <v-container class="login">
    <v-row>
      <v-col>
        <h1>Återställ lösen</h1>
      </v-col>
    </v-row>
    <v-row
      v-if="!tokenStatus"
    >
      <v-col>
        Laddar…
      </v-col>
    </v-row>
    <v-row
      v-if="tokenStatus === 'valid'"
    >
      <v-col class="col-6">
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="password"
            label="Lösenord"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Lösenord igen"
            outlined
          ></v-text-field>
          <v-btn
            :disabled="submitted"
            @click="handleSubmit"
          >Sätt nytt lösenord</v-btn>
        </v-form>
        <v-alert
          v-if="success || error"
          :color="success ? 'success': 'error'"
          class="mt-4"
        >{{success || error}}</v-alert>
      </v-col>
    </v-row>
    <v-row
      v-if="tokenStatus === 'invalid'"
    >
      <v-col class="col-6">
        <v-alert
          color="error">
          Något gick fel. Försök igen.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ResetPassword',
  data () {
      return {
          password: '',
          confirmPassword: '',
          submitted: false,
          success: false,
          error: false,
          tokenStatus: undefined
      }
  },
  created() {
    this.$store.dispatch('authentication/validateResetToken', {token: this.token})
    .then(() => {
      this.tokenStatus = 'valid'
    }, () => {
      this.tokenStatus = 'invalid'
    });
  },
  computed: {
    token() {
      return this.$route.params.token
    }
  },
  methods: {
      handleSubmit () {
          this.submitted = true;
          const { password, confirmPassword, token } = this;
          const { dispatch } = this.$store;
          if ( password && confirmPassword ) {
            dispatch('authentication/resetPassword', { password, confirmPassword, token })
            .then(r => {
              this.success = r.message
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

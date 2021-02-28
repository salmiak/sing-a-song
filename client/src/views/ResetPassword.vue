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
            :type="showPassword?'text':'password'"
            outlined
          >
            <v-icon
              slot="append"
              @click="showPassword = !showPassword"
            >
              {{showPassword?'mdi-eye-off':'mdi-eye'}}
            </v-icon>
          </v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Lösenord igen"
            :type="showPassword?'text':'password'"
            outlined
          >
            <v-icon
              slot="append"
              @click="showPassword = !showPassword"
            >
              {{showPassword?'mdi-eye-off':'mdi-eye'}}
            </v-icon>
          </v-text-field>
          <v-btn
            :disabled="submitted"
            @click="handleSubmit"
          >Spara nytt lösenord</v-btn>
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
  title: 'Nytt lösenord | Sing a Song',
  data () {
      return {
          password: '',
          confirmPassword: '',
          submitted: false,
          success: false,
          error: false,
          tokenStatus: undefined,
          showPassword: false
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
            .then(() => {
              this.$router.push('/login/passwordReset')
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

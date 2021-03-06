<template>
  <form-view
    title="Återställ lösen"
    @submitted="handleSubmit"
  >
    <v-alert
      v-if="!tokenStatus"
      type="info">
      Laddar...
    </v-alert>

    <template v-if="tokenStatus === 'valid'">
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
        ></v-text-field>
        <v-btn
          color="primary"
          :disabled="submitted"
          @click="handleSubmit"
        >Spara nytt lösenord</v-btn>
        <v-alert
          v-if="success || error"
          :color="success ? 'success': 'error'"
          class="mt-4"
        >{{success || error}}</v-alert>
    </template>

    <v-alert
      v-if="tokenStatus === 'invalid'"
      type="error">
      Något gick fel. Försök igen.
    </v-alert>
  </form-view>
</template>

<script>
import FormView from '@/components/FormView'
export default {
  name: 'ResetPassword',
  title: 'Nytt lösenord | Sing a Song',
  components: {
    FormView
  },
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

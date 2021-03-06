<template>
  <form-view
    title="Logga in"
    :alert="this.alert"
    @submitted="handleSubmit"
  >
    <v-text-field
      type = "email"
      v-model="email"
      label="Email"
      outlined
    ></v-text-field>
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
    <v-btn
      color="primary"
      :disabled="loggingIn"
      @click="handleSubmit"
    >Logga in</v-btn>

    <v-alert
      v-if="validationError"
      type="error"
      text
      class="mt-2"
      transition="scale-transition"
    >{{validationError}}</v-alert>

    <p class="mt-8">
      <router-link to="/forgot-password">Glömt lösenord</router-link> - Om du inte har något konto så <router-link to="/register">skapa ett här</router-link>.
    </p>
  </form-view>
</template>

<script>
import FormView from '@/components/FormView'
export default {
  name: 'Login',
  title: 'Logga in | Sing a Song',
  components: {
    FormView
  },
  data () {
      return {
          email: '',
          password: '',
          submitted: false,
          validationError: false,
          showPassword: false
      }
  },
  computed: {
      loggingIn () {
          return this.$store.state.authentication.status.loggingIn;
      },
      loggedIn() {
        return this.$store.state.authentication.status.loggedIn
      },
      alert() {
        if (this.$route.params.status === 'loggedOut') {
          return {
            type: "warning",
            message: "Du blev utloggad. Logga in igen."
          }
        }

        if (this.$route.params.status === 'verifiedEmail') {
          return {
            type: "success",
            message: "Du är verifierad! Nu kan du logga in."
          }
        }

        if (this.$route.params.status === 'passwordReset') {
          return {
            type: "success",
            message: "Nu kan du logga in med ditt nya lösenord."
          }
        }

        return undefined
      }
  },
  created () {
      // reset login status
      this.$store.dispatch('authentication/logout');
  },
  watch: {
    loggedIn() {
      if(this.loggedIn){
        this.$router.push('/')
      }
    }
  },
  methods: {
      handleSubmit () {
          this.submitted = true;
          const { email, password } = this;
          const { dispatch } = this.$store;
          if (email && password) {
              dispatch('authentication/login', { email, password })
              .then(null, (error) => {
                this.validationError = error
              });
          }
      }
  }
}
</script>

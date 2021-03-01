<template>
  <v-container class="login">

    <v-alert
      v-if="$route.params.status === 'loggedOut'"
      color="warning"
    >
      Du blev utloggad. Logga in igen.
    </v-alert>

    <v-alert
      v-if="$route.params.status === 'verifiedEmail'"
      color="success"
    >
      Du är verifierad! Nu kan du logga in.
    </v-alert>

    <v-alert
      v-if="$route.params.status === 'passwordReset'"
      color="success"
    >
      Nu kan du logga in med ditt nya lösenord.
    </v-alert>



    <v-row>
      <v-col>
        <h1>Logga in</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-6">
        <v-form @submit.prevent="handleSubmit">
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
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  title: 'Logga in | Sing a Song',
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

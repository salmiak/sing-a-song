<template>
  <form-view
    title="Registrera dig"
    @submitted="handleSubmit"
  >
        <div v-if="!success">
          <v-text-field
            outlined
            v-model="firstName"
            label="Förnamn" ></v-text-field>
          <v-text-field
            outlined
            v-model="lastName"
            label="Efternamn" ></v-text-field>
          <v-text-field
            outlined
            v-model="email"
            label="Email"
            type="email" ></v-text-field>
          <v-text-field
            v-model="password"
            label="Lösenord"
            :type="showPassword?'text':'password'"
            outlined
          >
            <v-icon
              slot="append"
              @click="showPassword = !showPassword"
              tabindex="-1"
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
          <v-checkbox
            v-model="acceptTerms"
            label="Genom att kryssa i godkänner du våra användarvilkor"
          ></v-checkbox>
          <v-btn
            color="primary"
            @click="handleSubmit"
            :disabled="submitted">Skapa konto</v-btn>

          <v-alert
            v-if="validation"
            type="error"
            text
            class="mt-2"
            transition="scale-transition"
          >{{validation}}</v-alert>

          <p class="mt-8">Om du redan har ett konto så <router-link to="/login">logga in här</router-link>.</p>
</div>
          <div v-else>
            <v-alert
              type="success"
              class="text-left"
            ><strong>Registreringen lyckades!</strong><br />Kolla i din e-post för vidare instruktioner.</v-alert>
          </div>

  </form-view>
</template>

<script>
import FormView from '@/components/FormView'
export default {
  name: 'Register',
  title: 'Registrera dig | Sing a Song',
  components: {
    FormView
  },
  data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        submitted: false,
        success: false,
        showPassword: false,
        validation: false
      }
  },
  methods: {
    handleSubmit () {
      this.submitted = true;
      const { firstName, lastName, email, password, confirmPassword, acceptTerms } = this;
      const { dispatch } = this.$store;
      dispatch('authentication/register', { firstName, lastName, email, password, confirmPassword, acceptTerms })
      .then(() => {
        this.success = true
      }, error => {
        this.validation = error
        this.submitted = false;
      })
    }
  }
}
</script>

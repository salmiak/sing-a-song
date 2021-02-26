<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Registrera dig</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-6">
        <v-form v-if="!success" @submit.prevent="handleSubmit">
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
            label="Email" ></v-text-field>
          <v-text-field
            outlined
            v-model="password"
            label="Lösenord"
            type="password" ></v-text-field>
          <v-text-field
            outlined
            v-model="confirmPassword"
            label="Lösenord igen"
            type="password" ></v-text-field>
          <v-checkbox
            v-model="acceptTerms"
            label="Genom att kryssa i godkänner du våra användarvilkor"
          ></v-checkbox>
          <v-btn
            @click="handleSubmit"
            :disabled="submitted">Skapa konto</v-btn>
        </v-form>
        <div v-else>
          <v-alert
            color="success"
          >Kolla din email</v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// const api = 'http://localhost:4000/accounts'

export default {
  name: 'Register',
  data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        submitted: false,
        success: false
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
      })
    }
  }
}
</script>
